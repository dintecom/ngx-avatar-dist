import { AvatarSource } from './sources/avatar-source.enum';
import { AvatarConfig } from './avatar-config';
export declare class AvatarConfigService {
    userConfig: AvatarConfig;
    constructor(userConfig: AvatarConfig);
    getAvatarSources(defaultSources: AvatarSource[]): AvatarSource[];
    getAvatarColors(defaultColors: string[]): string[];
}
