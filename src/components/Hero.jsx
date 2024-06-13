/*
import Card from './Card';

const Hero = () => {
    return (
        <div className="w-full p-5 flex items-center justify-center bg-gray-100 flex-col gap-10">
            <div className="p-8 bg-white shadow-lg h-auto rounded-2xl flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
                <div className="md:w-[50%] w-full mb-6 md:mb-0 text-center md:text-left">
                    <h1 className="font-bold text-4xl text-blue-600 mb-4">WELCOME TO KITCHEN UTILITY!!</h1>
                    <p className="text-2xl text-gray-700 mb-2">You don't have to cook fancy or complicated masterpieces – just good food from fresh ingredients.</p>
                    <p className="text-xl text-gray-500">- Julia Child</p>
                </div>
                <div className="md:w-[50%] w-full flex justify-center md:justify-end">
                    <img
                        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmFpNjg1NnFhbWcyYjM5OXU5OGNtZno3cWk1NTRmMXNweHJtaHhycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhPxS1j2VGxYMccZaX/giphy.gif"
                        className="h-[300px] md:h-[400px] object-contain rounded-lg shadow-lg"
                        alt="Cooking GIF"
                    />
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-4 max-w-5xl mx-auto">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Hero;
*/

const Hero = () => {
  return (
    <div>
          <div className="hero min-h-screen bg-base-200">
              <div className="hero-content flex-col lg:flex-row-reverse">
                  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmFpNjg1NnFhbWcyYjM5OXU5OGNtZno3cWk1NTRmMXNweHJtaHhycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhPxS1j2VGxYMccZaX/giphy.gif" className="max-w-lg rounded-lg shadow-2xl" />
                  <div>
                      <h1 className="text-5xl font-bold">Box Office News!</h1>
                      <p className="py-6 pr-20 text-xl">You don't have to cook fancy or complicated masterpieces – just good food from fresh ingredients</p>
                        <p className="text-lg font-semibold mb-10">- Julia Child</p>
                      <a href="#features"><button className="btn btn-primary">Get Started</button></a>
                  </div>
              </div>
          </div>
    </div>
  )
}
export default Hero