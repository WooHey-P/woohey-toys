import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">개인정보처리방침</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. 개인정보 수집 및 이용 목적</h3>
            <p className="text-gray-600 dark:text-gray-400">
              본 웹사이트는 성격 테스트 서비스 제공을 위해 최소한의 정보를 수집합니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">2. 수집하는 개인정보의 항목</h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>테스트 결과 데이터 (성별, 답변 내용)</li>
              <li>쿠키 및 접속 로그</li>
              <li>브라우저 정보, IP 주소</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">3. 광고 서비스</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              본 웹사이트는 Google AdSense를 통해 광고를 제공합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Google은 쿠키를 사용하여 관련성 높은 광고를 표시합니다</li>
              <li>사용자는 Google 광고 설정에서 개인화 광고를 해제할 수 있습니다</li>
              <li>제3자 광고 네트워크도 쿠키를 사용할 수 있습니다</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">4. 개인정보 보유 및 이용 기간</h3>
            <p className="text-gray-600 dark:text-gray-400">
              수집된 정보는 서비스 제공 목적 달성 후 지체없이 파기됩니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">5. 연락처</h3>
            <p className="text-gray-600 dark:text-gray-400">
              개인정보 관련 문의: privacy@tetoegentest.com
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-8">
            최종 업데이트: 2025년 1월
          </div>
        </CardContent>
      </Card>
    </div>
  );
}