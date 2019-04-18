/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { AvatarSource } from './avatar-source.enum';
/**
 * Initials source impelementation.
 * return the initals of the given value
 */
var /**
 * Initials source impelementation.
 * return the initals of the given value
 */
Initials = /** @class */ (function () {
    function Initials(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.INITIALS;
    }
    /**
     * @param {?} initialsSize
     * @return {?}
     */
    Initials.prototype.getAvatar = /**
     * @param {?} initialsSize
     * @return {?}
     */
    function (initialsSize) {
        return this.getInitials(this.sourceId, initialsSize);
    };
    /**
     * Returns the initial letters of a name in a string.
     */
    /**
     * Returns the initial letters of a name in a string.
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    Initials.prototype.getInitials = /**
     * Returns the initial letters of a name in a string.
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    function (name, size) {
        name = name ? name.trim() : null;
        if (!name) {
            return '';
        }
        /** @type {?} */
        var initials = name.split(' ');
        if (size && size < initials.length) {
            return this.constructInitials(initials.slice(0, size));
        }
        else {
            return this.constructInitials(initials);
        }
    };
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     */
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @param {?} elements
     * @return {?}
     */
    Initials.prototype.constructInitials = /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        if (!elements || !elements.length) {
            return '';
        }
        return elements
            .filter(function (element) { return element && element.length > 0; })
            .map(function (element) { return element[0].toUpperCase(); })
            .join('');
    };
    return Initials;
}());
/**
 * Initials source impelementation.
 * return the initals of the given value
 */
export { Initials };
if (false) {
    /** @type {?} */
    Initials.prototype.sourceType;
    /** @type {?} */
    Initials.prototype.sourceId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvaW5pdGlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFNcEQ7Ozs7O0lBR0Usa0JBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFGMUIsZUFBVSxHQUFpQixZQUFZLENBQUMsUUFBUSxDQUFDO0lBRXBCLENBQUM7Ozs7O0lBRWhDLDRCQUFTOzs7O0lBQWhCLFVBQWlCLFlBQW9CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLDhCQUFXOzs7Ozs7SUFBbkIsVUFBb0IsSUFBWSxFQUFFLElBQVk7UUFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sRUFBRSxDQUFDO1NBQ1g7O1lBRUssUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRWhDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyxvQ0FBaUI7Ozs7O0lBQXpCLFVBQTBCLFFBQWtCO1FBQzFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLFFBQVE7YUFDWixNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQTdCLENBQTZCLENBQUM7YUFDaEQsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUF4QixDQUF3QixDQUFDO2FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQzs7Ozs7Ozs7SUF4Q0MsOEJBQTBEOztJQUU5Qyw0QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogSW5pdGlhbHMgc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqIHJldHVybiB0aGUgaW5pdGFscyBvZiB0aGUgZ2l2ZW4gdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIEluaXRpYWxzIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLklOSVRJQUxTO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoaW5pdGlhbHNTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEluaXRpYWxzKHRoaXMuc291cmNlSWQsIGluaXRpYWxzU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW5pdGlhbCBsZXR0ZXJzIG9mIGEgbmFtZSBpbiBhIHN0cmluZy5cbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHMobmFtZTogc3RyaW5nLCBzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIG5hbWUgPSBuYW1lID8gbmFtZS50cmltKCkgOiBudWxsO1xuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdGlhbHMgPSBuYW1lLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAoc2l6ZSAmJiBzaXplIDwgaW5pdGlhbHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RJbml0aWFscyhpbml0aWFscy5zbGljZSgwLCBzaXplKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdEluaXRpYWxzKGluaXRpYWxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgYSBwZXJzb24ncyBuYW1lIHN0cmluZyB0byBnZXQgdGhlIGluaXRpYWxzIG9mIGVhY2ggd29yZCBpbiB1cHBlcmNhc2UuXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdEluaXRpYWxzKGVsZW1lbnRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgaWYgKCFlbGVtZW50cyB8fCAhZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzXG4gICAgICAuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCA+IDApXG4gICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudFswXS50b1VwcGVyQ2FzZSgpKVxuICAgICAgLmpvaW4oJycpO1xuICB9XG59XG4iXX0=