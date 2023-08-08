import { AvatarSource } from './avatar-source.enum';
/**
 * Initials source implementation.
 * return the initials of the given value
 */
export class Initials {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.INITIALS;
    }
    getAvatar(size) {
        return this.getInitials(this.sourceId, size);
    }
    /**
     * Returns the initial letters of a name in a string.
     */
    getInitials(name, size) {
        name = name.trim();
        if (!name) {
            return '';
        }
        const initials = name.split(/[^{\p{L}}{0-9}]+/u);
        if (size && size < initials.length) {
            return this.constructInitials(initials.slice(0, size));
        }
        else {
            return this.constructInitials(initials);
        }
    }
    /**
     * Iterates a person's name string to get the initials of each word in uppercase.
     */
    constructInitials(elements) {
        if (!elements || !elements.length) {
            return '';
        }
        return elements
            .filter(element => element && element.length > 0)
            .map(element => element[0].toUpperCase())
            .join('');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9pbml0aWFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFHbkIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFFcEIsQ0FBQztJQUVoQyxTQUFTLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxXQUFXLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVqRCxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQixDQUFDLFFBQWtCO1FBQzFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLFFBQVE7YUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDaEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiBJbml0aWFscyBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiByZXR1cm4gdGhlIGluaXRpYWxzIG9mIHRoZSBnaXZlbiB2YWx1ZVxuICovXG5leHBvcnQgY2xhc3MgSW5pdGlhbHMgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuSU5JVElBTFM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUlkOiBzdHJpbmcpIHt9XG5cbiAgcHVibGljIGdldEF2YXRhcihzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEluaXRpYWxzKHRoaXMuc291cmNlSWQsIHNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluaXRpYWwgbGV0dGVycyBvZiBhIG5hbWUgaW4gYSBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzKG5hbWU6IHN0cmluZywgc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBuYW1lID0gbmFtZS50cmltKCk7XG5cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFscyA9IG5hbWUuc3BsaXQoL1tee1xccHtMfX17MC05fV0rL3UpO1xuXG4gICAgaWYgKHNpemUgJiYgc2l6ZSA8IGluaXRpYWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0SW5pdGlhbHMoaW5pdGlhbHMuc2xpY2UoMCwgc2l6ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RJbml0aWFscyhpbml0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIGEgcGVyc29uJ3MgbmFtZSBzdHJpbmcgdG8gZ2V0IHRoZSBpbml0aWFscyBvZiBlYWNoIHdvcmQgaW4gdXBwZXJjYXNlLlxuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RJbml0aWFscyhlbGVtZW50czogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIGlmICghZWxlbWVudHMgfHwgIWVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50c1xuICAgICAgLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgJiYgZWxlbWVudC5sZW5ndGggPiAwKVxuICAgICAgLm1hcChlbGVtZW50ID0+IGVsZW1lbnRbMF0udG9VcHBlckNhc2UoKSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxufVxuIl19