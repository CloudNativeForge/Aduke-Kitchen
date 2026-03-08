import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { menuItems, categories } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart([...cart, item]);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Menu</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our authentic West African cuisine made fresh daily
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" aria-hidden />
              <Input
                type="search"
                placeholder="Search for dishes..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search menu items"
              />
            </div>

            {/* Category Filter - horizontal scroll on small screens */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0" role="group" aria-label="Filter by category">
              <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <Button
                variant={selectedCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('All')}
                className={selectedCategory === 'All' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category.name ? 'bg-orange-600 hover:bg-orange-700' : ''
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.name} - ${item.description}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {item.popular && (
                  <Badge className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700">
                    Popular
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-2 mb-2 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate min-w-0">
                    {item.name}
                  </h3>
                  <span className="text-orange-600 font-bold text-lg whitespace-nowrap flex-shrink-0">
                    ${item.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mb-4">
                  {item.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="text-xs">
                      {size}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white group"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;