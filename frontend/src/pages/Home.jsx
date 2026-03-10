import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, UtensilsCrossed, Cookie, Soup, ChefHat, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { menuItems, categories, testimonials } from '../mockData';
import { useCart } from '../contexts/CartContext';
import { ItemDialog } from '../components/ItemDialog';

const Home = () => {
  const popularItems = menuItems.filter(item => item.popular).slice(0, 6);
  const [dialogItem, setDialogItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openItemDialog = (item) => {
    setDialogItem(item);
    setDialogOpen(true);
  };

  const categoryIcons = {
    UtensilsCrossed,
    Cookie,
    Soup,
    ChefHat
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://customer-assets.emergentagent.com/job_adukes-kitchen/artifacts/uury7gjb_image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-stone-900/65"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            TASTE THE AUTHENTIC
            <span className="block text-orange-500 mt-2">AFRICAN EXPERIENCE</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Freshly made traditional West African dishes in Durham Region
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 active:scale-[0.98] text-white px-8 py-6 text-lg rounded-full group w-full sm:w-auto transition-all duration-200"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+14374105630">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 active:bg-white/90 active:scale-[0.98] px-8 py-6 text-lg rounded-full w-full sm:w-auto transition-all duration-200"
              >
                Order Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Menu Categories</h2>
            <p className="text-lg text-gray-600">Explore our delicious offerings</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.icon];
              return (
                <Link key={category.id} to="/menu">
                  <Card
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 active:scale-[0.99] cursor-pointer border-2 hover:border-orange-500"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                        <IconComponent className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Customer Favorites</h2>
            <p className="text-lg text-gray-600">Try our most loved dishes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => openItemDialog(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                </div>
                <CardContent className="p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-orange-600 font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 active:scale-[0.98] text-white transition-all duration-200"
                    onClick={() => openItemDialog(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 inline-block" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white active:bg-orange-700 active:scale-[0.98] px-8 transition-all duration-200"
              >
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#fdf6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real reviews from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Call us now or visit our menu to place your order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+14374105630">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-amber-50 active:bg-amber-100 px-8 py-6 text-lg rounded-full w-full sm:w-auto transition-colors"
              >
                Call +1 (437) 410-5630
              </Button>
            </a>
            <Link to="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 active:bg-white/90 px-8 py-6 text-lg rounded-full w-full sm:w-auto transition-colors"
              >
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <ItemDialog
        item={dialogItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Home;