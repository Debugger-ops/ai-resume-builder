'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
    FileText, Sparkles, Download, Zap, Shield, Star,
    ArrowRight, CheckCircle, PlayCircle, Palette, Bot, Target
} from 'lucide-react';

const LandingPage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        { icon: <Bot className="w-6 h-6" />, title: "AI-Powered Writing", description: "Get intelligent suggestions for every section of your resume with advanced AI technology" },
        { icon: <Palette className="w-6 h-6" />, title: "Professional Templates", description: "Choose from 20+ ATS-friendly templates designed by industry professionals" },
        { icon: <Target className="w-6 h-6" />, title: "ATS Optimization", description: "Beat applicant tracking systems with optimized formatting and keywords" },
        { icon: <Zap className="w-6 h-6" />, title: "Real-time Preview", description: "See changes instantly with our live preview feature as you build" },
        { icon: <Download className="w-6 h-6" />, title: "Multiple Formats", description: "Export to PDF, Word, or share via link with professional formatting" },
        { icon: <Shield className="w-6 h-6" />, title: "Privacy First", description: "Your data is secure with enterprise-grade encryption and privacy protection" }
    ];

    const testimonials = [
        { name: "Sarah Johnson", role: "Software Engineer", company: "Google", content: "This AI resume builder helped me land my dream job at Google. The AI suggestions were spot-on!", rating: 5, avatar: "SJ" },
        { name: "Michael Chen", role: "Product Manager", company: "Apple", content: "The templates are incredibly professional and the AI writing assistant saved me hours of work.", rating: 5, avatar: "MC" },
        { name: "Emily Rodriguez", role: "Marketing Director", company: "Netflix", content: "Got 3x more interviews after using this platform. The ATS optimization really works!", rating: 5, avatar: "ER" }
    ];

    const stats = [
        { value: "500K+", label: "Resumes Created" },
        { value: "89%", label: "Success Rate" },
        { value: "50+", label: "Industries Covered" },
        { value: "4.9/5", label: "User Rating" }
    ];

    const pricingPlans = [
        { name: "Free", price: "$0", period: "forever", features: ["3 Resume downloads", "Basic templates", "AI writing assistance", "PDF export"], popular: false },
        { name: "Pro", price: "$9.99", period: "per month", features: ["Unlimited downloads", "Premium templates", "Advanced AI features", "Multiple formats", "Priority support", "ATS optimization"], popular: true },
        { name: "Enterprise", price: "$29.99", period: "per month", features: ["Team collaboration", "Custom branding", "API access", "Analytics dashboard", "Dedicated support", "Custom templates"], popular: false }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg text-white">
                            <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Reviews</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost">Sign In</Button>
                        <Button onClick={() => router.push('/start-building')} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            <section className="py-20 text-center">
                <Badge className="mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200">
                    <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Resume Builder
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                    Land Your Dream Job with
                    <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        AI-Powered Resumes
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Create professional, ATS-optimized resumes in minutes with our intelligent AI assistant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button onClick={() => router.push('/start-building')} size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-8 py-4 rounded-full">
                        <Sparkles className="w-5 h-5 mr-2" /> Start Building Now <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full border-2">
                        <PlayCircle className="w-5 h-5 mr-2" /> Watch Demo
                    </Button>
                </div>
            </section>

            <section id="features" className="py-20 bg-white/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our AI Resume Builder?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to help you create the perfect resume and land more interviews
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-lg">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Create your perfect resume in just 3 simple steps
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Choose Template",
                                description: "Select from our collection of professional, ATS-friendly templates",
                                icon: <Palette className="w-8 h-8" />
                            },
                            {
                                step: "2",
                                title: "AI Assistance",
                                description: "Let our AI help you write compelling content for each section",
                                icon: <Bot className="w-8 h-8" />
                            },
                            {
                                step: "3",
                                title: "Download & Apply",
                                description: "Export your resume and start applying to your dream jobs",
                                icon: <Download className="w-8 h-8" />
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center relative">
                                <div className="mb-6 relative inline-block">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                        {step.step}
                                    </div>
                                    <div className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg text-indigo-600">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full">
                                        <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="testimonials" className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Join thousands of professionals who've transformed their careers
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="text-2xl text-gray-900 mb-6 italic">
                                    "{testimonials[currentTestimonial].content}"
                                </blockquote>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonials[currentTestimonial].avatar}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                                        <div className="text-gray-600">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <div className="flex justify-center mt-8 gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-indigo-600' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section id="pricing" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Choose the plan that works best for you
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <Card key={index} className={`p-8 relative ${plan.popular ? 'border-2 border-indigo-500 shadow-xl scale-105' : 'border-0'} bg-white/80 backdrop-blur-sm`}>
                                {plan.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                        Most Popular
                                    </Badge>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {plan.price}
                                        <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                                    size="lg"
                                >
                                    Get Started
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join over 500,000 professionals who've transformed their careers with our AI-powered resume builder
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => router.push('/start-building')} size="lg" className="bg-gradient-to-r from-blue-900 to-purple-600 text-lg px-8 py-4 rounded-full">
                            <Sparkles className="w-5 h-5 mr-2" /> Start Building Now <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className=" bg-gradient-to-r from-blue-900 to-indigo-600  text-white  text-lg px-8 py-4 rounded-full"
                        >
                            View Examples
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold">ResumeAI</span>
                            </div>
                            <p className="text-gray-400">
                                The most advanced AI-powered resume builder for modern professionals.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 ResumeAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
