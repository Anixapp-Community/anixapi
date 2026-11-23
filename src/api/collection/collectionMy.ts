import { Anixart } from "../../client";
import { DefaultResult, IBaseApiParams, ICollection, ICollectionCreateEditResponse, ICollectionCreateRequest, ICollectionDeleteResponse, ICollectionEditImageResponse, IPageableResponse, IRelease, IReleaseAddCollectionResponse, IReleaseRemoveCollectionResponse } from "../../types";


/**
 * Класс с эндпоинтами своих коллекций
 */
export class CollectionMy {
    public constructor(private readonly client: Anixart) { }

    /**
     * POST collectionMy/create
     *
     * Возможные коды ответа: {@link CollectionCreateEditResult}
     * @returns {@link ICollectionCreateEditResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.create(...);
     */
    public async create(body: ICollectionCreateRequest, options?: IBaseApiParams): Promise<ICollectionCreateEditResponse> {
        return await this.client.call<number, ICollectionCreateEditResponse>({ path: `/collectionMy/create`, method: 'POST', json: body, ...options });
    }

    /**
     * GET collectionMy/delete/{collectionId}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link ICollectionDeleteResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.delete(1, ...);
     */
    public async delete(collectionId: number, options?: IBaseApiParams): Promise<ICollectionDeleteResponse> {
        return await this.client.call<number, ICollectionDeleteResponse>({ path: `/collectionMy/delete/${collectionId}`, ...options });
    }

    /**
     * POST collectionMy/edit/{collectionId}
     *
     * Возможные коды ответа: {@link CollectionCreateEditResult}
     * @returns {@link ICollectionCreateEditResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.edit(1, ...);
     */
    public async edit(collectionId: number, body: ICollectionCreateRequest, options?: IBaseApiParams): Promise<ICollectionCreateEditResponse> {
        return await this.client.call<number, ICollectionCreateEditResponse>({ path: `/collectionMy/edit/${collectionId}`, method: 'POST', json: body, ...options });
    }

    /**
     * POST collectionMy/editImage/{collectionId}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link ICollectionEditImageResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.editImage(1, ...);
     */
    public async editImage(collectionId: number, image?: Buffer, name?: string, options?: IBaseApiParams): Promise<ICollectionEditImageResponse> {
        const fileName = name ?? 'image.jpg';
        return await this.client.call<number, ICollectionEditImageResponse>({ path: `/collectionMy/editImage/${collectionId}`, method: 'POST', image: image ? { type: 'image' as const, name: fileName, stream: image, fields: { name: fileName } } : undefined, ...options });
    }

    /**
     * GET collectionMy/release/add/{collectionId}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IReleaseAddCollectionResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.releaseAdd(1, ...);
     */
    public async releaseAdd(collectionId: number, query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IReleaseAddCollectionResponse> {
        return await this.client.call<number, IReleaseAddCollectionResponse>({ path: `/collectionMy/release/add/${collectionId}`, queryParams: query, ...options });
    }

    /**
     * GET collectionMy/release/remove/{collectionId} (Anixart 11 BETA 3+)
     *
     * Возможные коды ответа: {@link ReleaseRemoveCollectionResult}
     * @returns {@link IReleaseRemoveCollectionResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.releaseRemove(1, 42);
     */
    public async releaseRemove(collectionId: number, releaseId: number, options?: IBaseApiParams): Promise<IReleaseRemoveCollectionResponse> {
        return await this.client.call<number, IReleaseRemoveCollectionResponse>({ path: `/collectionMy/release/remove/${collectionId}`, queryParams: { release_id: releaseId }, ...options });
    }

    /**
     * GET collectionMy/all/release/{r_id}/{page} (Anixart 11 BETA 3+)
     *
     * Свои коллекции, в которых есть релиз.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.releaseCollections(42, 0);
     */
    public async releaseCollections(releaseId: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<number, IPageableResponse<ICollection>>({ path: `/collectionMy/all/release/${releaseId}/${page}`, ...options });
    }

    /**
     * GET collectionMy/{id}/releases
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.collectionMy.releases(1, ...);
     */
    public async releases(collectionId: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<number, IPageableResponse<IRelease>>({ path: `/collectionMy/${collectionId}/releases`, ...options });
    }
}
