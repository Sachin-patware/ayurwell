import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dietPlans } from "@/lib/placeholder-data";
import { BookHeart, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DietPlansPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold font-headline">Diet Plans</h1>
                <Button asChild>
                <Link href="/practitioner/diet-plans/generate">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New AI Diet Plan
                </Link>
                </Button>
            </div>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookHeart className="text-primary"/>
                        Manage Diet Plans
                    </CardTitle>
                    <CardDescription>
                        Here are the diet plans you've created for your patients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {dietPlans.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {dietPlans.map(plan => (
                                <Card key={plan.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-headline">{plan.patientName}</CardTitle>
                                        <CardDescription>Created on {plan.creationDate}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full">
                                            <Link href={`/practitioner/diet-plans/${plan.id}/edit?patientId=${plan.patientId}`}>View or Edit</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <p>No diet plans created yet.</p>
                            <Button variant="link" asChild><Link href="/practitioner/diet-plans/generate">Create one now</Link></Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
