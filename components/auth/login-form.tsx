"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [discipline, setDiscipline] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // For now, just redirect to dashboard (will be implemented later)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // For now, just redirect to dashboard (will be implemented later)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login" className="font-medium">
          Sign In
        </TabsTrigger>
        <TabsTrigger value="signup" className="font-medium">
          Sign Up
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="engineer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-medium" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup" className="space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-slate-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="font-medium text-slate-700">
                Company
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Engineering Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline" className="font-medium text-slate-700">
              Engineering Discipline
            </Label>
            <select
              id="discipline"
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              required
              className="w-full h-11 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select your discipline</option>
              <option value="hvac">HVAC Engineering</option>
              <option value="mechanical">Mechanical Engineering</option>
              <option value="electrical">Electrical Engineering</option>
              <option value="structural">Structural Engineering</option>
              <option value="civil">Civil Engineering</option>
              <option value="plumbing">Plumbing Engineering</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="font-medium text-slate-700">
              Email Address
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="engineer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="font-medium text-slate-700">
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="h-11"
            />
          </div>

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 font-medium" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </TabsContent>

      <Separator className="my-6" />

      <div className="text-center space-y-2">
        <p className="text-sm text-slate-600">Trusted by engineering teams at</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Fortune 500
          </Badge>
          <Badge variant="secondary" className="text-xs">
            AEC Firms
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Consultancies
          </Badge>
        </div>
      </div>
    </Tabs>
  )
}
