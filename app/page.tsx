import { getBio } from "./api/essentials.route";
import StarterKit from "@tiptap/starter-kit";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import Image from "next/image";


export default async function Home() {
  const { latest: data } = await getBio();

  const renderedBio = renderToReactElement({
    extensions: [StarterKit],
    content: {
      type: "doc",
      content: [
        // @ts-expect-error type mismatch
        data.bio,
      ],
    },
  });

  return (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
    <h1 className="text-5xl font-semibold mb-12 text-center">About Me</h1>

    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
      {/* Profile image */}
      {data?.profilePictureUrl && (
        <div className="flex-shrink-0 border-2 border-accent-foreground p-1 rounded-lg shadow-lg bg-gray-800 w-72 h-72 overflow-hidden">
          <Image
            alt="Profile"
            // @ts-expect-error type mismatch
            src={data.profilePictureUrl.url}
            width={288}         // roughly Tailwind w-72
            height={288}
            priority             // preload for faster LCP
            unoptimized          // required for static export
            className="rounded-md object-cover w-full h-full"
          />
        </div>
      )}

      {/* Bio text */}
      {data?.bio && (
        <div className="max-w-xl prose dark:prose-invert text-foreground">
          {renderedBio}
        </div>
      )}
    </div>
  </section>
);
}
