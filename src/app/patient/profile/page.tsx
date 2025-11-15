import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, KeyRound } from "lucide-react";

export default function PatientProfilePage() {
    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold font-headline mb-8">My Profile</h1>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        Keep your personal details up to date.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Priya Sharma" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="priya.sharma@example.com" disabled />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" defaultValue="32" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" defaultValue="Female" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Wellness Lane, Bangalore, India" />
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button variant="outline"><KeyRound className="mr-2"/> Change Password</Button>
                    <Button><Save className="mr-2" /> Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
