import { useState } from "react";
import { Sidebar, SidebarItem, Icon, Tooltip } from "gravity-ui"; // adjust import path if needed
import { User, Calendar, Users } from "lucide-react";

export const SidebarSections = {
  PROFILE: "profile",
  SCHEDULE: "schedule",
  PATIENTS: "patients",
};

export default function DoctorSidebar({ active, onSelect }) {
  const items = [
    { id: SidebarSections.PROFILE, label: "Doctor Profile", icon: <User size={20} /> },
    { id: SidebarSections.SCHEDULE, label: "Today's Schedule", icon: <Calendar size={20} /> },
    { id: SidebarSections.PATIENTS, label: "Today's Patient List", icon: <Users size={20} /> },
  ];

  return (
    <Sidebar width={80} className="gravity-sidebar">
      {items.map((it) => (
        <SidebarItem key={it.id} active={active === it.id} onClick={() => onSelect(it.id)}>
          <Tooltip content={it.label} placement="right">
            <Icon>{it.icon}</Icon>
          </Tooltip>
        </SidebarItem>
      ))}
    </Sidebar>
  );
}
