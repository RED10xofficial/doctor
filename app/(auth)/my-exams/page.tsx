"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for attended exams
const attendedExams = [
  {
    id: "exam-001",
    examName: "Mid-Term Assessment",
    unitName: "Mathematics",
    sectionName: "Algebra",
    marksScored: 85,
    totalMarks: 100
  },
  {
    id: "exam-002",
    examName: "Final Examination",
    unitName: "Science",
    sectionName: "Physics",
    marksScored: 78,
    totalMarks: 100
  },
  {
    id: "exam-003",
    examName: "Quiz",
    unitName: "English",
    sectionName: "Grammar",
    marksScored: 92,
    totalMarks: 100
  },
  {
    id: "exam-004",
    examName: "Project Assessment",
    unitName: "Computer Science",
    sectionName: "Programming",
    marksScored: 88,
    totalMarks: 100
  }
];

export default function MyExamsPage() {
    const router = useRouter();

    const handleExamClick = (examId: string) => {
        router.push(`/detailed-result/${examId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">My Exams</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendedExams.map((exam) => {
                    // Calculate percentage for display
                    const percentage = Math.round((exam.marksScored / exam.totalMarks) * 100);
                    // Determine color based on score percentage
                    let scoreColor = "text-red-600";
                    let progressColor = "bg-red-500";
                    
                    if (percentage >= 70) {
                        scoreColor = "text-green-600";
                        progressColor = "bg-green-500";
                    } else if (percentage >= 50) {
                        scoreColor = "text-yellow-600";
                        progressColor = "bg-yellow-500";
                    }
                    
                    return (
                        <div 
                            key={exam.id}
                            onClick={() => handleExamClick(exam.id)}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-3 text-gray-800">{exam.examName}</h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                            <span className="text-blue-600 text-xs">📚</span>
                                        </div>
                                        <p className="text-gray-700">{exam.unitName}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                            <span className="text-purple-600 text-xs">📝</span>
                                        </div>
                                        <p className="text-gray-700">{exam.sectionName}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-gray-700">Score</span>
                                        <div className="flex items-center">
                                            <span className={`text-xl font-bold ${scoreColor}`}>{exam.marksScored}</span>
                                            <span className="text-gray-500 mx-1">/</span>
                                            <span className="text-gray-700">{exam.totalMarks}</span>
                                            <span className={`ml-2 text-sm font-medium ${scoreColor}`}>({percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`${progressColor} h-3 rounded-full transition-all duration-500`} 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <button 
                                    className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center"
                                >
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}