
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calculator, ShieldAlert, BookOpen, MessageSquare, Users, Leaf, Megaphone, UserCircle, MapPin } from "lucide-react";
import Image from "next/image";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Logo } from "@/components/icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FriendsListDialog } from "@/components/dashboard/friends-list-dialog";

const totalCommunityMembers = 4; // Based on mock data

export default function DashboardPage() {
  const [name] = useLocalStorage("profile-name", "");
  const [followerCount] = useLocalStorage("social-followers", "0");
  const [bio] = useLocalStorage("profile-bio", "Your bio will appear here.");
  const [location] = useLocalStorage("alert-location", "Your location");
  const [avatar] = useLocalStorage("profile-avatar", "");


  const features = [
    {
      title: "Calculators",
      description: "Tools for rainfall, solar power, and Ohm's law.",
      href: "/calculators",
      icon: <Calculator className="h-6 w-6" />,
    },
    {
      title: "Disaster Alerts",
      description: "Stay informed about natural disaster alerts.",
      href: "/alerts",
      icon: <ShieldAlert className="h-6 w-6" />,
    },
    {
      title: "Resource Hub",
      description: "Gardening tips, zone maps, and guides.",
      href: "/resources",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Community Chat",
      description: "Connect with others and share knowledge.",
      href: "/chat",
      icon: <MessageSquare className="h-6 w-6" />,
    }
  ];

  const welcomeMessage = name ? `Welcome to GridHub, ${name}!` : "Welcome to GridHub, let's get building!";
  
  const formattedFollowerCount = new Intl.NumberFormat('en-US').format(parseInt(followerCount, 10) || 0);

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-2">{welcomeMessage}</h1>
            <p className="text-muted-foreground mb-6">
              Your comprehensive companion for sustainable, off-grid living.
            </p>
          </div>
          <div className="p-8 flex items-center justify-center bg-secondary min-h-[250px]">
            <Logo className="w-48 h-48 text-primary" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatar} data-ai-hint="person avatar" />
                <AvatarFallback>
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">{name || 'Your Profile'}</CardTitle>
            </div>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
             <div className="text-2xl font-bold">{formattedFollowerCount}</div>
            <p className="text-xs text-muted-foreground">Total Followers</p>
            <div className="flex items-center text-xs text-muted-foreground pt-1">
                <MapPin className="h-3 w-3 mr-1.5" />
                <span>{location}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1 truncate">{bio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommunityMembers}</div>
            <p className="text-xs text-muted-foreground pb-2">Total Members</p>
            <FriendsListDialog />
          </CardContent>
        </Card>
         <Card className="col-span-1 sm:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Advertise Here</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <p className="text-xs text-muted-foreground pb-2">Reach a dedicated community of homesteaders.</p>
              <Button asChild size="sm" className="w-full">
                  <Link href="/contact">
                      Contact Sales
                  </Link>
              </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
              <Button variant="link" className="p-0 h-auto mt-4" asChild>
                <Link href={feature.href}>
                  Go to {feature.title}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
