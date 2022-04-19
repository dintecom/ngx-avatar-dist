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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvZ29vZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxNQUFPLFNBQVEsV0FBVztJQUdyQyxZQUFZLFFBQWdCO1FBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhULGVBQVUsR0FBaUIsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUl4RCxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sb0RBQ0wsSUFBSSxDQUFDLFFBQ1AsV0FBVyxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZUFBZSxDQUFDLElBQXFELEVBQUUsSUFBYTtRQUN6RixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztRQUNqRCxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vYXN5bmMtc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiAgR29vZ2xlIHNvdXJjZSBpbXBsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGdvb2dsZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZSBleHRlbmRzIEFzeW5jU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkdPT0dMRTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc291cmNlSWQpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhL2VudHJ5L2FwaS91c2VyLyR7XG4gICAgICB0aGlzLnNvdXJjZUlkXG4gICAgfT9hbHQ9anNvbmA7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBnb29nbGUgYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IHsgZW50cnk6IHsgZ3Bob3RvJHRodW1ibmFpbDogeyAkdDogc3RyaW5nIH0gfSB9LCBzaXplPzogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgYXZhdGFyU3JjID0gZGF0YS5lbnRyeS5ncGhvdG8kdGh1bWJuYWlsLiR0O1xuICAgIGlmIChhdmF0YXJTcmMpIHtcbiAgICAgIHJldHVybiBhdmF0YXJTcmMucmVwbGFjZSgnczY0JywgJ3MnICsgc2l6ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==