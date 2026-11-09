import Script from "next/script";

interface AnalyticsProps {
  /** GA4 measurement id, e.g. "G-XXXXXXXXXX" (NEXT_PUBLIC_GA_ID). */
  gaId: string;
}

/**
 * Google Analytics 4 via gtag.js. Rendered by the root layout only when
 * NEXT_PUBLIC_GA_ID is set. GA4 already anonymizes IPs; ad personalization
 * signals are turned off.
 */
export function Analytics({ gaId }: AnalyticsProps) {
  const id = JSON.stringify(gaId);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${id},{allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
