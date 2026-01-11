import { useRef, useState } from 'react';
import { Paperclip, X, FileIcon, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

export const FileUpload = ({
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt']
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setError('');

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Vous ne pouvez télécharger que ${maxFiles} fichiers maximum`);
      return;
    }

    const oversizedFiles = selectedFiles.filter(
      file => file.size > maxSizeMB * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      setError(`Certains fichiers dépassent la taille maximale de ${maxSizeMB}MB`);
      return;
    }

    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
    setError('');
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= maxFiles}
            className="cursor-pointer"
          >
            <Paperclip className="h-4 w-4 mr-2" />
            Joindre des fichiers
          </Button>
        </label>
        <span className="text-sm text-gray-500">
          {files.length}/{maxFiles} fichier{files.length > 1 ? 's' : ''}
        </span>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <span className="mr-2">⚠</span>
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const imageUrl = getFileIcon(file);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <FileIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-3 p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                  title="Supprimer le fichier"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formats acceptés: Images, PDF, Word, Excel, texte. Taille max: {maxSizeMB}MB par fichier.
      </p>
    </div>
  );
};
