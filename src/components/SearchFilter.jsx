import React, { useState, useEffect } from 'react'

function SearchFilter({ onFilter }) {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('')

  useEffect(() => {
    onFilter(search, tag)
  }, [search, tag])

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search recipes or ingredients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input flex-1"
      />
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="input w-full sm:w-48"
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