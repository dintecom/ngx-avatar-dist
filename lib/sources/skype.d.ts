import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
/**
 *  Skype source implementation.
 *  Fetch avatar source based on skype identifier
 */
export declare class Skype implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
}
