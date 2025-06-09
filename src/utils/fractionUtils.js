import Fraction from 'fraction.js'

export function adjustQuantity(quantity, originalServings, newServings) {
  try {
    const fraction = new Fraction(quantity).mul(newServings).div(originalServings)
    return fraction.toFraction(true)
  } catch {
    return quantity
  }
}