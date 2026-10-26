import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageCanvas from './ImageCanvas'
import ImageAsset from './ImageAsset'
import WishlistButton from './WishlistButton'

export default function ProductCard({ product, index = 0 }) {
  return (
    <article className={`product-card product-card--${index % 2 ? 'raised' : 'rest'}`}>
      <div className="product-card__image-wrap">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
          {product.image ? <ImageAsset src={product.image} alt={product.imageAlt} width={720} height={1280} /> : <ImageCanvas variant={product.variant} number={product.number} label="Illustrative placeholder · studio image pending" />}
        </Link>
        <WishlistButton slug={product.slug} title={product.title} className="product-card__heart" />
      </div>
      <div className="product-card__meta">
        <div><p className="eyebrow">{product.category}</p><h3><Link to={`/product/${product.slug}`}>{product.title}</Link></h3></div>
        <span className="product-card__index">{product.number}</span>
      </div>
      <div className="product-card__bottom">
        <span>Price on Enquiry</span>
        <Link to={`/product/${product.slug}`} className="text-link">Discover <ArrowUpRight size={14} /></Link>
      </div>
    </article>
  )
}
