'use client'

import Link from 'next/link'
import AnimatedProfile from '@/components/AnimatedProfile'
import SnakeGame from '@/components/SnakeGame'
import LofiPlayer from '@/components/LofiPlayer'
import SurpriseButton from '@/components/SurpriseButton'
import MessageBoard from '@/components/MessageBoard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Fixed position Lofi Player */}
      <div className="fixed top-4 right-4 z-50">
        <LofiPlayer />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <AnimatedProfile />
          <h1 className="text-5xl font-bold mb-4">Yan Vieira Romano</h1>
          <p className="text-xl mb-8">Computer Engineering Student at Insper</p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-gray-300">
              Welcome to my personal website! I&apos;m currently in my 7th semester of Computer Engineering,
              passionate about technology and software development.
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-6 mt-6">
              <a
                href="https://www.linkedin.com/in/yanvr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/yanorck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/portfolio" className="block">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h2 className="text-2xl font-semibold mb-3">Portfolio</h2>
                <p className="text-gray-300">Check out my projects and work experience</p>
              </div>
            </Link>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Message Board</h2>
              <MessageBoard />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-semibold mb-6">Take a Break - Play Snake!</h2>
            <SnakeGame />
          </div>

          <SurpriseButton />
        </div>
      </div>
    </div>
  )
}