import {
  LockClosedIcon,
  MegaphoneIcon,
  UserGroupIcon,
  UserMinusIcon,
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
    icon: <UserMinusIcon />,
    color: "#71e279",
  },
  {
    title: "Incidencias cerradas",
    href: "/admin/incidents/closed",
    icon: <LockClosedIcon />,
    color: "#71e279",
  },
  {
    title: "Incidencias en curso",
    href: "/admin/incidents/inprogress",
    icon: <MegaphoneIcon />,
    color: "#71e279",
  },
  {
    title: "Usuarios",
    href: "/admin/users",
    icon: <UserGroupIcon />,
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
  {
    title: "Mis incidencias cerradas",
    href: "/user/incidents/closed",
    icon: <UserMinusIcon />,
    color: "#71e279",
  },
  {
    title: "Mis incidencias abiertas",
    href: "/user/incidents/open",
    icon: <UserMinusIcon />,
    color: "#71e279",
  },
];