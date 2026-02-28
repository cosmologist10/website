import { getSocialLinks } from "@/app/api/essentials.route";
import Link from "next/link";
import { FaLinkedin as LinkedInIcon } from "react-icons/fa";

export default async function Footer() {
  const { latest: data } = await getSocialLinks();

  return (
    <footer className="z-2 p-4 footer flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{data?.email}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
      </div>

      <div className="flex gap-4">
        {data?.linkedin && (
          <Link href={data?.linkedin}>
            <LinkedInIcon className="size-6" />
          </Link>
        )}
      </div>
    </footer>
  );
}
