import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

export function AdBanner({
  slot,
  format = "auto",
  style,
  className,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense error:", err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-1829070933831128" // 사용자가 실제 Publisher ID로 교체해야 함
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// 다양한 광고 사이즈 컴포넌트들
export function BannerAd({
  slot,
  className,
}: {
  slot: string;
  className?: string;
}) {
  return (
    <AdBanner
      slot={slot}
      format="horizontal"
      className={className}
      style={{ width: "100%", height: "90px" }}
    />
  );
}

export function SquareAd({
  slot,
  className,
}: {
  slot: string;
  className?: string;
}) {
  return (
    <AdBanner
      slot={slot}
      format="rectangle"
      className={className}
      style={{ width: "300px", height: "250px" }}
    />
  );
}

export function VerticalAd({
  slot,
  className,
}: {
  slot: string;
  className?: string;
}) {
  return (
    <AdBanner
      slot={slot}
      format="vertical"
      className={className}
      style={{ width: "160px", height: "600px" }}
    />
  );
}
