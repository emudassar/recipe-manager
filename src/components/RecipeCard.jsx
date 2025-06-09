import React from 'react'
import { FaClock } from 'react-icons/fa'

function RecipeCard({ recipe, onClick }) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
        <FaClock className="mr-2" />
        <span>{recipe.cookingTime} min</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map(tag => (
          <span 
            key={tag} 
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default RecipeCard