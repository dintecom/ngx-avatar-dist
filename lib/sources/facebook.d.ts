import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
/**
 *  Facebook source implementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export declare class Facebook implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(size: number): string;
}
