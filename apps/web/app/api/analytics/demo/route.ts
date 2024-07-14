import { getAnalytics } from "@/lib/analytics/get-analytics";
import { withSession } from "@/lib/auth";
import { analyticsQuerySchema } from "@/lib/zod/schemas/analytics";
import { DUB_WORKSPACE_ID } from "@dub/utils";
import { NextResponse } from "next/server";

export const runtime = 'nodejs'; // ou 'edge' se for uma função Edge

// GET /api/analytics/demo
export const GET = withSession(async (req) => {
  const parsedParams = analyticsQuerySchema.parse(req.searchParams);

  const response = await getAnalytics({
    ...parsedParams,
    isDemo: true,
    workspaceId: DUB_WORKSPACE_ID,
  });

  return NextResponse.json(response);
});
