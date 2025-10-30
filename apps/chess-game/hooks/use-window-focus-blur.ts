import { useEffect } from "react"

/**
 * Window focus/blur hook
 * @param onFocus - sekme aktif olduğunda çalışır
 * @param onBlur - sekme arka plana geçtiğinde çalışır
 * @param refreshTimeout - blur süresi (ms). Süre aşılırsa sayfa yenilenir.
 */
export function useWindowFocusBlur(
  onFocus?: () => void,
  onBlur?: () => void,
  refreshTimeout: number = 60000 // 1 dakika
) {
  useEffect(() => {
    let blurTimer: NodeJS.Timeout | null = null

    const handleFocus = () => {
      console.log("🟢 Sekme focus oldu")
      if (blurTimer) clearTimeout(blurTimer)
      onFocus?.()
    }

    const handleBlur = () => {
      console.log("⚪ Sekme blur (arka plana geçti)")
      onBlur?.()
      blurTimer = setTimeout(() => {
        console.warn("⏰ Uzun süre pasif kaldı, sayfa yenileniyor...")
        window.location.reload()
      }, refreshTimeout)
    }

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
      if (blurTimer) clearTimeout(blurTimer)
    }
  }, [onFocus, onBlur, refreshTimeout])
}
