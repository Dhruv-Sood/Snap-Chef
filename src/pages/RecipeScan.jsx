import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub flavored markdown (tables, strikethrough, etc.)

const RecipeScan = () => {
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [image, setImage] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef(null);

    const [response, setResponse] = useState("");


    const handleFileChange = (event) => {
        setIsFileSelected(event.target.files.length > 0);
        console.log(event.target.files[0]);
        console.log(fileInputRef.current.files[0]);
        setImage(event.target.files[0]);

    };

    const handleReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            setIsFileSelected(false);
        }
    };

// ---------------------------------------------------


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/get_gemini_response', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result.message); // Check if the message is received correctly
            setResponse(result.message);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };



// ---------------------------------------------------




    return (
        <>
            <Navbar />
            {isSubmitted ? (
                <div className=" h-[100vh] w-full flex justify-center items-center p-4">
                    <div className="mockup-window border border-base-300 h-[80%] w-full">
                        <div className="flex-col justify-center px-4 py-16 border-t border-base-300 font-bold text-xl overflow-y-scroll">

                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {response}
                            </ReactMarkdown>

                        </div>
                    </div>
                </div>
            ) : (
                <div className = "w-full h-[100vh] flex flex-col justify-center items-center gap-2 p-2">
                <div className = "flex gap-2">
                    <input
                        type = "file"
                        ref = { fileInputRef }
                        className = "file-input file-input-bordered file-input-primary w-full max-w-xs"
                        onChange = { handleFileChange }
                        accept = ".jpg, .png"
                    />
            <div>
                <button className="btn btn-circle btn-outline" onClick={handleReset}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div >
            <button className={`btn btn-${isFileSelected ? 'primary' : 'secondary'} w-[100px] btn-active`} data-theme="cupcake" onClick={handleSubmit}>
                Submit
            </button>
            </div >
            )}
            
        </>
    );
};

export default RecipeScan;
