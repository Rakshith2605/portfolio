import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Products content array
const PRODUCT_CONTENT = [
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
        src: '/genbi-logo.png',
        alt: 'GenBI.co platform logo',
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
        src: '/promptbudd.png',
        alt: 'PromptBud.com logo',
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
    title: 'ABAP Code Assistant',
    description:
      'AI-powered ABAP code assistant VS Code extension that provides code generation and debugging using Groq API and Llama 3.3 70B. Features ABAP code generation following SAP best practices, debug code generation, comment-based code generation, syntax highlighting, and keyboard shortcuts for quick access.',
    techStack: [
      'VS Code Extension',
      'ABAP',
      'SAP',
      'AI Code Generation',
      'Groq API',
      'Llama 3.3',
      'Debugging Tools'
    ],
    date: '2024',
    links: [
      {
        name: 'VS Code Marketplace',
        url: 'https://marketplace.visualstudio.com/items?itemName=dharmappar.abap-code-assistant',
      }
    ],
    images: [
      {
        src: '/abap.png',
        alt: 'ABAP Code Assistant VS Code extension',
      }
    ],
  },
];

// Define interface for product prop
interface ProductProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProductContent = ({ product }: { product: ProductProps }) => {
  // Find the matching product data
  const productData = PRODUCT_CONTENT.find((p) => p.title === product.title);

  if (!productData) {
    return <div>Product details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{productData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {productData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {productData.techStack.map((tech, index) => (
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
      {productData.links && productData.links.length > 0 && (
        <div className="rounded-3xl bg-[#F5F5F7] p-6 dark:bg-[#1D1D1F]">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {productData.links.map((link, index) => (
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
      {productData.images && productData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {productData.images.map((image, index) => (
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

// Products data export
export const productsData = [
  {
    category: 'AI Platform',
    title: 'GenBI.co',
    src: '/genbi-logo.png',
    content: <ProductContent product={{ title: 'GenBI.co' }} />,
  },
  {
    category: 'Developer Tool',
    title: 'PromptBud.com',
    src: '/promptbudd.png',
    content: <ProductContent product={{ title: 'PromptBud.com' }} />,
  },
  {
    category: 'Open Source',
    title: 'NLMDB',
    src: '/nlmdb.png',
    content: <ProductContent product={{ title: 'NLMDB' }} />,
  },
  {
    category: 'Developer Tool',
    title: 'ABAP Code Assistant',
    src: '/abap.png',
    content: <ProductContent product={{ title: 'ABAP Code Assistant' }} />,
  },
]; 