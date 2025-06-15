export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 space-x-4">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-800 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="ابحث في أكثر من 70 مليون بودكاست وحلقة..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="px-4 py-2 text-blue-400 hover:bg-gray-800 rounded">
          تسجيل الدخول
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
          إنشاء حساب
        </button>
      </div>
    </header>
  );
}
