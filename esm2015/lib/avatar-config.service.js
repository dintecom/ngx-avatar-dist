/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
if (false) {
    /** @type {?} */
    AvatarConfigService.prototype.userConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXItY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJdEQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUM5QixZQUdTLFVBQXdCO1FBQXhCLGVBQVUsR0FBVixVQUFVLENBQWM7SUFDOUIsQ0FBQzs7Ozs7SUFFRyxnQkFBZ0IsQ0FBQyxjQUE4QjtRQUNwRCxJQUNFLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQzFDOztrQkFDTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7a0JBQ2pFLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ2pELGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ2hDO1lBQ0QsT0FBTztnQkFDTCxHQUFHLFlBQVk7Z0JBQ2YsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25FLENBQUM7U0FDSDtRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRU0sZUFBZSxDQUFDLGFBQXVCO1FBQzVDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDekIsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDOzs7WUFsQ0YsVUFBVTs7Ozs0Q0FHTixRQUFRLFlBQ1IsTUFBTSxTQUFDLGFBQWE7Ozs7SUFEckIseUNBRStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IEFWQVRBUl9DT05GSUcgfSBmcm9tICcuL2F2YXRhci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgQXZhdGFyQ29uZmlnIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbmZpZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQVZBVEFSX0NPTkZJRylcbiAgICBwdWJsaWMgdXNlckNvbmZpZzogQXZhdGFyQ29uZmlnXG4gICkge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyU291cmNlcyhkZWZhdWx0U291cmNlczogQXZhdGFyU291cmNlW10pOiBBdmF0YXJTb3VyY2VbXSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy51c2VyQ29uZmlnICYmXG4gICAgICB0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlciAmJlxuICAgICAgdGhpcy51c2VyQ29uZmlnLnNvdXJjZVByaW9yaXR5T3JkZXIubGVuZ3RoXG4gICAgKSB7XG4gICAgICBjb25zdCB1bmlxdWVTb3VyY2VzID0gWy4uLm5ldyBTZXQodGhpcy51c2VyQ29uZmlnLnNvdXJjZVByaW9yaXR5T3JkZXIpXTtcbiAgICAgIGNvbnN0IHZhbGlkU291cmNlcyA9IHVuaXF1ZVNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PlxuICAgICAgICBkZWZhdWx0U291cmNlcy5pbmNsdWRlcyhzb3VyY2UpXG4gICAgICApO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgLi4udmFsaWRTb3VyY2VzLFxuICAgICAgICAuLi5kZWZhdWx0U291cmNlcy5maWx0ZXIoc291cmNlID0+ICF2YWxpZFNvdXJjZXMuaW5jbHVkZXMoc291cmNlKSlcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0U291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXJDb2xvcnMoZGVmYXVsdENvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnVzZXJDb25maWcgJiZcbiAgICAgICAgdGhpcy51c2VyQ29uZmlnLmNvbG9ycyAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY29sb3JzLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY29sb3JzKSB8fFxuICAgICAgZGVmYXVsdENvbG9yc1xuICAgICk7XG4gIH1cbn1cbiJdfQ==