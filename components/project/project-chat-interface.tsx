"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveProject, type Project } from "@/lib/project-storage"
import {
  BaseChatInterface,
  type Message,
  type UploadedFile,
  detectDiscipline,
} from "@/components/chat/base-chat-interface"

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    discipline: "",
    description: "",
  })

  const handleSendMessage = (inputValue: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

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

  const leftInputButton = (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".dxf"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
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
    </>
  )

  return (
    <>
      <BaseChatInterface
        title="New Project Setup"
        subtitle="AI-guided project creation and file upload"
        initialMessages={messages}
        placeholder="Describe your project or ask questions about your CAD files..."
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        headerBadge={<Badge className="bg-green-100 text-green-800 border-green-200">Active Session</Badge>}
        leftInputButton={leftInputButton}
        footerText="Click 'Upload Files' or drag and drop DXF files anywhere in this chat • Press Enter to send • Powered by AI"
      />

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
    </>
  )
}
