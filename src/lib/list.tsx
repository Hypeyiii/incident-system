import { LockClosedIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import HomeModernIcon from "@heroicons/react/24/outline/esm/HomeModernIcon";

export const navsidelist = [
    {
        title: "Home",
        href: "/admin",
        icon: <HomeModernIcon/> ,
        color: "#71e279"
    },
    {
        title: "Mis incidencias",
        href: "/admin",
        icon: <UserMinusIcon/> ,
        color: "#71e279"
    },
    {
        title: "Incidencias cerradas",
        href: "/admin",
        icon: <LockClosedIcon/> ,
        color: "#71e279"
    },
];