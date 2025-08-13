"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ExportDashboard() {
  const [selectedProject, setSelectedProject] = useState("downtown-office")
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["pdf"])
  const [selectedSections, setSelectedSections] = useState<string[]>(["compliance", "summary"])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const projects = [
    { id: "downtown-office", name: "Downtown Office Complex", files: 12, compliance: 82 },
    { id: "residential-tower", name: "Residential Tower - Phase 2", files: 8, compliance: 67 },
    { id: "manufacturing-facility", name: "Manufacturing Facility", files: 15, compliance: 95 },
  ]

  const exportFormats = [
    { id: "pdf", name: "PDF Report", description: "Professional compliance report", icon: "📄" },
    { id: "excel", name: "Excel Spreadsheet", description: "Data analysis and calculations", icon: "📊" },
    { id: "csv", name: "CSV Data", description: "Raw data for external tools", icon: "📋" },
    { id: "json", name: "JSON Export", description: "Structured data format", icon: "🔧" },
  ]

  const reportSections = [
    { id: "summary", name: "Executive Summary", description: "Project overview and key findings" },
    { id: "compliance", name: "Compliance Analysis", description: "Code compliance status and issues" },
    { id: "technical", name: "Technical Specifications", description: "Equipment and system details" },
    { id: "calculations", name: "Engineering Calculations", description: "Load calculations and sizing" },
    { id: "recommendations", name: "Recommendations", description: "Improvement suggestions" },
    { id: "appendix", name: "Appendices", description: "Supporting documents and references" },
  ]

  const handleFormatChange = (formatId: string, checked: boolean) => {
    if (checked) {
      setSelectedFormats([...selectedFormats, formatId])
    } else {
      setSelectedFormats(selectedFormats.filter((f) => f !== formatId))
    }
  }

  const handleSectionChange = (sectionId: string, checked: boolean) => {
    if (checked) {
      setSelectedSections([...selectedSections, sectionId])
    } else {
      setSelectedSections(selectedSections.filter((s) => s !== sectionId))
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          // Simulate download
          const link = document.createElement("a")
          link.href = "#"
          link.download = `${selectedProject}-report.pdf`
          link.click()
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const selectedProjectData = projects.find((p) => p.id === selectedProject)

  const generatePreviewContent = () => {
    const sections = reportSections.filter((section) => selectedSections.includes(section.id))
    const formats = exportFormats.filter((format) => selectedFormats.includes(format.id))

    return {
      project: selectedProjectData,
      sections,
      formats,
      estimatedPages: sections.length * 3 + 2,
      estimatedSize: `${(sections.length * 0.8 + 1.2).toFixed(1)} MB`,
    }
  }

  const previewData = generatePreviewContent()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-semibold text-xl">Generate Export</CardTitle>
        <CardDescription>Create custom reports and data exports for your projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="font-medium text-slate-700 mb-3 block">Select Project</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedProject === project.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <h4 className="font-medium text-sm text-slate-900 mb-1">{project.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{project.files} files</span>
                    <Badge
                      variant="outline"
                      className={
                        project.compliance >= 80
                          ? "bg-green-100 text-green-800 border-green-200"
                          : project.compliance >= 60
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {project.compliance}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-medium text-slate-700 mb-3 block">Export Formats</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <div key={format.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
                  <Checkbox
                    id={format.id}
                    checked={selectedFormats.includes(format.id)}
                    onCheckedChange={(checked) => handleFormatChange(format.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{format.icon}</span>
                      <Label htmlFor={format.id} className="font-medium text-slate-900 cursor-pointer">
                        {format.name}
                      </Label>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{format.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-medium text-slate-700 mb-3 block">Report Sections</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportSections.map((section) => (
                <div key={section.id} className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={(checked) => handleSectionChange(section.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={section.id} className="font-medium text-slate-900 cursor-pointer block">
                      {section.name}
                    </Label>
                    <p className="text-xs text-slate-600 mt-1">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date" className="font-medium text-slate-700">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="font-medium text-slate-700">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {isExporting && (
          <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-900">Generating Export...</span>
              <span className="text-sm text-blue-700">{Math.round(exportProgress)}%</span>
            </div>
            <Progress value={exportProgress} className="h-2" />
            <p className="text-sm text-blue-700">
              {exportProgress < 30
                ? "Collecting project data..."
                : exportProgress < 60
                  ? "Analyzing compliance status..."
                  : exportProgress < 90
                    ? "Generating report sections..."
                    : "Finalizing export..."}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            {selectedProjectData && (
              <>
                Selected: {selectedProjectData.name} • {selectedFormats.length} format(s) • {selectedSections.length}{" "}
                section(s)
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  disabled={selectedFormats.length === 0 || selectedSections.length === 0}
                >
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="font-serif font-semibold">Export Preview</DialogTitle>
                  <DialogDescription>
                    Preview of your export configuration for {previewData.project?.name}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-6 p-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Project Details</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            <strong>Name:</strong> {previewData.project?.name}
                          </p>
                          <p>
                            <strong>Files:</strong> {previewData.project?.files} CAD files
                          </p>
                          <p>
                            <strong>Compliance:</strong> {previewData.project?.compliance}%
                          </p>
                          <p>
                            <strong>Date Range:</strong> {dateRange.start || "All time"} - {dateRange.end || "Present"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Export Summary</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            <strong>Formats:</strong> {previewData.formats.map((f) => f.name).join(", ")}
                          </p>
                          <p>
                            <strong>Sections:</strong> {previewData.sections.length} sections
                          </p>
                          <p>
                            <strong>Est. Pages:</strong> {previewData.estimatedPages} pages
                          </p>
                          <p>
                            <strong>Est. Size:</strong> {previewData.estimatedSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900">Report Sections Preview</h4>
                      <div className="space-y-3">
                        {previewData.sections.map((section, index) => (
                          <div key={section.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-slate-800">
                                {index + 1}. {section.name}
                              </h5>
                              <Badge variant="outline" className="text-xs">
                                ~{Math.ceil(Math.random() * 4 + 1)} pages
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{section.description}</p>
                            <div className="bg-slate-50 rounded p-3 text-xs text-slate-500">
                              <div className="space-y-1">
                                <div className="h-2 bg-slate-200 rounded w-full"></div>
                                <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                                <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                              </div>
                              <p className="mt-2 text-center">Content preview</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900">Export Formats</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {previewData.formats.map((format) => (
                          <div
                            key={format.id}
                            className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg bg-slate-50"
                          >
                            <span className="text-lg">{format.icon}</span>
                            <div>
                              <p className="font-medium text-sm text-slate-900">{format.name}</p>
                              <p className="text-xs text-slate-600">{format.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPreview(false)
                      handleExport()
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Export
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleExport}
              disabled={selectedFormats.length === 0 || selectedSections.length === 0 || isExporting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isExporting ? "Generating..." : "Generate Export"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
