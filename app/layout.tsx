import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Learnova AI | Student Workspace',
  description: 'A thoughtful student portal for classes, notes, assignments, quizzes and announcements.',
 verification: {
  google: 'uDS-fDPLN8zVqiIivDZUwv3tjhpE1WlsCucJcfdOPUw',
},
};

export default function RootLayout({
  children,
}: Readonly<{}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}