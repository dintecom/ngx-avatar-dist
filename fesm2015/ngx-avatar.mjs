import * as i0 from '@angular/core';
import { Injectable, InjectionToken, Optional, Inject, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { takeWhile, map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import * as i1 from '@angular/common/http';

/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 */
class AsyncSource {
    constructor(sourceId) {
        this.sourceId = sourceId;
    }
}

var AvatarSource;
(function (AvatarSource) {
    AvatarSource["FACEBOOK"] = "facebook";
    AvatarSource["GOOGLE"] = "google";
    AvatarSource["TWITTER"] = "twitter";
    AvatarSource["INSTAGRAM"] = "instagram";
    AvatarSource["VKONTAKTE"] = "vkontakte";
    AvatarSource["SKYPE"] = "skype";
    AvatarSource["GRAVATAR"] = "gravatar";
    AvatarSource["GITHUB"] = "github";
    AvatarSource["CUSTOM"] = "custom";
    AvatarSource["INITIALS"] = "initials";
    AvatarSource["VALUE"] = "value";
})(AvatarSource || (AvatarSource = {}));

/**
 *  Facebook source implementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
class Facebook {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.FACEBOOK;
    }
    getAvatar(size) {
        return ('https://graph.facebook.com/' +
            `${this.sourceId}/picture?width=${size}&height=${size}`);
    }
}

/**
 *  Twitter source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
class Twitter {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.TWITTER;
    }
    getAvatar(size) {
        const twitterImgSize = this.getImageSize(size);
        return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
    }
    getImageSize(size) {
        if (size <= 24) {
            return 'mini';
        }
        if (size <= 48) {
            return 'normal';
        }
        if (size <= 73) {
            return 'bigger';
        }
        return 'original';
    }
}

/**
 *  Google source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
class Google extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GOOGLE;
    }
    getAvatar() {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }
    /**
     * Extract google avatar from json data
     */
    processResponse(data, size) {
        const avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
        return null;
    }
}

/**
 *  Instagram source impelementation.
 *  Fetch avatar source based on instagram identifier
 */
class Instagram extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.INSTAGRAM;
    }
    getAvatar() {
        return `https://www.instagram.com/${this.sourceId}/?__a=1`;
    }
    /**
     * extract instagram avatar from json data
     */
    processResponse(data, size) {
        return `${data.graphql.user.profile_pic_url_hd}&s=${size}`;
    }
}

/**
 *  Custom source implementation.
 *  return custom image as an avatar
 *
 */
class Custom {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.CUSTOM;
    }
    getAvatar() {
        return this.sourceId;
    }
}

/**
 * Initials source implementation.
 * return the initials of the given value
 */
class Initials {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.INITIALS;
    }
    getAvatar(size) {
        return this.getInitials(this.sourceId, size);
    }
    /**
     * Returns the initial letters of a name in a string.
     */
    getInitials(name, size) {
        name = name.trim();
        if (!name) {
            return '';
        }
        const initials = name.split(/[^{\p{L}}{0-9}]+/u);
        if (size && size < initials.length) {
            return this.constructInitials(initials.slice(0, size));
        }
        else {
            return this.constructInitials(initials);
        }
    }
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     */
    constructInitials(elements) {
        if (!elements || !elements.length) {
            return '';
        }
        return elements
            .filter(element => element && element.length > 0)
            .map(element => element[0].toUpperCase())
            .join('');
    }
}

function isRetina() {
    if (typeof window !== 'undefined' && window !== null) {
        if (window.devicePixelRatio > 1.25) {
            return true;
        }
        const mediaQuery = '(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)';
        if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            return true;
        }
    }
    return false;
}
/**
 *  Gravatar source implementation.
 *  Fetch avatar source based on gravatar email
 */
class Gravatar {
    constructor(value) {
        this.value = value;
        this.sourceType = AvatarSource.GRAVATAR;
        this.sourceId = value.match('^[a-f0-9]{32}$')
            ? value
            : Md5.hashStr(value).toString();
    }
    getAvatar(size) {
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}

/**
 *  Skype source implementation.
 *  Fetch avatar source based on skype identifier
 */
class Skype {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.SKYPE;
    }
    getAvatar() {
        return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
    }
}

