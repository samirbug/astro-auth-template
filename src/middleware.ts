import { defineMiddleware } from "astro/middleware";
import { createAuth } from "@/lib/auth";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const auth = createAuth(ctx.request)

  try {
    const sessionData = await auth.api.getSession({
      headers: ctx.request.headers,
    });
    ctx.locals.user = sessionData?.user ?? null;
    ctx.locals.session = sessionData?.session ?? null;
  } catch {
    ctx.locals.user = null;
    ctx.locals.session = null;
  }

  return next();
})