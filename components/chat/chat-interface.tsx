"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp, Plus, FolderOpen } from "lucide-react"
import { FileSelector } from "./file-selector"
import { ProjectSelector } from "./project-selector"

interface Message {
  id: string
  type: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  fileContext?: string
  projectContext?: string
  files?: UploadedFile[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  discipline?: string
}

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your AI Design Assistant. I can help you analyze your CAD files, check compliance, identify potential issues, and answer technical questions about HVAC, Mechanical, and Electrical systems. Please select a project and CAD file to get started, or ask me a general question about design standards.\n\nYou can also drag and drop DXF files directly into this chat for instant analysis!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isProjectMinimized, setIsProjectMinimized] = useState(false)
  const [isFileMinimized, setIsFileMinimized] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    type: "",
    location: "",
    description: "",
    discipline: "",
  })
  const [isProjectPickerOpen, setIsProjectPickerOpen] = useState(false)

  // Mock existing projects data
  const existingProjects = [
    { id: "1", name: "Downtown Office Complex", type: "Commercial", status: "Active" },
    { id: "2", name: "Hospital Wing Expansion", type: "Healthcare", status: "In Review" },
    { id: "3", name: "Residential Tower A", type: "Residential", status: "Active" },
    { id: "4", name: "Manufacturing Facility", type: "Industrial", status: "Completed" },
    { id: "5", name: "University Library", type: "Educational", status: "Active" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileUpload(droppedFiles)
  }, [])

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

    const uploadedFiles: UploadedFile[] = validFiles.map((file) => ({
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

  const detectDiscipline = (filename: string): string => {
    const name = filename.toLowerCase()
    if (name.includes("hvac") || name.includes("heating") || name.includes("ventilation")) return "HVAC"
    if (name.includes("electrical") || name.includes("power") || name.includes("lighting")) return "Electrical"
    if (name.includes("mechanical") || name.includes("plumbing") || name.includes("piping")) return "Mechanical"
    if (name.includes("structural") || name.includes("foundation") || name.includes("beam")) return "Structural"
    return "General"
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      fileContext: selectedFile || undefined,
      projectContext: selectedProject || undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCreateProject = () => {
    if (!newProjectData.name.trim()) return

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

  const handleAddExistingProject = (projectName: string) => {
    setSelectedProject(projectName)
    setIsProjectPickerOpen(false)

    // Add system message about project selection
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: "system",
      content: `📁 Project "${projectName}" has been added to the conversation. You can now ask questions specific to this project.`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, systemMessage])
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-4 bg-white">
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-blue-900">Drop your DXF files here</p>
            <p className="text-blue-700">I'll process them and start the analysis</p>
          </div>
        </div>
      )}

      <div className="lg:col-span-1 border-r border-slate-200 p-4 space-y-4 h-full flex flex-col">
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
                        onClick={handleCreateProject}
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
      </div>

      <div className="lg:col-span-3 h-full flex flex-col">
        {/* Chat Header */}
        <div className="flex-shrink-0 border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif font-bold text-2xl text-slate-900">AI Design Assistant</h1>
              <p className="text-slate-600">
                Ask questions about your projects and CAD files to get detailed technical analysis
              </p>
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 min-h-0 px-6 py-4">
          <ScrollArea className="h-full">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-3xl ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : message.type === "system"
                          ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                          : "bg-white border border-slate-200"
                    } rounded-lg p-4 shadow-sm`}
                  >
                    {message.type === "assistant" && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-900">AI Assistant</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line text-sm leading-relaxed">{message.content}</div>

                    {message.files && message.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.files.map((file) => (
                          <div key={file.id} className="bg-slate-50 rounded-lg p-3 border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-slate-900 truncate">{file.name}</p>
                                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {file.discipline && (
                                  <Badge variant="outline" className="text-xs">
                                    {file.discipline}
                                  </Badge>
                                )}
                                <Badge
                                  variant={file.status === "completed" ? "default" : "secondary"}
                                  className={`text-xs ${
                                    file.status === "completed"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : file.status === "processing"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        : "bg-blue-100 text-blue-800 border-blue-200"
                                  }`}
                                >
                                  {file.status === "uploading"
                                    ? "Uploading"
                                    : file.status === "processing"
                                      ? "Processing"
                                      : file.status === "completed"
                                        ? "Ready"
                                        : "Error"}
                                </Badge>
                              </div>
                            </div>

                            {file.status === "uploading" && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-600">Uploading...</span>
                                  <span className="text-slate-600">{Math.round(file.progress)}%</span>
                                </div>
                                <Progress value={file.progress} className="h-1" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-slate-500">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-slate-500">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span className="text-sm">AI is analyzing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <div
          className="flex-shrink-0 bg-white border-t border-slate-200 p-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex items-center space-x-3">
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
                    {existingProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleAddExistingProject(project.name)}
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

            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedProject && selectedFile
                  ? `Ask about ${selectedProject} - ${selectedFile}...`
                  : selectedProject
                    ? `Ask about ${selectedProject}...`
                    : selectedFile
                      ? `Ask about ${selectedFile}...`
                      : "Describe your project or ask questions about your CAD files..."
              }
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
            >
              Send
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line • Drag and drop DXF files anywhere • Click 📁 to add existing
            projects • Powered by AI
          </p>
        </div>
      </div>
    </div>
  )
}
