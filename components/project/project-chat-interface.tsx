"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveProject, type Project } from "@/lib/project-storage"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "user" | "assistant" | "system"
  content: string
  timestamp: Date
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

export function ProjectChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Welcome! I'm your AI Design Assistant. Let's create a new project together. I'll help you upload your CAD files and guide you through the design review process.\n\nTo get started, please tell me:\n1. What type of project are you working on?\n2. Which engineering disciplines are involved? (HVAC, Electrical, Mechanical, Structural)\n3. You can also drag and drop your DXF files directly into this chat!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    discipline: "",
    description: "",
  })
  const router = useRouter()

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("create project") || input.includes("save project") || input.includes("new project")) {
      setShowProjectForm(true)
      return "I'd be happy to help you create a new project! Please fill out the project details form that just opened. This will save your project so you can access it later from the Recent Projects tab."
    }

    if (input.includes("hvac") || input.includes("heating") || input.includes("ventilation")) {
      return "Great! I see you're working on an HVAC project. I can help you analyze:\n\n• Ductwork sizing and layout\n• Equipment specifications\n• Energy efficiency compliance\n• Airflow calculations\n• Code compliance checks\n\nPlease upload your HVAC DXF files by dragging them into this chat, and I'll start the analysis! You can also say 'create project' to save this as a new project."
    }

    if (input.includes("electrical") || input.includes("power") || input.includes("lighting")) {
      return "Perfect! For electrical projects, I can assist with:\n\n• Panel load calculations\n• Circuit design review\n• Code compliance verification\n• Safety requirements\n• Equipment specifications\n\nDrag and drop your electrical DXF files here to begin the review process! Don't forget to say 'create project' to save your work."
    }

    if (input.includes("mechanical") || input.includes("plumbing") || input.includes("piping")) {
      return "Excellent! For mechanical systems, I can help analyze:\n\n• Piping layouts and sizing\n• Equipment placement\n• System pressures and flows\n• Code compliance\n• Maintenance accessibility\n\nPlease upload your mechanical DXF files to start the analysis! You can create a project to save your progress."
    }

    return "Thank you for that information! I'm ready to help with your project. Please upload your CAD files by dragging them directly into this chat, or tell me more about the specific aspects you'd like me to focus on during the review. You can also say 'create project' to save this session as a new project."
  }

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

    // Simulate upload process
    uploadedFiles.forEach((file) => {
      simulateUpload(file.id)
    })

    // AI response about uploaded files
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Perfect! I've received your ${validFiles.length} CAD file(s). I'm now processing and analyzing the design elements. This includes:\n\n• Extracting geometric data\n• Identifying system components\n• Checking dimensional accuracy\n• Preparing for compliance review\n\nOnce processing is complete, I'll provide a detailed analysis and you can ask me specific questions about your design!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
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

        // Simulate processing completion
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFileUpload(Array.from(files))
    }
    // Reset the input so the same file can be selected again
    e.target.value = ""
  }

  const handleCreateProject = () => {
    if (!projectDetails.name || !projectDetails.type || !projectDetails.discipline) {
      return
    }

    const uploadedFileNames = messages
      .flatMap((msg) => msg.files || [])
      .filter((file) => file.status === "completed")
      .map((file) => file.name)

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectDetails.name,
      type: `${projectDetails.discipline} Review`,
      status: "In Progress",
      progress: uploadedFileNames.length > 0 ? 25 : 10,
      lastActivity: "Just now",
      compliance: 0,
      totalChecks: 15,
      createdAt: new Date(),
      files: uploadedFileNames,
      discipline: projectDetails.discipline,
      description: projectDetails.description,
    }

    saveProject(newProject)

    // Add success message to chat
    const successMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: `🎉 Project "${projectDetails.name}" has been created successfully! You can now find it in your Recent Projects tab. I'll continue to help you with file uploads and analysis for this project.`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, successMessage])

    setShowProjectForm(false)
    setProjectDetails({ name: "", type: "", discipline: "", description: "" })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-2xl text-slate-900">New Project Setup</h1>
            <p className="text-slate-600">AI-guided project creation and file upload</p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">Active Session</Badge>
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

                  {/* File attachments */}
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

                  <div className="mt-2 text-xs text-slate-500">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Project Creation Dialog */}
      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={projectDetails.name}
                onChange={(e) => setProjectDetails((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Downtown Office Complex"
              />
            </div>

            <div>
              <Label htmlFor="project-type">Project Type *</Label>
              <Input
                id="project-type"
                value={projectDetails.type}
                onChange={(e) => setProjectDetails((prev) => ({ ...prev, type: e.target.value }))}
                placeholder="e.g., Commercial Building, Residential Complex"
              />
            </div>

            <div>
              <Label htmlFor="discipline">Primary Discipline *</Label>
              <Select
                value={projectDetails.discipline}
                onValueChange={(value) => setProjectDetails((prev) => ({ ...prev, discipline: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select discipline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Structural">Structural</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectDetails.description}
                onChange={(e) => setProjectDetails((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the project..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProjectForm(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateProject}
                disabled={!projectDetails.name || !projectDetails.type || !projectDetails.discipline}
              >
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Drop Overlay */}
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

      {/* Chat Input */}
      <div
        className="flex-shrink-0 bg-white border-t border-slate-200 p-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".dxf"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex items-center space-x-3">
          <Button
            onClick={handleUploadClick}
            variant="outline"
            className="h-12 px-4 border-dashed border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 bg-transparent"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload Files
          </Button>

          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your project or ask questions about your CAD files..."
              className="h-12 text-base"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
          >
            Send
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Click "Upload Files" or drag and drop DXF files anywhere in this chat • Press Enter to send • Powered by AI
        </p>
      </div>
    </div>
  )
}
