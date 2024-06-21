import { useEffect, useState,useContext } from "react";
import ModalCard from "../components/ModalCard"
import Navbar from "../components/Navbar"
import { db } from "../services/firebaseConfig"; // Import your Firestore instance
import { collection, getDocs, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { update } from "firebase/database";
import { AuthContext } from "../App";

const Inventory = ({ handleSignOut, signInWithGoogle }) => {

    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Check if user is available 
        if (user) {
            const notesCollection = collection(db, "notes");
            const userNotesQuery = query(
                notesCollection,
                where("userID", "==", user.uid),
                orderBy("timestamp", "desc")  // Sort by timestamp descending (newest first)
            );

            // Initial fetch 
            getDocs(userNotesQuery)
                .then((snapshot) => {
                    const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setNotes(notesData);
                    setIsLoading(false);
                })
                .catch(error => console.error("Error fetching initial data: ", error));

            // Real-time updates 
            const unsubscribe = onSnapshot(userNotesQuery, (snapshot) => {
                const updatedNotes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setNotes(updatedNotes);
            });
            return () => unsubscribe();
        }
    }, [user?.uid]); 

    useEffect(() => {
        console.log("Updated notes:", notes);
    }, [notes]); 

    
  return (
    <>
          <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} fixed={false}/>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className="w-full flex justify-center items-center" data-theme="cyberpunk" >
              <div className="h-[80%] w-full flex-col p-4">
                  <h1 className="font-bold text-3xl mb-8">
                    YOUR SAVED RECIPIES
                  </h1>
                  <div className="flex flex-wrap gap-4 justify-around mb-4">
                        {notes.map((note,index) => (
                            <ModalCard key={index} id={index} note={note} />
                        ))}
                  </div>

              </div>
         </div>
    </>
  )
}
export default Inventory