/**
 *  Value source implementation.
 *  return the value as avatar
 */
class Value {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.VALUE;
    }
    getAvatar() {
        return this.sourceId;
    }
}

/**
 *  Vkontakte source implementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 */
const apiVersion = 5.8;
class Vkontakte extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.VKONTAKTE;
    }
    getAvatar(size) {
        const imgSize = this.getImageSize(size);
        return `https://api.vk.com/method/users.get?user_id=${this.sourceId}&v=${apiVersion}&fields=${imgSize}`;
    }
    /**
     * extract vkontakte avatar from json data
     */
    processResponse(data) {
        // avatar key property is the size used to generate avatar url
        // size property is always the last key in the response object
        const sizeProperty = Object.keys(data['response'][0]).pop();
        if (!sizeProperty) {
            return null;
        }
        // return avatar src
        return data['response'][0][sizeProperty] || null;
    }
    /**
     * Returns image size related to vkontakte API
     */
    getImageSize(size) {
        if (size <= 50) {
            return 'photo_50';
        }
        if (size <= 100) {
            return 'photo_100';
        }
        if (size <= 200) {
            return 'photo_200';
        }
        return 'photo_max';
    }
}

/**
 *  GitHub source implementation.
 *  Fetch avatar source based on github identifier
 */
class Github extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GITHUB;
    }
    getAvatar() {
        return `https://api.github.com/users/${this.sourceId}`;
    }
    /**
     * extract github avatar from json data
     */
    processResponse(data, size) {
        if (size) {
            return `${data.avatar_url}&s=${size}`;
        }
        return data.avatar_url;
    }
}

/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
class SourceFactory {
    constructor() {
        this.sources = {};
        this.sources[AvatarSource.FACEBOOK] = Facebook;
        this.sources[AvatarSource.TWITTER] = Twitter;
        this.sources[AvatarSource.GOOGLE] = Google;
        this.sources[AvatarSource.INSTAGRAM] = Instagram;
        this.sources[AvatarSource.SKYPE] = Skype;
        this.sources[AvatarSource.GRAVATAR] = Gravatar;
        this.sources[AvatarSource.CUSTOM] = Custom;
        this.sources[AvatarSource.INITIALS] = Initials;
        this.sources[AvatarSource.VALUE] = Value;
        this.sources[AvatarSource.VKONTAKTE] = Vkontakte;
        this.sources[AvatarSource.GITHUB] = Github;
    }
    newInstance(sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    }
}
SourceFactory.ɵfac = function SourceFactory_Factory(t) { return new (t || SourceFactory)(); };
SourceFactory.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SourceFactory, factory: SourceFactory.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SourceFactory, [{
            type: Injectable
        }], function () { return []; }, null);
})();

/**
 * Token used to inject the AvatarConfig object
 */
const AVATAR_CONFIG = new InjectionToken('avatar.config');

class AvatarConfigService {
    constructor(userConfig) {
        this.userConfig = userConfig;
    }
    getAvatarSources(defaultSources) {
        if (this.userConfig &&
            this.userConfig.sourcePriorityOrder &&
            this.userConfig.sourcePriorityOrder.length) {
            const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
            const validSources = uniqueSources.filter(source => defaultSources.includes(source));
            return [
                ...validSources,
                ...defaultSources.filter(source => !validSources.includes(source))
            ];
        }
        return defaultSources;
    }
    getAvatarColors(defaultColors) {
        return ((this.userConfig &&
            this.userConfig.colors &&
            this.userConfig.colors.length &&
            this.userConfig.colors) ||
            defaultColors);
    }
}
AvatarConfigService.ɵfac = function AvatarConfigService_Factory(t) { return new (t || AvatarConfigService)(i0.ɵɵinject(AVATAR_CONFIG, 8)); };
AvatarConfigService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AvatarConfigService, factory: AvatarConfigService.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarConfigService, [{
            type: Injectable
        }], function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [AVATAR_CONFIG]
                    }] }];
    }, null);
})();

