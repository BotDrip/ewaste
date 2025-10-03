import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Recycle } from 'lucide-react';

export function Navbar() {
  const { user, vendor, admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <Recycle className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            E-Waste Recycler
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">Welcome, {user.name}!</span>
              <div className="hidden sm:flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-semibold">
                <span>Points:</span>
                <span className="text-primary">{user.points}</span>
              </div>
              <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
              <Link to="/ai-detection"><Button variant="ghost">AI Detection</Button></Link>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </>
          ) : vendor ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">Welcome, {vendor.name}!</span>
              <Link to="/vendor/dashboard"><Button variant="ghost">Dashboard</Button></Link>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </>
          ) : admin ? (
             <>
              <span className="hidden sm:inline text-sm text-muted-foreground">Welcome, {admin.name}!</span>
              <Link to="/admin/dashboard"><Button variant="ghost">Admin Panel</Button></Link>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost">Login</Button></Link>
              <Link to="/signup"><Button variant="default">Sign Up</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}