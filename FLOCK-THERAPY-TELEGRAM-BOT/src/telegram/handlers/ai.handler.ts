/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenAIApi from 'openai';
import { Message } from '../types';
import axios from 'axios';

const apiKey = process.env.OPENAI_KEY;

const openAi = new OpenAIApi({ apiKey });
const flockAPI = process.env.FLOCK_BOT_API_KEY;
const endpoint = process.env.FLOCK_BOT_ENDPOINT;
export default class AIHandler {
  chatWithAI = async (
    msg: Message,
    userId: string,
    text: string,
    messageHistory: any,
  ) => {
    // const completion = await openAi.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: text }],
    //   temperature: 0.6,
    // });
    // const reply = completion.choices[0].message.content;
    // console.log('Reply:', reply);
    // return reply;
    // // this.sendMessage(msg, userId, reply);
    try {
      const payload = {
        question: msg.text,
        chat_history: messageHistory,
        knowledge_source_id: 'cluhggay2000zvkb4lycsiowo',
      };
      console.log(payload);

      const headers = {
        'x-api-key': flockAPI, // Ensure API key is set in .env
      };
      // Send POST request using axios
      const response = await axios.post(
        `${'https://rag-chat-ml-backend-prod.flock.io'}/chat/conversational_rag_chat`,
        payload,
        {
          headers,
        },
      );
      console.log('Response:', response);
      const history = [];
      const message = {
        user: response.data.generated_question,
        bot: response.data.answer,
      };
      history.push(message);
      const replyUser = response.data.answer;

      return { replyUser, message, response };
    } catch (error) {
      //   console.log('Error:', error);
    }
  };
}
