export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const token = getCookie(event, "accessToken");
    
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    try {
        const response = await $fetch(
            `${config.public.apiBase}/sdk`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        return response;
    } catch (error) {
        throw error;
    }
});