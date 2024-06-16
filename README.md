
# Snap Chef

Snap-Chef is a React-based application designed to help those who can't cook by providing them with recipes based on text and images. Additionally, it includes a calorie calculator (currently in development) and an inventory for bookmarked recipes. Built with Vite, Snap-Chef offers a fast and smooth development experience.

## Features

1. **Text to Recipe**: Enter ingredients or dish names, and Snap-Chef will generate a list of recipes for you.
2. **Image to Recipe**: Upload an image of ingredients or a dish, and Snap-Chef will suggest recipes based on the image.
3. **Calories Calculator (In Development)**: Calculate the calories of your meals using the ingredients or recipes provided.
4. **Inventory for Bookmarked Recipes**: Save and manage your favorite recipes in an easy-to-access inventory.
## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**
- **npm (Node Package Manager)**
- **Vite**

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/Snap-Chef.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd Snap-Chef
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```
### Setting Up Your Environment (.env)

This project uses environment variables to securely store configuration details.

To get started, create a `.env` file in your project's root directory and populate it with the following values (replace the placeholders with your actual credentials):
```
VITE_FIREBASE_API_KEY=REPLACE_WITH_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=REPLACE_WITH_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=REPLACE_WITH_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=REPLACE_WITH_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=REPLACE_WITH_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=REPLACE_WITH_FIREBASE_APP_ID
VITE_GEMINI_API_KEY=REPLACE_WITH_GEMINI_API_KEY
VITE_FIREBASE_DATABASE_URL=REPLACE_WITH_FIREBASE_DATABASE_URL
```

### Important Security Notes

* **Never commit your `.env` file to version control (e.g., Git).** It contains sensitive API keys. Make sure it's in your `.gitignore` file.
* **Consider using environment variable management tools.** For larger projects or team environments, tools like [dotenv](https://www.npmjs.com/package/dotenv) can help manage your environment variables more effectively.

### Obtaining Your API Keys

* **Firebase:**
    * Create a project in the Firebase console.
    * Go to "Project Settings" and find your API keys under the "General" tab.
* **Gemini:** 
    * Sign up/Login to Gemini.
    * Navigate to your user settings and generate a new API key.


Let me know if you'd like any adjustments or further customization to this README section!


### Running the Application

To start the development server, run:

    npm run dev

## Usage

### Text to Recipe
Go to the Text to Recipe section.

Enter the ingredients or dish name.

Click the "Send" button to get recipes.

### Image to Recipe

Go to the Image to Recipe section.

Upload an image of ingredients or a dish.

The app will process the image and provide recipe suggestions.

### Calories Calculator (In Development)
Go to the Calories Calculator section (under development).

Enter the ingredients to calculate the estimated calories of the meal.

### Bookmarking Recipes

When viewing a recipe, click the "Bookmark" button to save it.
Access your bookmarked recipes in the Inventory section.


## Contributing

We welcome contributions to Snap-Chef! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.