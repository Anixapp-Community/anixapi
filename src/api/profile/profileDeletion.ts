import { Anixart } from "../../client";
import { DefaultResult, IBaseApiParams, IProfileDeletionRequest, IResponse } from "../../types";


/**
 * Класс с эндпоинтами удаления профиля
 */
export class ProfileDeletion {
    public constructor(private readonly client: Anixart) { }

    /**
     * POST profile/deletion/cancel
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.profileDeletion.cancel(...);
     */
    public async cancel(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<number, IResponse>({ path: `/profile/deletion/cancel`, method: 'POST', ...options });
    }

    /**
     * POST profile/deletion/request
     *
     * Пароль уходит form-полем `password` (`@FormUrlEncoded` в приложении).
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.profileDeletion.request({ password: "..." });
     */
    public async request(data: IProfileDeletionRequest, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<number, IResponse>({ path: `/profile/deletion/request`, method: 'POST', urlEncoded: data, ...options });
    }

    /**
     * GET profile/deletion/status
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.profileDeletion.status(...);
     */
    public async status(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<number, IResponse>({ path: `/profile/deletion/status`, ...options });
    }
}
