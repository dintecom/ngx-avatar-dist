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
        const initials = name.split(' ');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9pbml0aWFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFHbkIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFFcEIsQ0FBQztJQUVoQyxTQUFTLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxXQUFXLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUIsQ0FBQyxRQUFrQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxRQUFRO2FBQ1osTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2hELEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5cbi8qKlxuICogSW5pdGlhbHMgc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogcmV0dXJuIHRoZSBpbml0aWFscyBvZiB0aGUgZ2l2ZW4gdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIEluaXRpYWxzIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLklOSVRJQUxTO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJbml0aWFscyh0aGlzLnNvdXJjZUlkLCBzaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbml0aWFsIGxldHRlcnMgb2YgYSBuYW1lIGluIGEgc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbml0aWFscyhuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbmFtZSA9IG5hbWUudHJpbSgpO1xuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdGlhbHMgPSBuYW1lLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAoc2l6ZSAmJiBzaXplIDwgaW5pdGlhbHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RJbml0aWFscyhpbml0aWFscy5zbGljZSgwLCBzaXplKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdEluaXRpYWxzKGluaXRpYWxzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgYSBwZXJzb24ncyBuYW1lIHN0cmluZyB0byBnZXQgdGhlIGluaXRpYWxzIG9mIGVhY2ggd29yZCBpbiB1cHBlcmNhc2UuXG4gICAqL1xuICBwcml2YXRlIGNvbnN0cnVjdEluaXRpYWxzKGVsZW1lbnRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgaWYgKCFlbGVtZW50cyB8fCAhZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzXG4gICAgICAuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCA+IDApXG4gICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudFswXS50b1VwcGVyQ2FzZSgpKVxuICAgICAgLmpvaW4oJycpO1xuICB9XG59XG4iXX0=