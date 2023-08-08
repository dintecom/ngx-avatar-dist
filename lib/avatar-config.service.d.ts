import { AvatarSource } from './sources/avatar-source.enum';
import { AvatarConfig } from './avatar-config';
import * as i0 from "@angular/core";
export declare class AvatarConfigService {
    userConfig: AvatarConfig;
    constructor(userConfig: AvatarConfig);
    getAvatarSources(defaultSources: AvatarSource[]): AvatarSource[];
    getAvatarColors(defaultColors: string[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarConfigService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AvatarConfigService>;
}