import type { Blog } from "../hooks";
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

const funnyCatchPhrases = [
    "Thinking about the Roman Empire at least once a day.",
    "Turning coffee into code since 2015.",
    "Writer, dreamer, and occasional napper.",
    "Exploring the universe, one word at a time.",
    "Here to share ideas and steal your cookies.",
    "Just another digital wanderer.",
    "Debugging life, one post at a time.",
    "Simplicity is the ultimate sophistication.",
    "Capturing moments in a world of chaos.",
    "Believer in magic, code, and late-night snacks."
];

const getCatchPhrase = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % funnyCatchPhrases.length);
    return funnyCatchPhrases[index];
}

export const FullBlog = ({ blog }: {blog: Blog}) => {
    const authorName = blog.author?.name || "Anonymous";
    
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
                <div className="col-span-12 md:col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className="col-span-12 md:col-span-4 mt-8 md:mt-0">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full mt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={authorName} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {authorName}
                            </div>
                            <div className="pt-2 text-slate-500">
                                {getCatchPhrase(authorName)}
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}