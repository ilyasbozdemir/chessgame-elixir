import { Server, Cloud, Container, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

const deploymentOptions = [
  {
    icon: Server,
    title: "Self-Hosted",
    description: "Kendi sunucularınızda tam kontrol",
    features: ["Tamamen özelleştirilebilir", "Veri gizliliği", "Sınırsız kullanıcı"],
  },
  {
    icon: Cloud,
    title: "Cloud Deploy",
    description: "Tek tıkla bulut dağıtımı",
    features: ["AWS, GCP, Azure", "Otomatik ölçeklendirme", "Global CDN"],
  },
  {
    icon: Container,
    title: "Docker",
    description: "Container ile kolay kurulum",
    features: ["docker-compose hazır", "Mikroservis desteği", "Hızlı geliştirme"],
  },
  {
    icon: Code,
    title: "Pulumi IaC",
    description: "Infrastructure as Code",
    features: ["Otomatik altyapı", "Versiyon kontrolü", "Multi-cloud"],
  },
]

export function Deployment() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">İstediğiniz Yerde Deploy Edin</h2>
          <p className="mt-4 text-lg text-muted-foreground">Esnek deployment seçenekleri ile tam kontrol sizde</p>
        </div>

        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deploymentOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <option.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{option.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{option.description}</p>
              <ul className="space-y-2 flex-1">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="https://docs.chessgame.io" target="_blank" rel="noopener noreferrer">
              Deployment Dokümantasyonu
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
