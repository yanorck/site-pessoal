'use client'

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Yan Vieira Romano</h1>
          <p className="text-xl mb-8">Computer Engineering Student at Insper</p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-gray-300">
              Welcome to my personal website! I&apos;m currently in my 7th semester of Computer Engineering,
              passionate about technology and software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href="/portfolio" className="block">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3">Portfolio</h2>
                <p className="text-gray-300">Check out my projects and work experience</p>
              </div>
            </a>
            <a href="/messages" className="block">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3">Message Board</h2>
                <p className="text-gray-300">Leave a message or share something fun</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}