"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"

interface UploadedDocument {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  category?: string
  sections?: number
}

export function BuildingCodesUpload() {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([])
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
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const newDoc: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        status: "uploading",
        progress: 0,
      }

      setUploadedDocs((prev) => [...prev, newDoc])

      // Simulate upload and processing
      simulateUpload(newDoc.id)
    })
  }

  const simulateUpload = async (docId: string) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadedDocs((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, progress } : doc)))
    }

    // Switch to processing
    setUploadedDocs((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, status: "processing", progress: 0 } : doc)),
    )

    // Simulate processing
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setUploadedDocs((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, progress } : doc)))
    }

    // Complete processing
    setUploadedDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status: "completed",
              progress: 100,
              category: getDocumentCategory(doc.name),
              sections: Math.floor(Math.random() * 50) + 10,
            }
          : doc,
      ),
    )
  }

  const getDocumentCategory = (filename: string): string => {
    const name = filename.toLowerCase()
    if (name.includes("ibc") || name.includes("building")) return "Building"
    if (name.includes("nec") || name.includes("electrical")) return "Electrical"
    if (name.includes("imc") || name.includes("mechanical")) return "Mechanical"
    if (name.includes("ipc") || name.includes("plumbing")) return "Plumbing"
    if (name.includes("nfpa") || name.includes("fire")) return "Fire Safety"
    return "General"
  }

  const removeDocument = (docId: string) => {
    setUploadedDocs((prev) => prev.filter((doc) => doc.id !== docId))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "building":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "electrical":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "mechanical":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "plumbing":
        return "bg-green-100 text-green-800 border-green-200"
      case "fire safety":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Upload Area */}
      <div className="flex-shrink-0 mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:border-slate-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Building Code Documents</h3>
          <p className="text-slate-600 mb-4">Drag and drop PDF files here, or click to browse</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </label>
          </Button>
          <p className="text-xs text-slate-500 mt-2">Supports PDF, DOC, DOCX files up to 50MB each</p>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          {uploadedDocs.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Uploaded Documents ({uploadedDocs.length})</h3>
            </div>
          )}

          <div className="space-y-4">
            {uploadedDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold text-slate-900 mb-1">{doc.name}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                        {doc.sections && (
                          <>
                            <span>•</span>
                            <span>{doc.sections} sections indexed</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.category && (
                        <Badge variant="outline" className={getCategoryColor(doc.category)}>
                          {doc.category}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      {doc.status === "uploading" && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-600">Uploading...</span>
                            <span className="text-sm text-slate-600">{doc.progress}%</span>
                          </div>
                          <Progress value={doc.progress} className="h-2" />
                        </div>
                      )}
                      {doc.status === "processing" && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-600">Processing document...</span>
                            <span className="text-sm text-slate-600">{doc.progress}%</span>
                          </div>
                          <Progress value={doc.progress} className="h-2" />
                        </div>
                      )}
                      {doc.status === "completed" && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Ready for search</span>
                        </div>
                      )}
                      {doc.status === "error" && (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Upload failed</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FileText className="w-4 h-4" />
                      <span>Building Code Document</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {uploadedDocs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No documents uploaded yet</h3>
              <p className="text-slate-600">Upload building code documents to make them searchable</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
