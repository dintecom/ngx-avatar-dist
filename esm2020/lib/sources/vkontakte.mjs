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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmtvbnRha3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvdmtvbnRha3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUV2QixNQUFNLE9BQU8sU0FBVSxTQUFRLFdBQVc7SUFHeEMsWUFBWSxRQUFnQjtRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFIVCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFJM0QsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTywrQ0FDTCxJQUFJLENBQUMsUUFDUCxNQUFNLFVBQVUsV0FBVyxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlLENBQUMsSUFJdEI7UUFDQyw4REFBOEQ7UUFDOUQsOERBQThEO1FBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0Qsb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZLENBQUMsSUFBWTtRQUMvQixJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUVELElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQ2YsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vYXN5bmMtc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiAgVmtvbnRha3RlIHNvdXJjZSBpbXBsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIHZrb250YWt0ZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuY29uc3QgYXBpVmVyc2lvbiA9IDUuODtcblxuZXhwb3J0IGNsYXNzIFZrb250YWt0ZSBleHRlbmRzIEFzeW5jU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLlZLT05UQUtURTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc291cmNlSWQpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcihzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGltZ1NpemUgPSB0aGlzLmdldEltYWdlU2l6ZShzaXplKTtcbiAgICByZXR1cm4gYGh0dHBzOi8vYXBpLnZrLmNvbS9tZXRob2QvdXNlcnMuZ2V0P3VzZXJfaWQ9JHtcbiAgICAgIHRoaXMuc291cmNlSWRcbiAgICB9JnY9JHthcGlWZXJzaW9ufSZmaWVsZHM9JHtpbWdTaXplfWA7XG4gIH1cblxuICAvKipcbiAgICogZXh0cmFjdCB2a29udGFrdGUgYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IHtcbiAgICByZXNwb25zZToge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH1bXVxuICB9KTogc3RyaW5nIHwgbnVsbCB7XG4gICAgLy8gYXZhdGFyIGtleSBwcm9wZXJ0eSBpcyB0aGUgc2l6ZSB1c2VkIHRvIGdlbmVyYXRlIGF2YXRhciB1cmxcbiAgICAvLyBzaXplIHByb3BlcnR5IGlzIGFsd2F5cyB0aGUgbGFzdCBrZXkgaW4gdGhlIHJlc3BvbnNlIG9iamVjdFxuICAgIGNvbnN0IHNpemVQcm9wZXJ0eSA9IE9iamVjdC5rZXlzKGRhdGFbJ3Jlc3BvbnNlJ11bMF0pLnBvcCgpO1xuICAgIGlmICghc2l6ZVByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGF2YXRhciBzcmNcbiAgICByZXR1cm4gZGF0YVsncmVzcG9uc2UnXVswXVtzaXplUHJvcGVydHldIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbWFnZSBzaXplIHJlbGF0ZWQgdG8gdmtvbnRha3RlIEFQSVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoc2l6ZSA8PSA1MCkge1xuICAgICAgcmV0dXJuICdwaG90b181MCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMTAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzEwMCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gMjAwKSB7XG4gICAgICByZXR1cm4gJ3Bob3RvXzIwMCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICdwaG90b19tYXgnO1xuICB9XG59XG4iXX0=