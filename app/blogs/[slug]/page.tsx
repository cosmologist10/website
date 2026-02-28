import { getBlog, getBlogList } from "@/app/api/blogs.route";
import {
  RTERenderer,
  LazyImage,
  extractSimpleText,
} from "@piperunner-cms/components";
import styles from "./blogContent.module.css";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GrUpdate as UpdatedAtIcon } from "react-icons/gr";
import { MdCreate as CreatedAtIcon } from "react-icons/md";
import { BlogList } from "../components/BlogList";
import type { Metadata } from "next";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const blogs = await getBlogList();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

type BlogProps = {
  params: Promise<{ slug: string }>;
};

export default async function Blog({ params }: BlogProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const createdAt = new Date(blog.createdAt);
  const updatedAt = new Date(blog.updatedAt);

  let childData = null;
  if (blog.childDocumentIds && blog.childDocumentIds.length > 0) {
    childData = await getBlogList(blog.id);
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto p-6">
      {blog.latest.coverImage?.url && (
        <LazyImage
          style={{
            aspectRatio: blog.latest.coverImage?.aspectRatio,
          }}
          className="max-w-desktop mx-auto rounded-xl mb-4"
          src={blog.latest.coverImage.url}
          placeholder={blog.latest.coverImage.placeholder}
          alt="blog-cover-image"
        />
      )}
      <Card className="max-w-desktop mx-auto">
        <CardHeader>
          <div className="text-3xl sm:text-5xl md:text-7xl text-center font-alt-serif font-bold leading-snug">
            {blog.latest.title}
          </div>

          {((blog.latest.tags && blog.latest.tags?.length > 0) ||
            blog.latest.category) && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <div
                className="text-md font-semibold capitalize border px-2 rounded-full"
                style={{
                  borderColor: blog.latest.category?.metadata?.color ?? "",
                  color: blog.latest.category?.metadata?.color ?? "",
                }}
              >
                {blog.latest.category?.name}
              </div>
              {blog.latest.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className="text-md capitalize border rounded-xl px-2"
                  style={{
                    color: tag.metadata?.color ?? "",
                    borderColor: tag.metadata?.color ?? "",
                  }}
                >
                  #{tag.name}
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <CreatedAtIcon className="fill-yellow-200" />
                <span>
                  {createdAt.getDate()} / {createdAt.getMonth() + 1} /
                  {createdAt.getFullYear()}
                </span>
              </div>
              <div className="hidden tablet:block flex-1 h-[3px] bg-primary/70 rounded-lg" />
              <div className="flex items-center space-x-2">
                <UpdatedAtIcon className="stroke-green-200" />
                <span>
                  {updatedAt.getDate()} / {updatedAt.getMonth() + 1} /
                  {updatedAt.getFullYear()}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "mb-6 mt-3 mx-auto",
                "h-[3px] w-[100px] rounded-sm bg-primary/70"
              )}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 space-y-12">
            {blog.latest.content && (
              <RTERenderer
                content={blog.latest.content}
                type="document"
                className={cn(styles.rteDocumentStyles, "max-w-4xl mx-auto")}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {childData && (
        <div className="max-w-desktop mx-auto mt-8">
          <BlogList data={childData} />
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const title = blog.latest.title;
  const description = blog.latest.description
    ? extractSimpleText({ content: blog.latest.description })
    : undefined;
  const keywords = blog.latest.tags?.map((tag) => tag.name);
  const category = blog.latest.category?.name;
  const imageUrl = blog.latest.coverImage?.url;
  const aspectRatio = blog.latest.coverImage?.aspectRatio;
  const type = "article";

  return {
    title,
    description,
    keywords,
    category,
    openGraph: {
      title,
      description,
      url: `https://pinksocks.xyz/blogs/${slug}`,
      type,
      images: imageUrl && [
        {
          url: imageUrl,
          width: 800,
          height: aspectRatio ? 800 / aspectRatio : 600,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: imageUrl && [imageUrl],
    },
  };
}
