import {
  SiDocker,
  SiElixir,
  SiGo,
  SiMongodb,
  SiNextdotjs,
  SiPhoenixframework,
  SiPulumi,
  SiRust,
} from "react-icons/si";

const technologies = [
  {
    name: "Elixir",
    description: "Gerçek zamanlı oyun backend’i",
    icon: <SiElixir size={32} />,
  },
  {
    name: "Phoenix",
    description: "WebSocket ve canlı oyun desteği",
    icon: <SiPhoenixframework size={32} />,
  },
  {
    name: "MongoDB",
    description: "Oyun verileri için ölçeklenebilir veritabanı",
    icon: <SiMongodb size={32} />,
  },
  {
    name: "Next.js",
    description: "Modern frontend ve kullanıcı arayüzü",
    icon: <SiNextdotjs size={32} />,
  },
  {
    name: "Docker",
    description: "Kolay dağıtım ve ortam yönetimi",
    icon: <SiDocker size={32} />,
  },
  {
    name: "Pulumi",
    description: "Altyapıyı kod ile yönetme ve deploy",
    icon: <SiPulumi size={32} />,
  },
  {
    name: "Go",
    description: "Hızlı ve basit oyun servisleri",
    icon: <SiGo size={32} />,
  },
  {
    name: "Rust",
    description: "Performans odaklı oyun motoru ve backend",
    icon: <SiRust size={32} />,
  },
];

export function TechStack() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Modern Teknoloji Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Performans ve ölçeklenebilirlik için en iyi araçlar
          </p>
        </div>

        {/* Grid responsive */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted ring-1 ring-border text-primary">
                {tech.icon}
              </div>
              <div>
                <div className="font-semibold">{tech.name}</div>
                <div className="text-sm text-muted-foreground">
                  {tech.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

