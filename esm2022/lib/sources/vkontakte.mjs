import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Vkontakte source implementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 */
const apiVersion = 5.8;
export class Vkontakte extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.VKONTAKTE;
    }
    getAvatar(size) {
        const imgSize = this.getImageSize(size);
        return `https://api.vk.com/method/users.get?user_id=${this.sourceId}&v=${apiVersion}&fields=${imgSize}`;
    }
    /**
     * extract vkontakte avatar from json data
     */
    processResponse(data) {
        // avatar key property is the size used to generate avatar url
        // size property is always the last key in the response object
        const sizeProperty = Object.keys(data['response'][0]).pop();
        if (!sizeProperty) {
            return null;
        }
        // return avatar src
        return data['response'][0][sizeProperty] || null;
    }
    /**
     * Returns image size related to vkontakte API
     */
    getImageSize(size) {
        if (size <= 50) {
            return 'photo_50';
        }
        if (size <= 100) {
            return 'photo_100';
        }
        if (size <= 200) {
            return 'photo_200';
        }
        return 'photo_max';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmtvbnRha3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvdmtvbnRha3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUV2QixNQUFNLE9BQU8sU0FBVSxTQUFRLFdBQVc7SUFHeEMsWUFBWSxRQUFnQjtRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFIVCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFJM0QsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTywrQ0FBK0MsSUFBSSxDQUFDLFFBQVEsTUFBTSxVQUFVLFdBQVcsT0FBTyxFQUFFLENBQUM7SUFDMUcsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZUFBZSxDQUFDLElBSXRCO1FBQ0MsOERBQThEO1FBQzlELDhEQUE4RDtRQUM5RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELG9CQUFvQjtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLElBQVk7UUFDL0IsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFFRCxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQztTQUNwQjtRQUVELElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL2FzeW5jLXNvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG5cbi8qKlxuICogIFZrb250YWt0ZSBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiB2a29udGFrdGUgaWRlbnRpZmllclxuICogIGFuZCBpbWFnZSBzaXplXG4gKi9cbmNvbnN0IGFwaVZlcnNpb24gPSA1Ljg7XG5cbmV4cG9ydCBjbGFzcyBWa29udGFrdGUgZXh0ZW5kcyBBc3luY1NvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5WS09OVEFLVEU7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBpbWdTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoc2l6ZSk7XG4gICAgcmV0dXJuIGBodHRwczovL2FwaS52ay5jb20vbWV0aG9kL3VzZXJzLmdldD91c2VyX2lkPSR7dGhpcy5zb3VyY2VJZH0mdj0ke2FwaVZlcnNpb259JmZpZWxkcz0ke2ltZ1NpemV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBleHRyYWN0IHZrb250YWt0ZSBhdmF0YXIgZnJvbSBqc29uIGRhdGFcbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzUmVzcG9uc2UoZGF0YToge1xuICAgIHJlc3BvbnNlOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfVtdO1xuICB9KTogc3RyaW5nIHwgbnVsbCB7XG4gICAgLy8gYXZhdGFyIGtleSBwcm9wZXJ0eSBpcyB0aGUgc2l6ZSB1c2VkIHRvIGdlbmVyYXRlIGF2YXRhciB1cmxcbiAgICAvLyBzaXplIHByb3BlcnR5IGlzIGFsd2F5cyB0aGUgbGFzdCBrZXkgaW4gdGhlIHJlc3BvbnNlIG9iamVjdFxuICAgIGNvbnN0IHNpemVQcm9wZXJ0eSA9IE9iamVjdC5rZXlzKGRhdGFbJ3Jlc3BvbnNlJ11bMF0pLnBvcCgpO1xuICAgIGlmICghc2l6ZVByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGF2YXRhciBzcmNcbiAgICByZXR1cm4gZGF0YVsncmVzcG9uc2UnXVswXVtzaXplUHJvcGVydHldIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbWFnZSBzaXplIHJlbGF0ZWQgdG8gdmtvbnRha3RlIEFQSVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoc2l6ZSA8PSA1MCkge1xuICAgICAgcmV0dXJuICdwaG90b181MCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMTAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzEwMCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMjAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzIwMCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICdwaG90b19tYXgnO1xuICB9XG59XG4iXX0=