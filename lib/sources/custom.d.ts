import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
/**
 *  Custom source implementation.
 *  return custom image as an avatar
 *
 */
export declare class Custom implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
}
