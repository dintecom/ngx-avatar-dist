/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Facebook } from './facebook';
import { Twitter } from './twitter';
import { Google } from './google';
import { Custom } from './custom';
import { Initials } from './initials';
import { Gravatar } from './gravatar';
import { Skype } from './skype';
import { Value } from './value';
import { Vkontakte } from './vkontakte';
import { Github } from './github';
import { AvatarSource } from './avatar-source.enum';
/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
export class SourceFactory {
    constructor() {
        this.sources = {};
        this.sources[AvatarSource.FACEBOOK] = Facebook;
        this.sources[AvatarSource.TWITTER] = Twitter;
        this.sources[AvatarSource.GOOGLE] = Google;
        this.sources[AvatarSource.SKYPE] = Skype;
        this.sources[AvatarSource.GRAVATAR] = Gravatar;
        this.sources[AvatarSource.CUSTOM] = Custom;
        this.sources[AvatarSource.INITIALS] = Initials;
        this.sources[AvatarSource.VALUE] = Value;
        this.sources[AvatarSource.VKONTAKTE] = Vkontakte;
        this.sources[AvatarSource.GITHUB] = Github;
    }
    /**
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    newInstance(sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    }
}
SourceFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SourceFactory.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    SourceFactory.prototype.sources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvc291cmNlLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQVFwRCxNQUFNLE9BQU8sYUFBYTtJQUd4QjtRQUZRLFlBQU8sR0FBcUMsRUFBRSxDQUFDO1FBR3JELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFTSxXQUFXLENBQUMsVUFBd0IsRUFBRSxXQUFtQjtRQUM5RCxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7WUFuQkYsVUFBVTs7Ozs7O0lBRVQsZ0NBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBGYWNlYm9vayB9IGZyb20gJy4vZmFjZWJvb2snO1xuaW1wb3J0IHsgVHdpdHRlciB9IGZyb20gJy4vdHdpdHRlcic7XG5pbXBvcnQgeyBHb29nbGUgfSBmcm9tICcuL2dvb2dsZSc7XG5pbXBvcnQgeyBDdXN0b20gfSBmcm9tICcuL2N1c3RvbSc7XG5pbXBvcnQgeyBJbml0aWFscyB9IGZyb20gJy4vaW5pdGlhbHMnO1xuaW1wb3J0IHsgR3JhdmF0YXIgfSBmcm9tICcuL2dyYXZhdGFyJztcbmltcG9ydCB7IFNreXBlIH0gZnJvbSAnLi9za3lwZSc7XG5pbXBvcnQgeyBWYWx1ZSB9IGZyb20gJy4vdmFsdWUnO1xuaW1wb3J0IHsgVmtvbnRha3RlIH0gZnJvbSAnLi92a29udGFrdGUnO1xuaW1wb3J0IHsgR2l0aHViIH0gZnJvbSAnLi9naXRodWInO1xuaW1wb3J0IHsgU291cmNlQ3JlYXRvciB9IGZyb20gJy4vc291cmNlLmNyZWF0b3InO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqIEZhY3RvcnkgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIGZhY3RvcnkgbWV0aG9kIHBhdHRlcm4uXG4gKiBVc2VkIHRvIGNyZWF0ZSBTb3VyY2UgaW1wbGVtZW50YXRpb24gY2xhc3MgYmFzZWRcbiAqIG9uIHRoZSBzb3VyY2UgVHlwZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU291cmNlRmFjdG9yeSB7XG4gIHByaXZhdGUgc291cmNlczogeyBba2V5OiBzdHJpbmddOiBTb3VyY2VDcmVhdG9yIH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkZBQ0VCT09LXSA9IEZhY2Vib29rO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuVFdJVFRFUl0gPSBUd2l0dGVyO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuR09PR0xFXSA9IEdvb2dsZTtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLlNLWVBFXSA9IFNreXBlO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuR1JBVkFUQVJdID0gR3JhdmF0YXI7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5DVVNUT01dID0gQ3VzdG9tO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuSU5JVElBTFNdID0gSW5pdGlhbHM7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5WQUxVRV0gPSBWYWx1ZTtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLlZLT05UQUtURV0gPSBWa29udGFrdGU7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5HSVRIVUJdID0gR2l0aHViO1xuICB9XG5cbiAgcHVibGljIG5ld0luc3RhbmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSwgc291cmNlVmFsdWU6IHN0cmluZyk6IFNvdXJjZSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLnNvdXJjZXNbc291cmNlVHlwZV0oc291cmNlVmFsdWUpO1xuICB9XG59XG4iXX0=