import ChatBubble from "../components/ChatBubble"
import Navbar from "../components/Navbar"
import { useState , useEffect , useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ChatBubbleSkeleton from "../components/ChatBubbleSkeleton";
const TextToRecipe = ({ handleSignOut, signInWithGoogle }) => {

  const [messages, setMessages] = useState(["How can i help you?"
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state on change
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  }

  const MODEL_NAME = "gemini-1.5-flash";
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function run(input) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      // { text: "Answer this question only if it is related to food or recipes." }, 
      { text: "Answer this question only if it is related to food or recipes. : "+input}
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    // console.log(response.text());
    return response.text();
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleButtonClick = () => {
    const newMessages = [...messages, inputValue];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true); // Set loading to true when request starts

    run(inputValue).then((response) => {
      setMessages([...newMessages, response]);
      setLoading(false); // Set loading to false when response is received
    });
  };

  return (
    <>
      <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />
      <div className="h-[100vh] p-8 flex justify-center items-center" data-theme="cyberpunk" >
        <div className="mockup-window border border-base-300 h-[90%] w-full" data-theme="aqua">
          <div className="border-t border-base-300 flex-grow overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <ChatBubble start={index % 2 !== 0} text={message} key={index} />
                ))}
                {loading && <ChatBubbleSkeleton />} {/* Conditionally render ChatBubbleSkeleton */}
                <div ref={messagesEndRef} />
              </div>
              <div className="relative h-[70px] flex-shrink-0">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full h-full px-6 border-t border-base-300 focus:outline-none"
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="btn absolute right-0 top-1/2 transform -translate-y-1/2"
                  onClick={handleButtonClick}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToRecipe;