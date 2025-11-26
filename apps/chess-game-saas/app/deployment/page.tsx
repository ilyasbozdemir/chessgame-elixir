import Link from "next/link";
import {
  ArrowLeft,
  Server,
  Cloud,
  Container,
  Code2,
  Play,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Deployment Rehberi | ChessGame",
  description:
    "ChessGame'i kendi sunucunuzda veya cloud platformunda nasıl deploy edeceğinizi öğrenin",
};

export default function DeploymentPage() {
  const command = "curl -fsSL https://install.chessgame.io | sh";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Deployment Rehberi
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            ChessGame'i farklı platformlarda nasıl deploy edeceğinizi adım adım
            öğrenin
          </p>

          {/* Quick Install */}
          <div className="mb-12 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/15">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Hızlı Başlangıç</h3>
                <p className="text-sm text-muted-foreground">
                  Tek komutla ChessGame'i başlatın
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
              {command}
            </div>
          </div>

          {/* Deployment Options */}
          <div className="space-y-12">
            {/* Self-Hosted */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/15">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Self-Hosted Deployment</h2>
              </div>

              <div className="space-y-4 ml-12">
                <p className="text-muted-foreground leading-relaxed">
                  Kendi sunucunuzda tam kontrol sahibi olun. VPS veya bare-metal
                  sunucularda çalıştırın.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">
                          1. Sistem Gereksinimleri
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Linux (Ubuntu 22.04+ önerilir)</li>
                          <li>• 2GB+ RAM</li>
                          <li>• 10GB+ Disk</li>
                          <li>• Elixir 1.15+, MongoDB 6.0+</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">2. Kurulum</h4>
                        <div className="bg-muted/50 rounded p-3 font-mono text-sm space-y-2">
                          <div>
                            git clone
                            https://github.com/ilyasbozdemir/chessgame-elixir.git
                          </div>
                          <div>cd chessgame</div>
                          <div>./setup.sh</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">3. Başlatma</h4>
                        <div className="bg-muted/50 rounded p-3 font-mono text-sm">
                          mix phx.server
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Docker */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/15">
                  <Container className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Docker ile Deployment</h2>
              </div>

              <div className="space-y-4 ml-12">
                <p className="text-muted-foreground leading-relaxed">
                  Docker Compose ile tüm servisleri tek komutta başlatın.
                </p>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">docker-compose.yml</h4>
                  <div className="bg-muted/50 rounded p-4 font-mono text-xs overflow-x-auto">
                    <pre>{`version: '3.8'
services:
  backend:
    image: chessgame/backend:latest
    ports:
      - "4000:4000"
    environment:
      - MONGODB_URL=mongodb://mongo:27017/chessgame
  
  frontend:
    image: chessgame/frontend:latest
    ports:
      - "3000:3000"
  
  mongo:
    image: mongo:6.0
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:`}</pre>
                  </div>
                  <div className="mt-3 bg-muted/50 rounded p-3 font-mono text-sm">
                    docker-compose up -d
                  </div>
                </div>
              </div>
            </section>

            {/* Cloud Platforms */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/15">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Cloud Platformlar</h2>
              </div>

              <div className="space-y-4 ml-12">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">Vercel (Frontend)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Next.js uygulamasını otomatik deploy edin
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="https://vercel.com/new" target="_blank">
                        <Play className="w-4 h-4 mr-2" />
                        Deploy to Vercel
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">Fly.io (Backend)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Elixir uygulamasını global olarak deploy edin
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="https://fly.io" target="_blank">
                        <Play className="w-4 h-4 mr-2" />
                        Deploy to Fly.io
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">Railway</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tek tıkla full-stack deployment
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="https://railway.app" target="_blank">
                        <Play className="w-4 h-4 mr-2" />
                        Deploy to Railway
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">DigitalOcean</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      App Platform ile kolay deployment
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link
                        href="https://cloud.digitalocean.com/apps"
                        target="_blank"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Deploy to DigitalOcean
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Infrastructure as Code */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/15">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Infrastructure as Code</h2>
              </div>

              <div className="space-y-4 ml-12">
                <p className="text-muted-foreground leading-relaxed">
                  Pulumi veya Terraform ile altyapınızı kod olarak yönetin.
                </p>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">
                    Pulumi ile AWS Deployment
                  </h4>
                  <div className="bg-muted/50 rounded p-4 font-mono text-xs overflow-x-auto">
                    <pre>{`import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// ECS Cluster
const cluster = new aws.ecs.Cluster("chessgame");

// Load Balancer
const lb = new aws.lb.LoadBalancer("chessgame-lb", {
    loadBalancerType: "application",
});

// Deploy containers
const service = new aws.ecs.Service("chessgame-service", {
    cluster: cluster.arn,
    taskDefinition: taskDef.arn,
    desiredCount: 2,
});`}</pre>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="bg-muted/50 rounded p-3 font-mono text-sm">
                      pulumi up
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Daha fazla bilgi için{" "}
                      <Link
                        href="/docs"
                        className="text-primary hover:underline"
                      >
                        dokümantasyonu
                      </Link>{" "}
                      inceleyin
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Next Steps */}
          <div className="mt-16 p-6 rounded-xl border border-primary/20 bg-primary/5">
            <h3 className="text-xl font-semibold mb-3">
              Deployment sonrası yapılacaklar
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Environment variables'ları production değerleriyle güncelleyin
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  SSL sertifikası yapılandırın (Let's Encrypt önerilir)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Monitoring ve logging sistemlerini kurun</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Backup stratejinizi planlayın</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Sorularınız mı var?</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/docs">Dokümantasyon</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/community">Topluluk</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
