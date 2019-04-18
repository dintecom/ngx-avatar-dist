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
var /**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
Gravatar = /** @class */ (function () {
    function Gravatar(value) {
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
    Gravatar.prototype.getAvatar = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        /** @type {?} */
        var avatarSize = isRetina() ? size * 2 : size;
        return "https://secure.gravatar.com/avatar/" + this.sourceId + "?s=" + avatarSize + "&d=404";
    };
    return Gravatar;
}());
/**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 */
export { Gravatar };
if (false) {
    /** @type {?} */
    Gravatar.prototype.sourceType;
    /** @type {?} */
    Gravatar.prototype.sourceId;
    /** @type {?} */
    Gravatar.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvZ3JhdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQU1wRDs7Ozs7SUFJRSxrQkFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIdkIsZUFBVSxHQUFpQixZQUFZLENBQUMsUUFBUSxDQUFDO1FBSXhELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUMzQyxDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRU0sNEJBQVM7Ozs7SUFBaEIsVUFBaUIsSUFBWTs7WUFDckIsVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQy9DLE9BQU8sd0NBQ0wsSUFBSSxDQUFDLFFBQVEsV0FDVCxVQUFVLFdBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7Ozs7Ozs7O0lBZkMsOEJBQTBEOztJQUMxRCw0QkFBd0I7O0lBRVoseUJBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzUmV0aW5hIGZyb20gJ2lzLXJldGluYSc7XG5pbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUvZGlzdC9tZDUnO1xuXG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogIEdyYXZhdGFyIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBncmF2YXRhciBlbWFpbFxuICovXG5leHBvcnQgY2xhc3MgR3JhdmF0YXIgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuR1JBVkFUQVI7XG4gIHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZCA9IHZhbHVlLm1hdGNoKCdeW2EtZjAtOV17MzJ9JCcpXG4gICAgICA/IHZhbHVlXG4gICAgICA6IE1kNS5oYXNoU3RyKHZhbHVlKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcihzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGF2YXRhclNpemUgPSBpc1JldGluYSgpID8gc2l6ZSAqIDIgOiBzaXplO1xuICAgIHJldHVybiBgaHR0cHM6Ly9zZWN1cmUuZ3JhdmF0YXIuY29tL2F2YXRhci8ke1xuICAgICAgdGhpcy5zb3VyY2VJZFxuICAgIH0/cz0ke2F2YXRhclNpemV9JmQ9NDA0YDtcbiAgfVxufVxuIl19