import { Anixart } from "../../client";
import { BookmarksImportResult, IBaseApiParams, IBookmarksImportRequest, IBookmarksImportResponse, IBookmarksImportStatusResponse } from "../../types";


/**
 * Класс с эндпоинтами импорта
 */
export class Import {
    public constructor(private readonly client: Anixart) { }

    /**
     * POST import/bookmarks
     *
     * Возможные коды ответа: {@link BookmarksImportResult}
     * @returns {@link IBookmarksImportResponse}
     *
     * @example
     * const result = await client.endpoints.import.bookmarks({
     *     selected_importer_name: "Shikimori",
     *     watching: [1, 2], plans: [], completed: [3], holdOn: [], dropped: []
     * });
     */
    public async bookmarks(body: IBookmarksImportRequest, options?: IBaseApiParams): Promise<IBookmarksImportResponse> {
        return await this.client.call<number, IBookmarksImportResponse>({ path: `/import/bookmarks`, method: 'POST', json: body, resultEnum: BookmarksImportResult, ...options });
    }

    /**
     * POST import/status
     *
     * Возможные коды ответа: {@link BookmarksImportResult}
     * @returns {@link IBookmarksImportStatusResponse}
     *
     * @example
     * const result = await client.endpoints.import.status(...);
     */
    public async status(options?: IBaseApiParams): Promise<IBookmarksImportStatusResponse> {
        return await this.client.call<number, IBookmarksImportStatusResponse>({ path: `/import/status`, method: 'POST', ...options });
    }
}
