import { Anixart } from "../client";
import { DefaultResult, IBaseApiParams, IDiscoverHubResponse, IInteresting, IPageableResponse, IRelease, IReleaseComment, IResponse } from "../types";


/**
 * Класс с эндпоинтами обзора
 */
export class Discover {
    public constructor(private readonly client: Anixart) { }

    /**
     * GET discover/hub (Anixart 11 BETA 3+)
     *
     * Единый ответ для страницы «Обзор»: рекомендации, смотрю, коллекции, обсуждаемое,
     * интересное и комментарии недели — вместо отдельных `discover/*`.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IDiscoverHubResponse}
     *
     * @example
     * const result = await client.endpoints.discover.hub();
     */
    public async hub(query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IDiscoverHubResponse> {
        return await this.client.call<number, IDiscoverHubResponse>({ path: `/discover/hub`, queryParams: query, ...options });
    }

    /**
     * POST discover/comments
     *
     * @deprecated Удалён в Anixart 11 BETA 3 — используйте {@link Discover.hub} (`comments`).
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.discover.commentsWeek(...);
     */
    public async commentsWeek(options?: IBaseApiParams): Promise<IPageableResponse<IReleaseComment>> {
        return await this.client.call<number, IPageableResponse<IReleaseComment>>({ path: `/discover/comments`, method: 'POST', ...options });
    }

    /**
     * POST discover/discussing
     *
     * @deprecated Удалён в Anixart 11 BETA 3 — используйте {@link Discover.hub} (`discussing`).
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.discover.discussing(...);
     */
    public async discussing(options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<number, IPageableResponse<IRelease>>({ path: `/discover/discussing`, method: 'POST', ...options });
    }

    /**
     * POST discover/interesting
     *
     * @deprecated Удалён в Anixart 11 BETA 3 — используйте {@link Discover.hub} (`interesting`).
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.discover.interesting(...);
     */
    public async interesting(options?: IBaseApiParams): Promise<IPageableResponse<IInteresting>> {
        return await this.client.call<number, IPageableResponse<IInteresting>>({ path: `/discover/interesting`, method: 'POST', ...options });
    }

    /**
     * POST discover/recommendations/{page}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.discover.recommendations(1, ...);
     */
    public async recommendations(page: number, query?: Record<string, string | number | boolean | undefined>, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<number, IPageableResponse<IRelease>>({ path: `/discover/recommendations/${page}`, method: 'POST', queryParams: query, ...options });
    }

    /**
     * POST discover/watching/{page}
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IPageableResponse}
     *
     * @example
     * const result = await client.endpoints.discover.watching(1, ...);
     */
    public async watching(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<number, IPageableResponse<IRelease>>({ path: `/discover/watching/${page}`, method: 'POST', ...options });
    }
}
