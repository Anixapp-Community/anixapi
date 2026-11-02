import { Anixart } from "../client";
import { CheckLoginResult, DefaultResult, IBaseApiParams, ICheckLoginRequest, ICheckLoginResponse, IGoogleAuthResponse, ILoginRequest, ILoginResponse, IOAuthGoogleSignInRequest, IOAuthGoogleSignUpRequest, IOAuthTelegramSignInRequest, IOAuthTelegramSignUpRequest, IOAuthVkSignInRequest, IOAuthVkSignUpRequest, IOAuthYandexSignInRequest, IOAuthYandexSignUpRequest, IQrAuthConfirmRequest, IQrAuthCreateRequest, IQrAuthResponse, IQrAuthStatusRequest, IRegisterResponse, IResendRequest, IResponse, IRestoreEmailRequest, IRestoreResendRequest, IRestoreVerifyRequest, IRestoreVerifyResponse, ISignUpRequest, LONG_CODE_HEADER, ISignUpVerifyRequest, ITelegramAuthResponse, IVkAuthResponse, IYandexAuthResponse, LoginResult, QrAuthResult, RegisterResult, RegisterVerifyResult, RestorePasswordResult, RestorePasswordVerifyResult } from "../types";


/**
 * Класс с эндпоинтами авторизации
 */
export class Auth {
    public constructor(private readonly client: Anixart) { }

    /**
     * POST auth/checkLogin
     *
     * Возможные коды ответа: {@link CheckLoginResult}
     * @returns {@link ICheckLoginResponse}
     *
     * @example
     * const result = await client.endpoints.auth.checkLogin({ login: 'user' });
     */
    public async checkLogin(data: ICheckLoginRequest, options?: IBaseApiParams): Promise<ICheckLoginResponse> {
        return await this.client.call<number, ICheckLoginResponse>({ path: `/auth/checkLogin`, method: 'POST', urlEncoded: data, resultEnum: CheckLoginResult, ...options });
    }

    /**
     * POST auth/firebase
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.auth.firebase(...);
     */
    public async firebase(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<number, IResponse>({ path: `/auth/firebase`, method: 'POST', ...options });
    }

    /**
     * POST auth/qr/create (Anixart 11+)
     *
     * Создаёт QR-сессию на устройстве, где выполняется вход. Токен не нужен.
     *
     * Возможные коды ответа: {@link QrAuthResult}
     * @returns {@link IQrAuthResponse}
     *
     * @example
     * const { key, secret, pin } = await client.endpoints.auth.qrCreate({ device: "AnixApp (Windows)" });
     */
    public async qrCreate(data: IQrAuthCreateRequest, options?: IBaseApiParams): Promise<IQrAuthResponse> {
        return await this.client.call<number, IQrAuthResponse>({ path: `/auth/qr/create`, method: 'POST', urlEncoded: data, resultEnum: QrAuthResult, ...options });
    }

    /**
     * POST auth/qr/status (Anixart 11+)
     *
     * Опрос QR-сессии с устройства, где выполняется вход (каждые `poll_interval` секунд).
     * При `status` = {@link QrAuthStatus.Confirmed} в ответе приходят `profile` и `profileToken`.
     *
     * Возможные коды ответа: {@link QrAuthResult}
     * @returns {@link IQrAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.qrStatus({ key, secret });
     */
    public async qrStatus(data: IQrAuthStatusRequest, options?: IBaseApiParams): Promise<IQrAuthResponse> {
        return await this.client.call<number, IQrAuthResponse>({ path: `/auth/qr/status`, method: 'POST', urlEncoded: data, resultEnum: QrAuthResult, ...options });
    }

    /**
     * POST auth/qr/open (Anixart 11+)
     *
     * Авторизованное устройство открыло QR: сессия переходит в {@link QrAuthStatus.Scanned},
     * в ответе `device` и `country_code` устройства, где выполняется вход.
     *
     * Возможные коды ответа: {@link QrAuthResult}
     * @returns {@link IQrAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.qrOpen(key);
     */
    public async qrOpen(key: string, options?: IBaseApiParams): Promise<IQrAuthResponse> {
        return await this.client.call<number, IQrAuthResponse>({ path: `/auth/qr/open`, method: 'POST', urlEncoded: { key }, resultEnum: QrAuthResult, ...options });
    }

