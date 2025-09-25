import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { patients } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function PatientsPage() {
  const patientAvatars = new Map(PlaceHolderImages.filter(img => img.id.startsWith('avatar')).map(img => [img.id, img]));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-headline">Patients</h1>
        <Button asChild>
          <Link href="/practitioner/add-patient">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>A list of all patients in your practice.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Prakriti</TableHead>
                    <TableHead className="hidden md:table-cell">Dosha Imbalance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={patientAvatars.get(patient.avatar)?.imageUrl} />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">{patient.email}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{patient.prakriti}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.dosha}</TableCell>
                    <TableCell>
                        <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'} className={patient.status === 'Active' ? 'bg-primary/80 text-primary-foreground' : ''}>
                        {patient.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/practitioner/patients/${patient.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </>
  );
}
