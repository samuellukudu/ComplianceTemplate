"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ActivityFeed() {
  const activities = [
    {
      id: "1",
      type: "comment",
      user: "Sarah Johnson",
      avatar: "SJ",
      action: "commented on",
      target: "HVAC_Floor_Plan_L1.dxf",
      project: "Downtown Office Complex",
      content: "The ductwork sizing looks good, but we should verify the static pressure calculations.",
      timestamp: "5 minutes ago",
      priority: "normal",
    },
    {
      id: "2",
      type: "review",
      user: "Mike Chen",
      avatar: "MC",
      action: "completed review of",
      target: "Mechanical_Layout_B1.dxf",
      project: "Downtown Office Complex",
      content: "All mechanical systems comply with IPC 2021 requirements.",
      timestamp: "15 minutes ago",
      priority: "normal",
    },
    {
      id: "3",
      type: "issue",
      user: "David Park",
      avatar: "DP",
      action: "reported an issue in",
      target: "Electrical_Schematic_Main.dxf",
      project: "Residential Tower",
      content: "Emergency lighting battery backup systems not specified for egress paths.",
      timestamp: "1 hour ago",
      priority: "high",
    },
    {
      id: "4",
      type: "approval",
      user: "Lisa Wong",
      avatar: "LW",
      action: "approved",
      target: "Manufacturing Facility",
      project: "Manufacturing Facility",
      content: "Project meets all compliance requirements and is ready for submission.",
      timestamp: "2 hours ago",
      priority: "normal",
    },
    {
      id: "5",
      type: "upload",
      user: "John Smith",
      avatar: "JS",
      action: "uploaded",
      target: "HVAC_Revised_L2.dxf",
      project: "Downtown Office Complex",
      content: "Updated HVAC layout with revised ductwork routing per structural coordination.",
      timestamp: "3 hours ago",
      priority: "normal",
    },
    {
      id: "6",
      type: "mention",
      user: "Sarah Johnson",
      avatar: "SJ",
      action: "mentioned you in",
      target: "Project Discussion",
      project: "Residential Tower",
      content: "@JohnSmith Can you review the electrical load calculations for the penthouse level?",
      timestamp: "4 hours ago",
      priority: "normal",
    },
    {
      id: "7",
      type: "assignment",
      user: "Lisa Wong",
      avatar: "LW",
      action: "assigned you to review",
      target: "Structural_Foundation.dxf",
      project: "Downtown Office Complex",
      content: "Please verify structural loads for HVAC equipment placement.",
      timestamp: "5 hours ago",
      priority: "high",
    },
    {
      id: "8",
      type: "compliance",
      user: "System",
      avatar: "AI",
      action: "detected compliance issue in",
      target: "Electrical_Panel_Schedule.dxf",
      project: "Residential Tower",
      content: "Panel loading exceeds 80% capacity. Consider load balancing or additional panels.",
      timestamp: "6 hours ago",
      priority: "medium",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )
      case "review":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case "issue":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "approval":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "upload":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        )
      case "mention":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "assignment":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        )
      case "compliance":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "comment":
        return "text-blue-600 bg-blue-100"
      case "review":
        return "text-green-600 bg-green-100"
      case "issue":
        return "text-red-600 bg-red-100"
      case "approval":
        return "text-green-600 bg-green-100"
      case "upload":
        return "text-purple-600 bg-purple-100"
      case "mention":
        return "text-yellow-600 bg-yellow-100"
      case "assignment":
        return "text-blue-600 bg-blue-100"
      case "compliance":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">Activity Feed</CardTitle>
          <CardDescription>Recent team activity and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                  >
                    {activity.user === "System" ? (
                      <span className="text-xs font-bold">AI</span>
                    ) : (
                      getActivityIcon(activity.type)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">in {activity.project}</p>
                        {activity.content && (
                          <p className="text-sm text-slate-700 mt-2 bg-slate-50 rounded-md p-2">{activity.content}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        {getPriorityBadge(activity.priority)}
                        <span className="text-xs text-slate-500 whitespace-nowrap">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg text-slate-900">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Unread notifications</span>
              <Badge className="bg-red-100 text-red-800 border-red-200">3</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Pending reviews</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">2</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Mentions</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">1</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
