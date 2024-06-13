// To use the File API, use this import path for GoogleAIFileManager.
// Note that this is a different import path than what you use for generating content.
import { GoogleAIFileManager } from "@google/generative-ai/files";

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(
  "AIzaSyAtuWn7oXLZcag0EQ-tXmvknI9NcdvDWWg"
);

// Upload the file and specify a display name.
const uploadResult = await fileManager.uploadFile("image.jpg", {
  mimeType: "image/jpeg",
  displayName: "Sample drawing",
});

// View the response.
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
);
// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // The Gemini 1.5 models are versatile and work with multimodal prompts
  model: "gemini-1.5-flash",
});

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadFile.file.mimeType,
        fileUri: uploadFile.file.uri
      }
    },
    { text: "Describe the image with a creative description." },
  ]);

// Handle the response of generated text