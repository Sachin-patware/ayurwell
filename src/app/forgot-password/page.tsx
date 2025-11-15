'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail } from 'lucide-react';
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
import { Logo } from '@/components/logo';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { initiatePasswordReset } from '@/firebase/non-blocking-login';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const resetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleReset: SubmitHandler<ResetFormValues> = async (data) => {
    setIsLoading(true);
    try {
        await initiatePasswordReset(auth, data.email);
        setIsSubmitted(true);
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Error Sending Email',
            description: error.message || 'Failed to send password reset email. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Reset Your Password</CardTitle>
          <CardDescription>
            {isSubmitted
              ? "Check your inbox for a password reset link."
              : "Enter your email and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        {isSubmitted ? (
            <CardContent className="text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                    If an account with that email exists, a reset link has been sent. Please check your spam folder.
                </p>
            </CardContent>
        ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleReset)}>
                <CardContent className="space-y-4">
                <FormField
                    control={form.control}
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
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Reset Link'}
                    </Button>
                </CardFooter>
            </form>
            </Form>
        )}
        <CardFooter className="justify-center">
             <Button variant="link" asChild>
                <Link href="/login">Back to Login</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
