import type { MetaFunction } from 'react-router'

import { getBaseUrl } from '@/lib/utils'

interface CustomMetaArgs {
  title?: string
  description?: string
  keywords?: string[]
  openGraph?: {
    url?: string
    images?: { url: string; alt?: string }[] | { url: string; alt?: string }
    [key: string]: unknown
  }
  twitter?: {
    card?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

export const createMetadata = (
  override: Partial<CustomMetaArgs> = {},
): MetaFunction => {
  const siteName = 'Create Yuki Turbo'
  const title = override.title ? `${override.title} | ${siteName}` : siteName
  const description =
    override.description ??
    'Clean and typesafe starter monorepo using Turborepo along with Next.js and tRPC '

  const {
    title: _,
    description: __,
    keywords = [],
    openGraph,
    ...restOverride
  } = override
  const { images: ogImages, url: ogUrl, ...restOpenGraph } = openGraph ?? {}
  const url = `${getBaseUrl()}${ogUrl ?? ''}`

  return () => {
    return [
      { title },
      { name: 'description', content: description },
      { name: 'application-name', content: siteName },
      { name: 'keywords', content: [...keywords, 'Turborepo'].join(', ') },
      // Open Graph tags
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:site_name', content: siteName },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'http://localhost:3000/api/og' },
      { property: 'og:image:alt', content: 'Yuki' },
      ...(Array.isArray(ogImages)
        ? ogImages.map(({ url, alt }) => ({
            property: 'og:image',
            content: url,
            alt,
          }))
        : ogImages
          ? [
              {
                property: 'og:image',
                content: ogImages.url,
                alt: ogImages.alt,
              },
            ]
          : []),
      ...Object.entries(restOpenGraph).map(([key, value]) => ({
        property: `og:${key}`,
        content: value as string,
      })),
      // Twitter tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      ...Object.entries(override.twitter ?? {}).map(([key, value]) => ({
        name: `twitter:${key}`,
        content: value as string,
      })),
      ...Object.entries(restOverride).map(([key, value]) => ({
        name: key,
        content: value as string,
      })),
    ]
  }
}
