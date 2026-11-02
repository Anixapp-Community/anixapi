import type { IBaseCommentAddRequest } from "../types";

export class Utils {
    public static generateTempFileName(): string {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 15); // YYYYMMDD_HHMMSS
        return `temp_file_${timestamp}.jpg`;
    }

    /** Тело `CommentAddRequest`: сервер ждёт `spoiler`, устаревший `isSpoiler` переносится в него */
    public static commentAddBody(body: IBaseCommentAddRequest): Omit<IBaseCommentAddRequest, "isSpoiler"> {
        const { isSpoiler, ...rest } = body;
        return { ...rest, spoiler: body.spoiler ?? isSpoiler ?? false };
    }
}