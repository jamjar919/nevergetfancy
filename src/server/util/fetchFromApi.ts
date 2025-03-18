
const fetchFromApi = (url: string): Promise<Response> => {
    console.log(`[fetch] ${url}`);

    return fetch(url)
        .catch((error) => {
            console.error(`[fetch] Error: ${error}`);
            throw new Error(`Error fetching from API: ${error}`);

            return "" as any;
        });
}

export { fetchFromApi }