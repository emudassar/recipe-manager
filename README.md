Recipe Manager

A modern, user-friendly web application for managing and organizing your favorite recipes. Built with React, Vite, and Tailwind CSS, Recipe Manager offers a seamless experience for creating, editing, and sharing recipes with a clean and responsive interface.

Features:

Add and Edit Recipes: Easily create or modify recipes with fields for title, description, ingredients, steps, cooking time, servings, tags, and an optional image.
Search and Filter: Quickly find recipes by title, ingredients, or tags (e.g., vegetarian, gluten-free, vegan, quick).
Responsive Design: Optimized for both desktop and mobile devices with a dynamic grid layout.
Local Storage: Recipes are persisted in the browser’s localStorage, ensuring data remains available across sessions.
PDF Export: Download recipes as beautifully formatted PDF files with adjusted ingredient quantities based on servings.
Modern UI: Sleek, light-themed interface with Inter font, smooth animations, and intuitive controls.
Fractional Quantities: Automatically adjusts ingredient quantities to fractional values when modifying servings.

Tech Stack:

Frontend: React, Vite 
Styling: Tailwind CSS with custom styles and Inter font
Libraries:
fraction.js for precise ingredient quantity calculations
jspdf for PDF export functionality
react-icons for scalable icons

Persistence: Browser localStorage

Getting Started

Prerequisites:

Node.js: Version 18 or higher (node -v to check)
npm: Included with Node.js (npm -v to check)

Installation

Clone the Repository:
git clone https://github.com/your-username/recipe-manager.git
cd recipe-manager


Install Dependencies:
npm install


Run the Development Server:
npm run dev

Usage

View Recipes:

Browse recipes in a responsive grid of cards, showing title, cooking time, tags, and an optional image.

Click a card to view detailed recipe information.

Add a Recipe:

Click the floating + button (bottom-right) to open the recipe form.
Fill in details (title, ingredients, steps, etc.) and upload an optional image.
Save to add the recipe to your collection.


Edit or Delete:

From the recipe detail view, click "Edit" to modify or "Delete" to remove a recipe.


Search and Filter:

Use the search bar to find recipes by title or ingredient.
Select a tag (e.g., vegetarian) from the dropdown to filter recipes.


Export to PDF:

In the recipe detail view, adjust servings using the slider and click "Export PDF" to download a formatted recipe.