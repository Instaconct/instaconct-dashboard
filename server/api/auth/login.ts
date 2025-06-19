export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);
    console.log('Login request body:', body);
    const response = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      body,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to login. Please try again later.',
    });
  }
}); 
