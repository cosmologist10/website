"use client";

import styles from "@/app/common.module.css";
import { LazyImage, RTERenderer } from "@piperunner-cms/components";
import type { GetBlogListResponse } from "@piperunner-cms/types/v1";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
type BlogListProps = {
  data: GetBlogListResponse;
};

export const BlogList: React.FC<BlogListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {data.map((blog) => (
        <Link href={`/blogs/${blog.slug}`} key={blog.id} className="h-full">
          <Card
            key={blog.id}
            className="py-0 overflow-hidden relative border border-border hover:border-primary transition-all h-full"
          >
            {blog.latest.coverImage?.url && (
              <LazyImage
                className="absolute! h-full w-full object-cover object-center"
                src={blog.latest.coverImage.url}
                placeholder={blog.latest.coverImage.placeholder}
                alt="blog-cover-image"
              />
            )}
            <div className="backdrop-blur-xs py-4 min-h-72 flex flex-col justify-end bg-linear-to-t from-card via-card/50 via-70% to-transparent">
              <CardHeader className="px-0 relative">
                <div className="px-6 mt-4 text-2xl font-bold">
                  {blog.latest.title}
                </div>
              </CardHeader>
              <CardContent className="relative">
                {blog.latest.description && (
                  <RTERenderer
                    content={blog.latest.description}
                    className={styles.rteFormStyles}
                    type="form"
                  />
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <div
                    className="border rounded-full px-2"
                    style={{
                      color: blog.latest.category?.metadata?.color ?? "",
                      borderColor: blog.latest.category?.metadata?.color ?? "",
                    }}
                  >
                    {blog.latest.category?.name}
                  </div>

                  {blog.latest.tags?.map((tag) => (
                    <div
                      key={tag.id}
                      className="border rounded-xl px-2"
                      style={{
                        color: tag.metadata?.color ?? "",
                        borderColor: tag.metadata?.color ?? "",
                      }}
                    >
                      #{tag.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
