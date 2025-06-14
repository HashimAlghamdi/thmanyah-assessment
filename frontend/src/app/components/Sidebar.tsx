export default function Sidebar() {
  return (
    <aside className="w-64 px-4 py-6 border-r border-gray-800">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg"></div>
      </div>
      
      <nav className="space-y-2">
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span>Discover</span>
        </a>
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          YOUR STUFF
        </h3>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>My Queue</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.415 1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>My Podcasts</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6.5A1.5 1.5 0 008.5 13h-1A1.5 1.5 0 016 11.5V5a2 2 0 00-2 2v6.5A1.5 1.5 0 005.5 15h1A1.5 1.5 0 008 13.5V7a1 1 0 112 0v6.5A1.5 1.5 0 0011.5 15h1a1.5 1.5 0 001.5-1.5V5a2 2 0 00-2-2v1a1 1 0 11-2 0V3a2 2 0 00-2 2z" clipRule="evenodd" />
            </svg>
            <span>Recents</span>
          </a>
        </nav>
      </div>
    </aside>
  );
} 