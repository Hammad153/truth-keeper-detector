
import React from "react";
import { Info, AlertTriangle, ShieldCheck, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface DeepfakeInfoProps {
  className?: string;
}

const DeepfakeInfo: React.FC<DeepfakeInfoProps> = ({ className }) => {
  return (
    <div className={cn("cyberbox p-6", className)}>
      <div className="flex items-center mb-4">
        <Info className="w-5 h-5 text-cyber mr-2" />
        <h2 className="text-xl font-semibold">About Deepfake Detection</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-are-deepfakes">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
              What are deepfakes?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Deepfakes are synthetic media where a person's likeness is replaced with someone else's using 
              artificial intelligence techniques called deep learning. They can manipulate faces, voices, 
              and even entire bodies to create realistic but fabricated content.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="how-detection-works">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
              How does detection work?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Deepfake detection typically analyzes visual inconsistencies that are difficult for AI to 
              perfectly recreate. This includes examining blending boundaries, facial inconsistencies, 
              unnatural blinking patterns, and artifacts in specific frequency domains. Modern detectors 
              use neural networks trained on both real and fake content.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="limitations">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
              Limitations of detection
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              No deepfake detector is 100% accurate. As generation technology improves, detection becomes 
              more challenging. Low-resolution images, compressed content, and sophisticated deepfakes can 
              evade detection. Results should always be interpreted cautiously and verified using multiple 
              detection methods.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="open-source">
          <AccordionTrigger className="text-left">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-cyber" />
              About this open-source project
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              This tool is an open-source project designed to help identify potentially manipulated media.
              It combines various detection algorithms to analyze images for signs of AI manipulation.
              As an open-source initiative, we welcome contributions to improve detection accuracy and 
              stay ahead of advancing deepfake technology.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DeepfakeInfo;
