#!/usr/bin/env node
// Copies the canonical sources in shared/ into the skills and agent definitions
// that depend on them, so that each skill stays self-contained while every
// shared template, role contract and sentence has one home.
//
//   node scripts/sync-shared.mjs          write the copies
//   node scripts/sync-shared.mjs --check  fail when a copy differs from its source

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const check = process.argv.includes('--check')
const manifest = JSON.parse(readFileSync(join(root, 'shared/manifest.json'), 'utf8'))
const problems = []

function parseSentences(text) {
  const sentences = {}
  for (const block of text.split(/^## /m).slice(1)) {
    const newline = block.indexOf('\n')
    const key = block.slice(0, newline).trim()
    sentences[key] = block.slice(newline + 1).trim()
  }
  return sentences
}

const sentences = parseSentences(readFileSync(join(root, 'shared/sentences.md'), 'utf8'))
for (const key of manifest.sentences ?? []) {
  if (!(key in sentences)) problems.push(`shared/sentences.md: key "${key}" is in the manifest but has no section`)
}

const marker = /<!-- shared:([a-z0-9-]+) -->[\s\S]*?<!-- \/shared:\1 -->/g

function fillMarkers(text, file) {
  return text.replace(marker, (whole, key) => {
    if (!(key in sentences)) {
      problems.push(`${file}: unknown shared sentence "${key}"`)
      return whole
    }
    return `<!-- shared:${key} -->\n${sentences[key]}\n<!-- /shared:${key} -->`
  })
}

// expected content per destination path, relative to the repository root
const expected = new Map()

for (const [file, destinations] of Object.entries(manifest.templates ?? {})) {
  const source = `shared/templates/${file}`
  const content = fillMarkers(readFileSync(join(root, source), 'utf8'), source)
  for (const destination of destinations) expected.set(destination, content)
}

for (const [role, { frontmatter, copies = [] }] of Object.entries(manifest.briefs ?? {})) {
  const source = `shared/briefs/${role}.md`
  const body = fillMarkers(readFileSync(join(root, source), 'utf8'), source)
  const header = [
    '---',
    `name: ${frontmatter.name}`,
    `description: ${JSON.stringify(frontmatter.description)}`,
    `tools: ${frontmatter.tools}`,
    '---',
    '',
  ].join('\n')
  expected.set(`agents/${role}.md`, `${header}\n${body}`)
  for (const destination of copies) expected.set(destination, body)
}

function markdownFiles(dir) {
  const found = []
  for (const name of readdirSync(join(root, dir))) {
    const path = join(dir, name)
    if (statSync(join(root, path)).isDirectory()) found.push(...markdownFiles(path))
    else if (name.endsWith('.md')) found.push(path)
  }
  return found
}

// hand-written skill files only get their marker blocks filled
for (const file of markdownFiles('skills')) {
  if (expected.has(file)) continue
  const current = readFileSync(join(root, file), 'utf8')
  const filled = fillMarkers(current, file)
  if (filled !== current) expected.set(file, filled)
}

let changed = 0
for (const [destination, content] of expected) {
  const path = join(root, destination)
  const current = existsSync(path) ? readFileSync(path, 'utf8') : null
  if (current === content) continue
  changed++
  if (check) {
    problems.push(`${destination}: differs from its source in shared/`)
  } else {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
    console.log(`wrote ${relative(root, path)}`)
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(problem)
  console.error(check ? '\nRun: node scripts/sync-shared.mjs' : '\nFix the problems above.')
  process.exit(1)
}
console.log(check ? 'shared content is in sync' : `${changed} file(s) updated`)
