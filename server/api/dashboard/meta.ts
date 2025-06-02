import { defineEventHandler, getCookie, createError } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "accessToken");

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const response = await fetch(`${config.public.apiBase}/meta/connect`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "manual",
  });

  if (response.status === 302 || response.status === 301) {
    const redirectUrl = response.headers.get("location");
    return { redirectUrl };
  } else {
    const data = await response.json();
    return data;
  }
});
