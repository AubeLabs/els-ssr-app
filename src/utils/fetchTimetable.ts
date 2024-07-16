// src/utils/fetchTimetable.ts
import { TimetableEntry } from '../types/index'

export async function fetchTimetable(school: string, date: string, year: string, grade: string, classNm: string): Promise<TimetableEntry[]> {
//   const apiKey = process.env.NEIS_API_KEY
  // const apiUrl = 'http://localhost:8000'
  const apiUrl = 'http://fastapi-nlb-55a77074abb440ea.elb.ap-northeast-2.amazonaws.com'

  const response = await fetch(
    `${apiUrl}/api/els-timetable/B10/${school}/${year}/${grade}/${classNm}/${date}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch timetable data')
  }

  const data = await response.json()

  return data.elsTimetable?.[1]?.row || []
}
