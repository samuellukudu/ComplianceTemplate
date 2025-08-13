"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function IssueTracker() {
  const issues = [
    {
      id: "ISS-001",
      title: "Emergency Lighting Battery Backup",
      discipline: "Electrical",
      priority: "high",
      status: "open",
      assignee: "Mike Chen",
      dueDate: "2024-01-15",
      progress: 0,
    },
    {
      id: "ISS-002",
      title: "HVAC Equipment Clearances",
      discipline: "HVAC",
      priority: "medium",
      status: "in-progress",
      assignee: "Sarah Johnson",
      dueDate: "2024-01-18",
      progress: 65,
    },
    {
      id: "ISS-003",
      title: "Water Hammer Protection",
      discipline: "Mechanical",
      priority: "medium",
      status: "in-progress",
      assignee: "David Park",
      dueDate: "2024-01-20",
      progress: 30,
    },
    {
      id: "ISS-004",
      title: "Conduit Fill Verification",
      discipline: "Electrical",
      priority: "low",
      status: "resolved",
      assignee: "Mike Chen",
      dueDate: "2024-01-12",
      progress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case "HVAC":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "Electrical":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "Mechanical":
        return "border-green-200 text-green-700 bg-green-50"
      default:
        return "border-slate-200 text-slate-700 bg-slate-50"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">Issue Tracker</CardTitle>
          <CardDescription>Track and resolve compliance issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">{issue.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">ID: {issue.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline" className={getDisciplineColor(issue.discipline)}>
                    {issue.discipline}
                  </Badge>
                  <span className="text-slate-600">Assigned to: {issue.assignee}</span>
                </div>

                {issue.status === "in-progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-slate-600">{issue.progress}%</span>
                    </div>
                    <Progress value={issue.progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-600">Due: </span>
                    <span className={isOverdue(issue.dueDate) ? "text-red-600 font-medium" : "text-slate-900"}>
                      {formatDate(issue.dueDate)}
                    </span>
                    {isOverdue(issue.dueDate) && issue.status !== "resolved" && (
                      <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                        Overdue
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg text-slate-900">Resolution Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Issues Resolved This Week</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Average Resolution Time</span>
              <span className="font-medium">2.5 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Team Performance</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Create New Issue
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Generate Report
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Export Issues
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
