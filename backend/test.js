const ngrok = require('ngrok');

(async function() {
    try {
        const url = await ngrok.connect({ addr: 5000 }); // Connect to localhost:5000
        console.log("Ngrok Tunnel URL:", url);
    } catch (error) {
        console.error("Ngrok Error:", error);
    }
})();
