'use client';

import {SidebarTrigger} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Bell} from 'lucide-react';

type AppHeaderProps = {
  title: string;
};

export function AppHeader({title}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="sm:hidden" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Alex Robu" data-ai-hint="man portrait" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
