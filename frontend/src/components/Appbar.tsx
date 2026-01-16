import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <nav className="border-b border-slate-100 flex justify-between items-center px-6 md:px-16 py-3 bg-white sticky top-0 z-50">
            {/* Logo Section */}
            <Link 
                to={'/blogs'} 
                className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-all"
            >
                Blogzen
            </Link>

            {/* Actions Section */}
            <div className="flex items-center gap-4">
                <Link to={`/publish`}>
                    <button 
                        type="button" 
                        className="hidden md:block text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-100 font-medium rounded-full text-sm px-5 py-2 transition-colors mr-2"
                    >
                        Write
                    </button>
                </Link>

                <div className="cursor-pointer hover:ring-2 hover:ring-slate-200 rounded-full transition-all">
                    <Avatar size={"big"} name="Rishi" />
                </div>
            </div>
        </nav>
    );
}