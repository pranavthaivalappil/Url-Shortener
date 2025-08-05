import { useState } from "react";
import axios from "axios";

interface FormContainerProps {
    updateReloadState: () => void;
}

const FormContainer = ({ updateReloadState }: FormContainerProps) => {
    const [fullUrl, setFullUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("http://localhost:5001/api/shortUrl", {
                fullUrl: fullUrl,
            });
            setFullUrl("");
            updateReloadState();
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-2">
            <div className="bg-slate-50 my-8 rounded-xl p-4">
                <h2 className="text-4xl text-slate-900 text-center pb-4">
                    URL Shortener
                </h2>
                <p className="text-center pb-2 text-xl font-extralight">
                    Paste your untidy link to shorten it
                </p>
                <p className="text-center pb-4 text-sm text-gray-500">
                    Free tool to shorten a URL or reduce link, use our URL Shortener to create a shortened link making it easy to share
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                                urlshortener.link /
                            </div>
                            <input
                                type="text"
                                placeholder="Add your link"
                                required
                                className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                                value={fullUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFullUrl(e.target.value)
                                }
                            />
                            <button
                                type="submit"
                                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:bg-blue-800"
                                disabled={isLoading}
                            >
                                {isLoading ? "Shortening..." : "Shorten URL"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormContainer;