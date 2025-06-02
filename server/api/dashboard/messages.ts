export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const token = getCookie(event, "accessToken");
  const ticketId = getQuery(event).ticketId;

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  if (!ticketId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ticketId is required",
    });
  }

  const response = await $fetch(
    `${config.public.apiBase}/ticket/${ticketId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const messages = response.reverse();

  return messages;
});
