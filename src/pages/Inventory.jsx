import { useEffect, useState,useContext } from "react";
import ModalCard from "../components/ModalCard"
import Navbar from "../components/Navbar"
import { db } from "../services/firebaseConfig"; // Import your Firestore instance
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { update } from "firebase/database";
import { AuthContext } from "../App";

const Inventory = ({ handleSignOut, signInWithGoogle }) => {

    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Check if user is available 
        if (user) {
            const notesCollection = collection(db, "notes");
            const userNotesQuery = query(notesCollection, where("userID", "==", user.uid));

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
          <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />
          {/* Open the modal using document.getElementById('ID').showModal() method */}
         <div className="h-[100vh] w-full flex justify-center items-center">
              <div className="h-[80%] w-full flex-col p-4">
                  <h1 className="font-bold text-3xl">
                    YOUR SAVED RECIPIES
                  </h1>
                  <div className="flex flex-wrap gap-4 justify-around">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                          <ModalCard key={index} title="Recipe" desc="This is a recipe" btn="View Recipe" />
                      ))}
                  </div>

              </div>
         </div>
    </>
  )
}
export default Inventory