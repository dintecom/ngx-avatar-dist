import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AsyncSource } from './sources/async-source';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { takeWhile, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./sources/source.factory";
import * as i2 from "./avatar.service";
import * as i3 from "@angular/common";
function AvatarComponent_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "img", 3);
    i0.ɵɵlistener("error", function AvatarComponent_img_1_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.fetchAvatarSource(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r0.avatarSrc, i0.ɵɵsanitizeUrl)("width", ctx_r0.size)("height", ctx_r0.size)("ngStyle", ctx_r0.avatarStyle);
} }
function AvatarComponent_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", ctx_r5.avatarStyle);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.avatarText, " ");
} }
function AvatarComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AvatarComponent_ng_template_2_div_0_Template, 2, 2, "div", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r2.avatarText);
} }
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
export class AvatarComponent {
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
                height: this.size + 'px'
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
            backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue),
            font: Math.floor(+this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif',
            lineHeight: this.size + 'px',
            ...this.style
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
            .subscribe(avatarSrc => (this.avatarSrc = avatarSrc), err => {
            this.fetchAvatarSource();
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
AvatarComponent.ɵfac = function AvatarComponent_Factory(t) { return new (t || AvatarComponent)(i0.ɵɵdirectiveInject(i1.SourceFactory), i0.ɵɵdirectiveInject(i2.AvatarService)); };
AvatarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AvatarComponent, selectors: [["ngx-avatar"]], inputs: { round: "round", size: "size", textSizeRatio: "textSizeRatio", bgColor: "bgColor", fgColor: "fgColor", borderColor: "borderColor", style: "style", cornerRadius: "cornerRadius", facebook: ["facebookId", "facebook"], twitter: ["twitterId", "twitter"], google: ["googleId", "google"], instagram: ["instagramId", "instagram"], vkontakte: ["vkontakteId", "vkontakte"], skype: ["skypeId", "skype"], gravatar: ["gravatarId", "gravatar"], github: ["githubId", "github"], custom: ["src", "custom"], initials: ["name", "initials"], value: "value", placeholder: "placeholder", initialsSize: "initialsSize" }, outputs: { clickOnAvatar: "clickOnAvatar" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 3, consts: [[1, "avatar-container", 3, "ngStyle", "click"], ["class", "avatar-content", "loading", "lazy", 3, "src", "width", "height", "ngStyle", "error", 4, "ngIf", "ngIfElse"], ["textAvatar", ""], ["loading", "lazy", 1, "avatar-content", 3, "src", "width", "height", "ngStyle", "error"], ["class", "avatar-content", 3, "ngStyle", 4, "ngIf"], [1, "avatar-content", 3, "ngStyle"]], template: function AvatarComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function AvatarComponent_Template_div_click_0_listener() { return ctx.onAvatarClicked(); });
        i0.ɵɵtemplate(1, AvatarComponent_img_1_Template, 1, 4, "img", 1);
        i0.ɵɵtemplate(2, AvatarComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(3);
        i0.ɵɵproperty("ngStyle", ctx.hostStyle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.avatarSrc)("ngIfElse", _r1);
    } }, directives: [i3.NgStyle, i3.NgIf], styles: ["[_nghost-%COMP%]{border-radius:50%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AvatarComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'ngx-avatar',
                styles: [
                    `
      :host {
        border-radius: 50%;
      }
    `
                ],
                template: `
    <div
      (click)="onAvatarClicked()"
      class="avatar-container"
      [ngStyle]="hostStyle"
    >
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
  `
            }]
    }], function () { return [{ type: i1.SourceFactory }, { type: i2.AvatarService }]; }, { round: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hdmF0YXIvc3JjL2xpYi9hdmF0YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBSWIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7SUE2QjFDLDhCQVNFO0lBSEEseUpBQVMsMEJBQW1CLElBQUM7SUFOL0IsaUJBU0U7OztJQVBBLHdEQUFpQixzQkFBQSx1QkFBQSwrQkFBQTs7O0lBU2pCLDhCQUF1RTtJQUNyRSxZQUNGO0lBQUEsaUJBQU07OztJQUZ5Qyw0Q0FBdUI7SUFDcEUsZUFDRjtJQURFLGtEQUNGOzs7SUFGQSw4RUFFTTs7O0lBRkEsd0NBQWdCOztBQXBDOUI7Ozs7Ozs7R0FPRztBQW9DSCxNQUFNLE9BQU8sZUFBZTtJQXdEMUIsWUFDUyxhQUE0QixFQUMzQixhQUE0QjtRQUQ3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXhEL0IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBb0IsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFJakIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUVsQixp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O1lBR0MsWUFBWTtrQkFEbEIsS0FBSztZQUlDLGFBQWE7a0JBRG5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xuaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXN5bmMtc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyB0YWtlV2hpbGUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxudHlwZSBTdHlsZSA9IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47XG5cbi8qKlxuICogVW5pdmVyc2FsIGF2YXRhciBjb21wb25lbnQgdGhhdFxuICogZ2VuZXJhdGVzIGF2YXRhciBmcm9tIGRpZmZlcmVudCBzb3VyY2VzXG4gKlxuICogZXhwb3J0XG4gKiBjbGFzcyBBdmF0YXJDb21wb25lbnRcbiAqIGltcGxlbWVudHMge09uQ2hhbmdlc31cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1hdmF0YXInLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIH1cbiAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKGNsaWNrKT1cIm9uQXZhdGFyQ2xpY2tlZCgpXCJcbiAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRhaW5lclwiXG4gICAgICBbbmdTdHlsZV09XCJob3N0U3R5bGVcIlxuICAgID5cbiAgICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCJhdmF0YXJTcmM7IGVsc2UgdGV4dEF2YXRhclwiXG4gICAgICAgIFtzcmNdPVwiYXZhdGFyU3JjXCJcbiAgICAgICAgW3dpZHRoXT1cInNpemVcIlxuICAgICAgICBbaGVpZ2h0XT1cInNpemVcIlxuICAgICAgICBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiXG4gICAgICAgIChlcnJvcik9XCJmZXRjaEF2YXRhclNvdXJjZSgpXCJcbiAgICAgICAgY2xhc3M9XCJhdmF0YXItY29udGVudFwiXG4gICAgICAgIGxvYWRpbmc9XCJsYXp5XCJcbiAgICAgIC8+XG4gICAgICA8bmctdGVtcGxhdGUgI3RleHRBdmF0YXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhdmF0YXJUZXh0XCIgY2xhc3M9XCJhdmF0YXItY29udGVudFwiIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCI+XG4gICAgICAgICAge3sgYXZhdGFyVGV4dCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgcm91bmQgPSB0cnVlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZTogc3RyaW5nIHwgbnVtYmVyID0gNTA7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0ZXh0U2l6ZVJhdGlvID0gMztcbiAgQElucHV0KClcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIGZnQ29sb3IgPSAnI0ZGRic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBib3JkZXJDb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3R5bGU6IFN0eWxlID0ge307XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb3JuZXJSYWRpdXM6IHN0cmluZyB8IG51bWJlciA9IDA7XG4gIEBJbnB1dCgnZmFjZWJvb2tJZCcpXG4gIHB1YmxpYyBmYWNlYm9vaz86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgndHdpdHRlcklkJylcbiAgcHVibGljIHR3aXR0ZXI/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dvb2dsZUlkJylcbiAgcHVibGljIGdvb2dsZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnaW5zdGFncmFtSWQnKVxuICBwdWJsaWMgaW5zdGFncmFtPzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCd2a29udGFrdGVJZCcpXG4gIHB1YmxpYyB2a29udGFrdGU/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ3NreXBlSWQnKVxuICBwdWJsaWMgc2t5cGU/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dyYXZhdGFySWQnKVxuICBwdWJsaWMgZ3JhdmF0YXI/OiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoJ2dpdGh1YklkJylcbiAgcHVibGljIGdpdGh1Yj86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnc3JjJylcbiAgcHVibGljIGN1c3RvbT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgnbmFtZScpXG4gIHB1YmxpYyBpbml0aWFscz86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB2YWx1ZT86IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGluaXRpYWxzU2l6ZTogc3RyaW5nIHwgbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNsaWNrT25BdmF0YXI6IEV2ZW50RW1pdHRlcjxTb3VyY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxTb3VyY2U+KCk7XG5cbiAgcHVibGljIGlzQWxpdmUgPSB0cnVlO1xuICBwdWJsaWMgYXZhdGFyU3JjOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGF2YXRhclRleHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgYXZhdGFyU3R5bGU6IFN0eWxlID0ge307XG4gIHB1YmxpYyBob3N0U3R5bGU6IFN0eWxlID0ge307XG5cbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAtMTtcbiAgcHJpdmF0ZSBzb3VyY2VzOiBTb3VyY2VbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzb3VyY2VGYWN0b3J5OiBTb3VyY2VGYWN0b3J5LFxuICAgIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG9uQXZhdGFyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrT25BdmF0YXIuZW1pdCh0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaW5wdXRzIGNoYW5nZVxuICAgKlxuICAgKiBwYXJhbSB7eyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcbiAgICpcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1NvdXJjZShwcm9wTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVHlwZTogQXZhdGFyU291cmNlID0gQXZhdGFyU291cmNlW3Byb3BOYW1lLnRvVXBwZXJDYXNlKCkgYXMga2V5b2YgdHlwZW9mIEF2YXRhclNvdXJjZV0gO1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzW3Byb3BOYW1lXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgdHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmFkZFNvdXJjZShzb3VyY2VUeXBlLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlU291cmNlKHNvdXJjZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlaW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCB3aGVuIGEgc291cmNlIHByb3BlcnR5IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgLy8gdGhlIGZhbGxiYWNrIHN5c3RlbSBtdXN0IGJlIHJlLWludm9rZWQgd2l0aCB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLmluaXRpYWxpemVBdmF0YXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGZldGNoQXZhdGFyU291cmNlKCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudEluZGV4XTtcbiAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgIHRoaXMuYXZhdGFyU2VydmljZS5tYXJrU291cmNlQXNGYWlsZWQocHJldmlvdXNTb3VyY2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuZmluZE5leHRTb3VyY2UoKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmF2YXRhclNlcnZpY2UuaXNUZXh0QXZhdGFyKHNvdXJjZS5zb3VyY2VUeXBlKSkge1xuICAgICAgdGhpcy5idWlsZFRleHRBdmF0YXIoc291cmNlKTtcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWlsZEltYWdlQXZhdGFyKHNvdXJjZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTmV4dFNvdXJjZSgpOiBTb3VyY2UgfCBudWxsIHtcbiAgICB3aGlsZSAoKyt0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuc291cmNlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRJbmRleF07XG4gICAgICBpZiAoc291cmNlICYmICF0aGlzLmF2YXRhclNlcnZpY2Uuc291cmNlSGFzRmFpbGVkQmVmb3JlKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IGFuZCBpdHMgZmFsbGJhY2sgc3lzdGVtXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVBdmF0YXIoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSAtMTtcbiAgICBpZiAodGhpcy5zb3VyY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc29ydEF2YXRhclNvdXJjZXMoKTtcbiAgICAgIHRoaXMuZmV0Y2hBdmF0YXJTb3VyY2UoKTtcbiAgICAgIHRoaXMuaG9zdFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydEF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+XG4gICAgICB0aGlzLmF2YXRhclNlcnZpY2UuY29tcGFyZVNvdXJjZXMoc291cmNlMS5zb3VyY2VUeXBlLCBzb3VyY2UyLnNvdXJjZVR5cGUpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRUZXh0QXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJUZXh0ID0gYXZhdGFyU291cmNlLmdldEF2YXRhcigrdGhpcy5pbml0aWFsc1NpemUpO1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEluaXRpYWxzU3R5bGUoYXZhdGFyU291cmNlLnNvdXJjZUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEltYWdlU3R5bGUoKTtcbiAgICBpZiAoYXZhdGFyU291cmNlIGluc3RhbmNlb2YgQXN5bmNTb3VyY2UpIHtcbiAgICAgIHRoaXMuZmV0Y2hBbmRQcm9jZXNzQXN5bmNBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKCt0aGlzLnNpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGluaXRpYWxzIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbml0aWFsc1N0eWxlKGF2YXRhclZhbHVlOiBzdHJpbmcpOiBTdHlsZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnMTAwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgIGNvbG9yOiB0aGlzLmZnQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmdDb2xvclxuICAgICAgICA/IHRoaXMuYmdDb2xvclxuICAgICAgICA6IHRoaXMuYXZhdGFyU2VydmljZS5nZXRSYW5kb21Db2xvcihhdmF0YXJWYWx1ZSksXG4gICAgICBmb250OlxuICAgICAgICBNYXRoLmZsb29yKCt0aGlzLnNpemUgLyB0aGlzLnRleHRTaXplUmF0aW8pICtcbiAgICAgICAgJ3B4IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxuICAgICAgbGluZUhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW1hZ2Ugc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlU3R5bGUoKTogU3R5bGUge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzUwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB3aWR0aDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIC4uLnRoaXMuc3R5bGUsXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIGltYWdlIGFzeW5jaHJvbm91c2x5LlxuICAgKlxuICAgKiBwYXJhbSB7U291cmNlfSBzb3VyY2UgcmVwcmVzZW50cyBhdmF0YXIgc291cmNlXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihzb3VyY2U6IEFzeW5jU291cmNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5zb3VyY2VIYXNGYWlsZWRCZWZvcmUoc291cmNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYXZhdGFyU2VydmljZVxuICAgICAgICAuZmV0Y2hBdmF0YXIoc291cmNlLmdldEF2YXRhcigrdGhpcy5zaXplKSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YWtlV2hpbGUoKCkgPT4gdGhpcy5pc0FsaXZlKSxcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCArdGhpcy5zaXplKSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGF2YXRhclNyYyA9PiAodGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTcmMpLFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5mZXRjaEF2YXRhclNvdXJjZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSBzb3VyY2VUeXBlIGF2YXRhciBzb3VyY2UgdHlwZSBlLmcgZmFjZWJvb2ssdHdpdHRlciwgZXRjLlxuICAgKiBwYXJhbSBzb3VyY2VWYWx1ZSAgc291cmNlIHZhbHVlIGUuZyBmYWNlYm9va0lkIHZhbHVlLCBldGMuXG4gICAqL1xuICBwcml2YXRlIGFkZFNvdXJjZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UsIHNvdXJjZVZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZXMuZmluZChzID0+IHMuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZSk7XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgc291cmNlLnNvdXJjZUlkID0gc291cmNlVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICAgIHRoaXMuc291cmNlRmFjdG9yeS5uZXdJbnN0YW5jZShzb3VyY2VUeXBlLCBzb3VyY2VWYWx1ZSksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSBzb3VyY2VUeXBlIGF2YXRhciBzb3VyY2UgdHlwZSBlLmcgZmFjZWJvb2ssdHdpdHRlciwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzID0gdGhpcy5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gc291cmNlLnNvdXJjZVR5cGUgIT09IHNvdXJjZVR5cGUpO1xuICB9XG59XG4iXX0=