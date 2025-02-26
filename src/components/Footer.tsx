export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">© {new Date().getFullYear()} Yan Romano</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/yanorck" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/yanvr/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}