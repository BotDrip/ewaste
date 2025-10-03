import * as React from 'react';
import { Link } from 'react-router-dom';
import { VendorLoginForm } from '../features/auth/VendorLoginForm';
import { Recycle } from 'lucide-react';

export function VendorLoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <Recycle className="mx-auto mb-2 h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Vendor Portal</h2>
            <p className="text-muted-foreground">
              Sign in to view and manage pickups.
            </p>
        </div>
        <VendorLoginForm />
         <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
            Are you a user?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login Here
            </Link>
          </p>
      </div>
    </div>
  );
}