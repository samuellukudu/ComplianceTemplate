import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BuildingCodesSearch } from "@/components/building-codes/building-codes-search"

export default function BuildingCodesPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Building Codes Search</h1>
          <p className="text-slate-600">Search and retrieve relevant building code sections and requirements</p>
        </div>
        <div className="flex-1 min-h-0">
          <BuildingCodesSearch />
        </div>
      </main>
    </div>
  )
}
