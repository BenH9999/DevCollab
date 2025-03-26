// frontend/src/app/auth/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}