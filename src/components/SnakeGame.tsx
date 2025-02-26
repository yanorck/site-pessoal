'use client'

import { useEffect, useState, useCallback } from 'react'

export default function SnakeGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState('right')
  const [gameOver, setGameOver] = useState(false)
  const [directionQueue, setDirectionQueue] = useState<string[]>([])
  const [speed, setSpeed] = useState(150)
  
  const moveSnake = useCallback(() => {
    if (gameOver) return
  
    const newSnake = [...snake]
    const head = { ...newSnake[0] }
    
    // Process next direction from queue
    let nextDirection = directionQueue.length > 0 ? directionQueue[0] : direction
    
    // Validate the next direction
    const currentDirection = direction
    if ((nextDirection === 'up' && currentDirection === 'down') ||
        (nextDirection === 'down' && currentDirection === 'up') ||
        (nextDirection === 'left' && currentDirection === 'right') ||
        (nextDirection === 'right' && currentDirection === 'left')) {
      nextDirection = currentDirection
    }
  
    // Update direction and remove from queue
    if (directionQueue.length > 0) {
      setDirection(nextDirection)
      setDirectionQueue(prev => prev.slice(1))
    }
  
    switch (nextDirection) {
      case 'up': head.y = (head.y - 1 + 20) % 20; break
      case 'down': head.y = (head.y + 1) % 20; break
      case 'left': head.x = (head.x - 1 + 20) % 20; break
      case 'right': head.x = (head.x + 1) % 20; break
    }
  
    // Check self collision
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }
  
    newSnake.unshift(head)
  
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1)
      // Increase speed every 5 points, minimum interval of 50ms
      setSpeed(Math.max(50, 150 - Math.floor(score / 5) * 10))
      setFood({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      })
    } else {
      newSnake.pop()
    }
  
    setSnake(newSnake)
  }, [snake, direction, directionQueue, food, gameOver, score])
  
  useEffect(() => {
    if (!gameStarted) return
  
    const handleKeyPress = (e: KeyboardEvent) => {
      const newDirection = e.key.toLowerCase()
      
      switch (newDirection) {
        case 'arrowup':
        case 'w':
          setDirectionQueue(prev => [...prev, 'up'].slice(-2))
          break
        case 'arrowdown':
        case 's':
          setDirectionQueue(prev => [...prev, 'down'].slice(-2))
          break
        case 'arrowleft':
        case 'a':
          setDirectionQueue(prev => [...prev, 'left'].slice(-2))
          break
        case 'arrowright':
        case 'd':
          setDirectionQueue(prev => [...prev, 'right'].slice(-2))
          break
      }
    }
  
    window.addEventListener('keydown', handleKeyPress)
    const gameInterval = setInterval(moveSnake, speed)
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      clearInterval(gameInterval)
    }
  }, [gameStarted, moveSnake, direction, speed])
  
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSpeed(150)
    setSnake([{ x: 10, y: 10 }])
    setDirection('right')
    setDirectionQueue([])
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <p className="text-xl text-white mb-2">Score: {score}</p>
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        ) : null}
      </div>
      <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
          {snake.map((segment, i) => (
            <div
              key={i}
              className="bg-green-500"
              style={{
                gridColumn: segment.x + 1,
                gridRow: segment.y + 1,
              }}
            />
          ))}
          <div
            className="bg-red-500"
            style={{
              gridColumn: food.x + 1,
              gridRow: food.y + 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}