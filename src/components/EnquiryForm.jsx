import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { brand } from '../data/brand'
import { collections } from '../data/collections'
import { localDateInputValue } from '../utils/dates'
import InstagramMark from './InstagramMark'

function makeMessage(form) {
  return [
    `Hello ${brand.name}, I would like to request a private viewing.`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Preferred date: ${form.date}`,
    `Occasion: ${form.occasion}`,
    `Collection of interest: ${form.collection || 'Not selected'}`,
    form.note ? `A note: ${form.note}` : '',
  ].filter(Boolean).join('\n')
}

export default function EnquiryForm({ compact = false }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', occasion: '', collection: '', note: '' })
  const [prepared, setPrepared] = useState(false)
  const [copied, setCopied] = useState(false)
  const message = useMemo(() => makeMessage(form), [form])

  function update(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setPrepared(false)
    setCopied(false)
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  function submit(event) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setPrepared(true)
  }

  return (
    <div className={`enquiry-form-wrap ${compact ? 'enquiry-form-wrap--compact' : ''}`}>
      <form className="enquiry-form" onSubmit={submit}>
        <div className="form-grid">
          <label>
            <span>Full name</span>
            <input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your name" minLength="2" required />
          </label>
          <label>
            <span>Phone number</span>
            <input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{7,24}" title="Enter a valid phone number" placeholder="Include country code" required />
          </label>
          <label>
            <span>Preferred date</span>
            <input name="date" type="date" min={localDateInputValue()} value={form.date} onChange={update} required />
          </label>
          <label>
            <span>Occasion</span>
            <input name="occasion" value={form.occasion} onChange={update} placeholder="Wedding, celebration…" required />
          </label>
          <label className="form-grid__wide">
            <span>Collection of interest <small>Optional</small></span>
            <select name="collection" value={form.collection} onChange={update}>
              <option value="">Choose an illustrative grouping</option>
              {collections.map((collection) => <option key={collection.slug} value={collection.title}>{collection.title}</option>)}
            </select>
          </label>
          <label className="form-grid__wide">
            <span>A note for the studio <small>Optional</small></span>
            <textarea name="note" value={form.note} onChange={update} rows="3" placeholder="Share anything you would like the team to know." />
          </label>
        </div>
        <button className="button button--gold form-submit" type="submit">Prepare viewing request <ArrowUpRight size={16} /></button>
        <p className="form-privacy">Your details stay in this browser and are not saved or sent by this demo.</p>
      </form>
      {prepared && (
        <div className="request-ready" role="status" aria-live="polite">
          <div className="request-ready__heading"><span className="request-ready__icon"><Check size={16} /></span><div><strong>Your note is ready</strong><p>No request has been sent or booked. Share it with the studio to continue.</p></div></div>
          <pre>{message}</pre>
          <div className="request-ready__actions">
            <button className="button button--outline-light" type="button" onClick={copyMessage}><Copy size={15} />{copied ? 'Copied' : 'Copy note'}</button>
            <a className="button button--gold" href={brand.instagramDmUrl} target="_blank" rel="noreferrer"><InstagramMark size={15} />Open Instagram <ArrowUpRight size={14} /></a>
          </div>
        </div>
      )}
    </div>
  )
}
