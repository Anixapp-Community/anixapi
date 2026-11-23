import { IProfile } from "./profile";
import { IRelease } from "./release";
import { IBaseComment, IBaseCompactComment, IResponse, CommentAddResult } from "./response";
import { IBaseRequestPageable } from "./request";

export interface ICollection {
    '@id': number;
    id: number;
    creator: IProfile;
    title: string;
    description: string;
    image: string;
    /** Anixart 11+, анимированная версия изображения (может отсутствовать) */
    cover_animation?: string | null;
    creation_date: number;
    last_update_date: number;
    comment_count: number;
    favorites_count: number;
    is_private: boolean;
    is_deleted: boolean;
    is_favorite: boolean;
    releases: IRelease[];
    /** Anixart 11 BETA 3+: количество релизов в коллекции (в списках вместо `releases`) */
    release_count?: number | null;
    /** Anixart 11 BETA 3+: сколько релизов коллекции просмотрено текущим профилем */
    watched_count?: number | null;
    /** Anixart 11 BETA 3+: есть ли конкретный релиз в коллекции (`releaseCollections` с `release_id`) */
    has_release?: boolean | null;
    /** Anixart 11 BETA 3+: превью релизов для карточки коллекции */
    releases_preview?: ICollectionReleasePreview[] | null;
}

/** Anixart 11 BETA 3+: краткое превью релиза в карточке коллекции. */
export interface ICollectionReleasePreview {
    id: number;
    image: string;
}

/** Anixart 11 BETA 3+: ответ `GET collection/hub`. */
export interface ICollectionHubResponse extends IResponse {
    weekly: ICollection[];
    recommended: ICollection[];
    my: ICollection[];
    my_count: number;
}

export interface ICollectionCompact {
    id: number,
    title: string,
    image: string
}

export interface ICollectionCompactComment extends IBaseCompactComment {
    collection: ICollectionCompact
}

export interface ICollectionResponse<T extends number = CollectionResult> extends IResponse<T> {
    collection: ICollection,
    watching_count: number,
    plan_count: number,
    completed_count: number,
    hold_on_count: number,
    dropped_count: number
}

export interface IReleaseInCollectionRequest extends IBaseRequestPageable {
    id: number,
    sort: number
}

export interface ICollectionCreateRequest {
    title: string,
    description: string,
    releases: number[],
    is_private: boolean
}

export interface ICollectionComment extends IBaseComment {
    collection: ICollection
}

export interface ICollectionCommentAddResponse extends IResponse<CommentAddResult> {
    comment?: ICollectionComment
}

export enum CollectionResult {
    InvalidId = 2,
    IsPrivate = 3,
    IsDeleted = 4
}

export enum FavoriteCollectionAddResult {
    CollectionNotFound = 2,
    CollectionAlreadyInFavorite = 3
}

export enum FavoriteCollectionDeleteResult {
    CollectionNotFound = 2
}

export enum CollectionCreateEditResult {
    InvalidTitle = 2,
    InvalidDescription = 3,
    InvalidReleases = 4,
    CollectionLimitReached = 5,
    CollectionNotFound = 6,
    CollectionNotOwned = 7,
    CollectionDeleted = 8,
    ReleaseLimitReached = 9
}

export enum ReleaseAddCollectionResult {
    CollectionNotFound = 2,
    CollectionNotOwned = 3,
    InvalidRelease = 4,
    ReleaseAlreadyInCollection = 5,
    CollectionDeleted = 6,
    ReleaseLimitReached = 7
}

export enum CollectionDeleteResult {
    CollectionNotFound = 2,
    CollectionNotOwned = 3,
    CollectionDeleted = 4
}

/** Anixart 11 BETA 3+: коды `GET collectionMy/release/remove/{collectionId}`. */
export enum ReleaseRemoveCollectionResult {
    CollectionNotFound = 2,
    CollectionNotOwned = 3,
    InvalidRelease = 4,
    ReleaseNotInCollection = 5,
    CollectionDeleted = 6,
    LastRelease = 7
}

export interface ICollectionDeleteResponse extends IResponse {}
export interface ICollectionEditImageResponse extends IResponse {
    url?: string
}
export interface ICollectionCreateEditResponse extends IResponse<CollectionCreateEditResult> {
    collection?: ICollection
}
export interface ICollectionReportResponse extends IResponse {}
export interface IFavoriteCollectionAddResponse extends IResponse {}
export interface IFavoriteCollectionDeleteResponse extends IResponse {}
export interface IReleaseAddCollectionResponse extends IResponse<ReleaseAddCollectionResult> {
    /** Anixart 11 BETA 3+: коллекция после добавления релиза */
    collection?: ICollection
}
export interface IReleaseRemoveCollectionResponse extends IResponse<ReleaseRemoveCollectionResult> {
    /** Anixart 11 BETA 3+: коллекция после удаления релиза */
    collection?: ICollection
}

export interface ICollectionCommentCompact {
    collection?: ICollectionCompact,
    embeddable_id?: number,
    embeddable_title?: string
}