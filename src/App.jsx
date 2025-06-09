import React, { useState, useEffect } from 'react'
import { loadRecipes, saveRecipes } from './utils/storage'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './components/RecipeForm'
import RecipeDetail from './components/RecipeDetail'
import SearchFilter from './components/SearchFilter'
import ThemeToggle from './components/ThemeToggle'
import { FiPlus } from 'react-icons/fi'

function App() {
  const [recipes, setRecipes] = useState(loadRecipes())
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [showForm, setShowForm] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    saveRecipes(recipes)
    setFilteredRecipes(recipes)
  }, [recipes])

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now().toString() }])
    setShowForm(false)
  }

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r))
    setShowForm(false)
    setSelectedRecipe(null)
  }

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id))
    setSelectedRecipe(null)
  }

  const handleFilter = (search, tag) => {
    let filtered = recipes
    if (search) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (tag) {
      filtered = filtered.filter(r => r.tags.includes(tag))
    }
    setFilteredRecipes(filtered)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipe Manager</h1>
        <ThemeToggle />
      </div>
      
      {showForm ? (
        <RecipeForm 
          onSave={isEditing ? updateRecipe : addRecipe}
          onCancel={() => {setShowForm(false); setIsEditing(false);}}
          initialRecipe={isEditing ? selectedRecipe : null}
        />
      ) : selectedRecipe ? (
        <RecipeDetail 
          recipe={selectedRecipe}
          onEdit={() => {setShowForm(true); setIsEditing(true);}}
          onDelete={deleteRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      ) : (
        <>
          <SearchFilter onFilter={handleFilter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          >
            <FiPlus size={24} />
          </button>
        </>
      )}
    </div>
  )
}

export default App