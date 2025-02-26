const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

app.use(bodyParser.json());
app.use(cors());


app.get("/webhook", (req, res) => {
    const data=req.body;
    console.log("Webhook Data Received:",data);

    // 🔴 Emit received data to all connected frontend clients
    io.emit("dataReceive", {data:data,reqb:req.body});

    // Save the latest webhook data
    // latestWebhookData = req.body;

    res.status(200).json({ message: "Webhook received successfully!" });
});

// ✅ API to fetch the latest webhook data (for frontend polling)


io.on("connection", (socket) => {
    console.log("🔗 Connected to socket:", socket.id);


    socket.on("disconnect", () => {
        console.log("❌ Disconnected from socket:", socket.id);
    });
});

// ✅ Start the Express & WebSocket Server Together
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
