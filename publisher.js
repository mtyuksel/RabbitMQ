const amqp = require("amqplib")

const message = {
    description: "It's a test message..."
}

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const asertion = await channel.assertQueue("testQueue");

        setInterval(() => {
            message.description = new Date().getTime();
            channel.sendToQueue("testQueue", Buffer.from(JSON.stringify(message)));
            console.log("Sended message", message);
        }, 10)
    }
    catch (ex) {
        console.log("Exception", ex);
    }
}