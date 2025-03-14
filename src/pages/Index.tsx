
import React, { useState } from "react";
import { Shield, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageUploader from "@/components/ImageUploader";
import AnalysisResult, { AnalysisResultData } from "@/components/AnalysisResult";
import DeepfakeInfo from "@/components/DeepfakeInfo";

// Mock deepfake detection analysis function
// In a real implementation, this would use actual ML models
const analyzeImage = async (image: File): Promise<AnalysisResultData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // For demo purposes, generate a random score
  // In a real implementation, this would be the actual deepfake detection score
  const isDeepfake = Math.random() > 0.5;
  
  // Generate a score leaning toward the chosen result
  const baseScore = isDeepfake ? 
    0.65 + (Math.random() * 0.35) : 
    Math.random() * 0.45;
  
  return {
    score: baseScore,
    confidence: 0.7 + (Math.random() * 0.3),
    features: [
      {
        name: "Facial Inconsistencies",
        value: isDeepfake ? 0.7 + (Math.random() * 0.3) : Math.random() * 0.4,
        description: "Analysis of facial features for unnatural distortions and asymmetry."
      },
      {
        name: "Blending Artifacts",
        value: isDeepfake ? 0.6 + (Math.random() * 0.3) : Math.random() * 0.5,
        description: "Detection of artifacts at boundaries where synthetic elements are merged."
      },
      {
        name: "Texture Coherence",
        value: isDeepfake ? 0.5 + (Math.random() * 0.3) : Math.random() * 0.4,
        description: "Evaluation of skin texture and detail consistency throughout the image."
      },
      {
        name: "Color Consistency",
        value: isDeepfake ? 0.4 + (Math.random() * 0.5) : Math.random() * 0.3,
        description: "Analysis of color and lighting patterns that may indicate manipulation."
      }
    ]
  };
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);
      
      toast({
        title: result.score > 0.5 ? "Potential deepfake detected" : "Image appears authentic",
        description: `Analysis complete with ${Math.round(result.confidence * 100)}% confidence.`,
        variant: result.score > 0.5 ? "destructive" : "default"
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-cyber" />
            <h1 className="text-xl font-bold tracking-tight">DeepFake Detector</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/your-username/deepfake-detector" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Intro Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber to-blue-500 bg-clip-text text-transparent">
              Open-Source Deepfake Detection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload an image to analyze it for potential AI manipulation 
              and get detailed insights into the authenticity of the content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Upload & Analyze */}
            <div className="space-y-6">
              <div className="cyberbox p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                <ImageUploader onImageSelected={handleImageSelected} />
                
                <div className="mt-6">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </Button>
                </div>
              </div>
              
              <DeepfakeInfo />
            </div>
            
            {/* Right Column: Results */}
            <div>
              <AnalysisResult 
                result={analysisResult} 
                isLoading={isAnalyzing} 
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Open-source deepfake detection tool. For educational purposes only. Results should not be considered definitive proof of manipulation.
            </p>
            <p className="mt-2">
              &copy; {new Date().getFullYear()} Deepfake Detector Project | <a href="#" className="text-cyber hover:underline">Terms</a> | <a href="#" className="text-cyber hover:underline">Privacy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
