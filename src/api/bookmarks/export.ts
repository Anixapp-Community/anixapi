import { Anixart } from "../../client";
import { BookmarkExportResult, BookmarksExportSort, IBaseApiParams, IBookmarksExportRequest, IExportBookmarksResponse } from "../../types";


/**
 * Класс с эндпоинтами экспорта
 */
export class Export {
    public constructor(private readonly client: Anixart) { }

    /**
     * POST export/bookmarks
     *
     * Сервер отдаёт релизы выбранных списков; файл (CSV/TXT) приложение собирает само.
     *
     * Возможные коды ответа: {@link BookmarkExportResult}
     * @returns {@link IExportBookmarksResponse}
     *
     * @example
     * const result = await client.endpoints.export.bookmarks({ bookmarksExportProfileLists: [1, 2, 3] }, { sort: BookmarksExportSort.Title });
     */
    public async bookmarks(body: IBookmarksExportRequest, query?: { sort?: BookmarksExportSort } & Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IExportBookmarksResponse> {
        return await this.client.call<number, IExportBookmarksResponse>({ path: `/export/bookmarks`, method: 'POST', queryParams: query, json: body, resultEnum: BookmarkExportResult, ...options });
    }
}
