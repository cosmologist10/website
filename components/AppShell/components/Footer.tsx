import { getSocialLinks } from "@/app/api/essentials.route";
import Link from "next/link";
import {
  FaGithub as GithubIcon,
  FaLinkedin as LinkedInIcon,
  FaMedium as MediumIcon,
  FaInstagram as InstagramIcon,
  FaTwitter as TwitterIcon,
} from "react-icons/fa";

export default async function Footer() {
  const { latest: data } = await getSocialLinks();

  return (
    <footer className="z-2 p-4 footer flex justify-between">
      <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{data?.email}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
      </div>

      <div className="flex gap-4">
        {data?.github && (
          <Link href={data?.github}>
            <GithubIcon className="size-6" />
          </Link>
        )}
        {data?.twitter && (
          <Link href={data?.twitter}>
            <TwitterIcon className="size-6" />
          </Link>
        )}
        {data?.linkedin && (
          <Link href={data?.linkedin}>
            <LinkedInIcon className="size-6" />
          </Link>
        )}
        {data?.medium && (
          <Link href={data?.medium}>
            <MediumIcon className="size-6" />
          </Link>
        )}
        {data?.instagram && (
          <Link href={data?.instagram}>
            <InstagramIcon className="size-6" />
          </Link>
        )}
      </div>
    </footer>
  );
}
