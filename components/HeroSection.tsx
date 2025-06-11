import Image from 'next/image';

interface VolunteerStats {
  count: number;
  label: string;
  avatars: string[];
}

const HeroSection = () => {
  // Dummy data for volunteers
  const volunteerStats: VolunteerStats = {
    count: 150,
    label: "Active Members",
    avatars: [
      "/images/pp1.png", // These would be actual avatar URLs
      "/images/pp2.png",
      "/images/pp3.png",
      "/images/4.png",
      "/images/images.png",
    ]
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Uniting for Peace,
                <br />
                <span className="text-blue-900">Building Resilient</span>
                <br />
                <span className="text-blue-900">Communities</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 max-w-lg">
                Join us in preventing violent extremism through community engagement, awareness, and collaborative dialogue
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
                Our Programs
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Video
              </button>
            </div>
          </div>

          {/* Right Content - Images and Stats */}
          <div className="relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/1.png"
                  alt="Community members engaging in peace-building activities"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating child image */}
              <div className="absolute -top-8 -left-8 w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/images/2.png"
                  alt="Community member"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {volunteerStats.count}
                  </div>
                  <div className="text-gray-600 font-medium mb-4">
                    {volunteerStats.label}
                  </div>
                  <div className="flex -space-x-2">
                    {volunteerStats.avatars.map((avatar, index) => (
                      <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <Image
                          src={avatar}
                          alt={`Volunteer ${index + 1}`}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;