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
export class NgxAvatarComponent {
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
}
NgxAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxAvatarComponent, deps: [{ token: i1.SourceFactory }, { token: i2.NgxAvatarService }], target: i0.ɵɵFactoryTarget.Component });
NgxAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.5", type: NgxAvatarComponent, isStandalone: true, selector: "ngx-avatar", inputs: { round: "round", size: "size", textSizeRatio: "textSizeRatio", bgColor: "bgColor", fgColor: "fgColor", borderColor: "borderColor", style: "style", cornerRadius: "cornerRadius", facebook: ["facebookId", "facebook"], twitter: ["twitterId", "twitter"], google: ["googleId", "google"], instagram: ["instagramId", "instagram"], vkontakte: ["vkontakteId", "vkontakte"], skype: ["skypeId", "skype"], gravatar: ["gravatarId", "gravatar"], github: ["githubId", "github"], custom: ["src", "custom"], initials: ["name", "initials"], value: "value", placeholder: "placeholder", initialsSize: "initialsSize" }, outputs: { clickOnAvatar: "clickOnAvatar" }, providers: [SourceFactory, NgxAvatarService, NgxAvatarConfigService], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{border-radius:50%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxAvatarComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvbmd4LWF2YXRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQW9DekQsTUFBTSxPQUFPLGtCQUFrQjtJQXdEN0IsWUFBbUIsYUFBNEIsRUFBVSxhQUErQjtRQUFyRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQXREakYsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBb0IsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFJakIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFvQixDQUFDLENBQUM7UUEwQmxDLGlCQUFZLEdBQW9CLENBQUMsQ0FBQztRQUdsQyxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWpFLFlBQU8s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bW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgbWFwLCB0YWtlV2hpbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ3hBdmF0YXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtYXZhdGFyLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IE5neEF2YXRhclNlcnZpY2UgfSBmcm9tICcuL25neC1hdmF0YXIuc2VydmljZSc7XG5pbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuXG50eXBlIFN0eWxlID0gUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnbmd4LWF2YXRhcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAoY2xpY2spPVwib25BdmF0YXJDbGlja2VkKClcIiBjbGFzcz1cImF2YXRhci1jb250YWluZXJcIiBbbmdTdHlsZV09XCJob3N0U3R5bGVcIj5cbiAgICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCJhdmF0YXJTcmM7IGVsc2UgdGV4dEF2YXRhclwiXG4gICAgICAgIFtzcmNdPVwiYXZhdGFyU3JjXCJcbiAgICAgICAgW3dpZHRoXT1cInNpemVcIlxuICAgICAgICBbaGVpZ2h0XT1cInNpemVcIlxuICAgICAgICBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiXG4gICAgICAgIChlcnJvcik9XCJmZXRjaEF2YXRhclNvdXJjZSgpXCJcbiAgICAgICAgY2xhc3M9XCJhdmF0YXItY29udGVudFwiXG4gICAgICAgIGxvYWRpbmc9XCJsYXp5XCJcbiAgICAgIC8+XG4gICAgICA8bmctdGVtcGxhdGUgI3RleHRBdmF0YXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhdmF0YXJUZXh0XCIgY2xhc3M9XCJhdmF0YXItY29udGVudFwiIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCI+XG4gICAgICAgICAge3sgYXZhdGFyVGV4dCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtTb3VyY2VGYWN0b3J5LCBOZ3hBdmF0YXJTZXJ2aWNlLCBOZ3hBdmF0YXJDb25maWdTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgcm91bmQgPSB0cnVlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogc3RyaW5nIHwgbnVtYmVyID0gNTA7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0ZXh0U2l6ZVJhdGlvID0gMztcbiAgQElucHV0KClcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGZnQ29sb3IgPSAnI0ZGRic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBib3JkZXJDb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3R5bGU6IFN0eWxlID0ge307XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb3JuZXJSYWRpdXM6IHN0cmluZyB8IG51bWJlciA9IDA7XG4gIEBJbnB1dCgnZmFjZWJvb2tJZCcpXG4gIHB1YmxpYyBmYWNlYm9vaz86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgndHdpdHRlcklkJylcbiAgcHVibGljIHR3aXR0ZXI/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dvb2dsZUlkJylcbiAgcHVibGljIGdvb2dsZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnaW5zdGFncmFtSWQnKVxuICBwdWJsaWMgaW5zdGFncmFtPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCd2a29udGFrdGVJZCcpXG4gIHB1YmxpYyB2a29udGFrdGU/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ3NreXBlSWQnKVxuICBwdWJsaWMgc2t5cGU/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dyYXZhdGFySWQnKVxuICBwdWJsaWMgZ3JhdmF0YXI/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dpdGh1YklkJylcbiAgcHVibGljIGdpdGh1Yj86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnc3JjJylcbiAgcHVibGljIGN1c3RvbT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnbmFtZScpXG4gIHB1YmxpYyBpbml0aWFscz86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB2YWx1ZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGluaXRpYWxzU2l6ZTogc3RyaW5nIHwgbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNsaWNrT25BdmF0YXI6IEV2ZW50RW1pdHRlcjxTb3VyY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxTb3VyY2U+KCk7XG5cbiAgcHVibGljIGlzQWxpdmUgPSB0cnVlO1xuICBwdWJsaWMgYXZhdGFyU3JjOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGF2YXRhclRleHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgYXZhdGFyU3R5bGU6IFN0eWxlID0ge307XG4gIHB1YmxpYyBob3N0U3R5bGU6IFN0eWxlID0ge307XG5cbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAtMTtcbiAgcHJpdmF0ZSBzb3VyY2VzOiBTb3VyY2VbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VGYWN0b3J5OiBTb3VyY2VGYWN0b3J5LCBwcml2YXRlIGF2YXRhclNlcnZpY2U6IE5neEF2YXRhclNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG9uQXZhdGFyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrT25BdmF0YXIuZW1pdCh0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaW5wdXRzIGNoYW5nZVxuICAgKlxuICAgKiBwYXJhbSB7eyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcbiAgICpcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1NvdXJjZShwcm9wTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlW3Byb3BOYW1lLnRvVXBwZXJDYXNlKCkgYXMga2V5b2YgdHlwZW9mIEF2YXRhclNvdXJjZV07XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAmJiB0eXBlb2YgY3VycmVudFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuYWRkU291cmNlKHNvdXJjZVR5cGUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTb3VyY2Uoc291cmNlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVpbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IHdoZW4gYSBzb3VyY2UgcHJvcGVydHkgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICAvLyB0aGUgZmFsbGJhY2sgc3lzdGVtIG11c3QgYmUgcmUtaW52b2tlZCB3aXRoIHRoZSBuZXcgdmFsdWVzLlxuICAgIHRoaXMuaW5pdGlhbGl6ZUF2YXRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgZmV0Y2hBdmF0YXJTb3VyY2UoKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50SW5kZXhdO1xuICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgdGhpcy5hdmF0YXJTZXJ2aWNlLm1hcmtTb3VyY2VBc0ZhaWxlZChwcmV2aW91c1NvdXJjZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5maW5kTmV4dFNvdXJjZSgpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1RleHRBdmF0YXIoc291cmNlLnNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLmJ1aWxkVGV4dEF2YXRhcihzb3VyY2UpO1xuICAgICAgdGhpcy5hdmF0YXJTcmMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkSW1hZ2VBdmF0YXIoc291cmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmROZXh0U291cmNlKCk6IFNvdXJjZSB8IG51bGwge1xuICAgIHdoaWxlICgrK3RoaXMuY3VycmVudEluZGV4IDwgdGhpcy5zb3VyY2VzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudEluZGV4XTtcbiAgICAgIGlmIChzb3VyY2UgJiYgIXRoaXMuYXZhdGFyU2VydmljZS5zb3VyY2VIYXNGYWlsZWRCZWZvcmUoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgYW5kIGl0cyBmYWxsYmFjayBzeXN0ZW1cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUF2YXRhcigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IC0xO1xuICAgIGlmICh0aGlzLnNvdXJjZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zb3J0QXZhdGFyU291cmNlcygpO1xuICAgICAgdGhpcy5mZXRjaEF2YXRhclNvdXJjZSgpO1xuICAgICAgdGhpcy5ob3N0U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydEF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+IHRoaXMuYXZhdGFyU2VydmljZS5jb21wYXJlU291cmNlcyhzb3VyY2UxLnNvdXJjZVR5cGUsIHNvdXJjZTIuc291cmNlVHlwZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFRleHRBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclRleHQgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKCt0aGlzLmluaXRpYWxzU2l6ZSk7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJTb3VyY2Uuc291cmNlSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEltYWdlQXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW1hZ2VTdHlsZSgpO1xuICAgIGlmIChhdmF0YXJTb3VyY2UgaW5zdGFuY2VvZiBBc3luY1NvdXJjZSkge1xuICAgICAgdGhpcy5mZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIoK3RoaXMuc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW5pdGlhbHMgc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzU3R5bGUoYXZhdGFyVmFsdWU6IHN0cmluZyk6IFN0eWxlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5yb3VuZCA/ICcxMDAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgY29sb3I6IHRoaXMuZmdDb2xvcixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iZ0NvbG9yID8gdGhpcy5iZ0NvbG9yIDogdGhpcy5hdmF0YXJTZXJ2aWNlLmdldFJhbmRvbUNvbG9yKGF2YXRhclZhbHVlKSxcbiAgICAgIGZvbnQ6IE1hdGguZmxvb3IoK3RoaXMuc2l6ZSAvIHRoaXMudGV4dFNpemVSYXRpbykgKyAncHggSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXG4gICAgICBsaW5lSGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW1hZ2Ugc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlU3R5bGUoKTogU3R5bGUge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzUwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB3aWR0aDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIC4uLnRoaXMuc3R5bGUsXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIGltYWdlIGFzeW5jaHJvbm91c2x5LlxuICAgKlxuICAgKiBwYXJhbSB7U291cmNlfSBzb3VyY2UgcmVwcmVzZW50cyBhdmF0YXIgc291cmNlXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihzb3VyY2U6IEFzeW5jU291cmNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5zb3VyY2VIYXNGYWlsZWRCZWZvcmUoc291cmNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYXZhdGFyU2VydmljZVxuICAgICAgLmZldGNoQXZhdGFyKHNvdXJjZS5nZXRBdmF0YXIoK3RoaXMuc2l6ZSkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCArdGhpcy5zaXplKSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogYXZhdGFyU3JjID0+ICh0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNyYyksXG4gICAgICAgIGVycm9yOiAoKSA9PiB0aGlzLmZldGNoQXZhdGFyU291cmNlKCksXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSBzb3VyY2VUeXBlIGF2YXRhciBzb3VyY2UgdHlwZSBlLmcgZmFjZWJvb2ssdHdpdHRlciwgZXRjLlxuICAgKiBwYXJhbSBzb3VyY2VWYWx1ZSAgc291cmNlIHZhbHVlIGUuZyBmYWNlYm9va0lkIHZhbHVlLCBldGMuXG4gICAqL1xuICBwcml2YXRlIGFkZFNvdXJjZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UsIHNvdXJjZVZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZXMuZmluZChzID0+IHMuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZSk7XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgc291cmNlLnNvdXJjZUlkID0gc291cmNlVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKHRoaXMuc291cmNlRmFjdG9yeS5uZXdJbnN0YW5jZShzb3VyY2VUeXBlLCBzb3VyY2VWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSBzb3VyY2VUeXBlIGF2YXRhciBzb3VyY2UgdHlwZSBlLmcgZmFjZWJvb2ssdHdpdHRlciwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzID0gdGhpcy5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gc291cmNlLnNvdXJjZVR5cGUgIT09IHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=