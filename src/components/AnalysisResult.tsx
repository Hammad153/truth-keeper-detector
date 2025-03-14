
import React from "react";
import { 
  AlertCircle, 
  CheckCircle2, 
  BarChart, 
  Info,
  Shield
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnalysisResultData {
  score: number;
  confidence: number;
  features: {
    name: string;
    value: number;
    description: string;
  }[];
}

interface AnalysisResultProps {
  result: AnalysisResultData | null;
  isLoading: boolean;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  isLoading,
  className 
}) => {
  if (isLoading) {
    return (
      <div className={cn("cyberbox p-6", className)}>
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-cyber/20 rounded-full animate-spin" 
                 style={{ borderTopColor: 'rgb(6, 182, 212)' }}></div>
            <Shield className="absolute inset-0 w-full h-full text-cyber/50 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold">Analyzing Image</h3>
          <p className="text-muted-foreground text-center">
            Running deepfake detection algorithms...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={cn("cyberbox p-6", className)}>
        <div className="flex flex-col items-center justify-center space-y-2 py-6">
          <Info className="w-12 h-12 text-muted-foreground mb-2" />
          <h3 className="text-xl font-semibold">No Analysis Yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Upload an image and click "Analyze" to check if it's a potential deepfake.
          </p>
        </div>
      </div>
    );
  }

  const isDeepfake = result.score > 0.5;
  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <div className={cn("cyberbox", className)}>
      <div className="p-6">
        <div className="flex flex-col">
          {/* Result Header */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-t-lg mb-6",
            isDeepfake ? "bg-destructive/20" : "bg-green-900/20"
          )}>
            <div className="flex items-center space-x-3">
              {isDeepfake ? (
                <AlertCircle className="w-8 h-8 text-destructive" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              )}
              <div>
                <h2 className="text-xl font-bold">
                  {isDeepfake ? "Potential Deepfake Detected" : "Likely Authentic Image"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Analysis completed with {confidencePercentage}% confidence
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {Math.round(result.score * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Manipulation score
              </div>
            </div>
          </div>

          {/* Primary Score Visualization */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Authentic</span>
              <span className="text-sm">Manipulated</span>
            </div>
            <div className="h-4 relative rounded-full overflow-hidden bg-muted">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  isDeepfake ? "bg-destructive" : "bg-green-500"
                )}
                style={{ width: `${Math.round(result.score * 100)}%` }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 bottom-0 w-[1px] bg-white/30" style={{ left: '25%' }}></div>
                <div className="absolute top-0 bottom-0 w-[1px] bg-white/30" style={{ left: '50%' }}></div>
                <div className="absolute top-0 bottom-0 w-[1px] bg-white/30" style={{ left: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Feature Analysis */}
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-cyber" />
            Feature Analysis
          </h3>

          <div className="space-y-4">
            {result.features.map((feature, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(feature.value * 100)}%
                  </div>
                </div>
                <Progress value={feature.value * 100} className="h-2" 
                  indicatorClassName={feature.value > 0.5 ? "bg-amber-500" : "bg-cyber"} />
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-muted/50 px-6 py-4 rounded-b-lg border-t border-border">
        <div className="text-sm text-muted-foreground">
          <strong>Note:</strong> This analysis is for educational purposes only. 
          Always verify results through multiple detection methods.
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
