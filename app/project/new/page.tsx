"use client"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectChatInterface } from "@/components/project/project-chat-interface"
import { ProjectSetupSidebar } from "@/components/project/project-setup-sidebar"

export default function NewProjectPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <div className="flex-1 min-h-0 flex">
        <ProjectSetupSidebar />
        <div className="flex-1 min-h-0">
          <ProjectChatInterface />
        </div>
      </div>
    </div>
  )
}
