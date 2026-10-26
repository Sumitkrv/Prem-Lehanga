import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import ImageCanvas from './ImageCanvas'
import ImageAsset from './ImageAsset'

export default function Lightbox({ items, activeIndex, onClose, onChange }) {
  const reduce = useReducedMotion()
  const current = items[activeIndex]

  useEffect(() => {
    if (activeIndex < 0) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((activeIndex + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange((activeIndex - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('has-modal')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('has-modal')
    }
  }, [activeIndex, items.length, onChange, onClose])

  return (
    <AnimatePresence>
      {activeIndex >= 0 && current && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Lookbook image preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
          <button className="lightbox__close" type="button" onClick={onClose} aria-label="Close image preview"><X /></button>
          <button className="lightbox__arrow lightbox__arrow--left" type="button" onClick={() => onChange((activeIndex - 1 + items.length) % items.length)} aria-label="Previous image"><ArrowLeft /></button>
          <motion.div className="lightbox__body" key={current.number} initial={reduce ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            {current.image ? <ImageAsset className="lightbox__image" src={current.image} alt={current.alt || current.title} width={720} height={1280} loading="eager" /> : <ImageCanvas variant={current.variant} number={current.number} label="Illustrative textile-inspired artwork" />}
            <div className="lightbox__caption"><span>{current.title}</span><small>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small></div>
          </motion.div>
          <button className="lightbox__arrow lightbox__arrow--right" type="button" onClick={() => onChange((activeIndex + 1) % items.length)} aria-label="Next image"><ArrowRight /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
