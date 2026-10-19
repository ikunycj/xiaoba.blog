import { pushImages } from './image-pipeline.mjs'

try {
  pushImages(process.cwd())
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
