"use client";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

export function Footer() {
  const { t } = useTranslation("common");
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return (
    <footer className="border-t border-black/5 dark:border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          © {year || ""} {t("profile.name")} {t("footer.allRights")}
        </p>
        <p className="text-xs">{t("footer.builtWith")}</p>
      </div>
    </footer>
  );
}
