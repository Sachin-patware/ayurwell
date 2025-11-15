'use client';

import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Bell, LogOut, User, LayoutDashboard, NotebookPen, MessageSquare, Calendar, ShieldCheck } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function PatientLayout({ children }: { children: ReactNode }) {
    const auth = useAuth();
    const { user } = useUser();
    const router = useRouter();
    
    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    const userName = user?.displayName || "Patient";

    const navItems = [
        { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/patient/diet-plan", label: "My Diet Plan", icon: NotebookPen },
        { href: "/patient/appointments", label: "Appointments", icon: Calendar },
        { href: "/patient/chat", label: "Chat", icon: MessageSquare },
        { href: "/patient/profile", label: "My Profile", icon: User },
    ];
    
    // Add admin link for dev backdoor user
    if (user?.email === 'admin@ayurwell.com') {
      navItems.push({ href: "/admin/dashboard", label: "Admin Panel", icon: ShieldCheck });
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-10 shadow-sm">
                <Logo />
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial" />
                     <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar>
                                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={userName} referrerPolicy="no-referrer" />}
                                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                             {navItems.map(item => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link href={item.href} className="flex items-center cursor-pointer">
                                        <item.icon className="mr-2 h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    );
}
