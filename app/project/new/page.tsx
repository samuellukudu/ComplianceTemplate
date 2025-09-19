"use client"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectSetupForm } from "@/components/project/project-setup-form"

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="py-8">
        <ProjectSetupForm />
      </main>
    </div>
  )
}
