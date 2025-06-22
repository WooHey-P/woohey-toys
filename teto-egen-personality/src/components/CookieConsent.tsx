import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-sm">쿠키 사용 동의</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={rejectCookies}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            이 웹사이트는 서비스 개선과 맞춤형 광고 제공을 위해 쿠키를 사용합니다. 
            계속 이용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
          </p>
          
          <div className="flex gap-2">
            <Button
              onClick={acceptCookies}
              size="sm"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              동의
            </Button>
            <Button
              onClick={rejectCookies}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              거부
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}