import { Inject, Injectable, Optional } from '@angular/core';
import { NGX_AVATAR_CONFIG } from './ngx-avatar-config.token';
import * as i0 from "@angular/core";
export class NgxAvatarConfigService {
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
}
NgxAvatarConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxAvatarConfigService, deps: [{ token: NGX_AVATAR_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NgxAvatarConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxAvatarConfigService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxAvatarConfigService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NGX_AVATAR_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF2YXRhci1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9uZ3gtYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFJOUQsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUdTLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO0lBQ2pDLENBQUM7SUFFRyxnQkFBZ0IsQ0FBQyxjQUE4QjtRQUNwRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtZQUN4RyxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDeEUsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RjtRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxlQUFlLENBQUMsYUFBdUI7UUFDNUMsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdEcsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsZUFBdUI7UUFDN0MsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDZCxvRUFBb0U7WUFDcEUsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW9CLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztZQUN0QyxlQUFlLENBQ2hCLENBQUM7SUFDSixDQUFDOzttSEEvQlUsc0JBQXNCLGtCQUd2QixpQkFBaUI7dUhBSGhCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVOzswQkFHTixRQUFROzswQkFDUixNQUFNOzJCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmd4QXZhdGFyQ29uZmlnIH0gZnJvbSAnLi9uZ3gtYXZhdGFyLWNvbmZpZyc7XG5pbXBvcnQgeyBOR1hfQVZBVEFSX0NPTkZJRyB9IGZyb20gJy4vbmd4LWF2YXRhci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hBdmF0YXJDb25maWdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE5HWF9BVkFUQVJfQ09ORklHKVxuICAgIHB1YmxpYyB1c2VyQ29uZmlnOiBOZ3hBdmF0YXJDb25maWcsXG4gICkge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyU291cmNlcyhkZWZhdWx0U291cmNlczogQXZhdGFyU291cmNlW10pOiBBdmF0YXJTb3VyY2VbXSB7XG4gICAgaWYgKHRoaXMudXNlckNvbmZpZyAmJiB0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlciAmJiB0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHVuaXF1ZVNvdXJjZXMgPSBbLi4ubmV3IFNldCh0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlcildO1xuICAgICAgY29uc3QgdmFsaWRTb3VyY2VzID0gdW5pcXVlU291cmNlcy5maWx0ZXIoc291cmNlID0+IGRlZmF1bHRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSkpO1xuICAgICAgcmV0dXJuIFsuLi52YWxpZFNvdXJjZXMsIC4uLmRlZmF1bHRTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gIXZhbGlkU291cmNlcy5pbmNsdWRlcyhzb3VyY2UpKV07XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0U291cmNlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXJDb2xvcnMoZGVmYXVsdENvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnVzZXJDb25maWcgJiYgdGhpcy51c2VyQ29uZmlnLmNvbG9ycyAmJiB0aGlzLnVzZXJDb25maWcuY29sb3JzLmxlbmd0aCAmJiB0aGlzLnVzZXJDb25maWcuY29sb3JzKSB8fFxuICAgICAgZGVmYXVsdENvbG9yc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FjaGVMaWZldGltZShkZWZhdWx0TGlmZXRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnVzZXJDb25maWcgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgaXNGaW5pdGUodGhpcy51c2VyQ29uZmlnLmNhY2hlTGlmZXRpbWVTZWNvbmQhKSAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY2FjaGVMaWZldGltZVNlY29uZCkgfHxcbiAgICAgIGRlZmF1bHRMaWZldGltZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==