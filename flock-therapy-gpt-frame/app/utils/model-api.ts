import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

async function chatWithModel(prompt: string, modelName: string) {
  console.log("Prompt:", prompt);

  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: [],
      knowledge_source_id: modelName,
    };

    // Set the headers
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT; 
    if (!endpoint) {
      throw new Error("Endpoint is not defined in the environment variables.");
    }

    const headers = {
      "x-api-key": process.env.NEXT_PUBLIC_FLOCK_API_KEY,
    };

    // Send POST request using axios
    const response = await axios.post(
      `${endpoint}/chat/conversational_rag_chat`,
      payload,
      {
        headers,
      }
    );

    // Output the response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default chatWithModel;