import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.internship.deleteMany({})

  // Create sample internships
  const internships = [
    {
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      job_url: "https://careers.google.com",
      job_description: "Join our team for a summer internship working on cutting-edge technology.",
      programme_name: "Summer Internship Program",
      opening_date: "2023-09-01",
      closing_date: "2023-12-15",
      status: "Open",
      job_type: "Summer Internship",
    },
    {
      title: "Data Science Intern",
      company: "Microsoft",
      location: "Redmond, WA",
      job_url: "https://careers.microsoft.com",
      job_description: "Work with our data science team to build machine learning models.",
      programme_name: "Summer Internship Program",
      opening_date: "2023-09-15",
      closing_date: "2023-12-31",
      status: "Open",
      job_type: "Summer Internship",
    },
    {
      title: "Product Management Intern",
      company: "Amazon",
      location: "Seattle, WA",
      job_url: "https://amazon.jobs",
      job_description: "Join our product team to help define and launch new features.",
      programme_name: "Summer Internship Program",
      opening_date: "2023-10-01",
      closing_date: "2024-01-15",
      status: "Open",
      job_type: "Summer Internship",
    },
  ]

  for (const internship of internships) {
    await prisma.internship.create({
      data: internship,
    })
  }

  console.log(`Seeded ${internships.length} internships`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

