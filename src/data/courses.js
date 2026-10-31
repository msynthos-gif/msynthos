import { Globe, Code, Bot, Palette, Sparkles, Box, TrendingUp, Video } from 'lucide-react'
import courseWebDevImg from '../assets/courses/course_web_dev.webp'
import courseWebAppsImg from '../assets/courses/course_web_apps.webp'
import courseAiAgentsImg from '../assets/courses/course_ai_agents.webp'
import courseGraphicDesignImg from '../assets/courses/course_graphic_design.webp'
import courseAiAdsImg from '../assets/courses/course_ai_ads.webp'
import course3dAdsImg from '../assets/courses/course_3d_ads.webp'
import courseDigitalMarketingImg from '../assets/courses/course_digital_marketing.webp'
import courseYoutubeAutomationImg from '../assets/courses/course_youtube_automation.webp'

export const COURSES = [
  {
    id: "course-web-dev",
    serviceId: "website-development",
    title: "Mastering Modern Website Development",
    category: "Development",
    shortDescription: "Learn to build high-converting, responsive websites with clean architecture, modern CSS, SEO optimization, and cinematic motion design.",
    icon: Globe,
    badge: "Bestseller",
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    modulesCount: 12,
    status: "Enrollment Open",
    bannerImage: courseWebDevImg,
    imageAlt: "Mastering Modern Website Development Course by Msynthos Academy - Learn HTML5, CSS3, Tailwind, and SEO architecture",
    skills: ["HTML5/CSS3", "Tailwind CSS", "SEO Strategy", "Responsive Design"]
  },
  {
    id: "course-web-apps",
    serviceId: "web-app-development",
    title: "Full-Stack Web Application Engineering",
    category: "Engineering",
    shortDescription: "Build scalable web applications from scratch using React, Vite, state management, API architecture, and production deployment.",
    icon: Code,
    badge: "Popular",
    duration: "10 Weeks",
    level: "Intermediate",
    modulesCount: 16,
    status: "Enrollment Open",
    bannerImage: courseWebAppsImg,
    imageAlt: "Full-Stack Web Application Engineering Course by Msynthos Academy - Master React, Vite, APIs, and cloud architecture",
    skills: ["React & Hooks", "Vite", "REST & GraphQL", "State Management"]
  },
  {
    id: "course-ai-agents",
    serviceId: "ai-agent-development",
    title: "AI Agent Architecture & Automation",
    category: "AI & Automation",
    shortDescription: "Master the design and deployment of autonomous AI agents, multi-agent orchestrations, RAG pipelines, and API integrations.",
    icon: Bot,
    badge: "Featured",
    duration: "6 Weeks",
    level: "Advanced",
    modulesCount: 10,
    status: "Enrollment Open",
    bannerImage: courseAiAgentsImg,
    imageAlt: "AI Agent Architecture & Automation Course by Msynthos Academy - Autonomous AI agents, RAG workflows, and LLMs",
    skills: ["Autonomous Agents", "RAG Workflows", "LangChain/LlamaIndex", "Tool Calling"]
  },
  {
    id: "course-graphic-design",
    serviceId: "graphic-designing",
    title: "Professional Graphic & UI/UX Design",
    category: "Design",
    shortDescription: "Craft stunning visual brand identities, digital assets, high-converting marketing graphics, and polished user interface designs.",
    icon: Palette,
    badge: "Creative",
    duration: "8 Weeks",
    level: "All Levels",
    modulesCount: 14,
    status: "Enrollment Open",
    bannerImage: courseGraphicDesignImg,
    imageAlt: "Professional Graphic & UI/UX Design Course by Msynthos Academy - Figma, brand identities, and interface design",
    skills: ["Figma & Design Systems", "Brand Identity", "Visual Hierarchy", "UI Design"]
  },
  {
    id: "course-ai-ads",
    serviceId: "ai-ad-making",
    title: "Generative AI Ad Creation & Video Production",
    category: "AI & Media",
    shortDescription: "Harness generative AI models to script, generate, edit, and launch hyper-realistic video commercials and high-converting ad campaigns.",
    icon: Sparkles,
    badge: "Trending",
    duration: "4 Weeks",
    level: "Beginner friendly",
    modulesCount: 8,
    status: "Enrollment Open",
    bannerImage: courseAiAdsImg,
    imageAlt: "Generative AI Ad Creation Course by Msynthos Academy - Generative video models, ad scripts, and viral formats",
    skills: ["AI Video Generators", "Prompt Engineering", "Ad Scripting", "Viral Formats"]
  },
  {
    id: "course-3d-ads",
    serviceId: "3d-ad-making",
    title: "3D Ad Creation & Motion Design",
    category: "3D & Motion",
    shortDescription: "Create photorealistic 3D product animations, cinematic motion graphics, and high-impact visual ads that captivate audiences.",
    icon: Box,
    badge: "High Impact",
    duration: "10 Weeks",
    level: "Intermediate",
    modulesCount: 15,
    status: "Enrollment Open",
    bannerImage: course3dAdsImg,
    imageAlt: "3D Ad Creation & Motion Design Course by Msynthos Academy - 3D product rendering, motion graphics, and video editing",
    skills: ["3D Product Rendering", "Motion Graphics", "Lighting & Texturing", "Video Editing"]
  },
  {
    id: "course-digital-marketing",
    serviceId: "digital-marketing",
    title: "Social Media & Digital Marketing Mastery",
    category: "Marketing",
    shortDescription: "Develop data-driven marketing campaigns, scale organic social channels, run high-ROI paid ads, and master conversion analytics.",
    icon: TrendingUp,
    badge: "Growth",
    duration: "6 Weeks",
    level: "All Levels",
    modulesCount: 12,
    status: "Enrollment Open",
    bannerImage: courseDigitalMarketingImg,
    imageAlt: "Social Media & Digital Marketing Mastery Course by Msynthos Academy - Paid media ads, growth strategy, and analytics",
    skills: ["Paid Media Ads", "Growth Strategy", "Content Planning", "Analytics"]
  },
  {
    id: "course-youtube-automation",
    serviceId: "youtube-automation",
    title: "YouTube Automation & Channel Scaling",
    category: "Specialized",
    shortDescription: "Build, automate, and monetize faceless YouTube channels with AI voiceovers, automated video production pipelines, and viral SEO strategies.",
    icon: Video,
    badge: "Specialized",
    duration: "6 Weeks",
    level: "All Levels",
    modulesCount: 10,
    status: "Enrollment Open",
    bannerImage: courseYoutubeAutomationImg,
    imageAlt: "YouTube Automation & Channel Scaling Course by Msynthos Academy - Faceless channel creation, script automation, and AI voice editing",
    skills: ["Niche Research", "Script Automation", "AI Voice & Editing", "Monetization"]
  }
]
