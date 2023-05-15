import { Inject, Injectable, Optional } from '@angular/core';
import { NGX_AVATAR_CONFIG } from './ngx-avatar-config.token';
import * as i0 from "@angular/core";
class NgxAvatarConfigService {
    constructor(userConfig) {
        this.userConfig = userConfig;
    }
    getAvatarSources(defaultSources) {
        if (this.userConfig && this.userConfig.sourcePriorityOrder && this.userConfig.sourcePriorityOrder.length) {
            const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
            const validSources = uniqueSources.filter(source => defaultSources.includes(source));
            return [...validSources, ...defaultSources.filter(source => !validSources.includes(source))];
        }
        return defaultSources;
    }
    getAvatarColors(defaultColors) {
        return ((this.userConfig && this.userConfig.colors && this.userConfig.colors.length && this.userConfig.colors) ||
            defaultColors);
    }
    getCacheLifetime(defaultLifetime) {
        return ((this.userConfig &&
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            isFinite(this.userConfig.cacheLifetimeSecond) &&
            this.userConfig.cacheLifetimeSecond) ||
            defaultLifetime);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgxAvatarConfigService, deps: [{ token: NGX_AVATAR_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgxAvatarConfigService }); }
}
export { NgxAvatarConfigService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgxAvatarConfigService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NGX_AVATAR_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF2YXRhci1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9uZ3gtYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFHOUQsTUFDYSxzQkFBc0I7SUFDakMsWUFHUyxVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUNqQyxDQUFDO0lBRUcsZ0JBQWdCLENBQUMsY0FBOEI7UUFDcEQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7WUFDeEcsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTyxDQUFDLEdBQUcsWUFBWSxFQUFFLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUY7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRU0sZUFBZSxDQUFDLGFBQXVCO1FBQzVDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3RHLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVNLGdCQUFnQixDQUFDLGVBQXVCO1FBQzdDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ2Qsb0VBQW9FO1lBQ3BFLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFvQixDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7WUFDdEMsZUFBZSxDQUNoQixDQUFDO0lBQ0osQ0FBQzs4R0EvQlUsc0JBQXNCLGtCQUd2QixpQkFBaUI7a0hBSGhCLHNCQUFzQjs7U0FBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVU7OzBCQUdOLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ3hBdmF0YXJDb25maWcgfSBmcm9tICcuL25neC1hdmF0YXItY29uZmlnJztcbmltcG9ydCB7IE5HWF9BVkFUQVJfQ09ORklHIH0gZnJvbSAnLi9uZ3gtYXZhdGFyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neEF2YXRhckNvbmZpZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTkdYX0FWQVRBUl9DT05GSUcpXG4gICAgcHVibGljIHVzZXJDb25maWc6IE5neEF2YXRhckNvbmZpZyxcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXJTb3VyY2VzKGRlZmF1bHRTb3VyY2VzOiBBdmF0YXJTb3VyY2VbXSk6IEF2YXRhclNvdXJjZVtdIHtcbiAgICBpZiAodGhpcy51c2VyQ29uZmlnICYmIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyICYmIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyLmxlbmd0aCkge1xuICAgICAgY29uc3QgdW5pcXVlU291cmNlcyA9IFsuLi5uZXcgU2V0KHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyKV07XG4gICAgICBjb25zdCB2YWxpZFNvdXJjZXMgPSB1bmlxdWVTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gZGVmYXVsdFNvdXJjZXMuaW5jbHVkZXMoc291cmNlKSk7XG4gICAgICByZXR1cm4gWy4uLnZhbGlkU291cmNlcywgLi4uZGVmYXVsdFNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhdmFsaWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSkpXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudXNlckNvbmZpZyAmJiB0aGlzLnVzZXJDb25maWcuY29sb3JzICYmIHRoaXMudXNlckNvbmZpZy5jb2xvcnMubGVuZ3RoICYmIHRoaXMudXNlckNvbmZpZy5jb2xvcnMpIHx8XG4gICAgICBkZWZhdWx0Q29sb3JzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYWNoZUxpZmV0aW1lKGRlZmF1bHRMaWZldGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICBpc0Zpbml0ZSh0aGlzLnVzZXJDb25maWcuY2FjaGVMaWZldGltZVNlY29uZCEpICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jYWNoZUxpZmV0aW1lU2Vjb25kKSB8fFxuICAgICAgZGVmYXVsdExpZmV0aW1lXG4gICAgKTtcbiAgfVxufVxuIl19