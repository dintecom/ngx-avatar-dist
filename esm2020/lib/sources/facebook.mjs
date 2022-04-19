import { AvatarSource } from './avatar-source.enum';
/**
 *  Facebook source implementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export class Facebook {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.FACEBOOK;
    }
    getAvatar(size) {
        return ('https://graph.facebook.com/' +
            `${this.sourceId}/picture?width=${size}&height=${size}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9mYWNlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBR25CLFlBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFGMUIsZUFBVSxHQUFpQixZQUFZLENBQUMsUUFBUSxDQUFDO0lBRXBCLENBQUM7SUFFaEMsU0FBUyxDQUFDLElBQVk7UUFDM0IsT0FBTyxDQUNMLDZCQUE2QjtZQUM3QixHQUFHLElBQUksQ0FBQyxRQUFRLGtCQUFrQixJQUFJLFdBQVcsSUFBSSxFQUFFLENBQ3hELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL2F2YXRhci1zb3VyY2UuZW51bSc7XG4vKipcbiAqICBGYWNlYm9vayBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBmYWNlYm9vayBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIEZhY2Vib29rIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkZBQ0VCT09LO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nKSB7fVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgK1xuICAgICAgYCR7dGhpcy5zb3VyY2VJZH0vcGljdHVyZT93aWR0aD0ke3NpemV9JmhlaWdodD0ke3NpemV9YFxuICAgICk7XG4gIH1cbn1cbiJdfQ==