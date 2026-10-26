import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageAsset from '../components/ImageAsset'
import PageMeta from '../components/PageMeta'

export default function StoryPage() {
  return (
    <div className="story-page">
      <PageMeta title="Our Story" description="An editorial introduction to the Prem Lehanga Studio concept, with brand history and studio details awaiting verification." />
      <section className="story-hero">
        <div><p className="eyebrow"><span className="gold-dot" /> Our story</p><h1>An atelier of<br /><em>possibility.</em></h1><p>Every celebration begins with a feeling. This is a place to imagine the clothes, colours and moments that will make it yours.</p><Link className="button button--gold" to="/collections">Explore the collection <ArrowRight size={15} /></Link></div>
        <div className="story-hero__image"><ImageAsset src="/assets/hero/prem-studio-pair.jpg" alt="Two models wearing embellished teal and red outfits at an arched studio backdrop." width={1150} height={1536} /><span className="story-hero__caption">A PLACE FOR THE STUDIO’S STORY</span></div>
      </section>
      <section className="story-manifesto section-pad section-paper">
        <p className="eyebrow">A note on the Prem world</p>
        <h2>For the moments<br />that <em>become memory.</em></h2>
        <div className="story-manifesto__copy"><p>Prem Lehanga Studio is presented here as a destination for bridal and celebratory Indian fashion. The experience is built around the anticipation of a special occasion: the first look through a collection, the quiet details, and the confidence of finding something that feels right.</p><p>This independent website concept keeps space for the studio’s own voice. Its history, people, techniques and collection stories should be introduced here only when confirmed by the brand.</p><Link className="text-link" to="/contact">Connect with the studio <ArrowUpRight size={15} /></Link></div>
      </section>
      <section className="story-pair"><div className="story-pair__art"><ImageAsset src="/assets/video/prem-reel-02-poster.jpg" alt="A black embellished occasion look, still from a supplied studio video." width={720} height={1280} /></div><div className="story-pair__copy"><p className="eyebrow"><span className="gold-dot" /> The feeling of occasion</p><h2>Colour, shape<br />and <em>presence.</em></h2><p>Indian celebration dressing holds a world of expression. The right ensemble can feel vivid, graceful, quietly assured — and entirely personal.</p><p>The descriptive groupings in this preview are illustrative. Garment details and official collection names should be confirmed with the studio.</p></div></section>
      <section className="story-final"><p className="eyebrow">Continue into the Prem edit</p><h2>Begin with the<br /><em>occasion.</em></h2><Link className="button button--outline-light" to="/collections">Browse the collection <ArrowUpRight size={15} /></Link></section>
    </div>
  )
}
