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
    <div className="card p-6 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:underline font-medium"
      >
        Back to Recipes
      </button>
      {recipe.image ? (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full max-w-md h-64 object-cover rounded-xl mb-6 mx-auto"
        />
      ) : (
        <div className="w-full max-w-md h-64 bg-gray-200 flex items-center justify-center rounded-xl mb-6 mx-auto">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{recipe.title}</h2>
      <p className="text-gray-600 mb-6">{recipe.description}</p>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Servings: {servings}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">Ingredients</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        {recipe.ingredients.map((ing, index) => (
          <li key={index} className="mb-2">
            {adjustQuantity(ing.quantity, recipe.servings)} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">Steps</h3>
      <ol className="list-decimal pl-6 mb-6 text-gray-700">
        {recipe.steps.map((step, index) => (
          <li key={index} className="mb-2">{step}</li>
        ))}
      </ol>
      <p className="mb-6 text-gray-700">Cooking Time: {recipe.cookingTime} min</p>
      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="btn-primary flex items-center"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="btn-primary bg-red-600 hover:bg-red-700 flex items-center"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
        <button
          onClick={() => exportToPDF(recipe, servings)}
          className="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
        >
          <FaDownload className="mr-2" /> Export PDF
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail