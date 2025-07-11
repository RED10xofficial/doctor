import { LightbulbIcon } from "lucide-react";

const ExamInstructions = ({ instructions, onStart }: { instructions?: string, onStart: () => void }) => {
    return (
        <div>
            <LightbulbIcon className="w-10 h-10 text-yellow-400 my-3" />
            <p>
                {instructions ? instructions : "You can start the test anytime, but make sure to finish it before the specified time."}
            </p>
            <div className="flex justify-end">
                <button className="bg-sky-600 text-white px-4 py-2 rounded-md" onClick={onStart}>Start Exam</button>
            </div>
        </div>
    );
}

export default ExamInstructions;
