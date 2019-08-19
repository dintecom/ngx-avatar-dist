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
export { AvatarConfigService };
if (false) {
    /** @type {?} */
    AvatarConfigService.prototype.userConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXItY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3REO0lBRUUsNkJBR1MsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUM5QixDQUFDOzs7OztJQUVHLDhDQUFnQjs7OztJQUF2QixVQUF3QixjQUE4QjtRQUNwRCxJQUNFLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQzFDOztnQkFDTSxhQUFhLG9CQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Z0JBQ2pFLGNBQVksR0FBRyxhQUFhLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTTtnQkFDOUMsT0FBQSxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUEvQixDQUErQixFQUNoQztZQUNELHdCQUNLLGNBQVksRUFDWixjQUFjLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxjQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixFQUFDLEVBQ2xFO1NBQ0g7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVNLDZDQUFlOzs7O0lBQXRCLFVBQXVCLGFBQXVCO1FBQzVDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDekIsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDOzs7OztJQUVNLDhDQUFnQjs7OztJQUF2QixVQUF3QixlQUF1QjtRQUM3QyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7WUFDdEMsZUFBZSxDQUNoQixDQUFDO0lBQ0osQ0FBQzs7Z0JBM0NGLFVBQVU7Ozs7Z0RBR04sUUFBUSxZQUNSLE1BQU0sU0FBQyxhQUFhOztJQXdDekIsMEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTNDWSxtQkFBbUI7OztJQUU1Qix5Q0FFK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuaW1wb3J0IHsgQVZBVEFSX0NPTkZJRyB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBBdmF0YXJDb25maWcgfSBmcm9tICcuL2F2YXRhci1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29uZmlnU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChBVkFUQVJfQ09ORklHKVxuICAgIHB1YmxpYyB1c2VyQ29uZmlnOiBBdmF0YXJDb25maWdcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXJTb3VyY2VzKGRlZmF1bHRTb3VyY2VzOiBBdmF0YXJTb3VyY2VbXSk6IEF2YXRhclNvdXJjZVtdIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnVzZXJDb25maWcgJiZcbiAgICAgIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyICYmXG4gICAgICB0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlci5sZW5ndGhcbiAgICApIHtcbiAgICAgIGNvbnN0IHVuaXF1ZVNvdXJjZXMgPSBbLi4ubmV3IFNldCh0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlcildO1xuICAgICAgY29uc3QgdmFsaWRTb3VyY2VzID0gdW5pcXVlU291cmNlcy5maWx0ZXIoc291cmNlID0+XG4gICAgICAgIGRlZmF1bHRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi52YWxpZFNvdXJjZXMsXG4gICAgICAgIC4uLmRlZmF1bHRTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gIXZhbGlkU291cmNlcy5pbmNsdWRlcyhzb3VyY2UpKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY29sb3JzICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMubGVuZ3RoICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMpIHx8XG4gICAgICBkZWZhdWx0Q29sb3JzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZUxpZmV0aW1lKGRlZmF1bHRMaWZldGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgICBpc0Zpbml0ZSh0aGlzLnVzZXJDb25maWcuY2FjaGVMaWZldGltZVNlY29uZCkgJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNhY2hlTGlmZXRpbWVTZWNvbmQpIHx8XG4gICAgICBkZWZhdWx0TGlmZXRpbWVcbiAgICApO1xuICB9XG59XG4iXX0=