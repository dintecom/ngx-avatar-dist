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
AvatarModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [SourceFactory, AvatarService, AvatarConfigService], imports: [[CommonModule]] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9hdmF0YXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBUTlELE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBMkI7UUFDeEMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7YUFDdkU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7d0VBUlUsWUFBWTs4REFBWixZQUFZO21FQUhaLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxZQUZyRCxDQUFDLFlBQVksQ0FBQzt1RkFLWixZQUFZO2NBTnhCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQztnQkFDOUQsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzNCOzt3RkFDWSxZQUFZLG1CQUpSLGVBQWUsYUFEcEIsWUFBWSxhQUdaLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9hdmF0YXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyQ29uZmlnIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnJztcbmltcG9ydCB7IEFWQVRBUl9DT05GSUcgfSBmcm9tICcuL2F2YXRhci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgQXZhdGFyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0F2YXRhckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1NvdXJjZUZhY3RvcnksIEF2YXRhclNlcnZpY2UsIEF2YXRhckNvbmZpZ1NlcnZpY2VdLFxuICBleHBvcnRzOiBbQXZhdGFyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChhdmF0YXJDb25maWc/OiBBdmF0YXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEF2YXRhck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQXZhdGFyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQVZBVEFSX0NPTkZJRywgdXNlVmFsdWU6IGF2YXRhckNvbmZpZyA/IGF2YXRhckNvbmZpZyA6IHt9IH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=