"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ComplianceDetails() {
  const [selectedProject, setSelectedProject] = useState("downtown-office")
  const [selectedCheck, setSelectedCheck] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isActionItemOpen, setIsActionItemOpen] = useState(false)
  const [generatedActions, setGeneratedActions] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [createdTasks, setCreatedTasks] = useState<Set<number>>(new Set())
  const [assignedTasks, setAssignedTasks] = useState<Set<number>>(new Set())
  const [isCreatingTasks, setIsCreatingTasks] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const projects = {
    "downtown-office": {
      name: "Downtown Office Complex",
      disciplines: [
        {
          name: "HVAC Systems",
          checks: [
            {
              name: "Downtown Office Complex - HVAC Design",
              status: "passed",
              priority: "high",
              code: "Project #2024-001",
            },
            {
              name: "Retail Plaza - Ventilation System",
              status: "passed",
              priority: "high",
              code: "Project #2024-002",
            },
            {
              name: "Medical Center - Air Handling Units",
              status: "passed",
              priority: "medium",
              code: "Project #2024-003",
            },
            {
              name: "Warehouse Facility - HVAC Layout",
              status: "failed",
              priority: "medium",
              code: "Project #2024-004",
            },
            {
              name: "School Building - Climate Control",
              status: "pending",
              priority: "low",
              code: "Project #2024-005",
            },
          ],
        },
        {
          name: "Electrical Systems",
          checks: [
            {
              name: "Corporate Headquarters - Electrical Design",
              status: "passed",
              priority: "high",
              code: "Project #2024-006",
            },
            {
              name: "Shopping Mall - Power Distribution",
              status: "passed",
              priority: "high",
              code: "Project #2024-007",
            },
            {
              name: "Hospital Wing - Emergency Systems",
              status: "failed",
              priority: "high",
              code: "Project #2024-008",
            },
            {
              name: "Data Center - Electrical Infrastructure",
              status: "passed",
              priority: "medium",
              code: "Project #2024-009",
            },
            {
              name: "Apartment Complex - Electrical Layout",
              status: "pending",
              priority: "medium",
              code: "Project #2024-010",
            },
          ],
        },
        {
          name: "Mechanical Systems",
          checks: [
            { name: "Hotel Tower - Plumbing Systems", status: "passed", priority: "high", code: "Project #2024-011" },
            {
              name: "Restaurant Chain - Kitchen Plumbing",
              status: "passed",
              priority: "high",
              code: "Project #2024-012",
            },
            {
              name: "Office Building - Water Systems",
              status: "failed",
              priority: "medium",
              code: "Project #2024-013",
            },
            {
              name: "Manufacturing Plant - Process Piping",
              status: "pending",
              priority: "low",
              code: "Project #2024-014",
            },
          ],
        },
      ],
    },
  }

  const currentProject = projects[selectedProject as keyof typeof projects]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 text-white"
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

  const calculateDisciplineProgress = (checks: any[]) => {
    const passed = checks.filter((check) => check.status === "passed").length
    return Math.round((passed / checks.length) * 100)
  }

  const handleViewDetails = (check: any) => {
    setSelectedCheck(check)
    setIsDetailsOpen(true)
  }

  const getDetailedAnalysis = (check: any) => {
    const analyses = {
      "Downtown Office Complex - HVAC Design": {
        summary: "Comprehensive HVAC system review for 15-story office building",
        findings: [
          "Energy efficiency calculations meet ASHRAE 90.1 standards",
          "Zone control systems properly designed for occupancy patterns",
          "Equipment sizing verified for peak load conditions",
        ],
        recommendations: [
          "Consider variable refrigerant flow systems for improved efficiency",
          "Implement smart building controls for optimal performance",
        ],
      },
      "Warehouse Facility - HVAC Layout": {
        summary: "Industrial HVAC system compliance review for 50,000 sq ft warehouse",
        findings: [
          "Insufficient clearance around main AHU unit",
          "Ventilation rates below required minimums for warehouse operations",
        ],
        recommendations: [
          "Relocate equipment or modify layout design",
          "Increase outdoor air intake to meet ASHRAE 62.1 requirements",
        ],
      },
      "Hospital Wing - Emergency Systems": {
        summary: "Critical electrical systems review for new hospital wing",
        findings: [
          "Emergency generator backup insufficient for critical loads",
          "Transfer switch testing procedures not specified",
        ],
        recommendations: [
          "Upgrade emergency generator capacity",
          "Implement comprehensive testing and maintenance protocols",
        ],
      },
      "Office Building - Water Systems": {
        summary: "Plumbing and water system review for 8-story office building",
        findings: [
          "Water pressure calculations show insufficient pressure on upper floors",
          "Backflow prevention devices not properly specified",
        ],
        recommendations: [
          "Install booster pump system for upper floors",
          "Add appropriate backflow prevention assemblies",
        ],
      },
    }

    return (
      analyses[check.name as keyof typeof analyses] || {
        summary: `Comprehensive design review for ${check.name}`,
        findings: ["Design review completed", "Code compliance verified", "System performance analyzed"],
        recommendations: ["Continue with construction documentation", "Schedule periodic design reviews"],
      }
    )
  }

  const generateActionItems = async (check: any) => {
    setIsGenerating(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const actionTemplates = {
      "Office Building - Water Systems": [
        {
          title: "Install Booster Pump System",
          description: "Design and install booster pump system to ensure adequate water pressure on floors 6-8",
          priority: "high",
          assignee: "Mechanical Engineering Team",
          dueDate: "2024-02-15",
          estimatedHours: 40,
          category: "Design Modification",
          dependencies: ["Hydraulic calculations", "Equipment specifications"],
        },
        {
          title: "Specify Backflow Prevention Assemblies",
          description: "Update plumbing drawings to include appropriate backflow prevention devices per local code",
          priority: "high",
          assignee: "Plumbing Designer",
          dueDate: "2024-02-10",
          estimatedHours: 16,
          category: "Code Compliance",
          dependencies: ["Code review", "Equipment selection"],
        },
        {
          title: "Revise Water System Calculations",
          description: "Recalculate water pressure throughout building with proposed booster pump system",
          priority: "medium",
          assignee: "Senior Mechanical Engineer",
          dueDate: "2024-02-20",
          estimatedHours: 24,
          category: "Analysis",
          dependencies: ["Booster pump specifications"],
        },
      ],
      "Warehouse Facility - HVAC Layout": [
        {
          title: "Relocate Main AHU Unit",
          description: "Modify HVAC layout to provide required clearances around main air handling unit",
          priority: "high",
          assignee: "HVAC Design Team",
          dueDate: "2024-02-12",
          estimatedHours: 32,
          category: "Layout Revision",
          dependencies: ["Space planning", "Ductwork rerouting"],
        },
        {
          title: "Increase Outdoor Air Intake",
          description:
            "Resize outdoor air intake to meet ASHRAE 62.1 ventilation requirements for warehouse operations",
          priority: "high",
          assignee: "HVAC Engineer",
          dueDate: "2024-02-08",
          estimatedHours: 20,
          category: "Code Compliance",
          dependencies: ["Ventilation calculations", "Equipment sizing"],
        },
      ],
      "Hospital Wing - Emergency Systems": [
        {
          title: "Upgrade Emergency Generator Capacity",
          description: "Specify larger emergency generator to handle all critical electrical loads during power outage",
          priority: "critical",
          assignee: "Electrical Engineering Team",
          dueDate: "2024-02-05",
          estimatedHours: 48,
          category: "Equipment Upgrade",
          dependencies: ["Load calculations", "Generator specifications"],
        },
        {
          title: "Develop Testing Protocols",
          description: "Create comprehensive testing and maintenance procedures for emergency power systems",
          priority: "medium",
          assignee: "Electrical Engineer",
          dueDate: "2024-02-18",
          estimatedHours: 16,
          category: "Documentation",
          dependencies: ["Equipment manuals", "Code requirements"],
        },
      ],
    }

    const actions = actionTemplates[check.name as keyof typeof actionTemplates] || [
      {
        title: "Review Design Requirements",
        description: `Comprehensive review of ${check.name} design requirements and code compliance`,
        priority: "medium",
        assignee: "Design Team",
        dueDate: "2024-02-15",
        estimatedHours: 24,
        category: "Review",
        dependencies: ["Design documents", "Code analysis"],
      },
    ]

    setGeneratedActions(actions)
    setIsGenerating(false)
  }

  const handleCreateActionItem = async (check: any) => {
    setIsActionItemOpen(true)
    await generateActionItems(check)
  }

  const handleAssignTask = async (actionIndex: number) => {
    const newAssigned = new Set(assignedTasks)
    const newCreated = new Set(createdTasks)

    newAssigned.add(actionIndex)
    newCreated.add(actionIndex)

    setAssignedTasks(newAssigned)
    setCreatedTasks(newCreated)

    setTimeout(() => {}, 500)
  }

  const handleCreateAllTasks = async () => {
    setIsCreatingTasks(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const allTaskIndices = new Set(generatedActions.map((_, index) => index))
    setCreatedTasks(allTaskIndices)
    setAssignedTasks(allTaskIndices)
    setIsCreatingTasks(false)
    setShowSuccessMessage(true)

    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-xl">Detailed Compliance Review</CardTitle>
          <CardDescription>Code compliance status by engineering discipline</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hvac" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hvac">HVAC</TabsTrigger>
              <TabsTrigger value="electrical">Electrical</TabsTrigger>
              <TabsTrigger value="mechanical">Mechanical</TabsTrigger>
            </TabsList>

            {currentProject.disciplines.map((discipline, index) => (
              <TabsContent
                key={discipline.name}
                value={index === 0 ? "hvac" : index === 1 ? "electrical" : "mechanical"}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-semibold text-lg">{discipline.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-600">
                      {calculateDisciplineProgress(discipline.checks)}% Complete
                    </span>
                    <Progress value={calculateDisciplineProgress(discipline.checks)} className="w-24 h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  {discipline.checks.map((check, checkIndex) => (
                    <div key={checkIndex} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 mb-1">{check.name}</h4>
                          <p className="text-sm text-slate-600">Code Reference: {check.code}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getPriorityColor(check.priority)}>
                            {check.priority}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(check.status)}>
                            {check.status}
                          </Badge>
                        </div>
                      </div>

                      {check.status === "failed" && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <svg
                              className="w-4 h-4 text-red-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-red-800">Design Issue Detected</p>
                              <p className="text-sm text-red-700 mt-1">
                                {check.name.includes("Warehouse Facility")
                                  ? "HVAC equipment clearances and ventilation rates require design modifications."
                                  : check.name.includes("Hospital Wing")
                                    ? "Emergency electrical systems need capacity upgrades and testing protocols."
                                    : "Water system pressure and backflow prevention require engineering revisions."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {check.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <svg
                              className="w-4 h-4 text-yellow-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Review In Progress</p>
                              <p className="text-sm text-yellow-700 mt-1">
                                AI analysis and engineering review in progress. Design verification pending.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {check.status === "passed" && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <svg
                              className="w-4 h-4 text-green-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-green-800">Design Approved</p>
                              <p className="text-sm text-green-700 mt-1">
                                Project design meets all code requirements and engineering standards.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Last checked: {new Date().toLocaleDateString()}</span>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-transparent"
                            onClick={() => handleViewDetails(check)}
                          >
                            View Details
                          </Button>
                          {check.status === "failed" && (
                            <Button
                              size="sm"
                              className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleCreateActionItem(check)}
                            >
                              Fix Issue
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif font-semibold">{selectedCheck?.name}</DialogTitle>
            <DialogDescription>
              Code Reference: {selectedCheck?.code} | Priority: {selectedCheck?.priority} | Status:{" "}
              {selectedCheck?.status}
            </DialogDescription>
          </DialogHeader>

          {selectedCheck && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Analysis Summary</h4>
                <p className="text-sm text-slate-600">{getDetailedAnalysis(selectedCheck).summary}</p>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-2">Key Findings</h4>
                <ul className="space-y-1">
                  {getDetailedAnalysis(selectedCheck).findings.map((finding, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {getDetailedAnalysis(selectedCheck).recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-green-600 mt-1">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Badge variant="outline" className={getStatusColor(selectedCheck.status)}>
                  {selectedCheck.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                    Close
                  </Button>
                  {selectedCheck.status === "failed" && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleCreateActionItem(selectedCheck)}
                    >
                      Create Action Item
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isActionItemOpen} onOpenChange={setIsActionItemOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif font-semibold flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span>AI-Generated Action Items</span>
            </DialogTitle>
            <DialogDescription>
              AI analysis has generated actionable items to resolve compliance issues for {selectedCheck?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600">
                    AI is analyzing compliance issues and generating action items...
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">AI Analysis Complete</h4>
                      <p className="text-sm text-blue-800">
                        Generated {generatedActions.length} actionable items based on compliance findings and
                        engineering best practices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {generatedActions.map((action, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 mb-1">{action.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{action.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>Category: {action.category}</span>
                            <span>Est. Hours: {action.estimatedHours}</span>
                            <span>Due: {action.dueDate}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(action.priority)}>
                          {action.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-sm text-slate-600">{action.assignee}</span>
                          {assignedTasks.has(index) && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Assigned & Created
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-transparent"
                            onClick={() => handleAssignTask(index)}
                            disabled={assignedTasks.has(index)}
                          >
                            {assignedTasks.has(index) ? "Assigned & Created" : "Assign"}
                          </Button>
                        </div>
                      </div>

                      {action.dependencies && action.dependencies.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Dependencies:</p>
                          <div className="flex flex-wrap gap-1">
                            {action.dependencies.map((dep: string, depIndex: number) => (
                              <Badge key={depIndex} variant="outline" className="text-xs bg-slate-50">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {showSuccessMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-green-900">All Tasks Created Successfully</h4>
                        <p className="text-sm text-green-800">
                          {generatedActions.length} action items have been created and assigned to team members.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-slate-600">
                    Total estimated effort: {generatedActions.reduce((sum, action) => sum + action.estimatedHours, 0)}{" "}
                    hours
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setIsActionItemOpen(false)}>
                      Close
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleCreateAllTasks}
                      disabled={isCreatingTasks || createdTasks.size === generatedActions.length}
                    >
                      {isCreatingTasks ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          <span>Creating Tasks...</span>
                        </div>
                      ) : createdTasks.size === generatedActions.length ? (
                        "All Tasks Created"
                      ) : (
                        "Create All Tasks"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
