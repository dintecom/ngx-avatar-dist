/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
     * @return {?}
     */
    AvatarService.prototype.overrideAvatarSources = /**
     * @return {?}
     */
    function () {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    };
    /**
     * @return {?}
     */
    AvatarService.prototype.overrideAvatarColors = /**
     * @return {?}
     */
    function () {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AvatarService.prototype.calculateAsciiCode = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value
            .split('')
            .map(function (letter) { return letter.charCodeAt(0); })
            .reduce(function (previous, current) { return previous + current; });
    };
    /**
     * @param {?} sourceType
     * @return {?}
     */
    AvatarService.prototype.getSourcePriority = /**
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
    AvatarService.prototype.http;
    /** @type {?} */
    AvatarService.prototype.avatarConfigService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBSzVELE1BQU0sS0FBTyxjQUFjLEdBQUc7SUFDNUIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFNBQVM7SUFDdEIsWUFBWSxDQUFDLEtBQUs7SUFDbEIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLEtBQUs7Q0FDbkI7Ozs7O0FBS0QsTUFBTSxLQUFPLGFBQWEsR0FBRztJQUMzQixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWOzs7O0FBS0Q7SUFLRSx1QkFDVSxJQUFnQixFQUNoQixtQkFBd0M7UUFEeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBTDNDLGtCQUFhLEdBQW1CLGNBQWMsQ0FBQztRQUMvQyxpQkFBWSxHQUFhLGFBQWEsQ0FBQztRQU01QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLG1DQUFXOzs7O0lBQWxCLFVBQW1CLFNBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFTSxzQ0FBYzs7OztJQUFyQixVQUFzQixVQUFrQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxhQUFhLENBQUM7U0FDdEI7O1lBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7OztJQUVNLHNDQUFjOzs7OztJQUFyQixVQUNFLFdBQXlCLEVBQ3pCLFdBQXlCO1FBRXpCLE9BQU8sQ0FDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTSxnQ0FBUTs7OztJQUFmLFVBQWdCLE1BQWM7UUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxtQkFBQSxNQUFNLEVBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVNLG9DQUFZOzs7O0lBQW5CLFVBQW9CLFVBQXdCO1FBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OztJQUVPLDZDQUFxQjs7O0lBQTdCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQzVELGNBQWMsQ0FDZixDQUFDO0lBQ0osQ0FBQzs7OztJQUVPLDRDQUFvQjs7O0lBQTVCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRU8sMENBQWtCOzs7O0lBQTFCLFVBQTJCLEtBQWE7UUFDdEMsT0FBTyxLQUFLO2FBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNULEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUM7YUFDbkMsTUFBTSxDQUFDLFVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSyxPQUFBLFFBQVEsR0FBRyxPQUFPLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVPLHlDQUFpQjs7OztJQUF6QixVQUEwQixVQUF3QjtRQUNoRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dCQTdERixVQUFVOzs7O2dCQXhDRixVQUFVO2dCQUlWLG1CQUFtQjs7SUFrRzVCLG9CQUFDO0NBQUEsQUE5REQsSUE4REM7U0E3RFksYUFBYTs7O0lBQ3hCLHNDQUFzRDs7SUFDdEQscUNBQThDOztJQUc1Qyw2QkFBd0I7O0lBQ3hCLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXZhdGFyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqIGxpc3Qgb2YgU3VwcG9ydGVkIGF2YXRhciBzb3VyY2VzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0U291cmNlcyA9IFtcbiAgQXZhdGFyU291cmNlLkZBQ0VCT09LLFxuICBBdmF0YXJTb3VyY2UuR09PR0xFLFxuICBBdmF0YXJTb3VyY2UuVFdJVFRFUixcbiAgQXZhdGFyU291cmNlLlZLT05UQUtURSxcbiAgQXZhdGFyU291cmNlLlNLWVBFLFxuICBBdmF0YXJTb3VyY2UuR1JBVkFUQVIsXG4gIEF2YXRhclNvdXJjZS5HSVRIVUIsXG4gIEF2YXRhclNvdXJjZS5DVVNUT00sXG4gIEF2YXRhclNvdXJjZS5JTklUSUFMUyxcbiAgQXZhdGFyU291cmNlLlZBTFVFXG5dO1xuXG4vKipcbiAqIGxpc3Qgb2YgZGVmYXVsdCBjb2xvcnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvcnMgPSBbXG4gICcjMWFiYzljJyxcbiAgJyMzNDk4ZGInLFxuICAnI2YxYzQwZicsXG4gICcjOGU0NGFkJyxcbiAgJyNlNzRjM2MnLFxuICAnI2QzNTQwMCcsXG4gICcjMmMzZTUwJyxcbiAgJyM3ZjhjOGQnXG5dO1xuXG4vKipcbiAqIFByb3ZpZGVzIHV0aWxpdGllcyBtZXRob2RzIHJlbGF0ZWQgdG8gQXZhdGFyIGNvbXBvbmVudFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyU2VydmljZSB7XG4gIHB1YmxpYyBhdmF0YXJTb3VyY2VzOiBBdmF0YXJTb3VyY2VbXSA9IGRlZmF1bHRTb3VyY2VzO1xuICBwdWJsaWMgYXZhdGFyQ29sb3JzOiBzdHJpbmdbXSA9IGRlZmF1bHRDb2xvcnM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBmZXRjaEF2YXRhcihhdmF0YXJVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXZhdGFyVXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSYW5kb21Db2xvcihhdmF0YXJUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghYXZhdGFyVGV4dCkge1xuICAgICAgcmV0dXJuICd0cmFuc3BhcmVudCc7XG4gICAgfVxuICAgIGNvbnN0IGFzY2lpQ29kZVN1bSA9IHRoaXMuY2FsY3VsYXRlQXNjaWlDb2RlKGF2YXRhclRleHQpO1xuICAgIHJldHVybiB0aGlzLmF2YXRhckNvbG9yc1thc2NpaUNvZGVTdW0gJSB0aGlzLmF2YXRhckNvbG9ycy5sZW5ndGhdO1xuICB9XG5cbiAgcHVibGljIGNvcG1hcmVTb3VyY2VzKFxuICAgIHNvdXJjZVR5cGUxOiBBdmF0YXJTb3VyY2UsXG4gICAgc291cmNlVHlwZTI6IEF2YXRhclNvdXJjZVxuICApOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUxKSAtIHRoaXMuZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTIpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NvdXJjZShzb3VyY2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF2YXRhclNvdXJjZXMuaW5jbHVkZXMoc291cmNlIGFzIEF2YXRhclNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgaXNUZXh0QXZhdGFyKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbQXZhdGFyU291cmNlLklOSVRJQUxTLCBBdmF0YXJTb3VyY2UuVkFMVUVdLmluY2x1ZGVzKHNvdXJjZVR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTb3VyY2VzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhclNvdXJjZXMoXG4gICAgICBkZWZhdWx0U291cmNlc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQXZhdGFyQ29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyQ29sb3JzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNjaWlDb2RlKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcChsZXR0ZXIgPT4gbGV0dGVyLmNoYXJDb2RlQXQoMCkpXG4gICAgICAucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMgKyBjdXJyZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTogQXZhdGFyU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXZhdGFyU291cmNlcy5pbmRleE9mKHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=