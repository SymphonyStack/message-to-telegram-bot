import fetch from 'node-fetch';

// Function to send a message
const sendMessage = async(token, recipientId, message) => {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: recipientId,
            text: message
        })
    });

    const data = await response.json();
    if (data.ok) {
        console.log("##" + JSON.stringify({ status: 200, message: `Message sent to ${recipientId}` }) + "##");
    } else {
        console.error("##" + JSON.stringify({ status: 500, message: `Failed to send message: ${data.description}` }) + "##");
    }
};

// Get command line arguments
const args = process.argv.slice(2);
const token = args[0];
const recipientId = args[1];
const message = process.argv.slice(4).join(' ');

if (!token || !recipientId || !message) {
    console.error("##" + JSON.stringify({ status: 500, message: 'Usage: node main.js <token> <recipientId> <message>' }) + "##");
    process.exit(1);
}

// Send the message
sendMessage(token, recipientId, message);