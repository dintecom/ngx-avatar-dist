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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9zb3VyY2VzL3R3aXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sT0FBTztJQUdsQixZQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRjFCLGVBQVUsR0FBaUIsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUVuQixDQUFDO0lBRWhDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsT0FBTyx1QkFDTCxJQUFJLENBQUMsUUFDUCx1QkFBdUIsY0FBYyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUNkLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDZCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUNkLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuXG4vKipcbiAqICBUd2l0dGVyIHNvdXJjZSBpbXBsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGdvb2dsZSBpZGVudGlmaWVyXG4gKiAgYW5kIGltYWdlIHNpemVcbiAqL1xuZXhwb3J0IGNsYXNzIFR3aXR0ZXIgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuVFdJVFRFUjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlSWQ6IHN0cmluZykge31cblxuICBwdWJsaWMgZ2V0QXZhdGFyKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgdHdpdHRlckltZ1NpemUgPSB0aGlzLmdldEltYWdlU2l6ZShzaXplKTtcbiAgICByZXR1cm4gYGh0dHBzOi8vdHdpdHRlci5jb20vJHtcbiAgICAgIHRoaXMuc291cmNlSWRcbiAgICB9L3Byb2ZpbGVfaW1hZ2U/c2l6ZT0ke3R3aXR0ZXJJbWdTaXplfWA7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAoc2l6ZSA8PSAyNCkge1xuICAgICAgcmV0dXJuICdtaW5pJztcbiAgICB9XG5cbiAgICBpZiAoc2l6ZSA8PSA0OCkge1xuICAgICAgcmV0dXJuICdub3JtYWwnO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDczKSB7XG4gICAgICByZXR1cm4gJ2JpZ2dlcic7XG4gICAgfVxuXG4gICAgcmV0dXJuICdvcmlnaW5hbCc7XG4gIH1cbn1cbiJdfQ==