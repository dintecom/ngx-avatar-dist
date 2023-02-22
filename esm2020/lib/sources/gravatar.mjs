import { Md5 } from 'ts-md5';
import { AvatarSource } from './avatar-source.enum';
function isRetina() {
    if (typeof window !== 'undefined' && window !== null) {
        if (window.devicePixelRatio > 1.25) {
            return true;
        }
        const mediaQuery = '(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)';
        if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            return true;
        }
    }
    return false;
}
/**
 *  Gravatar source implementation.
 *  Fetch avatar source based on gravatar email
 */
export class Gravatar {
    constructor(value) {
        this.value = value;
        this.sourceType = AvatarSource.GRAVATAR;
        this.sourceId = value.match('^[a-f0-9]{32}$') ? value : Md5.hashStr(value).toString();
    }
    getAvatar(size) {
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9ncmF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdwRCxTQUFTLFFBQVE7SUFDZixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ3BELElBQUksTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxVQUFVLEdBQ2QsMklBQTJJLENBQUM7UUFDOUksSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBSW5CLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHZCLGVBQVUsR0FBaUIsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUl4RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hGLENBQUM7SUFFTSxTQUFTLENBQUMsSUFBWTtRQUMzQixNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hELE9BQU8sc0NBQXNDLElBQUksQ0FBQyxRQUFRLE1BQU0sVUFBVSxRQUFRLENBQUM7SUFDckYsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcblxuZnVuY3Rpb24gaXNSZXRpbmEoKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID1cbiAgICAgICcoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiA1LzQpLCAobWluLXJlc29sdXRpb246IDEuMjVkcHB4KSc7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiAgR3JhdmF0YXIgc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gZ3JhdmF0YXIgZW1haWxcbiAqL1xuZXhwb3J0IGNsYXNzIEdyYXZhdGFyIGltcGxlbWVudHMgU291cmNlIHtcbiAgcmVhZG9ubHkgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlLkdSQVZBVEFSO1xuICBwdWJsaWMgc291cmNlSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlSWQgPSB2YWx1ZS5tYXRjaCgnXlthLWYwLTldezMyfSQnKSA/IHZhbHVlIDogTWQ1Lmhhc2hTdHIodmFsdWUpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhdGFyKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgYXZhdGFyU2l6ZSA9IGlzUmV0aW5hKCkgPyBzaXplICogMiA6IHNpemU7XG4gICAgcmV0dXJuIGBodHRwczovL3NlY3VyZS5ncmF2YXRhci5jb20vYXZhdGFyLyR7dGhpcy5zb3VyY2VJZH0/cz0ke2F2YXRhclNpemV9JmQ9NDA0YDtcbiAgfVxufVxuIl19