export interface QuestionOption {
  text: string;
  type: "teto" | "egen" | "neutral";
  value: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export const questions: Record<string, Question[]> = {
  ko: [
    {
      id: 1,
      text: "좋아하는 사람에게 고백받았어요! 첫 반응은?",
      options: [
        { text: "바로 답장하고 당장 만나자고 함", type: "teto", value: 2 },
        { text: "며칠 고민해보겠다고 시간을 달라함", type: "egen", value: 2 },
        { text: "일단 친구로 지내보자고 제안", type: "neutral", value: 0 },
        { text: "설레서 잠이 안 와서 밤새 답장 고민", type: "egen", value: 3 }
      ]
    },
    {
      id: 2,
      text: "갑자기 1억이 생겼다면 제일 먼저 뭘 할래요?",
      options: [
        { text: "주식이나 부동산에 바로 투자", type: "teto", value: 3 },
        { text: "가족한테 효도하고 좋은 일에 기부", type: "egen", value: 2 },
        { text: "세계여행 가서 인생샷 찍기", type: "teto", value: 1 },
        { text: "일단 적금 넣고 천천히 계획 세우기", type: "egen", value: 3 }
      ]
    },
    {
      id: 3,
      text: "친구가 '나 요즘 우울해'라고 톡을 보냈어요",
      options: [
        { text: "뭐가 문제야? 해결책을 같이 찾아보자", type: "teto", value: 3 },
        { text: "진짜? 언제 시간 돼? 만나서 얘기하자", type: "egen", value: 2 },
        { text: "많이 힘들구나ㅠㅠ 나도 그런 적 있어", type: "egen", value: 3 },
        { text: "맛있는 거 먹으러 가자! 내가 쏠게", type: "teto", value: 1 }
      ]
    },
    {
      id: 4,
      text: "인스타에 올릴 사진을 찍으려고 해요",
      options: [
        { text: "대충 찍어도 괜찮은 곳에서 후딱", type: "teto", value: 2 },
        { text: "조명이랑 각도 완벽할 때까지 100장", type: "egen", value: 3 },
        { text: "친구한테 부탁해서 인생샷 건지기", type: "neutral", value: 0 },
        { text: "그냥 거울셀카가 제일 편함", type: "teto", value: 1 }
      ]
    },
    {
      id: 5,
      text: "회사에서 갑자기 발표를 하라고 합니다",
      options: [
        { text: "좋아! 이런 기회가 또 언제 와", type: "teto", value: 3 },
        { text: "헉... 떨려서 목소리가 안 나올 것 같은데", type: "egen", value: 3 },
        { text: "하긴 해야지만 진짜 싫다ㅠㅠ", type: "egen", value: 1 },
        { text: "그냥 무난하게 준비한 것만 말하자", type: "neutral", value: 0 }
      ]
    },
    {
      id: 6,
      text: "축제에서 버스킹 하는 사람이 당신을 무대로 올려달라네요",
      options: [
        { text: "오케이! 뭐 하면 돼?", type: "teto", value: 3 },
        { text: "아니에요ㅠㅠ 저 못해요", type: "egen", value: 3 },
        { text: "친구들이 밀어주면 어쩔 수 없이", type: "neutral", value: 0 },
        { text: "웃으면서 도망치기", type: "egen", value: 1 }
      ]
    },
    {
      id: 7,
      text: "좋아하는 아이돌이 내 앞을 지나갔어요!",
      options: [
        { text: "사진 찍고 인스타에 바로 올리기", type: "teto", value: 2 },
        { text: "멀뚱멀뚱 바라보기만 함", type: "egen", value: 2 },
        { text: "심장 터질 것 같아서 그 자리에 멈춤", type: "egen", value: 3 },
        { text: "친구들한테 톡으로 자랑하기", type: "teto", value: 1 }
      ]
    },
    {
      id: 8,
      text: "배달음식 뭐 시킬지 1시간째 고민 중...",
      options: [
        { text: "고민할 시간에 그냥 평소 먹던 거 주문", type: "teto", value: 3 },
        { text: "리뷰 다 읽어보고 신중하게 선택", type: "egen", value: 3 },
        { text: "친구한테 물어보고 추천받기", type: "egen", value: 1 },
        { text: "눈 감고 아무거나 찍기", type: "teto", value: 1 }
      ]
    },
    {
      id: 9,
      text: "드라마에서 남주가 여주한테 벽치기 하는 장면",
      options: [
        { text: "우와 심쿵ㅠㅠ 나도 저런 거 당해보고 싶다", type: "egen", value: 3 },
        { text: "저런 건 드라마에서나 멋있지 현실에선 민폐", type: "teto", value: 3 },
        { text: "배우가 잘생겨서 그렇지 실제론 별로일듯", type: "teto", value: 1 },
        { text: "그냥 재밌게 보는 거지 뭘 그렇게까지", type: "neutral", value: 0 }
      ]
    },
    {
      id: 10,
      text: "친구가 소개팅 주선해준다고 해요",
      options: [
        { text: "좋아! 언제? 어디서 만나?", type: "teto", value: 3 },
        { text: "그 사람 사진이라도 먼저 보여줘", type: "teto", value: 1 },
        { text: "부담스러워서 거절하고 싶다", type: "egen", value: 3 },
        { text: "어떤 사람인지 자세히 물어보기", type: "egen", value: 2 }
      ]
    }
  ],
  en: [
    {
      id: 1,
      text: "Someone you like just confessed to you! What's your first reaction?",
      options: [
        { text: "Reply immediately and suggest meeting up right now", type: "teto", value: 2 },
        { text: "Ask for a few days to think about it", type: "egen", value: 2 },
        { text: "Suggest staying friends for now", type: "neutral", value: 0 },
        { text: "Can't sleep all night overthinking the reply", type: "egen", value: 3 }
      ]
    },
    {
      id: 2,
      text: "You suddenly got $1 million! What's the first thing you'd do?",
      options: [
        { text: "Invest in stocks or real estate immediately", type: "teto", value: 3 },
        { text: "Give back to family and donate to charity", type: "egen", value: 2 },
        { text: "Travel the world and take amazing photos", type: "teto", value: 1 },
        { text: "Put it in savings and plan carefully", type: "egen", value: 3 }
      ]
    },
    {
      id: 3,
      text: "Your friend texts 'I'm feeling really down lately'",
      options: [
        { text: "What's wrong? Let's figure out a solution together", type: "teto", value: 3 },
        { text: "Really? When are you free? Let's meet and talk", type: "egen", value: 2 },
        { text: "That sounds really tough 😢 I've been there too", type: "egen", value: 3 },
        { text: "Let's go eat something delicious! My treat", type: "teto", value: 1 }
      ]
    },
    {
      id: 4,
      text: "You want to take a photo for Instagram",
      options: [
        { text: "Quick snap anywhere that looks decent", type: "teto", value: 2 },
        { text: "Take 100 shots until lighting and angle are perfect", type: "egen", value: 3 },
        { text: "Ask a friend to help get the perfect shot", type: "neutral", value: 0 },
        { text: "Just a mirror selfie is easiest", type: "teto", value: 1 }
      ]
    },
    {
      id: 5,
      text: "Your boss suddenly asks you to give a presentation",
      options: [
        { text: "Great! When will I get another chance like this?", type: "teto", value: 3 },
        { text: "Oh no... I'm so nervous I might lose my voice", type: "egen", value: 3 },
        { text: "I have to do it but I really don't want to", type: "egen", value: 1 },
        { text: "Just stick to what I prepared, keep it simple", type: "neutral", value: 0 }
      ]
    },
    {
      id: 6,
      text: "A street performer asks you to come on stage",
      options: [
        { text: "Okay! What do I need to do?", type: "teto", value: 3 },
        { text: "No no no, I can't do that!", type: "egen", value: 3 },
        { text: "Only if my friends push me to", type: "neutral", value: 0 },
        { text: "Smile and run away", type: "egen", value: 1 }
      ]
    },
    {
      id: 7,
      text: "Your favorite celebrity just walked past you!",
      options: [
        { text: "Take a photo and post it on social media immediately", type: "teto", value: 2 },
        { text: "Just stare in shock", type: "egen", value: 2 },
        { text: "Heart racing so much I freeze in place", type: "egen", value: 3 },
        { text: "Text friends immediately to brag", type: "teto", value: 1 }
      ]
    },
    {
      id: 8,
      text: "Been deciding what to order for delivery for an hour...",
      options: [
        { text: "Stop wasting time, just order the usual", type: "teto", value: 3 },
        { text: "Read all the reviews and choose carefully", type: "egen", value: 3 },
        { text: "Ask friends for recommendations", type: "egen", value: 1 },
        { text: "Close eyes and pick randomly", type: "teto", value: 1 }
      ]
    },
    {
      id: 9,
      text: "Watching a K-drama where the male lead does the wall slam",
      options: [
        { text: "OMG so romantic! I want that to happen to me", type: "egen", value: 3 },
        { text: "That's only cool in dramas, it's annoying in real life", type: "teto", value: 3 },
        { text: "Only looks good because the actor is handsome", type: "teto", value: 1 },
        { text: "It's just entertainment, why overthink it?", type: "neutral", value: 0 }
      ]
    },
    {
      id: 10,
      text: "Your friend wants to set you up on a blind date",
      options: [
        { text: "Sounds great! When? Where do we meet?", type: "teto", value: 3 },
        { text: "Can I at least see their photo first?", type: "teto", value: 1 },
        { text: "That sounds too stressful, I'd rather not", type: "egen", value: 3 },
        { text: "Tell me more about what they're like", type: "egen", value: 2 }
      ]
    }
  ],
  ja: [
    {
      id: 1,
      text: "好きな人に告白されました！最初の反応は？",
      options: [
        { text: "すぐ返事して今すぐ会おうと言う", type: "teto", value: 2 },
        { text: "数日考えさせてと時間をもらう", type: "egen", value: 2 },
        { text: "とりあえず友達として付き合おうと提案", type: "neutral", value: 0 },
        { text: "嬉しくて眠れなくて一晩中返事を考える", type: "egen", value: 3 }
      ]
    },
    {
      id: 2,
      text: "突然1億円が手に入ったら最初に何をしますか？",
      options: [
        { text: "株や不動産にすぐ投資", type: "teto", value: 3 },
        { text: "家族に恩返しして寄付もする", type: "egen", value: 2 },
        { text: "世界旅行して人生最高の写真を撮る", type: "teto", value: 1 },
        { text: "とりあえず貯金してゆっくり計画", type: "egen", value: 3 }
      ]
    },
    {
      id: 3,
      text: "友達が「最近落ち込んでる」とメッセージを送ってきました",
      options: [
        { text: "何が問題？一緒に解決策を見つけよう", type: "teto", value: 3 },
        { text: "本当？いつ時間ある？会って話そう", type: "egen", value: 2 },
        { text: "辛いね😢 私もそんな時があったよ", type: "egen", value: 3 },
        { text: "美味しいもの食べに行こう！私がおごるよ", type: "teto", value: 1 }
      ]
    },
    {
      id: 4,
      text: "インスタに載せる写真を撮ろうとしています",
      options: [
        { text: "適当でも綺麗な場所でサッと撮影", type: "teto", value: 2 },
        { text: "照明と角度が完璧になるまで100枚", type: "egen", value: 3 },
        { text: "友達に頼んで最高の一枚を撮ってもらう", type: "neutral", value: 0 },
        { text: "鏡での自撮りが一番楽", type: "teto", value: 1 }
      ]
    },
    {
      id: 5,
      text: "会社で突然プレゼンをしろと言われました",
      options: [
        { text: "いいね！こんな機会またいつ来るか", type: "teto", value: 3 },
        { text: "えー...緊張で声が出なくなりそう", type: "egen", value: 3 },
        { text: "やらなきゃだけど本当に嫌だ😭", type: "egen", value: 1 },
        { text: "準備したことだけ無難に話そう", type: "neutral", value: 0 }
      ]
    },
    {
      id: 6,
      text: "お祭りで路上パフォーマーがステージに上がってと言ってきました",
      options: [
        { text: "オーケー！何をすればいい？", type: "teto", value: 3 },
        { text: "いやいや無理です😭", type: "egen", value: 3 },
        { text: "友達が押してくれたら仕方なく", type: "neutral", value: 0 },
        { text: "笑顔で逃げる", type: "egen", value: 1 }
      ]
    },
    {
      id: 7,
      text: "好きなアイドルが目の前を通りました！",
      options: [
        { text: "写真撮ってSNSにすぐアップ", type: "teto", value: 2 },
        { text: "ぼーっと見つめるだけ", type: "egen", value: 2 },
        { text: "心臓が爆発しそうでその場で固まる", type: "egen", value: 3 },
        { text: "友達にメッセージで自慢", type: "teto", value: 1 }
      ]
    },
    {
      id: 8,
      text: "デリバリー何を注文するか1時間悩み中...",
      options: [
        { text: "悩む時間がもったいない、いつものを注文", type: "teto", value: 3 },
        { text: "レビューを全部読んで慎重に選択", type: "egen", value: 3 },
        { text: "友達におすすめを聞く", type: "egen", value: 1 },
        { text: "目を閉じて適当に選ぶ", type: "teto", value: 1 }
      ]
    },
    {
      id: 9,
      text: "ドラマで男性主人公が壁ドンするシーン",
      options: [
        { text: "きゃー素敵😍 私もされてみたい", type: "egen", value: 3 },
        { text: "ドラマだからかっこいいけど現実では迷惑", type: "teto", value: 3 },
        { text: "俳優がイケメンだからよく見えるだけ", type: "teto", value: 1 },
        { text: "エンタメとして楽しむだけ、深く考えない", type: "neutral", value: 0 }
      ]
    },
    {
      id: 10,
      text: "友達がお見合いをセッティングしてくれると言っています",
      options: [
        { text: "いいね！いつ？どこで会う？", type: "teto", value: 3 },
        { text: "せめて写真だけでも先に見せて", type: "teto", value: 1 },
        { text: "プレッシャーで断りたい", type: "egen", value: 3 },
        { text: "どんな人か詳しく教えて", type: "egen", value: 2 }
      ]
    }
  ],
  zh: [
    {
      id: 1,
      text: "喜欢的人向你表白了！第一反应是？",
      options: [
        { text: "马上回复并约现在就见面", type: "teto", value: 2 },
        { text: "说要考虑几天给点时间", type: "egen", value: 2 },
        { text: "建议先做朋友", type: "neutral", value: 0 },
        { text: "激动得睡不着整夜想回复", type: "egen", value: 3 }
      ]
    },
    {
      id: 2,
      text: "突然得到一亿元，最先做什么？",
      options: [
        { text: "马上投资股票或房地产", type: "teto", value: 3 },
        { text: "孝敬家人并做慈善", type: "egen", value: 2 },
        { text: "环游世界拍绝美照片", type: "teto", value: 1 },
        { text: "先存起来慢慢计划", type: "egen", value: 3 }
      ]
    },
    {
      id: 3,
      text: "朋友发消息说'我最近很郁闷'",
      options: [
        { text: "什么问题？我们一起想办法解决", type: "teto", value: 3 },
        { text: "真的吗？什么时候有空？见面聊聊", type: "egen", value: 2 },
        { text: "好难过啊😢 我也有过这种时候", type: "egen", value: 3 },
        { text: "去吃好吃的吧！我请客", type: "teto", value: 1 }
      ]
    },
    {
      id: 4,
      text: "要拍照发朋友圈",
      options: [
        { text: "随便找个好看的地方快速拍", type: "teto", value: 2 },
        { text: "光线角度完美前要拍100张", type: "egen", value: 3 },
        { text: "让朋友帮忙拍出完美照片", type: "neutral", value: 0 },
        { text: "镜子自拍最方便", type: "teto", value: 1 }
      ]
    },
    {
      id: 5,
      text: "公司突然让你做演讲",
      options: [
        { text: "太好了！这种机会难得", type: "teto", value: 3 },
        { text: "天啊...紧张得说不出话", type: "egen", value: 3 },
        { text: "必须做但真的不想😭", type: "egen", value: 1 },
        { text: "准备好的内容正常发挥就行", type: "neutral", value: 0 }
      ]
    },
    {
      id: 6,
      text: "节日街头艺人邀请你上台表演",
      options: [
        { text: "好的！我要做什么？", type: "teto", value: 3 },
        { text: "不不不，我不行😭", type: "egen", value: 3 },
        { text: "朋友推我的话没办法", type: "neutral", value: 0 },
        { text: "微笑着逃跑", type: "egen", value: 1 }
      ]
    },
    {
      id: 7,
      text: "喜欢的明星从你面前走过！",
      options: [
        { text: "拍照立刻发社交媒体", type: "teto", value: 2 },
        { text: "呆呆地看着", type: "egen", value: 2 },
        { text: "心跳加速在原地呆住", type: "egen", value: 3 },
        { text: "马上发消息跟朋友炫耀", type: "teto", value: 1 }
      ]
    },
    {
      id: 8,
      text: "外卖点什么纠结了一小时...",
      options: [
        { text: "别浪费时间了，点平时吃的", type: "teto", value: 3 },
        { text: "看完所有评价再慎重选择", type: "egen", value: 3 },
        { text: "问朋友推荐", type: "egen", value: 1 },
        { text: "闭眼随便点", type: "teto", value: 1 }
      ]
    },
    {
      id: 9,
      text: "看电视剧男主壁咚女主的场景",
      options: [
        { text: "哇好浪漫😍 我也想被这样对待", type: "egen", value: 3 },
        { text: "电视剧里才帅，现实中很讨厌", type: "teto", value: 3 },
        { text: "演员帅才好看，现实中不行", type: "teto", value: 1 },
        { text: "就是娱乐，不用想太多", type: "neutral", value: 0 }
      ]
    },
    {
      id: 10,
      text: "朋友要给你安排相亲",
      options: [
        { text: "好啊！什么时候？在哪见？", type: "teto", value: 3 },
        { text: "至少先让我看看照片", type: "teto", value: 1 },
        { text: "压力太大想拒绝", type: "egen", value: 3 },
        { text: "详细介绍一下是什么样的人", type: "egen", value: 2 }
      ]
    }
  ]
};
