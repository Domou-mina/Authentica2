import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "커피를 한 입 마셨을 때 어떤 향이 더 마음에 드세요?",
    options: [
      { label: "입 안 가득 향이 확 퍼지는, 존재감 있는 커피", value: "E" },
      { label: "조용히 퍼지며 은은하게 느껴지는 섬세한 향", value: "I" }
    ]
  },
  {
    question: "평소 커피를 어떤 기준으로 선택하세요?",
    options: [
      { label: "합리적인 가격대에 매일 마셔도 좋은 맛이면 만족", value: "N" },
      { label: "가격이 좀 있어도 특별한 경험이 느껴지는 커피가 좋아요", value: "S" }
    ]
  },
  {
    question: "커피 향미 중 어떤 쪽이 더 끌리세요?",
    options: [
      { label: "고소하고 너티한 맛, 견과류나 초콜릿 같은 향", value: "T" },
      { label: "상큼하고 과일 향 도는 산뜻한 커피", value: "F" }
    ]
  },
  {
    question: "커피의 무게감에 대한 취향은 어떤가요?",
    options: [
      { label: "진하고 묵직한 바디감, 에스프레소 베이스의 커피가 좋아요", value: "J" },
      { label: "가볍고 산뜻한 느낌, 드립처럼 맑은 맛이 좋아요", value: "P" }
    ]
  },
  {
    question: "커피를 마실 때 어떤 순간이 더 좋으세요?",
    options: [
      { label: "일상 속에서 편하게 즐기는 루틴 같은 한 잔", value: "N" },
      { label: "특별한 날, 특별한 기분을 위한 한 잔", value: "S" }
    ]
  },
  {
    question: "당신에게 좋은 커피란 어떤 커피인가요?",
    options: [
      { label: "늘 안정적인 맛과 가격, 실패 없는 선택", value: "N" },
      { label: "새로운 맛을 경험하며 취향을 넓혀주는 커피", value: "S" }
    ]
  },
  {
    question: "커피의 바디감 외에, 추출 방식에 대한 취향은?",
    options: [
      { label: "진한 에스프레소 베이스의 커피들(아메리카노, 라떼 등)을 더 자주 마셔요", value: "J" },
      { label: "시간을 들여 천천히 내려 마시는 드립 커피가 좋아요", value: "P" }
    ]
  },
  {
    question: "커피를 마신 후 어떤 기분이 더 끌리세요?",
    options: [
      { label: "여운이 오래 남아, 커피를 마신 순간을 곱씹게 되는", value: "J" },
      { label: "뒷맛이 깔끔해서 다음 일에 바로 집중할 수 있는", value: "P" }
    ]
  }
];

function getResultType(answers) {
  const counts = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach((ans) => {
    if (counts[ans] !== undefined) counts[ans]++;
  });
  const getType = (a, b) => (counts[a] >= counts[b] ? a : b);
  return getType("E", "I") + getType("N", "S") + getType("T", "F") + getType("J", "P");
}

const LETTER_DESCRIPTIONS = {
  E: {
    title: "E (Expressive): 향이 선명하고 확실한 커피",
    desc: "한 입 마셨을 때 향이 확 퍼지고, 존재감이 느껴지는 커피를 좋아해요."
  },
  I: {
    title: "I (Intimate): 향이 은은하고 섬세한 커피",
    desc: "향이 조용히 스며들듯 퍼지고, 마실수록 깊이 느껴지는 섬세한 커피를 선호해요."
  },
  N: {
    title: "N (Normal): 데일리하게 부담 없이 즐기는 커피",
    desc: "일상 속에서 자주 마실 수 있고, 가격대도 합리적인 커피를 선호해요."
  },
  S: {
    title: "S (Special): 특별한 경험을 주는 프리미엄 커피",
    desc: "커피 한 잔에서도 새로운 향미와 고급스러움을 느끼고 싶어요."
  },
  T: {
    title: "T (Nutty): 고소하고 너티한 맛이 중심인 커피",
    desc: "견과류, 다크초콜릿 같은 고소한 풍미가 입에 잘 맞아요."
  },
  F: {
    title: "F (Fruity): 산뜻하고 과일 향 중심의 커피",
    desc: "복숭아, 베리, 감귤처럼 상큼하고 과일 향 도는 커피를 좋아해요."
  },
  J: {
    title: "J (Jet): 에스프레소 기반의 진하고 묵직한 커피",
    desc: "아메리카노, 라떼처럼 깊은 맛과 바디감이 있는 커피를 선호해요."
  },
  P: {
    title: "P (Pour-over): 필터커피 기반의 맑고 산뜻한 커피",
    desc: "핸드드립이나 브루잉처럼 깔끔하고 가벼운 맛을 선호해요."
  }
};

