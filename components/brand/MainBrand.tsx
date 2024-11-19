import Image from "next/image";
import Link from "next/link";


export default function MainBrand(){
    return  <Link href="/"
    className="flex space-x-2 items-center"
    >
    <Image
      alt="logo"
      src="/logo.png"
      className="h-12 w-12 rounded-xl"
      width={600} height={600}
    />
    <span className="text-gray-900 text-lg md:text-xl font-medium">Mevinai</span>
  </Link>
}