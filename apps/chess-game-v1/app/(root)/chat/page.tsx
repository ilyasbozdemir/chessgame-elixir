import { Suspense } from "react"
import ChatPageClient from "./page.client"

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>}>
      <ChatPageClient />
    </Suspense>
  )
}
