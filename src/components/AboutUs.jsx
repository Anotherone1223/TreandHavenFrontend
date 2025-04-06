import React, { useEffect, useState } from 'react'
import { Users, Award, Clock, Truck, Leaf, Sparkles, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';


const AboutUs = () => {
    const stats = [
        { icon: Users, count: 1000, label: 'Happy Customers' },
        { icon: Award, count: 10, label: 'Fashion Awards' },
        { icon: Clock, count: 5, label: 'Years Experience' },
        { icon: Truck, count: 150, label: 'Countries Served' }
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.count;
            const duration = 3000; // 2 seconds
            const increment = end / (duration / 20);
            
            const interval = setInterval(() => {
                start += increment;
                setCounts(prevCounts => {
                    const newCounts = [...prevCounts];
                    newCounts[index] = Math.min(Math.floor(start), end);
                    return newCounts;
                });
                if (start >= end) clearInterval(interval);
            }, 20);
        });
    }, []);
    return (
        <div className="overflow-hidden">
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-[600px] bg-cover bg-fixed bg-center" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920")' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="text-white max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight animate-fade-in">
                        Crafting Stories Through Fashion
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                        Where timeless elegance meets contemporary design, creating a narrative of style that transcends seasons.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link to='/shop' className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition duration-300">
                            Our Collections
                        </Link>
                        <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Mission & Vision with Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 dark:text-white">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-serif">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            At TrendHaven, we're revolutionizing fashion through sustainable practices and timeless designs. Our mission extends beyond creating exceptional clothing—we're building a future where style and sustainability coexist harmoniously.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-4xl font-serif">Our Vision</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We envision a world where conscious fashion choices create positive impact. Every garment we create is a testament to our commitment to innovation, quality, and environmental stewardship.
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square rounded-full overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
                            alt="Fashion Design"
                            className="w-full h-full object-cover hover:scale-110 transition duration-700"
                        />
                    </div>
                    {/* <div className="absolute -bottom-8 -left-8 bg-rose-600 text-white p-6 rounded-lg shadow-xl">
                        <p className="text-2xl font-bold">15+</p>
                        <p className="text-sm opacity-90">Years of Excellence</p>
                    </div> */}
                </div>
            </div>
        </div>

        {/* Stats Section with Animation */}
        <div className="overflow-hidden">
            {/* Stats Section with Animation */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <stat.icon className="h-10 w-10 mx-auto text-rose-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-4xl font-bold text-white mb-2">
                                    {counts[index].toLocaleString()}+
                                </div>
                                <div className="text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Team Section with Hover Effects */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-4xl font-serif text-center mb-16 dark:text-white">The Visionaries Behind TrendHaven</h2>
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    {
                        name: 'Sarah Johnson',
                        role: 'Founder & CEO',
                        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
                        quote: 'Fashion is about dreaming and making other people dream.'
                    },
                    {
                        name: 'Michael Chen',
                        role: 'Creative Director',
                        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
                        quote: 'Design is not just what it looks like, design is how it works.'
                    },
                    {
                        name: 'Emma Williams',
                        role: 'Head of Design',
                        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
                        quote: 'Simplicity is the ultimate sophistication.'
                    }
                ].map((member) => (
                    <div key={member.name} className="group">
                        <div className="relative overflow-hidden rounded-2xl mb-6">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full aspect-[3/4] object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white italic">"{member.quote}"</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-rose-600 font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Values Section with Icons */}
        <div className="bg-gray-50 py-24 dark:text-white dark:bg-[#1a202c]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-serif text-center mb-16">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: Leaf,
                            title: 'Sustainability',
                            description: "We're committed to eco-friendly practices and sustainable materials in all our products, ensuring a better future for fashion."
                        },
                        {
                            icon: Sparkles,
                            title: 'Innovation',
                            description: "Constantly pushing boundaries to create unique and trendsetting designs that redefine contemporary fashion."
                        },
                        {
                            icon: Shield,
                            title: 'Quality',
                            description: "Uncompromising attention to detail and premium materials in every piece, ensuring lasting value for our customers."
                        }
                    ].map((value, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-rose-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <value.icon className="h-8 w-8 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Call to Action */}
        <div className="bg-rose-600 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-serif text-white mb-8">Join Our Fashion Journey</h2>
                <p className="text-xl text-rose-100 mb-12 max-w-2xl mx-auto">
                    Be part of our story as we revolutionize the fashion industry with sustainable, innovative designs.
                </p>
                <button className="px-12 py-4 bg-white text-rose-600 font-semibold rounded-full hover:bg-rose-50 transition duration-300 text-lg">
                    <Link to='/shop'>Explore Collections</Link>
                </button>
            </div>
        </div>
    </div>
    )
}

export default AboutUs
