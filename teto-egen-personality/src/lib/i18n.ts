import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ko: {
    translation: {
      // Header
      "app.title": "테토-에겐 테스트",
      "header.theme": "테마 변경",
      "header.language": "언어 선택",

      // Welcome Screen
      "welcome.title": "테토-에겐 성격 유형",
      "welcome.subtitle": "무료 성격 테스트",
      "welcome.description": "테스토스테론과 에스트로겐 기반의 성격 분석으로 당신의 진짜 모습을 발견하세요. 연애, 관계, 삶의 패턴까지 모든 것이 명확해집니다.",
      "welcome.features.analysis": "정확한 분석",
      "welcome.features.analysis.desc": "과학적 근거를 바탕으로 한 심층적인 성격 분석",
      "welcome.features.relationship": "관계 분석",
      "welcome.features.relationship.desc": "타인과의 궁합과 연애 패턴 상세 분석",
      "welcome.features.personal": "개인 맞춤",
      "welcome.features.personal.desc": "당신만의 성향에 맞는 구체적인 조언 제공",
      "welcome.start": "테스트 시작하기",
      "welcome.duration": "소요 시간: 약 3-5분 | 총 10개 질문",

      // Gender Selection
      "gender.title": "성별을 선택해주세요",
      "gender.description": "보다 정확한 분석을 위해 필요합니다",
      "gender.male": "남성",
      "gender.female": "여성",

      // Quiz
      "quiz.progress": "진행률",
      "quiz.previous": "이전",
      "quiz.next": "다음",
      "quiz.answer.selected": "✓ 답변 완료",

      // Loading
      "loading.analyzing": "분석 중...",
      "loading.personality": "당신의 성격을 분석하고 있습니다",
      "loading.teto": "테토 성향 측정",
      "loading.egen": "에겐 성향 측정",
      "loading.relationship": "관계 패턴 분석",
      "loading.complete": "완료",
      "loading.inprogress": "진행 중...",
      "loading.waiting": "대기 중",

      // Results
      "result.personality": "성격 특성",
      "result.relationship": "연애 스타일",
      "result.compatibility": "궁합 분석",
      "result.share": "결과 공유하기",
      "result.retake": "다시 테스트하기",

      // Personality Types
      "personality.tetoMale.title": "테토남",
      "personality.tetoMale.subtitle": "활동적이고 주도적인 리더형",
      "personality.tetoFemale.title": "테토녀",
      "personality.tetoFemale.subtitle": "당당하고 독립적인 현실형",
      "personality.egenMale.title": "에겐남",
      "personality.egenMale.subtitle": "감성적이고 세심한 배려형",
      "personality.egenFemale.title": "에겐녀",
      "personality.egenFemale.subtitle": "따뜻하고 감성적인 공감형",

      // Footer
      "footer.copyright": "© 2025 테토-에겐 성격 유형 테스트. 모든 권리 보유.",
      "footer.disclaimer": "본 테스트는 엔터테인먼트 목적으로 제작되었습니다.",
    },
  },
  en: {
    translation: {
      "app.title": "Teto-Egen Test",
      "welcome.title": "Teto-Egen Personality Type",
      "welcome.subtitle": "Free Personality Test",
      "welcome.description": "Discover your true self through testosterone and estrogen-based personality analysis. Everything from dating to relationships and life patterns becomes clear.",
      "welcome.start": "Start Test",
      "gender.title": "Please select your gender",
      "gender.description": "Required for more accurate analysis",
      "gender.male": "Male",
      "gender.female": "Female",
      "quiz.previous": "Previous",
      "quiz.next": "Next",
      "quiz.answer.selected": "✓ Completed",
      "loading.analyzing": "Analyzing...",
      "personality.tetoMale.title": "Teto Male",
      "personality.tetoMale.subtitle": "Active and Leadership Type",
      "personality.egenMale.title": "Egen Male",
      "personality.egenMale.subtitle": "Sensitive and Caring Type",
      // ... more translations
    },
  },
  ja: {
    translation: {
      "app.title": "テト・エゲンテスト",
      "welcome.title": "テト・エゲン性格タイプ",
      "welcome.subtitle": "無料性格テスト",
      "gender.male": "男性",
      "gender.female": "女性",
      // ... more translations
    },
  },
  zh: {
    translation: {
      "app.title": "特托-埃根测试",
      "welcome.title": "特托-埃根人格类型",
      "welcome.subtitle": "免费性格测试",
      "gender.male": "男性",
      "gender.female": "女性",
      // ... more translations
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
