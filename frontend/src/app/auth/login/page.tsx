// frontend/src/app/auth/login/page.tsx
import { AuthPage, LoginForm } from '@/components/auth';

export default function LoginPage() {
  return (
    <AuthPage title="Login">
      <LoginForm />
    </AuthPage>
  );
}