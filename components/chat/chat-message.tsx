import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  fileContext?: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatContent = (content: string) => {
    // Convert markdown-like formatting to JSX
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <div key={index} className="font-semibold text-slate-900 mt-3 mb-2">
            {line.slice(2, -2)}
          </div>
        )
      }
      if (line.startsWith("• ")) {
        return (
          <div key={index} className="ml-4 text-slate-700">
            {line}
          </div>
        )
      }
      if (line.startsWith("✅ ")) {
        return (
          <div key={index} className="flex items-center space-x-2 text-green-700 ml-4">
            <span>✅</span>
            <span>{line.slice(2)}</span>
          </div>
        )
      }
      if (line.startsWith("⚠️ ")) {
        return (
          <div key={index} className="flex items-center space-x-2 text-yellow-700 ml-4">
            <span>⚠️</span>
            <span>{line.slice(2)}</span>
          </div>
        )
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={index} className="ml-4 text-slate-700">
            {line}
          </div>
        )
      }
      if (line.trim() === "") {
        return <div key={index} className="h-2" />
      }
      return (
        <div key={index} className="text-slate-700">
          {line}
        </div>
      )
    })
  }

  if (message.type === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] space-y-1">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-2">
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
          <div className="flex items-center justify-end space-x-2 text-xs text-slate-500">
            {message.fileContext && (
              <Badge variant="outline" className="text-xs">
                {message.fileContext}
              </Badge>
            )}
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-1">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <span className="font-medium text-slate-900">AI Assistant</span>
          {message.fileContext && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {message.fileContext}
            </Badge>
          )}
        </div>
        <div className="bg-slate-100 rounded-lg px-4 py-3">
          <div className="space-y-1">{formatContent(message.content)}</div>
        </div>
        <div className="text-xs text-slate-500 ml-10">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  )
}
