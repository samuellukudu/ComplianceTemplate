"use client"

import type React from "react"
import Link from "next/link"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  uploadedAt: Date
}

export function FileUploadArea() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

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
    handleFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter((file) => {
      const isDXF = file.name.toLowerCase().endsWith(".dxf")
      const isValidSize = file.size <= 100 * 1024 * 1024 // 100MB limit
      return isDXF && isValidSize
    })

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type || "application/dxf",
      status: "uploading",
      progress: 0,
      uploadedAt: new Date(),
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload process
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15

      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
      )

      if (progress >= 100) {
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, status: "processing", progress: 100 } : file)),
        )

        // Simulate processing
        setTimeout(() => {
          setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)))
        }, 2000)
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

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div
            className={`text-center space-y-4 ${isDragOver ? "bg-blue-50 rounded-lg p-4" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-xl text-slate-900 mb-2">Upload CAD Files</h3>
              <p className="text-slate-600 mb-4">Drag and drop your DXF files here, or click to browse</p>

              <input
                type="file"
                multiple
                accept=".dxf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer" asChild>
                  <span>Choose Files</span>
                </Button>
              </label>
            </div>

            <div className="text-sm text-slate-500 space-y-1">
              <p>Supported format: DXF files only</p>
              <p>Maximum file size: 100MB per file</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-semibold text-lg">Upload Progress</CardTitle>
            <CardDescription>Track your file uploads and processing status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{file.name}</p>
                    <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        file.status === "completed" ? "default" : file.status === "error" ? "destructive" : "secondary"
                      }
                      className={
                        file.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : file.status === "error"
                            ? ""
                            : file.status === "processing"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {file.status === "uploading"
                        ? "Uploading"
                        : file.status === "processing"
                          ? "Processing"
                          : file.status === "completed"
                            ? "Ready"
                            : "Error"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {file.status === "uploading" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Uploading...</span>
                      <span className="text-slate-600">{Math.round(file.progress)}%</span>
                    </div>
                    <Progress value={file.progress} className="h-2" />
                  </div>
                )}

                {file.status === "processing" && (
                  <Alert>
                    <AlertDescription className="text-sm">
                      File uploaded successfully. AI is analyzing the CAD structure and extracting design elements...
                    </AlertDescription>
                  </Alert>
                )}

                {file.status === "completed" && (
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-green-800">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Ready for AI Review</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                      <Link href={`/chat?file=${encodeURIComponent(file.name)}`}>Start Review</Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
