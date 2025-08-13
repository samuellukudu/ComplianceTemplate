"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ExportHistory() {
  const exportHistory = [
    {
      id: "exp-001",
      name: "Downtown Office - Compliance Report",
      type: "Compliance Summary",
      format: "PDF",
      size: "2.4 MB",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      downloadCount: 3,
      project: "Downtown Office Complex",
    },
    {
      id: "exp-002",
      name: "Residential Tower - Technical Specs",
      type: "Technical Specifications",
      format: "PDF + Excel",
      size: "5.8 MB",
      status: "completed",
      createdAt: "2024-01-14T15:45:00Z",
      downloadCount: 1,
      project: "Residential Tower - Phase 2",
    },
    {
      id: "exp-003",
      name: "Manufacturing - Issue Tracking",
      type: "Issue Tracking",
      format: "Excel",
      size: "1.2 MB",
      status: "completed",
      createdAt: "2024-01-13T09:15:00Z",
      downloadCount: 5,
      project: "Manufacturing Facility",
    },
    {
      id: "exp-004",
      name: "Downtown Office - Energy Analysis",
      type: "Energy Analysis",
      format: "PDF",
      size: "3.1 MB",
      status: "processing",
      createdAt: "2024-01-15T14:20:00Z",
      downloadCount: 0,
      project: "Downtown Office Complex",
    },
    {
      id: "exp-005",
      name: "Client Presentation - Q4 Review",
      type: "Client Presentation",
      format: "PDF + PowerPoint",
      size: "4.7 MB",
      status: "completed",
      createdAt: "2024-01-12T11:00:00Z",
      downloadCount: 8,
      project: "Downtown Office Complex",
    },
    {
      id: "exp-006",
      name: "Peer Review Package - Final",
      type: "Peer Review",
      format: "PDF + CAD",
      size: "12.3 MB",
      status: "failed",
      createdAt: "2024-01-11T16:30:00Z",
      downloadCount: 0,
      project: "Residential Tower - Phase 2",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleDownload = (exportId: string) => {
    console.log("Downloading export:", exportId)
    // Simulate download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `export-${exportId}.pdf`
    link.click()
  }

  const handleRetry = (exportId: string) => {
    console.log("Retrying export:", exportId)
    // This would restart the failed export
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg">Export History</CardTitle>
          <CardDescription>Recent exports and downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {exportHistory.map((export_) => (
                <div key={export_.id} className="border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-slate-900 truncate">{export_.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{export_.project}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(export_.status)}>
                      {export_.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-50">
                        {export_.format}
                      </Badge>
                      <span>{export_.size}</span>
                    </div>
                    <span>{export_.downloadCount} downloads</span>
                  </div>

                  <div className="text-xs text-slate-500">{formatDate(export_.createdAt)}</div>

                  <div className="flex items-center space-x-2 pt-2">
                    {export_.status === "completed" && (
                      <Button
                        onClick={() => handleDownload(export_.id)}
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs bg-transparent"
                      >
                        Download
                      </Button>
                    )}
                    {export_.status === "failed" && (
                      <Button
                        onClick={() => handleRetry(export_.id)}
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs bg-transparent"
                      >
                        Retry
                      </Button>
                    )}
                    {export_.status === "processing" && (
                      <div className="flex items-center space-x-2 text-xs text-blue-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <span>Processing...</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-400 hover:text-slate-600">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg text-slate-900">Export Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Exports</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">This Month</span>
              <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Storage Used</span>
              <span className="font-medium">47.2 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Most Popular</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Compliance Reports</Badge>
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
            Schedule Automated Export
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Bulk Download
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Clear History
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
