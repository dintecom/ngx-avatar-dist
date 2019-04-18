/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AvatarComponent } from './avatar.component';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AVATAR_CONFIG } from './avatar-config.token';
import { AvatarConfigService } from './avatar-config.service';
export class AvatarModule {
    /**
     * @param {?=} avatarConfig
     * @return {?}
     */
    static forRoot(avatarConfig) {
        return {
            ngModule: AvatarModule,
            providers: [
                { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
            ]
        };
    }
}
AvatarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule],
                declarations: [AvatarComponent],
                providers: [SourceFactory, AvatarService, AvatarConfigService],
                exports: [AvatarComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVE5RCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUEyQjtRQUN4QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTthQUN2RTtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFkRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7Z0JBQzlELE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9hdmF0YXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyQ29uZmlnIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnJztcbmltcG9ydCB7IEFWQVRBUl9DT05GSUcgfSBmcm9tICcuL2F2YXRhci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgQXZhdGFyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLWNvbmZpZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0F2YXRhckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1NvdXJjZUZhY3RvcnksIEF2YXRhclNlcnZpY2UsIEF2YXRhckNvbmZpZ1NlcnZpY2VdLFxuICBleHBvcnRzOiBbQXZhdGFyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChhdmF0YXJDb25maWc/OiBBdmF0YXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEF2YXRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFWQVRBUl9DT05GSUcsIHVzZVZhbHVlOiBhdmF0YXJDb25maWcgPyBhdmF0YXJDb25maWcgOiB7fSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19