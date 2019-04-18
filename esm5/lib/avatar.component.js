/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(elementRef, sourceFactory, avatarService) {
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
    AvatarComponent.prototype.onAvatarClicked = /**
     * @return {?}
     */
    function () {
        this.clickOnAvatar.emit(this.sources[this.currentSource - 1]);
    };
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     */
    /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    AvatarComponent.prototype.ngOnChanges = /**
     * Detect inputs change
     *
     * param {{ [propKey: string]: SimpleChange }} changes
     *
     * memberof AvatarComponent
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        for (var propName in changes) {
            if (this.avatarService.isSource(propName)) {
                if (changes[propName].currentValue) {
                    /** @type {?} */
                    var currentValue = changes[propName].currentValue;
                    this.addSource(AvatarSource[propName.toUpperCase()], currentValue);
                }
                else {
                    this.removeSource(AvatarSource[propName.toUpperCase()]);
                }
            }
        }
        // reintialize the avatar component when a source property value has changed
        // the fallback system must be re-invoked with the new values.
        this.initializeAvatar();
    };
    /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     */
    /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    AvatarComponent.prototype.fetchAvatarSource = /**
     * Fetch avatar source
     *
     * param {any} event
     *
     * memberOf AvatarComponent
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var avatarSource = this.sources[this.currentSource];
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
    };
    /**
     * @return {?}
     */
    AvatarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /**
     * Initialize the avatar component and its fallback system
     */
    /**
     * Initialize the avatar component and its fallback system
     * @return {?}
     */
    AvatarComponent.prototype.initializeAvatar = /**
     * Initialize the avatar component and its fallback system
     * @return {?}
     */
    function () {
        this.currentSource = 0;
        if (this.sources.length > 0 && this.sources[this.currentSource]) {
            this.sortAvatarSources();
            this.fetchAvatarSource();
            this.hostStyle = {
                width: this.size + 'px',
                height: this.size + 'px'
            };
        }
    };
    /**
     * @return {?}
     */
    AvatarComponent.prototype.sortAvatarSources = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sources.sort(function (source1, source2) {
            return _this.avatarService.copmareSources(source1.sourceType, source2.sourceType);
        });
    };
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildTextAvatar = /**
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    };
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildImageAvatar = /**
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        this.avatarStyle = this.getImageStyle();
        if (avatarSource instanceof AsyncSource) {
            this.fetchAndProcessAsyncAvatar(avatarSource);
        }
        else {
            this.avatarSrc = avatarSource.getAvatar(this.size);
        }
    };
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     */
    /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @param {?} avatarValue
     * @return {?}
     */
    AvatarComponent.prototype.getInitialsStyle = /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @param {?} avatarValue
     * @return {?}
     */
    function (avatarValue) {
        return tslib_1.__assign({ textAlign: 'center', borderRadius: this.round ? '100%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', textTransform: 'uppercase', color: this.fgColor, backgroundColor: this.bgColor
                ? this.bgColor
                : this.avatarService.getRandomColor(avatarValue), font: Math.floor(this.size / this.textSizeRatio) +
                'px Helvetica, Arial, sans-serif', lineHeight: this.size + 'px' }, this.style);
    };
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     */
    /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @return {?}
     */
    AvatarComponent.prototype.getImageStyle = /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @return {?}
     */
    function () {
        return tslib_1.__assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size, height: this.size }, this.style);
    };
    /**
     * Fetch avatar image asynchrounsly.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    /**
     * Fetch avatar image asynchrounsly.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @param {?} source
     * @return {?}
     */
    AvatarComponent.prototype.fetchAndProcessAsyncAvatar = /**
     * Fetch avatar image asynchrounsly.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var _this = this;
        this.avatarService
            .fetchAvatar(source.getAvatar())
            .pipe(takeWhile(function () { return _this.isAlive; }), map(function (response) { return source.processResponse(response, _this.size); }))
            .subscribe(function (avatarSrc) { return (_this.avatarSrc = avatarSrc); }, function (err) {
            console.error("ngx-avatar: error while fetching " + source.sourceType + " avatar ");
        });
    };
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     */
    /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    AvatarComponent.prototype.addSource = /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    function (sourceType, sourceValue) {
        if (!this.isSourceExist(sourceType)) {
            this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
        }
        else {
            /** @type {?} */
            var index = this.sources.findIndex(function (source) { return source.sourceType === sourceType; });
            this.sources[index].sourceId = sourceValue;
        }
    };
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     */
    /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @param {?} sourceType
     * @return {?}
     */
    AvatarComponent.prototype.removeSource = /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @param {?} sourceType
     * @return {?}
     */
    function (sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            var index = this.sources.findIndex(function (source) { return source.sourceType === sourceType; });
            this.sources.splice(index, 1);
        }
    };
    /**
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.isSourceExist = /**
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        return this.sources.map(function (source) { return source.sourceType; }).includes(avatarSource);
    };
    AvatarComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-avatar',
                    template: "\n    <div\n      (click)=\"onAvatarClicked()\"\n      class=\"avatar-container\"\n      [ngStyle]=\"hostStyle\"\n    >\n      <img\n        *ngIf=\"avatarSrc; else textAvatar\"\n        [src]=\"avatarSrc\"\n        [width]=\"size\"\n        [height]=\"size\"\n        [ngStyle]=\"avatarStyle\"\n        (error)=\"fetchAvatarSource($event)\"\n        class=\"avatar-content\"\n      />\n      <ng-template #textAvatar>\n        <div *ngIf=\"avatarText\" class=\"avatar-content\" [ngStyle]=\"avatarStyle\">\n          {{ avatarText }}\n        </div>\n      </ng-template>\n    </div>\n  ",
                    styles: ["\n      :host {\n        border-radius: '50%';\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    AvatarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SourceFactory },
        { type: AvatarService }
    ]; };
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
    return AvatarComponent;
}());
export { AvatarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFXaEQ7SUF1RkUseUJBQ1MsVUFBc0IsRUFDdEIsYUFBNEIsRUFDM0IsYUFBNEI7UUFGN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZEL0IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUlsQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBSWpCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFFaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUEyQmpCLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsWUFBTyxHQUFHLElBQUksQ0FBQztRQUdmLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsWUFBTyxHQUFhLEtB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Qzs7SUFHbEMscUNBQTZCOztJQUM3Qix3Q0FBbUM7O0lBQ25DLHdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlJztcbmltcG9ydCB7IEFzeW5jU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2FzeW5jLXNvdXJjZSc7XG5pbXBvcnQgeyBTb3VyY2VGYWN0b3J5IH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZS5mYWN0b3J5JztcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuL2F2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hdmF0YXItc291cmNlLmVudW0nO1xuaW1wb3J0IHsgdGFrZVdoaWxlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVW5pdmVyc2FsIGF2YXRhciBjb21wb25lbnQgdGhhdFxuICogZ2VuZXJhdGVzIGF2YXRhciBmcm9tIGRpZmZlcmVudCBzb3VyY2VzXG4gKlxuICogZXhwb3J0XG4gKiBjbGFzcyBBdmF0YXJDb21wb25lbnRcbiAqIGltcGxlbWVudHMge09uQ2hhbmdlc31cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1hdmF0YXInLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICc1MCUnO1xuICAgICAgfVxuICAgIGBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAoY2xpY2spPVwib25BdmF0YXJDbGlja2VkKClcIlxuICAgICAgY2xhc3M9XCJhdmF0YXItY29udGFpbmVyXCJcbiAgICAgIFtuZ1N0eWxlXT1cImhvc3RTdHlsZVwiXG4gICAgPlxuICAgICAgPGltZ1xuICAgICAgICAqbmdJZj1cImF2YXRhclNyYzsgZWxzZSB0ZXh0QXZhdGFyXCJcbiAgICAgICAgW3NyY109XCJhdmF0YXJTcmNcIlxuICAgICAgICBbd2lkdGhdPVwic2l6ZVwiXG4gICAgICAgIFtoZWlnaHRdPVwic2l6ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCJcbiAgICAgICAgKGVycm9yKT1cImZldGNoQXZhdGFyU291cmNlKCRldmVudClcIlxuICAgICAgICBjbGFzcz1cImF2YXRhci1jb250ZW50XCJcbiAgICAgIC8+XG4gICAgICA8bmctdGVtcGxhdGUgI3RleHRBdmF0YXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhdmF0YXJUZXh0XCIgY2xhc3M9XCJhdmF0YXItY29udGVudFwiIFtuZ1N0eWxlXT1cImF2YXRhclN0eWxlXCI+XG4gICAgICAgICAge3sgYXZhdGFyVGV4dCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgcm91bmQgPSB0cnVlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2l6ZSA9IDUwO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGV4dFNpemVSYXRpbyA9IDM7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBmZ0NvbG9yID0gJyNGRkYnO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYm9yZGVyQ29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHN0eWxlOiBhbnkgPSB7fTtcbiAgQElucHV0KClcbiAgcHVibGljIGNvcm5lclJhZGl1cyA9IDA7XG4gIEBJbnB1dCgnZmFjZWJvb2tJZCcpXG4gIHB1YmxpYyBmYWNlYm9vazogc3RyaW5nO1xuICBASW5wdXQoJ3R3aXR0ZXJJZCcpXG4gIHB1YmxpYyB0d2l0dGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ29vZ2xlSWQnKVxuICBwdWJsaWMgZ29vZ2xlOiBzdHJpbmc7XG4gIEBJbnB1dCgndmtvbnRha3RlSWQnKVxuICBwdWJsaWMgdmtvbnRha3RlOiBzdHJpbmc7XG4gIEBJbnB1dCgnc2t5cGVJZCcpXG4gIHB1YmxpYyBza3lwZTogc3RyaW5nO1xuICBASW5wdXQoJ2dyYXZhdGFySWQnKVxuICBwdWJsaWMgZ3JhdmF0YXI6IHN0cmluZztcbiAgQElucHV0KCdnaXRodWJJZCcpXG4gIHB1YmxpYyBnaXRodWI6IHN0cmluZztcbiAgQElucHV0KCdzcmMnKVxuICBwdWJsaWMgY3VzdG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgnbmFtZScpXG4gIHB1YmxpYyBpbml0aWFsczogc3RyaW5nO1xuICBASW5wdXQoJ3ZhbHVlJylcbiAgcHVibGljIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgncGxhY2Vob2xkZXInKVxuICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCdpbml0aWFsc1NpemUnKVxuICBwdWJsaWMgaW5pdGlhbHNTaXplOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjbGlja09uQXZhdGFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBpc0FsaXZlID0gdHJ1ZTtcbiAgcHVibGljIGF2YXRhclNyYzogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyU3R5bGU6IGFueSA9IHt9O1xuICBwdWJsaWMgaG9zdFN0eWxlOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIGN1cnJlbnRTb3VyY2UgPSAwO1xuICBwcml2YXRlIHNvdXJjZXM6IFNvdXJjZVtdID0gQXJyYXkoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgc291cmNlRmFjdG9yeTogU291cmNlRmFjdG9yeSxcbiAgICBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBvbkF2YXRhckNsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGlja09uQXZhdGFyLmVtaXQodGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZSAtIDFdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaW5wdXRzIGNoYW5nZVxuICAgKlxuICAgKiBwYXJhbSB7eyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcbiAgICpcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmICh0aGlzLmF2YXRhclNlcnZpY2UuaXNTb3VyY2UocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzW3Byb3BOYW1lXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzW3Byb3BOYW1lXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgdGhpcy5hZGRTb3VyY2UoQXZhdGFyU291cmNlW3Byb3BOYW1lLnRvVXBwZXJDYXNlKCldLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlU291cmNlKEF2YXRhclNvdXJjZVtwcm9wTmFtZS50b1VwcGVyQ2FzZSgpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVpbnRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgd2hlbiBhIHNvdXJjZSBwcm9wZXJ0eSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgIC8vIHRoZSBmYWxsYmFjayBzeXN0ZW0gbXVzdCBiZSByZS1pbnZva2VkIHdpdGggdGhlIG5ldyB2YWx1ZXMuXG4gICAgdGhpcy5pbml0aWFsaXplQXZhdGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIHNvdXJjZVxuICAgKlxuICAgKiBwYXJhbSB7YW55fSBldmVudFxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBmZXRjaEF2YXRhclNvdXJjZShldmVudD86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGF2YXRhclNvdXJjZSA9IHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2VdO1xuICAgIGlmICghYXZhdGFyU291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmF2YXRhclNlcnZpY2UuaXNUZXh0QXZhdGFyKGF2YXRhclNvdXJjZS5zb3VyY2VUeXBlKSkge1xuICAgICAgdGhpcy5idWlsZFRleHRBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG4gICAgICB0aGlzLmF2YXRhclNyYyA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWlsZEltYWdlQXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNvdXJjZSsrO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGF2YXRhciBjb21wb25lbnQgYW5kIGl0cyBmYWxsYmFjayBzeXN0ZW1cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUF2YXRhcigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRTb3VyY2UgPSAwO1xuICAgIGlmICh0aGlzLnNvdXJjZXMubGVuZ3RoID4gMCAmJiB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlXSkge1xuICAgICAgdGhpcy5zb3J0QXZhdGFyU291cmNlcygpO1xuICAgICAgdGhpcy5mZXRjaEF2YXRhclNvdXJjZSgpO1xuICAgICAgdGhpcy5ob3N0U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSArICdweCdcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0QXZhdGFyU291cmNlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZXMuc29ydCgoc291cmNlMSwgc291cmNlMikgPT5cbiAgICAgIHRoaXMuYXZhdGFyU2VydmljZS5jb3BtYXJlU291cmNlcyhzb3VyY2UxLnNvdXJjZVR5cGUsIHNvdXJjZTIuc291cmNlVHlwZSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFRleHRBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclRleHQgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKHRoaXMuaW5pdGlhbHNTaXplKTtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbml0aWFsc1N0eWxlKGF2YXRhclNvdXJjZS5zb3VyY2VJZCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlOiBTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclN0eWxlID0gdGhpcy5nZXRJbWFnZVN0eWxlKCk7XG4gICAgaWYgKGF2YXRhclNvdXJjZSBpbnN0YW5jZW9mIEFzeW5jU291cmNlKSB7XG4gICAgICB0aGlzLmZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gYXZhdGFyU291cmNlLmdldEF2YXRhcih0aGlzLnNpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGluaXRpYWxzIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbml0aWFsc1N0eWxlKGF2YXRhclZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5yb3VuZCA/ICcxMDAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgY29sb3I6IHRoaXMuZmdDb2xvcixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iZ0NvbG9yXG4gICAgICAgID8gdGhpcy5iZ0NvbG9yXG4gICAgICAgIDogdGhpcy5hdmF0YXJTZXJ2aWNlLmdldFJhbmRvbUNvbG9yKGF2YXRhclZhbHVlKSxcbiAgICAgIGZvbnQ6XG4gICAgICAgIE1hdGguZmxvb3IodGhpcy5zaXplIC8gdGhpcy50ZXh0U2l6ZVJhdGlvKSArXG4gICAgICAgICdweCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcbiAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGltYWdlIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKCk6IHZvaWQge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzUwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB3aWR0aDogdGhpcy5zaXplLFxuICAgICAgaGVpZ2h0OiB0aGlzLnNpemUsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIGltYWdlIGFzeW5jaHJvdW5zbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclNlcnZpY2VcbiAgICAgIC5mZXRjaEF2YXRhcihzb3VyY2UuZ2V0QXZhdGFyKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCB0aGlzLnNpemUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgYXZhdGFyU3JjID0+ICh0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNyYyksXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBuZ3gtYXZhdGFyOiBlcnJvciB3aGlsZSBmZXRjaGluZyAke3NvdXJjZS5zb3VyY2VUeXBlfSBhdmF0YXIgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICogcGFyYW0gc291cmNlVmFsdWUgIHNvdXJjZSB2YWx1ZSBlLmcgZmFjZWJvb2tJZCB2YWx1ZSwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICB0aGlzLnNvdXJjZUZhY3RvcnkubmV3SW5zdGFuY2Uoc291cmNlVHlwZSwgc291cmNlVmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlc1tpbmRleF0uc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1NvdXJjZUV4aXN0KGF2YXRhclNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5tYXAoc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlKS5pbmNsdWRlcyhhdmF0YXJTb3VyY2UpO1xuICB9XG59XG4iXX0=