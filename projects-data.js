// Structured project data configuration
const projectsData = [
    {
        id: 'salasar',
        title: 'Salasar Stay Manager',
        domain: 'Android Development',
        category: 'Android Application',
        isLive: true,
        description: 'Production-ready hotel management mobile app built with React Native and Expo. Features real-time booking management, room tracking, customer management, and comprehensive dashboard analytics.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-12T14-18-52-572Z-dce0d64f-chat-image-1765549132553-1.jpg',
        techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
        githubUrl: null,
        liveDemo: 'https://play.google.com/store/apps/details?id=com.salasar.staymanager&pli=1',
        demoVideo: {
            type: 'mp4',
            url: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2026-02-22T14-41-19-427Z-acc07bba-chat-video-1771771278367-0.mp4'
        }
    },
    {
        id: 'smartorbit',
        title: 'SmartOrbit',
        domain: 'iOS Development',
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
        id: 'heart-to-mind',
        title: 'Heart to Mind',
        domain: 'iOS Development',
        category: 'iOS Application',
        isLive: true,
        description: 'Personal wellness and meditation companion with guided meditation sessions, relaxing audio tracks, personalized wellness content, daily mindfulness reminders, and listening history tracking.',
        image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/01/ed/02/01ed02a1-5bc9-7aa8-8f93-188f98ae7f28/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg',
        techStack: ['Flutter', 'Dart'],
        githubUrl: null,
        liveDemo: 'https://apps.apple.com/in/app/heart-to-mind/id6775721981'
    },
    {
        id: 'genbook',
        title: 'GenBook',
        domain: 'Full Stack Web',
        category: 'Full Stack Web Application',
        isLive: true,
        description: 'AI-powered book generation platform built with TypeScript and Next.js. Leverages advanced language models to create comprehensive book content with intelligent chapter structuring and content generation.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2025-12-12T00-00-08-763Z-eeb322e4-chat-image-1765497608735-0.jpg',
        techStack: ['TypeScript', 'Next.js', 'AI/ML', 'OpenAI'],
        githubUrl: 'https://github.com/Yashkatiyar24/GENBOOK.AI',
        liveDemo: 'https://www.genbookai.tech/'
    },
    {
        id: 'coldclaw',
        title: 'ColdClaw',
        domain: 'AI Agents',
        category: 'AI Agent Platform',
        isLive: true,
        description: 'AI agent platform project focused on real-world automation and intelligent workflows.',
        image: 'https://coldclaw.vercel.app/coldclaw-logo-v2.png',
        imageFit: 'cover',
        icon: 'fas fa-robot',
        techStack: ['AI Agent', 'Automation', 'LLM'],
        githubUrl: null,
        liveDemo: 'https://www.coldclaw.tech/'
    },
    {
        id: 'web-rag',
        title: 'Web RAG AI Assistant',
        domain: 'AI/ML Projects',
        category: 'LLM Application',
        isLive: true,
        description: 'Real-time web AI assistant powered by Ollama (local LLM), DuckDuckGo web search, and LangChain RAG. Combines local language models with web search capabilities to provide intelligent, context-aware responses with source citations.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-23T19-57-41-205Z-d7c7db62-chat-image-1766519861186-0.jpg',
        techStack: ['Python', 'LangChain', 'RAG', 'Ollama'],
        githubUrl: 'https://github.com/Yashkatiyar24/WEB-RAG-AI-ASSISTANT',
        liveDemo: 'https://web-rag-ai-assistant-ksstorryqfqtfwndagyo2k.streamlit.app/'
    },
    {
        id: 'movie-recommender',
        title: 'Movie Recommender System',
        domain: 'AI/ML Projects',
        category: 'AI System',
        isLive: true,
        description: 'Intelligent movie recommendation system powered by TMDb and machine learning. Uses collaborative filtering and content-based algorithms to suggest personalized movie recommendations based on user preferences.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/73256284-090b-451e-9f1e-6449b0c42deb/2025-12-12T00-00-08-988Z-6e11d10b-chat-image-1765497608957-1.jpg',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
        githubUrl: 'https://github.com/Yashkatiyar24/Movie-recommendation',
        liveDemo: 'https://huggingface.co/spaces/Yashkatiyar/movie-recommender'
    },
    {
        id: 'vqa',
        title: 'Visual Question Answering',
        domain: 'AI/ML Projects',
        category: 'Multimodal AI',
        isLive: true,
        description: 'Upload an image and ask natural-language questions about it — the model answers based on visual understanding. Uses ViLT (Vision-and-Language Transformer), a pretrained multimodal model fine-tuned for Visual Question Answering (VQA) that jointly reasons over image and text inputs.',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/fc2551b8-be81-481c-9120-28eb9191a9cf/2025-12-23T19-57-41-322Z-1c45df81-chat-image-1766519861304-1.jpg',
        techStack: ['Python', 'ViLT', 'Transformers', 'Gradio'],
        githubUrl: 'https://github.com/Yashkatiyar24/Multimodal-AI-Visual-Question-Answering',
        liveDemo: 'https://huggingface.co/spaces/Yashkatiyar/vqa-vilt-demo?logs=container'
    },
    {
        id: 'audio-transcriber',
        title: 'Audio Transcriber',
        domain: 'AI/ML Projects',
        category: 'AI Tool',
        description: 'AI-powered audio transcription tool using advanced speech recognition models. Converts audio files to accurate text with support for multiple languages and audio formats.',
        image: null, // No image, will show icon
        icon: 'fas fa-microphone',
        techStack: ['Python', 'Speech Recognition', 'Jupyter', 'Whisper'],
        githubUrl: 'https://github.com/Yashkatiyar24/Transcribe-Audio-Files-'
        // No demo
    },
    {
        id: 'twitter-sentiment',
        title: 'Twitter Sentiment Analysis',
        domain: 'AI/ML Projects',
        category: 'NLP System',
        description: 'Natural Language Processing project analyzing Twitter sentiment using machine learning classification models. Processes tweets to determine positive, negative, or neutral sentiment with high accuracy.',
        image: null,
        icon: 'fab fa-twitter',
        techStack: ['Python', 'NLP', 'NLTK', 'TextBlob'],
        githubUrl: 'https://github.com/Yashkatiyar24/Twitter-sentimental-analysis'
        // No demo
    },
    {
        id: 'image-classification',
        title: 'Image Classification',
        domain: 'AI/ML Projects',
        category: 'Computer Vision',
        description: 'Deep learning image classification using Convolutional Neural Networks (CNNs) for accurate image recognition. Trained on large datasets to classify images into multiple categories with high precision.',
        image: null,
        icon: 'fas fa-image',
        techStack: ['Python', 'TensorFlow', 'CNN', 'Keras'],
        githubUrl: 'https://github.com/Yashkatiyar24/Image-Classification-with-Neural-Networks'
        // No demo
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
    },
    'AI Agent Platform': {
        color: '#f97316',
        glow: 'rgba(249, 115, 22, 0.4)',
        gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1))'
    }
};

// Domain-level configuration for cleaner project separation
const domainConfig = {
    'AI/ML Projects': {
        icon: 'fas fa-brain',
        label: 'AI'
    },
    'Android Development': {
        icon: 'fab fa-android',
        label: 'Android Dev'
    },
    'iOS Development': {
        icon: 'fab fa-apple',
        label: 'iOS Dev'
    },

    'Full Stack Web': {
        icon: 'fas fa-globe',
        label: 'Web / Full Stack'
    },
    'AI Agents': {
        icon: 'fas fa-robot',
        label: 'AI Agents'
    }
};

// Get all unique domains for filter tabs
const allDomains = ['All', ...new Set(projectsData.map(p => p.domain))];
