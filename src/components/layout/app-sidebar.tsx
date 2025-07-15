'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {LayoutDashboard, Bot, Calculator, Archive, Users, Settings, LogOut, Sailboat, Route, Fuel, FileText, Anchor, Activity} from 'lucide-react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const Logo = () => (
  <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
    <Sailboat className="w-8 h-8 text-primary" />
    <h1 className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden whitespace-nowrap">NavisAI Lite</h1>
  </div>
);

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {href: '/', label: 'Dashboard', icon: LayoutDashboard},
    {href: '/email-parser', label: 'AI Email Parser', icon: Bot},
    {href: '/laytime-calculator', label: 'Laytime Calculator', icon: Calculator},
    {href: '/document-vault', label: 'Document Vault', icon: Archive},
    {href: '/collaboration', label: 'Collaboration', icon: Users},
    {href: '/route-optimization', label: 'Route Optimization', icon: Route},
    {href: '/bunker-predictor', label: 'Bunker Predictor', icon: Fuel},
    {href: '/voyage-reporting', label: 'Voyage Reporting', icon: FileText},
    {href: '/charter-analysis', label: 'Charter Analysis', icon: Anchor},
    {href: '/vessel-monitoring', label: 'Vessel Monitoring', icon: Activity},
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={{children: item.label}}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children: 'Settings'}}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children: 'Logout'}}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
