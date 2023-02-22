import { AvatarSource } from './avatar-source.enum';
/**
 *  Custom source implementation.
 *  return custom image as an avatar
 *
 */
export class Custom {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.CUSTOM;
    }
    getAvatar() {
        return this.sourceId;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvY3VzdG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFHakIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFFbEIsQ0FBQztJQUVoQyxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbi8qKlxuICogIEN1c3RvbSBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiAgcmV0dXJuIGN1c3RvbSBpbWFnZSBhcyBhbiBhdmF0YXJcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b20gaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuQ1VTVE9NO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VJZDtcbiAgfVxufVxuIl19