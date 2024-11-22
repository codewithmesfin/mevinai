import Image from "next/image";
import Link from "next/link";


export default function MainBrand() {
  return <Link href="/"
    className="flex space-x-2 items-center"
  >
    <Image
      alt="logo"
      src="/logo.png"
      className="h-10 w-10 rounded-full"
      width={600} height={600}
    />
    <p className="text-gray-900 text-lg md:text-xl">
      <span className="text-[#1677FF] font-medium">Mevi</span>
      <span className="text-[#fc8f4c] font-semibold">nai</span>
    </p>
  </Link>
}