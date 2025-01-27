import { Metadata } from 'next'

export function generatePageMeta({
  title,
  description,
  image = '/main-meta.png',
}: {
  title: string
  description: string
  image?: string
}): Metadata {
  return {
    title: title,
    description: description,
    appleWebApp: {
      title: title,
    },
    openGraph: {
      type: 'website',
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1917,
          height: 960,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1917,
          height: 960,
        },
      ],
    },
  }
}
