
import React, { useState, useRef, ChangeEvent } from "react";
import { Camera, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageDataUrl: string) => void;
  currentImage?: string;
}

export function ProfileImageModal({
  isOpen,
  onClose,
  onSave,
  currentImage
}: ProfileImageModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setPosition({ x: 0, y: 0 });
        setScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - lastPositionRef.current.x;
    const deltaY = e.clientY - lastPositionRef.current.y;
    
    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const handleZoom = (factor: number) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + factor)));
  };

  const handleSave = () => {
    if (!cropAreaRef.current || !imageRef.current) return;
    
    const cropArea = cropAreaRef.current.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    
    const img = imageRef.current;
    
    // Draw only the visible portion of the image to the canvas
    ctx.drawImage(
      img,
      (cropArea.width / 2 - position.x) / scale - img.width / 2 / scale,
      (cropArea.height / 2 - position.y) / scale - img.height / 2 / scale,
      img.width / scale,
      img.height / scale
    );
    
    const croppedImageDataUrl = canvas.toDataURL('image/png');
    onSave(croppedImageDataUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Imagem de Perfil</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {!image ? (
            <div 
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-12 w-12 mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-600 mb-1">Clique ou arraste uma imagem</p>
              <p className="text-xs text-slate-500">PNG, JPG, GIF (máx. 2MB)</p>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div 
                  ref={cropAreaRef}
                  className="overflow-hidden rounded-full w-24 h-24 border border-slate-300"
                >
                  <div
                    className="relative w-full h-full cursor-move"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                  >
                    <img
                      ref={imageRef}
                      src={image}
                      alt="Preview"
                      className="absolute transform origin-center"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        touchAction: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(-0.1)}
                >
                  -
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(0.1)}
                >
                  +
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImage(null);
                    setPosition({ x: 0, y: 0 });
                    setScale(1);
                  }}
                >
                  <X size={16} className="mr-1" /> Remover
                </Button>
              </div>
              
              <div className="flex justify-center">
                <p className="text-xs text-slate-500">
                  Arraste a imagem para posicionar e use os botões para ajustar o zoom
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-brand-teal hover:opacity-90"
            onClick={handleSave}
            disabled={!image}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
