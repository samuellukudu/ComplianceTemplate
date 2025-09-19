"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

export interface Message {
  id: string
  type: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  fileContext?: string
  projectContext?: string
  files?: UploadedFile[]
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  discipline?: string
}

interface BaseChatInterfaceProps {
  title: string
  subtitle: string
  initialMessages: Message[]
  placeholder?: string
  onSendMessage: (message: string) => void
  onFileUpload?: (files: File[]) => void
  isLoading?: boolean
  headerBadge?: React.ReactNode
  leftSidebar?: React.ReactNode
  leftInputButton?: React.ReactNode
  footerText?: string
  className?: string
}

export const detectDiscipline = (filename: string): string => {
  const name = filename.toLowerCase()
  if (name.includes("hvac") || name.includes("heating") || name.includes("ventilation")) return "HVAC"
  if (name.includes("electrical") || name.includes("power") || name.includes("lighting")) return "Electrical"
  if (name.includes("mechanical") || name.includes("plumbing") || name.includes("piping")) return "Mechanical"
  if (name.includes("structural") || name.includes("foundation") || name.includes("beam")) return "Structural"
  return "General"
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function BaseChatInterface({
  title,
  subtitle,
  initialMessages,
  placeholder = "Type your message...",
  onSendMessage,
  onFileUpload,
  isLoading = false,
  headerBadge,
  leftSidebar,
  leftInputButton,
  footerText,
  className = "",
}: BaseChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (onFileUpload) {
        setIsDragOver(true)
      }
    },
    [onFileUpload],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (onFileUpload) {
        const droppedFiles = Array.from(e.dataTransfer.files)
        onFileUpload(droppedFiles)
      }
    },
    [onFileUpload],
  )

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    onSendMessage(inputValue)
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className={`h-full ${leftSidebar ? "grid grid-cols-1 lg:grid-cols-4" : "flex flex-col"} bg-white ${className}`}
    >
      {/* File Drop Overlay */}
      {isDragOver && onFileUpload && (
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

      {/* Left Sidebar */}
      {leftSidebar && (
        <div className="lg:col-span-1 border-r border-slate-200 p-4 space-y-4 h-full flex flex-col">{leftSidebar}</div>
      )}

      {/* Main Chat Area */}
      <div className={`${leftSidebar ? "lg:col-span-3" : ""} h-full flex flex-col`}>
        {/* Chat Header */}
        <div className="flex-shrink-0 border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif font-bold text-2xl text-slate-900">{title}</h1>
              <p className="text-slate-600">{subtitle}</p>
            </div>
            {headerBadge && <div className="flex gap-2">{headerBadge}</div>}
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

        {/* Chat Input */}
        <div
          className="flex-shrink-0 bg-white border-t border-slate-200 p-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex items-center space-x-3">
            {leftInputButton && leftInputButton}

            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
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
          {footerText && <p className="text-xs text-slate-500 mt-2 text-center">{footerText}</p>}
        </div>
      </div>
    </div>
  )
}
