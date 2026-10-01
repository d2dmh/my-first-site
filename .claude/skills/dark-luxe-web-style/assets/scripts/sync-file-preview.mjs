import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const sourcePath = resolve(distRoot, 'app.html')
const outputPath = resolve(projectRoot, 'index.html')

let html = await readFile(sourcePath, 'utf8')

const stylesheetPattern =
  /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/g

for (const match of [...html.matchAll(stylesheetPattern)]) {
  const assetPath = resolve(distRoot, match[1].replace(/^\.?\//, ''))
  const css = await readFile(assetPath, 'utf8')
  html = html.replace(match[0], () => `<style>${css}</style>`)
}

const scriptPattern =
  /<script\b(?=[^>]*\bsrc=["']([^"']+)["'])[^>]*><\/script>/g

for (const match of [...html.matchAll(scriptPattern)]) {
  const assetPath = resolve(distRoot, match[1].replace(/^\.?\//, ''))
  const javascript = (await readFile(assetPath, 'utf8')).replace(
    /<\/script/gi,
    '<\\/script',
  )
  html = html.replace(
    match[0],
    () => `<script type="module">${javascript}</script>`,
  )
}

await writeFile(outputPath, html, 'utf8')
console.log(`Local file preview updated: ${outputPath}`)
