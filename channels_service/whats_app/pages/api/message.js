import {
    Configuration,
    OpenAIApi
} from "openai";
import axios from "axios";
import fs from 'fs';
import path from 'path';
const docprocess = require('../frm');
var config = require('./config');

const configuration = new Configuration(
    {apiKey: process.env.OPENAI_API_KEY,});

const openAI = new OpenAIApi(configuration);
  
function post_process(msg,to){
    let pos= msg.toLowerCase().indexOf("gb");
    let subs = msg.substring(pos - 8, pos);
    let x = parseFloat(subs.match(/\d+(\.\d+)?/));

    let pos2 = msg.toLowerCase().indexOf("day");
    let subs2 = msg.substring(pos2 - 4, pos2);
    let y = parseFloat(subs2.match(/\d+(\.\d+)?/));


    if (msg.includes("buy") && msg.includes("GB")  && msg.includes("day")){
        // msg = msg.replace("buy",`buy (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
        msg = msg.replace("buy",`buy (http://localhost:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
    }
    else if (msg.includes("buy") && msg.includes("GB")){
        // msg = msg.replace("buy",`buy (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
        msg = msg.replace("buy",`buy (http://localhost:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
    }
    else if (msg.includes("purchase") && msg.includes("GB")  && msg.includes("day")){
        // msg = msg.replace("purchase",`purchase (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
        msg = msg.replace("purchase",`purchase (http://localhost:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
    }
    else if (msg.includes("purchase") && msg.includes("GB")){
        // msg = msg.replace("purchase",`purchase (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
        msg = msg.replace("purchase",`purchase (http://localhost:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
    }
    else {msg=msg;}

    return msg
}
export default async function handler(req, res) {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    var messageResponse = new MessagingResponse();
    const sentMessage = req.body.Body || '';
    
    var to = req.body.From;
    to = to.replace("whatsapp:+","")

    let replyToBeSent = "";
    if (req.body.MediaUrl0) {
        const filePath = req.body.MediaUrl0;
        console.log(filePath);
        const result = await docprocess(filePath);
        
        replyToBeSent=`Image received and saved successfully.
        ${result.customer['Field Name']}: ${result.customer['Field Value']}, 
        ${result.bill['Field Name']} : ${result.bill['Field Value']},
        ${result.month['Field Name']} : ${result.month['Field Value']}, 
        ${result.amount['Field Name']} : ${result.amount['Field Value']}`
      }
    else{
        if (sentMessage.trim().length === 0) {
            replyToBeSent = "We could not get your message. Please try again";
        } 
        else {
            console.log(req.body)
            const response = await axios.post(`${config.bot_api}`, {
                prompt: req.body.Body
            })
            replyToBeSent = response.data.generated_text.output

        }
    }
    
    replyToBeSent = post_process(replyToBeSent,to);

    messageResponse.message(replyToBeSent);
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(messageResponse.toString());
}