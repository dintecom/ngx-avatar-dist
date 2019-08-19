import { Injectable, InjectionToken, Optional, Inject, Component, ElementRef, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __extends, __spread, __assign } from 'tslib';
import isRetina from 'is-retina';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { tap, catchError, finalize, share, takeWhile, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
var /**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
AsyncSource = /** @class */ (function () {
    function AsyncSource(sourceId) {
        this.sourceId = sourceId;
    }
    return AsyncSource;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var AvatarSource = {
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
var /**
 *  Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
Facebook = /** @class */ (function () {
    function Facebook(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.FACEBOOK;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    Facebook.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return ('https://graph.facebook.com/' +
            (this.sourceId + "/picture?width=" + size + "&height=" + size));
    };
    return Facebook;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
var /**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
Twitter = /** @class */ (function () {
    function Twitter(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.TWITTER;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    Twitter.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var twitterImgSize = this.getImageSize(size);
        return "https://twitter.com/" + this.sourceId + "/profile_image?size=" + twitterImgSize;
    };
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    Twitter.prototype.getImageSize = /**
     * @private
     * @param {?} size
     * @return {?}
     */
    function (size) {
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
    };
    return Twitter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
var /**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
Google = /** @class */ (function (_super) {
    __extends(Google, _super);
    function Google(sourceId) {
        var _this = _super.call(this, sourceId) || this;
        _this.sourceType = AvatarSource.GOOGLE;
        return _this;
    }
    /**
     * @return {?}
     */
    Google.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return "https://picasaweb.google.com/data/entry/api/user/" + this.sourceId + "?alt=json";
    };
    /**
     * Extract google avatar from json data
     */
    /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    Google.prototype.processResponse = /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    function (data, size) {
        /** @type {?} */
        var avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
    };
    return Google;
}(AsyncSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
var /**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
Custom = /** @class */ (function () {
    function Custom(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.CUSTOM;
    }
    /**
     * @return {?}
     */
    Custom.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return this.sourceId;
    };
    return Custom;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Initials source impelementation.
 * return the initals of the given value
 */
var /**
 * Initials source impelementation.
 * return the initals of the given value
 */
Initials = /** @class */ (function () {
    function Initials(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.INITIALS;
    }
    /**
     * @param {?} initialsSize
     * @return {?}
     */
    Initials.prototype.getAvatar = /**
     * @param {?} initialsSize
     * @return {?}
     */
    function (initialsSize) {
        return this.getInitials(this.sourceId, initialsSize);
    };
    /**
     * Returns the initial letters of a name in a string.
     */
    /**
     * Returns the initial letters of a name in a string.
     * @private
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    Initials.prototype.getInitials = /**
     * Returns the initial letters of a name in a string.
     * @private
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    function (name, size) {
        name = name ? name.trim() : null;
        if (!name) {
            return '';
        }
        /** @type {?} */
        var initials = name.split(' ');
        if (size && size < initials.length) {
            return this.constructInitials(initials.slice(0, size));
        }
        else {
            return this.constructInitials(initials);
        }
    };
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     */
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @private
     * @param {?} elements
     * @return {?}
     */
    Initials.prototype.constructInitials = /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @private
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        if (!elements || !elements.length) {
            return '';
        }
        return elements
            .filter((/**
         * @param {?} element
         * @return {?}
         */
        function (element) { return element && element.length > 0; }))
            .map((/**
         * @param {?} element
         * @return {?}
         */
        function (element) { return element[0].toUpperCase(); }))
            .join('');
    };
    return Initials;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
var /**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
Gravatar = /** @class */ (function () {
    function Gravatar(value) {
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
    Gravatar.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var avatarSize = isRetina() ? size * 2 : size;
        return "https://secure.gravatar.com/avatar/" + this.sourceId + "?s=" + avatarSize + "&d=404";
    };
    return Gravatar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Skype source impelementation.
 *  Fetch avatar source based on skype identifier
 */
var /**
 *  Skype source impelementation.
 *  Fetch avatar source based on skype identifier
 */
Skype = /** @class */ (function () {
    function Skype(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.SKYPE;
    }
    /**
     * @return {?}
     */
    Skype.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return "https://api.skype.com/users/" + this.sourceId + "/profile/avatar";
    };
    return Skype;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Value source impelementation.
 *  return the value as avatar
 */
var /**
 *  Value source impelementation.
 *  return the value as avatar
 */
Value = /** @class */ (function () {
    function Value(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.VALUE;
    }
    /**
     * @return {?}
     */
    Value.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return this.sourceId;
    };
    return Value;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Vkontakte source impelementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 * @type {?}
 */
var apiVersion = 5.8;
var Vkontakte = /** @class */ (function (_super) {
    __extends(Vkontakte, _super);
    function Vkontakte(sourceId) {
        var _this = _super.call(this, sourceId) || this;
        _this.sourceType = AvatarSource.VKONTAKTE;
        return _this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    Vkontakte.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var imgSize = this.getImageSize(size);
        return "https://api.vk.com/method/users.get?user_id=" + this.sourceId + "&v=" + apiVersion + "&fields=" + imgSize;
    };
    /**
     * extract vkontakte avatar from json data
     */
    /**
     * extract vkontakte avatar from json data
     * @param {?} data
     * @return {?}
     */
    Vkontakte.prototype.processResponse = /**
     * extract vkontakte avatar from json data
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // avatar key property is the size used to generate avatar url
        // size property is always the last key in the response object
        /** @type {?} */
        var sizeProperty = Object.keys(data['response'][0]).pop();
        // return avatar src
        return data['response'][0][sizeProperty];
    };
    /**
     * Returns image size related to vkontakte API
     */
    /**
     * Returns image size related to vkontakte API
     * @private
     * @param {?} size
     * @return {?}
     */
    Vkontakte.prototype.getImageSize = /**
     * Returns image size related to vkontakte API
     * @private
     * @param {?} size
     * @return {?}
     */
    function (size) {
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
    };
    return Vkontakte;
}(AsyncSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 */
var /**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 */
Github = /** @class */ (function (_super) {
    __extends(Github, _super);
    function Github(sourceId) {
        var _this = _super.call(this, sourceId) || this;
        _this.sourceType = AvatarSource.GITHUB;
        return _this;
    }
    /**
     * @return {?}
     */
    Github.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return "https://api.github.com/users/" + this.sourceId;
    };
    /**
     * extract github avatar from json data
     */
    /**
     * extract github avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    Github.prototype.processResponse = /**
     * extract github avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    function (data, size) {
        if (size) {
            return data.avatar_url + "&s=" + size;
        }
        return data.avatar_url;
    };
    return Github;
}(AsyncSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
var SourceFactory = /** @class */ (function () {
    function SourceFactory() {
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
    SourceFactory.prototype.newInstance = /**
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    function (sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    };
    SourceFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SourceFactory.ctorParameters = function () { return []; };
    return SourceFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Token used to inject the AvatarConfig object
 * @type {?}
 */
var AVATAR_CONFIG = new InjectionToken('avatar.config');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvatarConfigService = /** @class */ (function () {
    function AvatarConfigService(userConfig) {
        this.userConfig = userConfig;
    }
    /**
     * @param {?} defaultSources
     * @return {?}
     */
    AvatarConfigService.prototype.getAvatarSources = /**
     * @param {?} defaultSources
     * @return {?}
     */
    function (defaultSources) {
        if (this.userConfig &&
            this.userConfig.sourcePriorityOrder &&
            this.userConfig.sourcePriorityOrder.length) {
            /** @type {?} */
            var uniqueSources = __spread(new Set(this.userConfig.sourcePriorityOrder));
            /** @type {?} */
            var validSources_1 = uniqueSources.filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) {
                return defaultSources.includes(source);
            }));
            return __spread(validSources_1, defaultSources.filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return !validSources_1.includes(source); })));
        }
        return defaultSources;
    };
    /**
     * @param {?} defaultColors
     * @return {?}
     */
    AvatarConfigService.prototype.getAvatarColors = /**
     * @param {?} defaultColors
     * @return {?}
     */
    function (defaultColors) {
        return ((this.userConfig &&
            this.userConfig.colors &&
            this.userConfig.colors.length &&
            this.userConfig.colors) ||
            defaultColors);
    };
    /**
     * @param {?} defaultLifetime
     * @return {?}
     */
    AvatarConfigService.prototype.getCacheLifetime = /**
     * @param {?} defaultLifetime
     * @return {?}
     */
    function (defaultLifetime) {
        return ((this.userConfig &&
            isFinite(this.userConfig.cacheLifetimeSecond) &&
            this.userConfig.cacheLifetimeSecond) ||
            defaultLifetime);
    };
    AvatarConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AvatarConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AVATAR_CONFIG,] }] }
    ]; };
    return AvatarConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * list of Supported avatar sources
 * @type {?}
 */
var defaultSources = [
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
var defaultColors = [
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
 * Default request cache lifetime
 * @type {?}
 */
var defaultCacheLifetimeSecond = 30 * 60;
/**
 * Provides utilities methods related to Avatar component
 */
var AvatarService = /** @class */ (function () {
    function AvatarService(http, avatarConfigService) {
        this.http = http;
        this.avatarConfigService = avatarConfigService;
        this.avatarSources = defaultSources;
        this.avatarColors = defaultColors;
        this.cacheLifetimeSecond = defaultCacheLifetimeSecond;
        this.cache = {};
        this.requestCache = {};
        this.overrideAvatarSources();
        this.overrideAvatarColors();
        this.overrideCacheLifetime();
    }
    /**
     * @param {?} avatarUrl
     * @return {?}
     */
    AvatarService.prototype.fetchAvatar = /**
     * @param {?} avatarUrl
     * @return {?}
     */
    function (avatarUrl) {
        var _this = this;
        if (this.cache[avatarUrl]) {
            return this.cache[avatarUrl].error
                ? throwError(this.cache[avatarUrl].error)
                : of(this.cache[avatarUrl].avatar);
        }
        if (this.requestCache[avatarUrl])
            return this.requestCache[avatarUrl];
        this.requestCache[avatarUrl] = this.http
            .get(avatarUrl)
            .pipe(tap((/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            delete _this.requestCache[avatarUrl];
            _this.cache[avatarUrl] = {
                avatar: a,
            };
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            delete _this.requestCache[avatarUrl];
            _this.cache[avatarUrl] = {
                error: e,
            };
            return throwError(e);
        })), finalize((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () { return delete _this.cache[avatarUrl]; }), _this.cacheLifetimeSecond * 1000);
        })), share());
        return this.requestCache[avatarUrl];
    };
    /**
     * @param {?} avatarText
     * @return {?}
     */
    AvatarService.prototype.getRandomColor = /**
     * @param {?} avatarText
     * @return {?}
     */
    function (avatarText) {
        if (!avatarText) {
            return 'transparent';
        }
        /** @type {?} */
        var asciiCodeSum = this.calculateAsciiCode(avatarText);
        return this.avatarColors[asciiCodeSum % this.avatarColors.length];
    };
    /**
     * @param {?} sourceType1
     * @param {?} sourceType2
     * @return {?}
     */
    AvatarService.prototype.copmareSources = /**
     * @param {?} sourceType1
     * @param {?} sourceType2
     * @return {?}
     */
    function (sourceType1, sourceType2) {
        return (this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2));
    };
    /**
     * @param {?} source
     * @return {?}
     */
    AvatarService.prototype.isSource = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return this.avatarSources.includes((/** @type {?} */ (source)));
    };
    /**
     * @param {?} sourceType
     * @return {?}
     */
    AvatarService.prototype.isTextAvatar = /**
     * @param {?} sourceType
     * @return {?}
     */
    function (sourceType) {
        return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
    };
    /**
     * @private
     * @return {?}
     */
    AvatarService.prototype.overrideAvatarSources = /**
     * @private
     * @return {?}
     */
    function () {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    };
    /**
     * @private
     * @return {?}
     */
    AvatarService.prototype.overrideAvatarColors = /**
     * @private
     * @return {?}
     */
    function () {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    };
    /**
     * @private
     * @return {?}
     */
    AvatarService.prototype.overrideCacheLifetime = /**
     * @private
     * @return {?}
     */
    function () {
        this.cacheLifetimeSecond = this.avatarConfigService.getCacheLifetime(defaultCacheLifetimeSecond);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    AvatarService.prototype.calculateAsciiCode = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value
            .split('')
            .map((/**
         * @param {?} letter
         * @return {?}
         */
        function (letter) { return letter.charCodeAt(0); }))
            .reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        function (previous, current) { return previous + current; }));
    };
    /**
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    AvatarService.prototype.getSourcePriority = /**
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    function (sourceType) {
        return this.avatarSources.indexOf(sourceType);
    };
    AvatarService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AvatarService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AvatarConfigService }
    ]; };
    return AvatarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(elementRef, sourceFactory, avatarService) {
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
    AvatarComponent.prototype.onAvatarClicked = /**
     * @return {?}
     */
    function () {
        this.clickOnAvatar.emit(this.sources[this.currentSource - 1]);
    };
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     */
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    AvatarComponent.prototype.ngOnChanges = /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        for (var propName in changes) {
            if (this.avatarService.isSource(propName)) {
                /** @type {?} */
                var sourceType = AvatarSource[propName.toUpperCase()];
                if (changes[propName].currentValue) {
                    /** @type {?} */
                    var currentValue = changes[propName].currentValue;
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
    };
    /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     */
    /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    AvatarComponent.prototype.fetchAvatarSource = /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var avatarSource = this.sources[this.currentSource];
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
    };
    /**
     * @return {?}
     */
    AvatarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /**
     * Initialize the avatar component and its fallback system
     */
    /**
     * Initialize the avatar component and its fallback system
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.initializeAvatar = /**
     * Initialize the avatar component and its fallback system
     * @private
     * @return {?}
     */
    function () {
        this.currentSource = 0;
        if (this.sources.length > 0 && this.sources[this.currentSource]) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px'
            };
        }
    };
    /**
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.sortAvatarSources = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.sources.sort((/**
         * @param {?} source1
         * @param {?} source2
         * @return {?}
         */
        function (source1, source2) {
            return _this.avatarService.copmareSources(source1.sourceType, source2.sourceType);
        }));
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildTextAvatar = /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildImageAvatar = /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(this.size);
        }
    };
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     */
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @private
     * @param {?} avatarValue
     * @return {?}
     */
    AvatarComponent.prototype.getInitialsStyle = /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @private
     * @param {?} avatarValue
     * @return {?}
     */
    function (avatarValue) {
        return __assign({ textAlign: 'center', borderRadius: this.round ? '100%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', textTransform: 'uppercase', color: this.fgColor, backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue), font: Math.floor(this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif', lineHeight: this.size + 'px' }, this.style);
    };
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     */
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.getImageStyle = /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @private
     * @return {?}
     */
    function () {
        return __assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size, height: this.size }, this.style);
    };
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @private
     * @param {?} source
     * @return {?}
     */
    AvatarComponent.prototype.fetchAndProcessAsyncAvatar = /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @private
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var _this = this;
        this.avatarService
            .fetchAvatar(source.getAvatar())
            .pipe(takeWhile((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) { return source.processResponse(response, _this.size); })))
            .subscribe((/**
         * @param {?} avatarSrc
         * @return {?}
         */
        function (avatarSrc) { return (_this.avatarSrc = avatarSrc); }));
    };
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     */
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @private
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    AvatarComponent.prototype.addSource = /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @private
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    function (sourceType, sourceValue) {
        if (!this.isSourceExist(sourceType)) {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
        else {
            /** @type {?} */
            var index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.sourceType === sourceType; }));
            this.sources[index].sourceId = sourceValue;
        }
    };
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     */
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    AvatarComponent.prototype.removeSource = /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    function (sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            var index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.sourceType === sourceType; }));
            this.sources.splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.isSourceExist = /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        return this.sources.map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.sourceType; })).includes(avatarSource);
    };
    AvatarComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-avatar',
                    template: "\n    <div\n      (click)=\"onAvatarClicked()\"\n      class=\"avatar-container\"\n      [ngStyle]=\"hostStyle\"\n    >\n      <img\n        *ngIf=\"avatarSrc; else textAvatar\"\n        [src]=\"avatarSrc\"\n        [width]=\"size\"\n        [height]=\"size\"\n        [ngStyle]=\"avatarStyle\"\n        (error)=\"fetchAvatarSource($event)\"\n        class=\"avatar-content\"\n      />\n      <ng-template #textAvatar>\n        <div *ngIf=\"avatarText\" class=\"avatar-content\" [ngStyle]=\"avatarStyle\">\n          {{ avatarText }}\n        </div>\n      </ng-template>\n    </div>\n  ",
                    styles: ["\n      :host {\n        border-radius: '50%';\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    AvatarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SourceFactory },
        { type: AvatarService }
    ]; };
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
    return AvatarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvatarModule = /** @class */ (function () {
    function AvatarModule() {
    }
    /**
     * @param {?=} avatarConfig
     * @return {?}
     */
    AvatarModule.forRoot = /**
     * @param {?=} avatarConfig
     * @return {?}
     */
    function (avatarConfig) {
        return {
            ngModule: AvatarModule,
            providers: [
                { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
            ]
        };
    };
    AvatarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [AvatarComponent],
                    providers: [SourceFactory, AvatarService, AvatarConfigService],
                    exports: [AvatarComponent]
                },] }
    ];
    return AvatarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AvatarComponent, AvatarModule, AvatarService, AvatarSource, defaultCacheLifetimeSecond, defaultColors, defaultSources, SourceFactory as ɵa, AvatarConfigService as ɵb, AVATAR_CONFIG as ɵc };
//# sourceMappingURL=ngx-avatar.js.map
