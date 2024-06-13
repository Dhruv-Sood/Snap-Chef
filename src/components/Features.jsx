import Card from "./Card"
const Features = () => {
    return (
        <div id="features" className="p-4">
            <div className="p-2 rounded-lg">
                <h1 className="text-3xl font-bold">Services</h1>
            </div>
            <div className="card-container flex gap-2">
                <Card btn={"Text-To-Recipe"} title={"Recipe Maker"} desc={"Just throw in the integriends you have and make a dish of your lifetime!"}></Card>
                <Card btn={"Image-To-Recipe"} title={"Recipe Scan"} desc={"Dont know what the dish is and want to make it? Just scan it and get it done"}></Card>
                <Card title={"Calories Calculator"} desc={"Calculate the Calories of the dish"} btn={"Calculate"}></Card>
                <Card title={"Your Saved Recipes"} desc={"Feeling like eating that awesome dish again?"} btn={"Inventory"}></Card>
            </div>
        </div>
    )
}
export default Features