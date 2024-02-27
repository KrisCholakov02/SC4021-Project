'use client';

import React from 'react';

import { QueryResultCard } from '@/components/query-result-card';
import { SearchBar } from '@/components/search-bar';

export default function Home() {
  const sampleResults = [
    {
      title: 'WebAssembly: Revolutionizing Web Performance',
      description:
        'WebAssembly enables near-native performance for web applications, broadening the scope of programming languages available for web development and enhancing user experiences for resource-intensive applications.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Server-Driven UI: Enhancing Frontend and Backend Integration',
      description:
        'Server-driven UI simplifies the complexity of frontend code by making UI layout and components decisions server-side, improving the development process and user experience.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Progressive Web Apps: Merging Web with Mobile',
      description:
        'PWAs offer a native app-like experience using web technology, providing functionalities like offline support, push notifications, and home screen access, improving user engagement and retention.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'API-First Design: Prioritizing Scalable Development',
      description:
        'API-first design focuses on creating consistent, flexible, and scalable APIs, improving collaboration among development teams and ensuring a modular and adaptable application architecture.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Blockchain-Based Applications: Fostering Decentralization',
      description:
        'Blockchain technology enables secure, transparent, and decentralized web applications, extending beyond cryptocurrencies to various industries requiring data integrity and security.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Machine Learning in the Browser: Leveraging TensorFlow.js',
      description:
        'TensorFlow.js allows the execution of machine learning models in the browser, enabling real-time data analysis, enhanced user privacy, and cutting-edge features like image recognition and natural language processing.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Headless CMSs: Revolutionizing Content Management',
      description:
        'Headless CMSs decouple content management from presentation, enabling seamless content delivery across various platforms and devices, and offering developers greater flexibility in UI design.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'IoT and Web-Powered Interactive Experiences',
      description:
        'The integration of IoT devices with web applications opens up new possibilities for interactive and immersive user experiences across smart homes, wearables, healthcare, and more.',
      author: 'AppMaster',
      date: '2024',
      rating: 5,
      type: 'Web Development Trend'
    },
    {
      title: 'Voice Search Optimization: Enhancing User Interactions',
      description:
        'Optimizing web applications for voice search improves user experience by allowing natural language queries, making information access faster and more intuitive.',
      author: 'TechCrunch',
      date: '2024',
      rating: 4,
      type: 'Web Development Trend'
    },
    {
      title:
        'Augmented Reality in Web Development: Creating Immersive Experiences',
      description:
        'AR technology in web development enables the creation of immersive user experiences directly in the browser, offering innovative ways to engage users and present information.',
      author: 'Mozilla Developer Network',
      date: '2024',
      rating: 4,
      type: 'Web Development Trend'
    }
  ];

  return (
    <div className="flex-col flex-grow flex items-center">
      <div className="mb-8 bg-black w-56 h-32">Logo</div>
      <div className="mb-4 w-full">
        <SearchBar />
      </div>
      <div className="w-full flex flex-col items-center justify-items-center">
        {sampleResults.map((result, index) => (
          <div key={index} className="w-9/12">
            <QueryResultCard {...result} />
          </div>
        ))}
      </div>
    </div>
  );
}
