import { UserPlus, UsersIcon, Gamepad2 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Kayıt Olun",
    description: "Ücretsiz hesap oluşturun, hemen başlayın",
  },
  {
    icon: UsersIcon,
    title: "Rakip Seçin",
    description: "Beceri seviyenize uygun oyuncu bulun",
  },
  {
    icon: Gamepad2,
    title: "Oynayın",
    description: "Gerçek zamanlı satranç keyfi",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">3 Adımda Başlayın</h2>
          <p className="mt-4 text-lg text-muted-foreground">Dakikalar içinde satranç oynamaya başlayın</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20">
                    {index + 1}
                  </div>
                  <div className="mb-4 inline-flex rounded-lg bg-background p-3 ring-1 ring-border">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
