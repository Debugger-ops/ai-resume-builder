"use client";
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Globe, Copy, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ImportDialogProps {
  onImport: (data: any) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ onImport }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        onImport(data);
        toast({
          title: "Import Successful",
          description: "Your resume data has been imported successfully.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid JSON format. Please check your file.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const handleLinkedInImport = async () => {
    setIsImporting(true);
    
    // Simulate LinkedIn import
    setTimeout(() => {
      const mockData = {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          location: 'San Francisco, CA',
          linkedin: linkedinUrl,
          summary: 'Experienced software engineer with 5+ years in full-stack development'
        },
        experience: [{
          id: '1',
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          startDate: '2020-01',
          endDate: '',
          description: 'Led development of scalable web applications using React and Node.js'
        }],
        education: [{
          id: '1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-05'
        }],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
      };
      
      onImport(mockData);
      setIsImporting(false);
      toast({
        title: "LinkedIn Import Successful",
        description: "Your LinkedIn profile data has been imported.",
      });
    }, 2000);
  };

  const handleJsonImport = () => {
    try {
      const data = JSON.parse(jsonData);
      onImport(data);
      toast({
        title: "JSON Import Successful",
        description: "Your resume data has been imported from JSON.",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid JSON format. Please check your data.",
        variant: "destructive"
      });
    }
  };

  const exportSampleJson = () => {
    const sampleData = {
      personalInfo: {
        fullName: "Your Name",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "City, State",
        summary: "Your professional summary here"
      },
      experience: [{
        id: "1",
        company: "Company Name",
        position: "Job Title",
        startDate: "2020-01",
        endDate: "2023-12",
        description: "Job description",
        achievements: ["Achievement 1", "Achievement 2"]
      }],
      education: [{
        id: "1",
        institution: "University Name",
        degree: "Degree Type",
        field: "Field of Study",
        startDate: "2016-09",
        endDate: "2020-05"
      }],
      skills: ["Skill 1", "Skill 2", "Skill 3"]
    };

    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-template.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl">
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="file">File Upload</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="json">JSON Data</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Upload Resume File</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a JSON file containing your resume data
                </p>
              </div>
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">JSON files only</p>
                    </div>
                  </div>
                </Label>
              </div>
              <Button onClick={exportSampleJson} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Import from LinkedIn</h3>
                <p className="text-sm text-gray-600">
                  Enter your LinkedIn profile URL to import your professional information
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin-url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <Button 
                onClick={handleLinkedInImport}
                disabled={!linkedinUrl || isImporting}
                className="w-full"
              >
                {isImporting ? 'Importing...' : 'Import from LinkedIn'}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                This is a demo feature. In production, this would connect to LinkedIn's API.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="json" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Copy className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Paste JSON Data</h3>
                <p className="text-sm text-gray-600">
                  Paste your resume data in JSON format
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="json-data">JSON Data</Label>
                <textarea
                  id="json-data"
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none text-sm font-mono"
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder="Paste your JSON data here..."
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleJsonImport}
                  disabled={!jsonData.trim()}
                  className="flex-1"
                >
                  Import JSON
                </Button>
                <Button onClick={exportSampleJson} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Sample
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportDialog;
