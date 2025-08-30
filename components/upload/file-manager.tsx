"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface CADFile {
  id: string
  name: string
  size: number
  uploadedAt: Date
  status: "ready" | "reviewing" | "completed"
  discipline: string
  elements: number
  compliance: number
  totalChecks: number
}

export function FileManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDiscipline, setSelectedDiscipline] = useState("all")

  // Mock data for existing files
  const [files] = useState<CADFile[]>([
    {
      id: "1",
      name: "HVAC_Floor_Plan_L1.dxf",
      size: 2.4 * 1024 * 1024,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed",
      discipline: "HVAC",
      elements: 1247,
      compliance: 18,
      totalChecks: 22,
    },
    {
      id: "2",
      name: "Electrical_Schematic_Main.dxf",
      size: 1.8 * 1024 * 1024,
      uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "reviewing",
      discipline: "Electrical",
      elements: 892,
      compliance: 12,
      totalChecks: 15,
    },
    {
      id: "3",
      name: "Mechanical_Layout_B1.dxf",
      size: 3.1 * 1024 * 1024,
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "ready",
      discipline: "Mechanical",
      elements: 1456,
      compliance: 0,
      totalChecks: 0,
    },
  ])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDiscipline = selectedDiscipline === "all" || file.discipline.toLowerCase() === selectedDiscipline
    return matchesSearch && matchesDiscipline
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">File Library</CardTitle>
          <CardDescription>Manage your uploaded CAD files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Search Files
            </Label>
            <Input
              id="search"
              placeholder="Search by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline" className="text-sm font-medium">
              Filter by Discipline
            </Label>
            <select
              id="discipline"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full h-9 px-3 py-1 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Disciplines</option>
              <option value="hvac">HVAC</option>
              <option value="electrical">Electrical</option>
              <option value="mechanical">Mechanical</option>
              <option value="structural">Structural</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">Recent Files</CardTitle>
          <CardDescription>{filteredFiles.length} files found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <div key={file.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-900 truncate">{file.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(file.uploadedAt)}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        file.discipline === "HVAC"
                          ? "border-blue-200 text-blue-700 bg-blue-50"
                          : file.discipline === "Electrical"
                            ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                            : file.discipline === "Mechanical"
                              ? "border-green-200 text-green-700 bg-green-50"
                              : "border-purple-200 text-purple-700 bg-purple-50"
                      }
                    >
                      {file.discipline}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 text-slate-600">
                      <span>{file.elements} elements</span>
                      {file.status === "completed" && (
                        <>
                          <span>•</span>
                          <span>
                            {file.compliance}/{file.totalChecks} checks
                          </span>
                        </>
                      )}
                    </div>
                    <Badge
                      variant={
                        file.status === "completed" ? "default" : file.status === "reviewing" ? "secondary" : "outline"
                      }
                      className={
                        file.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : file.status === "reviewing"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                      }
                    >
                      {file.status === "ready" ? "Ready" : file.status === "reviewing" ? "Reviewing" : "Complete"}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" asChild>
                      <Link href="/compliance">View Details</Link>
                    </Button>
                    {file.status === "ready" && (
                      <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href={`/chat?file=${encodeURIComponent(file.name)}`}>Start Review</Link>
                      </Button>
                    )}
                    {file.status === "completed" && (
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" asChild>
                        <Link href="/export">Export Report</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredFiles.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm">No files found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg text-slate-900">Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Used Storage</span>
              <span className="font-medium">2.4 GB / 10 GB</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24%" }} />
            </div>
            <p className="text-xs text-slate-600">7.6 GB remaining</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
