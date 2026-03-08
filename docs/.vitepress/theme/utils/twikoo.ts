export interface TwikooClient {
  init(options: Record<string, unknown>): Promise<unknown> | unknown
  getRecentComments(options: Record<string, unknown>): Promise<any[]>
}

declare global {
  interface Window {
    twikoo?: TwikooClient
  }
}

const TWIKOO_SCRIPT_ID = 'twikoo-client-script'
const TWIKOO_SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/twikoo@1.7.1/dist/twikoo.min.js'

let loader: Promise<TwikooClient> | null = null

export function loadTwikoo(): Promise<TwikooClient> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Twikoo can only be loaded in browser'))
  }

  if (window.twikoo) return Promise.resolve(window.twikoo)
  if (loader) return loader

  loader = new Promise((resolve, reject) => {
    const existing = document.getElementById(TWIKOO_SCRIPT_ID) as HTMLScriptElement | null

    if (existing) {
      existing.addEventListener('load', () => {
        if (window.twikoo) resolve(window.twikoo)
      })
      existing.addEventListener('error', () => {
        loader = null
        reject(new Error('Failed to load Twikoo script'))
      })
      if (window.twikoo) resolve(window.twikoo)
      return
    }

    const script = document.createElement('script')
    script.id = TWIKOO_SCRIPT_ID
    script.src = TWIKOO_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      if (!window.twikoo) {
        loader = null
        reject(new Error('Twikoo loaded but global object is missing'))
        return
      }
      resolve(window.twikoo)
    }
    script.onerror = () => {
      loader = null
      reject(new Error('Failed to load Twikoo script'))
    }

    document.head.appendChild(script)
  })

  return loader
}
