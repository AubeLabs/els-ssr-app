// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Elementary School Timetable</title>
        <meta name="description" content="View elementary school timetable" />
      </head>
      <body>{children}</body>
    </html>
  )
}
