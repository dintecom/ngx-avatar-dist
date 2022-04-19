import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Instagram source impelementation.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFncmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvaW5zdGFncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVUsU0FBUSxXQUFXO0lBR3hDLFlBQVksUUFBZ0I7UUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSFQsZUFBVSxHQUFpQixZQUFZLENBQUMsU0FBUyxDQUFDO0lBSTNELENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyw2QkFBNkIsSUFBSSxDQUFDLFFBQVEsU0FBUyxDQUFDO0lBQzdELENBQUM7SUFFRDs7T0FFRztJQUNJLGVBQWUsQ0FBQyxJQUEyRCxFQUFFLElBQWE7UUFDL0YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBJbnN0YWdyYW0gc291cmNlIGltcGVsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGluc3RhZ3JhbSBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnN0YWdyYW0gZXh0ZW5kcyBBc3luY1NvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5JTlNUQUdSQU07XG5cbiAgY29uc3RydWN0b3Ioc291cmNlSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vJHt0aGlzLnNvdXJjZUlkfS8/X19hPTFgO1xuICB9XG5cbiAgLyoqXG4gICAqIGV4dHJhY3QgaW5zdGFncmFtIGF2YXRhciBmcm9tIGpzb24gZGF0YVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NSZXNwb25zZShkYXRhOiB7IGdyYXBocWw6IHsgdXNlcjogeyBwcm9maWxlX3BpY191cmxfaGQ6IHN0cmluZyB9IH0gfSwgc2l6ZT86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2RhdGEuZ3JhcGhxbC51c2VyLnByb2ZpbGVfcGljX3VybF9oZH0mcz0ke3NpemV9YDtcbiAgfVxufVxuIl19