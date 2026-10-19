import { Anixart } from "../client";
import { AchievementResult, DefaultResult, IAchievementPreviewResponse, IAchievementResponse, IBaseApiParams } from "../types";


/**
 * Класс с эндпоинтами достижений — значков по коду (Anixart 10.5+)
 */
export class Achievement {
    public constructor(private readonly client: Anixart) { }

    /**
     * GET achievement/preview/{code}
     *
     * Показывает, какой значок выдаётся по коду, не активируя его.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IAchievementPreviewResponse}
     *
     * @example
     * const result = await client.endpoints.achievement.preview("CODE");
     */
    public async preview(code: string, options?: IBaseApiParams): Promise<IAchievementPreviewResponse> {
        return await this.client.call<number, IAchievementPreviewResponse>({ path: `/achievement/preview/${encodeURIComponent(code)}`, ...options });
    }

    /**
     * GET achievement/get/{code}
     *
     * Активирует код и выдаёт значок `badgeId` (id берётся из {@link Achievement.preview}).
     *
     * Возможные коды ответа: {@link DefaultResult}, {@link AchievementResult}
     * @returns {@link IAchievementResponse}
     *
     * @example
     * const result = await client.endpoints.achievement.claim("CODE", 12);
     */
    public async claim(code: string, badgeId: number, options?: IBaseApiParams): Promise<IAchievementResponse> {
        return await this.client.call<number, IAchievementResponse>({ path: `/achievement/get/${encodeURIComponent(code)}`, queryParams: { badge_id: badgeId }, resultEnum: AchievementResult, tokenRequired: true, ...options });
    }
}
