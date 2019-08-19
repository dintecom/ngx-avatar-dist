/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
 * Provides utilities methods related to Avatar component
 */
var AvatarService = /** @class */ (function () {
    function AvatarService(http, avatarConfigService) {
        this.http = http;
        this.avatarConfigService = avatarConfigService;
        this.avatarSources = defaultSources;
        this.avatarColors = defaultColors;
        this.cache = [];
        this.overrideAvatarSources();
        this.overrideAvatarColors();
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
        return this.http.get(avatarUrl);
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
     * @param {?} source
     * @return {?}
     */
    AvatarService.prototype.fetchAvatarHasFailedBefore = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return this.cache.includes(source);
    };
    /**
     * @param {?} source
     * @return {?}
     */
    AvatarService.prototype.cacheFailedAvatar = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.cache.push(source);
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
    /**
     * @type {?}
     * @private
     */
    AvatarService.prototype.cache;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBSzVELE1BQU0sS0FBTyxjQUFjLEdBQUc7SUFDNUIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFNBQVM7SUFDdEIsWUFBWSxDQUFDLEtBQUs7SUFDbEIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLEtBQUs7Q0FDbkI7Ozs7O0FBS0QsTUFBTSxLQUFPLGFBQWEsR0FBRztJQUMzQixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWOzs7O0FBS0Q7SUFPRSx1QkFDVSxJQUFnQixFQUNoQixtQkFBd0M7UUFEeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUDNDLGtCQUFhLEdBQW1CLGNBQWMsQ0FBQztRQUMvQyxpQkFBWSxHQUFhLGFBQWEsQ0FBQztRQUV0QyxVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQU1qQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLG1DQUFXOzs7O0lBQWxCLFVBQW1CLFNBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFTSxzQ0FBYzs7OztJQUFyQixVQUFzQixVQUFrQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxhQUFhLENBQUM7U0FDdEI7O1lBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7OztJQUVNLHNDQUFjOzs7OztJQUFyQixVQUNFLFdBQXlCLEVBQ3pCLFdBQXlCO1FBRXpCLE9BQU8sQ0FDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTSxnQ0FBUTs7OztJQUFmLFVBQWdCLE1BQWM7UUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxtQkFBQSxNQUFNLEVBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVNLG9DQUFZOzs7O0lBQW5CLFVBQW9CLFVBQXdCO1FBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFTSxrREFBMEI7Ozs7SUFBakMsVUFBa0MsTUFBb0I7UUFDcEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLHlDQUFpQjs7OztJQUF4QixVQUF5QixNQUFvQjtRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVPLDZDQUFxQjs7OztJQUE3QjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUM1RCxjQUFjLENBQ2YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sNENBQW9COzs7O0lBQTVCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7OztJQUVPLDBDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsS0FBYTtRQUN0QyxPQUFPLEtBQUs7YUFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ1QsR0FBRzs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBcEIsQ0FBb0IsRUFBQzthQUNuQyxNQUFNOzs7OztRQUFDLFVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSyxPQUFBLFFBQVEsR0FBRyxPQUFPLEVBQWxCLENBQWtCLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFFTyx5Q0FBaUI7Ozs7O0lBQXpCLFVBQTBCLFVBQXdCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBdkVGLFVBQVU7Ozs7Z0JBeENGLFVBQVU7Z0JBSVYsbUJBQW1COztJQTRHNUIsb0JBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXZFWSxhQUFhOzs7SUFDeEIsc0NBQXNEOztJQUN0RCxxQ0FBOEM7Ozs7O0lBRTlDLDhCQUFtQzs7Ozs7SUFHakMsNkJBQXdCOzs7OztJQUN4Qiw0Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEF2YXRhckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2F2YXRhci1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBsaXN0IG9mIFN1cHBvcnRlZCBhdmF0YXIgc291cmNlc1xuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFNvdXJjZXMgPSBbXG4gIEF2YXRhclNvdXJjZS5GQUNFQk9PSyxcbiAgQXZhdGFyU291cmNlLkdPT0dMRSxcbiAgQXZhdGFyU291cmNlLlRXSVRURVIsXG4gIEF2YXRhclNvdXJjZS5WS09OVEFLVEUsXG4gIEF2YXRhclNvdXJjZS5TS1lQRSxcbiAgQXZhdGFyU291cmNlLkdSQVZBVEFSLFxuICBBdmF0YXJTb3VyY2UuR0lUSFVCLFxuICBBdmF0YXJTb3VyY2UuQ1VTVE9NLFxuICBBdmF0YXJTb3VyY2UuSU5JVElBTFMsXG4gIEF2YXRhclNvdXJjZS5WQUxVRVxuXTtcblxuLyoqXG4gKiBsaXN0IG9mIGRlZmF1bHQgY29sb3JzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3JzID0gW1xuICAnIzFhYmM5YycsXG4gICcjMzQ5OGRiJyxcbiAgJyNmMWM0MGYnLFxuICAnIzhlNDRhZCcsXG4gICcjZTc0YzNjJyxcbiAgJyNkMzU0MDAnLFxuICAnIzJjM2U1MCcsXG4gICcjN2Y4YzhkJ1xuXTtcblxuLyoqXG4gKiBQcm92aWRlcyB1dGlsaXRpZXMgbWV0aG9kcyByZWxhdGVkIHRvIEF2YXRhciBjb21wb25lbnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhclNlcnZpY2Uge1xuICBwdWJsaWMgYXZhdGFyU291cmNlczogQXZhdGFyU291cmNlW10gPSBkZWZhdWx0U291cmNlcztcbiAgcHVibGljIGF2YXRhckNvbG9yczogc3RyaW5nW10gPSBkZWZhdWx0Q29sb3JzO1xuXG4gIHByaXZhdGUgY2FjaGU6IEF2YXRhclNvdXJjZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBmZXRjaEF2YXRhcihhdmF0YXJVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXZhdGFyVXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSYW5kb21Db2xvcihhdmF0YXJUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghYXZhdGFyVGV4dCkge1xuICAgICAgcmV0dXJuICd0cmFuc3BhcmVudCc7XG4gICAgfVxuICAgIGNvbnN0IGFzY2lpQ29kZVN1bSA9IHRoaXMuY2FsY3VsYXRlQXNjaWlDb2RlKGF2YXRhclRleHQpO1xuICAgIHJldHVybiB0aGlzLmF2YXRhckNvbG9yc1thc2NpaUNvZGVTdW0gJSB0aGlzLmF2YXRhckNvbG9ycy5sZW5ndGhdO1xuICB9XG5cbiAgcHVibGljIGNvcG1hcmVTb3VyY2VzKFxuICAgIHNvdXJjZVR5cGUxOiBBdmF0YXJTb3VyY2UsXG4gICAgc291cmNlVHlwZTI6IEF2YXRhclNvdXJjZVxuICApOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUxKSAtIHRoaXMuZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTIpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NvdXJjZShzb3VyY2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF2YXRhclNvdXJjZXMuaW5jbHVkZXMoc291cmNlIGFzIEF2YXRhclNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgaXNUZXh0QXZhdGFyKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbQXZhdGFyU291cmNlLklOSVRJQUxTLCBBdmF0YXJTb3VyY2UuVkFMVUVdLmluY2x1ZGVzKHNvdXJjZVR5cGUpO1xuICB9XG5cbiAgcHVibGljIGZldGNoQXZhdGFySGFzRmFpbGVkQmVmb3JlKHNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuaW5jbHVkZXMoc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWNoZUZhaWxlZEF2YXRhcihzb3VyY2U6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuY2FjaGUucHVzaChzb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTb3VyY2VzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhclNvdXJjZXMoXG4gICAgICBkZWZhdWx0U291cmNlc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQXZhdGFyQ29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyQ29sb3JzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNjaWlDb2RlKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcChsZXR0ZXIgPT4gbGV0dGVyLmNoYXJDb2RlQXQoMCkpXG4gICAgICAucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMgKyBjdXJyZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTogQXZhdGFyU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXZhdGFyU291cmNlcy5pbmRleE9mKHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=