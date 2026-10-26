import { ArrowUpRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { brand } from '../data/brand'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import PageMeta from '../components/PageMeta'

export default function WishlistPage() {
  const wishlist = useWishlist()
  const saved = wishlist.items.map((slug) => products.find((item) => item.slug === slug)).filter(Boolean)
  return (
    <div className="wishlist-page">
      <PageMeta title="Saved Designs" description="Your locally saved illustrative designs in the Prem Lehanga Studio website concept." />
      <section className="wishlist-intro"><p className="eyebrow"><Heart size={14} /> Your saved edit</p><h1>Held close,<br /><em>for later.</em></h1><p>Your favourites stay in this browser, ready when you are.</p><span className="wishlist-intro__count">{saved.length.toString().padStart(2, '0')} <small>SAVED</small></span></section>
      {saved.length ? <section className="wishlist-list section-pad section-paper"><div className="product-grid">{saved.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div><div className="wishlist-list__note"><span className="eyebrow">A note from the preview</span><p>These illustrative display descriptions are not verified studio listings. Reach out directly for confirmed details.</p><a className="text-link" href={brand.instagramUrl} target="_blank" rel="noreferrer">Enquire on Instagram <ArrowUpRight size={14} /></a></div></section> : <section className="wishlist-empty section-paper"><span className="wishlist-empty__heart"><Heart size={27} strokeWidth={1.1} /></span><p className="eyebrow">A little room for something lovely</p><h2>Your edit is<br /><em>waiting to begin.</em></h2><p>Save an illustrative design and it will be gathered here for your next visit.</p><Link className="button button--burgundy" to="/collections">Explore the collections <ArrowUpRight size={15} /></Link></section>}
    </div>
  )
}
