/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
var /**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
AsyncSource = /** @class */ (function () {
    function AsyncSource(sourceId) {
        this.sourceId = sourceId;
    }
    return AsyncSource;
}());
/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @abstract
 */
export { AsyncSource };
if (false) {
    /** @type {?} */
    AsyncSource.prototype.sourceType;
    /** @type {?} */
    AsyncSource.prototype.sourceId;
    /**
     * @abstract
     * @param {?=} size
     * @return {?}
     */
    AsyncSource.prototype.getAvatar = function (size) { };
    /**
     * @abstract
     * @param {?} data
     * @param {?=} size
     * @return {?}
     */
    AsyncSource.prototype.processResponse = function (data, size) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMtc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2VzL2FzeW5jLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQTs7Ozs7O0lBR0UscUJBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0lBSXpDLGtCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7Ozs7OztJQU5DLGlDQUFrQzs7SUFFdEIsK0JBQXVCOzs7Ozs7SUFFbkMsc0RBQTBDOzs7Ozs7O0lBQzFDLGtFQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBDb250cmFjdCBvZiBhbGwgYXN5bmMgc291cmNlcy5cbiAqIEV2ZXJ5IGFzeW5jIHNvdXJjZSBtdXN0IGltcGxlbWVudCB0aGUgcHJvY2Vzc1Jlc3BvbnNlIG1ldGhvZCB0aGF0IGV4dHJhY3RzIHRoZSBhdmF0YXIgdXJsIGZyb20gdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFzeW5jU291cmNlIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIGFic3RyYWN0IGdldEF2YXRhcihzaXplPzogbnVtYmVyKTogc3RyaW5nO1xuICBhYnN0cmFjdCBwcm9jZXNzUmVzcG9uc2UoZGF0YTogYW55LCBzaXplPzogbnVtYmVyKTogc3RyaW5nO1xufVxuIl19