import { NextResponse } from 'next/server';

// This is a mock database of questions. In a real application, you would fetch this from your database.
const questionsDatabase = {
  easy: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    // Add more easy questions here
  ],
  medium: [
    {
      id: 3,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: "Au"
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correctAnswer: "Da Vinci"
    },
    // Add more medium questions here
  ],
  hard: [
    {
      id: 5,
      question: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
      correctAnswer: "12"
    },
    {
      id: 6,
      question: "Which element has the atomic number 79?",
      options: ["Silver", "Gold", "Platinum", "Copper"],
      correctAnswer: "Gold"
    },
    // Add more hard questions here
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');
  const count = searchParams.get('count');

  if (!difficulty || !count) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return NextResponse.json(
      { error: 'Invalid difficulty level' },
      { status: 400 }
    );
  }

  const numCount = parseInt(count);
  if (isNaN(numCount) || numCount < 1 || numCount > 50) {
    return NextResponse.json(
      { error: 'Invalid question count' },
      { status: 400 }
    );
  }

  // Get questions for the specified difficulty
  const availableQuestions = questionsDatabase[difficulty as keyof typeof questionsDatabase];
  
  // Randomly select the requested number of questions
  const selectedQuestions = availableQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, numCount);

  return NextResponse.json(selectedQuestions);
} 