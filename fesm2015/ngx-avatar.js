import { CommonModule } from '@angular/common';
import isRetina from 'is-retina';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, InjectionToken, Inject, Optional, Component, Input, Output, EventEmitter, ElementRef, NgModule } from '@angular/core';
import { takeWhile, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
class AsyncSource {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
const AvatarSource = {
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    TWITTER: 'twitter',
    VKONTAKTE: 'vkontakte',
    SKYPE: 'skype',
    GRAVATAR: 'gravatar',
    GITHUB: 'github',
    CUSTOM: 'custom',
    INITIALS: 'initials',
    VALUE: 'value',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
class Facebook {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.FACEBOOK;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        return ('https://graph.facebook.com/' +
            `${this.sourceId}/picture?width=${size}&height=${size}`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
class Twitter {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.TWITTER;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        /** @type {?} */
        const twitterImgSize = this.getImageSize(size);
        return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
    }
    /**
     * @param {?} size
     * @return {?}
     */
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
class Google extends AsyncSource {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GOOGLE;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }
    /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    processResponse(data, size) {
        /** @type {?} */
        const avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
class Custom {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.CUSTOM;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return this.sourceId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Initials source impelementation.
 * return the initals of the given value
 */
class Initials {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.INITIALS;
    }
    /**
     * @param {?} initialsSize
     * @return {?}
     */
    getAvatar(initialsSize) {
        return this.getInitials(this.sourceId, initialsSize);
    }
    /**
     * Returns the initial letters of a name in a string.
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    getInitials(name, size) {
        name = name ? name.trim() : null;
        if (!name) {
            return '';
        }
        /** @type {?} */
        const initials = name.split(' ');
        if (size && size < initials.length) {
            return this.constructInitials(initials.slice(0, size));
        }
        else {
            return this.constructInitials(initials);
        }
    }
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @param {?} elements
     * @return {?}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
class Gravatar {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
        this.sourceType = AvatarSource.GRAVATAR;
        this.sourceId = value.match('^[a-f0-9]{32}$')
            ? value
            : Md5.hashStr(value).toString();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        /** @type {?} */
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Skype source impelementation.
 *  Fetch avatar source based on skype identifier
 */
class Skype {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.SKYPE;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Value source impelementation.
 *  return the value as avatar
 */
class Value {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.VALUE;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return this.sourceId;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Vkontakte source impelementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 * @type {?}
 */
const apiVersion = 5.8;
class Vkontakte extends AsyncSource {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.VKONTAKTE;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        /** @type {?} */
        const imgSize = this.getImageSize(size);
        return `https://api.vk.com/method/users.get?user_id=${this.sourceId}&v=${apiVersion}&fields=${imgSize}`;
    }
    /**
     * extract vkontakte avatar from json data
     * @param {?} data
     * @return {?}
     */
    processResponse(data) {
        // avatar key property is the size used to generate avatar url
        // size property is always the last key in the response object
        /** @type {?} */
        const sizeProperty = Object.keys(data['response'][0]).pop();
        // return avatar src
        return data['response'][0][sizeProperty];
    }
    /**
     * Returns image size related to vkontakte API
     * @param {?} size
     * @return {?}
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 */
class Github extends AsyncSource {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GITHUB;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return `https://api.github.com/users/${this.sourceId}`;
    }
    /**
     * extract github avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    processResponse(data, size) {
        if (size) {
            return `${data.avatar_url}&s=${size}`;
        }
        return data.avatar_url;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
        this.sources[AvatarSource.SKYPE] = Skype;
        this.sources[AvatarSource.GRAVATAR] = Gravatar;
        this.sources[AvatarSource.CUSTOM] = Custom;
        this.sources[AvatarSource.INITIALS] = Initials;
        this.sources[AvatarSource.VALUE] = Value;
        this.sources[AvatarSource.VKONTAKTE] = Vkontakte;
        this.sources[AvatarSource.GITHUB] = Github;
    }
    /**
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    newInstance(sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    }
}
SourceFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SourceFactory.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Token used to inject the AvatarConfig object
 * @type {?}
 */
const AVATAR_CONFIG = new InjectionToken('avatar.config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class AvatarConfigService {
    /**
     * @param {?} userConfig
     */
    constructor(userConfig) {
        this.userConfig = userConfig;
    }
    /**
     * @param {?} defaultSources
     * @return {?}
     */
    getAvatarSources(defaultSources) {
        if (this.userConfig &&
            this.userConfig.sourcePriorityOrder &&
            this.userConfig.sourcePriorityOrder.length) {
            /** @type {?} */
            const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
            /** @type {?} */
            const validSources = uniqueSources.filter(source => defaultSources.includes(source));
            return [
                ...validSources,
                ...defaultSources.filter(source => !validSources.includes(source))
            ];
        }
        return defaultSources;
    }
    /**
     * @param {?} defaultColors
     * @return {?}
     */
    getAvatarColors(defaultColors) {
        return ((this.userConfig &&
            this.userConfig.colors &&
            this.userConfig.colors.length &&
            this.userConfig.colors) ||
            defaultColors);
    }
}
AvatarConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AvatarConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AVATAR_CONFIG,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * list of Supported avatar sources
 * @type {?}
 */
const defaultSources = [
    AvatarSource.FACEBOOK,
    AvatarSource.GOOGLE,
    AvatarSource.TWITTER,
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
 * @type {?}
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
    /**
     * @param {?} http
     * @param {?} avatarConfigService
     */
    constructor(http, avatarConfigService) {
        this.http = http;
        this.avatarConfigService = avatarConfigService;
        this.avatarSources = defaultSources;
        this.avatarColors = defaultColors;
        this.overrideAvatarSources();
        this.overrideAvatarColors();
    }
    /**
     * @param {?} avatarUrl
     * @return {?}
     */
    fetchAvatar(avatarUrl) {
        return this.http.get(avatarUrl);
    }
    /**
     * @param {?} avatarText
     * @return {?}
     */
    getRandomColor(avatarText) {
        if (!avatarText) {
            return 'transparent';
        }
        /** @type {?} */
        const asciiCodeSum = this.calculateAsciiCode(avatarText);
        return this.avatarColors[asciiCodeSum % this.avatarColors.length];
    }
    /**
     * @param {?} sourceType1
     * @param {?} sourceType2
     * @return {?}
     */
    copmareSources(sourceType1, sourceType2) {
        return (this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2));
    }
    /**
     * @param {?} source
     * @return {?}
     */
    isSource(source) {
        return this.avatarSources.includes((/** @type {?} */ (source)));
    }
    /**
     * @param {?} sourceType
     * @return {?}
     */
    isTextAvatar(sourceType) {
        return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
    }
    /**
     * @return {?}
     */
    overrideAvatarSources() {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    }
    /**
     * @return {?}
     */
    overrideAvatarColors() {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    calculateAsciiCode(value) {
        return value
            .split('')
            .map(letter => letter.charCodeAt(0))
            .reduce((previous, current) => previous + current);
    }
    /**
     * @param {?} sourceType
     * @return {?}
     */
    getSourcePriority(sourceType) {
        return this.avatarSources.indexOf(sourceType);
    }
}
AvatarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AvatarService.ctorParameters = () => [
    { type: HttpClient },
    { type: AvatarConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
class AvatarComponent {
    /**
     * @param {?} elementRef
     * @param {?} sourceFactory
     * @param {?} avatarService
     */
    constructor(elementRef, sourceFactory, avatarService) {
        this.elementRef = elementRef;
        this.sourceFactory = sourceFactory;
        this.avatarService = avatarService;
        this.round = true;
        this.size = 50;
        this.textSizeRatio = 3;
        this.fgColor = '#FFF';
        this.style = {};
        this.cornerRadius = 0;
        this.clickOnAvatar = new EventEmitter();
        this.isAlive = true;
        this.avatarStyle = {};
        this.hostStyle = {};
        this.currentSource = 0;
        this.sources = Array();
    }
    /**
     * @return {?}
     */
    onAvatarClicked() {
        this.clickOnAvatar.emit(this.sources[this.currentSource - 1]);
    }
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (this.avatarService.isSource(propName)) {
                if (changes[propName].currentValue) {
                    /** @type {?} */
                    const currentValue = changes[propName].currentValue;
                    this.addSource(AvatarSource[propName.toUpperCase()], currentValue);
                }
                else {
                    this.removeSource(AvatarSource[propName.toUpperCase()]);
                }
            }
        }
        // reintialize the avatar component when a source property value has changed
        // the fallback system must be re-invoked with the new values.
        this.initializeAvatar();
    }
    /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    fetchAvatarSource(event) {
        /** @type {?} */
        const avatarSource = this.sources[this.currentSource];
        if (!avatarSource) {
            return;
        }
        if (this.avatarService.isTextAvatar(avatarSource.sourceType)) {
            this.buildTextAvatar(avatarSource);
            // TODO: check if this is needed
            this.avatarSrc = undefined;
        }
        else {
            this.buildImageAvatar(avatarSource);
        }
        this.currentSource++;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * Initialize the avatar component and its fallback system
     * @return {?}
     */
    initializeAvatar() {
        this.currentSource = 0;
        if (this.sources.length > 0 && this.sources[this.currentSource]) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px'
            };
        }
    }
    /**
     * @return {?}
     */
    sortAvatarSources() {
        this.sources.sort((source1, source2) => this.avatarService.copmareSources(source1.sourceType, source2.sourceType));
    }
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    buildTextAvatar(avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    }
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    buildImageAvatar(avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(this.size);
        }
    }
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @param {?} avatarValue
     * @return {?}
     */
    getInitialsStyle(avatarValue) {
        return Object.assign({ textAlign: 'center', borderRadius: this.round ? '100%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', textTransform: 'uppercase', color: this.fgColor, backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue), font: Math.floor(this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif', lineHeight: this.size + 'px' }, this.style);
    }
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @return {?}
     */
    getImageStyle() {
        return Object.assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size, height: this.size }, this.style);
    }
    /**
     * Fetch avatar image asynchrounsly.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @param {?} source
     * @return {?}
     */
    fetchAndProcessAsyncAvatar(source) {
        this.avatarService
            .fetchAvatar(source.getAvatar())
            .pipe(takeWhile(() => this.isAlive), map(response => source.processResponse(response, this.size)))
            .subscribe(avatarSrc => (this.avatarSrc = avatarSrc), err => {
            console.error(`ngx-avatar: error while fetching ${source.sourceType} avatar `);
        });
    }
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    addSource(sourceType, sourceValue) {
        if (!this.isSourceExist(sourceType)) {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
        else {
            /** @type {?} */
            const index = this.sources.findIndex(source => source.sourceType === sourceType);
            this.sources[index].sourceId = sourceValue;
        }
    }
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @param {?} sourceType
     * @return {?}
     */
    removeSource(sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            const index = this.sources.findIndex(source => source.sourceType === sourceType);
            this.sources.splice(index, 1);
        }
    }
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    isSourceExist(avatarSource) {
        return this.sources.map(source => source.sourceType).includes(avatarSource);
    }
}
AvatarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'ngx-avatar',
                template: `
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
        (error)="fetchAvatarSource($event)"
        class="avatar-content"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `,
                styles: [`
      :host {
        border-radius: '50%';
      }
    `]
            }] }
];
/** @nocollapse */
AvatarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: SourceFactory },
    { type: AvatarService }
];
AvatarComponent.propDecorators = {
    round: [{ type: Input }],
    size: [{ type: Input }],
    textSizeRatio: [{ type: Input }],
    bgColor: [{ type: Input }],
    fgColor: [{ type: Input }],
    borderColor: [{ type: Input }],
    style: [{ type: Input }],
    cornerRadius: [{ type: Input }],
    facebook: [{ type: Input, args: ['facebookId',] }],
    twitter: [{ type: Input, args: ['twitterId',] }],
    google: [{ type: Input, args: ['googleId',] }],
    vkontakte: [{ type: Input, args: ['vkontakteId',] }],
    skype: [{ type: Input, args: ['skypeId',] }],
    gravatar: [{ type: Input, args: ['gravatarId',] }],
    github: [{ type: Input, args: ['githubId',] }],
    custom: [{ type: Input, args: ['src',] }],
    initials: [{ type: Input, args: ['name',] }],
    value: [{ type: Input, args: ['value',] }],
    placeholder: [{ type: Input, args: ['placeholder',] }],
    initialsSize: [{ type: Input, args: ['initialsSize',] }],
    clickOnAvatar: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class AvatarModule {
    /**
     * @param {?=} avatarConfig
     * @return {?}
     */
    static forRoot(avatarConfig) {
        return {
            ngModule: AvatarModule,
            providers: [
                { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
            ]
        };
    }
}
AvatarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule],
                declarations: [AvatarComponent],
                providers: [SourceFactory, AvatarService, AvatarConfigService],
                exports: [AvatarComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { AvatarModule, defaultSources, defaultColors, AvatarService, AvatarSource, AvatarConfigService as ɵc, AVATAR_CONFIG as ɵd, AvatarComponent as ɵa, SourceFactory as ɵb };

//# sourceMappingURL=ngx-avatar.js.map