export interface Internship {
  id: number
  title: string
  company: string
  location: string
  date: string
  job_url: string
  job_description: string
  applied: boolean
  hidden: boolean
  interview: boolean
  rejected: boolean
  date_loaded: string
  programme_name: string
  opening_date: string
  closing_date: string
  last_year_opening: string
  cv: string
  cover_letter_requirement: boolean
  written_answers_requirement: boolean
  notes: string
  status: string
  job_type: string
  cover_letter: string
  resume: string
  [key: string]: any
}

