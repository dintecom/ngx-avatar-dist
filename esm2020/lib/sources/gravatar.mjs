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
        this.sourceId = value.match('^[a-f0-9]{32}$')
            ? value
            : Md5.hashStr(value).toString();
    }
    getAvatar(size) {
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9ncmF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxTQUFTLFFBQVE7SUFDZixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ3BELElBQUksTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxVQUFVLEdBQUcsMklBQTJJLENBQUM7UUFDL0osSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBSW5CLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHZCLGVBQVUsR0FBaUIsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUl4RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sU0FBUyxDQUFDLElBQVk7UUFDM0IsTUFBTSxVQUFVLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRCxPQUFPLHNDQUNMLElBQUksQ0FBQyxRQUNQLE1BQU0sVUFBVSxRQUFRLENBQUM7SUFDM0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuZnVuY3Rpb24gaXNSZXRpbmEoKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gJygtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDUvNCksIChtaW4tcmVzb2x1dGlvbjogMS4yNWRwcHgpJztcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEobWVkaWFRdWVyeSkubWF0Y2hlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqICBHcmF2YXRhciBzb3VyY2UgaW1wbGVtZW50YXRpb24uXG4gKiAgRmV0Y2ggYXZhdGFyIHNvdXJjZSBiYXNlZCBvbiBncmF2YXRhciBlbWFpbFxuICovXG5leHBvcnQgY2xhc3MgR3JhdmF0YXIgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuR1JBVkFUQVI7XG4gIHB1YmxpYyBzb3VyY2VJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZCA9IHZhbHVlLm1hdGNoKCdeW2EtZjAtOV17MzJ9JCcpXG4gICAgICA/IHZhbHVlXG4gICAgICA6IE1kNS5oYXNoU3RyKHZhbHVlKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YXRhcihzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGF2YXRhclNpemUgPSBpc1JldGluYSgpID8gc2l6ZSAqIDIgOiBzaXplO1xuICAgIHJldHVybiBgaHR0cHM6Ly9zZWN1cmUuZ3JhdmF0YXIuY29tL2F2YXRhci8ke1xuICAgICAgdGhpcy5zb3VyY2VJZFxuICAgIH0/cz0ke2F2YXRhclNpemV9JmQ9NDA0YDtcbiAgfVxufVxuIl19