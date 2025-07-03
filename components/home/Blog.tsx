import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      date: "20 Jan, 2025",
      title: "Providing Food, Clean Water, and Medical Care to Those Who Need",
      excerpt: "Ensuring no child suffers from hunger, thirst, or lack of medical care—because every life matters.",
      image: "/images/kenya4.png",
      category: "Healthcare",
      readTime: "5 min read",
      author: "Jasiri Team"
    },
    {
      id: 2,
      date: "25 Jan, 2025",
      title: "No One Should Go Hungry, Thirsty, or Without Treatment",
      excerpt: "Providing essential food, clean water, and life-saving treatment to build a healthier future.",
      image: "/images/kenya3.png",
      category: "Nutrition",
      readTime: "4 min read",
      author: "Jasiri Team"
    },
    {
      id: 3,
      date: "30 Jan, 2025",
      title: "Nutritious Meals, Safe Water, and Healthcare to Every Child in Need",
      excerpt: "Together, we can nourish, heal, and bring hope to those who need it the most",
      image: "/images/kenya2.png",
      category: "Child Welfare",
      readTime: "6 min read",
      author: "Jasiri Team"
    }
  ];

  const categories = ["Healthcare", "Nutrition", "Child Welfare"];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            From The Blog
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Our Latest News And Articles
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our impact stories, program updates, and insights from the field as we work together to transform lives
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors duration-200">
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  width={1400}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">{post.date}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                <div className="flex items-center gap-2 text-emerald-600 font-medium group/btn hover:gap-3 transition-all duration-300 cursor-pointer">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <Link
          href="/blogs">
          <div className="text-center">
            <button className="inline-flex cursor-pointer items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>View All Blogs</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Blog;