import { Anixart } from "../../client";
import { DefaultResult, IBadgesResponse, IBaseApiParams, IProfileBadgeResponse, IProfileBadgeSectionsResponse, IProfileBadgeShowcaseResponse, IResponse, ProfileBadgeShowcaseResult } from "../../types";


/**
 * Класс с эндпоинтами значков профиля
 */
export class ProfileBadge {
    public constructor(private readonly client: Anixart) { }

    /**
     * GET profile/{id}/badge/list (Anixart 10.5+)
     *
     * Коллекция значков профиля: витрина, недавние и разделы по категориям.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @param profileId id профиля
     * @param recent id недавно просмотренных значков (только для своего профиля), через запятую
     * @returns {@link IProfileBadgeSectionsResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.list(1, ...);
     */
    public async list(profileId: number, recent?: number[] | string, options?: IBaseApiParams): Promise<IProfileBadgeSectionsResponse> {
        const recentParam = Array.isArray(recent) ? recent.join(',') : recent;
        return await this.client.call<number, IProfileBadgeSectionsResponse>({ path: `/profile/${profileId}/badge/list`, queryParams: { recent: recentParam }, ...options });
    }

    /**
     * GET profile/{id}/badge/list/{categoryId}/{page} (Anixart 10.5+)
     *
     * Значки одной категории профиля постранично.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IBadgesResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.section(1, 2, 0, ...);
     */
    public async section(profileId: number, categoryId: number, page: number, options?: IBaseApiParams): Promise<IBadgesResponse> {
        return await this.client.call<number, IBadgesResponse>({ path: `/profile/${profileId}/badge/list/${categoryId}/${page}`, ...options });
    }

    /**
     * GET profile/preference/badge/all/{page}
     *
     * @deprecated Убран в Anixart 10.5 — используйте {@link ProfileBadge.list} / {@link ProfileBadge.section}.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IBadgesResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.all(1, ...);
     */
    public async all(page: number, options?: IBaseApiParams): Promise<IBadgesResponse> {
        return await this.client.call<number, IBadgesResponse>({ path: `/profile/preference/badge/all/${page}`, ...options });
    }

    /**
     * GET profile/preference/badge/edit/{id}
     *
     * Выбирает значок профиля. С Anixart 10.5 в ответе приходит выбранный значок.
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IProfileBadgeResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.edit(1, ...);
     */
    public async edit(id2: number, options?: IBaseApiParams): Promise<IProfileBadgeResponse> {
        return await this.client.call<number, IProfileBadgeResponse>({ path: `/profile/preference/badge/edit/${id2}`, ...options });
    }

    /**
     * GET profile/preference/badge/remove
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.remove(...);
     */
    public async remove(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<number, IResponse>({ path: `/profile/preference/badge/remove`, ...options });
    }

    /**
     * POST profile/preference/badge/showcase/pin/{id} (Anixart 10.5+)
     *
     * Закрепляет значок на витрине профиля.
     *
     * Возможные коды ответа: {@link DefaultResult}, {@link ProfileBadgeShowcaseResult}
     * @returns {@link IProfileBadgeShowcaseResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.pinToShowcase(1, ...);
     */
    public async pinToShowcase(badgeId: number, options?: IBaseApiParams): Promise<IProfileBadgeShowcaseResponse> {
        return await this.client.call<number, IProfileBadgeShowcaseResponse>({ path: `/profile/preference/badge/showcase/pin/${badgeId}`, method: 'POST', resultEnum: ProfileBadgeShowcaseResult, ...options });
    }

    /**
     * POST profile/preference/badge/showcase/unpin/{id} (Anixart 10.5+)
     *
     * Убирает значок с витрины профиля.
     *
     * Возможные коды ответа: {@link DefaultResult}, {@link ProfileBadgeShowcaseResult}
     * @returns {@link IProfileBadgeShowcaseResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.unpinFromShowcase(1, ...);
     */
    public async unpinFromShowcase(badgeId: number, options?: IBaseApiParams): Promise<IProfileBadgeShowcaseResponse> {
        return await this.client.call<number, IProfileBadgeShowcaseResponse>({ path: `/profile/preference/badge/showcase/unpin/${badgeId}`, method: 'POST', resultEnum: ProfileBadgeShowcaseResult, ...options });
    }

    /**
     * POST profile/preference/badge/showcase/reorder (Anixart 10.5+)
     *
     * Задаёт порядок значков на витрине. Тело: `{ "ids": [...] }`.
     *
     * Возможные коды ответа: {@link DefaultResult}, {@link ProfileBadgeShowcaseResult}
     * @returns {@link IProfileBadgeShowcaseResponse}
     *
     * @example
     * const result = await client.endpoints.profileBadge.reorderShowcase([3, 1, 2], ...);
     */
    public async reorderShowcase(ids: number[], options?: IBaseApiParams): Promise<IProfileBadgeShowcaseResponse> {
        return await this.client.call<number, IProfileBadgeShowcaseResponse>({ path: `/profile/preference/badge/showcase/reorder`, method: 'POST', json: { ids }, resultEnum: ProfileBadgeShowcaseResult, ...options });
    }
}
