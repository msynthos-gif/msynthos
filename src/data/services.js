import { Globe, Code, Bot, Palette, Sparkles, Box, TrendingUp } from 'lucide-react'
import websiteDevImg from '../assets/services/website_dev.webp'
import webAppDevImg from '../assets/services/web_app_dev.webp'
import aiAgentDevImg from '../assets/services/ai_agent_dev.webp'
import graphicDesignImg from '../assets/services/graphic_design.webp'
import aiAdMakingImg from '../assets/services/ai_ad_making.webp'
import threedAdMakingImg from '../assets/services/threed_ad_making.webp'
import digitalMarketingImg from '../assets/services/digital_marketing.webp'

export const SERVICES = [
  {
    id: "website-development",
    title: "Website Development",
    shortDescription: "Bespoke, high-converting websites engineered for fluid performance, SEO architecture, and flawless responsiveness across all devices.",
    tagline: "Custom-Built for Every Brand",
    icon: Globe,
    iconName: "Globe",
    badge: "Available Now",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.2)]",
    bgImage: websiteDevImg,
    imageAlt: "Msynthos Website Development - Custom corporate websites with SEO architecture and responsive design",
    features: [
      "Custom business & corporate sites",
      "SEO-optimized structure & meta tags",
      "Cinematic styling & fluid animations",
      "Fully responsive across all screen sizes"
    ]
  },
  {
    id: "web-app-development",
    title: "Web Application Development",
    shortDescription: "Custom web applications tailored to unique enterprise requirements — from dynamic dashboards to full-scale SaaS platforms.",
    tagline: "Powerful & Scalable Solutions",
    icon: Code,
    iconName: "Code",
    badge: "Available Now",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.25)]",
    bgImage: webAppDevImg,
    imageAlt: "Msynthos Web Application Development - Full-stack React app engineering and scalable cloud architecture",
    features: [
      "React & modern frontend architecture",
      "Interactive UI & complex state management",
      "RESTful API & database integration",
      "High-performance cloud scalability"
    ]
  },
  {
    id: "ai-agent-development",
    title: "AI Agent Development",
    shortDescription: "Autonomous AI agents and custom LLM workflows designed to automate business operations, customer engagement, and decision-making.",
    tagline: "Autonomous Business Intelligence",
    icon: Bot,
    iconName: "Bot",
    badge: "Featured Service",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.3)]",
    bgImage: aiAgentDevImg,
    imageAlt: "Msynthos AI Agent Development - Autonomous AI agents, custom LLM models, and RAG automation workflows",
    features: [
      "Custom RAG & domain-tuned agents",
      "Automated multi-step workflow execution",
      "API integrations with CRM & tools",
      "24/7 intelligent task automation"
    ]
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    shortDescription: "High-impact visual brand identities, digital assets, marketing collateral, and UI designs crafted to captivate and convert.",
    tagline: "Visual Perfection & Brand Identity",
    icon: Palette,
    iconName: "Palette",
    badge: "Available Now",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.2)]",
    bgImage: graphicDesignImg,
    imageAlt: "Msynthos Graphic Design - Brand identity design, UI/UX interface prototyping, and visual marketing assets",
    features: [
      "Brand identity & logo design",
      "UI/UX interface prototyping",
      "Social media graphics & ad vectors",
      "Custom pitch decks & marketing media"
    ]
  },
  {
    id: "ai-ad-making",
    title: "AI Ad Making",
    shortDescription: "Generative AI-powered ad campaigns, hyper-realistic video commercials, and copy optimized for maximum ROI and engagement.",
    tagline: "Next-Gen Generative Advertising",
    icon: Sparkles,
    iconName: "Sparkles",
    badge: "Popular",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.25)]",
    bgImage: aiAdMakingImg,
    imageAlt: "Msynthos AI Ad Making - Generative AI video commercials and data-driven ad copywriting",
    features: [
      "AI video commercial generation",
      "Data-driven ad copywriting",
      "Multi-platform format optimization",
      "Rapid creative iteration & testing"
    ]
  },
  {
    id: "3d-ad-making",
    title: "3D Ad Making",
    shortDescription: "Cinematic 3D product renders, immersive motion graphic ads, and visual effects that make products stand out in competitive markets.",
    tagline: "Cinematic Product Showcases",
    icon: Box,
    iconName: "Box",
    badge: "High Impact",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.3)]",
    bgImage: threedAdMakingImg,
    imageAlt: "Msynthos 3D Ad Making - Cinematic 3D product rendering, animation, and motion graphics VFX",
    features: [
      "3D product modeling & animation",
      "Photorealistic render compositing",
      "High-energy social video ads",
      "Interactive 3D digital assets"
    ]
  },
  {
    id: "digital-marketing",
    title: "Social Media & Digital Marketing",
    shortDescription: "Data-driven marketing strategies, social media management, organic audience growth, and targeted conversion campaigns.",
    tagline: "Strategic Brand Scale & Reach",
    icon: TrendingUp,
    iconName: "TrendingUp",
    badge: "Growth Engine",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(45,74,122,0.2)]",
    bgImage: digitalMarketingImg,
    imageAlt: "Msynthos Social Media & Digital Marketing - Omnichannel campaigns, growth strategies, and performance analytics",
    features: [
      "Omnichannel strategy & execution",
      "Social media content management",
      "Paid advertising campaign management",
      "Performance analytics & conversion optimization"
    ]
  }
]
