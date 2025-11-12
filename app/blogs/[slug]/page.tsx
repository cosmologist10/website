import { getBlog, getBlogList } from "@/app/api/blogs.route";
import { RTERenderer } from "@piperunner-cms/components";
import styles from "./blogContent.module.css";
import { cn } from "@/lib/utils";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const blogs = await getBlogList();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <div className="p-6 space-y-12">
      <div className="text-5xl text-center">{blog.latest.title}</div>
      {blog.latest.content && (
        <RTERenderer
          content={blog.latest.content}
          type="document"
          className={cn(styles.rteDocumentStyles, "max-w-7xl mx-auto")}
        />
      )}
    </div>
  );
}
