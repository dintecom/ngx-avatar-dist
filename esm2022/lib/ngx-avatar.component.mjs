import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, takeWhile } from 'rxjs/operators';
import { NgxAvatarConfigService } from './ngx-avatar-config.service';
import { NgxAvatarService } from './ngx-avatar.service';
import { AsyncSource } from './sources/async-source';
import { AvatarSource } from './sources/avatar-source.enum';
import { SourceFactory } from './sources/source.factory';
import * as i0 from "@angular/core";
import * as i1 from "./sources/source.factory";
import * as i2 from "./ngx-avatar.service";
import * as i3 from "@angular/common";
class NgxAvatarComponent {
    constructor(sourceFactory, avatarService) {
        this.sourceFactory = sourceFactory;
        this.avatarService = avatarService;
        this.round = true;
        this.size = 50;
        this.textSizeRatio = 3;
        this.fgColor = '#FFF';
        this.style = {};
        this.cornerRadius = 0;
        this.initialsSize = 0;
        this.clickOnAvatar = new EventEmitter();
        this.isAlive = true;
        this.avatarSrc = null;
        this.avatarText = null;
        this.avatarStyle = {};
        this.hostStyle = {};
        this.currentIndex = -1;
        this.sources = [];
    }
    onAvatarClicked() {
        this.clickOnAvatar.emit(this.sources[this.currentIndex]);
    }
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     */
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (this.avatarService.isSource(propName)) {
                const sourceType = AvatarSource[propName.toUpperCase()];
                const currentValue = changes[propName].currentValue;
                if (currentValue && typeof currentValue === 'string') {
                    this.addSource(sourceType, currentValue);
                }
                else {
                    this.removeSource(sourceType);
                }
            }
        }
        // reinitialize the avatar component when a source property value has changed
        // the fallback system must be re-invoked with the new values.
        this.initializeAvatar();
    }
    /**
     * Fetch avatar source
     *
     * memberOf AvatarComponent
     */
    fetchAvatarSource() {
        const previousSource = this.sources[this.currentIndex];
        if (previousSource) {
            this.avatarService.markSourceAsFailed(previousSource);
        }
        const source = this.findNextSource();
        if (!source) {
            return;
        }
        if (this.avatarService.isTextAvatar(source.sourceType)) {
            this.buildTextAvatar(source);
            this.avatarSrc = null;
        }
        else {
            this.buildImageAvatar(source);
        }
    }
    findNextSource() {
        while (++this.currentIndex < this.sources.length) {
            const source = this.sources[this.currentIndex];
            if (source && !this.avatarService.sourceHasFailedBefore(source)) {
                return source;
            }
        }
        return null;
    }
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * Initialize the avatar component and its fallback system
     */
    initializeAvatar() {
        this.currentIndex = -1;
        if (this.sources.length > 0) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px',
            };
        }
    }
    sortAvatarSources() {
        this.sources.sort((source1, source2) => this.avatarService.compareSources(source1.sourceType, source2.sourceType));
    }
    buildTextAvatar(avatarSource) {
        this.avatarText = avatarSource.getAvatar(+this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    }
    buildImageAvatar(avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(+this.size);
        }
    }
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     */
    getInitialsStyle(avatarValue) {
        return {
            textAlign: 'center',
            borderRadius: this.round ? '100%' : this.cornerRadius + 'px',
            border: this.borderColor ? '1px solid ' + this.borderColor : '',
            textTransform: 'uppercase',
            color: this.fgColor,
            backgroundColor: this.bgColor ? this.bgColor : this.avatarService.getRandomColor(avatarValue),
            font: Math.floor(+this.size / this.textSizeRatio) + 'px Helvetica, Arial, sans-serif',
            lineHeight: this.size + 'px',
            ...this.style,
        };
    }
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     */
    getImageStyle() {
        return {
            maxWidth: '100%',
            borderRadius: this.round ? '50%' : this.cornerRadius + 'px',
            border: this.borderColor ? '1px solid ' + this.borderColor : '',
            width: this.size + 'px',
            height: this.size + 'px',
            ...this.style,
        };
    }
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    fetchAndProcessAsyncAvatar(source) {
        if (this.avatarService.sourceHasFailedBefore(source)) {
            return;
        }
        this.avatarService
            .fetchAvatar(source.getAvatar(+this.size))
            .pipe(takeWhile(() => this.isAlive), map(response => source.processResponse(response, +this.size)))
            .subscribe({
            next: avatarSrc => (this.avatarSrc = avatarSrc),
            error: () => this.fetchAvatarSource(),
        });
    }
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     */
    addSource(sourceType, sourceValue) {
        const source = this.sources.find(s => s.sourceType === sourceType);
        if (source) {
            source.sourceId = sourceValue;
        }
        else {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
    }
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     */
    removeSource(sourceType) {
        this.sources = this.sources.filter(source => source.sourceType !== sourceType);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgxAvatarComponent, deps: [{ token: i1.SourceFactory }, { token: i2.NgxAvatarService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgxAvatarComponent, isStandalone: true, selector: "ngx-avatar", inputs: { round: "round", size: "size", textSizeRatio: "textSizeRatio", bgColor: "bgColor", fgColor: "fgColor", borderColor: "borderColor", style: "style", cornerRadius: "cornerRadius", facebook: ["facebookId", "facebook"], twitter: ["twitterId", "twitter"], google: ["googleId", "google"], instagram: ["instagramId", "instagram"], vkontakte: ["vkontakteId", "vkontakte"], skype: ["skypeId", "skype"], gravatar: ["gravatarId", "gravatar"], github: ["githubId", "github"], custom: ["src", "custom"], initials: ["name", "initials"], value: "value", placeholder: "placeholder", initialsSize: "initialsSize" }, outputs: { clickOnAvatar: "clickOnAvatar" }, providers: [SourceFactory, NgxAvatarService, NgxAvatarConfigService], usesOnChanges: true, ngImport: i0, template: `
    <div (click)="onAvatarClicked()" class="avatar-container" [ngStyle]="hostStyle">
      <img
        *ngIf="avatarSrc; else textAvatar"
        [src]="avatarSrc"
        [width]="size"
        [height]="size"
        [ngStyle]="avatarStyle"
        (error)="fetchAvatarSource()"
        class="avatar-content"
        loading="lazy"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `, isInline: true, styles: [":host{border-radius:50%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
export { NgxAvatarComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgxAvatarComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: 'ngx-avatar', template: `
    <div (click)="onAvatarClicked()" class="avatar-container" [ngStyle]="hostStyle">
      <img
        *ngIf="avatarSrc; else textAvatar"
        [src]="avatarSrc"
        [width]="size"
        [height]="size"
        [ngStyle]="avatarStyle"
        (error)="fetchAvatarSource()"
        class="avatar-content"
        loading="lazy"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `, imports: [CommonModule], providers: [SourceFactory, NgxAvatarService, NgxAvatarConfigService], styles: [":host{border-radius:50%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.SourceFactory }, { type: i2.NgxAvatarService }]; }, propDecorators: { round: [{
                type: Input
            }], size: [{
                type: Input
            }], textSizeRatio: [{
                type: Input
            }], bgColor: [{
                type: Input
            }], fgColor: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], style: [{
                type: Input
            }], cornerRadius: [{
                type: Input
            }], facebook: [{
                type: Input,
                args: ['facebookId']
            }], twitter: [{
                type: Input,
                args: ['twitterId']
            }], google: [{
                type: Input,
                args: ['googleId']
            }], instagram: [{
                type: Input,
                args: ['instagramId']
            }], vkontakte: [{
                type: Input,
                args: ['vkontakteId']
            }], skype: [{
                type: Input,
                args: ['skypeId']
            }], gravatar: [{
                type: Input,
                args: ['gravatarId']
            }], github: [{
                type: Input,
                args: ['githubId']
            }], custom: [{
                type: Input,
                args: ['src']
            }], initials: [{
                type: Input,
                args: ['name']
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], initialsSize: [{
                type: Input
            }], clickOnAvatar: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvbmd4LWF2YXRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQUl6RCxNQWdDYSxrQkFBa0I7SUF3RDdCLFlBQW1CLGFBQTRCLEVBQVUsYUFBK0I7UUFBckUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUF0RGpGLFVBQUssR0FBRyxJQUFJLENBQUM7UUFFYixTQUFJLEdBQW9CLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUlsQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBSWpCLFVBQUssR0FBVSxFQUFFLENBQUM7UUFFbEIsaUJBQVksR0FBb0IsQ0FBQyxDQUFDO1FBMEJsQyxpQkFBWSxHQUFvQixDQUFDLENBQUM7UUFHbEMsa0JBQWEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVqRSxZQUFPLEdBQUcs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Z3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBtYXAsIHRha2VXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5neEF2YXRhckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL25neC1hdmF0YXItY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4QXZhdGFyU2VydmljZSB9IGZyb20gJy4vbmd4LWF2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2FzeW5jLXNvdXJjZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xuaW1wb3J0IHsgU291cmNlRmFjdG9yeSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UuZmFjdG9yeSc7XG5cbnR5cGUgU3R5bGUgPSBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICduZ3gtYXZhdGFyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IChjbGljayk9XCJvbkF2YXRhckNsaWNrZWQoKVwiIGNsYXNzPVwiYXZhdGFyLWNvbnRhaW5lclwiIFtuZ1N0eWxlXT1cImhvc3RTdHlsZVwiPlxuICAgICAgPGltZ1xuICAgICAgICAqbmdJZj1cImF2YXRhclNyYzsgZWxzZSB0ZXh0QXZhdGFyXCJcbiAgICAgICAgW3NyY109XCJhdmF0YXJTcmNcIlxuICAgICAgICBbd2lkdGhdPVwic2l6ZVwiXG4gICAgICAgIFtoZWlnaHRdPVwic2l6ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCJcbiAgICAgICAgKGVycm9yKT1cImZldGNoQXZhdGFyU291cmNlKClcIlxuICAgICAgICBjbGFzcz1cImF2YXRhci1jb250ZW50XCJcbiAgICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgLz5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdGV4dEF2YXRhcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImF2YXRhclRleHRcIiBjbGFzcz1cImF2YXRhci1jb250ZW50XCIgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIj5cbiAgICAgICAgICB7eyBhdmF0YXJUZXh0IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1NvdXJjZUZhY3RvcnksIE5neEF2YXRhclNlcnZpY2UsIE5neEF2YXRhckNvbmZpZ1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByb3VuZCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplOiBzdHJpbmcgfCBudW1iZXIgPSA1MDtcbiAgQElucHV0KClcbiAgcHVibGljIHRleHRTaXplUmF0aW8gPSAzO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZmdDb2xvciA9ICcjRkZGJztcbiAgQElucHV0KClcbiAgcHVibGljIGJvcmRlckNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdHlsZTogU3R5bGUgPSB7fTtcbiAgQElucHV0KClcbiAgcHVibGljIGNvcm5lclJhZGl1czogc3RyaW5nIHwgbnVtYmVyID0gMDtcbiAgQElucHV0KCdmYWNlYm9va0lkJylcbiAgcHVibGljIGZhY2Vib29rPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCd0d2l0dGVySWQnKVxuICBwdWJsaWMgdHdpdHRlcj86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnZ29vZ2xlSWQnKVxuICBwdWJsaWMgZ29vZ2xlPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCdpbnN0YWdyYW1JZCcpXG4gIHB1YmxpYyBpbnN0YWdyYW0/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ3Zrb250YWt0ZUlkJylcbiAgcHVibGljIHZrb250YWt0ZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnc2t5cGVJZCcpXG4gIHB1YmxpYyBza3lwZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnZ3JhdmF0YXJJZCcpXG4gIHB1YmxpYyBncmF2YXRhcj86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnZ2l0aHViSWQnKVxuICBwdWJsaWMgZ2l0aHViPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCdzcmMnKVxuICBwdWJsaWMgY3VzdG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCduYW1lJylcbiAgcHVibGljIGluaXRpYWxzPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KClcbiAgcHVibGljIHZhbHVlPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KClcbiAgcHVibGljIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaW5pdGlhbHNTaXplOiBzdHJpbmcgfCBudW1iZXIgPSAwO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2xpY2tPbkF2YXRhcjogRXZlbnRFbWl0dGVyPFNvdXJjZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNvdXJjZT4oKTtcblxuICBwdWJsaWMgaXNBbGl2ZSA9IHRydWU7XG4gIHB1YmxpYyBhdmF0YXJTcmM6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgYXZhdGFyVGV4dDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBhdmF0YXJTdHlsZTogU3R5bGUgPSB7fTtcbiAgcHVibGljIGhvc3RTdHlsZTogU3R5bGUgPSB7fTtcblxuICBwcml2YXRlIGN1cnJlbnRJbmRleCA9IC0xO1xuICBwcml2YXRlIHNvdXJjZXM6IFNvdXJjZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUZhY3Rvcnk6IFNvdXJjZUZhY3RvcnksIHByaXZhdGUgYXZhdGFyU2VydmljZTogTmd4QXZhdGFyU2VydmljZSkge31cblxuICBwdWJsaWMgb25BdmF0YXJDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tPbkF2YXRhci5lbWl0KHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRJbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpbnB1dHMgY2hhbmdlXG4gICAqXG4gICAqIHBhcmFtIHt7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfX0gY2hhbmdlc1xuICAgKlxuICAgKiBtZW1iZXJvZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzU291cmNlKHByb3BOYW1lKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2VbcHJvcE5hbWUudG9VcHBlckNhc2UoKSBhcyBrZXlvZiB0eXBlb2YgQXZhdGFyU291cmNlXTtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1twcm9wTmFtZV0uY3VycmVudFZhbHVlO1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlICYmIHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5hZGRTb3VyY2Uoc291cmNlVHlwZSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVNvdXJjZShzb3VyY2VUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyByZWluaXRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgd2hlbiBhIHNvdXJjZSBwcm9wZXJ0eSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgIC8vIHRoZSBmYWxsYmFjayBzeXN0ZW0gbXVzdCBiZSByZS1pbnZva2VkIHdpdGggdGhlIG5ldyB2YWx1ZXMuXG4gICAgdGhpcy5pbml0aWFsaXplQXZhdGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBmZXRjaEF2YXRhclNvdXJjZSgpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRJbmRleF07XG4gICAgaWYgKHByZXZpb3VzU291cmNlKSB7XG4gICAgICB0aGlzLmF2YXRhclNlcnZpY2UubWFya1NvdXJjZUFzRmFpbGVkKHByZXZpb3VzU291cmNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmZpbmROZXh0U291cmNlKCk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzVGV4dEF2YXRhcihzb3VyY2Uuc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuYnVpbGRUZXh0QXZhdGFyKHNvdXJjZSk7XG4gICAgICB0aGlzLmF2YXRhclNyYyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRJbWFnZUF2YXRhcihzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZE5leHRTb3VyY2UoKTogU291cmNlIHwgbnVsbCB7XG4gICAgd2hpbGUgKCsrdGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLnNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50SW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSAmJiAhdGhpcy5hdmF0YXJTZXJ2aWNlLnNvdXJjZUhhc0ZhaWxlZEJlZm9yZShzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCBhbmQgaXRzIGZhbGxiYWNrIHN5c3RlbVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQXZhdGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTE7XG4gICAgaWYgKHRoaXMuc291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNvcnRBdmF0YXJTb3VyY2VzKCk7XG4gICAgICB0aGlzLmZldGNoQXZhdGFyU291cmNlKCk7XG4gICAgICB0aGlzLmhvc3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0QXZhdGFyU291cmNlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZXMuc29ydCgoc291cmNlMSwgc291cmNlMikgPT4gdGhpcy5hdmF0YXJTZXJ2aWNlLmNvbXBhcmVTb3VyY2VzKHNvdXJjZTEuc291cmNlVHlwZSwgc291cmNlMi5zb3VyY2VUeXBlKSk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyVGV4dCA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIoK3RoaXMuaW5pdGlhbHNTaXplKTtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbml0aWFsc1N0eWxlKGF2YXRhclNvdXJjZS5zb3VyY2VJZCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbWFnZVN0eWxlKCk7XG4gICAgaWYgKGF2YXRhclNvdXJjZSBpbnN0YW5jZW9mIEFzeW5jU291cmNlKSB7XG4gICAgICB0aGlzLmZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gYXZhdGFyU291cmNlLmdldEF2YXRhcigrdGhpcy5zaXplKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogcmV0dXJucyBpbml0aWFscyBzdHlsZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJWYWx1ZTogc3RyaW5nKTogU3R5bGUge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzEwMCUnIDogdGhpcy5jb3JuZXJSYWRpdXMgKyAncHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlckNvbG9yID8gJzFweCBzb2xpZCAnICsgdGhpcy5ib3JkZXJDb2xvciA6ICcnLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICBjb2xvcjogdGhpcy5mZ0NvbG9yLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJnQ29sb3IgPyB0aGlzLmJnQ29sb3IgOiB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVmFsdWUpLFxuICAgICAgZm9udDogTWF0aC5mbG9vcigrdGhpcy5zaXplIC8gdGhpcy50ZXh0U2l6ZVJhdGlvKSArICdweCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcbiAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAuLi50aGlzLnN0eWxlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogcmV0dXJucyBpbWFnZSBzdHlsZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW1hZ2VTdHlsZSgpOiBTdHlsZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnNTAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgaW1hZ2UgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLnNvdXJjZUhhc0ZhaWxlZEJlZm9yZShzb3VyY2UpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hdmF0YXJTZXJ2aWNlXG4gICAgICAuZmV0Y2hBdmF0YXIoc291cmNlLmdldEF2YXRhcigrdGhpcy5zaXplKSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlV2hpbGUoKCkgPT4gdGhpcy5pc0FsaXZlKSxcbiAgICAgICAgbWFwKHJlc3BvbnNlID0+IHNvdXJjZS5wcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UsICt0aGlzLnNpemUpKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiBhdmF0YXJTcmMgPT4gKHRoaXMuYXZhdGFyU3JjID0gYXZhdGFyU3JjKSxcbiAgICAgICAgZXJyb3I6ICgpID0+IHRoaXMuZmV0Y2hBdmF0YXJTb3VyY2UoKSxcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqIHBhcmFtIHNvdXJjZVZhbHVlICBzb3VyY2UgdmFsdWUgZS5nIGZhY2Vib29rSWQgdmFsdWUsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgYWRkU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSwgc291cmNlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuc291cmNlcy5maW5kKHMgPT4gcy5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlKTtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICBzb3VyY2Uuc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VyY2VzLnB1c2godGhpcy5zb3VyY2VGYWN0b3J5Lm5ld0luc3RhbmNlKHNvdXJjZVR5cGUsIHNvdXJjZVZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVNvdXJjZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB0aGlzLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSAhPT0gc291cmNlVHlwZSk7XG4gIH1cbn1cbiJdfQ==