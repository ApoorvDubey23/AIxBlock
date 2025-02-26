import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import socket from "./Socket.js";
import { Loader, ExternalLink } from "lucide-react"; // Icons

function App() {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        console.log("🔄 Setting up WebSocket connection...");

        socket.on("connect", () => {
            console.log("🚀 Socket connected!");
        });

        const handleDataReceive = async (data) => {
            console.log("🚀 Data Received, Converting...", data);
            setLoading(true);
            try {
                const convertedData = await axios.post("https://aixblock-1.onrender.com/convert", { data: data });
                console.log("✅ Data Converted",convertedData.data.result);
                setResponseData(convertedData.data.result);
                setLoading(false);
            } catch (error) {
                console.error("❌ Conversion Error:", error);
                setErrorMsg("Failed to process data.");
            } 

        };

        socket.on("dataReceive", handleDataReceive);

        return () => {
            console.log("🔴 Cleaning up WebSocket listener...");
            socket.off("dataReceive", handleDataReceive);
        };
    }, []);
     const getTab = async () => {
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        return tabs[0]?.url || "No active tab found";
    };

    const Predict = async () => {
        console.log("🚀 Predict function triggered!");
        setLoading(true);
        setErrorMsg(null);

        try {
            const pageUrl = await  getTab();
          
            console.log("🔹 Current Tab URL:", pageUrl);

            const predictionRequest = await axios.post("https://multiagent.aixblock.io/api/v1/execute/result/67bdac48471a83f0355e05d7", {
                "WebSiteUrl": pageUrl,
                "webhook": "https://aixblock-1usr.onrender.com/webhook"
            });

            console.log("✅ Request Sent:", predictionRequest.data);
        } catch (error) {
            console.error("❌ API Error:", error);
            setErrorMsg(error.response?.data || "An error occurred.");
        } 
    };

    return (
        <div className="max-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-2">
        {/* 🔹 Header */}
        <h1 className="text-xl font-bold mb-2">📢 OG Insights</h1>
        <p className="text-gray-400 text-md mb-6">Get AI-generated analysis on key topics</p>
    
        {/* 🔹 Predict Button */}
        <button
            onClick={Predict}
            className="flex items-center justify-center bg-green-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-600 transition duration-200 shadow-md"
        >
            {loading ? <Loader className="animate-spin mr-2" /> : "📌 Generate Insights"}
        </button>
    
        {/* 🔹 Error Message */}
        {errorMsg && (
            <div className="mt-4 text-red-500 text-md font-medium">
                <span>⚠️ {errorMsg}</span>
            </div>
        )}
    
        {/* 🔹 Loading Spinner */}
        {loading && (
            <div className="mt-6 flex items-center justify-center">
                <Loader className="animate-spin text-gray-400" size={40} />
            </div>
        )}
    
        {/* 🔹 Response Data Display */}
        {responseData && (
            <div className="mt-6 overflow-auto max-h-[500px]  max-w-3xl bg-black p-6 rounded-lg text-sm shadow-xl border border-gray-700">
                <h3 className="text-xl text-left font-semibold mb-4">{responseData.title?responseData.title:"No Title"}</h3>
    
                {/* 🔹 Summary */}
                <p className="text-gray-300 text-left text-md mb-4 leading-relaxed">{responseData.summary?
                    responseData.summary:"Sorry , No Summary"
                }</p>
    
                {/* 🔹 Key Highlights */}
                <h4 className="text-lg font-semibold text-left mt-4 border-b border-gray-700 pb-2">🔹 Key Highlights</h4>
                <ul className="list-disc text-left pl-5 text-gray-300 text-md mt-2 space-y-1">
                    {responseData.keyHighlights&& responseData.keyHighlights.length>0?responseData.keyHighlights.map((point, index) => (
                        <li key={index}>{point}</li>
                    )):" Sorry , No Key Highlights"}
                </ul>
                 {/* 🔹 Important Data Points */}
                 <h4 className="text-lg font-semibold text-left mt-4 border-b border-gray-700 pb-2">📊 Important Data</h4>
                    <ul className="list-disc pl-5 text-left text-gray-300 text-sm">
                        {responseData.importantDataPoints&& responseData.importantDataPoints.length>0?responseData.importantDataPoints.map((data, index) => (
                            <li key={index}>
                                {data}
                            </li>
                        )):"Sorry , No Important Data Points"}
                    </ul>
    
                {/* 🔹 Additional Relevant Topics */}
                <h4 className="text-lg text-left font-semibold mt-4 border-b border-gray-700 pb-2">📌 Additional Topics</h4>
                <ul className="list-disc text-left pl-5 text-gray-300 text-md mt-2 space-y-1">
                    {responseData.additionalRelevantTopics?responseData.additionalRelevantTopics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                    )):"No Additional Topics"}
                </ul>
    
                {/* 🔹 Relevant Links */}
                <h4 className="text-lg text-left font-semibold mt-4 border-b border-gray-700 pb-2">🔗 Relevant Links</h4>
                <ul className="pl-5 text-left text-gray-300 text-md mt-2 space-y-2">
                    {responseData.relevantLinks&& responseData.relevantLinks.length > 0 ? (
                        responseData.relevantLinks.map((link, index) => (
                            <li key={index} className="flex items-center">
                                <ExternalLink size={16} className="mr-2 text-blue-400" />
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline hover:text-blue-500 transition duration-200"
                                >
                                    {link}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400 italic">Sorry, no relevant links available at the moment.</li>
                    )}
                </ul>
            </div>
        )}
    </div>
    
    );
}

export default App;
