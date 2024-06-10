import { DomainSchema } from "@/lib/zod/schemas/domains";
import { Domain, Link } from "@prisma/client";

// export const transformDomain = (
//   domain: Domain & Pick<Link, "url" | "rewrite" | "clicks" | "expiredUrl">,
// ) => {
//   const {
//     id,
//     slug,
//     verified,
//     primary,
//     archived,
//     placeholder,
//     expiredUrl,
//     url,
//     rewrite,
//     clicks,
//   } = domain;

//   return DomainSchema.parse({
//     id,
//     slug,
//     verified,
//     primary,
//     archived,
//     placeholder,
//     expiredUrl,
//     target: url || null,
//     type: rewrite ? "rewrite" : "redirect",
//     clicks,
//     createdAt: domain.createdAt,
//     updatedAt: domain.updatedAt,
//   });
// };

type Input = Domain & {
  links: Pick<Link, "url" | "rewrite" | "clicks" | "expiredUrl">[];
};

export const transformDomain = (domain: Input) => {
  const { id, slug, verified, primary, archived, placeholder } = domain;
  const { url, rewrite, clicks, expiredUrl } = domain.links[0];

  return DomainSchema.parse({
    id,
    slug,
    verified,
    primary,
    archived,
    placeholder,
    expiredUrl,
    target: url || null,
    type: rewrite ? "rewrite" : "redirect",
    clicks,
    createdAt: domain.createdAt,
    updatedAt: domain.updatedAt,
  });
};