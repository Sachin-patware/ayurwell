'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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
import { Logo } from '@/components/logo';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doc } from 'firebase/firestore';

const roleSchema = z.object({
  role: z.enum(['patient', 'practitioner'], { required_error: "Please select a role."}),
});

type RoleFormValues = z.infer<typeof roleSchema>;

export default function SelectRolePage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
  });
  
  const handleRoleSelection: SubmitHandler<RoleFormValues> = async (data) => {
    setIsLoading(true);

    if (!auth.currentUser || !firestore) {
        toast({
            variant: 'destructive',
            title: "Error",
            description: "You must be logged in to select a role.",
        });
        setIsLoading(false);
        router.push('/login');
        return;
    }

    try {
        const user = auth.currentUser;
        const userDocRef = doc(firestore, 'users', user.uid);

        // Developer backdoor for admin user
        const finalRole = user.email === 'admin@ayurwell.com' ? 'admin' : data.role;

        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            role: finalRole,
            createdAt: new Date().toISOString(),
        };
        // Use non-blocking write
        setDocumentNonBlocking(userDocRef, userData, { merge: true });

        toast({
          title: "Role Selected!",
          description: "Your profile has been created. Redirecting...",
        });

        // The AuthStateListener will automatically redirect the user to the correct dashboard.
        // We can just push them to a generic loading or home page to trigger it.
        if (finalRole === 'patient') {
            router.push('/patient/dashboard');
        } else if (finalRole === 'practitioner') {
            router.push('/practitioner/dashboard');
        } else if (finalRole === 'admin') {
            router.push('/admin/dashboard');
        }

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: "Profile Creation Failed",
            description: error.message || "An unknown error occurred.",
        });
        setIsLoading(false);
    }
    // Don't set loading to false here, as we are navigating away
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">One Last Step</CardTitle>
          <CardDescription>
            Please select your role to complete your profile.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRoleSelection)}>
            <CardContent className="space-y-4">
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a...</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="practitioner">Practitioner</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Continue'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
