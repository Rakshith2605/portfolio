'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code, Cpu, PenTool, Users } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'Programming & Core Technologies',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'Python',
        'Java',
        'SQL',
        'Bash',
        'JavaScript/TypeScript',
        'HTML/CSS',
        'Git',
        'GitHub',
        'Docker',
        'Kubernetes',
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800',
    },
    {
      category: 'Frontend & Web Development',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'React',
        'Next.js',
        'Tailwind CSS',
        'Bootstrap',
        'Vercel AI SDK',
        'Responsive Design',
        'Progressive Web Apps',
      ],
      color: 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800',
    },
    {
      category: 'Cloud & DevOps',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'Azure',
        'GCP',
        'CI/CD',
        'Containerization',
        'Cloud-native Development',
      ],
      color: 'bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800',
    },
    {
      category: 'Databases & Data Storage',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Snowflake',
        'BigQuery',
        'Vector Databases',
        'Weaviate',
        'Pinecone',
      ],
      color: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800',
    },
    {
      category: 'Generative AI & Machine Learning',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'LLM Fine-tuning',
        'RAG',
        'Agentic AI Modeling',
        'Prompt Engineering',
        'Deep Learning',
        'Neural Networks',
        'TensorFlow',
        'PyTorch',
        'Hugging Face',
        'MLOps',
        'AI Agents',
        'Tool Calling',
      ],
      color: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
    },
    {
      category: 'Data Engineering & Analytics',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'Apache Spark',
        'Pandas',
        'NumPy',
        'Apache Airflow',
        'MLflow',
        'Jupyter',
        'Tableau',
        'PowerBI',
        'Data Extraction',
        'BS4',
        'Selenium',
        'Scrapy',
      ],
      color: 'bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800',
    },
    {
      category: 'Design & Creative Tools',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'Figma',
        'Canva',
        'Keynote',
        'UI/UX Design',
        'Prototyping',
      ],
      color: 'bg-pink-50 text-pink-600 border border-pink-200 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-800',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-5 w-5" />,
      skills: [
        'Communication',
        'Problem-Solving',
        'Adaptability',
        'Learning Agility',
        'Teamwork',
        'Creativity',
        'Focus',
        'Project Management',
        'Leadership',
      ],
      color: 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
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
      <Card className="w-full border-none px-6 pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-6 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((section, index) => (
              <motion.div
                key={index}
                className="space-y-2 px-0"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="text-accent-foreground text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-1.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Badge className={`border px-2.5 py-1 font-normal`}>
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
