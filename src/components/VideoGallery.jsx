import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

function VideoCard({ clip, index, videos, onOpenStill }) {
  return (
    <figure className={`video-card video-card--${index + 1}`}>
      <div className="video-card__frame">
        <video
          ref={(element) => { videos.current[index] = element }}
          controls
          playsInline
          preload="none"
          poster={clip.poster}
          aria-label={`${clip.title}. ${clip.alt}`}
          onPlay={() => videos.current.forEach((video, videoIndex) => { if (video && videoIndex !== index) video.pause() })}
        >
          <source src={clip.src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        {onOpenStill && <button className="video-card__expand" type="button" onClick={() => onOpenStill(clip)} aria-label={`Open still for ${clip.title}`}><ArrowUpRight size={15} /></button>}
      </div>
      <figcaption className="video-card__caption">
        <div><p className="eyebrow">Studio reel · {clip.id}</p><h3>{clip.title}</h3><p>{clip.caption}</p></div>
        <span>{clip.duration}</span>
      </figcaption>
    </figure>
  )
}

export default function VideoGallery({ clips, className = '', onOpenStill }) {
  const videos = useRef([])
  return (
    <div className={`video-gallery ${className}`}>
      {clips.map((clip, index) => <VideoCard key={clip.id} clip={clip} index={index} videos={videos} onOpenStill={onOpenStill} />)}
    </div>
  )
}
