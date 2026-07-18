const API_KEY = "oeCD73YhbmBgbuMliS2AV6LpVkmqTqd0X37oLyftyros7wAJfl7CCrgl";

const BASE_URL = "https://api.pexels.com/v1";

export async function searchWallpapers(query, page = 1) {

    const response = await fetch(
        `${BASE_URL}/search?query=${query}&per_page=24&page=${page}`,
        {
            headers: {
                Authorization: API_KEY
            }
        }
    );

    return await response.json();
}
