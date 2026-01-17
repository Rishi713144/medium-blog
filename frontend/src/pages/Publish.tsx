import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handlePublish = async () => {
        const content = contentRef.current?.innerHTML || "";
        if (!title || !contentRef.current?.innerText.trim()) return alert("Content is missing");
        
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            alert("Error while publishing");
        } finally {
            setLoading(false);
        }
    }

    const execCmd = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
    };

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            <div className="flex justify-center w-full pt-8 px-4"> 
                <div className="max-w-screen-md w-full">
                    
                    <div className="sticky top-20 z-10 bg-white py-2 border-b border-slate-100 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <ToolbarButton 
                                onMouseDown={() => execCmd('bold')} 
                                icon={<BoldIcon />} 
                                label="Bold" 
                            />
                            <ToolbarButton 
                                onMouseDown={() => execCmd('italic')} 
                                icon={<ItalicIcon />} 
                                label="Italic" 
                            />
                            <ToolbarButton 
                                onMouseDown={() => {
                                    const url = prompt("Enter link URL:");
                                    if (url) execCmd('createLink', url);
                                }} 
                                icon={<LinkIcon />} 
                                label="Link" 
                            />
                            <div className="w-[1px] h-6 bg-slate-200 mx-2" />
                            <ToolbarButton 
                                onMouseDown={() => execCmd('formatBlock', 'blockquote')} 
                                icon={<QuoteIcon />} 
                                label="Quote" 
                            />
                        </div>
                        
                        <button 
                            disabled={loading}
                            onClick={handlePublish}
                            className={`px-6 py-1.5 text-sm font-bold rounded-full transition-all 
                                ${loading ? "bg-slate-100 text-slate-400" : "bg-black text-white hover:bg-slate-800"}`}
                        >
                            {loading ? "..." : "Publish"}
                        </button>
                    </div>

                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full text-5xl font-bold outline-none placeholder:text-slate-200 text-slate-900 bg-transparent mb-6" 
                        placeholder="Title" 
                    />

                    <div 
                        ref={contentRef}
                        contentEditable
                        className="w-full text-xl font-serif outline-none text-slate-800 bg-transparent leading-relaxed min-h-[500px] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 cursor-text" 
                        data-placeholder="Tell your story..." 
                    />
                </div>
            </div>
        </div>
    );
}

// Button Component with onClick
const ToolbarButton = ({ icon, label, onMouseDown }: { icon: any, label: string, onMouseDown: () => void }) => (
    <button 
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onMouseDown(); }}
        className="p-2 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition-colors"
        title={label}
    >
        {icon}
    </button>
);

// Icons
const BoldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
const ItalicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5-1 4-3 5"/></svg>