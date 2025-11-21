import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * -----------
 * Helper component that scrolls window to top on route change.
 *
 * Implementation:
 * - uses useLocation() and effect to call window.scrollTo with smooth behavior.
 */

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }, [pathname])
  return null
}
