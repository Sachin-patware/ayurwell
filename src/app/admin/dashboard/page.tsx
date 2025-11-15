import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-primary"/>
                    Admin Dashboard
                </h1>
            </div>

            <Tabs defaultValue="foods">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="foods">Manage Foods</TabsTrigger>
                    <TabsTrigger value="users">Manage Users</TabsTrigger>
                    <TabsTrigger value="doctors">Manage Doctors</TabsTrigger>
                    <TabsTrigger value="logs">System Logs</TabsTrigger>
                </TabsList>
                <TabsContent value="foods">
                    <Card>
                        <CardHeader>
                            <CardTitle>Food Database</CardTitle>
                            <CardDescription>
                                Add, edit, or delete food items from the system.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                            <p>Food management table will be here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                View and manage all user accounts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                            <p>User management table will be here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="doctors">
                    <Card>
                        <CardHeader>
                            <CardTitle>Practitioner Management</CardTitle>
                            <CardDescription>
                                Verify and manage practitioner accounts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                            <p>Practitioner management table will be here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="logs">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Logs</CardTitle>
                            <CardDescription>
                                Review important system events and actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground py-12">
                            <p>System logs will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
