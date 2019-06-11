/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @private
     * @param {?} name
     * @param {?} size
     * @return {?}
     */
    Initials.prototype.getInitials = /**
     * Returns the initial letters of a name in a string.
     * @private
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
     * @private
     * @param {?} elements
     * @return {?}
     */
    Initials.prototype.constructInitials = /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     * @private
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        if (!elements || !elements.length) {
            return '';
        }
        return elements
            .filter((/**
         * @param {?} element
         * @return {?}
         */
        function (element) { return element && element.length > 0; }))
            .map((/**
         * @param {?} element
         * @return {?}
         */
        function (element) { return element[0].toUpperCase(); }))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZXMvaW5pdGlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFNcEQ7Ozs7O0lBR0Usa0JBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFGMUIsZUFBVSxHQUFpQixZQUFZLENBQUMsUUFBUSxDQUFDO0lBRXBCLENBQUM7Ozs7O0lBRWhDLDRCQUFTOzs7O0lBQWhCLFVBQWlCLFlBQW9CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRzs7Ozs7Ozs7SUFDSyw4QkFBVzs7Ozs7OztJQUFuQixVQUFvQixJQUFZLEVBQUUsSUFBWTtRQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVqQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDWDs7WUFFSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFFaEMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSyxvQ0FBaUI7Ozs7OztJQUF6QixVQUEwQixRQUFrQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxRQUFRO2FBQ1osTUFBTTs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUE3QixDQUE2QixFQUFDO2FBQ2hELEdBQUc7Ozs7UUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBeEIsQ0FBd0IsRUFBQzthQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7Ozs7Ozs7O0lBeENDLDhCQUEwRDs7SUFFOUMsNEJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqIEluaXRpYWxzIHNvdXJjZSBpbXBlbGVtZW50YXRpb24uXG4gKiByZXR1cm4gdGhlIGluaXRhbHMgb2YgdGhlIGdpdmVuIHZhbHVlXG4gKi9cbmV4cG9ydCBjbGFzcyBJbml0aWFscyBpbXBsZW1lbnRzIFNvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5JTklUSUFMUztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlSWQ6IHN0cmluZykge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyKGluaXRpYWxzU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJbml0aWFscyh0aGlzLnNvdXJjZUlkLCBpbml0aWFsc1NpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluaXRpYWwgbGV0dGVycyBvZiBhIG5hbWUgaW4gYSBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBuYW1lID0gbmFtZSA/IG5hbWUudHJpbSgpIDogbnVsbDtcblxuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxzID0gbmFtZS5zcGxpdCgnICcpO1xuXG4gICAgaWYgKHNpemUgJiYgc2l6ZSA8IGluaXRpYWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0SW5pdGlhbHMoaW5pdGlhbHMuc2xpY2UoMCwgc2l6ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RJbml0aWFscyhpbml0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIGEgcGVyc29uJ3MgbmFtZSBzdHJpbmcgdG8gZ2V0IHRoZSBpbml0aWFscyBvZiBlYWNoIHdvcmQgaW4gdXBwZXJjYXNlLlxuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RJbml0aWFscyhlbGVtZW50czogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIGlmICghZWxlbWVudHMgfHwgIWVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50c1xuICAgICAgLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgJiYgZWxlbWVudC5sZW5ndGggPiAwKVxuICAgICAgLm1hcChlbGVtZW50ID0+IGVsZW1lbnRbMF0udG9VcHBlckNhc2UoKSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxufVxuIl19