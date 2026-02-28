import { getBio } from "./api/essentials.route";
import { LazyImage, RTERenderer } from "@piperunner-cms/components";
import styles from "./common.module.css";

export default async function Home() {
  const { latest: data } = await getBio();

  return (
    <section className="min-h-(--screen-minus-header) flex flex-col items-center justify-center px-6 py-20 bg-background">
      <h1 className="text-3xl sm:text-5xl font-semibold mb-12 text-center">About Me</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        {/* Profile image */}
        {data?.profilePictureUrl && (
          <LazyImage
            src={data.profilePictureUrl.url}
            placeholder={data.profilePictureUrl.placeholder}
            alt="cover"
            className="aspect-square size-72 p-2 border-accent-foreground border-2 rounded-lg"
          />
        )}

        {/* Bio text */}

        {data?.bio && (
          <div className="max-w-xl">
            <RTERenderer
              content={data.bio}
              className={styles.rteFormStyles}
              type="form"
            />
          </div>
        )}
      </div>
    </section>
  );
}
