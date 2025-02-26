'use client'

export default function LofiPlayer() {
  return (
    <div className="w-80 md:w-80 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <iframe
        width="100%"
        height="80"
        className="rounded-lg h-20 md:h-32"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&modestbranding=1&showinfo=0"
        title="Lofi Hip Hop Radio"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}