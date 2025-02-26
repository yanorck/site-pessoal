import MessageBoard from '@/components/MessageBoard'

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Message Board</h1>
        <MessageBoard />
      </div>
    </div>
  )
}