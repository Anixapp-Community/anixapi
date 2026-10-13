import { Anixart } from "../client";
import {
    DEFAULT_VERSION_CODE,
    IAnixPlayerConfigResponse,
    IBaseApiParams,
    IConfigRequest,
    IConfigUrlsResponse,
    ITogglesResponse,
} from "../types";


/**
 * Класс с эндпоинтами конфигурации
 */
export class Config {
    public constructor(private readonly client: Anixart) { }

    private buildQuery(query?: IConfigRequest | Record<string, string | number | boolean | undefined>) {
        const q = (query ?? {}) as Record<string, unknown>;
        const versionCode = Number(
            q.versionCode ?? q.version_code ?? DEFAULT_VERSION_CODE,
        );
        const beta = q.beta ?? q.is_beta ?? true;
        const isApiAlt = q.shouldUseMirrorUrls ?? q.is_api_alt ?? false;
        return {
            version_code: Number.isFinite(versionCode) ? versionCode : DEFAULT_VERSION_CODE,
            is_beta: beta === true || beta === 'true' || beta === 1,
            is_api_alt: isApiAlt === true || isApiAlt === 'true' || isApiAlt === 1,
        };
    }

    /**
     * GET config/anixplayer
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IAnixPlayerConfigResponse}
     *
     * @example
     * const result = await client.endpoints.config.anixplayer(...);
     */
    public async anixplayer(
        query?: IConfigRequest | Record<string, string | number | boolean | undefined>,
        options?: IBaseApiParams,
    ): Promise<IAnixPlayerConfigResponse> {
        return await this.client.call<number, IAnixPlayerConfigResponse>({
            path: `/config/anixplayer`,
            queryParams: this.buildQuery(query),
            ...options,
        });
    }

    /**
     * GET config/toggles
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link ITogglesResponse}
     *
     * @example
     * const result = await client.endpoints.config.toggles(...);
     */
    public async toggles(
        query?: IConfigRequest | Record<string, string | number | boolean | undefined>,
        options?: IBaseApiParams,
    ): Promise<ITogglesResponse> {
        return await this.client.call<number, ITogglesResponse>({
            path: `/config/toggles`,
            queryParams: this.buildQuery(query),
            ...options,
        });
    }

    /**
     * GET config/urls
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IConfigUrlsResponse}
     *
     * @example
     * const result = await client.endpoints.config.urls(...);
     */
    public async urls(
        query?: IConfigRequest | Record<string, string | number | boolean | undefined>,
        options?: IBaseApiParams,
    ): Promise<IConfigUrlsResponse> {
        const q = this.buildQuery(query);
        return await this.client.call<number, IConfigUrlsResponse>({
            path: `/config/urls`,
            queryParams: {
                version_code: q.version_code,
                is_beta: q.is_beta,
            },
            ...options,
        });
    }

    /** @alias {@link Config.anixplayer} */
    public async anixPlayer(
        query?: IConfigRequest | Record<string, string | number | boolean | undefined>,
        options?: IBaseApiParams,
    ): Promise<IAnixPlayerConfigResponse> {
        return this.anixplayer(query, options);
    }
}
