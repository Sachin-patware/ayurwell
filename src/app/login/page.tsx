'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('practitioner');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'practitioner') {
      router.push('/practitioner/dashboard');
    } else {
      router.push('/patient/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
            <Logo />
        </div>
        <Tabs defaultValue="practitioner" className="w-full" onValueChange={setRole}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practitioner">
              <Stethoscope className="mr-2 h-4 w-4" />
              Practitioner
            </TabsTrigger>
            <TabsTrigger value="patient">
              <User className="mr-2 h-4 w-4" />
              Patient
            </TabsTrigger>
          </TabsList>
          <TabsContent value="practitioner">
            <Card>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-headline">Practitioner Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-practitioner">Email</Label>
                    <Input id="email-practitioner" type="email" placeholder="m@example.com" required defaultValue="dr.anjali@ayurwell.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-practitioner">Password</Label>
                    <Input id="password-practitioner" type="password" required defaultValue="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" type="submit">Login</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="#" className="underline hover:text-primary">
                      Register
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="patient">
            <Card>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-headline">Patient Login</CardTitle>
                <CardDescription>
                  Enter your credentials and your doctor's ID to login
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-patient">Email</Label>
                  <Input id="email-patient" type="email" placeholder="patient@example.com" required defaultValue="priya.sharma@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-patient">Password</Label>
                  <Input id="password-patient" type="password" required defaultValue="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-id">Doctor ID</Label>
                  <Input id="doctor-id" type="text" placeholder="D12345" required defaultValue="D12345" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" type="submit">Login</Button>
                <p className="text-xs text-center text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="#" className="underline hover:text-primary">
                      Register
                    </Link>
                  </p>
              </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
