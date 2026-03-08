import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { contactInfo } from '../mockData';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      content: contactInfo.phone,
      link: `tel:${contactInfo.phone}`
    },
    {
      icon: Mail,
      title: 'Email',
      content: contactInfo.email,
      link: `mailto:${contactInfo.email}`
    },
    {
      icon: MapPin,
      title: 'Location',
      content: contactInfo.location,
      link: null
    },
    {
      icon: Clock,
      title: 'Hours',
      content: contactInfo.hours,
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactDetails.map((detail, index) => {
            const IconComponent = detail.icon;
            const content = detail.link ? (
              <a
                href={detail.link}
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                {detail.content}
              </a>
            ) : (
              <span className="text-gray-700">{detail.content}</span>
            );

            return (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{detail.title}</h3>
                  <div className="text-sm break-words overflow-hidden">{content}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Form and Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Send Us a <span className="text-orange-600">Message</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 min-h-32"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
                    aria-busy="false"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 h-full flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-orange-600">Aduke's Kitchen?</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    <strong>Authentic Recipes:</strong> Traditional West African dishes prepared with
                    time-honored techniques
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    <strong>Fresh Ingredients:</strong> We use only the finest, freshest ingredients in
                    all our dishes
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    <strong>Made with Love:</strong> Every dish is prepared with care and passion by Chef
                    Aduke
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    <strong>Convenient Service:</strong> Serving the entire Durham Region with reliable
                    delivery
                  </p>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <a
                  href={contactInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
                  </svg>
                  <span className="font-medium">@adukehkitchen</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;