import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Heart, Menu, Search, X } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { brand } from '../data/brand'
import { useWishlist } from '../context/WishlistContext'
import HomePage from '../pages/HomePage'
import CollectionsPage from '../pages/CollectionsPage'
import ProductPage from '../pages/ProductPage'
import LookbookPage from '../pages/LookbookPage'
import StoryPage from '../pages/StoryPage'
import ContactPage from '../pages/ContactPage'
import WishlistPage from '../pages/WishlistPage'
import NotFoundPage from '../pages/NotFoundPage'
import InstagramMark from './InstagramMark'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Bridal Couture', to: '/collections/bridal-lehengas' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Visit Studio', to: '/contact' },
]

function IntroScreen() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    if (reduce || typeof window === 'undefined') return false
    try { return !window.sessionStorage.getItem('prem-intro-seen') } catch { return false }
  })

  useEffect(() => {
    if (!visible) return undefined
    const timer = window.setTimeout(() => {
      setVisible(false)
      try { window.sessionStorage.setItem('prem-intro-seen', '1') } catch { /* Continue without session storage. */ }
    }, 620)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42, ease: 'easeInOut' }} aria-hidden="true">
          <motion.span className="intro-screen__rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
          <motion.img className="intro-screen__logo" src="/assets/brand/prem-logo.svg" alt="" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.08 }} />
          <small>PREM LEHANGA STUDIO</small>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const wishlist = useWishlist()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setSearchError('')
  }, [location.pathname, location.search])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setMobileOpen(false); setSearchOpen(false) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function submitSearch(event) {
    event.preventDefault()
    const value = query.trim()
    if (!value) {
      setSearchError('Enter a word or collection to search.')
      return
    }
    navigate(`/collections?search=${encodeURIComponent(value)}`)
  }

  const desktopNav = useMemo(() => navItems.map((item) => (
    <NavLink key={item.to} to={item.to} end={item.to === '/' || item.to === '/collections'} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>{item.label}</NavLink>
  )), [])

  return (
    <>
      <div className="concept-ribbon"><span>AN INDEPENDENT WEBSITE CONCEPT</span><i /><span>OFFICIAL IMAGERY AWAITS CONFIRMATION</span></div>
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <button className="icon-button mobile-menu-toggle" type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X /> : <Menu />}</button>
          <Link className="wordmark" to="/" aria-label="Prem Lehanga Studio home">
            <img src="/assets/brand/prem-logo.svg" alt="" />
            <span className="wordmark__text"><span>PREM</span><small>LEHANGA STUDIO</small></span>
          </Link>
          <nav className="desktop-navigation" aria-label="Main navigation">{desktopNav}</nav>
          <div className="header-actions">
            <button className="icon-button header-search-toggle" type="button" onClick={() => setSearchOpen((value) => !value)} aria-label={searchOpen ? 'Close search' : 'Open collection search'} aria-expanded={searchOpen}><Search /></button>
            <Link className="icon-button header-wishlist" to="/wishlist" aria-label={`Wishlist, ${wishlist.count} saved ${wishlist.count === 1 ? 'item' : 'items'}`}><Heart /><span className="wishlist-count">{wishlist.count}</span></Link>
            <a className="header-instagram icon-button" href={brand.instagramUrl} target="_blank" rel="noreferrer" aria-label="Visit Prem Lehanga Studio on Instagram"><InstagramMark /></a>
            <Link className="header-appointment" to="/contact">Private viewing <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.div className="header-search-panel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <form onSubmit={submitSearch} role="search">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="site-search">Search illustrative collections</label>
                <input autoFocus id="site-search" value={query} onChange={(event) => { setQuery(event.target.value); setSearchError('') }} placeholder="Search collections or descriptions" />
                <button type="submit">Search <ArrowUpRight size={14} /></button>
              </form>
              {searchError && <p role="alert">{searchError}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow">The world of Prem</p>
            {navItems.map((item, index) => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={17} /></NavLink>)}
            <a className="mobile-navigation__social" href={brand.instagramUrl} target="_blank" rel="noreferrer"><InstagramMark size={16} /> Follow {brand.instagramHandle}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="footer-brand-block">
          <Link className="wordmark wordmark--footer" to="/" aria-label="Prem Lehanga Studio home"><img src="/assets/brand/prem-logo.svg" alt="" /><span className="wordmark__text"><span>PREM</span><small>LEHANGA STUDIO</small></span></Link>
          <p>Elegance, made unforgettable.</p>
        </div>
        <div className="footer-column"><p className="eyebrow">Explore</p><Link to="/our-story">Our Story</Link><Link to="/lookbook">The Prem Edit</Link><Link to="/contact">Private Viewing</Link></div>
        <div className="footer-column"><p className="eyebrow">Collections</p><Link to="/collections">Explore All</Link><Link to="/collections/bridal-lehengas">Bridal Couture</Link><Link to="/collections/reception-edits">Reception Edits</Link></div>
        <div className="footer-column"><p className="eyebrow">Connect</p><a href={brand.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><Link to="/wishlist">Saved Designs</Link><p className="footer-visit">{brand.studioVisitCopy}</p></div>
      </div>
      <div className="site-footer__bottom"><span>© {year} Prem Lehanga Studio</span><span>Independent website concept / demo</span><Link to="/contact">Request an appointment <ArrowDown size={13} /></Link></div>
    </footer>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main id="main-content" className="page-shell" key={location.pathname} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/our-story" element={<StoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <IntroScreen />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </>
  )
}
