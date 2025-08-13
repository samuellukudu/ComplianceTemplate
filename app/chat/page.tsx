import { ChatInterface } from "@/components/chat/chat-interface"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function ChatPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </div>
  )
}
