'use client';

import { useEffect, useState } from 'react';

import { TimetableEntry } from '../types/index'
import { MealServiceEntry } from '../types/index'

import { fetchTimetable } from '@/utils/fetchTimetable'
import { fetchMealservice } from '@/utils/fetchMealservice'
import { getCurrentDateAndYear } from '@/utils/dateUtils';


const MainPage = () => {
  const [settings, setSettings] = useState({ school: '7021105', grade: '2', classroom: '2' });
  const [currentDate, setCurrentDate] = useState<{ date: string, year: string }>();
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [meals, setMeals] = useState<MealServiceEntry[]>([]);

  const [school, setSchool] = useState('7021105'); // 학교 설정 (기본값)
  const [grade, setGrade] = useState('2'); // 학년 설정 (기본값)
  const [classNm, setClassNm] = useState('2'); // 반 설정 (기본값)

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
    }
    setSchool(settings.school || '7021105');
    setGrade(settings.grade || '2');
    setClassNm(settings.classroom || '2');

    const {date, year} = getCurrentDateAndYear();
    setCurrentDate({date, year});

    const fetchData = async () => {
      try {
        const timetableData = await fetchTimetable(school, date, year, grade, classNm)
        // console.log(timetableData);
        setTimetable(timetableData)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (school && grade && classNm) fetchData();
  }, [grade, classNm, school, settings.school, settings.grade, settings.classroom]);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
    }
    setSchool(settings.school || '7021105');

    const {date, year} = getCurrentDateAndYear();
    setCurrentDate({date, year});

    const fetchData = async () => {
      try {
        const mealserviceData = await fetchMealservice(school, date)
        setMeals(mealserviceData)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (school) fetchData();
  }, [school, settings.school]);

  function formatDate(dateStr : string) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">서울이문초등학교 {grade}학년 {classNm}반<br></br>({formatDate(currentDate? currentDate.date : '')})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">시간표</h2>
                {timetable.length ? (
                <ul>
                    {timetable.map((entry, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            {entry.PERIO} 교시 : {entry.ITRT_CNTNT}
                        </li>
                    ))}
                </ul>
                ) : (
                <p>No timetable data available.</p>
                )}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">급식정보</h2>
                {meals.length ? (
                <>
                    {meals.map((entry, index) => (
                      <table key={index} className="min-w-full bg-white rounded-lg shadow-md mb-4 text-sm">
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-semibold">요리</td>
                            <td className="py-2 px-4 border-b">
                              <span dangerouslySetInnerHTML={{
                                __html: entry.DDISH_NM,
                                }}
                              />
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-semibold">원산지</td>
                            <td className="py-2 px-4 border-b">
                              <span dangerouslySetInnerHTML={{
                                __html: entry.ORPLC_INFO,
                                }}
                              />
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-semibold">칼로리</td>
                            <td className="py-2 px-4 border-b">{entry.CAL_INFO}</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-semibold">영양정보</td>
                            <td className="py-2 px-4 border-b">
                              <span dangerouslySetInnerHTML={{
                                __html: entry.NTR_INFO,
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                    <div className='text-xs'>
                    - 요리명에 표시된 번호 : 알레르기를 유발할수 있는 식재료입니다.<br/>
                    - 알레르기 유발 식재료 번호 : 1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀, 7.고등어, 8.게, 9.새우, 10.돼지고기, 11.복숭아, 12.토마토, 13.아황산류, 14.호두, 15.닭고기, 16.쇠고기, 17.오징어, 18.조개류(굴, 전복, 홍합 포함), 19.잣
                    </div>
                </>
                ) : (
                  <p>No mealservice data available.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default MainPage;