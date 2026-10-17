import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { 
  title: 'Learnova AI | Student Workspace', 
  description: 'A thoughtful student portal for classes, notes, assignments, quizzes and announcements.' 
};

export default function RootLayout({ 
  children 
}: Readonly<{ 
  children: React.ReactNode 
}>) { 
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  ); 
}