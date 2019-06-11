/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Twitter {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.TWITTER;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    getAvatar(size) {
        /** @type {?} */
        const twitterImgSize = this.getImageSize(size);
        return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
    }
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    getImageSize(size) {
        if (size <= 24) {
            return 'mini';
        }
        if (size <= 48) {
            return 'normal';
        }
        if (size <= 73) {
            return 'bigger';
        }
        return 'original';
    }
}
if (false) {
    /** @type {?} */
    Twitter.prototype.sourceType;
    /** @type {?} */
    Twitter.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvc291cmNlcy90d2l0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQU9wRCxNQUFNLE9BQU8sT0FBTzs7OztJQUdsQixZQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRjFCLGVBQVUsR0FBaUIsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUVuQixDQUFDOzs7OztJQUVoQyxTQUFTLENBQUMsSUFBWTs7Y0FDckIsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlDLE9BQU8sdUJBQ0wsSUFBSSxDQUFDLFFBQ1AsdUJBQXVCLGNBQWMsRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUNkLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUNkLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7SUExQkMsNkJBQXlEOztJQUU3QywyQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogIFR3aXR0ZXIgc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGdvb2dsZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIFR3aXR0ZXIgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuVFdJVFRFUjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlSWQ6IHN0cmluZykge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgdHdpdHRlckltZ1NpemUgPSB0aGlzLmdldEltYWdlU2l6ZShzaXplKTtcbiAgICByZXR1cm4gYGh0dHBzOi8vdHdpdHRlci5jb20vJHtcbiAgICAgIHRoaXMuc291cmNlSWRcbiAgICB9L3Byb2ZpbGVfaW1hZ2U/c2l6ZT0ke3R3aXR0ZXJJbWdTaXplfWA7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAoc2l6ZSA8PSAyNCkge1xuICAgICAgcmV0dXJuICdtaW5pJztcbiAgICB9XG5cbiAgICBpZiAoc2l6ZSA8PSA0OCkge1xuICAgICAgcmV0dXJuICdub3JtYWwnO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDczKSB7XG4gICAgICByZXR1cm4gJ2JpZ2dlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuICdvcmlnaW5hbCc7XG4gIH1cbn1cbiJdfQ==