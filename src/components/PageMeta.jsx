import { useEffect } from 'react'

export default function PageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = `${title} | Prem Lehanga Studio`
    document.title = fullTitle
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')

    const openGraph = [
      ['og:title', fullTitle],
      ['og:description', description],
    ]
    for (const [property, content] of openGraph) {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
  }, [title, description])

  return null
}
