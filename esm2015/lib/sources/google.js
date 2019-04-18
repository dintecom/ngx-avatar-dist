/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Google extends AsyncSource {
    /**
     * @param {?} sourceId
     */
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GOOGLE;
    }
    /**
     * @return {?}
     */
    getAvatar() {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }
    /**
     * Extract google avatar from json data
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    processResponse(data, size) {
        /** @type {?} */
        const avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
    }
}
if (false) {
    /** @type {?} */
    Google.prototype.sourceType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL2dvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBT3BELE1BQU0sT0FBTyxNQUFPLFNBQVEsV0FBVzs7OztJQUdyQyxZQUFZLFFBQWdCO1FBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhULGVBQVUsR0FBaUIsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUl4RCxDQUFDOzs7O0lBRU0sU0FBUztRQUNkLE9BQU8sb0RBQ0wsSUFBSSxDQUFDLFFBQ1AsV0FBVyxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQUtNLGVBQWUsQ0FBQyxJQUFTLEVBQUUsSUFBYTs7Y0FDdkMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRCxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztDQUNGOzs7SUFyQkMsNEJBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL2FzeW5jLXNvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogIEdvb2dsZSBzb3VyY2UgaW1wZWxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gZ29vZ2xlIGlkZW50aWZpZXJcbiAqICBhbmQgaW1hZ2Ugc2l6ZVxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlIGV4dGVuZHMgQXN5bmNTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuR09PR0xFO1xuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzb3VyY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZW50cnkvYXBpL3VzZXIvJHtcbiAgICAgIHRoaXMuc291cmNlSWRcbiAgICB9P2FsdD1qc29uYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGdvb2dsZSBhdmF0YXIgZnJvbSBqc29uIGRhdGFcbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzUmVzcG9uc2UoZGF0YTogYW55LCBzaXplPzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdmF0YXJTcmMgPSBkYXRhLmVudHJ5LmdwaG90byR0aHVtYm5haWwuJHQ7XG4gICAgaWYgKGF2YXRhclNyYykge1xuICAgICAgcmV0dXJuIGF2YXRhclNyYy5yZXBsYWNlKCdzNjQnLCAncycgKyBzaXplKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==