const RESULT_SUMMARY = {
  ENTP: "향이 선명하고 고소하며, 합리적인 가격대의 깔끔한 드립 커피.",
  ENTJ: "향이 선명하고 고소하며, 진하고 묵직한 데일리용 커피.",
  ENFP: "향이 강하고 산뜻한 과일 향이 깔끔하게 전달되는, 일상적으로 즐기기 좋은 드립 커피.",
  ENFJ: "향이 선명하고 과일 향이 느껴지는, 가격 부담 없이 즐길 수 있는 바디감 있는 커피.",
  ESTJ: "향이 선명하고 고소하며, 묵직한 프리미엄 커피.",
  ESTP: "향이 강하고 고소하며, 산뜻한 프리미엄 드립 커피.",
  ESFJ: "향이 강하고 과일 향이 조화로운, 바디감 있는 프리미엄 커피.",
  ESFP: "향이 풍부하고 산뜻한 과일 향이 돋보이는 프리미엄 드립 커피.",
  INTP: "향이 은은하고 고소하며, 합리적인 가격대의 데일리 드립 커피.",
  INTJ: "향이 은은하고 고소하며, 진한 맛을 부담 없이 즐길 수 있는 커피.",
  INFP: "향이 은은하고 산뜻한 과일 향이 깔끔한, 가성비 좋은 드립 커피.",
  INFJ: "향이 은은하고 과일 향이 부드럽게 퍼지는, 일상에 잘 어울리는 바디감 있는 커피.",
  ISTJ: "향이 은은하고 고소하며, 묵직한 프리미엄 커피.",
  ISTP: "향이 은은하고 고소하며, 클린한 프리미엄 드립 커피.",
  ISFP: "향이 은은하고 산뜻한 과일 향이 깔끔한 프리미엄 드립 커피.",
  ISFJ: "향이 은은하고 과일 향이 조화로운, 바디감 있는 프리미엄 커피."
};

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const result = getResultType(answers);

  const handleSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const ResultCard = ({ resultType }) => (
    <div key="result" className="bg-[#fdfafa] shadow-xl rounded-2xl p-8 pt-20 text-center">
      <h2 className="text-lg font-normal mb-6">당신의 커피 취향을 설명해드릴게요</h2>
      <div className="text-left space-y-6 mb-6">
        {resultType.split("").map((char, index) => (
          <div key={index} className="text-[#2E2E2E] text-[14px]">
            <p className="font-bold mb-1">
              <span className="inline-block w-5 h-5 mr-2 text-center rounded-full bg-[#2E2E2E] text-white text-sm font-semibold">
                {char}
              </span>
              {LETTER_DESCRIPTIONS[char]?.title}
            </p>
            <p className="font-normal pl-7 leading-snug">
              {LETTER_DESCRIPTIONS[char]?.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="text-left mt-6">
        <p className="text-[15px] text-[#2E2E2E] font-bold mb-2">추천커피</p>
        <div className="flex items-center space-x-4">
          <div className="bg-white border border-[#2E2E2E] text-[#2E2E2E] text-[42px] font-extrabold px-4 py-2 rounded-none">
            {resultType}
          </div>
          <p className="text-sm text-[#2E2E2E] font-bold leading-snug">
            {RESULT_SUMMARY[resultType]}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <AnimatePresence mode="wait">
        {step < QUESTIONS.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 280 }}
            animate={{ opacity: 1, y: 280 }}
            exit={{ opacity: 0, y: 280 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-[#fdfafa] shadow-xl rounded-2xl p-8 pt-20 text-center relative"
          >
            {step > 0 && (
              <button
                onClick={handleBack}
                className="absolute left-4 top-4 pt-1 pb-[72px]"
                aria-label="뒤로가기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <h2 className="font-bold text-xl mb-2">{QUESTIONS[step].question}</h2>
            <div className="border-t border-gray-300 my-4"></div>
            {QUESTIONS[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt.value)}
                className="mt-4 px-6 py-3 rounded-full border border-[#2E2E2E] text-[15px] font-normal text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 186 }}
            animate={{ opacity: 1, y: 186 }}
            exit={{ opacity: 0, y: 186 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ResultCard resultType={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}