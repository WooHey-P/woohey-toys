import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">이용약관</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. 서비스 소개</h3>
            <p className="text-gray-600 dark:text-gray-400">
              테토-에겐 성격 테스트는 엔터테인먼트 목적의 무료 성격 분석 서비스입니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">2. 이용 조건</h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>본 서비스는 누구나 무료로 이용할 수 있습니다</li>
              <li>테스트 결과는 참고용이며 절대적인 기준이 아닙니다</li>
              <li>부적절한 사용이나 남용을 금지합니다</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">3. 광고 정책</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              본 웹사이트는 서비스 운영을 위해 광고를 표시합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Google AdSense 및 제3자 광고가 표시될 수 있습니다</li>
              <li>광고 콘텐츠는 본 서비스와 무관할 수 있습니다</li>
              <li>광고 클릭 시 외부 사이트로 이동할 수 있습니다</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">4. 면책 조항</h3>
            <p className="text-gray-600 dark:text-gray-400">
              본 테스트 결과로 인한 어떠한 손해에 대해서도 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">5. 약관 변경</h3>
            <p className="text-gray-600 dark:text-gray-400">
              본 약관은 필요시 변경될 수 있으며, 변경사항은 웹사이트에 공지됩니다.
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