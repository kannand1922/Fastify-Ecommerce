// Load Twilio library
const twilio = require("twilio");
const fastify = require("fastify")({ logger: true });

// Twilio credentials from the Twilio Console
const accountSid = "ACf75402f6d6ca82d7a86325031ce0b154"; // Replace with your Twilio Account SID
const authToken = "85dc125f9b21aaecff2ae7fab463748e"; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Recipient number in the format whatsapp:+<CountryCode><PhoneNumber>
const recipientNumber = "whatsapp:+917339255864"; // Replace with the actual recipient numb
// Function to send a simple WhatsApp message
function sendSimpleMessage() {
  client.messages
    .create({
      from: "whatsapp:+14155238886", // Twilio Sandbox WhatsApp number
      to: recipientNumber,
      body: "Hello! This is a test message from Twilio WhatsApp API.", // Message content
    })
    .then((message) => console.log(`Message sent with SID: ${message.sid}`))
    .catch((error) => console.error("Error sending message:", error));
}

fastify.get("/user", async (request, reply) => {
  sendSimpleMessage();
  reply.send("hwllo");
});

// Function to send a templated WhatsApp message (approved template required)
// function sendTemplateMessage() {
//     client.messages
//         .create({
//             from: 'whatsapp:+14155238886',  // Twilio Sandbox WhatsApp number
//             to: recipientNumber,
//             contentSid: 'your_content_sid', // Replace with your template's Content SID
//             contentVariables: JSON.stringify({ "1": "12/1", "2": "3pm" }) // Replace placeholders with actual values
//         })
//         .then(message => console.log(`Template message sent with SID: ${message.sid}`))
//         .catch(error => console.error('Error sending template message:', error));
// }

// Uncomment one of the functions below to test simple or template message sending

// sendSimpleMessage();       // Sends a plain text message
// sendTemplateMessage();     // Sends a message using a template (requires template setup)

fastify.listen({ port: 3004 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info("User Service is running on http://localhost:3001");
});
