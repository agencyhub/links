import { withSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = 'nodejs'; // ou 'edge' se for uma função Edge

// GET /api/me - get the current user
export const GET = withSession(async (req) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user.id,
    },
  });
  return NextResponse.json(user);
});
