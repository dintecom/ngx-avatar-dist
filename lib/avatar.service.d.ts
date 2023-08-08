import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvatarConfigService } from './avatar-config.service';
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
 * Provides utilities methods related to Avatar component
 */
export declare class AvatarService {
    private http;
    private avatarConfigService;
    avatarSources: AvatarSource[];
    avatarColors: string[];
    private readonly failedSources;
    constructor(http: HttpClient, avatarConfigService: AvatarConfigService);
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
    private calculateAsciiCode;
    private getSourcePriority;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AvatarService>;
}