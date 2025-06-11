import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Section Tag */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-orange-400"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                KNOW ABOUT US
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Building Resilient Communities
                <br />
                <span className="text-blue-900">Against Violent Extremism</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                At Jasiri, we are dedicated to creating secure environments where communities are empowered to resist radicalization and violent extremism. Through evidence-based programs and a community-driven approach, we strengthen social cohesion, promote dialogue, and build lasting peace across Kenya.
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                Our comprehensive approach focuses on awareness and dialogue, policy development, impact assessment, vulnerability tracking, and cutting-edge research to create sustainable solutions for preventing and countering violent extremism.
              </p>
            </div>

            {/* Learn More Button */}
            <Link
              href="/about">
              <button className="bg-green-600 text-white px-8 py-3 cursor-pointer rounded-md font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn more
              </button>
            </Link>
          </div>

          {/* Right Content - Image with Play Button */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/2.png"
                alt="Community members engaged in peace-building dialogue and activities"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110 group">
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-gray-800 ml-1 group-hover:text-blue-600 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Gradient Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
