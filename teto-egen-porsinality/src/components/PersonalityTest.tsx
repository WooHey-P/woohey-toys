import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Brain, Play, Clock, Users, Heart, Lightbulb, Crown, Flame, Sparkles, ChevronLeft, Share, RotateCcw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BannerAd, SquareAd } from "@/components/AdBanner";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { questions } from "@/data/questions";
import { personalityTypes } from "@/data/personalityTypes";
import { apiRequest } from "@/lib/queryClient";
import type { TestSubmission, QuestionAnswer } from "@shared/schema";

type Screen = "welcome" | "gender" | "quiz" | "loading" | "result";
type Gender = "male" | "female";

interface TestResult {
  personalityType: string;
  tetoPercentage: number;
  egenPercentage: number;
}

export function PersonalityTest() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedGender, setSelectedGender] = useState<Gender>("male");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2));

  const currentQuestions = questions[language] || questions.ko;
  const currentPersonalityTypes = personalityTypes[language] || personalityTypes.ko;

  // Generate image for current question
  const { data: questionImage } = useQuery({
    queryKey: ["question-image", currentQuestion, language, selectedGender],
    queryFn: async () => {
      if (currentScreen !== "quiz") return null;
      
      const question = currentQuestions[currentQuestion];
      const response = await apiRequest("POST", "/api/generate-image", {
        questionId: question.id,
        questionText: question.text,
        language,
        gender: selectedGender
      });
      const data = await response.json();
      return data.success ? data.imageUrl : null;
    },
    enabled: currentScreen === "quiz",
    staleTime: Infinity, // Images don't change
  });

  const submitTestMutation = useMutation({
    mutationFn: async (submission: TestSubmission) => {
      const response = await apiRequest("POST", "/api/test/submit", submission);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data.result);
      setCurrentScreen("result");
    },
    onError: () => {
      toast({
        title: "오류 발생",
        description: "테스트 결과를 저장하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const startTest = () => {
    setCurrentScreen("gender");
  };

  const selectGender = (gender: Gender) => {
    setSelectedGender(gender);
    setCurrentScreen("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const selectAnswer = (optionIndex: number) => {
    // Prevent selecting if answer already exists (can't change answer)
    if (answers[currentQuestion]) {
      return;
    }

    const question = currentQuestions[currentQuestion];
    const option = question.options[optionIndex];
    
    const answer: QuestionAnswer = {
      questionId: question.id,
      optionIndex,
      type: option.type,
      value: option.value,
    };

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Move to next question after a short delay, but only if we're not already at the last question
    setTimeout(() => {
      if (currentQuestion + 1 >= currentQuestions.length) {
        finishQuiz(newAnswers);
      } else {
        // Find the next unanswered question
        let nextQuestion = currentQuestion + 1;
        while (nextQuestion < currentQuestions.length && newAnswers[nextQuestion]) {
          nextQuestion++;
        }
        
        if (nextQuestion >= currentQuestions.length) {
          finishQuiz(newAnswers);
        } else {
          setCurrentQuestion(nextQuestion);
        }
      }
    }, 500);
  };

  const finishQuiz = (finalAnswers: QuestionAnswer[]) => {
    setCurrentScreen("loading");
    
    // Simulate loading with realistic delay
    setTimeout(() => {
      submitTestMutation.mutate({
        sessionId,
        gender: selectedGender,
        answers: finalAnswers,
        language,
      });
    }, 3000);
  };

  const restartTest = () => {
    setCurrentScreen("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const shareResult = async () => {
    if (!result) return;

    const typeData = currentPersonalityTypes[result.personalityType];
    const text = `나는 ${typeData.title}입니다! ${typeData.subtitle}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "테토-에겐 성격 유형 테스트 결과",
          text,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        toast({
          title: "복사 완료",
          description: "결과가 클립보드에 복사되었습니다!",
        });
      } catch (error) {
        toast({
          title: "공유 실패",
          description: "결과를 복사할 수 없습니다.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <WelcomeScreen key="welcome" onStart={startTest} />
        )}
        
        {currentScreen === "gender" && (
          <GenderScreen key="gender" onSelect={selectGender} />
        )}
        
        {currentScreen === "quiz" && (
          <QuizScreen 
            key="quiz"
            question={currentQuestions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={currentQuestions.length}
            onAnswer={selectAnswer}
            onPrevious={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            onNext={() => {
              // Find next unanswered question or go to next sequential question
              let nextQuestion = currentQuestion + 1;
              if (nextQuestion >= currentQuestions.length) {
                // If all questions answered, finish quiz
                if (answers.filter(a => a).length === currentQuestions.length) {
                  finishQuiz(answers);
                }
                return;
              }
              setCurrentQuestion(nextQuestion);
            }}
            canGoPrevious={currentQuestion > 0}
            canGoNext={currentQuestion < currentQuestions.length - 1 || answers[currentQuestion]}
            selectedAnswer={answers[currentQuestion]?.optionIndex}
            questionImage={questionImage}
          />
        )}
        
        {currentScreen === "loading" && (
          <LoadingScreen key="loading" />
        )}
        
        {currentScreen === "result" && result && (
          <ResultScreen 
            key="result"
            result={result}
            personalityData={currentPersonalityTypes[result.personalityType]}
            onShare={shareResult}
            onRestart={restartTest}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MainImage() {
  const { data: mainImage, isLoading } = useQuery({
    queryKey: ["main-image"],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/generate-image", {
        questionId: 999,
        questionText: "메인 대표 이미지",
        language: "ko",
        gender: "neutral"
      });
      const data = await response.json();
      return data.success ? data.imageUrl : null;
    },
    staleTime: Infinity,
  });

  if (isLoading || !mainImage) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
        <div className="text-6xl">✨</div>
      </div>
    );
  }

  return (
    <img 
      src={mainImage} 
      alt="Teto-Egen Test" 
      className="w-full h-full object-cover"
    />
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          {/* Personality type visualization */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <Card className="bg-gradient-to-br from-red-500/20 to-red-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">테토</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-400">에겐</p>
              </CardContent>
            </Card>
          </div>

          <div className="relative mb-8">
            {/* Generated main illustration */}
            <div className="w-64 h-64 mx-auto rounded-3xl overflow-hidden shadow-xl mb-6">
              <MainImage />
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">💫</div>
            <div className="absolute -bottom-2 -left-6 text-3xl animate-pulse">🌟</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            테토-에겐 성격 테스트
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 font-medium">
            나는 과연 어떤 타입일까? 🤔
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            요즘 핫한 테토-에겐 성격 테스트! 10개의 재미있는 질문으로 내 성격을 알아보자. 생각보다 정확해서 깜짝 놀랄지도? 😮
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mt-6 max-w-md mx-auto">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              💡 솔직하게 답할수록 더 정확한 결과를 얻을 수 있어요!
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("welcome.description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="personality-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("welcome.features.analysis")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("welcome.features.analysis.desc")}</p>
            </CardContent>
          </Card>
          
          <Card className="personality-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("welcome.features.relationship")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("welcome.features.relationship.desc")}</p>
            </CardContent>
          </Card>
          
          <Card className="personality-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("welcome.features.personal")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("welcome.features.personal.desc")}</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          {t("welcome.start")}
        </Button>

        {/* Main page ad */}
        <div className="mt-8">
          <BannerAd slot="1234567890" className="mx-auto" />
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 inline mr-1" />
          {t("welcome.duration")}
        </p>
      </div>
    </motion.div>
  );
}

function GenderScreen({ onSelect }: { onSelect: (gender: Gender) => void }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("gender.title")}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t("gender.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Button
            variant="outline"
            onClick={() => onSelect("male")}
            className="h-auto p-8 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <span className="text-3xl">♂️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t("gender.male")}</h3>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => onSelect("female")}
            className="h-auto p-8 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200 group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors">
                <span className="text-3xl">♀️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t("gender.female")}</h3>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function QuizScreen({ 
  question, 
  questionIndex, 
  totalQuestions, 
  onAnswer, 
  onPrevious, 
  onNext,
  canGoPrevious,
  canGoNext,
  selectedAnswer,
  questionImage
}: {
  question: any;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  selectedAnswer?: number;
  questionImage?: string | null;
}) {
  const { t } = useTranslation();
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-4xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("quiz.progress")}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {questionIndex + 1} / {totalQuestions}
              </span>
              {selectedAnswer !== undefined && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                  완료
                </span>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(progress)}% 진행됨
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="personality-card">
        <CardContent className="p-8">
          {/* Question Image */}
          {questionImage && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  src={questionImage} 
                  alt="Question illustration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}
          
          {!questionImage && (
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-md h-48 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {question.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((option: any, index: number) => {
              const isAnswered = selectedAnswer !== undefined;
              const isSelected = selectedAnswer === index;
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => !isAnswered && onAnswer(index)}
                  disabled={isAnswered}
                  className={`answer-option ${isSelected ? 'selected' : ''} ${isAnswered && !isSelected ? 'opacity-40' : ''} ${isAnswered ? 'cursor-default' : 'hover:scale-[1.02] transition-transform'}`}
                >
                  <div className="flex items-center w-full">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-semibold transition-all ${
                      isSelected 
                        ? 'border-green-500 bg-green-500 text-white shadow-md' 
                        : 'border-gray-300 dark:border-slate-500 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isSelected ? '✓' : String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-900 dark:text-white text-left">{option.text}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {canGoPrevious ? (
          <Button variant="outline" onClick={onPrevious}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("quiz.previous")}
          </Button>
        ) : (
          <div />
        )}
        
        <div className="flex items-center gap-4">
          {selectedAnswer !== undefined && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <span>✓</span>
              <span>{t("quiz.answer.selected")}</span>
            </div>
          )}
          
          {canGoNext && selectedAnswer !== undefined && (
            <Button onClick={onNext} className="bg-primary text-white hover:bg-primary/90">
              {t("quiz.next")}
              <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LoadingScreen() {
  const { t } = useTranslation();
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    t("loading.personality"),
    t("loading.teto"),
    t("loading.egen"),
    t("loading.relationship"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingSteps.length);
    }, 600);

    return () => clearInterval(interval);
  }, [loadingSteps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center space-y-8">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("loading.analyzing")}</h2>
            <p className="text-gray-600 dark:text-gray-400">{loadingSteps[loadingStep]}</p>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            {loadingSteps.map((step, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{step}</span>
                <span>
                  {index < loadingStep ? t("loading.complete") : 
                   index === loadingStep ? t("loading.inprogress") : 
                   t("loading.waiting")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ResultScreen({ 
  result, 
  personalityData, 
  onShare, 
  onRestart 
}: {
  result: TestResult;
  personalityData: any;
  onShare: () => void;
  onRestart: () => void;
}) {
  const { t } = useTranslation();

  const getPersonalityIcon = (type: string) => {
    switch (type) {
      case 'tetoMale': return <Flame className="w-8 h-8 text-white" />;
      case 'tetoFemale': return <Crown className="w-8 h-8 text-white" />;
      case 'egenMale': return <Heart className="w-8 h-8 text-white" />;
      case 'egenFemale': return <Sparkles className="w-8 h-8 text-white" />;
      default: return <Brain className="w-8 h-8 text-white" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Ad before results */}
      <div className="text-center">
        <BannerAd slot="2345678901" className="mb-6" />
      </div>

      {/* Result Header */}
      <Card className="personality-card text-center">
        <CardContent className="p-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-24 h-24 mx-auto bg-gradient-to-br ${personalityData.gradient} rounded-full flex items-center justify-center`}
            >
              {getPersonalityIcon(result.personalityType)}
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{personalityData.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{personalityData.subtitle}</p>
            </div>

            {/* Personality Meters */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">테토 성향</span>
                  <span className="font-semibold text-red-600">{result.tetoPercentage}%</span>
                </div>
                <Progress value={result.tetoPercentage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">에겐 성향</span>
                  <span className="font-semibold text-purple-600">{result.egenPercentage}%</span>
                </div>
                <Progress value={result.egenPercentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personality Traits */}
        <Card className="personality-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-indigo-600" />
              {t("result.personality")}
            </h3>
            <div className="space-y-3">
              {personalityData.traits.map((trait: string, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Relationship Style */}
        <Card className="personality-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-600" />
              {t("result.relationship")}
            </h3>
            <div className="space-y-3">
              {personalityData.relationship.map((style: string, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  <span className="text-gray-700 dark:text-gray-300">{style}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compatibility */}
      <Card className="personality-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            {t("result.compatibility")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="text-2xl mb-2">💕</div>
              <div className="font-semibold text-green-700 dark:text-green-400 text-sm">{personalityData.compatibility.best}</div>
              <div className="text-xs text-green-600 dark:text-green-500">최고 궁합</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="text-2xl mb-2">💛</div>
              <div className="font-semibold text-yellow-700 dark:text-yellow-400 text-sm">{personalityData.compatibility.good}</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-500">좋은 궁합</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
              <div className="text-2xl mb-2">💔</div>
              <div className="font-semibold text-red-700 dark:text-red-400 text-sm">{personalityData.compatibility.caution}</div>
              <div className="text-xs text-red-600 dark:text-red-500">조심스러운 관계</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-semibold text-orange-700 dark:text-orange-400 text-sm">{personalityData.compatibility.friend}</div>
              <div className="text-xs text-orange-600 dark:text-orange-500">친구 관계</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onShare} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Share className="w-4 h-4 mr-2" />
          {t("result.share")}
        </Button>
        
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-2" />
          {t("result.retake")}
        </Button>
      </div>

      {/* Ad after results */}
      <div className="text-center">
        <SquareAd slot="3456789012" className="mx-auto" />
      </div>
    </motion.div>
  );
}
