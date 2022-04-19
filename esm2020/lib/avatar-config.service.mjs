import { Injectable, Inject, Optional } from '@angular/core';
import { AVATAR_CONFIG } from './avatar-config.token';
import * as i0 from "@angular/core";
export class AvatarConfigService {
    constructor(userConfig) {
        this.userConfig = userConfig;
    }
    getAvatarSources(defaultSources) {
        if (this.userConfig &&
            this.userConfig.sourcePriorityOrder &&
            this.userConfig.sourcePriorityOrder.length) {
            const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
            const validSources = uniqueSources.filter(source => defaultSources.includes(source));
            return [
                ...validSources,
                ...defaultSources.filter(source => !validSources.includes(source))
            ];
        }
        return defaultSources;
    }
    getAvatarColors(defaultColors) {
        return ((this.userConfig &&
            this.userConfig.colors &&
            this.userConfig.colors.length &&
            this.userConfig.colors) ||
            defaultColors);
    }
}
AvatarConfigService.ɵfac = function AvatarConfigService_Factory(t) { return new (t || AvatarConfigService)(i0.ɵɵinject(AVATAR_CONFIG, 8)); };
AvatarConfigService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AvatarConfigService, factory: AvatarConfigService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarConfigService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AVATAR_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL2F2YXRhci1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUl0RCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBR1MsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUM5QixDQUFDO0lBRUcsZ0JBQWdCLENBQUMsY0FBOEI7UUFDcEQsSUFDRSxJQUFJLENBQUMsVUFBVTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUMxQztZQUNBLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ2pELGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ2hDLENBQUM7WUFDRixPQUFPO2dCQUNMLEdBQUcsWUFBWTtnQkFDZixHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkUsQ0FBQztTQUNIO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVNLGVBQWUsQ0FBQyxhQUF1QjtRQUM1QyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3pCLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQzs7c0ZBakNVLG1CQUFtQixjQUdwQixhQUFhO3lFQUhaLG1CQUFtQixXQUFuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUQvQixVQUFVOztzQkFHTixRQUFROztzQkFDUixNQUFNO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuaW1wb3J0IHsgQVZBVEFSX0NPTkZJRyB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBBdmF0YXJDb25maWcgfSBmcm9tICcuL2F2YXRhci1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29uZmlnU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChBVkFUQVJfQ09ORklHKVxuICAgIHB1YmxpYyB1c2VyQ29uZmlnOiBBdmF0YXJDb25maWdcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXJTb3VyY2VzKGRlZmF1bHRTb3VyY2VzOiBBdmF0YXJTb3VyY2VbXSk6IEF2YXRhclNvdXJjZVtdIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnVzZXJDb25maWcgJiZcbiAgICAgIHRoaXMudXNlckNvbmZpZy5zb3VyY2VQcmlvcml0eU9yZGVyICYmXG4gICAgICB0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlci5sZW5ndGhcbiAgICApIHtcbiAgICAgIGNvbnN0IHVuaXF1ZVNvdXJjZXMgPSBbLi4ubmV3IFNldCh0aGlzLnVzZXJDb25maWcuc291cmNlUHJpb3JpdHlPcmRlcildO1xuICAgICAgY29uc3QgdmFsaWRTb3VyY2VzID0gdW5pcXVlU291cmNlcy5maWx0ZXIoc291cmNlID0+XG4gICAgICAgIGRlZmF1bHRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi52YWxpZFNvdXJjZXMsXG4gICAgICAgIC4uLmRlZmF1bHRTb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gIXZhbGlkU291cmNlcy5pbmNsdWRlcyhzb3VyY2UpKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTb3VyY2VzO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMudXNlckNvbmZpZyAmJlxuICAgICAgICB0aGlzLnVzZXJDb25maWcuY29sb3JzICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMubGVuZ3RoICYmXG4gICAgICAgIHRoaXMudXNlckNvbmZpZy5jb2xvcnMpIHx8XG4gICAgICBkZWZhdWx0Q29sb3JzXG4gICAgKTtcbiAgfVxufVxuIl19