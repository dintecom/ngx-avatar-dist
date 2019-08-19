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
export const defaultSources = [
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
export const defaultColors = [
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
export const defaultCacheLifetimeSecond = 30 * 60;
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
export class AvatarService {
    /**
     * @param {?} http
     * @param {?} avatarConfigService
     */
    constructor(http, avatarConfigService) {
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
    fetchAvatar(avatarUrl) {
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
        a => {
            delete this.requestCache[avatarUrl];
            this.cache[avatarUrl] = {
                avatar: a,
            };
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            delete this.requestCache[avatarUrl];
            this.cache[avatarUrl] = {
                error: e,
            };
            return throwError(e);
        })), finalize((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => delete this.cache[avatarUrl]), this.cacheLifetimeSecond * 1000);
        })), share());
        return this.requestCache[avatarUrl];
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
     * @private
     * @return {?}
     */
    overrideAvatarSources() {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    }
    /**
     * @private
     * @return {?}
     */
    overrideAvatarColors() {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    }
    /**
     * @private
     * @return {?}
     */
    overrideCacheLifetime() {
        this.cacheLifetimeSecond = this.avatarConfigService.getCacheLifetime(defaultCacheLifetimeSecond);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    calculateAsciiCode(value) {
        return value
            .split('')
            .map((/**
         * @param {?} letter
         * @return {?}
         */
        letter => letter.charCodeAt(0)))
            .reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        (previous, current) => previous + current));
    }
    /**
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUs1RCxNQUFNLE9BQU8sY0FBYyxHQUFHO0lBQzVCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxPQUFPO0lBQ3BCLFlBQVksQ0FBQyxTQUFTO0lBQ3RCLFlBQVksQ0FBQyxLQUFLO0lBQ2xCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxLQUFLO0NBQ25COzs7OztBQUtELE1BQU0sT0FBTyxhQUFhLEdBQUc7SUFDM0IsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7Q0FDVjs7Ozs7QUFLRCxNQUFNLE9BQU8sMEJBQTBCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Ozs7QUFFakQsMEJBR0M7OztJQUZDLDZCQUFhOztJQUNiLDRCQUFZOzs7OztBQU9kLE1BQU0sT0FBTyxhQUFh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Ozs7SUFFaEUsOEJBQW1EOzs7OztJQUNuRCxxQ0FBOEQ7Ozs7O0lBRzVELDZCQUF3Qjs7Ozs7SUFDeEIsNENBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwLCBjYXRjaEVycm9yLCBmaW5hbGl6ZSwgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEF2YXRhckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2F2YXRhci1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBsaXN0IG9mIFN1cHBvcnRlZCBhdmF0YXIgc291cmNlc1xuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFNvdXJjZXMgPSBbXG4gIEF2YXRhclNvdXJjZS5GQUNFQk9PSyxcbiAgQXZhdGFyU291cmNlLkdPT0dMRSxcbiAgQXZhdGFyU291cmNlLlRXSVRURVIsXG4gIEF2YXRhclNvdXJjZS5WS09OVEFLVEUsXG4gIEF2YXRhclNvdXJjZS5TS1lQRSxcbiAgQXZhdGFyU291cmNlLkdSQVZBVEFSLFxuICBBdmF0YXJTb3VyY2UuR0lUSFVCLFxuICBBdmF0YXJTb3VyY2UuQ1VTVE9NLFxuICBBdmF0YXJTb3VyY2UuSU5JVElBTFMsXG4gIEF2YXRhclNvdXJjZS5WQUxVRVxuXTtcblxuLyoqXG4gKiBsaXN0IG9mIGRlZmF1bHQgY29sb3JzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3JzID0gW1xuICAnIzFhYmM5YycsXG4gICcjMzQ5OGRiJyxcbiAgJyNmMWM0MGYnLFxuICAnIzhlNDRhZCcsXG4gICcjZTc0YzNjJyxcbiAgJyNkMzU0MDAnLFxuICAnIzJjM2U1MCcsXG4gICcjN2Y4YzhkJ1xuXTtcblxuLyoqXG4gKiBEZWZhdWx0IHJlcXVlc3QgY2FjaGUgbGlmZXRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDYWNoZUxpZmV0aW1lU2Vjb25kID0gMzAgKiA2MDtcblxuaW50ZXJmYWNlIElDYWNoZUVudHJ5IHtcbiAgYXZhdGFyPzogYW55O1xuICBlcnJvcj86IGFueTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB1dGlsaXRpZXMgbWV0aG9kcyByZWxhdGVkIHRvIEF2YXRhciBjb21wb25lbnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhclNlcnZpY2Uge1xuICBwdWJsaWMgYXZhdGFyU291cmNlczogQXZhdGFyU291cmNlW10gPSBkZWZhdWx0U291cmNlcztcbiAgcHVibGljIGF2YXRhckNvbG9yczogc3RyaW5nW10gPSBkZWZhdWx0Q29sb3JzO1xuICBwdWJsaWMgY2FjaGVMaWZldGltZVNlY29uZDogbnVtYmVyID0gZGVmYXVsdENhY2hlTGlmZXRpbWVTZWNvbmQ7XG5cbiAgcHJpdmF0ZSBjYWNoZTogeyBbdXJsOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9ID0ge307XG4gIHByaXZhdGUgcmVxdWVzdENhY2hlOiB7IFt1cmw6IHN0cmluZ106IE9ic2VydmFibGU8YW55PiB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgICB0aGlzLm92ZXJyaWRlQ2FjaGVMaWZldGltZSgpO1xuICB9XG5cbiAgcHVibGljIGZldGNoQXZhdGFyKGF2YXRhclVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodGhpcy5jYWNoZVthdmF0YXJVcmxdKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVthdmF0YXJVcmxdLmVycm9yXG4gICAgICAgID8gdGhyb3dFcnJvcih0aGlzLmNhY2hlW2F2YXRhclVybF0uZXJyb3IpXG4gICAgICAgIDogb2YodGhpcy5jYWNoZVthdmF0YXJVcmxdLmF2YXRhcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdENhY2hlW2F2YXRhclVybF0pIHJldHVybiB0aGlzLnJlcXVlc3RDYWNoZVthdmF0YXJVcmxdO1xuXG4gICAgdGhpcy5yZXF1ZXN0Q2FjaGVbYXZhdGFyVXJsXSA9IHRoaXMuaHR0cFxuICAgICAgLmdldChhdmF0YXJVcmwpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGEgPT4ge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlcXVlc3RDYWNoZVthdmF0YXJVcmxdO1xuICAgICAgICAgIHRoaXMuY2FjaGVbYXZhdGFyVXJsXSA9IHtcbiAgICAgICAgICAgIGF2YXRhcjogYSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5yZXF1ZXN0Q2FjaGVbYXZhdGFyVXJsXTtcbiAgICAgICAgICB0aGlzLmNhY2hlW2F2YXRhclVybF0gPSB7XG4gICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICB9KSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIHRoaXMuY2FjaGVbYXZhdGFyVXJsXSwgdGhpcy5jYWNoZUxpZmV0aW1lU2Vjb25kICogMTAwMCk7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdENhY2hlW2F2YXRhclVybF07XG4gIH1cblxuICBwdWJsaWMgZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWF2YXRhclRleHQpIHtcbiAgICAgIHJldHVybiAndHJhbnNwYXJlbnQnO1xuICAgIH1cbiAgICBjb25zdCBhc2NpaUNvZGVTdW0gPSB0aGlzLmNhbGN1bGF0ZUFzY2lpQ29kZShhdmF0YXJUZXh0KTtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJDb2xvcnNbYXNjaWlDb2RlU3VtICUgdGhpcy5hdmF0YXJDb2xvcnMubGVuZ3RoXTtcbiAgfVxuXG4gIHB1YmxpYyBjb3BtYXJlU291cmNlcyhcbiAgICBzb3VyY2VUeXBlMTogQXZhdGFyU291cmNlLFxuICAgIHNvdXJjZVR5cGUyOiBBdmF0YXJTb3VyY2VcbiAgKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRTb3VyY2VQcmlvcml0eShzb3VyY2VUeXBlMSkgLSB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUyKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNTb3VyY2Uoc291cmNlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSBhcyBBdmF0YXJTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGlzVGV4dEF2YXRhcihzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW0F2YXRhclNvdXJjZS5JTklUSUFMUywgQXZhdGFyU291cmNlLlZBTFVFXS5pbmNsdWRlcyhzb3VyY2VUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVBdmF0YXJTb3VyY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU291cmNlcyA9IHRoaXMuYXZhdGFyQ29uZmlnU2VydmljZS5nZXRBdmF0YXJTb3VyY2VzKFxuICAgICAgZGVmYXVsdFNvdXJjZXNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhckNvbG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhckNvbG9ycyA9IHRoaXMuYXZhdGFyQ29uZmlnU2VydmljZS5nZXRBdmF0YXJDb2xvcnMoZGVmYXVsdENvbG9ycyk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQ2FjaGVMaWZldGltZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlTGlmZXRpbWVTZWNvbmQgPSB0aGlzLmF2YXRhckNvbmZpZ1NlcnZpY2UuZ2V0Q2FjaGVMaWZldGltZShkZWZhdWx0Q2FjaGVMaWZldGltZVNlY29uZCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFzY2lpQ29kZSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5zcGxpdCgnJylcbiAgICAgIC5tYXAobGV0dGVyID0+IGxldHRlci5jaGFyQ29kZUF0KDApKVxuICAgICAgLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzICsgY3VycmVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLmF2YXRhclNvdXJjZXMuaW5kZXhPZihzb3VyY2VUeXBlKTtcbiAgfVxufVxuIl19