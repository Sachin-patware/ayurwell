'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, KeyRound, Camera } from 'lucide-react';
import { doc } from 'firebase/firestore';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth, useFirestore, useUser, setDocumentNonBlocking, useDoc, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    age: z.coerce.number().min(1, "Please enter a valid age.").optional(),
    gender: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function PatientProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const auth = useAuth();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    
    const userDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
    const { data: userData, isLoading: isDocLoading } = useDoc<ProfileFormValues>(userDocRef);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            age: undefined,
            gender: '',
            phone: '',
            location: '',
        }
    });

    const { reset } = form;
    useEffect(() => {
        if (userData) {
            reset(userData);
        }
    }, [userData, reset]);

    const handleSaveChanges = async (data: ProfileFormValues) => {
        if (!user || !firestore) return;
        setIsSaving(true);
        
        const userRef = doc(firestore, 'users', user.uid);
        try {
            // We only update fields that are in our schema, leaving others (like role) untouched
            const dataToSave = {
                name: data.name,
                age: data.age,
                gender: data.gender,
                phone: data.phone,
                location: data.location,
            };

            setDocumentNonBlocking(userRef, dataToSave, { merge: true });

            toast({
                title: "Profile Updated",
                description: "Your information has been successfully saved.",
            });
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: "Update Failed",
                description: error.message || "An unknown error occurred.",
            });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleChangePassword = async () => {
        if (!user?.email) {
            toast({
                variant: 'destructive',
                title: "Cannot Reset Password",
                description: "Your email address is not available.",
            });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, user.email);
            toast({
                title: "Password Reset Email Sent",
                description: "Check your inbox for a link to reset your password.",
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Failed to Send Email",
                description: error.message || "An error occurred. Please try again.",
            });
        }
    };
    
    const isLoading = isUserLoading || isDocLoading;

    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold font-headline mb-8">My Profile</h1>
             {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
             ) : (
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Keep your personal details up to date.
                        </CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSaveChanges)}>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24">
                                            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} referrerPolicy="no-referrer" />}
                                            <AvatarFallback className="text-3xl">
                                                {user?.displayName?.charAt(0) || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button size="icon" type="button" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                                            <Camera className="h-4 w-4" />
                                            <span className="sr-only">Change photo</span>
                                        </Button>
                                    </div>
                                     <div className="grid grid-cols-2 gap-4 flex-1">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl><Input type="email" {...field} disabled /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl><Input type="tel" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address / Location</FormLabel>
                                            <FormControl><Input placeholder="e.g., Bangalore, India" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="justify-between">
                                <Button variant="outline" type="button" onClick={handleChangePassword}>
                                    <KeyRound className="mr-2"/> Change Password
                                </Button>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            )}
        </div>
    );
}
