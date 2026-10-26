import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import EnquiryForm from '../components/EnquiryForm'
import PageMeta from '../components/PageMeta'
import InstagramMark from '../components/InstagramMark'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <PageMeta title="Private Viewing & Studio Enquiries" description="Prepare a private viewing request and contact Prem Lehanga Studio on its verified Instagram profile." />
      <section className="contact-hero">
        <p className="eyebrow"><span className="gold-dot" /> Visit the studio</p>
        <h1>A moment<br />to <em>make yours.</em></h1>
        <p>Share a little about the occasion and prepare a note to send directly to the studio.</p>
        <div className="contact-hero__note"><MapPin size={16} /><span>Studio address and appointment details are not verified for this preview.</span></div>
      </section>
      <section className="contact-content section-pad-dark">
        <div className="contact-content__form"><div className="contact-content__intro"><p className="eyebrow">Request a private viewing</p><h2>Your dream<br />ensemble <em>awaits.</em></h2><p>Complete the note below. You can copy it and share it with the studio on Instagram. This form does not send or confirm a booking.</p></div><EnquiryForm /></div>
        <aside className="contact-content__aside">
          <div className="contact-card"><span className="contact-card__index">01</span><p className="eyebrow">Connect</p><h3>Begin a<br /><em>conversation.</em></h3><p>For the latest collection and direct studio information, visit the official Instagram profile.</p><a className="text-link text-link--light" href={brand.instagramUrl} target="_blank" rel="noreferrer"><InstagramMark size={15} />{brand.instagramHandle}<ArrowUpRight size={14} /></a></div>
          <div className="contact-card contact-card--secondary"><span className="contact-card__index">02</span><p className="eyebrow">Visit</p><h3>By private<br /><em>arrangement.</em></h3><p>{brand.studioVisitCopy} Please confirm the location and timing directly with the studio before visiting.</p><Link className="text-link text-link--light" to="/our-story">About the studio <ArrowUpRight size={14} /></Link></div>
        </aside>
      </section>
      <section className="contact-bottom section-paper"><span className="eyebrow">A considered beginning</span><p>Original designs, studio availability and appointment details are best confirmed with Prem Lehanga Studio.</p><Link className="button button--outline-dark" to="/collections">Return to the collections <ArrowUpRight size={15} /></Link></section>
    </div>
  )
}
