/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 *  Value source impelementation.
 *  return the value as avatar
 */
var /**
 *  Value source impelementation.
 *  return the value as avatar
 */
Value = /** @class */ (function () {
    function Value(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.VALUE;
    }
    /**
     * @return {?}
     */
    Value.prototype.getAvatar = /**
     * @return {?}
     */
    function () {
        return this.sourceId;
    };
    return Value;
}());
/**
 *  Value source impelementation.
 *  return the value as avatar
 */
export { Value };
if (false) {
    /** @type {?} */
    Value.prototype.sourceType;
    /** @type {?} */
    Value.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFNcEQ7Ozs7O0lBR0UsZUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQzs7OztJQUVoQyx5QkFBUzs7O0lBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7Ozs7Ozs7O0lBUEMsMkJBQXVEOztJQUUzQyx5QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogIFZhbHVlIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiAgcmV0dXJuIHRoZSB2YWx1ZSBhcyBhdmF0YXJcbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLlZBTFVFO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VJZDtcbiAgfVxufVxuIl19