'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Yan Romano
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/portfolio" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                Portfolio
              </Link>
              <Link href="/messages" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                Message Board
              </Link>
              <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                About
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/portfolio" className="block hover:bg-gray-700 px-3 py-2 rounded-md">
              Portfolio
            </Link>
            <Link href="/messages" className="block hover:bg-gray-700 px-3 py-2 rounded-md">
              Message Board
            </Link>
            <Link href="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}