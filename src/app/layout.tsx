'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { FaBars, FaHome, FaCog } from 'react-icons/fa';
import './globals.css';
import Head from './head';

const Layout = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
      <html lang="ko">
        <Head />
        <body>
          <div className="flex h-screen">
              {/* Sidebar */}
              <div className={`bg-gray-900 text-white ${sidebarOpen ? 'w-50' : 'w-15'} transition-all duration-300`}>
                  <div className="flex flex-col h-full">
                      <button onClick={toggleSidebar} className="p-4 focus:outline-none">
                        {/* 햄버거 메뉴 아이콘 */}
                        <FaBars />
                      </button>
                      <div className="flex-grow">
                          <ul>
                              <li className="p-4">
                                  <Link href="/" className="flex items-center">
                                      <FaHome />
                                      {sidebarOpen && <span className="ml-4">홈</span>}
                                  </Link>
                              </li>
                              <li className="p-4">
                                  <Link href="/settings" className="flex items-center">
                                      <FaCog />
                                      {sidebarOpen && <span className="ml-4">환경설정</span>}
                                  </Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <header className="bg-white shadow-md z-10">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <h1 className="text-2xl font-semibold text-gray-900 py-4">시간표 및 급식정보</h1>
                      </div>
                  </header>
                  {/* Main Content */}
                  <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                      {children}
                  </main>
              </div>
          </div>
        </body>
      </html>
    );
};

export default Layout;
