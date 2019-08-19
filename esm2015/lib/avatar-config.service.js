/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { AVATAR_CONFIG } from './avatar-config.token';
export class AvatarConfigService {
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
            const validSources = uniqueSources.filter((/**
             * @param {?} source
             * @return {?}
             */
            source => defaultSources.includes(source)));
            return [
                ...validSources,
                ...defaultSources.filter((/**
                 * @param {?} source
                 * @return {?}
                 */
                source => !validSources.includes(source)))
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
    /**
     * @param {?} defaultLifetime
     * @return {?}
     */
    getCacheLifetime(defaultLifetime) {
        return ((this.userConfig &&
            isFinite(this.userConfig.cacheLifetimeSecond) &&
            this.userConfig.cacheLifetimeSecond) ||
            defaultLifetime);
    }
}
AvatarConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AvatarConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AVATAR_CONFIG,] }] }
];
if (false) {
    /** @type {?} */
    AvatarConfigService.prototype.userConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXItY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJdEQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUM5QixZQUdTLFVBQXdCO1FBQXhCLGVBQVUsR0FBVixVQUFVLENBQWM7SUFDOUIsQ0FBQzs7Ozs7SUFFRyxnQkFBZ0IsQ0FBQyxjQUE4QjtRQUNwRCxJQUNFLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQzFDOztrQkFDTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7a0JBQ2pFLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTTs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ2pELGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQ2hDO1lBQ0QsT0FBTztnQkFDTCxHQUFHLFlBQVk7Z0JBQ2YsR0FBRyxjQUFjLENBQUMsTUFBTTs7OztnQkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQzthQUNuRSxDQUFDO1NBQ0g7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVNLGVBQWUsQ0FBQyxhQUF1QjtRQUM1QyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3pCLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxlQUF1QjtRQUM3QyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7WUFDdEMsZUFBZSxDQUNoQixDQUFDO0lBQ0osQ0FBQzs7O1lBM0NGLFVBQVU7Ozs7NENBR04sUUFBUSxZQUNSLE1BQU0sU0FBQyxhQUFhOzs7O0lBRHJCLHlDQUUrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyBBVkFUQVJfQ09ORklHIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnLnRva2VuJztcbmltcG9ydCB7IEF2YXRhckNvbmZpZyB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb25maWdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KEFWQVRBUl9DT05GSUcpXG4gICAgcHVibGljIHVzZXJDb25maWc6IEF2YXRhckNvbmZpZ1xuICApIHt9XG5cbiAgcHVibGljIGdldEF2YXRhclNvdXJjZXMoZGVmYXVsdFNvdXJjZXM6IEF2YXRhclNvdXJjZVtdKTogQXZhdGFyU291cmNlW10ge1xuICAgIGlmIChcbiAgICAgIHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgdGhpcy51c2VyQ29uZmlnLnNvdXJjZVByaW9yaXR5T3JkZXIgJiZcbiAgICAgIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyLmxlbmd0aFxuICAgICkge1xuICAgICAgY29uc3QgdW5pcXVlU291cmNlcyA9IFsuLi5uZXcgU2V0KHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyKV07XG4gICAgICBjb25zdCB2YWxpZFNvdXJjZXMgPSB1bmlxdWVTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT5cbiAgICAgICAgZGVmYXVsdFNvdXJjZXMuaW5jbHVkZXMoc291cmNlKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLnZhbGlkU291cmNlcyxcbiAgICAgICAgLi4uZGVmYXVsdFNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhdmFsaWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSkpXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFNvdXJjZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyQ29sb3JzKGRlZmF1bHRDb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy51c2VyQ29uZmlnICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMgJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNvbG9ycy5sZW5ndGggJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNvbG9ycykgfHxcbiAgICAgIGRlZmF1bHRDb2xvcnNcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldENhY2hlTGlmZXRpbWUoZGVmYXVsdExpZmV0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy51c2VyQ29uZmlnICYmXG4gICAgICAgIGlzRmluaXRlKHRoaXMudXNlckNvbmZpZy5jYWNoZUxpZmV0aW1lU2Vjb25kKSAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY2FjaGVMaWZldGltZVNlY29uZCkgfHxcbiAgICAgIGRlZmF1bHRMaWZldGltZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==