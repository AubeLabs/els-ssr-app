// src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';

import { TimetableEntry } from '../types/index'
import { MealServiceEntry } from '../types/index'

import { fetchTimetable } from '@/utils/fetchTimetable'
import { fetchMealservice } from '@/utils/fetchMealservice'
import { getCurrentDateAndYear } from '@/utils/dateUtils';


const HomePage = () => {
  const [currentDate, setCurrentDate] = useState<{ date: string, year: string }>();
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [meals, setMeals] = useState<MealServiceEntry[]>([]);

  const [grade, setGrade] = useState('2'); // 학년 설정 (기본값)
  const [classNm, setClassNm] = useState('2'); // 반 설정 (기본값)

  useEffect(() => {
    const {date, year} = getCurrentDateAndYear();
    setCurrentDate({date, year});

    const fetchData = async () => {
      try {
        const timetableData = await fetchTimetable(date, year, grade, classNm)
        console.log(timetableData);
        setTimetable(timetableData)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }

      try {
        const mealserviceData = await fetchMealservice(date)
        setMeals(mealserviceData)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [grade, classNm]);

  function formatDate(dateStr : string) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl font-bold">{formatDate(currentDate? currentDate.date : '')}</h1>
      <h1 className="text-2xl font-bold">서울이문초등학교 {grade}학년 {classNm}반</h1>
    </div>
    <div className="p-4">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">시간표</h1>
        {timetable.length ? (
          <ul>
            {timetable.map((entry, index) => (
              <li key={index} className="mt-2">
                <span className="font-semibold">{entry.PERIO} 교시 : </span>
                {entry.ITRT_CNTNT}
              </li>
            ))}
          </ul>
        ) : (
          <p>No timetable data available.</p>
        )}
      </div>
    </div>
    <div className="p-4">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">급식정보</h1>
        {meals.length ? (
          <>
            {meals.map((entry, index) => (
              <ul key={index}>
                <li key='DDISH${index}' className="mt-2">
                  <span className="font-semibold">요리 : </span><br/>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: entry.DDISH_NM,
                    }}
                  />
                </li>
                <li key='ORPLC${index}' className="mt-2">
                  <span className="font-semibold">원산지 : </span><br/>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: entry.ORPLC_INFO,
                    }}
                  />
                </li>
                <li key='CAL${index}' className="mt-2">
                  <span className="font-semibold">칼로리 : </span>
                  {entry.CAL_INFO}
                </li>
                <li key='NTR${index}' className="mt-2">
                  <span className="font-semibold">영양정보 : </span><br/>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: entry.NTR_INFO,
                    }}
                  />
                </li>
              </ul>
            ))}
            </>
        ) : (
          <p>No mealservice data available.</p>
        )}
      </div>
      <div className="mt-4">
      - 요리명에 표시된 번호 : 알레르기를 유발할수 있는 식재료입니다.<br/>
      - 알레르기 유발 식재료 번호 : 1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀, 7.고등어, 8.게, 9.새우, 10.돼지고기, 11.복숭아, 12.토마토, 13.아황산류, 14.호두, 15.닭고기, 16.쇠고기, 17.오징어, 18.조개류(굴, 전복, 홍합 포함), 19.잣
      </div>
    </div>
    </>
  )
}

export default HomePage;