/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
     * @return {?}
     */
    sortAvatarSources() {
        this.sources.sort((source1, source2) => this.avatarService.copmareSources(source1.sourceType, source2.sourceType));
    }
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    buildTextAvatar(avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    }
    /**
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
     * @param {?} source
     * @return {?}
     */
    fetchAndProcessAsyncAvatar(source) {
        this.avatarService
            .fetchAvatar(source.getAvatar())
            .pipe(takeWhile(() => this.isAlive), map(response => source.processResponse(response, this.size)))
            .subscribe(avatarSrc => (this.avatarSrc = avatarSrc), err => {
            console.error(`ngx-avatar: error while fetching ${source.sourceType} avatar `);
        });
    }
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
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
            const index = this.sources.findIndex(source => source.sourceType === sourceType);
            this.sources[index].sourceId = sourceValue;
        }
    }
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @param {?} sourceType
     * @return {?}
     */
    removeSource(sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            const index = this.sources.findIndex(source => source.sourceType === sourceType);
            this.sources.splice(index, 1);
        }
    }
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    isSourceExist(avatarSource) {
        return this.sources.map(source => source.sourceType).includes(avatarSource);
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
    /** @type {?} */
    AvatarComponent.prototype.currentSource;
    /** @type {?} */
    AvatarComponent.prototype.sources;
    /** @type {?} */
    AvatarComponent.prototype.elementRef;
    /** @type {?} */
    AvatarComponent.prototype.sourceFactory;
    /** @type {?} */
    AvatarComponent.prototype.avatarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBSVgsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQTRDaEQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQXNEMUIsWUFDUyxVQUFzQixFQUN0QixhQUE0QixFQUMzQixhQUE0QjtRQUY3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBdkQvQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFJakIsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUVoQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQTJCakIsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBR2YsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUVuQixrQkFBYSxHQUFHLENBQUMsQ0FB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S0FBSyxTQUFDLFVBQVU7cUJBRWhCLEtBQUssU0FBQyxLQUFLO3VCQUVYLEtBQUssU0FBQyxNQUFNO29CQUVaLEtBQUssU0FBQyxPQUFPOzBCQUViLEtBQUssU0FBQyxhQUFhOzJCQUVuQixLQUFLLFNBQUMsY0FBYzs0QkFHcEIsTUFBTTs7OztJQXpDUCxnQ0FDb0I7O0lBQ3BCLCtCQUNpQjs7SUFDakIsd0NBQ3lCOztJQUN6QixrQ0FDdUI7O0lBQ3ZCLGtDQUN3Qjs7SUFDeEIsc0NBQzJCOztJQUMzQixnQ0FDdUI7O0lBQ3ZCLHVDQUN3Qjs7SUFDeEIsbUNBQ3dCOztJQUN4QixrQ0FDdUI7O0lBQ3ZCLGlDQUNzQjs7SUFDdEIsb0NBQ3lCOztJQUN6QixnQ0FDcUI7O0lBQ3JCLG1DQUN3Qjs7SUFDeEIsaUNBQ3NCOztJQUN0QixpQ0FDc0I7O0lBQ3RCLG1DQUN3Qjs7SUFDeEIsZ0NBQ3FCOztJQUNyQixzQ0FDMkI7O0lBQzNCLHVDQUM0Qjs7SUFFNUIsd0NBQ2tFOztJQUVsRSxrQ0FBc0I7O0lBQ3RCLG9DQUF5Qjs7SUFDekIscUNBQTBCOztJQUMxQixzQ0FBNkI7O0lBQzdCLG9DQUEyQjs7SUFFM0Isd0NBQTBCOztJQUMxQixrQ0FBb0M7O0lBR2xDLHFDQUE2Qjs7SUFDN0Isd0NBQW1DOztJQUNuQyx3Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XG5pbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgU291cmNlRmFjdG9yeSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UuZmFjdG9yeSc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlIH0gZnJvbSAnLi9hdmF0YXIuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IHRha2VXaGlsZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFVuaXZlcnNhbCBhdmF0YXIgY29tcG9uZW50IHRoYXRcbiAqIGdlbmVyYXRlcyBhdmF0YXIgZnJvbSBkaWZmZXJlbnQgc291cmNlc1xuICpcbiAqIGV4cG9ydFxuICogY2xhc3MgQXZhdGFyQ29tcG9uZW50XG4gKiBpbXBsZW1lbnRzIHtPbkNoYW5nZXN9XG4gKi9cblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtYXZhdGFyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAnNTAlJztcbiAgICAgIH1cbiAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKGNsaWNrKT1cIm9uQXZhdGFyQ2xpY2tlZCgpXCJcbiAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRhaW5lclwiXG4gICAgICBbbmdTdHlsZV09XCJob3N0U3R5bGVcIlxuICAgID5cbiAgICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCJhdmF0YXJTcmM7IGVsc2UgdGV4dEF2YXRhclwiXG4gICAgICAgIFtzcmNdPVwiYXZhdGFyU3JjXCJcbiAgICAgICAgW3dpZHRoXT1cInNpemVcIlxuICAgICAgICBbaGVpZ2h0XT1cInNpemVcIlxuICAgICAgICBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiXG4gICAgICAgIChlcnJvcik9XCJmZXRjaEF2YXRhclNvdXJjZSgkZXZlbnQpXCJcbiAgICAgICAgY2xhc3M9XCJhdmF0YXItY29udGVudFwiXG4gICAgICAvPlxuICAgICAgPG5nLXRlbXBsYXRlICN0ZXh0QXZhdGFyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiYXZhdGFyVGV4dFwiIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiPlxuICAgICAgICAgIHt7IGF2YXRhclRleHQgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcHVibGljIHJvdW5kID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgcHVibGljIHNpemUgPSA1MDtcbiAgQElucHV0KClcbiAgcHVibGljIHRleHRTaXplUmF0aW8gPSAzO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZmdDb2xvciA9ICcjRkZGJztcbiAgQElucHV0KClcbiAgcHVibGljIGJvcmRlckNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb3JuZXJSYWRpdXMgPSAwO1xuICBASW5wdXQoJ2ZhY2Vib29rSWQnKVxuICBwdWJsaWMgZmFjZWJvb2s6IHN0cmluZztcbiAgQElucHV0KCd0d2l0dGVySWQnKVxuICBwdWJsaWMgdHdpdHRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2dvb2dsZUlkJylcbiAgcHVibGljIGdvb2dsZTogc3RyaW5nO1xuICBASW5wdXQoJ3Zrb250YWt0ZUlkJylcbiAgcHVibGljIHZrb250YWt0ZTogc3RyaW5nO1xuICBASW5wdXQoJ3NreXBlSWQnKVxuICBwdWJsaWMgc2t5cGU6IHN0cmluZztcbiAgQElucHV0KCdncmF2YXRhcklkJylcbiAgcHVibGljIGdyYXZhdGFyOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ2l0aHViSWQnKVxuICBwdWJsaWMgZ2l0aHViOiBzdHJpbmc7XG4gIEBJbnB1dCgnc3JjJylcbiAgcHVibGljIGN1c3RvbTogc3RyaW5nO1xuICBASW5wdXQoJ25hbWUnKVxuICBwdWJsaWMgaW5pdGlhbHM6IHN0cmluZztcbiAgQElucHV0KCd2YWx1ZScpXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xuICBASW5wdXQoJ3BsYWNlaG9sZGVyJylcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgnaW5pdGlhbHNTaXplJylcbiAgcHVibGljIGluaXRpYWxzU2l6ZTogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2xpY2tPbkF2YXRhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgaXNBbGl2ZSA9IHRydWU7XG4gIHB1YmxpYyBhdmF0YXJTcmM6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclRleHQ6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclN0eWxlOiBhbnkgPSB7fTtcbiAgcHVibGljIGhvc3RTdHlsZTogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBjdXJyZW50U291cmNlID0gMDtcbiAgcHJpdmF0ZSBzb3VyY2VzOiBTb3VyY2VbXSA9IEFycmF5KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHNvdXJjZUZhY3Rvcnk6IFNvdXJjZUZhY3RvcnksXG4gICAgcHJpdmF0ZSBhdmF0YXJTZXJ2aWNlOiBBdmF0YXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgb25BdmF0YXJDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tPbkF2YXRhci5lbWl0KHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2UgLSAxXSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0IGlucHV0cyBjaGFuZ2VcbiAgICpcbiAgICogcGFyYW0ge3sgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9fSBjaGFuZ2VzXG4gICAqXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzU291cmNlKHByb3BOYW1lKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VUeXBlID0gQXZhdGFyU291cmNlW3Byb3BOYW1lLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICBpZiAoY2hhbmdlc1twcm9wTmFtZV0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1twcm9wTmFtZV0uY3VycmVudFZhbHVlO1xuICAgICAgICAgIHRoaXMuYWRkU291cmNlKHNvdXJjZVR5cGUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTb3VyY2Uoc291cmNlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVpbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IHdoZW4gYSBzb3VyY2UgcHJvcGVydHkgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICAvLyB0aGUgZmFsbGJhY2sgc3lzdGVtIG11c3QgYmUgcmUtaW52b2tlZCB3aXRoIHRoZSBuZXcgdmFsdWVzLlxuICAgIHRoaXMuaW5pdGlhbGl6ZUF2YXRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0ge2FueX0gZXZlbnRcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgZmV0Y2hBdmF0YXJTb3VyY2UoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBhdmF0YXJTb3VyY2UgPSB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlXTtcbiAgICBpZiAoIWF2YXRhclNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzVGV4dEF2YXRhcihhdmF0YXJTb3VyY2Uuc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuYnVpbGRUZXh0QXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgICAvLyBUT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuICAgICAgdGhpcy5hdmF0YXJTcmMgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTb3VyY2UrKztcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IGFuZCBpdHMgZmFsbGJhY2sgc3lzdGVtXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVBdmF0YXIoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50U291cmNlID0gMDtcbiAgICBpZiAodGhpcy5zb3VyY2VzLmxlbmd0aCA+IDAgJiYgdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZV0pIHtcbiAgICAgIHRoaXMuc29ydEF2YXRhclNvdXJjZXMoKTtcbiAgICAgIHRoaXMuZmV0Y2hBdmF0YXJTb3VyY2UoKTtcbiAgICAgIHRoaXMuaG9zdFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydEF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+XG4gICAgICB0aGlzLmF2YXRhclNlcnZpY2UuY29wbWFyZVNvdXJjZXMoc291cmNlMS5zb3VyY2VUeXBlLCBzb3VyY2UyLnNvdXJjZVR5cGUpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRUZXh0QXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJUZXh0ID0gYXZhdGFyU291cmNlLmdldEF2YXRhcih0aGlzLmluaXRpYWxzU2l6ZSk7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJTb3VyY2Uuc291cmNlSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEltYWdlQXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW1hZ2VTdHlsZSgpO1xuICAgIGlmIChhdmF0YXJTb3VyY2UgaW5zdGFuY2VvZiBBc3luY1NvdXJjZSkge1xuICAgICAgdGhpcy5mZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIodGhpcy5zaXplKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogcmV0dXJucyBpbml0aWFscyBzdHlsZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJWYWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5yb3VuZCA/ICcxMDAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgY29sb3I6IHRoaXMuZmdDb2xvcixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iZ0NvbG9yXG4gICAgICAgID8gdGhpcy5iZ0NvbG9yXG4gICAgICAgIDogdGhpcy5hdmF0YXJTZXJ2aWNlLmdldFJhbmRvbUNvbG9yKGF2YXRhclZhbHVlKSxcbiAgICAgIGZvbnQ6XG4gICAgICAgIE1hdGguZmxvb3IodGhpcy5zaXplIC8gdGhpcy50ZXh0U2l6ZVJhdGlvKSArXG4gICAgICAgICdweCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcbiAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGltYWdlIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnNTAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUsXG4gICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgaW1hZ2UgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclNlcnZpY2VcbiAgICAgIC5mZXRjaEF2YXRhcihzb3VyY2UuZ2V0QXZhdGFyKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCB0aGlzLnNpemUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgYXZhdGFyU3JjID0+ICh0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNyYyksXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBuZ3gtYXZhdGFyOiBlcnJvciB3aGlsZSBmZXRjaGluZyAke3NvdXJjZS5zb3VyY2VUeXBlfSBhdmF0YXIgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICogcGFyYW0gc291cmNlVmFsdWUgIHNvdXJjZSB2YWx1ZSBlLmcgZmFjZWJvb2tJZCB2YWx1ZSwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICB0aGlzLnNvdXJjZUZhY3RvcnkubmV3SW5zdGFuY2Uoc291cmNlVHlwZSwgc291cmNlVmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlc1tpbmRleF0uc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1NvdXJjZUV4aXN0KGF2YXRhclNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5tYXAoc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlKS5pbmNsdWRlcyhhdmF0YXJTb3VyY2UpO1xuICB9XG59XG4iXX0=