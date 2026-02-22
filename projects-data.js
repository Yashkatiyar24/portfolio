// Structured project data configuration
const projectsData = [
    {
        id: 'salasar',
        title: 'Salasar Stay Manager',
        category: 'Android Application',
        isLive: true,
        description: 'Production-ready hotel management mobile app built with React Native and Expo. Features real-time booking management, room tracking, customer management, and comprehensive dashboard analytics.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-12T14-18-52-572Z-dce0d64f-chat-image-1765549132553-1.jpg',
        techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
        githubUrl: 'https://github.com/Yashkatiyar24/app-salasar-main-main',
        demoVideo: {
            type: 'mp4',
            url: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-41-19-427Z-acc07bba-chat-video-1771771278367-0.mp4'
        }
    },
    {
        id: 'smartorbit',
        title: 'SmartOrbit',
        category: 'iOS Application',
        isLive: false,
        description: 'Personal exam preparation companion built with SwiftUI. Simulates real exam conditions with full-screen distraction-free environment, smart countdown timer, question palette, and detailed performance reports. Practice for Google, Amazon, Microsoft, Meta, TCS, and Infosys placement tests.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-35-51-718Z-f823da4e-chat-image-1771770951699-0.jpg',
        techStack: ['SwiftUI', 'Combine', 'MVVM', 'Swift 5.10+'],
        githubUrl: 'https://github.com/Yashkatiyar24/SmartOrbit',
        demoVideo: {
            type: 'mp4',
            url: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-05-28-299Z-a0350286-chat-video-1771769128195-0.mp4'
        }
    },
    {
        id: 'shopease',
        title: 'Shopease',
        category: 'React Native Application',
        isLive: false,
        description: 'Modern minimalist e-commerce mobile app built with React Native and Expo. Features product browsing with real-time search, cart management with swipe gestures, multi-step checkout flow, and persistent cart storage using AsyncStorage. Clean UI with smooth animations and INR currency support.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-35-51-829Z-700ee216-chat-image-1771770951809-1.jpg',
        techStack: ['React Native', 'Expo', 'TypeScript', 'Context API'],
        githubUrl: 'https://github.com/Yashkatiyar24/E-commerce-app',
        demoVideo: {
            type: 'mp4',
            url: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-13-25-828Z-d677c427-chat-video-1771769605737-0.mp4'
        }
    },
    {
        id: 'rive-learning',
        title: 'RIVE Learning App',
        category: 'React Native Application',
        isLive: false,
        description: 'Interactive learning application featuring a dynamic animated learning assistant powered by RIVE animations. The assistant reacts to user actions, progress, and performance in real-time using RIVE State Machines. Built with Expo Router for navigation and Zustand for global state management.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-35-51-941Z-e01f4dd7-chat-image-1771770951920-2.jpg',
        techStack: ['React Native', 'Expo', 'RIVE', 'Zustand'],
        githubUrl: 'https://github.com/Yashkatiyar24/RIVE-Learning-App',
        demoVideo: {
            type: 'mp4',
            url: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-26-20-737Z-16be897b-chat-video-1771770380558-0.mov'
        }
    },
    {
        id: 'genbook',
        title: 'GenBook',
        category: 'Full Stack Web Application',
        description: 'AI-powered book generation platform built with TypeScript and Next.js. Leverages advanced language models to create comprehensive book content with intelligent chapter structuring and content generation.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2025-12-12T00-00-08-763Z-eeb322e4-chat-image-1765497608735-0.jpg',
        techStack: ['TypeScript', 'Next.js', 'AI/ML', 'OpenAI'],
        githubUrl: 'https://github.com/Yashkatiyar24/GENBOOK.AI',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    },
    {
        id: 'web-rag',
        title: 'Web RAG AI Assistant',
        category: 'LLM Application',
        description: 'Real-time web AI assistant powered by Ollama (local LLM), DuckDuckGo web search, and LangChain RAG. Combines local language models with web search capabilities to provide intelligent, context-aware responses with source citations.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-23T19-57-41-205Z-d7c7db62-chat-image-1766519861186-0.jpg',
        techStack: ['Python', 'LangChain', 'RAG', 'Ollama'],
        githubUrl: 'https://github.com/Yashkatiyar24/WEB-RAG-AI-ASSISTANT',
        demoVideo: {
            type: 'mp4',
            url: 'https://example.com/demo.mp4' // Replace with actual video
        }
    },
    {
        id: 'movie-recommender',
        title: 'Movie Recommender System',
        category: 'AI System',
        description: 'Intelligent movie recommendation system powered by TMDb and machine learning. Uses collaborative filtering and content-based algorithms to suggest personalized movie recommendations based on user preferences.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2025-12-12T00-00-08-988Z-6e11d10b-chat-image-1765497608957-1.jpg',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
        githubUrl: 'https://github.com/Yashkatiyar24/Movie-recommendation',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    },
    {
        id: 'vqa',
        title: 'Visual Question Answering',
        category: 'Multimodal AI',
        description: 'Upload an image and ask natural-language questions about it — the model answers based on visual understanding. Uses ViLT (Vision-and-Language Transformer), a pretrained multimodal model fine-tuned for Visual Question Answering (VQA) that jointly reasons over image and text inputs.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-23T19-57-41-322Z-1c45df81-chat-image-1766519861304-1.jpg',
        techStack: ['Python', 'ViLT', 'Transformers', 'Gradio'],
        githubUrl: 'https://github.com/Yashkatiyar24/Multimodal-AI-Visual-Question-Answering',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    },
    {
        id: 'audio-transcriber',
        title: 'Audio Transcriber',
        category: 'AI Tool',
        description: 'AI-powered audio transcription tool using advanced speech recognition models. Converts audio files to accurate text with support for multiple languages and audio formats.',
        image: null, // No image, will show icon
        icon: 'fas fa-microphone',
        techStack: ['Python', 'Speech Recognition', 'Jupyter', 'Whisper'],
        githubUrl: 'https://github.com/Yashkatiyar24/Transcribe-Audio-Files-',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    },
    {
        id: 'twitter-sentiment',
        title: 'Twitter Sentiment Analysis',
        category: 'NLP System',
        description: 'Natural Language Processing project analyzing Twitter sentiment using machine learning classification models. Processes tweets to determine positive, negative, or neutral sentiment with high accuracy.',
        image: null,
        icon: 'fab fa-twitter',
        techStack: ['Python', 'NLP', 'NLTK', 'TextBlob'],
        githubUrl: 'https://github.com/Yashkatiyar24/Twitter-sentimental-analysis',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    },
    {
        id: 'image-classification',
        title: 'Image Classification',
        category: 'Computer Vision',
        description: 'Deep learning image classification using Convolutional Neural Networks (CNNs) for accurate image recognition. Trained on large datasets to classify images into multiple categories with high precision.',
        image: null,
        icon: 'fas fa-image',
        techStack: ['Python', 'TensorFlow', 'CNN', 'Keras'],
        githubUrl: 'https://github.com/Yashkatiyar24/Image-Classification-with-Neural-Networks',
        demoVideo: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    }
];

