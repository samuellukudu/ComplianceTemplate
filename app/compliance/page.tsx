import { ComplianceOverview } from "@/components/compliance/compliance-overview"
import { ComplianceDetails } from "@/components/compliance/compliance-details"
import { IssueTracker } from "@/components/compliance/issue-tracker"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-serif font-bold text-3xl text-slate-900 mb-2">Compliance Dashboard</h1>
            <p className="text-slate-600 text-lg">
              Track design review progress and code compliance across all engineering disciplines
            </p>
          </div>

          <ComplianceOverview />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <ComplianceDetails />
            </div>
            <div>
              <IssueTracker />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
