import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import socket from "./Socket.js";

function App() {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        console.log("🔄 Setting up WebSocket connection...");

        // ✅ Listen for WebSocket connection
        socket.on("connect", () => {
            console.log("🚀 Socket connected!");
        });

        // ✅ Listen for WebSocket messages
        const handleDataReceive = async(data) => {
            console.log("🚀 Data Received from Webhook:,converting",data);
            const convertedData=await axios.post("https://aixblock-1.onrender.com/convert",{data});
            console.log("converted");
            
            console.log(convertedData);
            setResponseData(convertedData); // Update UI with received data
        };

        socket.on("dataReceive", handleDataReceive);

        // ✅ Cleanup listener to prevent duplicate events
        return () => {
            console.log("🔴 Cleaning up WebSocket listener...");
            socket.off("dataReceive", handleDataReceive);
        };
    }, []); // ✅ Empty dependency array ensures it runs only once

    // 🔹 Get the active tab's URL (for Chrome extensions)
    const getTab = async () => {
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        return tabs[0]?.url || "No active tab found";
    };

    // 🔹 Function to send a request from frontend to backend
    const Predict = async () => {
        console.log("🚀 Predict function triggered!");
        setLoading(true);
        setErrorMsg(null);

        try {
            // const pageUrl = await getTab();
            // console.log("🔹 Current Tab URL:", pageUrl);

            const predictionRequest = await axios.post("https://multiagent.aixblock.io/api/v1/execute/result/67bdac48471a83f0355e05d7",{
             "WebSiteUrl": "https://www.hindustantimes.com/india-news/maha-kumbh-2025-ends-today-maha-shivratri-rush-at-sangam-for-final-snan-police-on-alert-in-prayagraj-10-points-101740529530803.html",
    "webhook": "https://aixblock-1usr.onrender.com/webhook"

            })

            console.log("✅ Request sent successfully:", predictionRequest.data);

            // ✅ Send another request (Ensure the correct backend port)
            // const data=
            // {"result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final \u2018snan\u2019; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Kumbh Mela 2025 concluded on February 26th with a Maha Shivratri rush.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip ('snan').\",\n    \"Police were on high alert in Prayagraj due to the expected large crowd.\",\n    \"The six-week-long Mela saw six special 'snans', including three 'Amrit Snans'.\",\n    \"Extensive security and management arrangements were made, including a 'no vehicle zone'.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th, Maha Shivratri, with a large number of devotees gathering at the Triveni Sangam for the final holy bath.  Authorities implemented extensive security measures due to the anticipated large crowd.  The Mela, held in Prayagraj, Uttar Pradesh, lasted six weeks and included six special bathing days.\",\n  \"dataPoints\": [\n    \"37,000 police personnel and 14,000 home guards deployed for security.\",\n    \"2,750 AI-based CCTV cameras installed.\",\n    \"Over 350 additional trains planned by Indian Railways to manage the departing crowds.\",\n    \"Over 1.33 crore devotees anticipated for Maha Shivratri.\",\n    \"50 fire stations and 20 fire posts on standby.\"\n  ],\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\"\n  ],\n  \"additionalRelevantTopics\": [\n    {\n      \"topic\": \"Religious Significance of the Maha Kumbh Mela\",\n      \"description\": \"The Maha Kumbh Mela is deeply rooted in Hindu mythology and tradition, attracting millions of devotees seeking spiritual cleansing and blessings.  Its origins are linked to the churning of the ocean of milk and the acquisition of the nectar of immortality.\",\n      \"sources\": [\n        \"Various Hindu scriptures and mythological texts\",\n        \"Scholarly articles on Hindu religious practices\"\n      ]\n    },\n    {\n      \"topic\": \"Crowd Management in Large Religious Gatherings\",\n      \"description\": \"Managing the massive crowds at the Maha Kumbh Mela presents significant logistical and safety challenges.  Effective strategies include advanced crowd monitoring systems, improved infrastructure, clear communication channels, and coordinated efforts from various agencies.\",\n      \"sources\": [\n          \"Reports and studies on crowd management at large events\",\n          \"Government and NGO initiatives related to crowd safety\"\n      ]\n    },\n    {\n      \"topic\": \"Economic Impact of the Maha Kumbh Mela\",\n      \"description\": \"The Maha Kumbh Mela generates substantial economic activity in the region, impacting local businesses, tourism, and employment.  It's estimated to generate billions of rupees in revenue.\",\n      \"sources\": [\n        \"Economic impact assessments of past Kumbh Melas\",\n        \"Reports from chambers of commerce and industry bodies\"\n      ]\n    },\n    {\n      \"topic\": \"Public Health and Sanitation during the Maha Kumbh Mela\",\n      \"description\": \"Maintaining public health and sanitation amidst millions of pilgrims is crucial.  This involves providing access to clean water, sanitation facilities, and healthcare services to prevent the spread of diseases.\",\n      \"sources\":[\n          \"Public health reports and studies on large gatherings\",\n          \"Government initiatives related to sanitation and healthcare\"\n      ]\n    }\n  ]\n}\n```", "task_output": [{"name": "New task", "result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final \u2018snan\u2019; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Kumbh Mela 2025 concluded on February 26th with a Maha Shivratri rush.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip ('snan').\",\n    \"Police were on high alert in Prayagraj due to the expected large crowd.\",\n    \"The six-week-long Mela saw six special 'snans', including three 'Amrit Snans'.\",\n    \"Extensive security and management arrangements were made, including a 'no vehicle zone'.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th, Maha Shivratri, with a large number of devotees gathering at the Triveni Sangam for the final holy bath.  Authorities implemented extensive security measures due to the anticipated large crowd.  The Mela, held in Prayagraj, Uttar Pradesh, lasted six weeks and included six special bathing days.\",\n  \"dataPoints\": [\n    \"37,000 police personnel and 14,000 home guards deployed for security.\",\n    \"2,750 AI-based CCTV cameras installed.\",\n    \"Over 350 additional trains planned by Indian Railways to manage the departing crowds.\",\n    \"Over 1.33 crore devotees anticipated for Maha Shivratri.\",\n    \"50 fire stations and 20 fire posts on standby.\"\n  ],\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\"\n  ]\n}\n```"}, {"name": "New task", "result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final \u2018snan\u2019; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Kumbh Mela 2025 concluded on February 26th with a Maha Shivratri rush.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip ('snan').\",\n    \"Police were on high alert in Prayagraj due to the expected large crowd.\",\n    \"The six-week-long Mela saw six special 'snans', including three 'Amrit Snans'.\",\n    \"Extensive security and management arrangements were made, including a 'no vehicle zone'.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th, Maha Shivratri, with a large number of devotees gathering at the Triveni Sangam for the final holy bath.  Authorities implemented extensive security measures due to the anticipated large crowd.  The Mela, held in Prayagraj, Uttar Pradesh, lasted six weeks and included six special bathing days.\",\n  \"dataPoints\": [\n    \"37,000 police personnel and 14,000 home guards deployed for security.\",\n    \"2,750 AI-based CCTV cameras installed.\",\n    \"Over 350 additional trains planned by Indian Railways to manage the departing crowds.\",\n    \"Over 1.33 crore devotees anticipated for Maha Shivratri.\",\n    \"50 fire stations and 20 fire posts on standby.\"\n  ],\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\"\n  ],\n  \"additionalRelevantTopics\": [\n    {\n      \"topic\": \"Religious Significance of the Maha Kumbh Mela\",\n      \"description\": \"The Maha Kumbh Mela is deeply rooted in Hindu mythology and tradition, attracting millions of devotees seeking spiritual cleansing and blessings.  Its origins are linked to the churning of the ocean of milk and the acquisition of the nectar of immortality.\",\n      \"sources\": [\n        \"Various Hindu scriptures and mythological texts\",\n        \"Scholarly articles on Hindu religious practices\"\n      ]\n    },\n    {\n      \"topic\": \"Crowd Management in Large Religious Gatherings\",\n      \"description\": \"Managing the massive crowds at the Maha Kumbh Mela presents significant logistical and safety challenges.  Effective strategies include advanced crowd monitoring systems, improved infrastructure, clear communication channels, and coordinated efforts from various agencies.\",\n      \"sources\": [\n          \"Reports and studies on crowd management at large events\",\n          \"Government and NGO initiatives related to crowd safety\"\n      ]\n    },\n    {\n      \"topic\": \"Economic Impact of the Maha Kumbh Mela\",\n      \"description\": \"The Maha Kumbh Mela generates substantial economic activity in the region, impacting local businesses, tourism, and employment.  It's estimated to generate billions of rupees in revenue.\",\n      \"sources\": [\n        \"Economic impact assessments of past Kumbh Melas\",\n        \"Reports from chambers of commerce and industry bodies\"\n      ]\n    },\n    {\n      \"topic\": \"Public Health and Sanitation during the Maha Kumbh Mela\",\n      \"description\": \"Maintaining public health and sanitation amidst millions of pilgrims is crucial.  This involves providing access to clean water, sanitation facilities, and healthcare services to prevent the spread of diseases.\",\n      \"sources\":[\n          \"Public health reports and studies on large gatherings\",\n          \"Government initiatives related to sanitation and healthcare\"\n      ]\n    }\n  ]\n}\n```"}]}
         

        } catch (error) {
            console.error("❌ API Error:", error);
            setErrorMsg(error.response?.data || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue text-white p-6">
            <h2 className="text-xl font-bold">MultiAixBlock Prediction</h2>

            <button onClick={Predict} className="bg-green-500 text-white p-2 rounded mt-4">
                {loading ? "Processing..." : "Predict it"}
            </button>

            {errorMsg && (
                <p className="text-red-500 mt-4">
                    <strong>Error:</strong> {errorMsg}
                </p>
            )}

            {responseData && (
                <div className="bg-gray-800 p-4 rounded mt-4">
                    <h3 className="text-lg font-bold">Response Data:</h3>
                    <pre className="text-sm text-white">{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
