'use client';

import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [school, setSchool] = useState('7021105');    // 7021105:서울이문초등학교
    const [grade, setGrade] = useState('2');
    const [classroom, setClassroom] = useState('2');
    // const [date, setDate] = useState('');

    useEffect(() => {
        const storedSettings = localStorage.getItem('settings');
        if (storedSettings) {
            const { school, grade, classroom, date } = JSON.parse(storedSettings);
            setSchool(school);
            setGrade(grade);
            setClassroom(classroom);
        } else {
            // setDate(new Date().toISOString().split('T')[0]); // Set default date to today
        }
    }, []);

    const handleSave = () => {
        const settings = { school, grade, classroom };
        localStorage.setItem('settings', JSON.stringify(settings));
        alert('Settings saved!');
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">환경설정</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700">
                            초등학교
                            <input
                                type="text"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            학년
                            <input
                                type="number"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            반
                            <input
                                type="number"
                                value={classroom}
                                onChange={(e) => setClassroom(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div>
                    {/* <div>
                        <label className="block text-gray-700">
                            일자
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </label>
                    </div> */}
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
