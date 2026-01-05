import { getBlogList } from "@/app/api/blogs.route";
import { BlogList } from "./components/BlogList";

export default async function Blogs() {
  const blogs = await getBlogList();

  return (
    <section className="min-h-screen p-6 bg-background">
      <BlogList data={blogs} />
    </section>
  );
}
