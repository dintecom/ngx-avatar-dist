import { AvatarSource } from './avatar-source.enum';
/**
 *  Twitter source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Twitter {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.TWITTER;
    }
    getAvatar(size) {
        const twitterImgSize = this.getImageSize(size);
        return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
    }
    getImageSize(size) {
        if (size <= 24) {
            return 'mini';
        }
        if (size <= 48) {
            return 'normal';
        }
        if (size <= 73) {
            return 'bigger';
        }
        return 'original';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9zb3VyY2VzL3R3aXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3BEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sT0FBTztJQUdsQixZQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRjFCLGVBQVUsR0FBaUIsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUVuQixDQUFDO0lBRWhDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsT0FBTyx1QkFBdUIsSUFBSSxDQUFDLFFBQVEsdUJBQXVCLGNBQWMsRUFBRSxDQUFDO0lBQ3JGLENBQUM7SUFFTyxZQUFZLENBQUMsSUFBWTtRQUMvQixJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQ2QsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFFRCxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcblxuLyoqXG4gKiAgVHdpdHRlciBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBnb29nbGUgaWRlbnRpZmllclxuICogIGFuZCBpbWFnZSBzaXplXG4gKi9cbmV4cG9ydCBjbGFzcyBUd2l0dGVyIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLlRXSVRURVI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUlkOiBzdHJpbmcpIHt9XG5cbiAgcHVibGljIGdldEF2YXRhcihzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHR3aXR0ZXJJbWdTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoc2l6ZSk7XG4gICAgcmV0dXJuIGBodHRwczovL3R3aXR0ZXIuY29tLyR7dGhpcy5zb3VyY2VJZH0vcHJvZmlsZV9pbWFnZT9zaXplPSR7dHdpdHRlckltZ1NpemV9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmIChzaXplIDw9IDI0KSB7XG4gICAgICByZXR1cm4gJ21pbmknO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDQ4KSB7XG4gICAgICByZXR1cm4gJ25vcm1hbCc7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgPD0gNzMpIHtcbiAgICAgIHJldHVybiAnYmlnZ2VyJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ29yaWdpbmFsJztcbiAgfVxufVxuIl19