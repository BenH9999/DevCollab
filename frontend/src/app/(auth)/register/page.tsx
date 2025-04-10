// frontend/src/app/auth/register/page.tsx
import { AuthPage, RegisterForm } from '@/components/auth';

export default function RegisterPage() {
  return (
    <AuthPage title="Register">
      <RegisterForm />
    </AuthPage>
  );
}