import {
  CheckCircleIcon,
  MegaphoneIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  UserMinusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import HomeModernIcon from "@heroicons/react/24/outline/esm/HomeModernIcon";

export const navsideAdmin = [
  {
    title: "Home",
    href: "/admin",
    icon: <HomeModernIcon />,
    color: "#71e279",
  },
  {
    title: "Mis incidencias",
    href: "/admin/incidents",
    icon: <UserIcon />,
    color: "#71e279",
  },
  {
    title: "Asignadas a mi",
    href: "/admin/incidents/assigned",
    icon: <UserCircleIcon />,
    color: "#71e279",
  },
  {
    title: "Incidencias resueltas",
    href: "/admin/incidents/closed",
    icon: <CheckCircleIcon />,
    color: "#71e279",
  },
  {
    title: "Incidencias en curso",
    href: "/admin/incidents/inprogress",
    icon: <MegaphoneIcon />,
    color: "#71e279",
  },
  {
    title: "Administradores",
    href: "/admin/admins",
    icon: <UserGroupIcon />,
    color: "#71e279",
  },
  {
    title: "Usuarios",
    href: "/admin/users",
    icon: <UsersIcon />,
    color: "#71e279",
  },
];

export const navsideUser = [
  {
    title: "Home",
    href: "/user",
    icon: <HomeModernIcon />,
    color: "#71e279",
  },
  {
    title: "Mis incidencias",
    href: "/user/incidents",
    icon: <UserMinusIcon />,
    color: "#71e279",
  },
];
