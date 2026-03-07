import React from 'react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { aboutContent } from '../mockData';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '500+' },
    { icon: Clock, label: 'Years Experience', value: '5+' },
    { icon: Award, label: 'Dishes Served', value: '10,000+' },
    { icon: Heart, label: 'Five Star Reviews', value: '200+' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center mb-16"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1665332561290-cc6757172890?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxhZnJpY2FuJTIwZm9vZHxlbnwwfHx8fDE3NzI5MjYyMzh8MA&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="text-orange-500">Aduke's Kitchen</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Bringing authentic African flavors to Durham Region
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-600">Story</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{aboutContent.story}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{aboutContent.mission}</p>
          </div>
          <div className="relative h-96 lg:h-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxqb2xsb2YlMjByaWNlfGVufDB8fHx8MTc3MjkyNjI0MXww&ixlib=rb-4.1.0&q=85"
              alt="Aduke's Kitchen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our <span className="text-orange-600">Values</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {aboutContent.values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chef Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Meet <span className="text-orange-600">Chef Aduke</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-7xl text-white">👩‍🍳</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Chef Aduke brings years of culinary expertise and a deep passion for West African cuisine.
              Trained in traditional cooking methods and infused with modern techniques, she creates
              dishes that honor her heritage while delighting modern palates.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every dish from Aduke's Kitchen is prepared with love, authenticity, and the finest
              ingredients to ensure you experience the true taste of West Africa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;