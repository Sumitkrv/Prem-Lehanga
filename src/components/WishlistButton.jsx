import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

export default function WishlistButton({ slug, title, className = '' }) {
  const wishlist = useWishlist()
  const saved = wishlist.isSaved(slug)
  return (
    <button
      type="button"
      className={`wishlist-button ${className}`}
      onClick={() => wishlist.toggle(slug)}
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      aria-pressed={saved}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
    >
      <Heart size={18} strokeWidth={1.45} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
