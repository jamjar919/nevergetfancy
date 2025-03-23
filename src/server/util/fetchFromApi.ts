import promiseRetry from "promise-retry";

const fetchFromApi = (url: string): Promise<Response> => {
    // console.log(`[fetch] ${url}`);

    const get = (retry: (error: any) => never, attempt: number): Promise<Response> => {
        return fetch(url)
            .then((response: Response) => {
                if (!response.ok && response.status !== 404) {
                    console.error(`[fetch] Retrying - ${attempt} failed`);
                    return retry(response.statusText);
                }

                return response;
            })
            .catch((error: Error) => {
                console.error(`[fetch] Retrying - ${attempt} failed`);
                return retry(error);
            })
    }

    return promiseRetry(get, { retries: 3, randomize: true })
        .catch((error) => {
            console.error(`[fetch] Error: ${error}`);
            throw new Error(`Error fetching from API: ${error}`);
            return Response.error(); // make ts happy
        });
}

export { fetchFromApi }