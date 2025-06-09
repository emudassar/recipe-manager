export function loadRecipes() {
  const recipes = localStorage.getItem('recipes')
  return recipes ? JSON.parse(recipes) : []
}

export function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}