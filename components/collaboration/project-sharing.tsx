"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function ProjectSharing() {
  const [selectedProject, setSelectedProject] = useState("downtown-office")

  const sharedProjects = [
    {
      id: "downtown-office",
      name: "Downtown Office Complex",
      description: "Mixed-use commercial building with retail and office spaces",
      owner: "John Smith",
      collaborators: [
        { name: "Sarah Johnson", role: "Electrical Lead", avatar: "SJ" },
        { name: "Mike Chen", role: "Mechanical Engineer", avatar: "MC" },
        { name: "David Park", role: "Structural Engineer", avatar: "DP" },
        { name: "Lisa Wong", role: "Project Manager", avatar: "LW" },
      ],
      progress: 75,
      status: "active",
      lastActivity: "2 hours ago",
      permissions: {
        "Sarah Johnson": "editor",
        "Mike Chen": "editor",
        "David Park": "viewer",
        "Lisa Wong": "admin",
      },
      comments: 23,
      reviews: 8,
    },
    {
      id: "residential-tower",
      name: "Residential Tower - Phase 2",
      description: "High-rise residential building with amenities",
      owner: "Sarah Johnson",
      collaborators: [
        { name: "John Smith", role: "HVAC Consultant", avatar: "JS" },
        { name: "Mike Chen", role: "Mechanical Engineer", avatar: "MC" },
        { name: "Lisa Wong", role: "Project Manager", avatar: "LW" },
      ],
      progress: 45,
      status: "active",
      lastActivity: "1 day ago",
      permissions: {
        "John Smith": "editor",
        "Mike Chen": "editor",
        "Lisa Wong": "admin",
      },
      comments: 15,
      reviews: 4,
    },
    {
      id: "manufacturing-facility",
      name: "Manufacturing Facility",
      description: "Industrial facility with specialized HVAC requirements",
      owner: "Mike Chen",
      collaborators: [
        { name: "John Smith", role: "HVAC Lead", avatar: "JS" },
        { name: "Sarah Johnson", role: "Electrical Engineer", avatar: "SJ" },
      ],
      progress: 100,
      status: "completed",
      lastActivity: "3 days ago",
      permissions: {
        "John Smith": "editor",
        "Sarah Johnson": "editor",
      },
      comments: 31,
      reviews: 12,
    },
  ]

  const currentProject = sharedProjects.find((p) => p.id === selectedProject)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "editor":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "viewer":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-semibold text-xl">Shared Projects</CardTitle>
        <CardDescription>Collaborate on design reviews with your team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sharedProjects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedProject === project.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm text-slate-900 line-clamp-2">{project.name}</h4>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{project.progress}% complete</span>
                  <div className="flex -space-x-1">
                    {project.collaborators.slice(0, 3).map((collaborator, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {collaborator.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.collaborators.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-slate-600">+{project.collaborators.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentProject && (
          <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-lg text-slate-900">{currentProject.name}</h3>
                  <p className="text-slate-600 mt-1">{currentProject.description}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Owned by {currentProject.owner} • Last activity: {currentProject.lastActivity}
                  </p>
                </div>
                <Badge variant="outline" className={getStatusColor(currentProject.status)}>
                  {currentProject.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Project Progress</span>
                  <span className="font-medium">{currentProject.progress}%</span>
                </div>
                <Progress value={currentProject.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-semibold text-slate-900">{currentProject.collaborators.length + 1}</div>
                  <div className="text-slate-600">Team Members</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-semibold text-slate-900">{currentProject.comments}</div>
                  <div className="text-slate-600">Comments</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-semibold text-slate-900">{currentProject.reviews}</div>
                  <div className="text-slate-600">Reviews</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">Team Members & Permissions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                          {currentProject.owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium text-slate-900">{currentProject.owner}</span>
                        <span className="text-xs text-slate-500 ml-2">(Owner)</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      admin
                    </Badge>
                  </div>

                  {currentProject.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                            {collaborator.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium text-slate-900">{collaborator.name}</span>
                          <span className="text-xs text-slate-500 ml-2">({collaborator.role})</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={getPermissionColor(currentProject.permissions[collaborator.name])}
                      >
                        {currentProject.permissions[collaborator.name]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-slate-200">
                <Button className="bg-blue-600 hover:bg-blue-700">Open Project</Button>
                <Button variant="outline" className="bg-transparent">
                  Share Link
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Manage Access
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
