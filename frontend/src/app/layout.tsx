// frontend/src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevCollab - Real-Time Collaborative Editor',
  description: 'A platform where developers can edit documents and code simultaneously in real-time.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}