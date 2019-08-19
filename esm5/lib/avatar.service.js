/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { tap, catchError, finalize, share } from 'rxjs/operators';
import { AvatarConfigService } from './avatar-config.service';
import { AvatarSource } from './sources/avatar-source.enum';
/**
 * list of Supported avatar sources
 * @type {?}
 */
export var defaultSources = [
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
export var defaultColors = [
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
export var defaultCacheLifetimeSecond = 30 * 60;
/**
 * @record
 */
function ICacheEntry() { }
if (false) {
    /** @type {?|undefined} */
    ICacheEntry.prototype.avatar;
    /** @type {?|undefined} */
    ICacheEntry.prototype.error;
}
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
export { AvatarService };
if (false) {
    /** @type {?} */
    AvatarService.prototype.avatarSources;
    /** @type {?} */
    AvatarService.prototype.avatarColors;
    /** @type {?} */
    AvatarService.prototype.cacheLifetimeSecond;
    /**
     * @type {?}
     * @private
     */
    AvatarService.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    AvatarService.prototype.requestCache;
    /**
     * @type {?}
     * @private
     */
    AvatarService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AvatarService.prototype.avatarConfigService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUs1RCxNQUFNLEtBQU8sY0FBYyxHQUFHO0lBQzVCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxPQUFPO0lBQ3BCLFlBQVksQ0FBQyxTQUFTO0lBQ3RCLFlBQVksQ0FBQyxLQUFLO0lBQ2xCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxLQUFLO0NBQ25COzs7OztBQUtELE1BQU0sS0FBTyxhQUFhLEdBQUc7SUFDM0IsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7Q0FDVjs7Ozs7QUFLRCxNQUFNLEtBQU8sMEJBQTBCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Ozs7QUFFakQsMEJBR0M7OztJQUZDLDZCQUFhOztJQUNiLDRCQUFZOzs7OztBQU1kO0lBU0UsdUJBQ1UsSUFB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QUM7SUFDaEQsQ0FBQzs7Z0JBcEdGLFVBQVU7Ozs7Z0JBbkRGLFVBQVU7Z0JBS1YsbUJBQW1COztJQW1KNUIsb0JBQUM7Q0FBQSxBQXJHRCxJQXFHQztTQXBHWSxhQUFhOzs7SUFDeEIsc0NBQXNEOztJQUN0RCxxQ0FBOEM7O0lBQzlDLDRDQUFnRTs7Ozs7SUFFaEUsOEJBQW1EOzs7OztJQUNuRCxxQ0FBOEQ7Ozs7O0lBRzVELDZCQUF3Qjs7Ozs7SUFDeEIsNENBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwLCBjYXRjaEVycm9yLCBmaW5hbGl6ZSwgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEF2YXRhckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2F2YXRhci1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBsaXN0IG9mIFN1cHBvcnRlZCBhdmF0YXIgc291cmNlc1xuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFNvdXJjZXMgPSBbXG4gIEF2YXRhclNvdXJjZS5GQUNFQk9PSyxcbiAgQXZhdGFyU291cmNlLkdPT0dMRSxcbiAgQXZhdGFyU291cmNlLlRXSVRURVIsXG4gIEF2YXRhclNvdXJjZS5WS09OVEFLVEUsXG4gIEF2YXRhclNvdXJjZS5TS1lQRSxcbiAgQXZhdGFyU291cmNlLkdSQVZBVEFSLFxuICBBdmF0YXJTb3VyY2UuR0lUSFVCLFxuICBBdmF0YXJTb3VyY2UuQ1VTVE9NLFxuICBBdmF0YXJTb3VyY2UuSU5JVElBTFMsXG4gIEF2YXRhclNvdXJjZS5WQUxVRVxuXTtcblxuLyoqXG4gKiBsaXN0IG9mIGRlZmF1bHQgY29sb3JzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3JzID0gW1xuICAnIzFhYmM5YycsXG4gICcjMzQ5OGRiJyxcbiAgJyNmMWM0MGYnLFxuICAnIzhlNDRhZCcsXG4gICcjZTc0YzNjJyxcbiAgJyNkMzU0MDAnLFxuICAnIzJjM2U1MCcsXG4gICcjN2Y4YzhkJ1xuXTtcblxuLyoqXG4gKiBEZWZhdWx0IHJlcXVlc3QgY2FjaGUgbGlmZXRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDYWNoZUxpZmV0aW1lU2Vjb25kID0gMzAgKiA2MDtcblxuaW50ZXJmYWNlIElDYWNoZUVudHJ5IHtcbiAgYXZhdGFyPzogYW55O1xuICBlcnJvcj86IGFueTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB1dGlsaXRpZXMgbWV0aG9kcyByZWxhdGVkIHRvIEF2YXRhciBjb21wb25lbnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhclNlcnZpY2Uge1xuICBwdWJsaWMgYXZhdGFyU291cmNlczogQXZhdGFyU291cmNlW10gPSBkZWZhdWx0U291cmNlcztcbiAgcHVibGljIGF2YXRhckNvbG9yczogc3RyaW5nW10gPSBkZWZhdWx0Q29sb3JzO1xuICBwdWJsaWMgY2FjaGVMaWZldGltZVNlY29uZDogbnVtYmVyID0gZGVmYXVsdENhY2hlTGlmZXRpbWVTZWNvbmQ7XG5cbiAgcHJpdmF0ZSBjYWNoZTogeyBbdXJsOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9ID0ge307XG4gIHByaXZhdGUgcmVxdWVzdENhY2hlOiB7IFt1cmw6IHN0cmluZ106IE9ic2VydmFibGU8YW55PiB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgICB0aGlzLm92ZXJyaWRlQ2FjaGVMaWZldGltZSgpO1xuICB9XG5cbiAgcHVibGljIGZldGNoQXZhdGFyKGF2YXRhclVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodGhpcy5jYWNoZVthdmF0YXJVcmxdKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVthdmF0YXJVcmxdLmVycm9yXG4gICAgICAgID8gdGhyb3dFcnJvcih0aGlzLmNhY2hlW2F2YXRhclVybF0uZXJyb3IpXG4gICAgICAgIDogb2YodGhpcy5jYWNoZVthdmF0YXJVcmxdLmF2YXRhcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdENhY2hlW2F2YXRhclVybF0pIHJldHVybiB0aGlzLnJlcXVlc3RDYWNoZVthdmF0YXJVcmxdO1xuXG4gICAgdGhpcy5yZXF1ZXN0Q2FjaGVbYXZhdGFyVXJsXSA9IHRoaXMuaHR0cFxuICAgICAgLmdldChhdmF0YXJVcmwpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGEgPT4ge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlcXVlc3RDYWNoZVthdmF0YXJVcmxdO1xuICAgICAgICAgIHRoaXMuY2FjaGVbYXZhdGFyVXJsXSA9IHtcbiAgICAgICAgICAgIGF2YXRhcjogYSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5yZXF1ZXN0Q2FjaGVbYXZhdGFyVXJsXTtcbiAgICAgICAgICB0aGlzLmNhY2hlW2F2YXRhclVybF0gPSB7XG4gICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICB9KSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIHRoaXMuY2FjaGVbYXZhdGFyVXJsXSwgdGhpcy5jYWNoZUxpZmV0aW1lU2Vjb25kICogMTAwMCk7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdENhY2hlW2F2YXRhclVybF07XG4gIH1cblxuICBwdWJsaWMgZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWF2YXRhclRleHQpIHtcbiAgICAgIHJldHVybiAndHJhbnNwYXJlbnQnO1xuICAgIH1cbiAgICBjb25zdCBhc2NpaUNvZGVTdW0gPSB0aGlzLmNhbGN1bGF0ZUFzY2lpQ29kZShhdmF0YXJUZXh0KTtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJDb2xvcnNbYXNjaWlDb2RlU3VtICUgdGhpcy5hdmF0YXJDb2xvcnMubGVuZ3RoXTtcbiAgfVxuXG4gIHB1YmxpYyBjb3BtYXJlU291cmNlcyhcbiAgICBzb3VyY2VUeXBlMTogQXZhdGFyU291cmNlLFxuICAgIHNvdXJjZVR5cGUyOiBBdmF0YXJTb3VyY2VcbiAgKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRTb3VyY2VQcmlvcml0eShzb3VyY2VUeXBlMSkgLSB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUyKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNTb3VyY2Uoc291cmNlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSBhcyBBdmF0YXJTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGlzVGV4dEF2YXRhcihzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW0F2YXRhclNvdXJjZS5JTklUSUFMUywgQXZhdGFyU291cmNlLlZBTFVFXS5pbmNsdWRlcyhzb3VyY2VUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVBdmF0YXJTb3VyY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU291cmNlcyA9IHRoaXMuYXZhdGFyQ29uZmlnU2VydmljZS5nZXRBdmF0YXJTb3VyY2VzKFxuICAgICAgZGVmYXVsdFNvdXJjZXNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhckNvbG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhckNvbG9ycyA9IHRoaXMuYXZhdGFyQ29uZmlnU2VydmljZS5nZXRBdmF0YXJDb2xvcnMoZGVmYXVsdENvbG9ycyk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQ2FjaGVMaWZldGltZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlTGlmZXRpbWVTZWNvbmQgPSB0aGlzLmF2YXRhckNvbmZpZ1NlcnZpY2UuZ2V0Q2FjaGVMaWZldGltZShkZWZhdWx0Q2FjaGVMaWZldGltZVNlY29uZCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzY2lpQ29kZSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5zcGxpdCgnJylcbiAgICAgIC5tYXAobGV0dGVyID0+IGxldHRlci5jaGFyQ29kZUF0KDApKVxuICAgICAgLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzICsgY3VycmVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLmF2YXRhclNvdXJjZXMuaW5kZXhPZihzb3VyY2VUeXBlKTtcbiAgfVxufVxuIl19