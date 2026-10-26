import { useCallback, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { brand } from '../data/brand'
import { lookbookFrames } from '../data/lookbook'
import { mediaNote, videoClips } from '../data/videos'
import VideoGallery from '../components/VideoGallery'
import Lightbox from '../components/Lightbox'
import PageMeta from '../components/PageMeta'

export default function LookbookPage() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const change = useCallback((index) => setActiveIndex(index), [])
  const close = useCallback(() => setActiveIndex(-1), [])
  const openStill = useCallback((clip) => {
    const index = videoClips.findIndex((item) => item.id === clip.id)
    setActiveIndex(index)
  }, [])

  return (
    <div className="lookbook-page">
      <PageMeta title="The Prem Edit" description="Five user-supplied studio videos in an editorial fashion journal for the Prem Lehanga Studio website concept." />
      <section className="lookbook-hero">
        <p className="eyebrow"><span className="gold-dot" /> The Prem edit</p>
        <h1>A celebration of<br /><em>colour and occasion.</em></h1>
        <p>Five supplied studio clips, presented in a considered moving-image journal. Start playback only when a look catches your eye.</p>
        <span className="lookbook-hero__issue">VOL. 01 <i /> STUDIO IN MOTION</span>
      </section>
      <section className="lookbook-gallery section-pad section-paper" aria-label="Supplied studio videos">
        <VideoGallery clips={videoClips} className="video-gallery--lookbook" onOpenStill={openStill} />
        <p className="editorial-note">{mediaNote} Each clip is local, user-initiated and set to preload none.</p>
      </section>
      <section className="lookbook-note"><div><p className="eyebrow">A note on this moving image journal</p><h2>Original looks,<br /><em>in motion.</em></h2></div><div><p>These videos were supplied for the website concept. Descriptive captions help visitors browse; they are not official product names or claims about availability.</p><a className="button button--outline-light" href={brand.instagramUrl} target="_blank" rel="noreferrer">Visit the Instagram journal <ArrowUpRight size={15} /></a></div></section>
      <Lightbox items={lookbookFrames} activeIndex={activeIndex} onClose={close} onChange={change} />
    </div>
  )
}
