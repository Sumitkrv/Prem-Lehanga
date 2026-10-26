import { videoClips } from './videos'

export const lookbookFrames = videoClips.map((clip, index) => ({
  title: clip.title,
  variant: ['carmine', 'midnight', 'ivory', 'rose', 'rose'][index],
  number: clip.id,
  image: clip.poster,
  alt: clip.alt,
  shape: 'portrait',
}))
