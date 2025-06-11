import React from 'react';
import { Heart, Users, Droplets, Stethoscope, MapPin, ArrowRight} from 'lucide-react';

// Stats Section Component
const Stats = () => {
  const stats = [
    {
      icon: <Heart className="w-8 h-8" />,
      percentage: 37,
      label: "Healthcare & Medical Care",
      description: "Providing essential medical services and healthcare access",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      percentage: 20,
      label: "Clean Water & Sanitation", 
      description: "Ensuring access to safe, clean drinking water",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      percentage: 17,
      label: "Nutrition & Food Security",
      description: "Fighting hunger and malnutrition in communities",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      percentage: 13,
      label: "Education & Empowerment",
      description: "Building capacity and educational opportunities",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      percentage: 13,
      label: "Emergency Response",
      description: "Rapid response to humanitarian crises",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Impact & Transparency
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Where Your Giving Goes:
            <span className="block text-emerald-600">Making Every Donation Count</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ensuring every donation makes a real difference—see how your generosity transforms lives across our key pillars of impact
          </p>
        </div>

        {/* Donut Chart Visualization */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
          <div className="relative">
            <svg width="300" height="300" className="transform -rotate-90">
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="24"
              />
              {/* Healthcare - 37% */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="24"
                strokeDasharray={`${37 * 7.54} ${(100-37) * 7.54}`}
                strokeDashoffset="0"
                className="transition-all duration-1000 ease-out"
              />
              {/* Water - 20% */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="24"
                strokeDasharray={`${20 * 7.54} ${(100-20) * 7.54}`}
                strokeDashoffset={`-${37 * 7.54}`}
                className="transition-all duration-1000 ease-out delay-200"
              />
              {/* Nutrition - 17% */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="24"
                strokeDasharray={`${17 * 7.54} ${(100-17) * 7.54}`}
                strokeDashoffset={`-${(37+20) * 7.54}`}
                className="transition-all duration-1000 ease-out delay-400"
              />
              {/* Education - 13% */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="url(#gradient4)"
                strokeWidth="24"
                strokeDasharray={`${13 * 7.54} ${(100-13) * 7.54}`}
                strokeDashoffset={`-${(37+20+17) * 7.54}`}
                className="transition-all duration-1000 ease-out delay-600"
              />
              {/* Emergency - 13% */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="url(#gradient5)"
                strokeWidth="24"
                strokeDasharray={`${13 * 7.54} ${(100-13) * 7.54}`}
                strokeDashoffset={`-${(37+20+17+13) * 7.54}`}
                className="transition-all duration-1000 ease-out delay-800"
              />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">100%</div>
                <div className="text-sm text-slate-600">Transparency</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block">
            <ArrowRight className="w-12 h-12 text-slate-400" strokeWidth={1} />
          </div>

          {/* Legend */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${stat.color}`}></div>
                <div>
                  <div className="font-semibold text-slate-800">{stat.percentage}% {stat.label}</div>
                  <div className="text-sm text-slate-600">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-800">
                  {stat.percentage}%
                </div>
                <div className="font-semibold text-slate-700 text-sm">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {stat.description}
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;