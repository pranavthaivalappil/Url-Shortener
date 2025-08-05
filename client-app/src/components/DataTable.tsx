import { useState } from "react";
import { UrlData } from "../interface/UrlData";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface DataTableProps {
    data: UrlData[];
    updateReloadState: () => void;
}

const DataTable = ({ data, updateReloadState }: DataTableProps) => {
    const [copySuccess, setCopySuccess] = useState<string>("");

    const renderTableData = () => {
        return data.map((item) => {
            return (
                <tr key={item._id} className="border-b bg-gray-50 border-gray-200">
                    <td className="px-6 py-3 text-xs text-gray-700 uppercase">
                        {item.fullUrl}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-700 uppercase">
                        <a
                            href={`https://url-shortener-pranav.vercel.app/api/shortUrl/${item.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {item.shortUrl}
                        </a>
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-700 uppercase">
                        {item.clicks}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-700 uppercase">
                        {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-700 uppercase">
                        <button
                            onClick={() => copyToClipboard(item.shortUrl)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                            <ClipboardDocumentIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => deleteUrl(item._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const copyToClipboard = (shortUrl: string) => {
        const fullShortUrl = `https://url-shortener-pranav.vercel.app/api/shortUrl/${shortUrl}`;
        navigator.clipboard.writeText(fullShortUrl);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    const deleteUrl = async (id: string) => {
        try {
            await axios.delete(`https://url-shortener-pranav.vercel.app/api/shortUrl/${id}`);
            updateReloadState();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto p-2">
            <div className="relative overflow-x-auto">
                {copySuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {copySuccess}
                    </div>
                )}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-md text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Short URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Clicks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;