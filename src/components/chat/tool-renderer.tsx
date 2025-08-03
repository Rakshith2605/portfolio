// src/components/chat/tool-renderer.tsx
import { Contact } from '../contact';
import Crazy from '../crazy';
import Experience from '../experience';
import InternshipCard from '../InternshipCard';
import Me from '../me';
import { Presentation } from '../presentation';
import AllProjects from '../projects/AllProjects';
import AllProducts from '../projects/AllProducts';
import RCB from '../rcb';
import Resume from '../resume';
import Skills from '../skills';
import Sports from '../sport';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';

// Web Search Result Component
const WebSearchResult = ({ result }: { result: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full overflow-hidden rounded-lg border bg-secondary/10"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-secondary/20 transition-colors">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Web Search</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            Results
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="border-t bg-background/50 p-4">
          <div className="prose dark:prose-invert max-w-none text-sm">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">
              {result}
            </pre>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
  messageId,
}: ToolRendererProps) {
  return (
    <div className="w-full transition-all duration-300">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg p-2"
              >
                <AllProjects />
              </div>
            );

          case 'getProducts':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg p-2"
              >
                <AllProducts />
              </div>
            );

          case 'getPresentation':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg p-2"
              >
                <Presentation />
              </div>
            );

          case 'getResume':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Resume />
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Contact />
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Skills />
              </div>
            );

          case 'getExperience':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Experience />
              </div>
            );

          case 'getSports':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Sports />
              </div>
            );

          case 'getCrazy':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Crazy />
              </div>
            );

          case 'getInternship':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <InternshipCard />
              </div>
            );

          case 'getMe':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <Me data={JSON.parse(tool.result).data} />
              </div>
            );

          case 'getRCB':
            return (
              <div key={toolCallId} className="w-full rounded-lg p-2">
                <RCB data={JSON.parse(tool.result).data} />
              </div>
            );

          case 'getWebSearch':
            return <WebSearchResult key={toolCallId} result={tool.result} />;

          // Default renderer for other tools
          default:
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{toolName}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  {typeof tool.result === 'object' ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
                  ) : (
                    <p>{String(tool.result)}</p>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
