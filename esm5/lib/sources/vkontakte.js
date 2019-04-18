/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
     * @param {?} size
     * @return {?}
     */
    Vkontakte.prototype.getImageSize = /**
     * Returns image size related to vkontakte API
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmtvbnRha3RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL3Zrb250YWt0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7SUFPOUMsVUFBVSxHQUFHLEdBQUc7QUFDdEI7SUFBK0IscUNBQVc7SUFHeEMsbUJBQVksUUFBZ0I7UUFBNUIsWUFDRSxrQkFBTSxRQUFRLENBQUMsU0FDaEI7UUFKUSxnQkFBVSxHQUFpQixZQUFZLENBQUMsU0FBUyxDQUFDOztJQUkzRCxDQUFDOzs7OztJQUVNLDZCQUFTOzs7O0lBQWhCLFVBQWlCLElBQVk7O1lBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN2QyxPQUFPLGlEQUNMLElBQUksQ0FBQyxRQUFRLFdBQ1QsVUFBVSxnQkFBVyxPQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSxtQ0FBZTs7Ozs7SUFBdEIsVUFBdUIsSUFBUzs7OztZQUd4QixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFDM0Qsb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssZ0NBQVk7Ozs7O0lBQXBCLFVBQXFCLElBQVk7UUFDL0IsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFFRCxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQztTQUNwQjtRQUVELElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUErQixXQUFXLEdBMkN6Qzs7OztJQTFDQywrQkFBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vYXN5bmMtc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiAgVmtvbnRha3RlIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiB2a29udGFrdGUgaWRlbnRpZmllclxuICogIGFuZCBpbWFnZSBzaXplXG4gKi9cbmNvbnN0IGFwaVZlcnNpb24gPSA1Ljg7XG5leHBvcnQgY2xhc3MgVmtvbnRha3RlIGV4dGVuZHMgQXN5bmNTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuVktPTlRBS1RFO1xuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzb3VyY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgaW1nU2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHNpemUpO1xuICAgIHJldHVybiBgaHR0cHM6Ly9hcGkudmsuY29tL21ldGhvZC91c2Vycy5nZXQ/dXNlcl9pZD0ke1xuICAgICAgdGhpcy5zb3VyY2VJZFxuICAgIH0mdj0ke2FwaVZlcnNpb259JmZpZWxkcz0ke2ltZ1NpemV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBleHRyYWN0IHZrb250YWt0ZSBhdmF0YXIgZnJvbSBqc29uIGRhdGFcbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzUmVzcG9uc2UoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAvLyBhdmF0YXIga2V5IHByb3BlcnR5IGlzIHRoZSBzaXplIHVzZWQgdG8gZ2VuZXJhdGUgYXZhdGFyIHVybFxuICAgIC8vIHNpemUgcHJvcGVydHkgaXMgYWx3YXlzIHRoZSBsYXN0IGtleSBpbiB0aGUgcmVzcG9uc2Ugb2JqZWN0XG4gICAgY29uc3Qgc2l6ZVByb3BlcnR5ID0gT2JqZWN0LmtleXMoZGF0YVsncmVzcG9uc2UnXVswXSkucG9wKCk7XG4gICAgLy8gcmV0dXJuIGF2YXRhciBzcmNcbiAgICByZXR1cm4gZGF0YVsncmVzcG9uc2UnXVswXVtzaXplUHJvcGVydHldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaW1hZ2Ugc2l6ZSByZWxhdGVkIHRvIHZrb250YWt0ZSBBUElcbiAgICovXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHNpemUgPD0gNTApIHtcbiAgICAgIHJldHVybiAncGhvdG9fNTAnO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDEwMCkge1xuICAgICAgcmV0dXJuICdwaG90b18xMDAnO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDIwMCkge1xuICAgICAgcmV0dXJuICdwaG90b18yMDAnO1xuICAgIH1cblxuICAgIHJldHVybiAncGhvdG9fbWF4JztcbiAgfVxufVxuIl19