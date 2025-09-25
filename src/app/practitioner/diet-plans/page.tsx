import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
                    New Diet Plan
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
                        This section will list all saved diet plans.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <p>No diet plans created yet.</p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
