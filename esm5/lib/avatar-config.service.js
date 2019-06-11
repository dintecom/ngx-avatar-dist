/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject, Optional } from '@angular/core';
import { AVATAR_CONFIG } from './avatar-config.token';
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
            var uniqueSources = tslib_1.__spread(new Set(this.userConfig.sourcePriorityOrder));
            /** @type {?} */
            var validSources_1 = uniqueSources.filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) {
                return defaultSources.includes(source);
            }));
            return tslib_1.__spread(validSources_1, defaultSources.filter((/**
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
    AvatarConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AvatarConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AVATAR_CONFIG,] }] }
    ]; };
    return AvatarConfigService;
}());
export { AvatarConfigService };
if (false) {
    /** @type {?} */
    AvatarConfigService.prototype.userConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXItY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3REO0lBRUUsNkJBR1MsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUM5QixDQUFDOzs7OztJQUVHLDhDQUFnQjs7OztJQUF2QixVQUF3QixjQUE4QjtRQUNwRCxJQUNFLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQzFDOztnQkFDTSxhQUFhLG9CQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Z0JBQ2pFLGNBQVksR0FBRyxhQUFhLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTTtnQkFDOUMsT0FBQSxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUEvQixDQUErQixFQUNoQztZQUNELHdCQUNLLGNBQVksRUFDWixjQUFjLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxjQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixFQUFDLEVBQ2xFO1NBQ0g7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVNLDZDQUFlOzs7O0lBQXRCLFVBQXVCLGFBQXVCO1FBQzVDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDekIsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDOztnQkFsQ0YsVUFBVTs7OztnREFHTixRQUFRLFlBQ1IsTUFBTSxTQUFDLGFBQWE7O0lBK0J6QiwwQkFBQztDQUFBLEFBbkNELElBbUNDO1NBbENZLG1CQUFtQjs7O0lBRTVCLHlDQUUrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyBBVkFUQVJfQ09ORklHIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnLnRva2VuJztcbmltcG9ydCB7IEF2YXRhckNvbmZpZyB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb25maWdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEFWQVRBUl9DT05GSUcpXG4gICAgcHVibGljIHVzZXJDb25maWc6IEF2YXRhckNvbmZpZ1xuICApIHt9XG5cbiAgcHVibGljIGdldEF2YXRhclNvdXJjZXMoZGVmYXVsdFNvdXJjZXM6IEF2YXRhclNvdXJjZVtdKTogQXZhdGFyU291cmNlW10ge1xuICAgIGlmIChcbiAgICAgIHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgdGhpcy51c2VyQ29uZmlnLnNvdXJjZVByaW9yaXR5T3JkZXIgJiZcbiAgICAgIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyLmxlbmd0aFxuICAgICkge1xuICAgICAgY29uc3QgdW5pcXVlU291cmNlcyA9IFsuLi5uZXcgU2V0KHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyKV07XG4gICAgICBjb25zdCB2YWxpZFNvdXJjZXMgPSB1bmlxdWVTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT5cbiAgICAgICAgZGVmYXVsdFNvdXJjZXMuaW5jbHVkZXMoc291cmNlKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLnZhbGlkU291cmNlcyxcbiAgICAgICAgLi4uZGVmYXVsdFNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhdmFsaWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSkpXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFNvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyQ29sb3JzKGRlZmF1bHRDb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy51c2VyQ29uZmlnICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMgJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNvbG9ycy5sZW5ndGggJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNvbG9ycykgfHxcbiAgICAgIGRlZmF1bHRDb2xvcnNcbiAgICApO1xuICB9XG59XG4iXX0=