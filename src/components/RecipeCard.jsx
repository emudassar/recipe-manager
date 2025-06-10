import React from 'react'
import { FaClock } from 'react-icons/fa'

function RecipeCard({ recipe, onClick }) {
  return (
    <div 
      className="card overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
      onClick={onClick}
    >
      {recipe.image ? (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-xl">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">{recipe.title}</h2>
        <div className="flex items-center text-gray-600 mb-3">
          <FaClock className="mr-2" />
          <span>{recipe.cookingTime} min</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard