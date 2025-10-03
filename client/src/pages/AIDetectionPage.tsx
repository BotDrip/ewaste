import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, Sparkles } from 'lucide-react';

export function AIDetectionPage() {
  const { toast } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isDetecting, setIsDetecting] = React.useState(false);
  const [detectionResult, setDetectionResult] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDetectionResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select an image file to detect.',
        variant: 'destructive',
      });
      return;
    }

    setIsDetecting(true);
    setDetectionResult(null);
    const formData = new FormData();
    formData.append('ewasteImage', file);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to detect e-waste');
      }

      const result = await response.json();
      setDetectionResult(result.message);
      toast({
        title: 'Detection Complete!',
        description: result.message,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'There was a problem detecting the e-waste.',
        variant: 'destructive',
      });
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">AI E-Waste Detection</h2>
        <p className="text-muted-foreground">
          Upload an image of an electronic item to identify it. (This is a simulation)
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Our AI will try to identify the type of e-waste from your image.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ewaste-image" className="sr-only">E-Waste Image</Label>
              <div className="flex w-full items-center justify-center">
                <label htmlFor="ewaste-image" className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card hover:bg-secondary/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
                    </div>
                    <Input id="ewaste-image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div> 
            </div>

            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-center mb-2">Image Preview:</p>
                <img src={preview} alt="E-waste preview" className="mx-auto max-h-60 rounded-md shadow-md" />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isDetecting || !file}>
              {isDetecting ? 'Detecting...' : <> <Sparkles className="mr-2 h-4 w-4" /> Detect E-Waste </>}
            </Button>

            {detectionResult && (
              <div className="mt-6 rounded-md border border-primary/20 bg-primary/10 p-4 text-center">
                <p className="font-semibold text-lg text-primary">{detectionResult}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
