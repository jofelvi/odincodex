import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "development",
    title: "Development",
    description:
      "Full-stack applications built with modern technologies. From SaaS platforms to complex web applications, we deliver scalable and performant solutions.",
    icon: "code",
    features: [
      "Web Applications",
      "SaaS Platforms",
      "API Development",
      "E-commerce Solutions",
    ],
  },
  {
    id: "design",
    title: "Design",
    description:
      "User-centered design that combines aesthetics with functionality. We create interfaces that are intuitive, beautiful, and drive results.",
    icon: "palette",
    features: [
      "UI/UX Design",
      "Design Systems",
      "Prototyping",
      "User Research",
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    description:
      "Strategic technology guidance to help you make the right decisions. Architecture reviews, tech stack selection, and digital transformation.",
    icon: "compass",
    features: [
      "Tech Strategy",
      "Architecture Review",
      "Performance Audits",
      "Digital Transformation",
    ],
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Visual identity systems that communicate your brand's essence. From logos to complete brand guidelines, we build memorable identities.",
    icon: "gem",
    features: [
      "Brand Identity",
      "Visual Systems",
      "Brand Guidelines",
      "Marketing Assets",
    ],
  },
];
