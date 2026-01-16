import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { type ChangeEvent, useState } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePublish = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            alert("Error while publishing post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            <div className="flex justify-center w-full pt-12 px-4"> 
                <div className="max-w-screen-md w-full">
                    {/* Title Input - Large and borderless for a professional feel */}
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        className="w-full text-4xl md:text-5xl font-serif outline-none placeholder:text-gray-300 text-gray-900 bg-transparent mb-4" 
                        placeholder="Title" 
                    />

                    {/* Content Editor */}
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />

                    {/* Publish Button */}
                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                        <button 
                            disabled={loading}
                            onClick={handlePublish}
                            type="submit" 
                            className={`inline-flex items-center px-6 py-2 text-sm font-medium text-white rounded-full transition-all 
                                ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                        >
                            {loading ? "Publishing..." : "Publish post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="mt-4">
            <textarea 
                onChange={onChange} 
                rows={12} 
                className="w-full text-xl font-serif outline-none placeholder:text-gray-300 text-gray-800 bg-transparent resize-none leading-relaxed" 
                placeholder="Tell your story..." 
                required 
            />
        </div>
    );
}