import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxAvatarConfigService } from './ngx-avatar-config.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { Source } from './sources/source';
import * as i0 from "@angular/core";
/**
 * list of Supported avatar sources
 */
export declare const defaultSources: AvatarSource[];
/**
 * list of default colors
 */
export declare const defaultColors: string[];
/**
 * Default request cache lifetime
 */
export declare const defaultCacheLifetimeSecond: number;
/**
 * Provides utilities methods related to Avatar component
 */
export declare class NgxAvatarService {
    private http;
    private avatarConfigService;
    avatarSources: AvatarSource[];
    avatarColors: string[];
    cacheLifetimeSecond: number;
    private readonly failedSources;
    private readonly cache;
    private readonly requestCache;
    constructor(http: HttpClient, avatarConfigService: NgxAvatarConfigService);
    fetchAvatar(avatarUrl: string): Observable<unknown>;
    getRandomColor(avatarText: string): string;
    compareSources(sourceType1: AvatarSource, sourceType2: AvatarSource): number;
    isSource(source: string): boolean;
    isTextAvatar(sourceType: AvatarSource): boolean;
    private buildSourceKey;
    sourceHasFailedBefore(source: Source): boolean;
    markSourceAsFailed(source: Source): void;
    private overrideAvatarSources;
    private overrideAvatarColors;
    private overrideCacheLifetime;
    private calculateAsciiCode;
    private getSourcePriority;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxAvatarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxAvatarService>;
}
