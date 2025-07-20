import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'GenBI.co',
    description:
      'AI-powered business intelligence platform that transforms data into actionable insights using natural language processing. Built with advanced LLM agents and real-time data processing capabilities.',
    techStack: [
      'AI',
      'Business Intelligence',
      'NLP',
      'Data Analytics',
      'LLM Agents',
      'Real-time Processing'
    ],
    date: '2024',
    links: [
      {
        name: 'website',
        url: 'https://genbi.co',
      },
      {
        name: 'Demo Video',
        url: 'https://youtu.be/0F-Hx1s4-O8',
      }
    ],
    images: [
      {
        src: 'https://img.youtube.com/vi/0F-Hx1s4-O8/hqdefault.jpg',
        alt: 'GenBI.co platform interface',
      }
    ],
  },
  {
    title: 'PromptBud.com',
    description:
      'Advanced prompt engineering platform for optimizing and managing AI model interactions. Features comprehensive prompt debugging, version control, and performance analytics.',
    techStack: [
      'AI',
      'Prompt Engineering',
      'LLM',
      'Productivity',
      'Chrome Extension',
      'Analytics'
    ],
    date: '2024',
    links: [
      {
        name: 'website',
        url: 'https://promtbud.com/',
      },
      {
        name: 'Demo Video',
        url: 'https://youtu.be/7o6WcZ58DH4',
      }
    ],
    images: [
      {
        src: 'https://img.youtube.com/vi/7o6WcZ58DH4/hqdefault.jpg',
        alt: 'PromptBud.com interface',
      }
    ],
  },
  {
    title: 'NLMDB',
    description:
      'Python package for efficient natural language model database management and fine-tuning. Provides comprehensive tools for LLM development and deployment.',
    techStack: [
      'Python',
      'NLP',
      'Database',
      'Machine Learning',
      'LangChain',
      'PyPI Package'
    ],
    date: '2024',
    links: [
      {
        name: 'PyPI',
        url: 'https://pypi.org/project/nlmdb',
      },
      {
        name: 'Documentation',
        url: 'https://pypi.org/project/nlmdb',
      }
    ],
    images: [
      {
        src: '/nlmdb.png',
        alt: 'NLMDB package interface',
      }
    ],
  },
  {
    title: 'RAG Chat Bot for Research Computing Documentation',
    description:
      'Developed a conversational AI chatbot leveraging Retrieval-Augmented Generation (RAG) for accessing research documents. Combined Azure, Airflow, and MLflow for data collection, automated pipeline operations, and model version control.',
    techStack: [
      'RAG',
      'Azure',
      'Airflow',
      'MLflow',
      'NLP',
      'Chatbot'
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Santosh2904/AskRC.git',
      },
      {
        name: 'Demo',
        url: '#',
      }
    ],
    images: [
      {
        src: '/project2.jpeg',
        alt: 'RAG Chat Bot interface',
      }
    ],
  },
  {
    title: 'Resume Analyzer and Customized Job searching AI',
    description:
      'Resume Analyzer is an interactive Streamlit application designed to help job seekers analyze their resumes and find relevant job opportunities on LinkedIn. By uploading a PDF resume, the app extracts key information, identifies relevant keywords, and uses them to search for job postings based on experience level and posting date.',
    techStack: [
      'GenAI',
      'Data extraction',
      'Feature extraction',
      'NLP',
      'Streamlit',
      'Python'
    ],
    date: '2025',
    links: [
      {
        name: 'Live Demo',
        url: 'https://resumeanalyserai-5macukroinbruyjur8nexx.streamlit.app/',
      },
      {
        name: 'GitHub',
        url: '#',
      }
    ],
    images: [
      {
        src: '/RA.png',
        alt: 'Resume Analyzer interface',
      }
    ],
  },
  {
    title: 'Real-Time Plate Number Detection',
    description:
      'Detect license plates from video streams or images, segment individual characters from the detected plate, and recognize the characters using a trained SVM model to output the complete license plate number.',
    techStack: [
      'OpenCV',
      'Deep Learning',
      'PyTorch',
      'Scikit Learn',
      'Computer Vision'
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Rakshith2605/Real-TimePlateNumberDetection',
      },
      {
        name: 'Demo Video',
        url: '#',
      }
    ],
    images: [
      {
        src: '/numberplate.jpg',
        alt: 'License plate detection interface',
      }
    ],
  },
  {
    title: 'CNN based Road Sign Recognition',
    description:
      'Developed a CNN-based AI system for accurate road sign recognition using Python and TensorFlow. Employed data augmentation techniques to improve model generalization and simulate real-world conditions.',
    techStack: [
      'CNN',
      'TensorFlow',
      'Computer Vision',
      'Transfer Learning',
      'Data Augmentation'
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Rakshith2605/CNN-based-Road-Sign-Recognition.git',
      },
      {
        name: 'Demo',
        url: '#',
      }
    ],
    images: [
      {
        src: '/trafficsign.jpeg',
        alt: 'Road sign recognition interface',
      }
    ],
  },
  {
    title: 'Weather Forecasting Model Using LSTMs',
    description:
      'This project develops an LSTM-based model using NOAA data to predict weather parameters like temperature and wind speed, emphasizing deep learning\'s effectiveness in forecasting through data preprocessing, model tuning, and evaluation using MSE and MAE metrics.',
    techStack: [
      'Azure ML',
      'Databricks',
      'ETL',
      'Power BI',
      'Predictive Analytics',
      'LSTM'
    ],
    date: '2025',
    links: [
      {
        name: 'Demo',
        url: 'https://example.com/weather-analysis',
      },
      {
        name: 'GitHub',
        url: '#',
      }
    ],
    images: [
      {
        src: '/weather.jpg',
        alt: 'Weather forecasting interface',
      }
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'AI Platform',
    title: 'GenBI.co',
    src: 'https://img.youtube.com/vi/0F-Hx1s4-O8/hqdefault.jpg',
    content: <ProjectContent project={{ title: 'GenBI.co' }} />,
  },
  {
    category: 'Developer Tool',
    title: 'PromptBud.com',
    src: 'https://img.youtube.com/vi/7o6WcZ58DH4/hqdefault.jpg',
    content: <ProjectContent project={{ title: 'PromptBud.com' }} />,
  },
  {
    category: 'Open Source',
    title: 'NLMDB',
    src: '/nlmdb.png',
    content: <ProjectContent project={{ title: 'NLMDB' }} />,
  },
  {
    category: 'Research AI',
    title: 'RAG Chat Bot for Research Computing Documentation',
    src: '/project2.jpeg',
    content: <ProjectContent project={{ title: 'RAG Chat Bot for Research Computing Documentation' }} />,
  },
  {
    category: 'AI Application',
    title: 'Resume Analyzer and Customized Job searching AI',
    src: '/RA.png',
    content: <ProjectContent project={{ title: 'Resume Analyzer and Customized Job searching AI' }} />,
  },
  {
    category: 'Computer Vision',
    title: 'Real-Time Plate Number Detection',
    src: '/numberplate.jpg',
    content: <ProjectContent project={{ title: 'Real-Time Plate Number Detection' }} />,
  },
  {
    category: 'Computer Vision',
    title: 'CNN based Road Sign Recognition',
    src: '/trafficsign.jpeg',
    content: <ProjectContent project={{ title: 'CNN based Road Sign Recognition' }} />,
  },
  {
    category: 'Predictive Analytics',
    title: 'Weather Forecasting Model Using LSTMs',
    src: '/weather.jpg',
    content: <ProjectContent project={{ title: 'Weather Forecasting Model Using LSTMs' }} />,
  },
];
