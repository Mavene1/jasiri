import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Activities = () => {
  const campaigns = [
    {
      id: 1,
      category: "Community Engagement",
      title: "Safe Spaces, Strong Voices",
      description: "Creating secure environments for open dialogue and community engagement to counter extremist narratives.",
      image: "/images/1.png",
      progress: 78,
      goal: "Build 50 community dialogue centers",
      buttonText: "Support Now!"
    },
    {
      id: 2,
      category: "Youth Empowerment", 
      title: "Empowering Tomorrow, One Youth At A Time",
      description: "Providing alternative pathways and opportunities for at-risk youth through mentorship and skills development.",
      image: "/images/2.png",
      progress: 65,
      goal: "Reach 1000 young people",
      buttonText: "Support Now!"
    },
    {
      id: 3,
      category: "Peace Building",
      title: "Healing Communities, Spreading Hope",
      description: "Supporting communities affected by violent extremism through trauma healing and reconciliation programs.",
      image: "/images/3.png",
      progress: 82,
      goal: "Support 25 communities",
      buttonText: "Support Now!"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-400 text-md font-semibold uppercase tracking-wider mb-4 block">
          Activities And Campaigns
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            Together For Peace: Join Our Mission
            <br />
            <span className="text-blue-900">To Make A Difference</span>
          </h2>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    • {campaign.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {campaign.description}
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Goal</span>
                    <span className="text-sm font-bold text-gray-900">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{campaign.goal}</p>
                </div>

                {/* Button */}
                <button className="w-full bg-green-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center group/btn">
                  {campaign.buttonText}
                  <svg 
                    className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* View All Button */}
        <Link
          href="/dashboard/activities">
          <div className="text-center">
            <button className="inline-flex cursor-pointer items-center gap-3 bg-emerald-600 text-white px-8 py-4 mt-12 rounded-full font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>View All Activities</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Activities;