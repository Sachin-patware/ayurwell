import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { practitioner, patients } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ChatPage() {
    const practitionerAvatar = PlaceHolderImages.find(img => img.id === practitioner.avatar);
    const patientAvatar = PlaceHolderImages.find(img => img.id === patients[0].avatar);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <h1 className="text-3xl font-bold font-headline mb-4">Chat with Practitioner</h1>
            <Card className="flex-1 flex flex-col shadow-lg rounded-2xl">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        {practitionerAvatar && <AvatarImage src={practitionerAvatar.imageUrl} />}
                        <AvatarFallback>{practitioner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline">{practitioner.name}</CardTitle>
                        <CardDescription>Online</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Patient Message */}
                    <div className="flex items-end gap-2 justify-end">
                        <div className="bg-primary text-primary-foreground p-3 rounded-l-xl rounded-br-xl max-w-xs">
                            <p>Hello Dr. Anjali, I had a question about my lunch today.</p>
                            <p className="text-xs text-primary-foreground/70 mt-1 text-right">3:20 PM</p>
                        </div>
                        <Avatar className="h-8 w-8">
                             {patientAvatar && <AvatarImage src={patientAvatar.imageUrl} />}
                             <AvatarFallback>{patients[0].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                     {/* Practitioner Message */}
                    <div className="flex items-end gap-2">
                         <Avatar className="h-8 w-8">
                             {practitionerAvatar && <AvatarImage src={practitionerAvatar.imageUrl} />}
                             <AvatarFallback>{practitioner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-r-xl rounded-bl-xl max-w-xs">
                            <p>Of course, Priya. What is your question?</p>
                             <p className="text-xs text-muted-foreground/70 mt-1">3:21 PM</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                    <div className="flex w-full items-center space-x-2">
                        <Input type="text" placeholder="Type a message..." className="flex-1" />
                        <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
