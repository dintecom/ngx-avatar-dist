import { NgxAvatarConfig } from './ngx-avatar-config';
import { AvatarSource } from './sources/avatar-source.enum';
import * as i0 from "@angular/core";
export declare class NgxAvatarConfigService {
    userConfig: NgxAvatarConfig;
    constructor(userConfig: NgxAvatarConfig);
    getAvatarSources(defaultSources: AvatarSource[]): AvatarSource[];
    getAvatarColors(defaultColors: string[]): string[];
    getCacheLifetime(defaultLifetime: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxAvatarConfigService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxAvatarConfigService>;
}
