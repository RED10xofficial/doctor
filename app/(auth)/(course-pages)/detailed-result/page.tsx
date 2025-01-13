import { ArrowLeft, CircleX, ReceiptText } from "lucide-react";

export default function DetailedResultPage() {
    // Mock data - in real app, this would come from your API/database
    const questions = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `Sample Question ${i + 1}: What is the capital of Country X?`,
        options: [
            "Option A: City 1",
            "Option B: City 2",
            "Option C: City 3",
            "Option D: City 4"
        ],
        correctAnswer: 2, // index of correct answer
        stats: {
            correctAnswers: Math.floor(Math.random() * 80) + 20, // Random number between 20-100
            totalAttempts: 100
        }
    }));

    return (
        <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-10 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold flex items-center gap-2"><ReceiptText className="text-gray-500" />Detailed Result</h1>
                    <div className="relative inline-flex items-center justify-center">
                        <svg className="w-20 h-20">
                            <circle
                                className="text-gray-200"
                                strokeWidth="5"
                                stroke="currentColor"
                                fill="transparent"
                                r="32"
                                cx="40"
                                cy="40"
                            />
                            <circle
                                className="text-green-500"
                                strokeWidth="5"
                                stroke="currentColor"
                                fill="transparent"
                                r="32"
                                cx="40"
                                cy="40"
                                strokeDasharray={201.06} // 2 * π * r
                                strokeDashoffset={201.06 - (201.06 * (42 / 50))}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-gray-700 text-sm">
                            <span className="font-semibold text-2xl">42</span>
                            <span className="text-sm">/50</span>
                        </span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    {questions.map((q, qIndex) => (
                        <div key={q.id} className={`bg-gray-100 rounded-lg p-6 space-y-4  ${qIndex % 3 !== 0 ? '' : 'bg-red-50'}`}>
                            <h3 className="font-medium">{q.question}</h3>
                            <div className="space-y-2">
                                {q.options.map((option, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-3 rounded-md flex items-center gap-2 text-sm  ${
                                            index === q.correctAnswer 
                                                ? 'text-green-800 font-semibold bg-green-200' 
                                                : 'text-gray-700'
                                        }`}
                                    >
                                    {option}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Response Statistics:</span>
                                    <span className="font-medium">
                                        {(q.stats.correctAnswers / q.stats.totalAttempts * 100).toFixed(1)}% Correct
                                    </span>
                                </div>
                                <div className="mt-2 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-400 h-2 rounded-full"
                                        style={{ width: `${(q.stats.correctAnswers / q.stats.totalAttempts * 100)}%` }}
                                    ></div>
                                </div>
                                <div className="mt-1 flex justify-between text-xs">
                                    <span>{q.stats.correctAnswers} correct answers</span>
                                    <span>{q.stats.totalAttempts - q.stats.correctAnswers} incorrect answers</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}