import z from "@/lib/zod";
import { isValidUrl } from "@dub/utils";

export const DomainSchema = z.object({
  slug: z
    .string()
    .describe("The domain name.")
    .openapi({ example: "acme.com" }),
  verified: z
    .boolean()
    .default(false)
    .describe("Whether the domain is verified."),
  primary: z
    .boolean()
    .default(false)
    .describe("Whether the domain is the primary domain for the workspace."),
  archived: z
    .boolean()
    .describe("Whether the domain is archived.")
    .default(false),
  placeholder: z
    .string()
    .describe(
      "Provide context to your teammates in the link creation modal by showing them an example of a link to be shortened.",
    )
    .default("https://dub.co/help/article/what-is-dub")
    .openapi({ example: "https://dub.co/help/article/what-is-dub" }),
  expiredUrl: z
    .string()
    .nullable()
    .describe(
      "The URL to redirect to when a link under this domain has expired.",
    )
    .openapi({ example: "https://acme.com/expired" }),
  target: z
    .string()
    .nullable()
    .describe(
      "The page your users will get redirected to when they visit your domain.",
    )
    .openapi({ example: "https://acme.com/landing" }),
  type: z
    .string()
    .describe("The type of redirect to use for this domain.")
    .openapi({ enum: ["redirect", "rewrite"] }),
  clicks: z.number().describe("The number of clicks on the domain.").default(0),
});

export const addDomainBodySchema = z.object({
  slug: z
    .string({ required_error: "Domain name is required" })
    .min(1, "Domain name cannot be empty.")
    .describe("Name of the domain."),
  target: z
    .string()
    .refine((value) => (value ? isValidUrl(value) : true), {
      message: "Target URL must be a valid URL.",
    })
    .optional()
    .describe(
      "The page your users will get redirected to when they visit your domain.",
    ),
  type: z
    .enum(["redirect", "rewrite"])
    .optional()
    .default("redirect")
    .describe("The type of redirect to use for this domain."),
  expiredUrl: z
    .string()
    .url("expiredUrl must be a valid URL")
    .optional()
    .describe(
      "Redirect users to a specific URL when any link under this domain has expired.",
    ),
  placeholder: z
    .string()
    .url("placeholder must be a valid URL")
    .optional()
    .default("https://dub.co/help/article/what-is-dub")
    .describe(
      "Provide context to your teammates in the link creation modal by showing them an example of a link to be shortened.",
    ),
});

export const updateDomainBodySchema = addDomainBodySchema;

export const transferDomainBodySchema = z.object({
  newWorkspaceId: z
    .string({ required_error: "New workspace ID is required." })
    .min(1, "New workspace ID cannot be empty.")
    .transform((v) => v.replace("ws_", ""))
    .describe("The ID of the new workspace to transfer the domain to."),
});