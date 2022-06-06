import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AVATAR_CONFIG } from './avatar-config.token';
import { AvatarConfigService } from './avatar-config.service';
import * as i0 from "@angular/core";
export class AvatarModule {
    static forRoot(avatarConfig) {
        return {
            ngModule: AvatarModule,
            providers: [
                { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
            ]
        };
    }
}
AvatarModule.ɵfac = function AvatarModule_Factory(t) { return new (t || AvatarModule)(); };
AvatarModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AvatarModule });
AvatarModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [SourceFactory, AvatarService, AvatarConfigService], imports: [CommonModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [AvatarComponent],
                providers: [SourceFactory, AvatarService, AvatarConfigService],
                exports: [AvatarComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AvatarModule, { declarations: [AvatarComponent], imports: [CommonModule], exports: [AvatarComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9hdmF0YXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBUTlELE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBMkI7UUFDeEMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7YUFDdkU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7d0VBUlUsWUFBWTs4REFBWixZQUFZO21FQUhaLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxZQUZwRCxZQUFZO3VGQUtYLFlBQVk7Y0FOeEIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMvQixTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixDQUFDO2dCQUM5RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDM0I7O3dGQUNZLFlBQVksbUJBSlIsZUFBZSxhQURwQixZQUFZLGFBR1osZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBBdmF0YXJDb21wb25lbnQgfSBmcm9tICcuL2F2YXRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU291cmNlRmFjdG9yeSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UuZmFjdG9yeSc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlIH0gZnJvbSAnLi9hdmF0YXIuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJDb25maWcgfSBmcm9tICcuL2F2YXRhci1jb25maWcnO1xuaW1wb3J0IHsgQVZBVEFSX0NPTkZJRyB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBBdmF0YXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXZhdGFyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbU291cmNlRmFjdG9yeSwgQXZhdGFyU2VydmljZSwgQXZhdGFyQ29uZmlnU2VydmljZV0sXG4gIGV4cG9ydHM6IFtBdmF0YXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGF2YXRhckNvbmZpZz86IEF2YXRhckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXZhdGFyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBdmF0YXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBVkFUQVJfQ09ORklHLCB1c2VWYWx1ZTogYXZhdGFyQ29uZmlnID8gYXZhdGFyQ29uZmlnIDoge30gfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==