"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ReportTemplates() {
  const templates = [
    {
      id: "compliance-summary",
      name: "Compliance Summary Report",
      description: "Executive summary of code compliance status across all disciplines",
      format: "PDF",
      sections: ["Executive Summary", "Compliance Overview", "Critical Issues", "Recommendations"],
      estimatedPages: "8-12 pages",
      useCase: "Client presentations and regulatory submissions",
      popular: true,
    },
    {
      id: "technical-specifications",
      name: "Technical Specifications",
      description: "Detailed technical documentation with calculations and equipment schedules",
      format: "PDF + Excel",
      sections: ["System Specifications", "Load Calculations", "Equipment Schedules", "Technical Drawings"],
      estimatedPages: "15-25 pages",
      useCase: "Construction documentation and contractor coordination",
      popular: false,
    },
    {
      id: "issue-tracking",
      name: "Issue Tracking Report",
      description: "Comprehensive list of identified issues with resolution status and assignments",
      format: "Excel + CSV",
      sections: ["Issue Summary", "Priority Matrix", "Assignment Tracking", "Resolution Timeline"],
      estimatedPages: "Data tables",
      useCase: "Project management and team coordination",
      popular: true,
    },
    {
      id: "energy-analysis",
      name: "Energy Efficiency Analysis",
      description: "ASHRAE 90.1 compliance analysis with energy modeling results",
      format: "PDF",
      sections: ["Energy Overview", "ASHRAE Compliance", "Efficiency Recommendations", "Cost Analysis"],
      estimatedPages: "10-15 pages",
      useCase: "Energy code compliance and sustainability reporting",
      popular: false,
    },
    {
      id: "peer-review",
      name: "Peer Review Package",
      description: "Complete design review package for third-party engineering review",
      format: "PDF + CAD",
      sections: ["Design Summary", "Compliance Checklist", "Calculation Sheets", "Drawing Package"],
      estimatedPages: "20-30 pages",
      useCase: "Third-party reviews and quality assurance",
      popular: false,
    },
    {
      id: "client-presentation",
      name: "Client Presentation",
      description: "Executive-level presentation with key findings and visual summaries",
      format: "PDF + PowerPoint",
      sections: ["Project Overview", "Key Findings", "Visual Summaries", "Next Steps"],
      estimatedPages: "12-18 slides",
      useCase: "Client meetings and project updates",
      popular: true,
    },
  ]

  const handleUseTemplate = (templateId: string) => {
    console.log("Using template:", templateId)
    // This would populate the export dashboard with template settings
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-semibold text-xl">Report Templates</CardTitle>
        <CardDescription>Pre-configured report templates for common use cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 mb-1">{template.name}</h4>
                  {template.popular && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-2">Popular</Badge>
                  )}
                  <p className="text-sm text-slate-600">{template.description}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Format:</span>
                  <Badge variant="outline">{template.format}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Length:</span>
                  <span className="text-slate-900">{template.estimatedPages}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-700 mb-2">Included Sections:</p>
                <div className="flex flex-wrap gap-1">
                  {template.sections.map((section, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-slate-50">
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-md p-2">
                <p className="text-xs text-slate-600">
                  <span className="font-medium">Use Case:</span> {template.useCase}
                </p>
              </div>

              <Button
                onClick={() => handleUseTemplate(template.id)}
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
