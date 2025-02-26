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
            const convertedData=await axios.post("https://aixblock-1.onrender.com/convert",{data:data});
            console.log("converted");
            
            console.log(convertedData.data.result);
            
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



        //    const rdata={
        //     "data": {
        //         "result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final ‘snan’; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Shivratri marked the conclusion of the Maha Kumbh Mela 2025.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip.\",\n    \"Heavy security and management arrangements were in place.\",\n    \"The Uttar Pradesh government issued an advisory for devotees.\",\n    \"Indian Railways made special arrangements for transport.\",\n    \"Authorities were on high alert due to past stampede incidents.\",\n    \"Adequate fire-fighting arrangements were made.\",\n    \"Chief Minister Yogi Adityanath extended greetings.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th with a large gathering of devotees at the Triveni Sangam for the final holy dip on Maha Shivratri.  Extensive security measures were implemented, including a large police presence and transport arrangements by Indian Railways.  The Uttar Pradesh government provided guidance to help manage the crowds.  The event showcased the use of AI for crowd management and drew an unprecedented number of attendees.\",\n  \"importantDataPoints\": {\n    \"policePersonnel\": 37000,\n    \"homeGuards\": 14000,\n    \"CCTVCameras\": 2750,\n    \"specialTrains\": 350,\n    \"passengersTransportedMauniAmavasya\": 2000000,\n    \"fireStationsOnStandby\": 50,\n    \"firePostsOnStandby\": 20,\n    \"totalAttendees\": 633600000\n  },\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\",\n    \"https://m.economictimes.com/tech/artificial-intelligence/maha-kumbh-2025-india-uses-ai-to-stop-stampedes-at-worlds-biggest-gathering/articleshow/117345693.cms\",\n    \"https://www.researchgate.net/publication/361767338_Technology_and_crowd_management_A_case_study_of_Kumbh_festival_in_India\",\n    \"https://timesofindia.indiatimes.com/city/allahabad/prayagraj-mahakumbh-2025-implementing-advanced-ai-driven-data-analytics-for-enhanced-security-and-crowd-management-/articleshow/116560744.cms\"\n  ],\n  \"additionalRelevantTopics\": [\n    \"History of Maha Kumbh Mela\",\n    \"Religious Significance of Maha Kumbh Mela\",\n    \"Crowd Management Strategies at Mass Gatherings\",\n    \"Technological Advancements in Crowd Management (AI, IoT)\",\n    \"Safety and Security Measures at Large-Scale Events\",\n    \"Case Studies of Crowd Management at Religious Gatherings\",\n    \"Future Trends in Crowd Management for Religious Festivals\",\n    \"Environmental Impact of the Maha Kumbh Mela\",\n    \"Socioeconomic Impact of the Maha Kumbh Mela\"\n  ]\n}\n```",
        //         "task_output": [
        //             {
        //                 "name": "New task",
        //                 "result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final ‘snan’; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Shivratri marked the conclusion of the Maha Kumbh Mela 2025.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip.\",\n    \"Heavy security and management arrangements were in place.\",\n    \"The Uttar Pradesh government issued an advisory for devotees.\",\n    \"Indian Railways made special arrangements for transport.\",\n    \"Authorities were on high alert due to past stampede incidents.\",\n    \"Adequate fire-fighting arrangements were made.\",\n    \"Chief Minister Yogi Adityanath extended greetings.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th with a large gathering of devotees at the Triveni Sangam for the final holy dip on Maha Shivratri.  Extensive security measures were implemented, including a large police presence and transport arrangements by Indian Railways.  The Uttar Pradesh government provided guidance to help manage the crowds.\",\n  \"importantDataPoints\": {\n    \"policePersonnel\": 37000,\n    \"homeGuards\": 14000,\n    \"CCTVCameras\": 2750,\n    \"specialTrains\": 350,\n    \"passengersTransportedMauniAmavasya\": 2000000,\n    \"fireStationsOnStandby\": 50,\n    \"firePostsOnStandby\": 20\n  },\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\"\n  ]\n}\n```"
        //             },
        //             {
        //                 "name": "New task",
        //                 "result": "```json\n{\n  \"title\": \"Maha Kumbh 2025 ends today: Maha Shivratri rush at Sangam for final ‘snan’; police on alert in Prayagraj | 10 points\",\n  \"keyHighlights\": [\n    \"Maha Shivratri marked the conclusion of the Maha Kumbh Mela 2025.\",\n    \"Devotees flocked to Triveni Sangam for the final holy dip.\",\n    \"Heavy security and management arrangements were in place.\",\n    \"The Uttar Pradesh government issued an advisory for devotees.\",\n    \"Indian Railways made special arrangements for transport.\",\n    \"Authorities were on high alert due to past stampede incidents.\",\n    \"Adequate fire-fighting arrangements were made.\",\n    \"Chief Minister Yogi Adityanath extended greetings.\"\n  ],\n  \"summary\": \"The Maha Kumbh Mela 2025 concluded on February 26th with a large gathering of devotees at the Triveni Sangam for the final holy dip on Maha Shivratri.  Extensive security measures were implemented, including a large police presence and transport arrangements by Indian Railways.  The Uttar Pradesh government provided guidance to help manage the crowds.  The event showcased the use of AI for crowd management and drew an unprecedented number of attendees.\",\n  \"importantDataPoints\": {\n    \"policePersonnel\": 37000,\n    \"homeGuards\": 14000,\n    \"CCTVCameras\": 2750,\n    \"specialTrains\": 350,\n    \"passengersTransportedMauniAmavasya\": 2000000,\n    \"fireStationsOnStandby\": 50,\n    \"firePostsOnStandby\": 20,\n    \"totalAttendees\": 633600000\n  },\n  \"relevantLinks\": [\n    \"https://www.hindustantimes.com/india-news/maha-kumbh-2025-last-day-live-updates-maha-shivratri-maha-kumbh-last-snan-prayagraj-triveni-sangam-101740528603244.html\",\n    \"https://www.hindustantimes.com/author/ht-news-desk-101650005059496\",\n    \"https://www.hindustantimes.com/author/asmita-ravi-shankar-101730717399273\",\n    \"https://m.economictimes.com/tech/artificial-intelligence/maha-kumbh-2025-india-uses-ai-to-stop-stampedes-at-worlds-biggest-gathering/articleshow/117345693.cms\",\n    \"https://www.researchgate.net/publication/361767338_Technology_and_crowd_management_A_case_study_of_Kumbh_festival_in_India\",\n    \"https://timesofindia.indiatimes.com/city/allahabad/prayagraj-mahakumbh-2025-implementing-advanced-ai-driven-data-analytics-for-enhanced-security-and-crowd-management-/articleshow/116560744.cms\"\n  ],\n  \"additionalRelevantTopics\": [\n    \"History of Maha Kumbh Mela\",\n    \"Religious Significance of Maha Kumbh Mela\",\n    \"Crowd Management Strategies at Mass Gatherings\",\n    \"Technological Advancements in Crowd Management (AI, IoT)\",\n    \"Safety and Security Measures at Large-Scale Events\",\n    \"Case Studies of Crowd Management at Religious Gatherings\",\n    \"Future Trends in Crowd Management for Religious Festivals\",\n    \"Environmental Impact of the Maha Kumbh Mela\",\n    \"Socioeconomic Impact of the Maha Kumbh Mela\"\n  ]\n}\n```"
        //             }
        //         ]
        //     }
        // }
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
