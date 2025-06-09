import React, { useState } from 'react'
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa'
import Fraction from 'fraction.js'
import { exportToPDF } from '../utils/pdfExport'

function RecipeDetail({ recipe, onEdit, onDelete, onBack }) {
  const [servings, setServings] = useState(recipe.servings)

  const adjustQuantity = (quantity, originalServings) => {
    const fraction = new Fraction(quantity).mul(servings).div(originalServings)
    return fraction.toFraction(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:underline"
      >
        Back to Recipes
      </button>
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full max-w-md h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Servings: {servings}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>
            {adjustQuantity(ing.quantity, recipe.servings)} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Steps</h3>
      <ol className="list-decimal pl-5 mb-4">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="mb-4">Cooking Time: {recipe.cookingTime} min</p>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
        <button
          onClick={() => exportToPDF(recipe, servings)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaDownload className="mr-2" /> Export PDF
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail