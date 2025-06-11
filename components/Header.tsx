import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">Jasiri</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-green-600 font-medium hover:text-green-700 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About Us
            </Link>
            <Link href="/pillars" className="text-gray-600 hover:text-gray-900 transition-colors">
              Our Pillars
            </Link>
            <Link href="/activities" className="text-gray-600 hover:text-gray-900 transition-colors">
              Activities
            </Link>
            <Link href="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blogs
            </Link>
          </nav>

          {/* Get Involved Button */}
          <div className="flex items-center">
            <Link
              href="/get-involved"
              className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center"
            >
              Get Involved
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;