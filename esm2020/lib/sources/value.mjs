import { AvatarSource } from './avatar-source.enum';
/**
 *  Value source implementation.
 *  return the value as avatar
 */
export class Value {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.VALUE;
    }
    getAvatar() {
        return this.sourceId;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy92YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLEtBQUs7SUFHaEIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQztJQUVoQyxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcblxuLyoqXG4gKiAgVmFsdWUgc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogIHJldHVybiB0aGUgdmFsdWUgYXMgYXZhdGFyXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWx1ZSBpbXBsZW1lbnRzIFNvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5WQUxVRTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlSWQ6IHN0cmluZykge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlSWQ7XG4gIH1cbn1cbiJdfQ==