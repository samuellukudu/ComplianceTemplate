"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronRight, Settings, FileText, Users, Clock } from "lucide-react"

export function ProjectSetupSidebar() {
  const [isProjectInfoMinimized, setIsProjectInfoMinimized] = useState(false)
  const [isProgressMinimized, setIsProgressMinimized] = useState(false)
  const [isTemplatesMinimized, setIsTemplatesMinimized] = useState(true)

  const setupSteps = [
    { name: "Project Information", completed: false, current: true },
    { name: "Upload CAD Files", completed: false, current: false },
    { name: "Configure Settings", completed: false, current: false },
    { name: "Review & Launch", completed: false, current: false },
  ]

  const projectTemplates = [
    { name: "Office Building", disciplines: ["HVAC", "Electrical", "Mechanical"], icon: "🏢" },
    { name: "Hospital Complex", disciplines: ["HVAC", "Electrical", "Mechanical", "Structural"], icon: "🏥" },
    { name: "Residential Tower", disciplines: ["HVAC", "Electrical", "Structural"], icon: "🏠" },
    { name: "Industrial Facility", disciplines: ["Mechanical", "Electrical", "Structural"], icon: "🏭" },
  ]

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Project Information Section */}
      <Card className="m-4 mb-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Project Setup
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProjectInfoMinimized(!isProjectInfoMinimized)}
              className="h-6 w-6 p-0"
            >
              {isProjectInfoMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {!isProjectInfoMinimized && (
          <CardContent className="pt-0 space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Project Name</label>
              <input
                type="text"
                placeholder="Enter project name..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Project Type</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select type...</option>
                <option value="office">Office Building</option>
                <option value="hospital">Hospital/Healthcare</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
                <option value="retail">Retail/Commercial</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Location</label>
              <input
                type="text"
                placeholder="City, State/Country"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Setup Progress Section */}
      <Card className="mx-4 mb-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Setup Progress
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProgressMinimized(!isProgressMinimized)}
              className="h-6 w-6 p-0"
            >
              {isProgressMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {!isProgressMinimized && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Overall Progress</span>
                <span className="font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
              <div className="space-y-2">
                {setupSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        step.completed ? "bg-green-500" : step.current ? "bg-blue-500" : "bg-slate-300"
                      }`}
                    />
                    <span className={`text-xs ${step.current ? "font-medium text-slate-900" : "text-slate-600"}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Project Templates Section */}
      <Card className="mx-4 mb-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Quick Templates
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTemplatesMinimized(!isTemplatesMinimized)}
              className="h-6 w-6 p-0"
            >
              {isTemplatesMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {!isTemplatesMinimized && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {projectTemplates.map((template, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-slate-50">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{template.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm text-slate-900">{template.name}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.disciplines.map((discipline) => (
                          <Badge key={discipline} variant="outline" className="text-xs px-1 py-0">
                            {discipline}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Team & Collaboration Section */}
      <Card className="mx-4 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Team Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Primary Discipline</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select discipline...</option>
                <option value="hvac">HVAC Engineer</option>
                <option value="electrical">Electrical Engineer</option>
                <option value="mechanical">Mechanical Engineer</option>
                <option value="structural">Structural Engineer</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Invite Team Members
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
