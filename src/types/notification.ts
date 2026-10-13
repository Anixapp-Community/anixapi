import { ICollectionCompactComment } from "./collection";
import { IProfile } from "./profile";
import { IRelease, IReleaseCompactComment } from "./release";
import { IResponse } from "./response";

export interface INotificationCountResponse extends IResponse {
    count: number
}

export interface IBaseNotification {
    id: number,
    type: string,
    timestamp: number,
    is_pushed: boolean,
    is_new: boolean
}

export interface IFriendNotification extends IBaseNotification {
    profile: IProfile,
    status: string,
    by_profile: IProfile
}

export interface IArticleNotification extends IBaseNotification {
    '@id': number,
    article: number,
    profile: IProfile
}

export interface IRelatedReleaseNotification extends IBaseNotification {
    '@id': number,
    release: IRelease | number
}

export interface IReleaseCommentNotification extends IBaseNotification {
    parentComment: IReleaseCompactComment,
    comment: IReleaseCompactComment
}

export interface ICollectionCommentNotification extends IBaseNotification {
    parentComment: ICollectionCompactComment,
    comment: ICollectionCompactComment
}

export interface IArticleCommentNotification extends IBaseNotification {
    parentComment?: unknown,
    comment?: unknown
}

export interface IEpisodeNotification extends IBaseNotification {
    release?: IRelease | number,
    episode?: number
}

export interface INotificationPreferenceResponse extends IResponse {
    is_episode_notifications_enabled?: boolean
    is_first_episode_notification_enabled?: boolean
    is_related_release_notifications_enabled?: boolean
    is_report_process_notifications_enabled?: boolean
    is_comment_notifications_enabled?: boolean
    is_my_collection_comment_notifications_enabled?: boolean
    is_article_notifications_enabled?: boolean
    is_my_article_comment_notifications_enabled?: boolean
    is_release_type_notifications_enabled?: boolean
    profile_status_notification_preferences?: IProfileStatusNotificationPreference[]
    profile_type_notification_preferences?: IProfileTypeNotificationPreference[]
}

export interface IProfileReleaseTypeNotificationPreferencesResponse extends IResponse {
    profile_release_type_notification_preferences?: IProfileReleaseTypeNotificationPreference[]
}

export interface IProfileFriendNotification extends IBaseNotification {
    by_profile?: IProfile,
    value?: unknown
}

export interface IProfileArticleNotification extends IBaseNotification {}
export interface IProfileArticleCommentNotification extends IBaseNotification {}
export interface IProfileMyArticleCommentNotification extends IBaseNotification {}
export interface IProfileCollectionCommentNotification extends IBaseNotification {}
export interface IProfileMyCollectionCommentNotification extends IBaseNotification {}
export interface IProfileEpisodeNotification extends IBaseNotification {}
export interface IProfileRelatedReleaseNotification extends IBaseNotification {}
export interface IProfileReleaseCommentNotification extends IBaseNotification {}

export interface IProfileReleaseTypeNotificationPreference {
    type?: { id?: number; name?: string; [key: string]: unknown }
}

export interface IProfileStatusNotificationPreference {
    status?: number | string | { value?: number; [key: string]: unknown }
    value?: unknown
}

export interface IProfileTypeNotificationPreference {
    type?: { id?: number; name?: string; [key: string]: unknown }
}

export interface IApiSilentPush {}
export interface ISilentPush {
    type?: number
}
export interface IUnsupportedProfileNotification {}

export enum DeleteNotificationType {
    ArticleComment = "article/comment",
    CollectionComment = "collectionComment",
    Episode = "episode",
    Friend = "friend",
    MyArticleComment = "my/article/comment",
    MyCollectionComment = "my/collection/comment",
    RelatedRelease = "related/release",
    ReleaseComment = "releaseComment",
}

export enum NotificationPreferenceEditType {
    Article = "article",
    Comment = "comment",
    Episode = "episode",
    FirstEpisode = "episode/first",
    MyArticleComment = "my/article/comment",
    MyCollectionComment = "my/collection/comment",
    RelatedRelease = "related/release",
    ReportProcess = "report/process",
    SelectedReleases = "selected/releases",
}