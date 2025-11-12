import { getBlogList } from "@/app/api/blogs.route";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RTERenderer } from "@piperunner-cms/components";
import styles from "./blog.module.css";
import Link from "next/link";

export default async function Blogs() {
  const blogs = await getBlogList();

  return (
    <section className="min-h-screen p-6 bg-background">
      <div className="grid grid-cols-3 gap-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <Card key={blog.id} className="pt-0 overflow-hidden">
              <CardHeader className="px-0">
                <div>
                  {blog.latest.coverImage?.url && (
                    <img
                      src={blog.latest.coverImage?.url}
                      alt="blog-cover-image"
                    />
                  )}
                  <div className="px-6 mt-4 text-3xl font-bold">
                    {blog.latest.title}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {blog.latest.description && (
                  <RTERenderer
                    content={blog.latest.description}
                    className={styles.rteFormStyles}
                    type="form"
                  />
                )}
                <div className="flex justify-between mt-3">
                  <div
                    className="border rounded-full px-2"
                    style={{
                      color: blog.latest.category?.metadata?.color ?? "",
                      borderColor: blog.latest.category?.metadata?.color ?? "",
                    }}
                  >
                    {blog.latest.category?.name}
                  </div>

                  <div className="flex space-x-2">
                    {blog.latest.tags?.map((tag) => (
                      <div
                        key={tag.id}
                        className="border rounded-xl px-2"
                        style={{
                          background: tag.metadata?.color ?? "",
                        }}
                      >
                        # {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
