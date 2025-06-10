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
    <form onSubmit={handleSubmit} className="card p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({...recipe, title: e.target.value})}
          className="input"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
        <textarea
          value={recipe.description}
          onChange={(e) => setRecipe({...recipe, description: e.target.value})}
          className="input min-h-[100px]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Ingredients</label>
        {recipe.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
              className="input flex-1"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
              className="input w-24"
              required
            />
            <select
              value={ing.unit}
              onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
              className="input w-24"
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
              className="p-3 text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-indigo-600 hover:underline mt-2"
        >
          + Add Ingredient
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Steps</label>
        {recipe.steps.map((step, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <textarea
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              className="input min-h-[80px]"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="text-indigo-600 hover:underline mt-2"
        >
          + Add Step
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Cooking Time (min)</label>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setRecipe({...recipe, cookingTime: e.target.value})}
          className="input"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Servings</label>
        <input
          type="number"
          value={recipe.servings}
          onChange={(e) => setRecipe({...recipe, servings: parseInt(e.target.value)})}
          className="input"
          min="1"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={recipe.tags}
          onChange={(e) => setRecipe({...recipe, tags: e.target.value})}
          className="input"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="btn-primary"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default RecipeForm