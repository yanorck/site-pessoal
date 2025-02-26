'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: number
  content: string
  author: string
  createdAt: string
  likes: { id: number }[]
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]) // Initialize as empty array
  const [newMessage, setNewMessage] = useState({ content: '', author: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      if (Array.isArray(data)) { // Ensure data is an array
        setMessages(data)
      } else {
        setMessages([])
        console.error('Received non-array data:', data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      })

      if (response.ok) {
        setNewMessage({ content: '', author: '' })
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to post message:', error)
    }
  }
  const handleLike = async (messageId: number) => {
    try {
      await fetch(`/api/messages/${messageId}/like`, {
        method: 'POST',
      })
      fetchMessages() // Refresh messages to update likes count
    } catch (error) {
      console.error('Failed to like message:', error)
    }
  }
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
          </svg>
          {showForm ? 'Cancel' : 'New Message'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-700 p-4 rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={newMessage.author}
              onChange={(e) => setNewMessage({ ...newMessage, author: e.target.value })}
              className="w-full p-2 rounded bg-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your message"
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              className="w-full p-2 rounded bg-gray-600 text-white h-20"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="h-[300px] overflow-y-auto space-y-4">
        {isLoading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400">No messages yet. Be the first to write something!</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="bg-gray-700 rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-purple-300">{message.author}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(message.id)}
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>{message.likes?.length || 0}</span>
                  </button>
                  <span className="text-sm text-gray-400">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-200">{message.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}