import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Google source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Google extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GOOGLE;
    }
    getAvatar() {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }
    /**
     * Extract google avatar from json data
     */
    processResponse(data, size) {
        const avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvZ29vZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxNQUFPLFNBQVEsV0FBVztJQUdyQyxZQUFZLFFBQWdCO1FBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhULGVBQVUsR0FBaUIsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUl4RCxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sb0RBQW9ELElBQUksQ0FBQyxRQUFRLFdBQVcsQ0FBQztJQUN0RixDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlLENBQUMsSUFBcUQsRUFBRSxJQUFhO1FBQ3pGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1FBQ2pELElBQUksU0FBUyxFQUFFO1lBQ2IsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBHb29nbGUgc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gZ29vZ2xlIGlkZW50aWZpZXJcbiAqICBhbmQgaW1hZ2Ugc2l6ZVxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlIGV4dGVuZHMgQXN5bmNTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuR09PR0xFO1xuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzb3VyY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZW50cnkvYXBpL3VzZXIvJHt0aGlzLnNvdXJjZUlkfT9hbHQ9anNvbmA7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBnb29nbGUgYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IHsgZW50cnk6IHsgZ3Bob3RvJHRodW1ibmFpbDogeyAkdDogc3RyaW5nIH0gfSB9LCBzaXplPzogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgYXZhdGFyU3JjID0gZGF0YS5lbnRyeS5ncGhvdG8kdGh1bWJuYWlsLiR0O1xuICAgIGlmIChhdmF0YXJTcmMpIHtcbiAgICAgIHJldHVybiBhdmF0YXJTcmMucmVwbGFjZSgnczY0JywgJ3MnICsgc2l6ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==