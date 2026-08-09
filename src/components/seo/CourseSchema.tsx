import type { ICourse } from "@/src/features/course/api/courseApi";

const SITE_URL = "https://www.quantumfinix.com";

type CourseSchemaProps = {
  slug: string;
  course?: ICourse;
  imageUrl?: string;
};

const safeJson = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export default function CourseSchema({ slug, course, imageUrl }: CourseSchemaProps) {
  const normalizedSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");

  if (!normalizedSlug) return null;

  const courseUrl = `${SITE_URL}/course/${encodeURIComponent(normalizedSlug)}`;
  const courseName = course?.title?.trim() || normalizedSlug.replace(/-/g, " ");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/course` },
      { "@type": "ListItem", position: 3, name: courseName, item: courseUrl },
    ],
  };

  const courseStructuredData = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description:
          course.metaDescription?.trim() ||
          course.shortDescription?.trim() ||
          course.heroHeadline?.trim() ||
          course.title,
        url: courseUrl,
        ...(imageUrl ? { image: imageUrl } : {}),
        provider: {
          "@type": "Organization",
          name: "QuantumFinix",
          sameAs: SITE_URL,
        },
        ...(course.category ? { about: course.category } : {}),
        ...(course.level ? { educationalLevel: course.level } : {}),
        ...(course.language ? { inLanguage: course.language } : {}),
        ...(course.keywords?.length ? { keywords: course.keywords.join(", ") } : {}),
        ...(course.durationWeeks > 0
          ? { timeRequired: `P${course.durationWeeks}W` }
          : {}),
        ...(course.purchaseUrl || course.price >= 0
          ? {
              offers: {
                "@type": "Offer",
                url: course.purchaseUrl || courseUrl,
                price: Math.max(0, course.discountedPrice || course.price || 0),
                priceCurrency: course.currency || "INR",
                availability:
                  course.status === "active"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/PreOrder",
              },
            }
          : {}),
      }
    : null;

  const faqStructuredData = course?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: course.faqs
          .filter((faq) => faq.question?.trim() && faq.answer?.trim())
          .map((faq) => ({
            "@type": "Question",
            name: faq.question.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.trim(),
            },
          })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(breadcrumb) }}
      />
      {courseStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(courseStructuredData) }}
        />
      ) : null}
      {faqStructuredData && faqStructuredData.mainEntity.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(faqStructuredData) }}
        />
      ) : null}
    </>
  );
}
