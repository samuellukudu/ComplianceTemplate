import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "AI Design Assistant",
      description: "Ask questions about your CAD files",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      action: "Start Chat",
      href: "/chat",
    },
    {
      title: "Export Reports",
      description: "Generate compliance and technical reports",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      action: "Export Data",
      href: "/export",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-serif font-semibold text-xl text-slate-900">Quick Actions</h3>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {action.icon}
                </div>
                <div>
                  <CardTitle className="font-serif font-medium text-base">{action.title}</CardTitle>
                  <CardDescription className="text-sm">{action.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={action.href}>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {action.action}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif font-semibold text-lg text-slate-900">Need Help?</CardTitle>
          <CardDescription>Get started with our comprehensive guides and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
            View Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