/**
 * list of Supported avatar sources
 */
const defaultSources = [
    AvatarSource.FACEBOOK,
    AvatarSource.GOOGLE,
    AvatarSource.TWITTER,
    AvatarSource.INSTAGRAM,
    AvatarSource.VKONTAKTE,
    AvatarSource.SKYPE,
    AvatarSource.GRAVATAR,
    AvatarSource.GITHUB,
    AvatarSource.CUSTOM,
    AvatarSource.INITIALS,
    AvatarSource.VALUE
];
/**
 * list of default colors
 */
const defaultColors = [
    '#1abc9c',
    '#3498db',
    '#f1c40f',
    '#8e44ad',
    '#e74c3c',
    '#d35400',
    '#2c3e50',
    '#7f8c8d'
];
/**
 * Provides utilities methods related to Avatar component
 */
class AvatarService {
    constructor(http, avatarConfigService) {
        this.http = http;
        this.avatarConfigService = avatarConfigService;
        this.avatarSources = defaultSources;
        this.avatarColors = defaultColors;
        this.failedSources = new Map();
        this.overrideAvatarSources();
        this.overrideAvatarColors();
    }
    fetchAvatar(avatarUrl) {
        return this.http.get(avatarUrl);
    }
    getRandomColor(avatarText) {
        if (!avatarText) {
            return 'transparent';
        }
        const asciiCodeSum = this.calculateAsciiCode(avatarText);
        return this.avatarColors[asciiCodeSum % this.avatarColors.length];
    }
    compareSources(sourceType1, sourceType2) {
        return (this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2));
    }
    isSource(source) {
        return this.avatarSources.includes(source);
    }
    isTextAvatar(sourceType) {
        return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
    }
    buildSourceKey(source) {
        return source.sourceType + '-' + source.sourceId;
    }
    sourceHasFailedBefore(source) {
        return this.failedSources.has(this.buildSourceKey(source));
    }
    markSourceAsFailed(source) {
        this.failedSources.set(this.buildSourceKey(source), source);
    }
    overrideAvatarSources() {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    }
    overrideAvatarColors() {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    }
    calculateAsciiCode(value) {
        return value
            .split('')
            .map(letter => letter.charCodeAt(0))
            .reduce((previous, current) => previous + current);
    }
    getSourcePriority(sourceType) {
        return this.avatarSources.indexOf(sourceType);
    }
}
AvatarService.ɵfac = function AvatarService_Factory(t) { return new (t || AvatarService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(AvatarConfigService)); };
AvatarService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AvatarService, factory: AvatarService.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarService, [{
            type: Injectable
        }], function () { return [{ type: i1.HttpClient }, { type: AvatarConfigService }]; }, null);
})();

