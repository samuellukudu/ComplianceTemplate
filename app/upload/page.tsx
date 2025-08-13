import { FileUploadArea } from "@/components/upload/file-upload-area"
import { FileManager } from "@/components/upload/file-manager"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-serif font-bold text-3xl text-slate-900 mb-2">CAD File Management</h1>
            <p className="text-slate-600 text-lg">Upload and manage your DXF files for AI-powered design review</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <FileUploadArea />
            </div>
            <div>
              <FileManager />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
