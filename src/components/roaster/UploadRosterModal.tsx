import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface UploadRosterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadRosterModal({ open, onOpenChange }: UploadRosterModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValidationResult(null);
    }
  };

  const handleValidate = () => {
    if (!file) return;

    // Simulate validation
    setTimeout(() => {
      const isValid = Math.random() > 0.3;
      setValidationResult({
        valid: isValid,
        errors: isValid
          ? []
          : [
              'Missing required column: Agent Name',
              'Invalid shift code on row 15',
              'Date format incorrect on row 23',
            ],
      });
    }, 1000);
  };

  const handleUpload = async () => {
    if (!file || !validationResult?.valid) return;

    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: 'Success',
        description: 'Roster uploaded successfully',
      });
      onOpenChange(false);
      setFile(null);
      setValidationResult(null);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-h3 font-medium text-card-foreground">Upload Roster</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a CSV file containing roster data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Input */}
          <div className="space-y-4">
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-8 transition-colors hover:bg-muted"
            >
              <Upload className="mb-4 h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-sm font-medium text-foreground">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">CSV files only</p>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {file && !validationResult && (
              <Button
                onClick={handleValidate}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <FileText className="mr-2 h-5 w-5" strokeWidth={1.5} />
                Validate File
              </Button>
            )}
          </div>

          {/* Validation Result */}
          {validationResult && (
            <div
              className={`rounded-lg border p-4 ${
                validationResult.valid
                  ? 'border-success bg-success/10'
                  : 'border-error bg-error/10'
              }`}
            >
              <div className="flex items-start gap-3">
                {validationResult.valid ? (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" strokeWidth={1.5} />
                ) : (
                  <AlertCircle className="h-5 w-5 text-error flex-shrink-0" strokeWidth={1.5} />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {validationResult.valid
                      ? 'Validation Successful'
                      : 'Validation Failed'}
                  </p>
                  {!validationResult.valid && (
                    <ul className="mt-2 space-y-1 text-sm text-foreground">
                      {validationResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {validationResult?.valid && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {uploading ? 'Uploading...' : 'Upload Roster'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
