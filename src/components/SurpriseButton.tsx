'use client'

import { useState } from 'react'

export default function SurpriseButton() {
  const [surprise, setSurprise] = useState('')
  const [loading, setLoading] = useState(false)

  const getSurprise = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode')
      const data = await response.json()
      const joke = data.type === 'single' ? data.joke : `${data.setup}\n\n${data.delivery}`
      setSurprise(joke)
    } catch (_error) { // Added underscore to indicate intentionally unused
      setSurprise('Oops! The surprise machine is taking a quick nap. Try again!')
    }
    setLoading(false)
  }

  return (
    <div className="mt-8">
      <button
        onClick={getSurprise}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all
                 shadow-lg hover:shadow-xl text-xl animate-pulse hover:animate-none"
        disabled={loading}
      >
        ✨ Tell me a Programming Joke! ✨
      </button>
      
      {loading && (
        <div className="mt-4 text-purple-300">
          Preparing something funny...
        </div>
      )}
      
      {surprise && !loading && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-purple-300 max-w-xl mx-auto whitespace-pre-line">
          {surprise}
        </div>
      )}
    </div>
  )
}