"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, FileText, Users, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-2xl">Welcome to ArchReview AI</CardTitle>
                <CardDescription className="text-lg">
                  Your intelligent design review platform for architectural, HVAC, mechanical, and electrical systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Upload your CAD files, collaborate with your team, and get AI-powered insights to ensure compliance
                  and optimize your designs. Start by creating a new project or uploading your DXF files.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/project/new">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      <Plus className="w-5 h-5 mr-2" />
                      Create New Project
                    </Button>
                  </Link>
                  <Link href="/upload">
                    <Button variant="outline" size="lg" className="font-medium bg-transparent">
                      Upload CAD Files
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-slate-600">Active Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-slate-600">Compliance Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">6</p>
                      <p className="text-sm text-slate-600">Team Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-slate-600">Reviews This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
