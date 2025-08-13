import { ExportDashboard } from "@/components/export/export-dashboard"
import { ExportHistory } from "@/components/export/export-history"
import { ReportTemplates } from "@/components/export/report-templates"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-serif font-bold text-3xl text-slate-900 mb-2">Data Export Center</h1>
            <p className="text-slate-600 text-lg">
              Generate and download compliance reports, project summaries, and technical data
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <ExportDashboard />
              <ReportTemplates />
            </div>
            <div>
              <ExportHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
