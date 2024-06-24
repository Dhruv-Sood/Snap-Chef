import { set } from "firebase/database";
import Navbar from "../components/Navbar";
import { useState, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub flavored markdown (tables, strikethrough, etc.)
import { AuthContext } from '../App';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const RecipeScan = ({ handleSignOut, signInWithGoogle }) => {
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [image, setImage] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleFileChange = (event) => {
        setIsFileSelected(event.target.files.length > 0);
        setImage(event.target.files[0]);
    };

    const handleReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            setIsFileSelected(false);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('https://snap-chef-backend.onrender.com/get_gemini_response', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setResponse(result.message);
            setIsSubmitted(true);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };


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
                        content: response,
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
        <>
            <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} fixed={false} />
            <div className={`h-[calc(90vh-66.5px)] w-full flex justify-center items-center p-4`} data-theme="cyberpunk">
            {isSubmitted ? (
                
                    <div className="mockup-window border border-base-300 h-[80%] w-full relative">
                        <i
                            className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark hover:cursor-pointer absolute top-[16px] right-[20px]`}
                            onClick={handleBookmark}
                        ></i>
                        <div className="flex-col justify-center px-4 py-16 border-t border-base-300 font-bold text-xl overflow-y-scroll" data-theme="cyberpunk" >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {response}
                            </ReactMarkdown>
                        </div>

                </div>
            ) : (
                <>
                            <div className={`${loading ? "hidden" : ""} w-full h-[calc(90vh-66.5px)] flex flex-col justify-center items-center gap-2 p-2`} data-theme="cyberpunk" >
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                onChange={handleFileChange}
                                accept=".jpg, .png"
                            />
                            <div>
                                <button className="btn btn-circle btn-outline" onClick={handleReset}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className={`btn btn-${isFileSelected ? 'primary' : 'secondary'} w-[100px] btn-active`} data-theme="cupcake" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                        <div className={` ${loading ? "" : "hidden"} w-full h-[100vh] flex flex-col justify-center items-center gap-2 p-2`} data-theme="cyberpunk" >
                            <div className={` loading loading-infinity loading-lg`}></div>
                            <div>(The backend is hosted on Render which might take 50 secs or more to cold start, if server is inactive)</div>
                        </div>
                    
                </>
            )}
            </div>
        </>
    );
};

export default RecipeScan;