// Category configuration with colors and glows
const categoryConfig = {
    'AI System': {
        color: '#a78bfa',
        glow: 'rgba(167, 139, 250, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.1))'
    },
    'Android Application': {
        color: '#4ade80',
        glow: 'rgba(74, 222, 128, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1))'
    },
    'iOS Application': {
        color: '#60a5fa',
        glow: 'rgba(96, 165, 250, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.1))'
    },
    'Full Stack Web Application': {
        color: '#2dd4bf',
        glow: 'rgba(45, 212, 191, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(20, 184, 166, 0.1))'
    },
    'LLM Application': {
        color: '#f472b6',
        glow: 'rgba(244, 114, 182, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(236, 72, 153, 0.1))'
    },
    'React Native Application': {
        color: '#22d3ee',
        glow: 'rgba(34, 211, 238, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(6, 182, 212, 0.1))'
    },
    'Multimodal AI': {
        color: '#fb923c',
        glow: 'rgba(251, 146, 60, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(249, 115, 22, 0.1))'
    },
    'AI Tool': {
        color: '#c084fc',
        glow: 'rgba(192, 132, 252, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(168, 85, 247, 0.1))'
    },
    'NLP System': {
        color: '#fbbf24',
        glow: 'rgba(251, 191, 36, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))'
    },
    'Computer Vision': {
        color: '#34d399',
        glow: 'rgba(52, 211, 153, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1))'
    }
};

// Get all unique categories for filter tabs
const allCategories = ['All', ...new Set(projectsData.map(p => p.category))];
