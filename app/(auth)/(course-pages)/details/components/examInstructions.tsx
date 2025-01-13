import { LightbulbIcon } from "lucide-react";

const ExamInstructions = ({ onStart }: { onStart: () => void }) => {
    return (
        <div>
           <LightbulbIcon className="w-10 h-10 text-yellow-400 my-3" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="flex justify-end">
                <button className="bg-sky-600 text-white px-4 py-2 rounded-md" onClick={onStart}>Start Exam</button>
            </div>
        </div>
    );
}

export default ExamInstructions;
