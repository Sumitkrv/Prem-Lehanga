import { test, expect } from '@playwright/test'

const pages = [
  ['/', /where every bride/i],
  ['/collections', /explore our/i],
  ['/collections/bridal-lehengas', /bridal.*lehenga/i],
  ['/product/crimson-bridal-ensemble', /crimson bridal ensemble/i],
  ['/lookbook', /a celebration of/i],
  ['/our-story', /an atelier of/i],
  ['/contact', /a moment/i],
  ['/wishlist', /held close/i],
  ['/not-a-real-route', /this moment/i],
]

test('all public routes render and deep links refresh', async ({ page }) => {
  const pageErrors = []
  const consoleErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  for (const [path, heading] of pages) {
    await page.goto(path)
    await expect(page.locator('h1').first()).toContainText(heading)
    await page.reload()
    await expect(page.locator('h1').first()).toContainText(heading)
  }
  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})

test('collection and product navigation supports browser back and forward', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Explore the collections' }).click()
  await expect(page).toHaveURL(/\/collections$/)
  await page.getByRole('link', { name: 'Crimson Bridal Ensemble', exact: true }).click()
  await expect(page).toHaveURL(/\/product\/crimson-bridal-ensemble$/)
  await page.goBack()
  await expect(page).toHaveURL(/\/collections$/)
  await page.goForward()
  await expect(page.locator('h1').first()).toContainText(/crimson bridal ensemble/i)
})

test('collection search, filtering, sorting and reset work', async ({ page }) => {
  await page.goto('/collections')
  await page.getByLabel('Filter by collection').getByRole('button', { name: 'Bridal Lehengas' }).click()
  await expect(page.getByRole('heading', { name: 'Crimson Bridal Ensemble' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Ivory Embroidered Lehenga' })).toHaveCount(0)

  await page.getByLabel('Filter by collection').getByRole('button', { name: 'All edits' }).click()
  await page.getByLabel('Sort collection items').selectOption('title')
  const sortedTitles = await page.locator('.product-card__meta h3').allTextContents()
  expect(sortedTitles).toEqual([...sortedTitles].sort((a, b) => a.localeCompare(b)))

  await page.getByRole('button', { name: 'Open collection search' }).click()
  await page.getByLabel('Search illustrative collections').fill('Rose Gold')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page).toHaveURL(/search=Rose%20Gold/)
  await expect(page.getByRole('heading', { name: 'Rose Gold Occasion Edit' })).toBeVisible()

  await page.getByLabel('Search the collection preview').fill('nothing matches')
  await page.getByRole('button', { name: 'Search collections' }).click()
  await expect(page.getByText(/no matching edit/i)).toBeVisible()
  await page.getByRole('button', { name: 'Reset the edit' }).click()
  await expect(page.getByRole('heading', { name: 'Crimson Bridal Ensemble' })).toBeVisible()
})

test('wishlist stays in local storage and updates the header count', async ({ page }) => {
  await page.goto('/collections')
  await page.getByRole('button', { name: 'Save Crimson Bridal Ensemble to wishlist' }).click()
  await expect(page.getByRole('link', { name: 'Wishlist, 1 saved item' })).toBeVisible()
  await page.getByRole('link', { name: 'Wishlist, 1 saved item' }).click()
  await expect(page.getByRole('heading', { name: 'Crimson Bridal Ensemble' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Crimson Bridal Ensemble' })).toBeVisible()
  await page.getByRole('button', { name: 'Remove Crimson Bridal Ensemble from wishlist' }).click()
  await expect(page.getByRole('heading', { name: /waiting to begin/i })).toBeVisible()
})

test('viewing form prepares a request without claiming a booking', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Full name').fill('Asha Mehta')
  await page.getByLabel('Phone number').fill('+91 98765 43210')
  await page.getByLabel('Preferred date').fill('2030-05-18')
  await page.locator('input[name="occasion"]').fill('Wedding')
  await page.getByLabel(/Collection of interest/).selectOption({ label: 'Bridal Lehengas' })
  await page.getByRole('button', { name: 'Prepare viewing request' }).click()
  await expect(page.getByRole('status')).toContainText('Your note is ready')
  await expect(page.getByRole('status')).toContainText('No request has been sent or booked')
  await expect(page.getByRole('link', { name: /Open Instagram/ })).toHaveAttribute('href', /instagram\.com\/premlehangastudio/)
  const stored = await page.evaluate(() => window.localStorage.getItem('prem-lehanga-studio-wishlist'))
  expect(stored).not.toContain('Asha Mehta')
  expect(stored).not.toContain('+91 98765 43210')
})

test('lookbook lightbox supports next, previous and Escape', async ({ page }) => {
  await page.goto('/lookbook')
  await page.getByRole('button', { name: 'Open still for A Study in Crimson' }).click()
  const dialog = page.getByRole('dialog', { name: 'Lookbook image preview' })
  await expect(dialog).toBeVisible()
  await page.getByRole('button', { name: 'Next image' }).click()
  await expect(dialog.getByText('After Dark')).toBeVisible()
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.getByText('A Study in Crimson')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
})

test('videos stay idle until played and only one plays per gallery', async ({ page }) => {
  const videoRequests = []
  page.on('request', (request) => { if (request.url().includes('/assets/video/') && request.url().endsWith('.mp4')) videoRequests.push(request.url()) })
  await page.goto('/lookbook')
  const videos = page.locator('.video-gallery video')
  await expect(videos).toHaveCount(5)
  const settings = await videos.evaluateAll((elements) => elements.map((video) => ({ preload: video.preload, autoplay: video.autoplay, paused: video.paused })))
  expect(settings.every((item) => item.preload === 'none' && !item.autoplay && item.paused)).toBe(true)
  expect(videoRequests).toHaveLength(0)

  const first = videos.nth(0)
  await first.evaluate(async (video) => { video.muted = true; await video.play() })
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0)
  await expect.poll(() => first.evaluate((video) => video.paused)).toBe(false)
  const second = videos.nth(1)
  await second.evaluate(async (video) => { video.muted = true; await video.play() })
  await expect.poll(() => first.evaluate((video) => video.paused)).toBe(true)
  await expect.poll(() => second.evaluate((video) => video.paused)).toBe(false)
})

test('mobile navigation and key widths do not overflow', async ({ page }) => {
  await page.goto('/')
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflowing, `horizontal overflow at ${width}px`).toBe(false)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Lookbook/ }).click()
  await expect(page).toHaveURL(/\/lookbook$/)
  await expect(page.locator('h1').first()).toContainText(/a celebration of/i)
})

test('contact page form remains within mobile viewport widths', async ({ page }) => {
  await page.goto('/contact')
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    const metrics = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }))
    expect(metrics.document, `contact page horizontal overflow at ${width}px`).toBeLessThanOrEqual(metrics.viewport)
  }
})

test('secondary routes stay within responsive viewport widths', async ({ page }) => {
  const paths = ['/collections', '/collections/bridal-lehengas', '/product/crimson-bridal-ensemble', '/lookbook', '/our-story', '/wishlist', '/not-a-real-route']
  for (const path of paths) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const metrics = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }))
      expect(metrics.document, `${path} horizontal overflow at ${width}px`).toBeLessThanOrEqual(metrics.viewport)
    }
  }
})

test('representative desktop and mobile views render cleanly', async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem('prem-intro-seen', '1'))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.screenshot({ path: '/tmp/prem-lehanga-desktop.png', fullPage: false })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: '/tmp/prem-lehanga-mobile.png', fullPage: false })
})
