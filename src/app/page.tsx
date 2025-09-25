import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Stethoscope, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                Personalized Ayurvedic Wellness
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
                Harmonize Your Health with AyurWell
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover the balance of body and mind through personalized Ayurvedic diet plans. AyurWell connects you with expert practitioners to craft a wellness journey unique to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/login">
                    Practitioner Portal <Stethoscope className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="font-semibold">
                  <Link href="/login">
                    Patient Portal <User className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-105"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </section>

        <section className="bg-card py-12 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Features for a Balanced Life</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        AyurWell provides a comprehensive suite of tools for both practitioners and patients to collaborate on the path to wellness.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-background/70 border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Leaf className="text-primary"/>
                                AI-Powered Diet Plans
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Generate personalized Ayurvedic diet plans instantly, based on deep analysis of patient profiles and health data.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-background/70 border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Stethoscope className="text-primary"/>
                                Practitioner Dashboard
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Manage patients, track progress, and refine diet plans with an intuitive and powerful interface.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-background/70 border-2 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <User className="text-primary"/>
                                Patient Progress Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Patients can easily log meals, track habits, and view their progress, fostering engagement and adherence.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AyurWell. All rights reserved.</p>
      </footer>
    </div>
  );
}
