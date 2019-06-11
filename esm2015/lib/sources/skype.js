/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 *  Skype source impelementation.
 *  Fetch avatar source based on skype identifier
 */
export class Skype {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.SKYPE;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
    }
}
if (false) {
    /** @type {?} */
    Skype.prototype.sourceType;
    /** @type {?} */
    Skype.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvc2t5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFLcEQsTUFBTSxPQUFPLEtBQUs7Ozs7SUFHaEIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQzs7OztJQUVoQyxTQUFTO1FBQ2QsT0FBTywrQkFBK0IsSUFBSSxDQUFDLFFBQVEsaUJBQWlCLENBQUM7SUFDdkUsQ0FBQztDQUNGOzs7SUFQQywyQkFBdUQ7O0lBRTNDLHlCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbi8qKlxuICogIFNreXBlIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBza3lwZSBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBjbGFzcyBTa3lwZSBpbXBsZW1lbnRzIFNvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5TS1lQRTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlSWQ6IHN0cmluZykge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBodHRwczovL2FwaS5za3lwZS5jb20vdXNlcnMvJHt0aGlzLnNvdXJjZUlkfS9wcm9maWxlL2F2YXRhcmA7XG4gIH1cbn1cbiJdfQ==