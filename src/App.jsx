import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import SiteLayout from './components/SiteLayout'

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <SiteLayout />
      </BrowserRouter>
    </WishlistProvider>
  )
}
