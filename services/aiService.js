// AI text and image generation service

export const generateBookContent = async (prompt) => {
  try {
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert book creator. Generate detailed information for a fictional book based on the user's prompt.
          Respond directly with JSON, following this JSON schema, and no other text:
          {
            "description": "A detailed book description (200-300 words)",
            "summary": "A summary of the book's plot (200-400 words)",
            "publishYear": "A plausible publication year",
            "pages": "A realistic page count (number only)",
            "coverDescription": "A detailed description for creating a book cover image (50-100 words)"
          }`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      json: true
    });
    
    return JSON.parse(completion.content);
  } catch (error) {
    console.error("Error generating book content:", error);
    throw error;
  }
};

export const generateBookCover = async (prompt) => {
  try {
    const result = await websim.imageGen({
      prompt: prompt,
      aspect_ratio: "3:4",  // Book cover proportions
    });
    
    return result.url;
  } catch (error) {
    console.error("Error generating book cover:", error);
    throw error;
  }
};

