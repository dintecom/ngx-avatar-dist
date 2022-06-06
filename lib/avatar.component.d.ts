import { EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Source } from './sources/source';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import * as i0 from "@angular/core";
declare type Style = Partial<CSSStyleDeclaration>;
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
export declare class AvatarComponent implements OnChanges, OnDestroy {
    sourceFactory: SourceFactory;
    private avatarService;
    round: boolean;
    size: string | number;
    textSizeRatio: number;
    bgColor: string | undefined;
    fgColor: string;
    borderColor: string | undefined;
    style: Style;
    cornerRadius: string | number;
    facebook?: string | null;
    twitter?: string | null;
    google?: string | null;
    instagram?: string | null;
    vkontakte?: string | null;
    skype?: string | null;
    gravatar?: string | null;
    github?: string | null;
    custom?: string | null;
    initials?: string | null;
    value?: string | null;
    placeholder?: string;
    initialsSize: string | number;
    clickOnAvatar: EventEmitter<Source>;
    isAlive: boolean;
    avatarSrc: string | null;
    avatarText: string | null;
    avatarStyle: Style;
    hostStyle: Style;
    private currentIndex;
    private sources;
    constructor(sourceFactory: SourceFactory, avatarService: AvatarService);
    onAvatarClicked(): void;
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Fetch avatar source
     *
     * memberOf AvatarComponent
     */
    fetchAvatarSource(): void;
    private findNextSource;
    ngOnDestroy(): void;
    /**
     * Initialize the avatar component and its fallback system
     */
    private initializeAvatar;
    private sortAvatarSources;
    private buildTextAvatar;
    private buildImageAvatar;
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     */
    private getInitialsStyle;
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     */
    private getImageStyle;
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    private fetchAndProcessAsyncAvatar;
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     */
    private addSource;
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     */
    private removeSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarComponent, "ngx-avatar", never, { "round": "round"; "size": "size"; "textSizeRatio": "textSizeRatio"; "bgColor": "bgColor"; "fgColor": "fgColor"; "borderColor": "borderColor"; "style": "style"; "cornerRadius": "cornerRadius"; "facebook": "facebookId"; "twitter": "twitterId"; "google": "googleId"; "instagram": "instagramId"; "vkontakte": "vkontakteId"; "skype": "skypeId"; "gravatar": "gravatarId"; "github": "githubId"; "custom": "src"; "initials": "name"; "value": "value"; "placeholder": "placeholder"; "initialsSize": "initialsSize"; }, { "clickOnAvatar": "clickOnAvatar"; }, never, never, false>;
}
export {};
