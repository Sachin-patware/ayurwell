
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Stethoscope, User, Zap, Target, LineChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container z-50 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
            {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="z-0"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-primary/60 z-10" />
              <div className="z-20 container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-shadow-lg">
                    Discover Your Body's True Balance
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90 text-shadow">
                    Ayur-Aahar delivers personalized Ayurvedic diet plans, crafted by expert practitioners and powered by AI to harmonize your health.
                </p>
                <Button asChild size="lg" className="font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform hover:scale-105">
                  <Link href="/signup">
                    Get Started Now <Zap className="ml-2 h-5 w-5"/>
                  </Link>
                </Button>
              </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-card py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Begin your journey to wellness in three simple steps.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center p-6">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <User className="h-8 w-8"/>
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">1. Create Your Profile</h3>
                        <p className="text-muted-foreground">Sign up and complete your Ayurvedic profile. This helps our practitioners and AI understand your unique constitution and needs.</p>
                    </div>
                     <div className="flex flex-col items-center p-6">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <Leaf className="h-8 w-8"/>
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">2. Get Your AI-Powered Plan</h3>
                        <p className="text-muted-foreground">Our practitioners use AI to generate a personalized diet plan tailored to balance your doshas and improve your well-being.</p>
                    </div>
                     <div className="flex flex-col items-center p-6">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <LineChart className="h-8 w-8"/>
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">3. Track Your Progress</h3>
                        <p className="text-muted-foreground">Log your meals and habits through our patient dashboard. Collaborate with your practitioner to refine your path to optimal health.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Features for a Balanced Life</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Ayur-Aahar provides a comprehensive suite of tools for both practitioners and patients to collaborate on the path to wellness.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <Zap className="text-primary h-7 w-7"/>
                                AI-Powered Diet Plans
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Generate personalized Ayurvedic diet plans instantly, based on deep analysis of patient profiles and health data.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <Stethoscope className="text-primary h-7 w-7"/>
                                Practitioner Dashboard
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Manage patients, track progress, and refine diet plans with an intuitive and powerful interface.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline">
                                <Target className="text-primary h-7 w-7"/>
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
      <footer className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ayur-Aahar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
