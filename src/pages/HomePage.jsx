import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import { collectionNote, collections } from '../data/collections'
import { products } from '../data/products'
import ImageCanvas from '../components/ImageCanvas'
import ImageAsset from '../components/ImageAsset'
import ProductCard from '../components/ProductCard'
import InstagramMark from '../components/InstagramMark'
import VideoGallery from '../components/VideoGallery'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import EnquiryForm from '../components/EnquiryForm'
import PageMeta from '../components/PageMeta'
import { videoClips, mediaNote } from '../data/videos'

function CollectionCard({ collection, index }) {
  return (
    <Link to={`/collections/${collection.slug}`} className={`collection-card collection-card--${index + 1}`}>
      {collection.image ? <ImageAsset src={collection.image} alt={collection.imageAlt} width={720} height={1280} /> : <ImageCanvas variant={collection.variant} number={collection.number} label="Illustrative collection artwork · photography pending" />}
      <div className="collection-card__bottom"><div><span className="eyebrow">Illustrative grouping · {collection.number}</span><h3>{collection.title}</h3></div><span className="collection-card__arrow"><ArrowUpRight size={17} /></span></div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <PageMeta title="Home" description="An independent digital concept for Prem Lehanga Studio. Explore illustrative bridal and occasion wear groupings and connect with the studio on Instagram." />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow"><span className="gold-dot" /> A world of celebration</p>
          <p className="hero__index">PREM LEHANGA STUDIO <span>·</span> 01 / 04</p>
          <h1 id="hero-title">Where every bride<br /><em>begins her story.</em></h1>
          <p className="hero__description">An intimate world of bridal elegance, thoughtfully imagined for life’s most unforgettable moments.</p>
          <div className="hero__actions">
            <Link className="button button--gold" to="/collections">Explore the collections <ArrowUpRight size={15} /></Link>
            <Link className="button button--text-light" to="/contact">Book a private viewing <ArrowRight size={15} /></Link>
          </div>
          <div className="hero__bottom-note"><span className="hero__line" /><span>USER-SUPPLIED STUDIO PORTRAIT</span></div>
        </div>
        <Reveal className="hero__visual" delay={0.12}>
          <ImageAsset className="hero-photo" src="/assets/hero/prem-studio-pair.jpg" alt="Two models in richly embroidered teal and red occasion outfits, posed against an arched studio backdrop." width={1150} height={1536} loading="eager" fetchPriority="high" />
          <div className="hero__visual-frame" aria-hidden="true" />
          <span className="hero__side-note">A PORTRAIT FROM THE SUPPLIED STUDIO MEDIA</span>
        </Reveal>
        <a href="#world" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={15} /></a>
      </section>

      <section className="world-section section-pad" id="world">
        <div className="world-section__art">
          <Reveal className="world-section__main-art"><ImageAsset src="/assets/video/prem-reel-03-poster.jpg" alt="Close view of embroidery on an ivory outfit, still from a supplied studio video." width={720} height={1280} /></Reveal>
          <div className="world-section__art-note"><span>THE WORLD OF PREM</span><span>A SUPPLIED STUDIO IMAGE</span></div>
          <div className="world-section__stamp" aria-hidden="true"><span>PREM</span><small>LEHANGA<br />STUDIO</small></div>
        </div>
        <Reveal className="world-section__copy">
          <p className="eyebrow"><span className="gold-dot" /> The world of Prem</p>
          <h2>Crafted for moments<br />that <em>last forever.</em></h2>
          <p className="world-section__lead">The most meaningful occasions ask for a feeling all their own.</p>
          <p>Prem Lehanga Studio is imagined here as a considered destination for bridal and celebratory Indian fashion — a place to pause, explore and find a look that feels true to the moment.</p>
          <Link className="text-link" to="/our-story">Explore our story <ArrowUpRight size={15} /></Link>
          <span className="world-section__ornament" aria-hidden="true">✳</span>
        </Reveal>
      </section>

      <section className="collections-section section-pad section-paper">
        <div className="section-topline"><span className="eyebrow">The collection edit</span><Link className="text-link" to="/collections">View all collections <ArrowUpRight size={15} /></Link></div>
        <SectionHeading eyebrow="A study in occasion" title={<>An invitation<br /><em>to celebrate.</em></>} copy="Illustrative groupings for the Prem Lehanga Studio preview. Final categories await studio confirmation." number="01 / 04" />
        <div className="collection-mosaic">{collections.map((collection, index) => <CollectionCard key={collection.slug} collection={collection} index={index} />)}</div>
        <p className="editorial-note">{collectionNote}</p>
      </section>

      <section className="bridal-edit section-pad-dark">
        <Reveal className="bridal-edit__image"><ImageAsset src="/assets/video/prem-reel-04-poster.jpg" alt="A model wearing a detailed rose and gold outfit, still from a supplied studio video." width={720} height={1280} /><span className="bridal-edit__frame" aria-hidden="true" /></Reveal>
        <div className="bridal-edit__copy">
          <p className="eyebrow"><span className="gold-dot" /> The bridal edit</p>
          <h2>For the bride<br />who dreams<br /><em>in grandeur.</em></h2>
          <p>A first look deserves a little room to become a feeling. Discover a considered edit for the day that will always be yours.</p>
          <Link className="button button--outline-light" to="/collections/bridal-lehengas">Discover bridal couture <ArrowUpRight size={15} /></Link>
          <span className="bridal-edit__footnote">SUPPLIED REEL FRAME · PRODUCT DETAILS UNCONFIRMED</span>
        </div>
      </section>

      <section className="featured-section section-pad">
        <div className="section-topline"><span className="eyebrow">The studio selection</span><span className="section-heading__number">04 ILLUSTRATIVE LOOKS</span></div>
        <SectionHeading eyebrow="Featured creations" title={<>A glimpse of what<br /><em>could be.</em></>} copy="Images are frames from videos supplied for this concept. Titles and collection placements are descriptive, not confirmed studio listings." />
        <div className="product-grid">{products.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>
        <div className="center-action"><Link className="button button--outline-dark" to="/collections">Explore the full edit <ArrowRight size={15} /></Link></div>
      </section>

      <section className="story-interlude">
        <div className="story-interlude__text">
          <p className="eyebrow"><span className="gold-dot" /> A note on the details</p>
          <h2>Every detail<br />tells <em>a story.</em></h2>
          <p>From the first impression to the last glance in the mirror, occasion dressing is a language of its own. This preview leaves space for the studio’s true pieces and their stories to take centre stage.</p>
          <Link className="text-link" to="/our-story">Read the studio story <ArrowUpRight size={15} /></Link>
        </div>
        <Reveal className="story-interlude__art"><ImageAsset src="/assets/video/prem-reel-03-poster.jpg" alt="A close view of embellished embroidery and draping from a supplied studio video." width={720} height={1280} /><span className="story-interlude__vertical">DETAIL · TEXTURE · OCCASION</span></Reveal>
        <span className="story-interlude__quote">“A moment,<br />made your own.”</span>
      </section>

      <section className="lookbook-section section-pad section-paper">
        <div className="lookbook-section__head">
          <SectionHeading eyebrow="The Prem edit" title={<>The collection,<br /><em>in motion.</em></>} copy="A selection of supplied studio videos, ready to explore at your pace." />
          <Link className="text-link" to="/lookbook">Enter the lookbook <ArrowUpRight size={15} /></Link>
        </div>
        <VideoGallery clips={[videoClips[0], videoClips[3], videoClips[4]]} className="video-gallery--preview" />
        <p className="editorial-note">{mediaNote} Playback begins only when selected; the page never autoplays or preloads the full clips.</p>
      </section>

      <section className="viewing-section section-pad-dark" id="appointment">
        <div className="viewing-section__intro">
          <p className="eyebrow"><span className="gold-dot" /> A private viewing</p>
          <h2>Your dream<br />ensemble <em>awaits.</em></h2>
          <p>Discover a look that feels uniquely yours. Connect with the studio to explore the collection and plan a visit.</p>
          <div className="viewing-section__contact"><InstagramMark size={16} /><span>For confirmed studio details, speak directly with the team.</span></div>
        </div>
        <div className="viewing-section__form"><EnquiryForm compact /></div>
      </section>

      <section className="instagram-section section-pad">
        <div className="instagram-section__mark"><InstagramMark size={25} strokeWidth={1.15} /></div>
        <p className="eyebrow">The Instagram journal</p>
        <h2>Follow the <em>elegance.</em></h2>
        <p className="instagram-section__handle">{brand.instagramHandle}</p>
        <p className="instagram-section__copy">Visit the studio’s own journal for original campaign imagery, collection details and the latest view from Prem Lehanga Studio.</p>
        <a className="button button--outline-dark" href={brand.instagramUrl} target="_blank" rel="noreferrer">View on Instagram <ArrowUpRight size={15} /></a>
        <div className="instagram-section__disclaimer"><span className="eyebrow">No feed preview shown</span><span>Original posts remain on the studio’s Instagram profile.</span></div>
      </section>

      <section className="visit-section section-paper">
        <div className="visit-section__index" aria-hidden="true"><span>10</span><i /></div>
        <div><p className="eyebrow">A visit, by invitation</p><h2>Come closer<br />to the <em>occasion.</em></h2></div>
        <div className="visit-section__right"><p>{brand.studioVisitCopy} Location and appointment details are not verified for this preview.</p><Link className="text-link" to="/contact">Contact the studio <ArrowUpRight size={15} /></Link></div>
      </section>
    </>
  )
}
