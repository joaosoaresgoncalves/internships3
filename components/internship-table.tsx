"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getInternships } from "@/lib/actions"
import type { Internship } from "@/lib/types"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export function InternshipTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Record<string, string>>({})

  // Get initial filters from URL
  useEffect(() => {
    const initialFilters: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      initialFilters[key] = value
    })
    setFilters(initialFilters)
  }, [searchParams])

  // Fetch internships when filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getInternships(filters)
        setInternships(data)
      } catch (error) {
        console.error("Failed to fetch internships:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters])

  // Update URL with filters
  const updateFilters = (column: string, value: string) => {
    const newFilters = { ...filters, [column]: value }
    if (!value) {
      delete newFilters[column]
    }

    setFilters(newFilters)

    // Update URL
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      params.set(key, value)
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  const columns = [
    "id",
    "title",
    "company",
    "location",
    "date",
    "job_url",
    "job_description",
    "applied",
    "hidden",
    "interview",
    "rejected",
    "date_loaded",
    "programme_name",
    "opening_date",
    "closing_date",
    "last_year_opening",
    "cv",
    "cover_letter_requirement",
    "written_answers_requirement",
    "notes",
    "status",
    "job_type",
    "cover_letter",
    "resume",
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="min-w-[150px]">
                  <div className="space-y-2">
                    <div className="capitalize">{column.replace(/_/g, " ")}</div>
                    <Input
                      placeholder="Search column..."
                      value={filters[column] || ""}
                      onChange={(e) => updateFilters(column, e.target.value)}
                      className="h-8"
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading internships...
                  </div>
                </TableCell>
              </TableRow>
            ) : internships.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No internships found.
                </TableCell>
              </TableRow>
            ) : (
              internships.map((internship) => (
                <TableRow key={internship.id}>
                  {columns.map((column) => (
                    <TableCell key={`${internship.id}-${column}`}>{renderCellContent(internship, column)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function renderCellContent(internship: Internship, column: string) {
  const value = internship[column as keyof Internship]

  // Handle boolean values
  if (typeof value === "boolean") {
    return value ? (
      <Badge variant="success" className="bg-green-100 text-green-800">
        Yes
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-800">
        No
      </Badge>
    )
  }

  // Handle dates
  if (column.includes("date") && value) {
    return new Date(value as string).toLocaleDateString()
  }

  // Handle URLs
  if (column === "job_url" && value) {
    return (
      <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        Link
      </a>
    )
  }

  // Handle long text
  if (column === "job_description" || column === "notes" || column === "cover_letter") {
    return <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{value as string}</div>
  }

  return value as React.ReactNode
}

