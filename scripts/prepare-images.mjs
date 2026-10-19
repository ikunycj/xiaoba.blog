import { prepareImages } from './image-pipeline.mjs'

try {
  const files = process.argv.slice(2).filter((arg) => arg !== '--')
  prepareImages(process.cwd(), { files: files.length ? files : undefined })
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
