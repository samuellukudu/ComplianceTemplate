export interface Project {
  id: string
  name: string
  type: string
  status: "In Progress" | "Pending Review" | "Completed"
  progress: number
  lastActivity: string
  compliance: number
  totalChecks: number
  createdAt: Date
  files: string[]
  discipline: string
  description?: string
}

export const saveProject = (project: Project): void => {
  if (typeof window === "undefined") return

  const existingProjects = getProjects()
  const updatedProjects = [project, ...existingProjects.filter((p) => p.id !== project.id)]

  localStorage.setItem("architectural-projects", JSON.stringify(updatedProjects))
}

export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("architectural-projects")
    if (!stored) return []

    const projects = JSON.parse(stored)
    return projects.map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt),
    }))
  } catch {
    return []
  }
}

export const updateProject = (id: string, updates: Partial<Project>): void => {
  const projects = getProjects()
  const updatedProjects = projects.map((p) =>
    p.id === id ? { ...p, ...updates, lastActivity: new Date().toISOString() } : p,
  )

  if (typeof window !== "undefined") {
    localStorage.setItem("architectural-projects", JSON.stringify(updatedProjects))
  }
}
