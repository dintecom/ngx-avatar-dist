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
var SourceFactory = /** @class */ (function () {
    function SourceFactory() {
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
    SourceFactory.prototype.newInstance = /**
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    function (sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    };
    SourceFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SourceFactory.ctorParameters = function () { return []; };
    return SourceFactory;
}());
export { SourceFactory };
if (false) {
    /** @type {?} */
    SourceFactory.prototype.sources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvc291cmNlLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQU9wRDtJQUlFO1FBRlEsWUFBTyxHQUFxQyxFQUFFLENBQUM7UUFHckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUVNLG1DQUFXOzs7OztJQUFsQixVQUFtQixVQUF3QixFQUFFLFdBQW1CO1FBQzlELE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7O2dCQW5CRixVQUFVOzs7O0lBb0JYLG9CQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FuQlksYUFBYTs7O0lBQ3hCLGdDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgRmFjZWJvb2sgfSBmcm9tICcuL2ZhY2Vib29rJztcbmltcG9ydCB7IFR3aXR0ZXIgfSBmcm9tICcuL3R3aXR0ZXInO1xuaW1wb3J0IHsgR29vZ2xlIH0gZnJvbSAnLi9nb29nbGUnO1xuaW1wb3J0IHsgQ3VzdG9tIH0gZnJvbSAnLi9jdXN0b20nO1xuaW1wb3J0IHsgSW5pdGlhbHMgfSBmcm9tICcuL2luaXRpYWxzJztcbmltcG9ydCB7IEdyYXZhdGFyIH0gZnJvbSAnLi9ncmF2YXRhcic7XG5pbXBvcnQgeyBTa3lwZSB9IGZyb20gJy4vc2t5cGUnO1xuaW1wb3J0IHsgVmFsdWUgfSBmcm9tICcuL3ZhbHVlJztcbmltcG9ydCB7IFZrb250YWt0ZSB9IGZyb20gJy4vdmtvbnRha3RlJztcbmltcG9ydCB7IEdpdGh1YiB9IGZyb20gJy4vZ2l0aHViJztcbmltcG9ydCB7IFNvdXJjZUNyZWF0b3IgfSBmcm9tICcuL3NvdXJjZS5jcmVhdG9yJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBGYWN0b3J5IGNsYXNzIHRoYXQgaW1wbGVtZW50cyBmYWN0b3J5IG1ldGhvZCBwYXR0ZXJuLlxuICogVXNlZCB0byBjcmVhdGUgU291cmNlIGltcGxlbWVudGF0aW9uIGNsYXNzIGJhc2VkXG4gKiBvbiB0aGUgc291cmNlIFR5cGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvdXJjZUZhY3Rvcnkge1xuICBwcml2YXRlIHNvdXJjZXM6IHsgW2tleTogc3RyaW5nXTogU291cmNlQ3JlYXRvciB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5GQUNFQk9PS10gPSBGYWNlYm9vaztcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLlRXSVRURVJdID0gVHdpdHRlcjtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkdPT0dMRV0gPSBHb29nbGU7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5TS1lQRV0gPSBTa3lwZTtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkdSQVZBVEFSXSA9IEdyYXZhdGFyO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuQ1VTVE9NXSA9IEN1c3RvbTtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLklOSVRJQUxTXSA9IEluaXRpYWxzO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuVkFMVUVdID0gVmFsdWU7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5WS09OVEFLVEVdID0gVmtvbnRha3RlO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuR0lUSFVCXSA9IEdpdGh1YjtcbiAgfVxuXG4gIHB1YmxpYyBuZXdJbnN0YW5jZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UsIHNvdXJjZVZhbHVlOiBzdHJpbmcpOiBTb3VyY2Uge1xuICAgIHJldHVybiBuZXcgdGhpcy5zb3VyY2VzW3NvdXJjZVR5cGVdKHNvdXJjZVZhbHVlKTtcbiAgfVxufVxuIl19