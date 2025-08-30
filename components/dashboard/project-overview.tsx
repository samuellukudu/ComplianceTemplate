import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProjectOverview() {
  const projects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      type: "HVAC Review",
      status: "In Progress",
      progress: 65,
      lastActivity: "2 hours ago",
      compliance: 8,
      totalChecks: 12,
    },
    {
      id: 2,
      name: "Residential Tower - Phase 2",
      type: "Electrical Review",
      status: "Pending Review",
      progress: 30,
      lastActivity: "1 day ago",
      compliance: 15,
      totalChecks: 18,
    },
    {
      id: 3,
      name: "Manufacturing Facility",
      type: "Mechanical Review",
      status: "Completed",
      progress: 100,
      lastActivity: "3 days ago",
      compliance: 22,
      totalChecks: 22,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-semibold text-2xl text-slate-900">Recent Projects</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/project/new">New Project</Link> {/* Updated to link to new chat-based project creation */}
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-serif font-semibold text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-slate-600">{project.type}</CardDescription>
                </div>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "default"
                      : project.status === "In Progress"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    project.status === "Completed"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-600">
                      Compliance: {project.compliance}/{project.totalChecks}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-500">{project.lastActivity}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/compliance">View Details</Link>
                    </Button>
                    {project.status === "Completed" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                        <Link href="/export">Export Report</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
