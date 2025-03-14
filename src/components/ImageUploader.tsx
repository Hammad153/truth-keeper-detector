
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  className 
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const file = acceptedFiles[0];
      if (file.type.startsWith("image/")) {
        onImageSelected(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxSize: 10485760, // 10MB
    maxFiles: 1
  });

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "cyberbox flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300",
            "border-2 border-dashed border-cyber/40 hover:border-cyber",
            isDragActive ? "border-cyber bg-cyber/10" : "",
            "min-h-[280px]"
          )}
        >
          <input {...getInputProps()} />
          <Upload 
            className={cn(
              "w-16 h-16 mb-4 transition-colors duration-300",
              isDragActive ? "text-cyber" : "text-muted-foreground"
            )} 
          />
          <p className="text-lg font-medium mb-2">
            {isDragActive 
              ? "Drop the image here..." 
              : "Drag & drop an image here"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            or click to select a file
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WebP (Max: 10MB)
          </p>
        </div>
      ) : (
        <div className="relative cyberbox overflow-hidden rounded-lg">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full object-contain max-h-[480px]" 
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
