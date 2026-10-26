import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Copy, ZoomIn } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { brand } from '../data/brand'
import { products, getProduct } from '../data/products'
import ImageCanvas from '../components/ImageCanvas'
import ImageAsset from '../components/ImageAsset'
import WishlistButton from '../components/WishlistButton'
import ProductCard from '../components/ProductCard'
import Lightbox from '../components/Lightbox'
import PageMeta from '../components/PageMeta'
import InstagramMark from '../components/InstagramMark'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!product) return <section className="not-found"><PageMeta title="Design Not Found" description="This design is not part of the Prem Lehanga Studio preview." /><p className="eyebrow">Design not found</p><h1>That look is<br /><em>not in this edit.</em></h1><Link className="button button--outline-dark" to="/collections">Return to collections <ArrowLeft size={15} /></Link></section>

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 2)
  const message = `Hello ${brand.name}, I would love to enquire about ${product.title} (${product.category}).`

  async function copyEnquiry() {
    try { await navigator.clipboard.writeText(message); setCopied(true) } catch { setCopied(false) }
  }

  return (
    <div className="product-page">
      <PageMeta title={product.title} description={`${product.title} — an illustrative product description in the Prem Lehanga Studio website concept. Contact the studio for confirmed collection details.`} />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/collections">Collections</Link><span>/</span><Link to={`/collections/${product.collection}`}>{product.category}</Link><span>/</span><span aria-current="page">{product.title}</span></nav>
      <section className="product-detail">
        <div className="product-detail__gallery">
          <button type="button" className="product-detail__main-image" onClick={() => setLightboxOpen(true)} aria-label={`Enlarge preview for ${product.title}`}>{product.image ? <ImageAsset src={product.image} alt={product.imageAlt} width={720} height={1280} /> : <ImageCanvas variant={product.variant} number={product.number} label="Illustrative artwork" />}<span className="product-detail__zoom"><ZoomIn size={16} /> View image</span></button>
          <div className="product-detail__thumbs"><button className="product-detail__thumb is-current" type="button" aria-label="Current preview image" onClick={() => setLightboxOpen(true)}>{product.image ? <ImageAsset src={product.image} alt="" width={180} height={320} /> : <ImageCanvas variant={product.variant} number={product.number} label="Preview placeholder" />}</button><p>01 <span>/</span> 01 <small>One supplied video frame in this preview</small></p></div>
        </div>
        <div className="product-detail__info">
          <p className="eyebrow"><span className="gold-dot" /> {product.category} · Illustrative grouping</p>
          <h1>{product.title.split(' ').slice(0, -1).join(' ')} <em>{product.title.split(' ').slice(-1)}</em></h1>
          <p className="product-detail__price">Price on Enquiry</p>
          <div className="gold-rule" />
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__disclaimer">The image is a still from a video supplied for this concept. The descriptive name and collection grouping are not verified product details; availability and garment information should be confirmed with the studio.</p>
          <div className="product-detail__actions"><a className="button button--burgundy" href={brand.instagramUrl} target="_blank" rel="noreferrer">Enquire on Instagram <InstagramMark size={16} /><ArrowUpRight size={14} /></a><WishlistButton slug={product.slug} title={product.title} className="product-detail__save" /><span>Save to wishlist</span></div>
          <div className="product-detail__message"><p className="eyebrow">A message for the studio</p><p>{message}</p><div className="product-detail__message-actions"><button type="button" className="text-link" onClick={copyEnquiry}><Copy size={14} />{copied ? 'Copied' : 'Copy enquiry note'}{copied && <Check size={13} />}</button><a className="text-link" href={brand.instagramUrl} target="_blank" rel="noreferrer">Open profile <ArrowUpRight size={14} /></a></div></div>
          <Link className="product-detail__back" to={`/collections/${product.collection}`}><ArrowLeft size={14} /> Back to {product.category}</Link>
        </div>
      </section>
      <section className="related-section section-pad section-paper"><div className="related-section__head"><div><p className="eyebrow">Continue the edit</p><h2>More to <em>discover.</em></h2></div><Link className="text-link" to="/collections">All collections <ArrowUpRight size={15} /></Link></div><div className="product-grid product-grid--related">{related.map((item, index) => <ProductCard key={item.slug} product={item} index={index} />)}</div></section>
      <Lightbox items={[{ title: product.title, variant: product.variant, number: product.number, image: product.image, alt: product.imageAlt }]} activeIndex={lightboxOpen ? 0 : -1} onClose={() => setLightboxOpen(false)} onChange={() => {}} />
    </div>
  )
}
