import { IResponse } from "./response";
import { IProfile, IProfileToken } from "./profile";

export enum LoginResult {
    InvalidLogin = 2,
    InvalidPassword = 3
}

export enum RegisterResult {
    InvalidLogin = 2,
    InvalidEmail = 3,
    InvalidPassword = 4,
    LoginAlreadyTaken = 5,
    EmailAlreadyTaken = 6,
    CodeAlreadySend = 7,
    CodeCannotSend = 8,
    EmailServiceDisallowed = 9,
    TooManyRegistrations = 10
}

export enum RegisterVerifyResult {
    InvalidLogin = 2,
    InvalidEmail = 3,
    InvalidPassword = 4,
    LoginAlreadyTaken = 5,
    EmailAlreadyTaken = 6,
    CodeAlreadySend = 7,
    CodeCannotSend = 8,
    InvalidHash = 9,
    EmailServiceDisallowed = 10,
    TooManyRegistrations = 11
}

export enum RestorePasswordResult {
    ProfileNotFound = 2,
    CodeAlreadySend = 3,
    CodeCannotSend = 4
}

export enum RestorePasswordVerifyResult {
    ProfileNotFound = 2,
    InvalidPassword = 3,
    CodeInvalid = 4,
    CodeExpired = 5,
    InvalidHash = 6
}

/** Заголовок, с которым сервер присылает 5-значный код подтверждения (Anixart 10.5+) */
export const LONG_CODE_HEADER = { 'X-Long-Code': '1' } as const;

/** Поля экрана ввода кода (Anixart 10.5+): длина кода и секунды до повторной отправки */
export interface ICodeInputResponse {
    /** Длина кода: 4 по умолчанию, 5 при заголовке {@link LONG_CODE_HEADER} */
    code_length?: number | null;
    /** Сколько секунд осталось до возможности запросить код повторно */
    code_time_left?: number | null;
}

export interface IRegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface IRegisterResponse<T extends number = RegisterResult> extends IResponse<T>, ICodeInputResponse {
    hash: string;
    codeTimestampExpires: number;
}

export interface IRegisterVerifyRequest extends IRegisterRequest {
    code: number;
    hash: string;
}

export interface IRestorePasswordRequest extends Omit<IRegisterVerifyRequest, "email"> {}

/** POST auth/restore — поле data (email или логин) */
export interface IRestoreEmailRequest {
    data: string;
}

/** POST auth/restore/verify */
export interface IRestoreVerifyRequest {
    data: string;
    password: string;
    hash: string;
    code: number;
}

/** Ответ POST auth/restore/verify */
export interface IRestoreVerifyResponse extends IResponse<RestorePasswordVerifyResult> {
    profile?: IProfile | null;
    profileToken?: IProfileToken | null;
    /** Сколько попыток ввода кода осталось (Anixart 10.5+) */
    attempts_left?: number | null;
}

/** POST auth/signUp, auth/vk, auth/google (регистрация) */
export interface ISignUpRequest {
    login: string;
    email: string;
    password: string;
}

/** POST auth/verify */
export interface ISignUpVerifyRequest extends ISignUpRequest {
    vkAccessToken?: string;
    googleIdToken?: string;
    telegramIdToken?: string;
    yandexAccessToken?: string;
    hash: string;
    code: number;
}

/** POST auth/checkLogin */
export interface ICheckLoginRequest {
    login: string;
}

export enum CheckLoginResult {
    InvalidLogin = 2
}

export interface ICheckLoginResponse extends IResponse<CheckLoginResult> {
    available: boolean;
    suggested_logins?: string[] | null;
}

/** POST auth/telegram (sign-in) */
export interface IOAuthTelegramSignInRequest {
    telegramIdToken: string;
}

/** POST auth/telegram (sign-up) */
export interface IOAuthTelegramSignUpRequest {
    login: string;
    email: string;
    telegramIdToken: string;
}

/** POST auth/yandex (sign-in) */
export interface IOAuthYandexSignInRequest {
    yandexAccessToken: string;
}

/** POST auth/yandex (sign-up) */
export interface IOAuthYandexSignUpRequest {
    login: string;
    email: string;
    yandexAccessToken: string;
}

/** Общие коды OAuth: VK / Telegram / Yandex (beta 21) */
export enum OAuthAuthResult {
    InvalidRequest = 2,
    NotRegistered = 3,
    InvalidLogin = 4,
    InvalidEmail = 5,
    LoginAlreadyTaken = 6,
    EmailAlreadyTaken = 7,
    CodeAlreadySend = 8,
    EmailServiceDisallowed = 9,
    TooManyRegistrations = 10
}

/** @deprecated используйте {@link OAuthAuthResult} */
export enum TelegramAuthResult {
    InvalidRequest = 2,
    NotRegistered = 3,
    InvalidLogin = 4,
    InvalidEmail = 5,
    LoginAlreadyTaken = 6,
    EmailAlreadyTaken = 7,
    CodeAlreadySend = 8,
    EmailServiceDisallowed = 9,
    TooManyRegistrations = 10
}

