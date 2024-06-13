
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Footer from '../components/Footer'

const Home = ({ handleSignOut, signInWithGoogle }) => {
  return (
    <>
      <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle }/>
          <Hero />
          <Features />
          <Footer />
    </>
  )
}
export default Home