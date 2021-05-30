const amqp = require("amqplib")

const message = {
    description: "It's a test message..."
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const asertion = await channel.assertQueue("testQueue");
    
        console.log("Waiting for message...")
        channel.consume("testQueue", (message) => {
            console.log("Message ", message.content.toString());
            channel.ack(message);
        })
    }
    catch(ex){
        console.log("Exception", ex);
    }
}