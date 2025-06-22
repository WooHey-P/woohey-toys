import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 테토-에겐 성격 테스트. 모든 권리 보유.
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link href="/teto-egen/privacy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">
              개인정보처리방침
            </Link>
            <Link href="/teto-egen/terms" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">
              이용약관
            </Link>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          본 테스트는 엔터테인먼트 목적으로 제작되었습니다.
        </div>
      </div>
    </footer>
  );
}