"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TeamOverview() {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  const teamMembers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Lead HVAC Engineer",
      discipline: "HVAC",
      status: "online",
      projects: 3,
      lastActive: "2 minutes ago",
      permissions: "admin",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Senior Electrical Engineer",
      discipline: "Electrical",
      status: "online",
      projects: 2,
      lastActive: "15 minutes ago",
      permissions: "editor",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "Mechanical Engineer",
      discipline: "Mechanical",
      status: "away",
      projects: 2,
      lastActive: "1 hour ago",
      permissions: "editor",
    },
    {
      id: "4",
      name: "David Park",
      email: "david.park@company.com",
      role: "Structural Engineer",
      discipline: "Structural",
      status: "offline",
      projects: 1,
      lastActive: "3 hours ago",
      permissions: "viewer",
    },
    {
      id: "5",
      name: "Lisa Wong",
      email: "lisa.wong@company.com",
      role: "Project Manager",
      discipline: "Management",
      status: "online",
      projects: 5,
      lastActive: "5 minutes ago",
      permissions: "admin",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "away":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "offline":
        return "bg-slate-100 text-slate-800 border-slate-200"
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
      case "Structural":
        return "border-purple-200 text-purple-700 bg-purple-50"
      case "Management":
        return "border-slate-200 text-slate-700 bg-slate-50"
      default:
        return "border-slate-200 text-slate-700 bg-slate-50"
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

  const handleInvite = () => {
    if (inviteEmail) {
      // Simulate sending invite
      console.log("Inviting:", inviteEmail)
      setInviteEmail("")
      setShowInviteForm(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif font-semibold text-xl">Team Members</CardTitle>
            <CardDescription>Manage your engineering team and permissions</CardDescription>
          </div>
          <Button onClick={() => setShowInviteForm(!showInviteForm)} className="bg-blue-600 hover:bg-blue-700">
            Invite Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showInviteForm && (
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h4 className="font-medium text-slate-900 mb-3">Invite Team Member</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="engineer@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleInvite} size="sm">
                Send Invite
              </Button>
              <Button variant="outline" onClick={() => setShowInviteForm(false)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-slate-900">{member.name}</h4>
                    <p className="text-sm text-slate-600">{member.role}</p>
                    <p className="text-xs text-slate-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getDisciplineColor(member.discipline)}>
                    {member.discipline}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span>{member.projects} projects</span>
                  <span>•</span>
                  <span>Last active: {member.lastActive}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getPermissionColor(member.permissions)}>
                    {member.permissions}
                  </Badge>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
