import { Injectable } from '@angular/core';
import { AvatarSource } from './avatar-source.enum';
import { Custom } from './custom';
import { Facebook } from './facebook';
import { Github } from './github';
import { Google } from './google';
import { Gravatar } from './gravatar';
import { Initials } from './initials';
import { Instagram } from './instagram';
import { Skype } from './skype';
import { Twitter } from './twitter';
import { Value } from './value';
import { Vkontakte } from './vkontakte';
import * as i0 from "@angular/core";
/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
class SourceFactory {
    constructor() {
        this.sources = {};
        this.sources[AvatarSource.FACEBOOK] = Facebook;
        this.sources[AvatarSource.TWITTER] = Twitter;
        this.sources[AvatarSource.GOOGLE] = Google;
        this.sources[AvatarSource.INSTAGRAM] = Instagram;
        this.sources[AvatarSource.SKYPE] = Skype;
        this.sources[AvatarSource.GRAVATAR] = Gravatar;
        this.sources[AvatarSource.CUSTOM] = Custom;
        this.sources[AvatarSource.INITIALS] = Initials;
        this.sources[AvatarSource.VALUE] = Value;
        this.sources[AvatarSource.VKONTAKTE] = Vkontakte;
        this.sources[AvatarSource.GITHUB] = Github;
    }
    newInstance(sourceType, sourceValue) {
        return new this.sources[sourceType](sourceValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: SourceFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: SourceFactory }); }
}
export { SourceFactory };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: SourceFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9zb3VyY2UuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHaEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXhDOzs7O0dBSUc7QUFDSCxNQUNhLGFBQWE7SUFHeEI7UUFGUSxZQUFPLEdBQXFDLEVBQUUsQ0FBQztRQUdyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFTSxXQUFXLENBQUMsVUFBd0IsRUFBRSxXQUFtQjtRQUM5RCxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDOzhHQW5CVSxhQUFhO2tIQUFiLGFBQWE7O1NBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuaW1wb3J0IHsgQ3VzdG9tIH0gZnJvbSAnLi9jdXN0b20nO1xuaW1wb3J0IHsgRmFjZWJvb2sgfSBmcm9tICcuL2ZhY2Vib29rJztcbmltcG9ydCB7IEdpdGh1YiB9IGZyb20gJy4vZ2l0aHViJztcbmltcG9ydCB7IEdvb2dsZSB9IGZyb20gJy4vZ29vZ2xlJztcbmltcG9ydCB7IEdyYXZhdGFyIH0gZnJvbSAnLi9ncmF2YXRhcic7XG5pbXBvcnQgeyBJbml0aWFscyB9IGZyb20gJy4vaW5pdGlhbHMnO1xuaW1wb3J0IHsgSW5zdGFncmFtIH0gZnJvbSAnLi9pbnN0YWdyYW0nO1xuaW1wb3J0IHsgU2t5cGUgfSBmcm9tICcuL3NreXBlJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUNyZWF0b3IgfSBmcm9tICcuL3NvdXJjZS5jcmVhdG9yJztcbmltcG9ydCB7IFR3aXR0ZXIgfSBmcm9tICcuL3R3aXR0ZXInO1xuaW1wb3J0IHsgVmFsdWUgfSBmcm9tICcuL3ZhbHVlJztcbmltcG9ydCB7IFZrb250YWt0ZSB9IGZyb20gJy4vdmtvbnRha3RlJztcblxuLyoqXG4gKiBGYWN0b3J5IGNsYXNzIHRoYXQgaW1wbGVtZW50cyBmYWN0b3J5IG1ldGhvZCBwYXR0ZXJuLlxuICogVXNlZCB0byBjcmVhdGUgU291cmNlIGltcGxlbWVudGF0aW9uIGNsYXNzIGJhc2VkXG4gKiBvbiB0aGUgc291cmNlIFR5cGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvdXJjZUZhY3Rvcnkge1xuICBwcml2YXRlIHNvdXJjZXM6IHsgW2tleTogc3RyaW5nXTogU291cmNlQ3JlYXRvciB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5GQUNFQk9PS10gPSBGYWNlYm9vaztcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLlRXSVRURVJdID0gVHdpdHRlcjtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkdPT0dMRV0gPSBHb29nbGU7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5JTlNUQUdSQU1dID0gSW5zdGFncmFtO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuU0tZUEVdID0gU2t5cGU7XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5HUkFWQVRBUl0gPSBHcmF2YXRhcjtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkNVU1RPTV0gPSBDdXN0b207XG4gICAgdGhpcy5zb3VyY2VzW0F2YXRhclNvdXJjZS5JTklUSUFMU10gPSBJbml0aWFscztcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLlZBTFVFXSA9IFZhbHVlO1xuICAgIHRoaXMuc291cmNlc1tBdmF0YXJTb3VyY2UuVktPTlRBS1RFXSA9IFZrb250YWt0ZTtcbiAgICB0aGlzLnNvdXJjZXNbQXZhdGFyU291cmNlLkdJVEhVQl0gPSBHaXRodWI7XG4gIH1cblxuICBwdWJsaWMgbmV3SW5zdGFuY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogU291cmNlIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuc291cmNlc1tzb3VyY2VUeXBlXShzb3VyY2VWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==