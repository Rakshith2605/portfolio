import { tool } from 'ai';
import { z } from 'zod';

export const getExperience = tool({
  description:
    'Get detailed information about Rakshith\'s work experience, professional background, and career timeline. Use this when users ask about work history, jobs, experience, or professional background.',
  parameters: z.object({
    detail: z.enum(['current', 'previous', 'all']).optional().describe('Specify which experience to focus on: current job, previous jobs, or all experience')
  }).optional(),
  execute: async (params = {}) => {
    const { detail = 'all' } = params;
    
    const experienceData = {
      current: {
        title: "Generative AI Engineer",
        company: "Reliance Jio Infocom",
        period: "May 2025 - Present",
        location: "Dallas, Texas, United States",
        achievements: [
          "Architected O-TAP Co-Pilot using multi-agent RAG system with CrewAI and LangGraph, reducing NOC engineer workload by 40%",
          "Designed patent-pending LLM architecture for telecom diagram generation using sub-10B parameter models, outperforming GPT-4 and Claude while reducing inference costs by 60%",
          "Implemented on-premise LLM deployment pipeline achieving sub-second latency for 95% of queries",
          "Integrated knowledge graph-based RAG using Neo4j and Docling, improving context retrieval accuracy by 45%"
        ],
        technologies: ["LLM Fine-tuning", "RAG", "Multi-Agent Systems", "Vector DBs", "MLOps", "CrewAI", "Neo4j"]
      },
      previous: [
        {
          title: "HPC Research Assistant",
          company: "Northeastern University",
          period: "February 2024 - April 2025",
          location: "Boston, Massachusetts, United States",
          achievements: [
            "Containerized 15+ research applications using Docker, reducing deployment time from 4 hours to 20 minutes and improving scientific workflow efficiency by 70%",
            "Analyzed 2.5M SLURM job logs using PySpark distributed computing, identifying failure patterns that reduced HPC job failures by 20%",
            "Automated SLURM account provisioning through shell scripting and REST APIs, decreasing administrative overhead by 70%"
          ],
          technologies: ["PySpark", "SLURM", "HPC", "Docker", "Data Processing", "Distributed Computing", "REST APIs"]
        },
        {
          title: "Software Engineer",
          company: "Value Labs Solutions",
          period: "February 2022 - August 2023",
          location: "Hyderabad, Telangana, India",
          achievements: [
            "Developed scalable ETL pipelines processing 5TB+ daily operational data on Azure Blob Storage, improving analytics query performance by 30%",
            "Implemented microservices architecture using Docker containers and Azure Kubernetes Service, reducing deployment time by 50% and achieving 99.9% uptime",
            "Established automated testing framework using Selenium and TestNG, increasing code coverage to 85% and reducing production bugs by 40%"
          ],
          technologies: ["Docker", "Azure", "Kubernetes", "Microservices", "CI/CD", "ETL", "Selenium", "TestNG"]
        },
        {
          title: "Co-Founder",
          company: "4-Tech AI&ML Solutions",
          period: "May 2018 - April 2023",
          location: "Bengaluru, Karnataka, India",
          achievements: [
            "Led AI/ML data operations for Fortune 500 clients including Apple, Mercedes-Benz, and Google, managing 50+ annotation projects",
            "Supervised training data preparation for Siri's regional language models, improving voice recognition accuracy by 18% for 3 Indian languages",
            "Optimized data preprocessing pipeline for voice recognition models, reducing processing time by 25% while maintaining quality standards"
          ],
          technologies: ["AI/ML", "Enterprise Solutions", "Data Annotation", "Voice Recognition", "Client Management", "Python"]
        }
      ]
    };

    // Return based on detail parameter
    if (detail === 'current') {
      return { experience: { current: experienceData.current } };
    } else if (detail === 'previous') {
      return { experience: { previous: experienceData.previous } };
    } else {
      return { experience: experienceData };
    }
  },
}); 