import type { IList } from "./response";

export interface IBaseApiParams {
    token?: string,
    signal?: AbortSignal,
    /** Таймаут запроса в миллисекундах */
    timeoutMs?: number,
    /** Версия API для заголовка `API-Version` (например 2 → `v2`) */
    apiVersion?: number,
    /** Бросить {@link AnixApiError}, если в ответе code !== {@link DefaultResult.Ok} */
    throwOnApiError?: boolean,
    /** @alias {@link IBaseApiParams.throwOnApiError} */
    throwOnAnixartError?: boolean,
    /** Коды `code`, которые считаются успехом. По умолчанию `[0]`. */
    successCodes?: number[],
    /** Enum кодов результата для имени ошибки (`InvalidPassword` и т.п.). */
    resultEnum?: Record<number, string>,
    /** Дополнительные заголовки запроса */
    headers?: Record<string, string>
}

export interface IBaseRequest extends IBaseApiParams {
    path: string,
    json?: object,
    customBaseUrl?: string,
    bearer?: string,
    urlEncoded?: object,
    queryParams?: object,
    method?: string,
    tokenRequired?: boolean,
    apiV2?: boolean,
    image?: {
        name: string,
        stream: Buffer,
        boundary?: string,
        type: "file" | "image"
    }
}

export interface IBaseRequestPageable {
    page: number
}

export interface IBaseSearchRequest extends IBaseRequestPageable {
    query: string,
    searchBy: number
}

export interface IBaseCommentAddRequest {
    parentCommentId?: number | null,
    replyToProfileId?: number | null,
    message: string,
    /** JSON-имя в приложении (`CommentAddRequest.spoiler`) */
    spoiler?: boolean,
    /** @deprecated сервер ждёт {@link IBaseCommentAddRequest.spoiler}; оставлено для совместимости */
    isSpoiler?: boolean
}

export interface ICommentEditRequest {
    message?: string,
    spoiler?: boolean
}

export interface ICommentProcessRequest {
    is_banned?: boolean,
    is_deleted?: boolean,
    is_spoiler?: boolean,
    /** В приложении без `@JsonProperty` → camelCase */
    banExpires?: number,
    banReason?: string,
    message?: string,
    reason?: string
}

export interface ICommentReportRequest {
    message?: string,
    reason?: number
}

export interface IArticlesFilterRequest {
    channel_id?: number,
    date?: number
}

export interface IArticleSuggestionsFilterRequest {
    channel_id?: number
}

/**
 * POST export/bookmarks (`BookmarksExportRequest`)
 *
 * Сортировка передаётся query-параметром `sort` ({@link BookmarksExportSort}).
 * Формат файла (CSV/TXT) и дополнительные колонки приложение собирает само из `releases` ответа —
 * на сервер они не отправляются (см. {@link BookmarksExportType}, {@link BookmarksExportExtraField}).
 */
export interface IBookmarksExportRequest {
    /** Списки для экспорта: 0 — избранное, 1 — смотрю, 2 — в планах, 3 — просмотрено, 4 — отложено, 5 — брошено */
    bookmarksExportProfileLists: number[]
}

/**
 * POST import/bookmarks (`BookmarksImportRequest`)
 *
 * Поля — массивы id тайтлов в сервисе-источнике (для Shikimori — `target_id` из JSON-выгрузки),
 * сопоставление с релизами Anixart делает сервер. Имена в JSON — Java-имена (Jackson),
 * кроме `selected_importer_name`.
 */
export interface IBookmarksImportRequest {
    /** Имя источника импорта; в приложении есть только `"Shikimori"` */
    selected_importer_name: string,
    watching: number[],
    plans: number[],
    completed: number[],
    holdOn: number[],
    dropped: number[]
}

/** Query `sort` для POST export/bookmarks */
export enum BookmarksExportSort {
    Title = 0,
    Status = 1,
    Vote = 2
}

/** Формат файла экспорта (только на клиенте, в запрос не входит) */
export enum BookmarksExportType {
    /** CSV: колонки через `,`, первая строка — заголовок */
    Csv = 0,
    /** TXT: колонки через ` / `, без заголовка */
    Txt = 1
}

/** Дополнительные колонки экспорта (только на клиенте, в запрос не входят) */
export enum BookmarksExportExtraField {
    TitleOriginal = 0,
    TitleAlt = 1,
    /** «В избранном» + статус закладки */
    FavoriteAndStatus = 2,
    YourVote = 3
}

export interface IChannelPermissionsFilterRequest {
    permission?: number
}

export interface IChannelsFilterRequest {
    is_blog?: boolean,
    is_subscribed?: boolean,
    permission?: number,
    sort?: number
}

export interface ICollectionReportRequest {
    message?: string,
    reason?: number
}

export interface IDirectLinksRequest {}

export interface IProfileReleaseTypeNotificationPreferencesEditRequest {
    profile_release_type_notification_preferences?: number[]
    release_id?: number
}

export interface IProfileStatusNotificationPreferencesEditRequest {
    /** Android Retrofit field name (camelCase). */
    profileStatusNotificationPreferences?: number[]
    /** @deprecated snake_case alias — prefer camelCase */
    profile_status_notification_preferences?: number[]
}

export interface IProfileTypeNotificationPreferencesEditRequest {
    /** Android Retrofit field name (camelCase). */
    profileTypeNotificationPreferences?: number[]
    /** @deprecated snake_case alias — prefer camelCase */
    profile_type_notification_preferences?: number[]
}

export interface IPrivacyEditRequest {
    permission?: number
}

export interface IProfileEnforcementAppealRequest {
    message?: string
}

export interface IProfileProcessRequest {
    is_banned?: boolean,
    /** В приложении без `@JsonProperty` → camelCase */
    banExpires?: number,
    banReason?: string
}

/** POST profile/preference/social/edit — в приложении поля без `@JsonProperty` → camelCase */
export interface ISocialPagesEditRequest {
    discordPage?: string,
    instPage?: string,
    tgPage?: string,
    ttPage?: string,
    vkPage?: string
}

export interface IStatusEditRequest {
    status?: string
}

export interface IReleaseReportRequest {
    message?: string,
    reason?: number
}

/** POST release/video/appeal/add — в приложении поля без `@JsonProperty` → camelCase */
export interface IReleaseVideoAppealRequest {
    categoryId?: number,
    releaseId?: number,
    title?: string,
    url?: string
}

/** POST profile/deletion/request (form) */
export interface IProfileDeletionRequest {
    password: string
}

/** Query для GET profile/list/all/... */
export interface IProfileListQuery {
    sort?: number,
    /** {@link ProfileListAnnounceFilter} */
    filter_announce?: number
}

/** Query `filter_announce` в GET profile/list/all/... */
export enum ProfileListAnnounceFilter {
    All = 0,
    /** Только анонсы */
    OnlyAnnounce = 1,
    /** Без анонсов */
    ExcludeAnnounce = 2
}

export interface IReportRequest {
    entity_id?: number,
    reason?: number,
    message?: string,
    reason_id?: number
}