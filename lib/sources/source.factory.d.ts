import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
export declare class SourceFactory {
    private sources;
    constructor();
    newInstance(sourceType: AvatarSource, sourceValue: string): Source;
}
