import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <section className="not-found">
      <PageMeta title="Page Not Found" description="The page you are looking for is not part of the Prem Lehanga Studio preview." />
      <span className="not-found__number">404</span>
      <p className="eyebrow"><span className="gold-dot" /> A page out of frame</p>
      <h1>This moment<br /><em>is elsewhere.</em></h1>
      <p>The page may have moved, or the link may be from a different edit.</p>
      <div className="not-found__actions"><button className="button button--outline-dark" type="button" onClick={() => navigate(-1)}><ArrowLeft size={15} />Go back</button><Link className="button button--burgundy" to="/">Return home <ArrowUpRight size={15} /></Link></div>
    </section>
  )
}
