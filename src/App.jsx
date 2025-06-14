import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { loadRecipes, saveRecipes } from './utils/storage'
import RecipeCard from './components/RecipeCard'
import RecipeForm from './components/RecipeForm'
import RecipeDetail from './components/RecipeDetail'
import SearchFilter from './components/SearchFilter'
import { FiPlus } from 'react-icons/fi'


function App() {
  const [recipes, setRecipes] = useState(loadRecipes())
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [showForm, setShowForm] = useState(false)
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
  }

  const deleteRecipe = (id, navigate) => {
    setRecipes(recipes.filter(r => r.id !== id))
    navigate('/')
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

      <Routes>
        <Route
          path="/"
          element={
            <>
              {showForm ? (
                <RecipeForm
                  onSave={addRecipe}
                  onCancel={() => setShowForm(false)}
                />
              ) : (
                <>
                  <SearchFilter onFilter={handleFilter} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => window.location.href = `/recipe/${recipe.id}`}
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
            </>
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipePage
              recipes={recipes}
              onEdit={(recipe) => {
                setShowForm(true)
                setIsEditing(true)
              }}
              onDelete={deleteRecipe}
              isEditing={isEditing}
              onUpdate={updateRecipe}
              setIsEditing={setIsEditing}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          }
        />
      </Routes>
    </div>
  )
}

function RecipePage({ recipes, onEdit, onDelete, onUpdate, isEditing, onUpdateDone, setIsEditing, showForm, setShowForm }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) return <p>Recipe not found</p>

  return showForm && isEditing ? (
    <RecipeForm
      onSave={(updatedRecipe) => {
        onUpdate(updatedRecipe)
        setShowForm(false)
        setIsEditing(false)
        navigate('/')
      }}
      onCancel={() => {
        setShowForm(false)
        setIsEditing(false)
        navigate('/')
      }}
      initialRecipe={recipe}
    />
  ) : (
    <RecipeDetail
      recipe={recipe}
      onEdit={() => {
        onEdit(recipe)
        setShowForm(true)
      }}
      onDelete={() => onDelete(recipe.id, navigate)}
      onBack={() => navigate('/')}
    />
  )
}

export default App
