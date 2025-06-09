import { jsPDF } from 'jspdf'
import Fraction from 'fraction.js'

export function exportToPDF(recipe, servings) {
  const doc = new jsPDF()
  
  doc.setFontSize(20)
  doc.text(recipe.title, 20, 20)
  
  doc.setFontSize(12)
  doc.text(recipe.description, 20, 30)
  
  doc.text(`Servings: ${servings}`, 20, 40)
  doc.text(`Cooking Time: ${recipe.cookingTime} min`, 20, 50)
  
  doc.text('Ingredients:', 20, 60)
  recipe.ingredients.forEach((ing, index) => {
    const quantity = new Fraction(ing.quantity).mul(servings).div(recipe.servings)
    doc.text(`${quantity.toFraction(true)} ${ing.unit} ${ing.name}`, 30, 70 + index * 10)
  })
  
  doc.text('Steps:', 20, 70 + recipe.ingredients.length * 10 + 10)
  recipe.steps.forEach((step, index) => {
    doc.text(`${index + 1}. ${step}`, 30, 80 + recipe.ingredients.length * 10 + index * 10)
  })
  
  doc.save(`${recipe.title}.pdf`)
}