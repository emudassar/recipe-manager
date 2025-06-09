import React, { useState, useEffect } from 'react'

function SearchFilter({ onFilter }) {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('')

  useEffect(() => {
    onFilter(search, tag)
  }, [search, tag])

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search recipes or ingredients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Tags</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="vegan">Vegan</option>
        <option value="quick">Quick</option>
      </select>
    </div>
  )
}

export default SearchFilter