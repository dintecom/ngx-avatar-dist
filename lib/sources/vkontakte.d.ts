import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
export declare class Vkontakte extends AsyncSource {
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(size: number): string;
    /**
     * extract vkontakte avatar from json data
     */
    processResponse(data: any): string;
    /**
     * Returns image size related to vkontakte API
     */
    private getImageSize;
}
