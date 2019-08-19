/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AsyncSource } from './sources/async-source';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { takeWhile, map } from 'rxjs/operators';
/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */
export class AvatarComponent {
    /**
     * @param {?} elementRef
     * @param {?} sourceFactory
     * @param {?} avatarService
     */
    constructor(elementRef, sourceFactory, avatarService) {
        this.elementRef = elementRef;
        this.sourceFactory = sourceFactory;
        this.avatarService = avatarService;
        this.round = true;
        this.size = 50;
        this.textSizeRatio = 3;
        this.fgColor = '#FFF';
        this.style = {};
        this.cornerRadius = 0;
        this.clickOnAvatar = new EventEmitter();
        this.isAlive = true;
        this.avatarStyle = {};
        this.hostStyle = {};
        this.currentSource = 0;
        this.sources = Array();
    }
    /**
     * @return {?}
     */
    onAvatarClicked() {
        this.clickOnAvatar.emit(this.sources[this.currentSource - 1]);
    }
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (this.avatarService.isSource(propName)) {
                /** @type {?} */
                const sourceType = AvatarSource[propName.toUpperCase()];
                if (changes[propName].currentValue) {
                    /** @type {?} */
                    const currentValue = changes[propName].currentValue;
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
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    fetchAvatarSource(event) {
        /** @type {?} */
        const avatarSource = this.sources[this.currentSource];
        if (!avatarSource) {
            return;
        }
        if (this.avatarService.isTextAvatar(avatarSource.sourceType)) {
            this.buildTextAvatar(avatarSource);
            // TODO: check if this is needed
            this.avatarSrc = undefined;
        }
        else {
            this.buildImageAvatar(avatarSource);
        }
        this.currentSource++;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * Initialize the avatar component and its fallback system
     * @private
     * @return {?}
     */
    initializeAvatar() {
        this.currentSource = 0;
        if (this.sources.length > 0 && this.sources[this.currentSource]) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px'
            };
        }
    }
    /**
     * @private
     * @return {?}
     */
    sortAvatarSources() {
        this.sources.sort((/**
         * @param {?} source1
         * @param {?} source2
         * @return {?}
         */
        (source1, source2) => this.avatarService.copmareSources(source1.sourceType, source2.sourceType)));
    }
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    buildTextAvatar(avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    }
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    buildImageAvatar(avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(this.size);
        }
    }
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @private
     * @param {?} avatarValue
     * @return {?}
     */
    getInitialsStyle(avatarValue) {
        return Object.assign({ textAlign: 'center', borderRadius: this.round ? '100%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', textTransform: 'uppercase', color: this.fgColor, backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue), font: Math.floor(this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif', lineHeight: this.size + 'px' }, this.style);
    }
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @private
     * @return {?}
     */
    getImageStyle() {
        return Object.assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size, height: this.size }, this.style);
    }
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @private
     * @param {?} source
     * @return {?}
     */
    fetchAndProcessAsyncAvatar(source) {
        this.avatarService
            .fetchAvatar(source.getAvatar())
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)), map((/**
         * @param {?} response
         * @return {?}
         */
        response => source.processResponse(response, this.size))))
            .subscribe((/**
         * @param {?} avatarSrc
         * @return {?}
         */
        avatarSrc => (this.avatarSrc = avatarSrc)));
    }
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @private
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    addSource(sourceType, sourceValue) {
        if (!this.isSourceExist(sourceType)) {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
        else {
            /** @type {?} */
            const index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            source => source.sourceType === sourceType));
            this.sources[index].sourceId = sourceValue;
        }
    }
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    removeSource(sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            const index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            source => source.sourceType === sourceType));
            this.sources.splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    isSourceExist(avatarSource) {
        return this.sources.map((/**
         * @param {?} source
         * @return {?}
         */
        source => source.sourceType)).includes(avatarSource);
    }
}
AvatarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'ngx-avatar',
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
        (error)="fetchAvatarSource($event)"
        class="avatar-content"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `,
                styles: [`
      :host {
        border-radius: '50%';
      }
    `]
            }] }
];
/** @nocollapse */
AvatarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: SourceFactory },
    { type: AvatarService }
];
AvatarComponent.propDecorators = {
    round: [{ type: Input }],
    size: [{ type: Input }],
    textSizeRatio: [{ type: Input }],
    bgColor: [{ type: Input }],
    fgColor: [{ type: Input }],
    borderColor: [{ type: Input }],
    style: [{ type: Input }],
    cornerRadius: [{ type: Input }],
    facebook: [{ type: Input, args: ['facebookId',] }],
    twitter: [{ type: Input, args: ['twitterId',] }],
    google: [{ type: Input, args: ['googleId',] }],
    vkontakte: [{ type: Input, args: ['vkontakteId',] }],
    skype: [{ type: Input, args: ['skypeId',] }],
    gravatar: [{ type: Input, args: ['gravatarId',] }],
    github: [{ type: Input, args: ['githubId',] }],
    custom: [{ type: Input, args: ['src',] }],
    initials: [{ type: Input, args: ['name',] }],
    value: [{ type: Input, args: ['value',] }],
    placeholder: [{ type: Input, args: ['placeholder',] }],
    initialsSize: [{ type: Input, args: ['initialsSize',] }],
    clickOnAvatar: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AvatarComponent.prototype.round;
    /** @type {?} */
    AvatarComponent.prototype.size;
    /** @type {?} */
    AvatarComponent.prototype.textSizeRatio;
    /** @type {?} */
    AvatarComponent.prototype.bgColor;
    /** @type {?} */
    AvatarComponent.prototype.fgColor;
    /** @type {?} */
    AvatarComponent.prototype.borderColor;
    /** @type {?} */
    AvatarComponent.prototype.style;
    /** @type {?} */
    AvatarComponent.prototype.cornerRadius;
    /** @type {?} */
    AvatarComponent.prototype.facebook;
    /** @type {?} */
    AvatarComponent.prototype.twitter;
    /** @type {?} */
    AvatarComponent.prototype.google;
    /** @type {?} */
    AvatarComponent.prototype.vkontakte;
    /** @type {?} */
    AvatarComponent.prototype.skype;
    /** @type {?} */
    AvatarComponent.prototype.gravatar;
    /** @type {?} */
    AvatarComponent.prototype.github;
    /** @type {?} */
    AvatarComponent.prototype.custom;
    /** @type {?} */
    AvatarComponent.prototype.initials;
    /** @type {?} */
    AvatarComponent.prototype.value;
    /** @type {?} */
    AvatarComponent.prototype.placeholder;
    /** @type {?} */
    AvatarComponent.prototype.initialsSize;
    /** @type {?} */
    AvatarComponent.prototype.clickOnAvatar;
    /** @type {?} */
    AvatarComponent.prototype.isAlive;
    /** @type {?} */
    AvatarComponent.prototype.avatarSrc;
    /** @type {?} */
    AvatarComponent.prototype.avatarText;
    /** @type {?} */
    AvatarComponent.prototype.avatarStyle;
    /** @type {?} */
    AvatarComponent.prototype.hostStyle;
    /**
     * @type {?}
     * @private
     */
    AvatarComponent.prototype.currentSource;
    /**
     * @type {?}
     * @private
     */
    AvatarComponent.prototype.sources;
    /** @type {?} */
    AvatarComponent.prototype.elementRef;
    /** @type {?} */
    AvatarComponent.prototype.sourceFactory;
    /**
     * @type {?}
     * @private
     */
    AvatarComponent.prototype.avatarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBSVgsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQTRDaEQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQXNEMUIsWUFDUyxVQUFzQixFQUN0QixhQUE0QixFQUMzQixhQUE0QjtRQUY3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkQvQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFJakIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUVoQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQTJCakIsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBR2YsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUVuQixrQkFBYSxHQUFHLENBQUMsQ0FB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WixLQUFLLFNBQUMsT0FBTzswQkFFYixLQUFLLFNBQUMsYUFBYTsyQkFFbkIsS0FBSyxTQUFDLGNBQWM7NEJBR3BCLE1BQU07Ozs7SUF6Q1AsZ0NBQ29COztJQUNwQiwrQkFDaUI7O0lBQ2pCLHdDQUN5Qjs7SUFDekIsa0NBQ3VCOztJQUN2QixrQ0FDd0I7O0lBQ3hCLHNDQUMyQjs7SUFDM0IsZ0NBQ3VCOztJQUN2Qix1Q0FDd0I7O0lBQ3hCLG1DQUN3Qjs7SUFDeEIsa0NBQ3VCOztJQUN2QixpQ0FDc0I7O0lBQ3RCLG9DQUN5Qjs7SUFDekIsZ0NBQ3FCOztJQUNyQixtQ0FDd0I7O0lBQ3hCLGlDQUNzQjs7SUFDdEIsaUNBQ3NCOztJQUN0QixtQ0FDd0I7O0lBQ3hCLGdDQUNxQjs7SUFDckIsc0NBQzJCOztJQUMzQix1Q0FDNEI7O0lBRTVCLHdDQUNrRTs7SUFFbEUsa0NBQXNCOztJQUN0QixvQ0FBeUI7O0lBQ3pCLHFDQUEwQjs7SUFDMUIsc0NBQTZCOztJQUM3QixvQ0FBMkI7Ozs7O0lBRTNCLHdDQUEwQjs7Ozs7SUFDMUIsa0NBQW9DOztJQUdsQyxxQ0FBNkI7O0lBQzdCLHdDQUFtQzs7Ozs7SUFDbkMsd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xuaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXN5bmMtc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyB0YWtlV2hpbGUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBVbml2ZXJzYWwgYXZhdGFyIGNvbXBvbmVudCB0aGF0XG4gKiBnZW5lcmF0ZXMgYXZhdGFyIGZyb20gZGlmZmVyZW50IHNvdXJjZXNcbiAqXG4gKiBleHBvcnRcbiAqIGNsYXNzIEF2YXRhckNvbXBvbmVudFxuICogaW1wbGVtZW50cyB7T25DaGFuZ2VzfVxuICovXG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LWF2YXRhcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJzUwJSc7XG4gICAgICB9XG4gICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIChjbGljayk9XCJvbkF2YXRhckNsaWNrZWQoKVwiXG4gICAgICBjbGFzcz1cImF2YXRhci1jb250YWluZXJcIlxuICAgICAgW25nU3R5bGVdPVwiaG9zdFN0eWxlXCJcbiAgICA+XG4gICAgICA8aW1nXG4gICAgICAgICpuZ0lmPVwiYXZhdGFyU3JjOyBlbHNlIHRleHRBdmF0YXJcIlxuICAgICAgICBbc3JjXT1cImF2YXRhclNyY1wiXG4gICAgICAgIFt3aWR0aF09XCJzaXplXCJcbiAgICAgICAgW2hlaWdodF09XCJzaXplXCJcbiAgICAgICAgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIlxuICAgICAgICAoZXJyb3IpPVwiZmV0Y2hBdmF0YXJTb3VyY2UoJGV2ZW50KVwiXG4gICAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIlxuICAgICAgLz5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdGV4dEF2YXRhcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImF2YXRhclRleHRcIiBjbGFzcz1cImF2YXRhci1jb250ZW50XCIgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIj5cbiAgICAgICAgICB7eyBhdmF0YXJUZXh0IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByb3VuZCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplID0gNTA7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0ZXh0U2l6ZVJhdGlvID0gMztcbiAgQElucHV0KClcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGZnQ29sb3IgPSAnI0ZGRic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBib3JkZXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29ybmVyUmFkaXVzID0gMDtcbiAgQElucHV0KCdmYWNlYm9va0lkJylcbiAgcHVibGljIGZhY2Vib29rOiBzdHJpbmc7XG4gIEBJbnB1dCgndHdpdHRlcklkJylcbiAgcHVibGljIHR3aXR0ZXI6IHN0cmluZztcbiAgQElucHV0KCdnb29nbGVJZCcpXG4gIHB1YmxpYyBnb29nbGU6IHN0cmluZztcbiAgQElucHV0KCd2a29udGFrdGVJZCcpXG4gIHB1YmxpYyB2a29udGFrdGU6IHN0cmluZztcbiAgQElucHV0KCdza3lwZUlkJylcbiAgcHVibGljIHNreXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ3JhdmF0YXJJZCcpXG4gIHB1YmxpYyBncmF2YXRhcjogc3RyaW5nO1xuICBASW5wdXQoJ2dpdGh1YklkJylcbiAgcHVibGljIGdpdGh1Yjogc3RyaW5nO1xuICBASW5wdXQoJ3NyYycpXG4gIHB1YmxpYyBjdXN0b206IHN0cmluZztcbiAgQElucHV0KCduYW1lJylcbiAgcHVibGljIGluaXRpYWxzOiBzdHJpbmc7XG4gIEBJbnB1dCgndmFsdWUnKVxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCdwbGFjZWhvbGRlcicpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2luaXRpYWxzU2l6ZScpXG4gIHB1YmxpYyBpbml0aWFsc1NpemU6IG51bWJlcjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNsaWNrT25BdmF0YXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGlzQWxpdmUgPSB0cnVlO1xuICBwdWJsaWMgYXZhdGFyU3JjOiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJUZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBob3N0U3R5bGU6IGFueSA9IHt9O1xuXG4gIHByaXZhdGUgY3VycmVudFNvdXJjZSA9IDA7XG4gIHByaXZhdGUgc291cmNlczogU291cmNlW10gPSBBcnJheSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBzb3VyY2VGYWN0b3J5OiBTb3VyY2VGYWN0b3J5LFxuICAgIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG9uQXZhdGFyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrT25BdmF0YXIuZW1pdCh0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlIC0gMV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpbnB1dHMgY2hhbmdlXG4gICAqXG4gICAqIHBhcmFtIHt7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfX0gY2hhbmdlc1xuICAgKlxuICAgKiBtZW1iZXJvZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1NvdXJjZShwcm9wTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVHlwZSA9IEF2YXRhclNvdXJjZVtwcm9wTmFtZS50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgaWYgKGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFkZFNvdXJjZShzb3VyY2VUeXBlLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlU291cmNlKHNvdXJjZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlaW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCB3aGVuIGEgc291cmNlIHByb3BlcnR5IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgLy8gdGhlIGZhbGxiYWNrIHN5c3RlbSBtdXN0IGJlIHJlLWludm9rZWQgd2l0aCB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLmluaXRpYWxpemVBdmF0YXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHthbnl9IGV2ZW50XG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGZldGNoQXZhdGFyU291cmNlKGV2ZW50PzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgYXZhdGFyU291cmNlID0gdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZV07XG4gICAgaWYgKCFhdmF0YXJTb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1RleHRBdmF0YXIoYXZhdGFyU291cmNlLnNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLmJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgICAgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U291cmNlKys7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCBhbmQgaXRzIGZhbGxiYWNrIHN5c3RlbVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQXZhdGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNvdXJjZSA9IDA7XG4gICAgaWYgKHRoaXMuc291cmNlcy5sZW5ndGggPiAwICYmIHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2VdKSB7XG4gICAgICB0aGlzLnNvcnRBdmF0YXJTb3VyY2VzKCk7XG4gICAgICB0aGlzLmZldGNoQXZhdGFyU291cmNlKCk7XG4gICAgICB0aGlzLmhvc3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNvcnRBdmF0YXJTb3VyY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlcy5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PlxuICAgICAgdGhpcy5hdmF0YXJTZXJ2aWNlLmNvcG1hcmVTb3VyY2VzKHNvdXJjZTEuc291cmNlVHlwZSwgc291cmNlMi5zb3VyY2VUeXBlKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyVGV4dCA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIodGhpcy5pbml0aWFsc1NpemUpO1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEluaXRpYWxzU3R5bGUoYXZhdGFyU291cmNlLnNvdXJjZUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEltYWdlU3R5bGUoKTtcbiAgICBpZiAoYXZhdGFyU291cmNlIGluc3RhbmNlb2YgQXN5bmNTb3VyY2UpIHtcbiAgICAgIHRoaXMuZmV0Y2hBbmRQcm9jZXNzQXN5bmNBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKHRoaXMuc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW5pdGlhbHMgc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzU3R5bGUoYXZhdGFyVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzEwMCUnIDogdGhpcy5jb3JuZXJSYWRpdXMgKyAncHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlckNvbG9yID8gJzFweCBzb2xpZCAnICsgdGhpcy5ib3JkZXJDb2xvciA6ICcnLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICBjb2xvcjogdGhpcy5mZ0NvbG9yLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJnQ29sb3JcbiAgICAgICAgPyB0aGlzLmJnQ29sb3JcbiAgICAgICAgOiB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVmFsdWUpLFxuICAgICAgZm9udDpcbiAgICAgICAgTWF0aC5mbG9vcih0aGlzLnNpemUgLyB0aGlzLnRleHRTaXplUmF0aW8pICtcbiAgICAgICAgJ3B4IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxuICAgICAgbGluZUhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW1hZ2Ugc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlU3R5bGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnNTAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUsXG4gICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgaW1hZ2UgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclNlcnZpY2VcbiAgICAgIC5mZXRjaEF2YXRhcihzb3VyY2UuZ2V0QXZhdGFyKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCB0aGlzLnNpemUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgYXZhdGFyU3JjID0+ICh0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNyYylcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICogcGFyYW0gc291cmNlVmFsdWUgIHNvdXJjZSB2YWx1ZSBlLmcgZmFjZWJvb2tJZCB2YWx1ZSwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICB0aGlzLnNvdXJjZUZhY3RvcnkubmV3SW5zdGFuY2Uoc291cmNlVHlwZSwgc291cmNlVmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlc1tpbmRleF0uc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1NvdXJjZUV4aXN0KGF2YXRhclNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5tYXAoc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlKS5pbmNsdWRlcyhhdmF0YXJTb3VyY2UpO1xuICB9XG59XG4iXX0=