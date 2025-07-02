import { BookOpen, Users, FileText, BarChart3, Eye, Search } from 'lucide-react';
import Link from 'next/link';

const PriorityAreas = () => {
  const pillars = [
    {
      id: 1,
      icon: <Users className="w-8 h-8" />,
      title: "Awareness and Dialogue",
      description: "Building community understanding through open conversations and educational programs to prevent radicalization.",
      link: "See All Programs"
    },
    {
      id: 2,
      icon: <BookOpen className="w-8 h-8" />,
      title: "PCVE Network",
      description: "Strengthening partnerships and networks to enhance Preventing and Countering Violent Extremism initiatives.",
      link: "See All Programs",
      highlighted: true
    },
    {
      id: 3,
      icon: <FileText className="w-8 h-8" />,
      title: "Policies and Good Practices",
      description: "Developing evidence-based policies and sharing best practices for sustainable peace-building.",
      link: "See All Programs"
    },
    {
      id: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Impact Assessment",
      description: "Measuring and evaluating the effectiveness of our interventions to ensure meaningful community impact.",
      link: "See All Programs"
    },
    {
      id: 5,
      icon: <Eye className="w-8 h-8" />,
      title: "Tracking Vulnerabilities",
      description: "Identifying and monitoring community vulnerabilities to prevent violent extremism before it takes root.",
      link: "See All Programs"
    },
    {
      id: 6,
      icon: <Search className="w-8 h-8" />,
      title: "Research",
      description: "Conducting comprehensive research to understand extremism patterns and develop effective counter-strategies.",
      link: "See All Programs"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-400 text-md font-semibold uppercase tracking-wider mb-4 block">
            Our Priority Areas
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
            Your Support Strengthens Peace And
            <br />
            <span className="text-blue-900">Transforms Communities</span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`
                bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group
                ${pillar.highlighted ? 'ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-white' : ''}
              `}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                  {pillar.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center group/btn">
                  {pillar.link}
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
          href="/priority-areas">
          <div className="text-center">
            <button className="bg-green-600 cursor-pointer text-white px-8 py-4 rounded-full font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto">
              View All Priority Areas
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PriorityAreas;