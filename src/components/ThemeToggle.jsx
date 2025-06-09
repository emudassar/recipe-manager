import React, { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  )
}

export default ThemeToggle