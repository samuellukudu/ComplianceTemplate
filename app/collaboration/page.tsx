import { TeamOverview } from "@/components/collaboration/team-overview"
import { ProjectSharing } from "@/components/collaboration/project-sharing"
import { ActivityFeed } from "@/components/collaboration/activity-feed"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function CollaborationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-serif font-bold text-3xl text-slate-900 mb-2">Team Collaboration</h1>
            <p className="text-slate-600 text-lg">
              Manage team members, share projects, and collaborate on design reviews
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <TeamOverview />
              <ProjectSharing />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
