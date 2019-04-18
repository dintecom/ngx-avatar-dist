import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 * Initials source impelementation.
 * return the initals of the given value
 */
export declare class Initials implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(initialsSize: number): string;
    /**
     * Returns the initial letters of a name in a string.
     */
    private getInitials;
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     */
    private constructInitials;
}
