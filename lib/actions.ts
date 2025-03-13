"use server"

import { prisma } from "./db"
import type { Internship } from "./types"

export async function getInternships(filters: Record<string, string>): Promise<Internship[]> {
  try {
    // Build where clause based on filters
    const where: any = {}

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        // Handle boolean fields
        if (
          [
            "applied",
            "hidden",
            "interview",
            "rejected",
            "cover_letter_requirement",
            "written_answers_requirement",
          ].includes(key)
        ) {
          where[key] = value.toLowerCase() === "true"
        }
        // Handle date fields
        else if (key.includes("date")) {
          where[key] = {
            contains: value,
          }
        }
        // Handle text fields
        else {
          where[key] = {
            contains: value,
            mode: "insensitive", // Case insensitive search
          }
        }
      }
    })

    // Fetch internships with filters
    const internships = await prisma.internship.findMany({
      where,
      orderBy: {
        date_loaded: "desc",
      },
      take: 100, // Limit to 100 results for performance
    })

    return internships
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to fetch internships")
  }
}

