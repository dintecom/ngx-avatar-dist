/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 *  Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export class Facebook {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.FACEBOOK;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        return ('https://graph.facebook.com/' +
            `${this.sourceId}/picture?width=${size}&height=${size}`);
    }
}
if (false) {
    /** @type {?} */
    Facebook.prototype.sourceType;
    /** @type {?} */
    Facebook.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBTXBELE1BQU0sT0FBTyxRQUFROzs7O0lBR25CLFlBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFGMUIsZUFBVSxHQUFpQixZQUFZLENBQUMsUUFBUSxDQUFDO0lBRXBCLENBQUM7Ozs7O0lBRWhDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sQ0FDTCw2QkFBNkI7WUFDN0IsR0FBRyxJQUFJLENBQUMsUUFBUSxrQkFBa0IsSUFBSSxXQUFXLElBQUksRUFBRSxDQUN4RCxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7SUFWQyw4QkFBMEQ7O0lBRTlDLDRCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbi8qKlxuICogIEZhY2Vib29rIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBmYWNlYm9vayBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIEZhY2Vib29rIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkZBQ0VCT09LO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgK1xuICAgICAgYCR7dGhpcy5zb3VyY2VJZH0vcGljdHVyZT93aWR0aD0ke3NpemV9JmhlaWdodD0ke3NpemV9YFxuICAgICk7XG4gIH1cbn1cbiJdfQ==