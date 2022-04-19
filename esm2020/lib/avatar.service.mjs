import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvatarConfigService } from './avatar-config.service';
import { AvatarSource } from './sources/avatar-source.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./avatar-config.service";
/**
 * list of Supported avatar sources
 */
export const defaultSources = [
    AvatarSource.FACEBOOK,
    AvatarSource.GOOGLE,
    AvatarSource.TWITTER,
    AvatarSource.INSTAGRAM,
    AvatarSource.VKONTAKTE,
    AvatarSource.SKYPE,
    AvatarSource.GRAVATAR,
    AvatarSource.GITHUB,
    AvatarSource.CUSTOM,
    AvatarSource.INITIALS,
    AvatarSource.VALUE
];
/**
 * list of default colors
 */
export const defaultColors = [
    '#1abc9c',
    '#3498db',
    '#f1c40f',
    '#8e44ad',
    '#e74c3c',
    '#d35400',
    '#2c3e50',
    '#7f8c8d'
];
/**
 * Provides utilities methods related to Avatar component
 */
export class AvatarService {
    constructor(http, avatarConfigService) {
        this.http = http;
        this.avatarConfigService = avatarConfigService;
        this.avatarSources = defaultSources;
        this.avatarColors = defaultColors;
        this.failedSources = new Map();
        this.overrideAvatarSources();
        this.overrideAvatarColors();
    }
    fetchAvatar(avatarUrl) {
        return this.http.get(avatarUrl);
    }
    getRandomColor(avatarText) {
        if (!avatarText) {
            return 'transparent';
        }
        const asciiCodeSum = this.calculateAsciiCode(avatarText);
        return this.avatarColors[asciiCodeSum % this.avatarColors.length];
    }
    compareSources(sourceType1, sourceType2) {
        return (this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2));
    }
    isSource(source) {
        return this.avatarSources.includes(source);
    }
    isTextAvatar(sourceType) {
        return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
    }
    buildSourceKey(source) {
        return source.sourceType + '-' + source.sourceId;
    }
    sourceHasFailedBefore(source) {
        return this.failedSources.has(this.buildSourceKey(source));
    }
    markSourceAsFailed(source) {
        this.failedSources.set(this.buildSourceKey(source), source);
    }
    overrideAvatarSources() {
        this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
    }
    overrideAvatarColors() {
        this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
    }
    calculateAsciiCode(value) {
        return value
            .split('')
            .map(letter => letter.charCodeAt(0))
            .reduce((previous, current) => previous + current);
    }
    getSourcePriority(sourceType) {
        return this.avatarSources.indexOf(sourceType);
    }
}
AvatarService.ɵfac = function AvatarService_Factory(t) { return new (t || AvatarService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AvatarConfigService)); };
AvatarService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AvatarService, factory: AvatarService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarService, [{
        type: Injectable
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AvatarConfigService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvYXZhdGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBRzVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzVCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxPQUFPO0lBQ3BCLFlBQVksQ0FBQyxTQUFTO0lBQ3RCLFlBQVksQ0FBQyxTQUFTO0lBQ3RCLFlBQVksQ0FBQyxLQUFLO0lBQ2xCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxLQUFLO0NBQ25CLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUMzQixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWLENBQUM7QUFFRjs7R0FFRztBQUVILE1BQU0sT0FBTyxhQUFhO0lBTXhCLFlBQ1UsSUFBZ0IsRUFDaEIsbUJBQXdDO1FBRHhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVAzQyxrQkFBYSxHQUFtQixjQUFjLENBQUM7UUFDL0MsaUJBQVksR0FBYSxhQUFhLENBQUM7UUFFN0Isa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQU16RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sV0FBVyxDQUFDLFNBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLGNBQWMsQ0FBQyxVQUFrQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxhQUFhLENBQUM7U0FDdEI7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSxjQUFjLENBQ25CLFdBQXlCLEVBQ3pCLFdBQXlCO1FBRXpCLE9BQU8sQ0FDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVNLFFBQVEsQ0FBQyxNQUFjO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBc0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxZQUFZLENBQUMsVUFBd0I7UUFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8sY0FBYyxDQUFDLE1BQWM7UUFDbkMsT0FBTyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ25ELENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxNQUFjO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FDNUQsY0FBYyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sa0JBQWtCLENBQUMsS0FBYTtRQUN0QyxPQUFPLEtBQUs7YUFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFVBQXdCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7MEVBMUVVLGFBQWE7bUVBQWIsYUFBYSxXQUFiLGFBQWE7dUZBQWIsYUFBYTtjQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBdmF0YXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9hdmF0YXItY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcblxuLyoqXG4gKiBsaXN0IG9mIFN1cHBvcnRlZCBhdmF0YXIgc291cmNlc1xuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFNvdXJjZXMgPSBbXG4gIEF2YXRhclNvdXJjZS5GQUNFQk9PSyxcbiAgQXZhdGFyU291cmNlLkdPT0dMRSxcbiAgQXZhdGFyU291cmNlLlRXSVRURVIsXG4gIEF2YXRhclNvdXJjZS5JTlNUQUdSQU0sXG4gIEF2YXRhclNvdXJjZS5WS09OVEFLVEUsXG4gIEF2YXRhclNvdXJjZS5TS1lQRSxcbiAgQXZhdGFyU291cmNlLkdSQVZBVEFSLFxuICBBdmF0YXJTb3VyY2UuR0lUSFVCLFxuICBBdmF0YXJTb3VyY2UuQ1VTVE9NLFxuICBBdmF0YXJTb3VyY2UuSU5JVElBTFMsXG4gIEF2YXRhclNvdXJjZS5WQUxVRVxuXTtcblxuLyoqXG4gKiBsaXN0IG9mIGRlZmF1bHQgY29sb3JzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3JzID0gW1xuICAnIzFhYmM5YycsXG4gICcjMzQ5OGRiJyxcbiAgJyNmMWM0MGYnLFxuICAnIzhlNDRhZCcsXG4gICcjZTc0YzNjJyxcbiAgJyNkMzU0MDAnLFxuICAnIzJjM2U1MCcsXG4gICcjN2Y4YzhkJ1xuXTtcblxuLyoqXG4gKiBQcm92aWRlcyB1dGlsaXRpZXMgbWV0aG9kcyByZWxhdGVkIHRvIEF2YXRhciBjb21wb25lbnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhclNlcnZpY2Uge1xuICBwdWJsaWMgYXZhdGFyU291cmNlczogQXZhdGFyU291cmNlW10gPSBkZWZhdWx0U291cmNlcztcbiAgcHVibGljIGF2YXRhckNvbG9yczogc3RyaW5nW10gPSBkZWZhdWx0Q29sb3JzO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZmFpbGVkU291cmNlcyA9IG5ldyBNYXA8c3RyaW5nLCBTb3VyY2U+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgYXZhdGFyQ29uZmlnU2VydmljZTogQXZhdGFyQ29uZmlnU2VydmljZVxuICApIHtcbiAgICB0aGlzLm92ZXJyaWRlQXZhdGFyU291cmNlcygpO1xuICAgIHRoaXMub3ZlcnJpZGVBdmF0YXJDb2xvcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBmZXRjaEF2YXRhcihhdmF0YXJVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGF2YXRhclVybCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWF2YXRhclRleHQpIHtcbiAgICAgIHJldHVybiAndHJhbnNwYXJlbnQnO1xuICAgIH1cbiAgICBjb25zdCBhc2NpaUNvZGVTdW0gPSB0aGlzLmNhbGN1bGF0ZUFzY2lpQ29kZShhdmF0YXJUZXh0KTtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJDb2xvcnNbYXNjaWlDb2RlU3VtICUgdGhpcy5hdmF0YXJDb2xvcnMubGVuZ3RoXTtcbiAgfVxuXG4gIHB1YmxpYyBjb21wYXJlU291cmNlcyhcbiAgICBzb3VyY2VUeXBlMTogQXZhdGFyU291cmNlLFxuICAgIHNvdXJjZVR5cGUyOiBBdmF0YXJTb3VyY2VcbiAgKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRTb3VyY2VQcmlvcml0eShzb3VyY2VUeXBlMSkgLSB0aGlzLmdldFNvdXJjZVByaW9yaXR5KHNvdXJjZVR5cGUyKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNTb3VyY2Uoc291cmNlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hdmF0YXJTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZSBhcyBBdmF0YXJTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGlzVGV4dEF2YXRhcihzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW0F2YXRhclNvdXJjZS5JTklUSUFMUywgQXZhdGFyU291cmNlLlZBTFVFXS5pbmNsdWRlcyhzb3VyY2VUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTb3VyY2VLZXkoc291cmNlOiBTb3VyY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBzb3VyY2Uuc291cmNlVHlwZSArICctJyArIHNvdXJjZS5zb3VyY2VJZDtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VIYXNGYWlsZWRCZWZvcmUoc291cmNlOiBTb3VyY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mYWlsZWRTb3VyY2VzLmhhcyh0aGlzLmJ1aWxkU291cmNlS2V5KHNvdXJjZSkpO1xuICB9XG5cbiAgcHVibGljIG1hcmtTb3VyY2VBc0ZhaWxlZChzb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuZmFpbGVkU291cmNlcy5zZXQodGhpcy5idWlsZFNvdXJjZUtleShzb3VyY2UpLCBzb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTb3VyY2VzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhclNvdXJjZXMoXG4gICAgICBkZWZhdWx0U291cmNlc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJyaWRlQXZhdGFyQ29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyQ29sb3JzID0gdGhpcy5hdmF0YXJDb25maWdTZXJ2aWNlLmdldEF2YXRhckNvbG9ycyhkZWZhdWx0Q29sb3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQXNjaWlDb2RlKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcChsZXR0ZXIgPT4gbGV0dGVyLmNoYXJDb2RlQXQoMCkpXG4gICAgICAucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMgKyBjdXJyZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U291cmNlUHJpb3JpdHkoc291cmNlVHlwZTogQXZhdGFyU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXZhdGFyU291cmNlcy5pbmRleE9mKHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=