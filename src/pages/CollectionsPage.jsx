import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ArrowUpRight, RotateCcw, Search } from 'lucide-react'
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import { collections, collectionNote } from '../data/collections'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ImageCanvas from '../components/ImageCanvas'
import ImageAsset from '../components/ImageAsset'
import PageMeta from '../components/PageMeta'

export default function CollectionsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const specific = slug ? collections.find((collection) => collection.slug === slug) : null
  const invalidSlug = Boolean(slug && !specific)
  const [category, setCategory] = useState(specific?.slug || 'all')
  const [sort, setSort] = useState('featured')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const urlSearch = searchParams.get('search') || ''
  const activeCategory = specific?.slug || category

  useEffect(() => {
    setCategory(specific?.slug || 'all')
  }, [slug])

  useLayoutEffect(() => {
    setSearch(urlSearch)
  }, [urlSearch])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    let items = products.filter((product) => {
      const categoryMatch = activeCategory === 'all' || product.collection === activeCategory
      const searchMatch = !term || `${product.title} ${product.category} ${product.description}`.toLowerCase().includes(term)
      return categoryMatch && searchMatch
    })
    if (sort === 'title') items = [...items].sort((a, b) => a.title.localeCompare(b.title))
    return items
  }, [activeCategory, search, sort])

  if (invalidSlug) return <section className="not-found"><PageMeta title="Collection Not Found" description="This collection is not part of the Prem Lehanga Studio preview." /><div className="not-found__number">04</div><p className="eyebrow">Collection not found</p><h1>This edit is <em>not here.</em></h1><Link className="button button--outline-dark" to="/collections">Explore all collections <ArrowUpRight size={15} /></Link></section>

  const current = specific || (activeCategory !== 'all' ? collections.find((item) => item.slug === activeCategory) : null)

  function resetFilters() {
    setSearch('')
    setSort('featured')
    if (slug) navigate('/collections', { replace: true })
    else {
      setCategory('all')
      setSearchParams({}, { replace: true })
    }
  }

  function submitSearch(event) {
    event.preventDefault()
    const value = search.trim()
    setSearchParams(value ? { search: value } : {}, { replace: true })
  }

  return (
    <div className="collections-page">
      <PageMeta title={current ? current.title : 'Explore Collections'} description="Browse illustrative bridal and occasion collection groupings from the Prem Lehanga Studio website concept." />
      <section className="page-intro page-intro--collections">
        <div className="page-intro__copy"><p className="eyebrow"><span className="gold-dot" /> The Prem collection</p><p className="page-intro__kicker">PREM LEHANGA STUDIO · EDIT {current?.number || '00'}</p><h1>{current ? <>{current.title.split(' ').slice(0, -1).join(' ')}<br /><em>{current.title.split(' ').slice(-1)}</em></> : <>Explore our<br /><em>collections.</em></>}</h1><p>{current?.short || 'A considered landscape for bridal and celebratory dressing.'}</p></div>
        <div className="page-intro__art">{current?.image ? <ImageAsset src={current.image} alt={current.imageAlt} width={720} height={1280} /> : <ImageCanvas variant={current?.variant || 'carmine'} number={current?.number || '00'} label="User-supplied studio image" />}<span className="page-intro__art-caption">ILLUSTRATIVE COLLECTION GROUPING</span></div>
      </section>
      <section className="collection-browser section-pad section-paper">
        <div className="collection-browser__top"><div><p className="eyebrow">Browse the edit</p><h2>Find your <em>moment.</em></h2></div><p className="editorial-note">{collectionNote}</p></div>
        <div className="collection-filters" aria-label="Collection filters">
          <div className="collection-filters__categories" role="group" aria-label="Filter by collection">
            <button type="button" className={activeCategory === 'all' ? 'filter-chip is-active' : 'filter-chip'} onClick={() => { if (slug) navigate('/collections'); else setCategory('all') }}>All edits</button>
            {collections.map((item) => <button key={item.slug} type="button" className={activeCategory === item.slug ? 'filter-chip is-active' : 'filter-chip'} onClick={() => { if (slug) navigate(`/collections/${item.slug}`); else setCategory(item.slug) }}>{item.title}</button>)}
          </div>
          <form className="collection-search" onSubmit={submitSearch} role="search"><Search size={15} /><label className="sr-only" htmlFor="collection-search">Search the collection preview</label><input id="collection-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the edit" /><button type="submit" aria-label="Search collections"><ArrowUpRight size={16} /></button></form>
          <div className="collection-filters__controls"><label className="sort-control"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort collection items"><option value="featured">Featured</option><option value="title">Title A–Z</option></select></label><button type="button" className="reset-filters" onClick={resetFilters}><RotateCcw size={13} />Reset</button></div>
        </div>
        <p className="filter-context">{filtered.length} illustrative {filtered.length === 1 ? 'design' : 'designs'} · Colour filters will be added alongside verified studio imagery.</p>
        {filtered.length ? <div className="product-grid product-grid--browser">{filtered.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div> : <div className="collection-empty"><div className="collection-empty__ornament">✳</div><p className="eyebrow">No matching edit</p><h3>Nothing in this preview<br />matches just yet.</h3><p>Try another word or clear your filters.</p><button className="button button--outline-dark" type="button" onClick={resetFilters}>Reset the edit <RotateCcw size={15} /></button></div>}
        <div className="collection-browser__bottom"><span className="eyebrow">New studio imagery to follow</span><Link className="text-link" to="/contact">Ask the studio <ArrowUpRight size={15} /></Link></div>
      </section>
    </div>
  )
}
