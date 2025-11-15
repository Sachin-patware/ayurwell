'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, User, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';


const practitionerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const patientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  doctorId: z.string().min(1, "Doctor ID is required."),
});

type PractitionerFormValues = z.infer<typeof practitionerSchema>;
type PatientFormValues = z.infer<typeof patientSchema>;

export default function LoginPage() {
  const [role, setRole] = useState('practitioner');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const practitionerForm = useForm<PractitionerFormValues>({
    resolver: zodResolver(practitionerSchema),
    defaultValues: {
      email: 'dr.anjali@ayurwell.com',
      password: 'password',
    },
  });

  const patientForm = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      email: 'priya.sharma@example.com',
      password: 'password',
      doctorId: 'D12345',
    },
  });

  const handleLogin: SubmitHandler<PractitionerFormValues | PatientFormValues> = (data) => {
    setIsLoading(true);
    initiateEmailSignIn(auth, data.email, data.password);
    toast({
      title: "Logging In...",
      description: "You will be redirected shortly.",
    });

    // The redirection will be handled by a listener in a parent component
    // but for now, we'll keep the manual push for demonstration
      if (role === 'practitioner') {
        setTimeout(() => router.push('/practitioner/dashboard'), 1000);
      } else {
        setTimeout(() => router.push('/patient/dashboard'), 1000);
      }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Tabs defaultValue="practitioner" className="w-full" onValueChange={(value) => {
          setRole(value);
          practitionerForm.reset();
          patientForm.reset();
        }}>
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
              <Form {...practitionerForm}>
                <form onSubmit={practitionerForm.handleSubmit(handleLogin)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={practitionerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={practitionerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Don't have an account?{' '}
                      <Link href="#" className="underline hover:text-primary">
                        Register
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Form>
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
               <Form {...patientForm}>
                <form onSubmit={patientForm.handleSubmit(handleLogin)}>
                <CardContent className="space-y-4">
                   <FormField
                      control={patientForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="patient@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={patientForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={patientForm.control}
                      name="doctorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor ID</FormLabel>
                          <FormControl>
                            <Input placeholder="D12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                      Don't have an account?{' '}
                      <Link href="#" className="underline hover:text-primary">
                        Register
                      </Link>
                    </p>
                </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
