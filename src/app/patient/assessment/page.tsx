import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AssessmentPage() {
    return (
        <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold font-headline mb-8">My Ayurvedic Assessment</h1>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Prakriti & Vikriti Evaluation</CardTitle>
                    <CardDescription>
                        This multi-step assessment helps determine your core constitution and current imbalances.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-16">
                    <p className="text-muted-foreground">Multi-step assessment form coming soon.</p>
                     <Button variant="link" className="mt-2">Start Assessment</Button>
                </CardContent>
            </Card>
        </div>
    );
}
