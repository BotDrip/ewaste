import * as React from 'react';
import { AdminLoginForm } from '@/features/auth/AdminLoginForm';
import { Recycle } from 'lucide-react';

export function AdminLoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <Recycle className="mx-auto mb-2 h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
            <p className="text-muted-foreground">
              Please sign in to continue.
            </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}