/** Коды Google OAuth (отличаются от VK/TG/Yandex) */
export enum GoogleAuthResult {
    InvalidRequest = 2,
    NotRegistered = 3,
    InvalidLogin = 4,
    InvalidEmail = 5,
    LoginAlreadyTaken = 6,
    EmailAlreadyTaken = 7,
    EmailChanged = 8,
    EmailChangedAndCodeAlreadySend = 9,
    EmailServiceDisallowed = 10,
    TooManyRegistrations = 11
}

export type VkAuthResult = OAuthAuthResult;
export type YandexAuthResult = OAuthAuthResult;

/** Базовый ответ OAuth sign-in / sign-up */
export interface IOAuthAuthResponse<T extends number = OAuthAuthResult> extends IResponse<T>, ICodeInputResponse {
    profile?: IProfile;
    profileToken?: IProfileToken;
    hash?: string;
    codeTimestampExpires?: number;
    suggested_logins?: string[] | null;
}

export interface ITelegramAuthResponse extends IOAuthAuthResponse<TelegramAuthResult> {}

export interface IVkAuthResponse extends IOAuthAuthResponse<OAuthAuthResult> {}

export interface IGoogleAuthResponse extends IOAuthAuthResponse<GoogleAuthResult> {}

/** Yandex дополнительно отдаёт email при регистрации */
export interface IYandexAuthResponse extends IOAuthAuthResponse<OAuthAuthResult> {
    email?: string | null;
}

export interface ILoginRequest {
    login: string;
    password: string;
}

export interface IResendRequest {
    login?: string,
    email?: string,
    password?: string,
    vkAccessToken?: string,
    googleIdToken?: string,
    telegramIdToken?: string,
    yandexAccessToken?: string,
    hash: string
}

export interface IRestoreResendRequest {
    data: string,
    password: string,
    hash: string
}

export interface IOAuthGoogleSignInRequest {
    googleIdToken: string
}

export interface IOAuthGoogleSignUpRequest {
    login: string,
    email: string,
    googleIdToken: string
}

export interface IOAuthVkSignInRequest {
    vkAccessToken: string
}

export interface IOAuthVkSignUpRequest {
    login: string,
    email: string,
    vkAccessToken: string
}
export interface ILoginResponse<T extends number = LoginResult> extends IResponse<T> {
    profile: IProfile;
    profileToken: IProfileToken;
}

export interface ISignResponse extends IResponse {
    sign?: string
}

export interface ISponsorResponse extends IResponse {
    is_sponsor?: boolean
}

export interface IUserResponse extends IResponse {
    id?: number,
    is_sponsor?: boolean
}
/**
 * Коды ответа QR-входа (Anixart 11+, `QrAuthResponse`)
 *
 * `code` в ответе — результат запроса, а состояние сессии лежит в {@link IQrAuthResponse.status} ({@link QrAuthStatus}).
 */
export enum QrAuthResult {
    Expired = 2,
    Declined = 3,
    TooManyAttempts = 4,
    PinInvalid = 5,
    TooManyRequests = 6
}

/** Состояние QR-сессии в {@link IQrAuthResponse.status} */
export enum QrAuthStatus {
    /** QR ещё не отсканирован */
    Waiting = 0,
    /** QR отсканирован, ждём подтверждения PIN-кодом */
    Scanned = 1,
    /** Вход подтверждён: в ответе `profile` и `profileToken` */
    Confirmed = 2
}

/** POST auth/qr/create — устройство, на котором выполняется вход */
export interface IQrAuthCreateRequest {
    /** Название устройства, его видит пользователь при подтверждении */
    device: string
}

/** POST auth/qr/status — опрос сессии с устройства, на котором выполняется вход */
export interface IQrAuthStatusRequest {
    key: string,
    secret: string
}

/** POST auth/qr/confirm — подтверждение входа с авторизованного устройства */
export interface IQrAuthConfirmRequest {
    key: string,
    /** PIN-код, показанный на устройстве, где выполняется вход */
    pin: string
}

/**
 * Ответ всех эндпоинтов auth/qr/* (Anixart 11+)
 *
 * Приложение принимает в QR ссылку вида `https://anixart-app.com/sign-in/qr?key={key}` (или deep link `…://sign-in/qr?key={key}`).
 */
export interface IQrAuthResponse extends IResponse<QrAuthResult> {
    key?: string | null,
    /** Секрет сессии из ответа `auth/qr/create`; нужен для `auth/qr/status` */
    secret?: string | null,
    /** PIN-код, который устройство показывает рядом с QR */
    pin?: string | null,
    /** Время жизни сессии в секундах */
    expires_in?: number | null,
    /** Рекомендуемый интервал опроса `auth/qr/status` в секундах */
    poll_interval?: number | null,
    status?: QrAuthStatus | null,
    device?: string | null,
    country_code?: string | null,
    attempts_left?: number | null,
    /** Только при {@link QrAuthStatus.Confirmed} */
    profile?: IProfile | null,
    /** Только при {@link QrAuthStatus.Confirmed} */
    profileToken?: IProfileToken | null
}
