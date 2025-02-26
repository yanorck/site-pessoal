'use client'

import Image from 'next/image'

export default function AnimatedProfile() {
  return (
    <div className="relative w-64 h-64 mx-auto mb-8">
      {/* Static image container */}
      <div className="absolute inset-4 rounded-full z-10">
        <div className="bg-gray-900 rounded-full p-1 h-full w-full">
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Yan Romano"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      {/* Rotating border */}
      <div className="absolute inset-0 rounded-full animate-spin-slow p-4">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-90 blur-[4px]" />
      </div>
    </div>
  )
}