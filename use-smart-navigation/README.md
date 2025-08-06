# react hook: use-smart-navigation

A custom hook that provides a smart navigation function.

- It checks if the target route is the same as the current route.
- If the same, it replaces the current history entry; otherwise, it pushes a new entry.
- Also supports numeric navigation (e.g., -1, 1, 0) for history navigation.

## Code

```ts
import { useCallback } from 'react'
import { Location, To, useLocation, useNavigate } from 'react-router-dom'

/**
 * A custom hook that provides a smart navigation function.
 * It checks if the target route is the same as the current route.
 * If the same, it replaces the current history entry; otherwise, it pushes a new entry.
 * Also supports numeric navigation (e.g., -1, 1, 0) for history navigation.
 * @returns A navigation function that handles route changes intelligently.
 */
export function useSmartNavigate() {
  const _navigate = useNavigate()
  const location = useLocation()

  const navigate = useCallback(
    (to: To | number, options = {}) => {
      // Handle numeric navigation (e.g., -1, 1, 0)
      if (typeof to === 'number') {
        _navigate(to as To, options)
        return
      }

      // Get the current route's full path (including query parameters)
      const currentPath = location.pathname + location.search

      // Handle both string and object formats for the target route
      const targetPath =
        typeof to === 'string' ? to : (to as Location).pathname + ((to as Location).search || '')

      // Check if the target route is the same as the current route
      if (currentPath === targetPath) {
        // Same route: replace the current history entry
        _navigate(to, { ...options, replace: true })
      } else {
        // Different route: push a new history entry
        _navigate(to, { ...options, replace: false })
      }
    },
    [_navigate, location]
  )

  return navigate
}
```
