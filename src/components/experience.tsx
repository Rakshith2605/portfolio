'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const Experience = () => {
  const experienceData = [
    {
      title: 'Generative AI Engineer',
      company: 'Reliance Jio Infocom',
      period: 'May 2025 - Present',
      location: 'Dallas, Texas, United States',
      description: 'Building O-TAP CoPilot and low-latency LLM RAG stacks for telecom operations.',
      achievements: [
        'Architected O-TAP Co-Pilot using multi-agent RAG system with CrewAI and LangGraph, reducing NOC engineer workload by 40%',
        'Designed patent-pending LLM architecture for telecom diagram generation using sub-10B parameter models, outperforming GPT-4 and Claude while reducing inference costs by 60%',
        'Implemented on-premise LLM deployment pipeline achieving sub-second latency for 95% of queries',
        'Integrated knowledge graph-based RAG using Neo4j and Docling, improving context retrieval accuracy by 45%'
      ],
      technologies: ['LLM Fine-tuning', 'RAG', 'Multi-Agent Systems', 'Vector DBs', 'MLOps', 'CrewAI', 'Neo4j'],
      type: 'Full-time',
      logo: '/Reliance_Jio_Logo.svg.png',
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      title: 'HPC Research Assistant',
      company: 'Northeastern University',
      period: 'February 2024 - April 2025',
      location: 'Boston, Massachusetts, United States',
      description: 'Optimized high-performance computing workflows and data processing pipelines.',
      achievements: [
        'Containerized 15+ research applications using Docker, reducing deployment time from 4 hours to 20 minutes and improving scientific workflow efficiency by 70%',
        'Analyzed 2.5M SLURM job logs using PySpark distributed computing, identifying failure patterns that reduced HPC job failures by 20%',
        'Automated SLURM account provisioning through shell scripting and REST APIs, decreasing administrative overhead by 70%',
        'Improved system performance and workflow efficiency through containerization and automation'
      ],
      technologies: ['PySpark', 'SLURM', 'HPC', 'Docker', 'Data Processing', 'Distributed Computing', 'REST APIs'],
      type: 'Research',
      logo: '/NU.png',
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
    {
      title: 'Software Engineer',
      company: 'Value Labs Solutions',
      period: 'February 2022 - August 2023',
      location: 'Hyderabad, Telangana, India',
      description: 'Developed scalable web applications and cloud infrastructure solutions.',
      achievements: [
        'Developed scalable ETL pipelines processing 5TB+ daily operational data on Azure Blob Storage, improving analytics query performance by 30%',
        'Implemented microservices architecture using Docker containers and Azure Kubernetes Service, reducing deployment time by 50% and achieving 99.9% uptime',
        'Established automated testing framework using Selenium and TestNG, increasing code coverage to 85% and reducing production bugs by 40%',
        'Built cloud-native applications with automated CI/CD pipelines'
      ],
      technologies: ['Docker', 'Azure', 'Kubernetes', 'Microservices', 'CI/CD', 'ETL', 'Selenium', 'TestNG'],
      type: 'Full-time',
      logo: '/valuelabs_logo-removebg-preview.png',
      color: 'bg-green-50 text-green-600 border border-green-200',
    },
    {
      title: 'Co-Founder',
      company: '4-Tech AI&ML Solutions',
      period: 'May 2018 - April 2023',
      location: 'Bengaluru, Karnataka, India',
      description: 'Co-founded AI/ML company working with major clients including Apple, Mercedes-Benz, and Google.',
      achievements: [
        'Led AI/ML data operations for Fortune 500 clients including Apple, Mercedes-Benz, and Google, managing 50+ annotation projects',
        'Supervised training data preparation for Siri\'s regional language models, improving voice recognition accuracy by 18% for 3 Indian languages',
        'Optimized data preprocessing pipeline for voice recognition models, reducing processing time by 25% while maintaining quality standards',
        'Built and deployed production AI systems for enterprise clients'
      ],
      technologies: ['AI/ML', 'Enterprise Solutions', 'Data Annotation', 'Voice Recognition', 'Client Management', 'Python'],
      type: 'Startup',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-orange-50 text-orange-600 border border-orange-200',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl"
    >
      <Card className="w-full border-none px-0 pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Work Experience
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-8 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experienceData.map((experience, index) => (
              <motion.div
                key={index}
                className="space-y-4 px-0"
                variants={itemVariants}
              >
                {/* Experience Header */}
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${experience.color} overflow-hidden`}>
                    {experience.logo ? (
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      experience.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-accent-foreground text-xl font-semibold">
                        {experience.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {experience.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base leading-relaxed">
                  {experience.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-accent-foreground text-sm font-semibold uppercase tracking-wide">
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-accent-foreground text-sm font-semibold uppercase tracking-wide">
                    Technologies & Skills
                  </h4>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {experience.technologies.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        variants={badgeVariants}
                        whileHover={{
                          scale: 1.04,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <Badge className="border px-3 py-1.5 font-normal">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Separator */}
                {index < experienceData.length - 1 && (
                  <div className="border-t border-border pt-6" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Experience; 