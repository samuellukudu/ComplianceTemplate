import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function ProjectsPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h2 className="font-serif font-bold text-3xl text-slate-900 mb-2">Recent Projects</h2>
          <p className="text-slate-600">View and manage your architectural design review projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-2">
            <ProjectOverview />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
