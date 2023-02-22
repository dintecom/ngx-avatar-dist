import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Instagram source implementation.
 *  Fetch avatar source based on instagram identifier
 */
export class Instagram extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.INSTAGRAM;
    }
    getAvatar() {
        return `https://www.instagram.com/${this.sourceId}/?__a=1`;
    }
    /**
     * extract instagram avatar from json data
     */
    processResponse(data, size) {
        return `${data.graphql.user.profile_pic_url_hd}&s=${size}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFncmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvaW5zdGFncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVUsU0FBUSxXQUFXO0lBR3hDLFlBQVksUUFBZ0I7UUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSFQsZUFBVSxHQUFpQixZQUFZLENBQUMsU0FBUyxDQUFDO0lBSTNELENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyw2QkFBNkIsSUFBSSxDQUFDLFFBQVEsU0FBUyxDQUFDO0lBQzdELENBQUM7SUFFRDs7T0FFRztJQUNJLGVBQWUsQ0FBQyxJQUEyRCxFQUFFLElBQWE7UUFDL0YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBJbnN0YWdyYW0gc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gaW5zdGFncmFtIGlkZW50aWZpZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhZ3JhbSBleHRlbmRzIEFzeW5jU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLklOU1RBR1JBTTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc291cmNlSWQpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS8ke3RoaXMuc291cmNlSWR9Lz9fX2E9MWA7XG4gIH1cblxuICAvKipcbiAgICogZXh0cmFjdCBpbnN0YWdyYW0gYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IHsgZ3JhcGhxbDogeyB1c2VyOiB7IHByb2ZpbGVfcGljX3VybF9oZDogc3RyaW5nIH0gfSB9LCBzaXplPzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7ZGF0YS5ncmFwaHFsLnVzZXIucHJvZmlsZV9waWNfdXJsX2hkfSZzPSR7c2l6ZX1gO1xuICB9XG59XG4iXX0=