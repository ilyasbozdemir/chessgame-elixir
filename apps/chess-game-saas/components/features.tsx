import { Zap, Brain, Eye, Rewind, Trophy, Users, MessageCircle, Bell, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Anlık Hamle Senkronizasyonu",
    description: "Sıfır gecikme ile rakibinizle aynı anda oynayın",
  },
  {
    icon: Brain,
    title: "Yapay Zeka Analiz",
    description: "Chess Engine ve LLM hibrit sistemle oyununuzu geliştirin",
  },
  {
    icon: Eye,
    title: "Seyirci Modu",
    description: "Canlı maçları izleyin, profesyonellerden öğrenin",
  },
  {
    icon: Rewind,
    title: "Time Travel Replay",
    description: "Geçmiş hamleleri analiz edin ve alternatif senaryoları keşfedin",
  },
  {
    icon: Trophy,
    title: "Turnuvalar",
    description: "Uluslararası turnuvalara katılın ve sıralamada yükselin",
  },
  {
    icon: Users,
    title: "Satranç Kulüpleri",
    description: "Özel kulüpler kurun, üyelerle stratejiler paylaşın",
  },
  {
    icon: MessageCircle,
    title: "Özel Mesajlaşma",
    description: "Oyuncularla doğrudan iletişim kurun ve arkadaşlıklar geliştirin",
  },
  {
    icon: Bell,
    title: "Akıllı Bildirimler",
    description: "Turnuva davetleri, hamle sırası ve kulüp etkinliklerinden haberdar olun",
  },
  {
    icon: Shield,
    title: "Fair Play Sistemi",
    description: "Hile koruması ve adil oyun garantisi ile güvenli ortam",
  },
]

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Profesyonel Satranç Deneyimi
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Modern teknolojilerle desteklenen kapsamlı özellikler
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
