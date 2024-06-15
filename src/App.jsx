import { useState, createContext, useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
import './App.css';

import Home from './pages/Home';
import TextToRecipe from './pages/TextToRecipe';
import RecipeScan from './pages/RecipeScan';
import Inventory from './pages/Inventory';


import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



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
    <BrowserRouter>
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut: handleSignOut }}>
          <>
          <Routes>
            <Route path="/" element={<Home handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />} />
            <Route path="/text-to-recipe" element={<TextToRecipe handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />} />
            <Route path="/image-to-recipe" element={<RecipeScan handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />} />
            <Route path="/inventory" element={<Inventory handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} />} />
            
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>

        {/* <Home handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle }/> */}
            {/* <TextToRecipe /> */}
            {/* <RecipeScan /> */}
        {/* <Inventory handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle} /> */}
          </>


    </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { AuthContext };