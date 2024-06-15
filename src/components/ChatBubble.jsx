import React, { useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub flavored markdown (tables, strikethrough, etc.)
import { AuthContext } from '../App';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const ChatBubble = ({ start, text }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useContext(AuthContext);

  

  const handleBookmark = () => {
    if (!isBookmarked) {
      
      const saveChat = async () => {
        if (!user) {
          alert("You need to be logged in to bookmark a chat.");
          return;
        }

        try {
          const chatRef = collection(db, "notes"); // Reference to your Firestore collection
          const chatData = {
            content: text,
            timestamp: serverTimestamp(),
            userID: user.uid // Assuming your currentUser has a UID property
          };
          await addDoc(chatRef, chatData);
          console.log("Chat saved successfully");
          setIsBookmarked(true);
        } catch (error) {
          console.error("Error saving chat:", error);
          // Consider showing an error message to the user
        }
      };
      saveChat();
      
    }
  }

  return (
    <div>
      {start ? (
        <div className="chat chat-end">
          <div className="chat-bubble">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="chat chat-start flex start justify-start items-center">
          <div className="chat-bubble">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
          <div className="">
            <i
              className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark hover:cursor-pointer`}
              onClick={handleBookmark}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
