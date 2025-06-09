import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

function RecipeForm({ onSave, onCancel, initialRecipe }) {
  const [recipe, setRecipe] = useState(initialRecipe || {
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '', unit: 'g' }],
    steps: [''],
    cookingTime: '',
    servings: 2,
    tags: [],
    image: null
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setRecipe({...recipe, image: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: '', unit: 'g' }]
    })
  }

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...recipe.ingredients]
    newIngredients[index][field] = value
    setRecipe({...recipe, ingredients: newIngredients})
  }

  const removeIngredient = (index) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index)
    })
  }

  const addStep = () => {
    setRecipe({...recipe, steps: [...recipe.steps, '']})
  }

  const updateStep = (index, value) => {
    const newSteps = [...recipe.steps]
    newSteps[index] = value
    setRecipe({...recipe, steps: newSteps})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...recipe,
      tags: recipe.tags.length ? recipe.tags.split(',').map(t => t.trim()) : [],
      id: initialRecipe?.id || Date.now().toString()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({...recipe, title: e.target.value})}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={recipe.description}
          onChange={(e) => setRecipe({...recipe, description: e.target.value})}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        {recipe.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
              className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <select
              value={ing.unit}
              onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
              className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
            </select>
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="p-2 text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-500"
        >
          + Add Ingredient
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Steps</label>
        {recipe.steps.map((step, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <textarea
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="text-blue-500"
        >
          + Add Step
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cooking Time (min)</label>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setRecipe({...recipe, cookingTime: e.target.value})}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Servings</label>
        <input
          type="number"
          value={recipe.servings}
          onChange={(e) => setRecipe({...recipe, servings: parseInt(e.target.value)})}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={recipe.tags}
          onChange={(e) => setRecipe({...recipe, tags: e.target.value})}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default RecipeForm