import React, { useState, useEffect } from 'react'
import { loadRecipes, saveRecipes } from './utils/storage'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './components/RecipeForm'
import RecipeDetail from './components/RecipeDetail'
import SearchFilter from './components/SearchFilter'
import { FiPlus } from 'react-icons/fi'

// Parse URL search parameters
function useQuery() {
  return new URLSearchParams(window.location.search);
}

function App() {
  const [recipes, setRecipes] = useState(loadRecipes())
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [showForm, setShowForm] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const query = useQuery()

  // Restore selected recipe from URL or localStorage on initial load
  useEffect(() => {
    const savedRecipeId = localStorage.getItem('selectedRecipeId')
    const urlRecipeId = query.get('recipe')
    const recipeId = urlRecipeId || savedRecipeId
    if (recipeId && !selectedRecipe && recipes.length > 0) {
      const recipe = recipes.find(r => r.id === recipeId)
      if (recipe) setSelectedRecipe(recipe)
    }
    saveRecipes(recipes)
    setFilteredRecipes(recipes)
  }, [recipes, query, selectedRecipe]) // Added selectedRecipe to dependency array

  // Update URL and localStorage only when selectedRecipe changes via user action
  useEffect(() => {
    if (selectedRecipe && !query.get('recipe')) {
      const newUrl = `${window.location.pathname}?recipe=${selectedRecipe.id}`
      window.history.pushState({}, '', newUrl)
      localStorage.setItem('selectedRecipeId', selectedRecipe.id)
    } else if (!selectedRecipe && query.get('recipe')) {
      window.history.pushState({}, '', window.location.pathname)
      localStorage.removeItem('selectedRecipeId')
    }
  }, [selectedRecipe, query])

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now().toString() }])
    setShowForm(false)
  }

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r))
    setShowForm(false)
    setSelectedRecipe(null) // Reset to homepage after update
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
    <div className="container mx-auto p-6 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Recipe Manager</h1>
      </header>
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="fixed bottom-6 right-6 btn-primary p-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-200"
          >
            <FiPlus size={24} />
          </button>
        </>
      )}
    </div>
  )
}

export default App