"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, ExternalLink, BookOpen } from "lucide-react"

interface BuildingCodeResult {
  id: string
  title: string
  code: string
  section: string
  content: string
  relevance: number
  category: string
  lastUpdated: string
}

export function BuildingCodesSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BuildingCodeResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const mockResults: BuildingCodeResult[] = [
    {
      id: "1",
      title: "HVAC System Requirements",
      code: "IBC 2021",
      section: "Section 1203.3",
      content:
        "Mechanical ventilation systems shall be designed to have the capacity to supply the minimum quantity of outdoor air as determined in accordance with Section 1203.4 and the International Mechanical Code.",
      relevance: 95,
      category: "Mechanical",
      lastUpdated: "2021-01-01",
    },
    {
      id: "2",
      title: "Electrical Panel Clearances",
      code: "NEC 2020",
      section: "Article 110.26",
      content:
        "Working space for equipment operating at 600 volts, nominal, or less to ground and likely to require examination, adjustment, servicing, or maintenance while energized shall comply with the dimensions of Table 110.26(A)(1) or Table 110.26(A)(2).",
      relevance: 88,
      category: "Electrical",
      lastUpdated: "2020-01-01",
    },
    {
      id: "3",
      title: "Plumbing Fixture Requirements",
      code: "IPC 2021",
      section: "Section 403.1",
      content:
        "Plumbing fixtures shall conform to the applicable standards referenced in this code. Plumbing fixtures shall be constructed of dense, durable, nonabsorbent materials, shall have smooth surfaces, shall be free from concealed fouling surfaces and shall be of such form and design as to facilitate cleaning.",
      relevance: 82,
      category: "Plumbing",
      lastUpdated: "2021-01-01",
    },
    {
      id: "4",
      title: "Fire Safety Systems",
      code: "NFPA 13",
      section: "Section 8.15.1",
      content:
        "Automatic sprinkler systems shall be hydraulically designed and shall be capable of delivering the densities and quantities of water specified in this standard over the areas specified herein.",
      relevance: 79,
      category: "Fire Safety",
      lastUpdated: "2022-01-01",
    },
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filter mock results based on search query
    const filteredResults = mockResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "mechanical":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "electrical":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "plumbing":
        return "bg-green-100 text-green-800 border-green-200"
      case "fire safety":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search building codes (e.g., HVAC requirements, electrical clearances, fire safety...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="text-base"
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching} className="px-6">
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          {searchResults.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-slate-600">Found {searchResults.length} relevant building code sections</p>
            </div>
          )}

          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-900 mb-2">{result.title}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium">{result.code}</span>
                        </div>
                        <span>•</span>
                        <span>{result.section}</span>
                        <span>•</span>
                        <span>Updated {new Date(result.lastUpdated).getFullYear()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getCategoryColor(result.category)}>
                        {result.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        {result.relevance}% match
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed mb-4">{result.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FileText className="w-4 h-4" />
                      <span>Building Code Reference</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Full Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-600">Try searching for different terms or check your spelling</p>
            </div>
          )}

          {!searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Search Building Codes</h3>
              <p className="text-slate-600 mb-4">
                Enter keywords to find relevant building code sections and requirements
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["HVAC systems", "Electrical clearances", "Fire safety", "Plumbing fixtures"].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-sm"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
