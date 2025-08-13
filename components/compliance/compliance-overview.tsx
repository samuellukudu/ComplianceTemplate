"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ComplianceOverview() {
  const overallStats = {
    totalProjects: 3,
    compliantProjects: 1,
    inReviewProjects: 2,
    totalChecks: 67,
    passedChecks: 48,
    failedChecks: 8,
    pendingChecks: 11,
  }

  const disciplineStats = [
    {
      name: "HVAC Systems",
      total: 22,
      passed: 18,
      failed: 2,
      pending: 2,
      compliance: 82,
      color: "blue",
    },
    {
      name: "Electrical Systems",
      total: 18,
      passed: 15,
      failed: 1,
      pending: 2,
      compliance: 83,
      color: "yellow",
    },
    {
      name: "Mechanical Systems",
      total: 15,
      passed: 8,
      failed: 3,
      pending: 4,
      compliance: 53,
      color: "green",
    },
    {
      name: "Structural Systems",
      total: 12,
      passed: 7,
      failed: 2,
      pending: 3,
      compliance: 58,
      color: "purple",
    },
  ]

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getComplianceBadge = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif font-semibold text-lg">Overall Progress</CardTitle>
          <CardDescription>Total compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">
                {Math.round((overallStats.passedChecks / overallStats.totalChecks) * 100)}%
              </div>
              <div className="text-sm text-slate-600">Compliance Rate</div>
            </div>
            <Progress value={(overallStats.passedChecks / overallStats.totalChecks) * 100} className="h-2" />
            <div className="text-xs text-slate-600 text-center">
              {overallStats.passedChecks} of {overallStats.totalChecks} checks passed
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif font-semibold text-lg">Project Status</CardTitle>
          <CardDescription>Active project overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Compliant</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">{overallStats.compliantProjects}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">In Review</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">{overallStats.inReviewProjects}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total Projects</span>
              <Badge variant="outline">{overallStats.totalProjects}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif font-semibold text-lg">Check Summary</CardTitle>
          <CardDescription>Compliance check breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Passed</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">{overallStats.passedChecks}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">Failed</span>
              <Badge className="bg-red-100 text-red-800 border-red-200">{overallStats.failedChecks}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-600">Pending</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{overallStats.pendingChecks}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif font-semibold text-lg">Critical Issues</CardTitle>
          <CardDescription>Requires immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">High Priority</span>
              <Badge className="bg-red-100 text-red-800 border-red-200">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-600">Medium Priority</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">5</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Low Priority</span>
              <Badge variant="outline">2</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
