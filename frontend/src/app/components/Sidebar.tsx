import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-64 px-4 py-6 border-l border-gray-800">
      {/* Logo */}
      <div className="mb-8">
        <img src="/favicon.svg" alt="Logo" width="40" height="44" />
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
        >
          <Image
            src="https://podbay.fm/static/images/menu/home-line.svg"
            alt="Home"
            width={18}
            height={18}
          />
          <span>الرئيسية</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
        >
          <Image
            src="https://podbay.fm/static/images/menu/discover-line.svg"
            alt="Discover"
            width={18}
            height={18}
          />
          <span>اكتشف</span>
        </a>
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          المحتوى الخاص بك
        </h3>
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
          >
            <Image
              src="https://podbay.fm/static/images/menu/my-queue-line.svg"
              alt="My Queue"
              width={18}
              height={18}
            />
            <span>شاهد لاحقاً</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
          >
            <Image
              src="https://podbay.fm/static/images/menu/my-podcasts-line.svg"
              alt="My Podcasts"
              width={18}
              height={18}
            />
            <span>مكتبتي</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
          >
            <Image
              src="https://podbay.fm/static/images/menu/recents-line.svg"
              alt="Recents"
              width={18}
              height={18}
            />
            <span>الأحدث</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
