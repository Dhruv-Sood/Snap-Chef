
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Footer from '../components/Footer'

const Home = ({ handleSignOut, signInWithGoogle }) => {
  return (
    <div data-theme="cyberpunk" >
      <Navbar handleSignOut={handleSignOut} signInWithGoogle={signInWithGoogle }/>
          <Hero />
          <Features />
          <Footer />
    </div>
  )
}
export default Home