function AvatarComponent_img_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r4 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "img", 3);
        i0.ɵɵlistener("error", function AvatarComponent_img_1_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.fetchAvatarSource()); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("src", ctx_r0.avatarSrc, i0.ɵɵsanitizeUrl)("width", ctx_r0.size)("height", ctx_r0.size)("ngStyle", ctx_r0.avatarStyle);
    }
}
function AvatarComponent_ng_template_2_div_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 5);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngStyle", ctx_r5.avatarStyle);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx_r5.avatarText, " ");
    }
}
function AvatarComponent_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵtemplate(0, AvatarComponent_ng_template_2_div_0_Template, 2, 2, "div", 4);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("ngIf", ctx_r2.avatarText);
    }
}
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
class AvatarComponent {
    constructor(sourceFactory, avatarService) {
        this.sourceFactory = sourceFactory;
        this.avatarService = avatarService;
        this.round = true;
        this.size = 50;
        this.textSizeRatio = 3;
        this.fgColor = '#FFF';
        this.style = {};
        this.cornerRadius = 0;
        this.initialsSize = 0;
        this.clickOnAvatar = new EventEmitter();
        this.isAlive = true;
        this.avatarSrc = null;
        this.avatarText = null;
        this.avatarStyle = {};
        this.hostStyle = {};
        this.currentIndex = -1;
        this.sources = [];
    }
    onAvatarClicked() {
        this.clickOnAvatar.emit(this.sources[this.currentIndex]);
    }
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     */
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (this.avatarService.isSource(propName)) {
                const sourceType = AvatarSource[propName.toUpperCase()];
                const currentValue = changes[propName].currentValue;
                if (currentValue && typeof currentValue === 'string') {
                    this.addSource(sourceType, currentValue);
                }
                else {
                    this.removeSource(sourceType);
                }
            }
        }
        // reinitialize the avatar component when a source property value has changed
        // the fallback system must be re-invoked with the new values.
        this.initializeAvatar();
    }
    /**
     * Fetch avatar source
     *
     * memberOf AvatarComponent
     */
    fetchAvatarSource() {
        const previousSource = this.sources[this.currentIndex];
        if (previousSource) {
            this.avatarService.markSourceAsFailed(previousSource);
        }
        const source = this.findNextSource();
        if (!source) {
            return;
        }
        if (this.avatarService.isTextAvatar(source.sourceType)) {
            this.buildTextAvatar(source);
            this.avatarSrc = null;
        }
        else {
            this.buildImageAvatar(source);
        }
    }
    findNextSource() {
        while (++this.currentIndex < this.sources.length) {
            const source = this.sources[this.currentIndex];
            if (source && !this.avatarService.sourceHasFailedBefore(source)) {
                return source;
            }
        }
        return null;
    }
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * Initialize the avatar component and its fallback system
     */
    initializeAvatar() {
        this.currentIndex = -1;
        if (this.sources.length > 0) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px'
            };
        }
    }
    sortAvatarSources() {
        this.sources.sort((source1, source2) => this.avatarService.compareSources(source1.sourceType, source2.sourceType));
    }
    buildTextAvatar(avatarSource) {
        this.avatarText = avatarSource.getAvatar(+this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    }
    buildImageAvatar(avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(+this.size);
        }
    }
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     */
    getInitialsStyle(avatarValue) {
        return Object.assign({ textAlign: 'center', borderRadius: this.round ? '100%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', textTransform: 'uppercase', color: this.fgColor, backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue), font: Math.floor(+this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif', lineHeight: this.size + 'px' }, this.style);
    }
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     */
    getImageStyle() {
        return Object.assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size + 'px', height: this.size + 'px' }, this.style);
    }
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    fetchAndProcessAsyncAvatar(source) {
        if (this.avatarService.sourceHasFailedBefore(source)) {
            return;
        }
        this.avatarService
            .fetchAvatar(source.getAvatar(+this.size))
            .pipe(takeWhile(() => this.isAlive), map(response => source.processResponse(response, +this.size)))
            .subscribe(avatarSrc => (this.avatarSrc = avatarSrc), err => {
            this.fetchAvatarSource();
        });
    }
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     */
    addSource(sourceType, sourceValue) {
        const source = this.sources.find(s => s.sourceType === sourceType);
        if (source) {
            source.sourceId = sourceValue;
        }
        else {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
    }
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     */
    removeSource(sourceType) {
        this.sources = this.sources.filter(source => source.sourceType !== sourceType);
    }
}
AvatarComponent.ɵfac = function AvatarComponent_Factory(t) { return new (t || AvatarComponent)(i0.ɵɵdirectiveInject(SourceFactory), i0.ɵɵdirectiveInject(AvatarService)); };
AvatarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AvatarComponent, selectors: [["ngx-avatar"]], inputs: { round: "round", size: "size", textSizeRatio: "textSizeRatio", bgColor: "bgColor", fgColor: "fgColor", borderColor: "borderColor", style: "style", cornerRadius: "cornerRadius", facebook: ["facebookId", "facebook"], twitter: ["twitterId", "twitter"], google: ["googleId", "google"], instagram: ["instagramId", "instagram"], vkontakte: ["vkontakteId", "vkontakte"], skype: ["skypeId", "skype"], gravatar: ["gravatarId", "gravatar"], github: ["githubId", "github"], custom: ["src", "custom"], initials: ["name", "initials"], value: "value", placeholder: "placeholder", initialsSize: "initialsSize" }, outputs: { clickOnAvatar: "clickOnAvatar" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 3, consts: [[1, "avatar-container", 3, "ngStyle", "click"], ["class", "avatar-content", "loading", "lazy", 3, "src", "width", "height", "ngStyle", "error", 4, "ngIf", "ngIfElse"], ["textAvatar", ""], ["loading", "lazy", 1, "avatar-content", 3, "src", "width", "height", "ngStyle", "error"], ["class", "avatar-content", 3, "ngStyle", 4, "ngIf"], [1, "avatar-content", 3, "ngStyle"]], template: function AvatarComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("click", function AvatarComponent_Template_div_click_0_listener() { return ctx.onAvatarClicked(); });
            i0.ɵɵtemplate(1, AvatarComponent_img_1_Template, 1, 4, "img", 1);
            i0.ɵɵtemplate(2, AvatarComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            const _r1 = i0.ɵɵreference(3);
            i0.ɵɵproperty("ngStyle", ctx.hostStyle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.avatarSrc)("ngIfElse", _r1);
        }
    }, dependencies: [i3.NgIf, i3.NgStyle], styles: ["[_nghost-%COMP%]{border-radius:50%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarComponent, [{
            type: Component,
            args: [{ selector: 'ngx-avatar', template: `
    <div
      (click)="onAvatarClicked()"
      class="avatar-container"
      [ngStyle]="hostStyle"
    >
      <img
        *ngIf="avatarSrc; else textAvatar"
        [src]="avatarSrc"
        [width]="size"
        [height]="size"
        [ngStyle]="avatarStyle"
        (error)="fetchAvatarSource()"
        class="avatar-content"
        loading="lazy"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `, styles: [":host{border-radius:50%}\n"] }]
        }], function () { return [{ type: SourceFactory }, { type: AvatarService }]; }, { round: [{
                type: Input
            }], size: [{
                type: Input
            }], textSizeRatio: [{
                type: Input
            }], bgColor: [{
                type: Input
            }], fgColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], style: [{
                type: Input
            }], cornerRadius: [{
                type: Input
            }], facebook: [{
                type: Input,
                args: ['facebookId']
            }], twitter: [{
                type: Input,
                args: ['twitterId']
            }], google: [{
                type: Input,
                args: ['googleId']
            }], instagram: [{
                type: Input,
                args: ['instagramId']
            }], vkontakte: [{
                type: Input,
                args: ['vkontakteId']
            }], skype: [{
                type: Input,
                args: ['skypeId']
            }], gravatar: [{
                type: Input,
                args: ['gravatarId']
            }], github: [{
                type: Input,
                args: ['githubId']
            }], custom: [{
                type: Input,
                args: ['src']
            }], initials: [{
                type: Input,
                args: ['name']
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], initialsSize: [{
                type: Input
            }], clickOnAvatar: [{
                type: Output
            }] });
})();

class AvatarModule {
    static forRoot(avatarConfig) {
        return {
            ngModule: AvatarModule,
            providers: [
                { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
            ]
        };
    }
}
AvatarModule.ɵfac = function AvatarModule_Factory(t) { return new (t || AvatarModule)(); };
AvatarModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AvatarModule });
AvatarModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [SourceFactory, AvatarService, AvatarConfigService], imports: [CommonModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarModule, [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [AvatarComponent],
                    providers: [SourceFactory, AvatarService, AvatarConfigService],
                    exports: [AvatarComponent]
                }]
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AvatarModule, { declarations: [AvatarComponent], imports: [CommonModule], exports: [AvatarComponent] }); })();

/*
 * Public API Surface of ngx-avatar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarComponent, AvatarModule, AvatarService, AvatarSource, defaultColors, defaultSources };
//# sourceMappingURL=ngx-avatar.mjs.map
