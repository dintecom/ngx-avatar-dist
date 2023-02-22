import { AvatarSource } from './sources/avatar-source.enum';
/**
 * Represents avatar configuration object.
 */
export interface NgxAvatarConfig {
    /**
     * The avatars colors.
     */
    colors?: string[];
    /**
     * The order in which the avatar sources will be used.
     */
    sourcePriorityOrder?: AvatarSource[];
    /**
     * Avatar services request cache lifetime.
     */
    cacheLifetimeSecond?: number;
}
