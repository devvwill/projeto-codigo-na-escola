import { useEffect, useState } from 'react'

// Um ciclo de escrita, leitura, exclusão e escrita final, sem repetição contínua.
export default function useTypewriter(text, mediaQuery = '(min-width: 0px)') {
  const [visibleCount, setVisibleCount] = useState(text.length)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const viewport = window.matchMedia(mediaQuery)
    let timeoutId
    let completed = false

    function startAnimation() {
      window.clearTimeout(timeoutId)

      if (!text.length || !motionPreference.matches || !viewport.matches || completed) {
        setVisibleCount(text.length)
        setIsAnimating(false)
        return
      }

      let count = 0
      let phase = 'typing'
      let finalPass = false

      setVisibleCount(0)
      setIsAnimating(true)

      function tick() {
        if (phase === 'typing') {
          count += 1
          setVisibleCount(count)

          if (count === text.length) {
            if (finalPass) {
              completed = true
              setIsAnimating(false)
              return
            }

            phase = 'erasing'
            timeoutId = window.setTimeout(tick, 4000)
            return
          }

          timeoutId = window.setTimeout(tick, 40)
        } else {
          count -= 1
          setVisibleCount(count)

          if (count === 0) {
            phase = 'typing'
            finalPass = true
            timeoutId = window.setTimeout(tick, 450)
            return
          }

          timeoutId = window.setTimeout(tick, 20)
        }
      }

      timeoutId = window.setTimeout(tick, 500)
    }

    startAnimation()
    motionPreference.addEventListener('change', startAnimation)
    viewport.addEventListener('change', startAnimation)

    return () => {
      window.clearTimeout(timeoutId)
      motionPreference.removeEventListener('change', startAnimation)
      viewport.removeEventListener('change', startAnimation)
    }
  }, [text, mediaQuery])

  return { visibleCount, isAnimating }
}
