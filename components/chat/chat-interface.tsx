"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp, Plus, FolderOpen } from "lucide-react"
import { FileSelector } from "./file-selector"
import { ProjectSelector } from "./project-selector"
import { BaseChatInterface, type Message, detectDiscipline } from "./base-chat-interface"

function generateAIResponse(inputValue: string, selectedFile: string | null, selectedProject: string | null): string {
  let context = ""
  if (selectedProject && selectedFile) {
    context = `Based on your ${selectedProject} project and ${selectedFile} file, `
  } else if (selectedProject) {
    context = `For your ${selectedProject} project, `
  } else if (selectedFile) {
    context = `Looking at your ${selectedFile} file, `
  }

  const responses = [
    `${context}I can help you analyze the HVAC system sizing and load calculations. The current design shows proper ductwork distribution with adequate CFM ratings for the space requirements.`,
    `${context}I've identified several compliance considerations for your electrical systems. The panel capacity appears sufficient, but I recommend reviewing the emergency lighting circuits for code compliance.`,
    `${context}The mechanical systems show good integration with the architectural layout. However, I notice some potential conflicts between the plumbing runs and structural elements that should be addressed.`,
    `${context}Your design meets most applicable building codes, but there are a few areas where energy efficiency could be improved. I can provide specific recommendations for equipment upgrades.`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

export function ChatInterface() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isProjectMinimized, setIsProjectMinimized] = useState(false)
  const [isFileMinimized, setIsFileMinimized] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    type: "",
    location: "",
    description: "",
    discipline: "",
  })
  const [isProjectPickerOpen, setIsProjectPickerOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your AI Design Assistant. I can help you analyze your CAD files, check compliance, identify potential issues, and answer technical questions about HVAC, Mechanical, and Electrical systems. Please select a project and CAD file to get started, or ask me a general question about design standards.\n\nYou can also drag and drop DXF files directly into this chat for instant analysis!",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = async (inputValue: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      fileContext: selectedFile || undefined,
      projectContext: selectedProject || undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, selectedFile, selectedProject)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        fileContext: selectedFile || undefined,
        projectContext: selectedProject || undefined,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleFileUpload = (fileList: File[]) => {
    const validFiles = fileList.filter(
      (file) => file.name.toLowerCase().endsWith(".dxf") && file.size <= 100 * 1024 * 1024,
    )

    if (validFiles.length === 0) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "system",
        content: "Please upload only DXF files under 100MB.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      return
    }

    const uploadedFiles: any[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
      discipline: detectDiscipline(file.name),
    }))

    const fileMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Uploaded ${validFiles.length} file(s)`,
      timestamp: new Date(),
      files: uploadedFiles,
    }

    setMessages((prev) => [...prev, fileMessage])

    uploadedFiles.forEach((file) => {
      simulateUpload(file.id)
    })

    setTimeout(() => {
      const aiResponse = generateAIResponse(
        `Analyze uploaded files: ${validFiles.map((f) => f.name).join(", ")}`,
        selectedFile,
        selectedProject,
      )
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Perfect! I've received your ${validFiles.length} CAD file(s). I'm now processing and analyzing the design elements. This includes:\n\n• Extracting geometric data\n• Identifying system components\n• Checking dimensional accuracy\n• Preparing for compliance review\n\nOnce processing is complete, I'll provide a detailed analysis and you can ask me specific questions about your design!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1500)
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15

      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          files: msg.files?.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
        })),
      )

      if (progress >= 100) {
        clearInterval(interval)
        setMessages((prev) =>
          prev.map((msg) => ({
            ...msg,
            files: msg.files?.map((file) =>
              file.id === fileId ? { ...file, status: "processing", progress: 100 } : file,
            ),
          })),
        )

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) => ({
              ...msg,
              files: msg.files?.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)),
            })),
          )
        }, 3000)
      }
    }, 200)
  }

  const leftSidebar = (
    <>
      <div
        className={`${isProjectMinimized ? "h-auto" : isFileMinimized ? "flex-1" : "h-1/2"} transition-all duration-200`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm text-slate-700">Select Project</h3>
          <div className="flex items-center space-x-1">
            <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-600"
                  title="Create New Project"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name *</Label>
                    <Input
                      id="project-name"
                      placeholder="e.g., Downtown Office Complex"
                      value={newProjectData.name}
                      onChange={(e) => setNewProjectData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select
                        value={newProjectData.type}
                        onValueChange={(value) => setNewProjectData((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-discipline">Primary Discipline</Label>
                      <Select
                        value={newProjectData.discipline}
                        onValueChange={(value) => setNewProjectData((prev) => ({ ...prev, discipline: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select discipline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hvac">HVAC</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="mechanical">Mechanical</SelectItem>
                          <SelectItem value="structural">Structural</SelectItem>
                          <SelectItem value="architectural">Architectural</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-location">Location</Label>
                    <Input
                      id="project-location"
                      placeholder="e.g., New York, NY"
                      value={newProjectData.location}
                      onChange={(e) => setNewProjectData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Brief project description..."
                      value={newProjectData.description}
                      onChange={(e) => setNewProjectData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (newProjectData.name.trim()) {
                          // Simulate project creation
                          const projectName = newProjectData.name
                          setSelectedProject(projectName)

                          // Add system message about project creation
                          const systemMessage: Message = {
                            id: Date.now().toString(),
                            type: "system",
                            content: `✅ New project "${projectName}" has been created successfully! You can now upload CAD files and start your design review.`,
                            timestamp: new Date(),
                          }
                          setMessages((prev) => [...prev, systemMessage])

                          // Reset form and close dialog
                          setNewProjectData({
                            name: "",
                            type: "",
                            location: "",
                            description: "",
                            discipline: "",
                          })
                          setIsCreateProjectOpen(false)
                        }
                      }}
                      disabled={!newProjectData.name.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProjectMinimized(!isProjectMinimized)}
              className="h-6 w-6 p-0 hover:bg-slate-100"
            >
              {isProjectMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {!isProjectMinimized && (
          <div className="h-full">
            <ProjectSelector selectedProject={selectedProject} onProjectSelect={setSelectedProject} />
          </div>
        )}
      </div>

      <div
        className={`${isFileMinimized ? "h-auto" : isProjectMinimized ? "flex-1" : "h-1/2"} transition-all duration-200`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm text-slate-700">Select CAD File</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFileMinimized(!isFileMinimized)}
            className="h-6 w-6 p-0 hover:bg-slate-100"
          >
            {isFileMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        {!isFileMinimized && (
          <div className="h-full">
            <FileSelector selectedFile={selectedFile} onFileSelect={setSelectedFile} />
          </div>
        )}
      </div>
    </>
  )

  const headerBadge = (
    <>
      {selectedProject && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Project: {selectedProject}
        </Badge>
      )}
      {selectedFile && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Analyzing: {selectedFile}
        </Badge>
      )}
    </>
  )

  const leftInputButton = (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsProjectPickerOpen(!isProjectPickerOpen)}
        className="h-12 px-3 border-slate-300 hover:bg-slate-50"
        title="Add existing project to conversation"
      >
        <FolderOpen className="h-4 w-4" />
      </Button>

      {isProjectPickerOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-slate-200">
            <h4 className="font-medium text-sm text-slate-900">Add Existing Project</h4>
            <p className="text-xs text-slate-600">Select a project to add to this conversation</p>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {[
              { id: "1", name: "Downtown Office Complex", type: "Commercial", status: "Active" },
              { id: "2", name: "Hospital Wing Expansion", type: "Healthcare", status: "In Review" },
              { id: "3", name: "Residential Tower A", type: "Residential", status: "Active" },
              { id: "4", name: "Manufacturing Facility", type: "Industrial", status: "Completed" },
              { id: "5", name: "University Library", type: "Educational", status: "Active" },
            ].map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.name)}
                className="w-full text-left p-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{project.name}</p>
                    <p className="text-xs text-slate-600">{project.type}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ml-2 ${
                      project.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : project.status === "In Review"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProjectPickerOpen(false)}
              className="w-full text-xs text-slate-600"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <BaseChatInterface
      title="AI Design Assistant"
      subtitle="Ask questions about your projects and CAD files to get detailed technical analysis"
      initialMessages={messages}
      placeholder={
        selectedProject && selectedFile
          ? `Ask about ${selectedProject} - ${selectedFile}...`
          : selectedProject
            ? `Ask about ${selectedProject}...`
            : selectedFile
              ? `Ask about ${selectedFile}...`
              : "Describe your project or ask questions about your CAD files..."
      }
      onSendMessage={handleSendMessage}
      onFileUpload={handleFileUpload}
      isLoading={isLoading}
      headerBadge={headerBadge}
      leftSidebar={leftSidebar}
      leftInputButton={leftInputButton}
      footerText="Press Enter to send, Shift+Enter for new line • Drag and drop DXF files anywhere • Click 📁 to add existing projects • Powered by AI"
    />
  )
}
