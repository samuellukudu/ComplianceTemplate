"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FileSelectorProps {
  selectedFile: string | null
  onFileSelect: (fileName: string | null) => void
}

export function FileSelector({ selectedFile, onFileSelect }: FileSelectorProps) {
  const availableFiles = [
    {
      name: "HVAC_Floor_Plan_L1.dxf",
      discipline: "HVAC",
      elements: 1247,
      status: "analyzed",
      lastAnalyzed: "2 hours ago",
    },
    {
      name: "Electrical_Schematic_Main.dxf",
      discipline: "Electrical",
      elements: 892,
      status: "analyzed",
      lastAnalyzed: "5 hours ago",
    },
    {
      name: "Mechanical_Layout_B1.dxf",
      discipline: "Mechanical",
      elements: 1456,
      status: "ready",
      lastAnalyzed: "Not analyzed",
    },
    {
      name: "Structural_Foundation.dxf",
      discipline: "Structural",
      elements: 634,
      status: "analyzed",
      lastAnalyzed: "1 day ago",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-serif font-semibold text-lg">Select CAD File</CardTitle>
        <CardDescription>Choose a file to discuss with the AI assistant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={selectedFile === null ? "default" : "outline"}
          onClick={() => onFileSelect(null)}
          className="w-full justify-start h-auto p-3"
        >
          <div className="text-left">
            <div className="font-medium">General Discussion</div>
            <div className="text-xs text-muted-foreground">Ask about design standards and best practices</div>
          </div>
        </Button>

        <div className="space-y-2">
          {availableFiles.map((file) => (
            <Button
              key={file.name}
              variant={selectedFile === file.name ? "default" : "outline"}
              onClick={() => onFileSelect(file.name)}
              className="w-full justify-start h-auto p-3"
            >
              <div className="text-left space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm truncate">{file.name}</div>
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
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{file.elements} elements</span>
                  <Badge
                    variant={file.status === "analyzed" ? "default" : "secondary"}
                    className={
                      file.status === "analyzed"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }
                  >
                    {file.status === "analyzed" ? "Ready" : "Pending"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{file.lastAnalyzed}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-medium">AI Capabilities:</p>
            <ul className="space-y-1 text-slate-500">
              <li>• Code compliance checking</li>
              <li>• System sizing verification</li>
              <li>• Equipment recommendations</li>
              <li>• Energy efficiency analysis</li>
              <li>• Conflict detection</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
