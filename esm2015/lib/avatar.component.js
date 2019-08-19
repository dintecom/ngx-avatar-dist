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
        if (!this.avatarService.fetchAvatarHasFailedBefore(source.sourceType)) {
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
            avatarSrc => (this.avatarSrc = avatarSrc)), (/**
             * @param {?} err
             * @return {?}
             */
            err => {
                this.avatarService.cacheFailedAvatar(source.sourceType);
            }));
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBSVgsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQTRDaEQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQXNEMUIsWUFDUyxVQUFzQixFQUN0QixhQUE0QixFQUMzQixhQUE0QjtRQUY3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkQvQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFJakIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUVoQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQTJCakIsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBR2YsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUVuQixrQkFBYSxHQUFHLENBQUMsQ0FB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c0JBRWxCLEtBQUssU0FBQyxXQUFXO3FCQUVqQixLQUFLLFNBQUMsVUFBVTt3QkFFaEIsS0FBSyxTQUFDLGFBQWE7b0JBRW5CLEtBQUssU0FBQyxTQUFTO3VCQUVmLEtBQUssU0FBQyxZQUFZO3FCQUVsQixLQUFLLFNBQUMsVUFBVTtxQkFFaEIsS0FBSyxTQUFDLEtBQUs7dUJBRVgsS0FBSyxTQUFDLE1BQU07b0JBRVosS0FBSyxTQUFDLE9BQU87MEJBRWIsS0FBSyxTQUFDLGFBQWE7MkJBRW5CLEtBQUssU0FBQyxjQUFjOzRCQUdwQixNQUFNOzs7O0lBekNQLGdDQUNvQjs7SUFDcEIsK0JBQ2lCOztJQUNqQix3Q0FDeUI7O0lBQ3pCLGtDQUN1Qjs7SUFDdkIsa0NBQ3dCOztJQUN4QixzQ0FDMkI7O0lBQzNCLGdDQUN1Qjs7SUFDdkIsdUNBQ3dCOztJQUN4QixtQ0FDd0I7O0lBQ3hCLGtDQUN1Qjs7SUFDdkIsaUNBQ3NCOztJQUN0QixvQ0FDeUI7O0lBQ3pCLGdDQUNxQjs7SUFDckIsbUNBQ3dCOztJQUN4QixpQ0FDc0I7O0lBQ3RCLGlDQUNzQjs7SUFDdEIsbUNBQ3dCOztJQUN4QixnQ0FDcUI7O0lBQ3JCLHNDQUMyQjs7SUFDM0IsdUNBQzRCOztJQUU1Qix3Q0FDa0U7O0lBRWxFLGtDQUFzQjs7SUFDdEIsb0NBQXlCOztJQUN6QixxQ0FBMEI7O0lBQzFCLHNDQUE2Qjs7SUFDN0Isb0NBQTJCOzs7OztJQUUzQix3Q0FBMEI7Ozs7O0lBQzFCLGtDQUFvQzs7SUFHbEMscUNBQTZCOztJQUM3Qix3Q0FBbUM7Ozs7O0lBQ25DLHdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcbmltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2FzeW5jLXNvdXJjZSc7XG5pbXBvcnQgeyBTb3VyY2VGYWN0b3J5IH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5mYWN0b3J5JztcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuL2F2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuaW1wb3J0IHsgdGFrZVdoaWxlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVW5pdmVyc2FsIGF2YXRhciBjb21wb25lbnQgdGhhdFxuICogZ2VuZXJhdGVzIGF2YXRhciBmcm9tIGRpZmZlcmVudCBzb3VyY2VzXG4gKlxuICogZXhwb3J0XG4gKiBjbGFzcyBBdmF0YXJDb21wb25lbnRcbiAqIGltcGxlbWVudHMge09uQ2hhbmdlc31cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1hdmF0YXInLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICc1MCUnO1xuICAgICAgfVxuICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAoY2xpY2spPVwib25BdmF0YXJDbGlja2VkKClcIlxuICAgICAgY2xhc3M9XCJhdmF0YXItY29udGFpbmVyXCJcbiAgICAgIFtuZ1N0eWxlXT1cImhvc3RTdHlsZVwiXG4gICAgPlxuICAgICAgPGltZ1xuICAgICAgICAqbmdJZj1cImF2YXRhclNyYzsgZWxzZSB0ZXh0QXZhdGFyXCJcbiAgICAgICAgW3NyY109XCJhdmF0YXJTcmNcIlxuICAgICAgICBbd2lkdGhdPVwic2l6ZVwiXG4gICAgICAgIFtoZWlnaHRdPVwic2l6ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCJcbiAgICAgICAgKGVycm9yKT1cImZldGNoQXZhdGFyU291cmNlKCRldmVudClcIlxuICAgICAgICBjbGFzcz1cImF2YXRhci1jb250ZW50XCJcbiAgICAgIC8+XG4gICAgICA8bmctdGVtcGxhdGUgI3RleHRBdmF0YXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhdmF0YXJUZXh0XCIgY2xhc3M9XCJhdmF0YXItY29udGVudFwiIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCI+XG4gICAgICAgICAge3sgYXZhdGFyVGV4dCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgcm91bmQgPSB0cnVlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZSA9IDUwO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGV4dFNpemVSYXRpbyA9IDM7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBmZ0NvbG9yID0gJyNGRkYnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYm9yZGVyQ29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHN0eWxlOiBhbnkgPSB7fTtcbiAgQElucHV0KClcbiAgcHVibGljIGNvcm5lclJhZGl1cyA9IDA7XG4gIEBJbnB1dCgnZmFjZWJvb2tJZCcpXG4gIHB1YmxpYyBmYWNlYm9vazogc3RyaW5nO1xuICBASW5wdXQoJ3R3aXR0ZXJJZCcpXG4gIHB1YmxpYyB0d2l0dGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ29vZ2xlSWQnKVxuICBwdWJsaWMgZ29vZ2xlOiBzdHJpbmc7XG4gIEBJbnB1dCgndmtvbnRha3RlSWQnKVxuICBwdWJsaWMgdmtvbnRha3RlOiBzdHJpbmc7XG4gIEBJbnB1dCgnc2t5cGVJZCcpXG4gIHB1YmxpYyBza3lwZTogc3RyaW5nO1xuICBASW5wdXQoJ2dyYXZhdGFySWQnKVxuICBwdWJsaWMgZ3JhdmF0YXI6IHN0cmluZztcbiAgQElucHV0KCdnaXRodWJJZCcpXG4gIHB1YmxpYyBnaXRodWI6IHN0cmluZztcbiAgQElucHV0KCdzcmMnKVxuICBwdWJsaWMgY3VzdG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgnbmFtZScpXG4gIHB1YmxpYyBpbml0aWFsczogc3RyaW5nO1xuICBASW5wdXQoJ3ZhbHVlJylcbiAgcHVibGljIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgncGxhY2Vob2xkZXInKVxuICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCdpbml0aWFsc1NpemUnKVxuICBwdWJsaWMgaW5pdGlhbHNTaXplOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjbGlja09uQXZhdGFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBpc0FsaXZlID0gdHJ1ZTtcbiAgcHVibGljIGF2YXRhclNyYzogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyU3R5bGU6IGFueSA9IHt9O1xuICBwdWJsaWMgaG9zdFN0eWxlOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIGN1cnJlbnRTb3VyY2UgPSAwO1xuICBwcml2YXRlIHNvdXJjZXM6IFNvdXJjZVtdID0gQXJyYXkoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgc291cmNlRmFjdG9yeTogU291cmNlRmFjdG9yeSxcbiAgICBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBvbkF2YXRhckNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGlja09uQXZhdGFyLmVtaXQodGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZSAtIDFdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaW5wdXRzIGNoYW5nZVxuICAgKlxuICAgKiBwYXJhbSB7eyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcbiAgICpcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmICh0aGlzLmF2YXRhclNlcnZpY2UuaXNTb3VyY2UocHJvcE5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVR5cGUgPSBBdmF0YXJTb3VyY2VbcHJvcE5hbWUudG9VcHBlckNhc2UoKV07XG4gICAgICAgIGlmIChjaGFuZ2VzW3Byb3BOYW1lXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzW3Byb3BOYW1lXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgdGhpcy5hZGRTb3VyY2Uoc291cmNlVHlwZSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVNvdXJjZShzb3VyY2VUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyByZWluaXRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgd2hlbiBhIHNvdXJjZSBwcm9wZXJ0eSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgIC8vIHRoZSBmYWxsYmFjayBzeXN0ZW0gbXVzdCBiZSByZS1pbnZva2VkIHdpdGggdGhlIG5ldyB2YWx1ZXMuXG4gICAgdGhpcy5pbml0aWFsaXplQXZhdGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSB7YW55fSBldmVudFxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBmZXRjaEF2YXRhclNvdXJjZShldmVudD86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGF2YXRhclNvdXJjZSA9IHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2VdO1xuICAgIGlmICghYXZhdGFyU291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmF2YXRhclNlcnZpY2UuaXNUZXh0QXZhdGFyKGF2YXRhclNvdXJjZS5zb3VyY2VUeXBlKSkge1xuICAgICAgdGhpcy5idWlsZFRleHRBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG4gICAgICB0aGlzLmF2YXRhclNyYyA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWlsZEltYWdlQXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNvdXJjZSsrO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgYW5kIGl0cyBmYWxsYmFjayBzeXN0ZW1cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUF2YXRhcigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRTb3VyY2UgPSAwO1xuICAgIGlmICh0aGlzLnNvdXJjZXMubGVuZ3RoID4gMCAmJiB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlXSkge1xuICAgICAgdGhpcy5zb3J0QXZhdGFyU291cmNlcygpO1xuICAgICAgdGhpcy5mZXRjaEF2YXRhclNvdXJjZSgpO1xuICAgICAgdGhpcy5ob3N0U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSArICdweCdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0QXZhdGFyU291cmNlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZXMuc29ydCgoc291cmNlMSwgc291cmNlMikgPT5cbiAgICAgIHRoaXMuYXZhdGFyU2VydmljZS5jb3BtYXJlU291cmNlcyhzb3VyY2UxLnNvdXJjZVR5cGUsIHNvdXJjZTIuc291cmNlVHlwZSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFRleHRBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclRleHQgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKHRoaXMuaW5pdGlhbHNTaXplKTtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbml0aWFsc1N0eWxlKGF2YXRhclNvdXJjZS5zb3VyY2VJZCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbWFnZVN0eWxlKCk7XG4gICAgaWYgKGF2YXRhclNvdXJjZSBpbnN0YW5jZW9mIEFzeW5jU291cmNlKSB7XG4gICAgICB0aGlzLmZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gYXZhdGFyU291cmNlLmdldEF2YXRhcih0aGlzLnNpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGluaXRpYWxzIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbml0aWFsc1N0eWxlKGF2YXRhclZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5yb3VuZCA/ICcxMDAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgY29sb3I6IHRoaXMuZmdDb2xvcixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iZ0NvbG9yXG4gICAgICAgID8gdGhpcy5iZ0NvbG9yXG4gICAgICAgIDogdGhpcy5hdmF0YXJTZXJ2aWNlLmdldFJhbmRvbUNvbG9yKGF2YXRhclZhbHVlKSxcbiAgICAgIGZvbnQ6XG4gICAgICAgIE1hdGguZmxvb3IodGhpcy5zaXplIC8gdGhpcy50ZXh0U2l6ZVJhdGlvKSArXG4gICAgICAgICdweCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcbiAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGltYWdlIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKCk6IHZvaWQge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzUwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB3aWR0aDogdGhpcy5zaXplLFxuICAgICAgaGVpZ2h0OiB0aGlzLnNpemUsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIGltYWdlIGFzeW5jaHJvbm91c2x5LlxuICAgKlxuICAgKiBwYXJhbSB7U291cmNlfSBzb3VyY2UgcmVwcmVzZW50cyBhdmF0YXIgc291cmNlXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihzb3VyY2U6IEFzeW5jU291cmNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmF2YXRhclNlcnZpY2UuZmV0Y2hBdmF0YXJIYXNGYWlsZWRCZWZvcmUoc291cmNlLnNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLmF2YXRhclNlcnZpY2VcbiAgICAgICAgLmZldGNoQXZhdGFyKHNvdXJjZS5nZXRBdmF0YXIoKSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHNvdXJjZS5wcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UsIHRoaXMuc2l6ZSkpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICBhdmF0YXJTcmMgPT4gKHRoaXMuYXZhdGFyU3JjID0gYXZhdGFyU3JjKSxcbiAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdmF0YXJTZXJ2aWNlLmNhY2hlRmFpbGVkQXZhdGFyKHNvdXJjZS5zb3VyY2VUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqIHBhcmFtIHNvdXJjZVZhbHVlICBzb3VyY2UgdmFsdWUgZS5nIGZhY2Vib29rSWQgdmFsdWUsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgYWRkU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSwgc291cmNlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1NvdXJjZUV4aXN0KHNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLnNvdXJjZXMucHVzaChcbiAgICAgICAgdGhpcy5zb3VyY2VGYWN0b3J5Lm5ld0luc3RhbmNlKHNvdXJjZVR5cGUsIHNvdXJjZVZhbHVlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNvdXJjZXMuZmluZEluZGV4KFxuICAgICAgICBzb3VyY2UgPT4gc291cmNlLnNvdXJjZVR5cGUgPT09IHNvdXJjZVR5cGVcbiAgICAgICk7XG4gICAgICB0aGlzLnNvdXJjZXNbaW5kZXhdLnNvdXJjZUlkID0gc291cmNlVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVNvdXJjZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1NvdXJjZUV4aXN0KHNvdXJjZVR5cGUpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNTb3VyY2VFeGlzdChhdmF0YXJTb3VyY2U6IEF2YXRhclNvdXJjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXMubWFwKHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSkuaW5jbHVkZXMoYXZhdGFyU291cmNlKTtcbiAgfVxufVxuIl19