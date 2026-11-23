import { Anixart } from "../../client";
import { CollectionResult, DefaultResult, IBaseApiParams, ICollection, ICollectionHubResponse, ICollectionResponse, IPageableResponse, IRelease, IResponse } from "../../types";


/**
 * Класс с эндпоинтами коллекций
 */
export class Collection {
    public constructor(private readonly client: Anixart) { }

    /**
     * GET collection/hub (Anixart 11 BETA 3+)
     *
     * Ответ для страницы «Коллекции»: коллекции недели, рекомендованные и свои.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link ICollectionHubResponse}
     *
     * @example
     * const result = await client.endpoints.collection.hub();
     */
    public async hub(options?: IBaseApiParams): Promise<ICollectionHubResponse> {
        return await this.client.call<number, ICollectionHubResponse>({ path: `/collection/hub`, ...options });
    }

    /**
     * GET collection/{id}
     *
     * Возможные коды ответа: {@link CollectionResult}
     * @returns {@link ICollectionResponse}
     *
     * @example
     * const result = await client.endpoints.collection.collection(1, ...);
     */
    public async collection(collectionId: number, options?: IBaseApiParams): Promise<ICollectionResponse> {
        return await this.client.call<number, ICollectionResponse>({ path: `/collection/${collectionId}`, ...options });
    }

    /**
     * GET collection/all/{page}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collection.collections(1, ...);
     */
    public async collections(page: number, query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<number, IPageableResponse<ICollection>>({ path: `/collection/all/${page}`, queryParams: query, ...options });
    }

    /**
     * GET collection/all/profile/{p_id}/{page}
     *
     * Anixart 11 BETA 3+: query `sort` и `release_id` (например, «коллекции, где есть этот релиз»).
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collection.profileCollections(1, 1, { sort: 0, release_id: 42 });
     */
    public async profileCollections(profileId: number, page: number, query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<number, IPageableResponse<ICollection>>({ path: `/collection/all/profile/${profileId}/${page}`, queryParams: query, ...options });
    }

    /**
     * GET collection/all/release/{r_id}/{page}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collection.releaseCollections(1, 1, ...);
     */
    public async releaseCollections(releaseId: number, page: number, query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<number, IPageableResponse<ICollection>>({ path: `/collection/all/release/${releaseId}/${page}`, queryParams: query, ...options });
    }

    /**
     * GET collection/{id}/releases/{page}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collection.releases(1, 1, ...);
     */
    public async releases(collectionId: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<number, IPageableResponse<IRelease>>({ path: `/collection/${collectionId}/releases/${page}`, ...options });
    }
}
