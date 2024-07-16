// src/utils/fetchTimetable.ts
import { MealServiceEntry } from '../types/index'

export async function fetchMealservice(school: string, date: string): Promise<MealServiceEntry[]> {
//   const apiKey = process.env.NEIS_API_KEY
  // const apiUrl = 'http://localhost:8000'
  const apiUrl = 'http://fastapi-nlb-55a77074abb440ea.elb.ap-northeast-2.amazonaws.com'

  const response = await fetch(
    `${apiUrl}/api/els-mealservice/B10/${school}/2/${date}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch mealservice data')
  }

  const data = await response.json()

  return data.mealServiceDietInfo?.[1]?.row || []
}
