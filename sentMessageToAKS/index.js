module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const orders = (req.query.orders);
    const { ServiceBusClient } = require("@azure/service-bus");

    // connection string to your Service Bus namespace
    const connectionString = process.env["SERVICEBUS_CONNECTION_STRING"];
    
    // name of the queue
    const queueName = process.env["QUEUE_NAME"];

    const message = [
        { body: "e28ca557-e5a3-4896-81ab-362967b611a7" }
     ];
    

    if (orders) {

        const sbClient = new ServiceBusClient(connectionString);
        const sender = sbClient.createSender(queueName);

        try {

            // create a batch object
            let batch = await sender.createMessageBatch(); 
            for (let i = 0; i < orders; i++) {
                // for each message in the array			

                // try to add the message to the batch
                if (!batch.tryAddMessage(message[0])) {			
                    // if it fails to add the message to the current batch
                    // send the current batch as it is full
                    await sender.sendMessages(batch);

                    // then, create a new batch 
                    batch = await sender.createMessageBatch();

                    // now, add the message failed to be added to the previous batch to this batch
                    if (!batch.tryAddMessage(message[0])) {
                        // if it still can't be added to the batch, the message is probably too big to fit in a batch
                        throw new Error("Message too big to fit in a batch");
                    }
                }
            }

            // Send the last created batch of messages to the queue
            await sender.sendMessages(batch);

		    context.log(`Sent a batch of orders to the queue: ${queueName}`);

            // Close the sender
            await sender.close();
	    } finally {
		    await sbClient.close();
	    }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "We have sent " + orders + " orders(s) to the AKS cluster"
        };
    } else {     
        context.res = {
            status: 400,
            body: "Please pass a orders value on the query string"
        };
    }
    
}