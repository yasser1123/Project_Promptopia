import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Fetch all prompts and populate the creator field
    const prompts = await Prompt.find({}).populate("creator");
    
    // Log fetched data to ensure it's correct
    console.log("Fetched Prompts:", prompts);

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store' // Ensure no caching on server-side
      }
    });
  } catch (error) {
    console.error("Failed to fetch all prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
