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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBSzVELE1BQU0sT0FBTyxjQUFjLEdBQUc7SUFDNUIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFNBQVM7SUFDdEIsWUFBWSxDQUFDLEtBQUs7SUFDbEIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLEtBQUs7Q0FDbkI7Ozs7O0FBS0QsTUFBTSxPQUFPLGFBQWEsR0FBRztJQUMzQixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWOzs7O0FBTUQsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBSXhCLFlBQ1UsSUFBZ0IsRUFDaEIsbUJBQXdDO1FBRHhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUwzQyxrQkFBYSxHQUFtQixjQUFjLENBQUM7UUFDL0MsaUJBQVksR0FBYSxhQUFhLENBQUM7UUFNNUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsU0FBaUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVNLGNBQWMsQ0FBQyxVQUFrQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxhQUFhLENBQUM7U0FDdEI7O2NBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7OztJQUVNLGNBQWMsQ0FDbkIsV0FBeUIsRUFDekIsV0FBeUI7UUFFekIsT0FBTyxDQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQzFFLENBQUM7SUFDSixDQUFDOzs7OztJQUVNLFFBQVEsQ0FBQyxNQUFjO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsbUJBQUEsTUFBTSxFQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsVUFBd0I7UUFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7O0lBRU8scUJBQXFCO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUM1RCxjQUFjLENBQ2YsQ0FBQztJQUNKLENBQUM7Ozs7SUFFTyxvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRU8sa0JBQWtCLENBQUMsS0FBYTtRQUN0QyxPQUFPLEtBQUs7YUFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxVQUF3QjtRQUNoRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQTdERixVQUFVOzs7O1lBeENGLFVBQVU7WUFJVixtQkFBbUI7Ozs7SUFzQzFCLHNDQUFzRDs7SUFDdEQscUNBQThDOztJQUc1Qyw2QkFBd0I7O0lBQ3hCLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXZhdGFyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqIGxpc3Qgb2YgU3VwcG9ydGVkIGF2YXRhciBzb3VyY2VzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0U291cmNlcyA9IFtcbiAgQXZhdGFyU291cmNlLkZBQ0VCT09LLFxuICBBdmF0YXJTb3VyY2UuR09PR0xFLFxuICBBdmF0YXJTb3VyY2UuVFdJVFRFUixcbiAgQXZhdGFyU291cmNlLlZLT05UQUtURSxcbiAgQXZhdGFyU291cmNlLlNLWVBFLFxuICBBdmF0YXJTb3VyY2UuR1JBVkFUQVIsXG4gIEF2YXRhclNvdXJjZS5HSVRIVUIsXG4gIEF2YXRhclNvdXJjZS5DVVNUT00sXG4gIEF2YXRhclNvdXJjZS5JTklUSUFMUyxcbiAgQXZhdGFyU291cmNlLlZBTFVFXG5dO1xuXG4vKipcbiAqIGxpc3Qgb2YgZGVmYXVsdCBjb2xvcnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvcnMgPSBbXG4gICcjMWFiYzljJyxcbiAgJyMzNDk4ZGInLFxuICAnI2YxYzQwZicsXG4gICcjOGU0NGFkJyxcbiAgJyNlNzRjM2MnLFxuICAnI2QzNTQwMCcsXG4gICcjMmMzZTUwJyxcbiAgJyM3ZjhjOGQnXG5dO1xuXG4vKipcbiAqIFByb3ZpZGVzIHV0aWxpdGllcyBtZXRob2RzIHJlbGF0ZWQgdG8gQXZhdGFyIGNvbXBvbmVudFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyU2VydmljZSB7XG4gIHB1YmxpYyBhdmF0YXJTb3VyY2VzOiBBdmF0YXJTb3VyY2VbXSA9IGRlZmF1bHRTb3VyY2VzO1xuICBwdWJsaWMgYXZhdGFyQ29sb3JzOiBzdHJpbmdbXSA9IGRlZmF1bHRDb2xvcnM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBmZXRjaEF2YXRhcihhdmF0YXJVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXZhdGFyVXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSYW5kb21Db2xvcihhdmF0YXJUZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghYXZhdGFyVGV4dCkge1xuICAgICAgcmV0dXJuICd0cmFuc3BhcmVudCc7XG4gICAgfVxuICAgIGNvbnN0IGFzY2lpQ29kZVN1bSA9IHRoaXMuY2FsY3VsYXRlQXNjaWlDb2RlKGF2YXRhclRleHQpO1xuICAgIHJldHVybiB0aGlzLmF2YXRhckNvbG9yc1thc2NpaUNvZGVTdW0gJSB0aGlzLmF2YXRhckNvbG9ycy5sZW5ndGhdO1xuICB9XG5cbiAgcHVibGljIGNvcG1hcmVTb3VyY2VzKFxuICAgIHNvdXJjZVR5cGUxOiBBdmF0YXJTb3VyY2UsXG4gICAgc291cmNlVHlwZTI6IEF2YXRhclNvdXJjZVxuICApOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUxKSAtIHRoaXMuZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTIpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NvdXJjZShzb3VyY2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF2YXRhclNvdXJjZXMuaW5jbHVkZXMoc291cmNlIGFzIEF2YXRhclNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgaXNUZXh0QXZhdGFyKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbQXZhdGFyU291cmNlLklOSVRJQUxTLCBBdmF0YXJTb3VyY2UuVkFMVUVdLmluY2x1ZGVzKHNvdXJjZVR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTb3VyY2VzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhclNvdXJjZXMoXG4gICAgICBkZWZhdWx0U291cmNlc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQXZhdGFyQ29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyQ29sb3JzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNjaWlDb2RlKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcChsZXR0ZXIgPT4gbGV0dGVyLmNoYXJDb2RlQXQoMCkpXG4gICAgICAucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMgKyBjdXJyZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTogQXZhdGFyU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXZhdGFyU291cmNlcy5pbmRleE9mKHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=