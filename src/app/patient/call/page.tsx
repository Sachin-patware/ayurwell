
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { practitioner } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CallPage() {
    const practitionerAvatar = PlaceHolderImages.find(img => img.id === practitioner.avatar);

    return (
        <div className="container mx-auto max-w-lg">
            <h1 className="text-3xl font-bold font-headline mb-8 text-center">Call Your Practitioner</h1>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                        {practitionerAvatar && <AvatarImage src={practitionerAvatar.imageUrl} />}
                        <AvatarFallback className="text-3xl">{practitioner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{practitioner.name}</CardTitle>
                    <CardDescription>Ready to connect</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                     <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg">
                        <Video className="mr-3 h-6 w-6" /> Start Video Call
                    </Button>
                    <Button size="lg" variant="outline" className="w-full text-lg">
                        <Phone className="mr-3 h-6 w-6" /> Start Audio Call
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
