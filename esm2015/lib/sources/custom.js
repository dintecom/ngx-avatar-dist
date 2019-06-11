/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
export class Custom {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.CUSTOM;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return this.sourceId;
    }
}
if (false) {
    /** @type {?} */
    Custom.prototype.sourceType;
    /** @type {?} */
    Custom.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL2N1c3RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFNcEQsTUFBTSxPQUFPLE1BQU07Ozs7SUFHakIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFFbEIsQ0FBQzs7OztJQUVoQyxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjs7O0lBUEMsNEJBQXdEOztJQUU1QywwQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG4vKipcbiAqICBDdXN0b20gc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqICByZXR1cm4gY3VzdG9tIGltYWdlIGFzIGFuIGF2YXRhclxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbSBpbXBsZW1lbnRzIFNvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5DVVNUT007XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUlkOiBzdHJpbmcpIHt9XG5cbiAgcHVibGljIGdldEF2YXRhcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZUlkO1xuICB9XG59XG4iXX0=