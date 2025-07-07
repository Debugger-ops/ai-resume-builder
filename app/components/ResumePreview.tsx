"use client";
import React, { useRef } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Download, Eye } from 'lucide-react';
import { ResumeData } from '../start-building/page';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    try {
    const canvas = await html2canvas(previewRef.current!, {
  scale: 2,
  useCORS: true,
  allowTaint: true
} as Parameters<typeof html2canvas>[1]);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Card className="shadow-xl">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-700">Resume Preview</span>
        </div>
        <Button onClick={exportToPDF} size="sm" className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
      
      <div className="p-8 bg-white" ref={previewRef}>
        {/* Header Section */}
        {resumeData.personalInfo.fullName && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
            <div className="flex justify-center items-center gap-4 text-gray-600 text-sm">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <span 
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!resumeData.personalInfo.fullName && 
         resumeData.experience.length === 0 && 
         resumeData.education.length === 0 && 
         resumeData.skills.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Start building your resume to see the preview</p>
            <p className="text-sm mt-2">Fill in your information on the left to see it appear here</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
