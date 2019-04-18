/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import isRetina from 'is-retina';
import { Md5 } from 'ts-md5/dist/md5';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
export class Gravatar {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
        this.sourceType = AvatarSource.GRAVATAR;
        this.sourceId = value.match('^[a-f0-9]{32}$')
            ? value
            : Md5.hashStr(value).toString();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        /** @type {?} */
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}
if (false) {
    /** @type {?} */
    Gravatar.prototype.sourceType;
    /** @type {?} */
    Gravatar.prototype.sourceId;
    /** @type {?} */
    Gravatar.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvZ3JhdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQU1wRCxNQUFNLE9BQU8sUUFBUTs7OztJQUluQixZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUh2QixlQUFVLEdBQWlCLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFJeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQzNDLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsSUFBWTs7Y0FDckIsVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQy9DLE9BQU8sc0NBQ0wsSUFBSSxDQUFDLFFBQ1AsTUFBTSxVQUFVLFFBQVEsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7OztJQWZDLDhCQUEwRDs7SUFDMUQsNEJBQXdCOztJQUVaLHlCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1JldGluYSBmcm9tICdpcy1yZXRpbmEnO1xuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1L2Rpc3QvbWQ1JztcblxuaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBHcmF2YXRhciBzb3VyY2UgaW1wZWxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gZ3JhdmF0YXIgZW1haWxcbiAqL1xuZXhwb3J0IGNsYXNzIEdyYXZhdGFyIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkdSQVZBVEFSO1xuICBwdWJsaWMgc291cmNlSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlSWQgPSB2YWx1ZS5tYXRjaCgnXlthLWYwLTldezMyfSQnKVxuICAgICAgPyB2YWx1ZVxuICAgICAgOiBNZDUuaGFzaFN0cih2YWx1ZSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdmF0YXJTaXplID0gaXNSZXRpbmEoKSA/IHNpemUgKiAyIDogc2l6ZTtcbiAgICByZXR1cm4gYGh0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvJHtcbiAgICAgIHRoaXMuc291cmNlSWRcbiAgICB9P3M9JHthdmF0YXJTaXplfSZkPTQwNGA7XG4gIH1cbn1cbiJdfQ==