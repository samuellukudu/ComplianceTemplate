"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, HelpCircle, Building, User, MapPin } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: "cad" | "building-code"
  status: "uploading" | "completed" | "error"
  progress: number
}

export function ProjectSetupForm() {
  const [projectData, setProjectData] = useState({
    name: "",
    location: "",
    architect: "",
    client: "",
    type: "",
    discipline: "",
    description: "",
  })

  const [cadFiles, setCadFiles] = useState<UploadedFile[]>([])
  const [buildingCodeFiles, setBuildingCodeFiles] = useState<UploadedFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null, type: "cad" | "building-code") => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type,
      status: "uploading",
      progress: 0,
    }))

    if (type === "cad") {
      setCadFiles((prev) => [...prev, ...newFiles])
    } else {
      setBuildingCodeFiles((prev) => [...prev, ...newFiles])
    }

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id, type)
    })
  }

  const simulateUpload = (fileId: string, type: "cad" | "building-code") => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20

      const updateFiles = (files: UploadedFile[]) =>
        files.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file))

      if (type === "cad") {
        setCadFiles(updateFiles)
      } else {
        setBuildingCodeFiles(updateFiles)
      }

      if (progress >= 100) {
        clearInterval(interval)

        const completeFiles = (files: UploadedFile[]) =>
          files.map((file) => (file.id === fileId ? { ...file, status: "completed", progress: 100 } : file))

        if (type === "cad") {
          setCadFiles(completeFiles)
        } else {
          setBuildingCodeFiles(completeFiles)
        }
      }
    }, 300)
  }

  const removeFile = (fileId: string, type: "cad" | "building-code") => {
    if (type === "cad") {
      setCadFiles((prev) => prev.filter((file) => file.id !== fileId))
    } else {
      setBuildingCodeFiles((prev) => prev.filter((file) => file.id !== fileId))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate project creation
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically redirect to the project dashboard
      console.log("Project created:", { projectData, cadFiles, buildingCodeFiles })
    }, 2000)
  }

  const isFormValid =
    projectData.name &&
    projectData.location &&
    projectData.architect &&
    projectData.type &&
    projectData.discipline &&
    cadFiles.length > 0

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-serif font-bold text-3xl text-primary">Project Setup</h1>
          <p className="text-muted-foreground text-lg">
            Create a new architectural design review project with CAD files and building codes
          </p>
        </div>

        {/* Project Details Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-card-foreground">
              <Building className="h-5 w-5" />
              Project Details
            </CardTitle>
            <CardDescription>Provide basic information about your architectural project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-foreground font-medium">
                  Project Name *
                </Label>
                <Input
                  id="project-name"
                  placeholder="e.g., Downtown Office Complex"
                  value={projectData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={projectData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="architect" className="text-foreground font-medium flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Architect Name *
                </Label>
                <Input
                  id="architect"
                  placeholder="e.g., John Smith, AIA"
                  value={projectData.architect}
                  onChange={(e) => handleInputChange("architect", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client" className="text-foreground font-medium">
                  Client Name
                </Label>
                <Input
                  id="client"
                  placeholder="e.g., ABC Corporation"
                  value={projectData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type" className="text-foreground font-medium">
                  Project Type *
                </Label>
                <Select value={projectData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="bg-input border-border focus:ring-ring">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial Building</SelectItem>
                    <SelectItem value="residential">Residential Complex</SelectItem>
                    <SelectItem value="industrial">Industrial Facility</SelectItem>
                    <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                    <SelectItem value="educational">Educational Building</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discipline" className="text-foreground font-medium">
                  Primary Discipline *
                </Label>
                <Select
                  value={projectData.discipline}
                  onValueChange={(value) => handleInputChange("discipline", value)}
                >
                  <SelectTrigger className="bg-input border-border focus:ring-ring">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="structural">Structural</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground font-medium">
                Project Description
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the project scope and objectives..."
                value={projectData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="bg-input border-border focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* CAD Files Upload Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-card-foreground">
              <FileText className="h-5 w-5" />
              CAD Files Upload *
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload DXF, DWG, or other CAD files for design review</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>Upload your architectural drawings and CAD files for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer"
              onDrop={(e) => {
                e.preventDefault()
                handleFileUpload(e.dataTransfer.files, "cad")
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("cad-upload")?.click()}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Drop CAD files here or click to browse</h3>
              <p className="text-sm text-muted-foreground mb-4">Supports DXF, DWG files up to 100MB each</p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Select Files
              </Button>
              <input
                id="cad-upload"
                type="file"
                multiple
                accept=".dxf,.dwg"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, "cad")}
              />
            </div>

            {cadFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-foreground">Uploaded CAD Files</h4>
                {cadFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="h-5 w-5 text-accent" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        {file.status === "uploading" && <Progress value={file.progress} className="mt-2 h-2" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {file.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id, "cad")}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Building Codes Upload Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-card-foreground">
              <FileText className="h-5 w-5" />
              Building Codes Upload
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Optional
              </Badge>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload relevant building codes and standards for compliance checking</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Upload building codes and standards documents for enhanced compliance checking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer"
              onDrop={(e) => {
                e.preventDefault()
                handleFileUpload(e.dataTransfer.files, "building-code")
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("codes-upload")?.click()}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Drop building code files here or click to browse</h3>
              <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, DOCX files up to 50MB each</p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Select Files
              </Button>
              <input
                id="codes-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, "building-code")}
              />
            </div>

            {buildingCodeFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-foreground">Uploaded Building Codes</h4>
                {buildingCodeFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="h-5 w-5 text-accent" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        {file.status === "uploading" && <Progress value={file.progress} className="mt-2 h-2" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {file.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id, "building-code")}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Section */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            Save as Draft
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-32"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
