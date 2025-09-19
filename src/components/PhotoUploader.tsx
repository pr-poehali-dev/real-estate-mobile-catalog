import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
}

interface PhotoUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number;
  existingFiles?: UploadedFile[];
}

const PhotoUploader = ({ onFilesUploaded, maxFiles = 10, existingFiles = [] }: PhotoUploaderProps) => {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (fileList: File[]) => {
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'));
    
    if (files.length + imageFiles.length > maxFiles) {
      alert(`Максимум ${maxFiles} фотографий`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      
      try {
        const uploadedFile = await simulateUpload(file);
        newFiles.push(uploadedFile);
        setUploadProgress(((i + 1) / imageFiles.length) * 100);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
    setUploading(false);
    setUploadProgress(0);
  };

  const simulateUpload = (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url,
          size: file.size
        });
      }, 1000);
    });
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        } ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={files.length < maxFiles ? onButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={files.length >= maxFiles}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Icon 
            name={uploading ? "Loader2" : "Upload"} 
            size={40} 
            className={`mb-4 text-muted-foreground ${uploading ? 'animate-spin' : ''}`} 
          />
          <h3 className="text-lg font-medium mb-2">
            {uploading ? 'Загружаем фотографии...' : 'Перетащите фото или нажмите для выбора'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Поддерживаются JPG, PNG, WebP до 5MB. Максимум {maxFiles} фото.
          </p>
          {!uploading && files.length < maxFiles && (
            <Button variant="outline" size="sm">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Выбрать файлы
            </Button>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center mt-2 text-muted-foreground">
              {Math.round(uploadProgress)}% загружено
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files Grid */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Загруженные фото ({files.length}/{maxFiles})</h4>
            {files.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setFiles([]);
                  onFilesUploaded([]);
                }}
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Очистить все
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="relative group">
                <CardContent className="p-2">
                  <div className="relative">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file.id)}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;