import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, ShieldCheck, FileText, User, Utensils, Verified } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
                             <div className="flex justify-end">
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Food
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Dosha Effect</TableHead>
                                        <TableHead>Calories</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Ghee</TableCell>
                                        <TableCell>Pacifies Vata & Pitta</TableCell>
                                        <TableCell>112</TableCell>
                                        <TableCell><AdminActionMenu /></TableCell>
                                    </TableRow>
                                     <TableRow>
                                        <TableCell className="font-medium">Mung Dal</TableCell>
                                        <TableCell>Tridoshic</TableCell>
                                        <TableCell>104</TableCell>
                                        <TableCell><AdminActionMenu /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Priya Sharma</TableCell>
                                        <TableCell>priya.sharma@example.com</TableCell>
                                        <TableCell><Badge variant="secondary">Patient</Badge></TableCell>
                                        <TableCell><AdminActionMenu /></TableCell>
                                    </TableRow>
                                     <TableRow>
                                        <TableCell className="font-medium">Dr. Anjali Verma</TableCell>
                                        <TableCell>dr.anjali@ayurwell.com</TableCell>
                                        <TableCell><Badge>Practitioner</Badge></TableCell>
                                        <TableCell><AdminActionMenu /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Specialization</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Dr. Rohan Gupta</TableCell>
                                        <TableCell>Ayurvedic Nutrition</TableCell>
                                        <TableCell><Badge variant="destructive">Unverified</Badge></TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm"><Verified className="mr-2 h-4 w-4"/>Verify</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>2024-08-15 10:30 AM</TableCell>
                                        <TableCell>admin@ayurwell.com</TableCell>
                                        <TableCell>User 'Priya Sharma' profile updated.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}


function AdminActionMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
