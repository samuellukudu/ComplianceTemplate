"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectSelectorProps {
  selectedProject: string | null
  onProjectSelect: (projectName: string | null) => void
}

export function ProjectSelector({ selectedProject, onProjectSelect }: ProjectSelectorProps) {
  const availableProjects = [
    {
      name: "Downtown Office Complex",
      code: "DOC-2024-001",
      type: "Commercial",
      phase: "Design Development",
      status: "active",
      location: "Seattle, WA",
      disciplines: ["HVAC", "Electrical", "Mechanical"],
      progress: 75,
    },
    {
      name: "Hospital Wing Expansion",
      code: "HWE-2024-002",
      type: "Healthcare",
      phase: "Construction Documents",
      status: "active",
      location: "Portland, OR",
      disciplines: ["HVAC", "Electrical", "Mechanical", "Structural"],
      progress: 60,
    },
    {
      name: "Hotel Tower Renovation",
      code: "HTR-2024-003",
      type: "Hospitality",
      phase: "Schematic Design",
      status: "on-hold",
      location: "Vancouver, BC",
      disciplines: ["HVAC", "Electrical"],
      progress: 30,
    },
    {
      name: "University Research Lab",
      code: "URL-2024-004",
      type: "Educational",
      phase: "Construction Administration",
      status: "active",
      location: "San Francisco, CA",
      disciplines: ["HVAC", "Electrical", "Mechanical"],
      progress: 90,
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-serif font-semibold text-lg">Select Project</CardTitle>
        <CardDescription>Choose a project context for your discussion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={selectedProject === null ? "default" : "outline"}
          onClick={() => onProjectSelect(null)}
          className="w-full justify-start h-auto p-3"
        >
          <div className="text-left">
            <div className="font-medium">No Project Context</div>
            <div className="text-xs text-muted-foreground">General architectural discussion</div>
          </div>
        </Button>

        <div className="space-y-2">
          {availableProjects.map((project) => (
            <Button
              key={project.code}
              variant={selectedProject === project.name ? "default" : "outline"}
              onClick={() => onProjectSelect(project.name)}
              className="w-full justify-start h-auto p-3"
            >
              <div className="text-left space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm truncate">{project.name}</div>
                  <Badge
                    variant="outline"
                    className={
                      project.type === "Commercial"
                        ? "border-blue-200 text-blue-700 bg-blue-50"
                        : project.type === "Healthcare"
                          ? "border-red-200 text-red-700 bg-red-50"
                          : project.type === "Hospitality"
                            ? "border-purple-200 text-purple-700 bg-purple-50"
                            : "border-green-200 text-green-700 bg-green-50"
                    }
                  >
                    {project.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.code}</span>
                  <Badge
                    variant={project.status === "active" ? "default" : "secondary"}
                    className={
                      project.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-orange-100 text-orange-800 border-orange-200"
                    }
                  >
                    {project.status === "active" ? "Active" : "On Hold"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {project.phase} • {project.location}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-1">
                    {project.disciplines.map((discipline) => (
                      <Badge key={discipline} variant="outline" className="text-xs px-1 py-0">
                        {discipline}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-muted-foreground">{project.progress}% complete</span>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-medium">Project Context Benefits:</p>
            <ul className="space-y-1 text-slate-500">
              <li>• Project-specific code requirements</li>
              <li>• Building type considerations</li>
              <li>• Local jurisdiction compliance</li>
              <li>• Phase-appropriate guidance</li>
              <li>• Team collaboration context</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
