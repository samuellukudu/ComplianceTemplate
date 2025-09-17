import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BuildingCodesSearch } from "@/components/building-codes/building-codes-search"
import { BuildingCodesUpload } from "@/components/building-codes/building-codes-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload } from "lucide-react"

export default function BuildingCodesPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Building Codes</h1>
          <p className="text-slate-600">Search existing codes or upload your own building code documents</p>
        </div>

        <div className="flex-1 min-h-0">
          <Tabs defaultValue="search" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Codes
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="flex-1 min-h-0">
              <BuildingCodesSearch />
            </TabsContent>

            <TabsContent value="upload" className="flex-1 min-h-0">
              <BuildingCodesUpload />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
