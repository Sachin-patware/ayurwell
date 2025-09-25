import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Reports</h1>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="text-primary"/>
                        Patient Adherence
                    </CardTitle>
                    <CardDescription>
                        This section will contain reports on patient progress and diet adherence.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <p>Reporting features are under construction.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
