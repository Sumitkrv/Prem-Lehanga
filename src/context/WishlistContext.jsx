import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'prem-lehanga-studio-wishlist'
const WishlistContext = createContext(null)

function readWishlist() {
  if (typeof window === 'undefined') return []
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(stored) ? [...new Set(stored.filter((value) => typeof value === 'string'))] : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readWishlist)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // The wishlist remains usable for this visit if storage is unavailable.
    }
  }, [items])

  const value = useMemo(() => ({
    items,
    count: items.length,
    isSaved: (slug) => items.includes(slug),
    toggle: (slug) => setItems((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug]),
    remove: (slug) => setItems((current) => current.filter((item) => item !== slug)),
  }), [items])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider')
  return context
}
