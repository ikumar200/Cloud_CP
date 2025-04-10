import { useState } from "react";

const InputForm = ({ onGenerate }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        onGenerate(input);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Recipe Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter ingredients, cuisine, or specific instructions..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Generate Recipe
                </button>
            </form>
        </div>
    );
};

export default InputForm;
