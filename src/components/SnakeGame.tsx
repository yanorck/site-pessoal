'use client'

import { useEffect, useState } from 'react'

import AdUnit from './AdUnit'

export default function SnakeGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState('right')
  const [gameOver, setGameOver] = useState(false)
  const [directionQueue, setDirectionQueue] = useState<string[]>([])
  const [speed, setSpeed] = useState(80)
  const [isMobile, setIsMobile] = useState(false)
  const [showNameInput, setShowNameInput] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [highScores, setHighScores] = useState<{ name: string; score: number }[]>([])
  const [scoreSaved, setScoreSaved] = useState(false)
  // Ajustar a velocidade inicial para ser mais rápida

  // Atualizar o startGame
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 5, y: 5 })
    setDirection('right')
    setDirectionQueue([])
    setSpeed(80)
    setShowNameInput(false)
    setScoreSaved(false)
    setPlayerName('')
  }

  const saveScore = async () => {
    if (!playerName || scoreSaved) return
    try {
      await fetch('/api/highscores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score })
      })
      setShowNameInput(false)
      setScoreSaved(true)
      loadHighScores()
    } catch (error) {
      console.error('Failed to save score:', error)
    }
  }
  // Remover o useEffect existente que só tem loadHighScores
  // e adicionar um novo useEffect no início do componente
  useEffect(() => {
    const initializeGame = async () => {
      await loadHighScores()
    }
    initializeGame()
  }, []) // Este useEffect roda apenas uma vez quando o componente monta
  const loadHighScores = async () => {
    try {
      const res = await fetch('/api/highscores')
      const data = await res.json()
      setHighScores(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load high scores:', error)
      setHighScores([])
    }
  }
  const isOppositeDirection = (newDir: string) => {
    return (
      (direction === 'up' && newDir === 'down') ||
      (direction === 'down' && newDir === 'up') ||
      (direction === 'left' && newDir === 'right') ||
      (direction === 'right' && newDir === 'left')
    )
  }
  const handleMobileControl = (newDirection: string) => {
    if (gameOver || isOppositeDirection(newDirection)) return
    setDirectionQueue([newDirection]) // Usar a fila em vez de setDirection diretamente
  }
  // Adicionar direction nas dependências do useEffect do handleKeyPress
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

    const handleKeyPress = (event: KeyboardEvent) => {
        if (gameOver) return
        
        let newDirection = ''
        switch (event.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            newDirection = 'up'; break
          case 's':
          case 'arrowdown':
            newDirection = 'down'; break
          case 'a':
          case 'arrowleft':
            newDirection = 'left'; break
          case 'd':
          case 'arrowright':
            newDirection = 'right'; break
        }
    
        if (newDirection && !isOppositeDirection(newDirection)) {
          setDirectionQueue([newDirection]) // Guarda apenas a última direção
        }
      }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver, direction]) // Adicionar direction de volta
  useEffect(() => {
    if (!gameStarted) return

    // Atualizar o moveSnake
  const moveSnake = () => {
    const head = { ...snake[0] }
    
    // Processa a direção da fila, se houver
    if (directionQueue.length > 0) {
      const nextDirection = directionQueue[0]
      if (!isOppositeDirection(nextDirection)) {
        setDirection(nextDirection)
        setDirectionQueue([])
      }
    }
    
    switch (direction) {
      case 'up': head.y = head.y <= 0 ? 19 : head.y - 1; break
      case 'down': head.y = head.y >= 19 ? 0 : head.y + 1; break
      case 'left': head.x = head.x <= 0 ? 19 : head.x - 1; break
      case 'right': head.x = head.x >= 19 ? 0 : head.x + 1; break
    }

      // Check collision with snake body (excluding the head)
      if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setShowNameInput(true)
        return
      }

      const newSnake = [head, ...snake]
      
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1)
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        })
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [gameStarted, snake, direction, food, speed, score])
  return (
    <div className="w-full flex justify-between px-4">
      {/* Área de anúncio à esquerda */}
      <div className="w-1/3 flex justify-end pr-8">
        <AdUnit 
          adSlot="YOUR-AD-SLOT-1"
          adFormat="vertical"
          style={{ width: '300px', height: '600px' }}
        />
      </div>

      {/* Game Container no centro */}
      <div className="w-[600px] p-4 bg-gray-800 rounded-lg shadow-lg">
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
        {/* Input e controles dentro do container do jogo */}
        {gameOver && showNameInput && !scoreSaved && (
          <div className="mt-4 text-center">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="px-4 py-2 rounded mr-2 text-black"
            />
            <button
              onClick={saveScore}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Save Score
            </button>
          </div>
        )}

        {gameOver && scoreSaved && (
          <div className="mt-4 text-center text-white">
            Score saved!
          </div>
        )}

        {isMobile && (
          <div className="mt-4 grid grid-cols-3 gap-2 w-48 mx-auto">
            <div></div>
            <button
              className="bg-purple-500 p-4 rounded-lg text-white"
              onClick={() => handleMobileControl('up')}
            >
              ↑
            </button>
            <div></div>
            <button
              className="bg-purple-500 p-4 rounded-lg text-white"
              onClick={() => handleMobileControl('left')}
            >
              ←
            </button>
            <button
              className="bg-purple-500 p-4 rounded-lg text-white"
              onClick={() => handleMobileControl('down')}
            >
              ↓
            </button>
            <button
              className="bg-purple-500 p-4 rounded-lg text-white"
              onClick={() => handleMobileControl('right')}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Container direito com anúncio e high scores */}
      <div className="w-1/3 flex flex-col gap-4 pl-8">
        <AdUnit 
          adSlot="YOUR-AD-SLOT-2"
          adFormat="rectangle"
          style={{ width: '300px', height: '250px' }}
        />
        
        <div className="w-[300px] bg-gray-800 p-4 rounded-lg shadow-lg sticky top-4">
          <h2 className="text-xl text-white mb-2">High Scores</h2>
          <div className="space-y-2">
            {highScores.map((hs, i) => (
              <div key={i} className="text-white flex justify-between">
                <span>{hs.name}</span>
                <span>{hs.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}