export interface PersonalityType {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  traits: string[];
  relationship: string[];
  compatibility: {
    best: string;
    good: string;
    caution: string;
    friend: string;
  };
}

export const personalityTypes: Record<string, Record<string, PersonalityType>> = {
  ko: {
    tetoMale: {
      title: "테토남",
      subtitle: "활동적이고 주도적인 리더형",
      icon: "🔥",
      gradient: "from-red-500 to-red-400",
      traits: [
        "공격성과 사냥 본능이 강함",
        "자기주장이 강하며 리더십 발휘",
        "감정보다 논리를 우선시",
        "현실적이고 목표 지향적",
        "활동적이고 바쁜 일상 선호"
      ],
      relationship: [
        "행동으로 표현하는 타입",
        "직접적이고 적극적인 접근",
        "실질적 보상을 중시",
        "갈등을 직면하고 해결"
      ],
      compatibility: {
        best: "에겐녀",
        good: "테토녀",
        caution: "에겐남",
        friend: "테토남"
      }
    },
    egenMale: {
      title: "에겐남",
      subtitle: "감성적이고 세심한 배려형",
      icon: "💜",
      gradient: "from-purple-500 to-purple-400",
      traits: [
        "감정과 직감을 중시",
        "섬세하고 예민한 감수성",
        "내향적이고 사색적",
        "창의적이고 상상력 풍부",
        "깊이 있는 관계 선호"
      ],
      relationship: [
        "감정적 교류를 중시",
        "깊은 대화와 공감 능력",
        "로맨틱하고 세심한 배려",
        "상대방의 마음을 잘 헤아림"
      ],
      compatibility: {
        best: "테토녀",
        good: "에겐녀",
        caution: "테토남",
        friend: "에겐남"
      }
    },
    tetoFemale: {
      title: "테토녀",
      subtitle: "당당하고 독립적인 현실형",
      icon: "👑",
      gradient: "from-orange-500 to-orange-400",
      traits: [
        "독립적이고 자주적",
        "현실적이고 실용적 사고",
        "강한 추진력과 결단력",
        "사회적 활동을 즐김",
        "목표 달성에 집중"
      ],
      relationship: [
        "평등한 관계를 추구",
        "솔직하고 직접적인 소통",
        "상대방의 능력을 중시",
        "독립성 유지하며 연애"
      ],
      compatibility: {
        best: "테토남",
        good: "에겐남",
        caution: "에겐녀",
        friend: "테토녀"
      }
    },
    egenFemale: {
      title: "에겐녀",
      subtitle: "따뜻하고 감성적인 공감형",
      icon: "🌸",
      gradient: "from-pink-500 to-pink-400",
      traits: [
        "따뜻하고 배려심 많음",
        "감정 표현이 풍부",
        "조화롭고 평화로운 관계 추구",
        "예술적 감수성 발달",
        "타인의 감정에 민감"
      ],
      relationship: [
        "감정적 안정감을 중시",
        "로맨틱한 분위기 선호",
        "보호받고 싶은 욕구",
        "깊은 정서적 유대감 추구"
      ],
      compatibility: {
        best: "테토남",
        good: "에겐남",
        caution: "테토녀",
        friend: "에겐녀"
      }
    }
  },
  en: {
    tetoMale: {
      title: "Teto Male",
      subtitle: "Active and Leadership Type",
      icon: "🔥",
      gradient: "from-red-500 to-red-400",
      traits: [
        "Strong aggression and hunting instinct",
        "Strong self-assertion and leadership",
        "Prioritizes logic over emotion",
        "Realistic and goal-oriented",
        "Prefers active and busy lifestyle"
      ],
      relationship: [
        "Expresses through actions",
        "Direct and aggressive approach",
        "Values practical rewards",
        "Faces and resolves conflicts"
      ],
      compatibility: {
        best: "Egen Female",
        good: "Teto Female",
        caution: "Egen Male",
        friend: "Teto Male"
      }
    },
    // Add other English personality types...
  }
};
