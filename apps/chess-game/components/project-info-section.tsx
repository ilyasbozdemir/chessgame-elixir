"use client";

import { useEffect, useState } from "react";

type ProjectInfo = {
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  lastUpdate: string;
  createdAt: string;
  licenseName: string | null;
  licenseSummary: string;
  contributors: number | null;
  topics: string[];
  htmlUrl: string | null;
  licenseRawUrl: string | null;
};

export function ProjectInfoSection() {
  const [info, setInfo] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    fetch("/api/project-info")
      .then((r) => r.json())
      .then((d) => setInfo(d));
  }, []);

  if (!info) return null;

  const fmt = (n?: number | null) =>
    typeof n === "number"
      ? n >= 1000
        ? `${(n / 1000).toFixed(1)}K`
        : n.toString()
      : "—";

  const date = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("tr-TR") : "—";

  return (
    <div className="text-muted-foreground leading-relaxed space-y-3 max-w-2xl mt-6">

      <p>
        Bu proje <strong>{date(info.createdAt)}</strong> tarihinde oluşturulmuştur.
      </p>

      <p>
        GitHub üzerinde şu anda <strong>{fmt(info.stars)}</strong> kişi tarafından
        yıldızlanmış, <strong>{fmt(info.forks)}</strong> kez fork edilmiş ve{" "}
        <strong>{fmt(info.contributors)}</strong> katkıcı tarafından geliştirilmektedir.
      </p>

      <p>
        Projeyi <strong>{fmt(info.watchers)}</strong> kişi takip etmekte olup şu an{" "}
        <strong>{fmt(info.issues)}</strong> açık issue bulunmaktadır.
        Depo en son <strong>{date(info.lastUpdate)}</strong> tarihinde güncellenmiştir.
      </p>

      {!!info.topics?.length && (
        <p>
          Proje etiketleri:{" "}
          <strong>{info.topics.join(", ")}</strong>
        </p>
      )}

      <p>
        Yazılım <strong>{info.licenseName}</strong> lisansı ile dağıtılmaktadır —{" "}
        {info.licenseSummary}
      </p>

      {info.htmlUrl && (
        <p>
          Kaynak kodu GitHub üzerinde açık olarak yayımlanmaktadır:{" "}
          <a
            href={info.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {info.htmlUrl}
          </a>
        </p>
      )}

      {info.licenseRawUrl && (
        <p>
          Lisans metninin tam haline buradan ulaşabilirsiniz:{" "}
          <a
            href={info.licenseRawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Lisans Dosyası (RAW)
          </a>
        </p>
      )}

    </div>
  );
}
