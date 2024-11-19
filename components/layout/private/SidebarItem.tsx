"use client"


import {
    AdjustmentsHorizontalIcon,
    ArrowRightEndOnRectangleIcon,
    BellAlertIcon,
    CloudIcon,
    Cog8ToothIcon,
    CreditCardIcon,
    FolderIcon,
    HomeIcon, InformationCircleIcon, PencilSquareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from "@/redux/slices/userSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store";


export default function SidebarItem() {
    const dispatch = useDispatch<AppDispatch>();

    const pathname = usePathname()

    const navigations =
        [
            {
                title: "Home",
                icon: <HomeIcon className="h-4 w-4" />,
                href: "/home",
            },
            {
                title: "Introduction",
                icon: <PencilSquareIcon className="h-4 w-4" />,
                href: "/introduction",
            },
            {
                title: "Configuration",
                icon: <CloudIcon className="h-4 w-4" />,
                href: "/configuration",
            },
            {
                title: "Marketplace",
                icon: <AdjustmentsHorizontalIcon className="h-4 w-4" />,
                href: "/apps",
            },
            {
                title: "User Guide",
                icon: <FolderIcon className="h-4 w-4" />,
                href: "/user-guide",
            },
            {
                title: "Billings",
                icon: <CreditCardIcon className="h-4 w-4" />,
                href: "/billing",
            },
            {
                title: "Notifications",
                icon: <BellAlertIcon className="h-4 w-4" />,
                href: "/notifications",
            },
            {
                title: "Support",
                icon: <InformationCircleIcon className="h-4 w-4" />,
                href: "/help",
            },
            {
                title: "Settings",
                icon: <Cog8ToothIcon className="h-4 w-4" />,
                href: "/settings",
            },
        ]

    const router = useRouter();

    const logoutUser = () => {
        dispatch(logout());
        router.push('/user/login');
    }

    return <div className={`p-2 overflow-auto w-0 min-w-full`}>
        <ul className="flex flex-col py-4 space-y-1">
            {
                navigations.map((item: any) => <li key={item.title}
                >
                    <Link
                        href={item.href}
                        className={`${pathname == item.href ? 'text-blue-600' : 'text-gray-600'} relative hover:text-blue-600 w-full flex flex-row items-center py-2 `}
                    >
                        <span className="inline-flex justify-center items-center ml-4">
                            {item.icon}
                        </span>
                        <span className="pl-4 text-sm tracking-wide truncate">
                            {item.title}
                        </span>
                    </Link>
                </li>)
            }
            <li>
                <button className='relative text-gray-600 hover:text-blue-600 w-full flex flex-row items-center py-2'
                    onClick={logoutUser}>
                    <span className="inline-flex justify-center items-center ml-4">
                        <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
                    </span>
                    <span className="pl-4 text-sm tracking-wide truncate">Log out</span>
                </button>
            </li>
        </ul>
    </div>
}