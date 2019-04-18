/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
var /**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
Google = /** @class */ (function (_super) {
    tslib_1.__extends(Google, _super);
    function Google(sourceId) {
        var _this = _super.call(this, sourceId) || this;
        _this.sourceType = AvatarSource.GOOGLE;
        return _this;
    }
    /**
     * @return {?}
     */
    Google.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return "https://picasaweb.google.com/data/entry/api/user/" + this.sourceId + "?alt=json";
    };
    /**
     * Extract google avatar from json data
     */
    /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    Google.prototype.processResponse = /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    function (data, size) {
        /** @type {?} */
        var avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
    };
    return Google;
}(AsyncSource));
/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export { Google };
if (false) {
    /** @type {?} */
    Google.prototype.sourceType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL2dvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQU9wRDs7Ozs7O0lBQTRCLGtDQUFXO0lBR3JDLGdCQUFZLFFBQWdCO1FBQTVCLFlBQ0Usa0JBQU0sUUFBUSxDQUFDLFNBQ2hCO1FBSlEsZ0JBQVUsR0FBaUIsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7SUFJeEQsQ0FBQzs7OztJQUVNLDBCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLHNEQUNMLElBQUksQ0FBQyxRQUFRLGNBQ0osQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNJLGdDQUFlOzs7Ozs7SUFBdEIsVUFBdUIsSUFBUyxFQUFFLElBQWE7O1lBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEQsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUE0QixXQUFXLEdBc0J0Qzs7Ozs7Ozs7O0lBckJDLDRCQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBHb29nbGUgc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGdvb2dsZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZSBleHRlbmRzIEFzeW5jU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkdPT0dMRTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc291cmNlSWQpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhL2VudHJ5L2FwaS91c2VyLyR7XG4gICAgICB0aGlzLnNvdXJjZUlkXG4gICAgfT9hbHQ9anNvbmA7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBnb29nbGUgYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IGFueSwgc2l6ZT86IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgYXZhdGFyU3JjID0gZGF0YS5lbnRyeS5ncGhvdG8kdGh1bWJuYWlsLiR0O1xuICAgIGlmIChhdmF0YXJTcmMpIHtcbiAgICAgIHJldHVybiBhdmF0YXJTcmMucmVwbGFjZSgnczY0JywgJ3MnICsgc2l6ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=