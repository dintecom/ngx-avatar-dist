/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Vkontakte source impelementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 * @type {?}
 */
var apiVersion = 5.8;
var Vkontakte = /** @class */ (function (_super) {
    tslib_1.__extends(Vkontakte, _super);
    function Vkontakte(sourceId) {
        var _this = _super.call(this, sourceId) || this;
        _this.sourceType = AvatarSource.VKONTAKTE;
        return _this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    Vkontakte.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var imgSize = this.getImageSize(size);
        return "https://api.vk.com/method/users.get?user_id=" + this.sourceId + "&v=" + apiVersion + "&fields=" + imgSize;
    };
    /**
     * extract vkontakte avatar from json data
     */
    /**
     * extract vkontakte avatar from json data
     * @param {?} data
     * @return {?}
     */
    Vkontakte.prototype.processResponse = /**
     * extract vkontakte avatar from json data
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // avatar key property is the size used to generate avatar url
        // size property is always the last key in the response object
        /** @type {?} */
        var sizeProperty = Object.keys(data['response'][0]).pop();
        // return avatar src
        return data['response'][0][sizeProperty];
    };
    /**
     * Returns image size related to vkontakte API
     */
    /**
     * Returns image size related to vkontakte API
     * @private
     * @param {?} size
     * @return {?}
     */
    Vkontakte.prototype.getImageSize = /**
     * Returns image size related to vkontakte API
     * @private
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (size <= 50) {
            return 'photo_50';
        }
        if (size <= 100) {
            return 'photo_100';
        }
        if (size <= 200) {
            return 'photo_200';
        }
        return 'photo_max';
    };
    return Vkontakte;
}(AsyncSource));
export { Vkontakte };
if (false) {
    /** @type {?} */
    Vkontakte.prototype.sourceType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmtvbnRha3RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL3Zrb250YWt0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7SUFPOUMsVUFBVSxHQUFHLEdBQUc7QUFDdEI7SUFBK0IscUNBQVc7SUFHeEMsbUJBQVksUUFBZ0I7UUFBNUIsWUFDRSxrQkFBTSxRQUFRLENBQUMsU0FDaEI7UUFKUSxnQkFBVSxHQUFpQixZQUFZLENBQUMsU0FBUyxDQUFDOztJQUkzRCxDQUFDOzs7OztJQUVNLDZCQUFTOzs7O0lBQWhCLFVBQWlCLElBQVk7O1lBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN2QyxPQUFPLGlEQUNMLElBQUksQ0FBQyxRQUFRLFdBQ1QsVUFBVSxnQkFBVyxPQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSxtQ0FBZTs7Ozs7SUFBdEIsVUFBdUIsSUFBUzs7OztZQUd4QixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFDM0Qsb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLGdDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsSUFBWTtRQUMvQixJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUVELElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQ2YsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBM0NELENBQStCLFdBQVcsR0EyQ3pDOzs7O0lBMUNDLCtCQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBWa29udGFrdGUgc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIHZrb250YWt0ZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuY29uc3QgYXBpVmVyc2lvbiA9IDUuODtcbmV4cG9ydCBjbGFzcyBWa29udGFrdGUgZXh0ZW5kcyBBc3luY1NvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5WS09OVEFLVEU7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBpbWdTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoc2l6ZSk7XG4gICAgcmV0dXJuIGBodHRwczovL2FwaS52ay5jb20vbWV0aG9kL3VzZXJzLmdldD91c2VyX2lkPSR7XG4gICAgICB0aGlzLnNvdXJjZUlkXG4gICAgfSZ2PSR7YXBpVmVyc2lvbn0mZmllbGRzPSR7aW1nU2l6ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIGV4dHJhY3QgdmtvbnRha3RlIGF2YXRhciBmcm9tIGpzb24gZGF0YVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NSZXNwb25zZShkYXRhOiBhbnkpOiBzdHJpbmcge1xuICAgIC8vIGF2YXRhciBrZXkgcHJvcGVydHkgaXMgdGhlIHNpemUgdXNlZCB0byBnZW5lcmF0ZSBhdmF0YXIgdXJsXG4gICAgLy8gc2l6ZSBwcm9wZXJ0eSBpcyBhbHdheXMgdGhlIGxhc3Qga2V5IGluIHRoZSByZXNwb25zZSBvYmplY3RcbiAgICBjb25zdCBzaXplUHJvcGVydHkgPSBPYmplY3Qua2V5cyhkYXRhWydyZXNwb25zZSddWzBdKS5wb3AoKTtcbiAgICAvLyByZXR1cm4gYXZhdGFyIHNyY1xuICAgIHJldHVybiBkYXRhWydyZXNwb25zZSddWzBdW3NpemVQcm9wZXJ0eV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbWFnZSBzaXplIHJlbGF0ZWQgdG8gdmtvbnRha3RlIEFQSVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoc2l6ZSA8PSA1MCkge1xuICAgICAgcmV0dXJuICdwaG90b181MCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMTAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzEwMCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMjAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzIwMCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICdwaG90b19tYXgnO1xuICB9XG59XG4iXX0=