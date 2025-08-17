import { getBio } from "./api/essentials.route";
import StarterKit from "@tiptap/starter-kit";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";

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
    <section className="flex flex-col main items-center justify-center gap-6  w-full">
      <h1 className="text-5xl font-semibold">About Me</h1>
      <div className="flex gap-6">
        {data?.profilePictureUrl && (
          <div className="border-accent-foreground border-2 p-1 max-w-[300px] h-fit">
            <img
              alt="Profile"
              // @ts-expect-error type mismatch
              src={data.profilePictureUrl.url}
              className="w-full"
            />
          </div>
        )}

        {data?.bio && (
          <div className="max-w-[500px] prose dark:prose-invert">
            {renderedBio}
          </div>
        )}
      </div>
    </section>
  );
}