    /**
     * POST auth/qr/confirm (Anixart 11+)
     *
     * Подтверждение входа PIN-кодом с авторизованного устройства.
     *
     * Возможные коды ответа: {@link QrAuthResult}
     * @returns {@link IQrAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.qrConfirm({ key, pin: "1234" });
     */
    public async qrConfirm(data: IQrAuthConfirmRequest, options?: IBaseApiParams): Promise<IQrAuthResponse> {
        return await this.client.call<number, IQrAuthResponse>({ path: `/auth/qr/confirm`, method: 'POST', urlEncoded: data, resultEnum: QrAuthResult, ...options });
    }

    /**
     * POST auth/qr/decline (Anixart 11+)
     *
     * Отклонение входа с авторизованного устройства.
     *
     * Возможные коды ответа: {@link QrAuthResult}
     * @returns {@link IQrAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.qrDecline(key);
     */
    public async qrDecline(key: string, options?: IBaseApiParams): Promise<IQrAuthResponse> {
        return await this.client.call<number, IQrAuthResponse>({ path: `/auth/qr/decline`, method: 'POST', urlEncoded: { key }, resultEnum: QrAuthResult, ...options });
    }

    /**
     * POST auth/resend
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IRegisterResponse}
     *
     * @example
     * const result = await client.endpoints.auth.resend(...);
     */
    public async resend(data: IResendRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return await this.client.call<number, IRegisterResponse>({ path: `/auth/resend`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/restore
     *
     * Возможные коды ответа: {@link RestorePasswordResult}
     * @returns {@link IRegisterResponse}
     *
     * @example
     * const result = await client.endpoints.auth.restore(...);
     */
    public async restore(data: IRestoreEmailRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return await this.client.call<number, IRegisterResponse>({ path: `/auth/restore`, method: 'POST', urlEncoded: data, resultEnum: RestorePasswordResult, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/restore/resend
     *
     * Возможные коды ответа: {@link DefaultResult}
     * @returns {@link IRegisterResponse}
     *
     * @example
     * const result = await client.endpoints.auth.restoreResend(...);
     */
    public async restoreResend(data: IRestoreResendRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return await this.client.call<number, IRegisterResponse>({ path: `/auth/restore/resend`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/restore/verify
     *
     * Возможные коды ответа: {@link RestorePasswordVerifyResult}
     * @returns {@link IResponse}
     *
     * @example
     * const result = await client.endpoints.auth.restoreVerify(...);
     */
    public async restoreVerify(data: IRestoreVerifyRequest, options?: IBaseApiParams): Promise<IRestoreVerifyResponse> {
        return await this.client.call<number, IRestoreVerifyResponse>({ path: `/auth/restore/verify`, method: 'POST', urlEncoded: data, resultEnum: RestorePasswordVerifyResult, ...options });
    }

    /**
     * POST auth/signIn
     *
     * Возможные коды ответа: {@link LoginResult}
     * @returns {@link ILoginResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signIn(...);
     */
    public async signIn(data: ILoginRequest, options?: IBaseApiParams): Promise<ILoginResponse> {
        return await this.client.call<number, ILoginResponse>({ path: `/auth/signIn`, method: 'POST', urlEncoded: data, resultEnum: LoginResult, ...options });
    }

    /**
     * POST auth/google
     *
     * Возможные коды ответа: {@link GoogleAuthResult}
     * @returns {@link IGoogleAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signInWithGoogle(...);
     */
    public async signInWithGoogle(data: IOAuthGoogleSignInRequest, options?: IBaseApiParams): Promise<IGoogleAuthResponse> {
        return await this.client.call<number, IGoogleAuthResponse>({ path: `/auth/google`, method: 'POST', urlEncoded: data, ...options });
    }

    /**
     * POST auth/telegram
     *
     * Возможные коды ответа: {@link TelegramAuthResult}
     * @returns {@link ITelegramAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signInWithTelegram(...);
     */
    public async signInWithTelegram(data: IOAuthTelegramSignInRequest, options?: IBaseApiParams): Promise<ITelegramAuthResponse> {
        return await this.client.call<number, ITelegramAuthResponse>({ path: `/auth/telegram`, method: 'POST', urlEncoded: data, ...options });
    }

    /**
     * POST auth/vk
     *
     * Возможные коды ответа: {@link OAuthAuthResult}
     * @returns {@link IVkAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signInWithVk(...);
     */
    public async signInWithVk(data: IOAuthVkSignInRequest, options?: IBaseApiParams): Promise<IVkAuthResponse> {
        return await this.client.call<number, IVkAuthResponse>({ path: `/auth/vk`, method: 'POST', urlEncoded: data, ...options });
    }

    /**
     * POST auth/yandex (с beta 21)
     *
     * Возможные коды ответа: {@link OAuthAuthResult}
     * @returns {@link IYandexAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signInWithYandex({ yandexAccessToken });
     */
    public async signInWithYandex(data: IOAuthYandexSignInRequest, options?: IBaseApiParams): Promise<IYandexAuthResponse> {
        return await this.client.call<number, IYandexAuthResponse>({ path: `/auth/yandex`, method: 'POST', urlEncoded: data, ...options });
    }

    /**
     * POST auth/signUp
     *
     * Возможные коды ответа: {@link RegisterResult}
     * @returns {@link IRegisterResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signUp(...);
     */
    public async signUp(data: ISignUpRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return await this.client.call<number, IRegisterResponse>({ path: `/auth/signUp`, method: 'POST', urlEncoded: data, resultEnum: RegisterResult, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/google
     *
     * Возможные коды ответа: {@link GoogleAuthResult}
     * @returns {@link IGoogleAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signUpWithGoogle(...);
     */
    public async signUpWithGoogle(data: IOAuthGoogleSignUpRequest, options?: IBaseApiParams): Promise<IGoogleAuthResponse> {
        return await this.client.call<number, IGoogleAuthResponse>({ path: `/auth/google`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/telegram
     *
     * Возможные коды ответа: {@link TelegramAuthResult}
     * @returns {@link ITelegramAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signUpWithTelegram(...);
     */
    public async signUpWithTelegram(data: IOAuthTelegramSignUpRequest, options?: IBaseApiParams): Promise<ITelegramAuthResponse> {
        return await this.client.call<number, ITelegramAuthResponse>({ path: `/auth/telegram`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/vk
     *
     * Возможные коды ответа: {@link OAuthAuthResult}
     * @returns {@link IVkAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signUpWithVk(...);
     */
    public async signUpWithVk(data: IOAuthVkSignUpRequest, options?: IBaseApiParams): Promise<IVkAuthResponse> {
        return await this.client.call<number, IVkAuthResponse>({ path: `/auth/vk`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/yandex (с beta 21)
     *
     * Возможные коды ответа: {@link OAuthAuthResult}
     * @returns {@link IYandexAuthResponse}
     *
     * @example
     * const result = await client.endpoints.auth.signUpWithYandex({ login, email, yandexAccessToken });
     */
    public async signUpWithYandex(data: IOAuthYandexSignUpRequest, options?: IBaseApiParams): Promise<IYandexAuthResponse> {
        return await this.client.call<number, IYandexAuthResponse>({ path: `/auth/yandex`, method: 'POST', urlEncoded: data, ...options, headers: { ...LONG_CODE_HEADER, ...options?.headers } });
    }

    /**
     * POST auth/verify
     *
     * Возможные коды ответа: {@link RegisterVerifyResult}
     * @returns {@link IRegisterResponse}
     *
     * @example
     * const result = await client.endpoints.auth.verify(...);
     */
    public async verify(data: ISignUpVerifyRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return await this.client.call<number, IRegisterResponse>({ path: `/auth/verify`, method: 'POST', urlEncoded: data, resultEnum: RegisterVerifyResult, ...options });
    }
}
