import { useState, createContext, useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
import './App.css';

import Home from './pages/Home';
import TextToRecipe from './pages/TextToRecipe';
import RecipeScan from './pages/RecipeScan';

// Create a context for user authentication
const AuthContext = createContext({
  user: null,
  signInWithGoogle: () => { },
  signOut: () => { }
});

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Implement error handling (show a user-friendly message)
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle sign-out errors
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Clean up the listener
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut: handleSignOut }}>


          <>


        {/* <Home handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle }/> */}
            <TextToRecipe />
            {/* <RecipeScan /> */}
          </>


    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };