import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
/**
 *  Value source implementation.
 *  return the value as avatar
 */
export declare class Value implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
}
