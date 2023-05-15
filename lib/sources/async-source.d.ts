import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 */
export declare abstract class AsyncSource implements Source {
    sourceId: string;
    abstract readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    abstract getAvatar(size: number): string;
    abstract processResponse(data: unknown, size?: number): string | null;
}
