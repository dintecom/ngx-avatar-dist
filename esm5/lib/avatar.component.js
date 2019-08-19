/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                /** @type {?} */
                var sourceType = AvatarSource[propName.toUpperCase()];
                if (changes[propName].currentValue) {
                    /** @type {?} */
                    var currentValue = changes[propName].currentValue;
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
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.initializeAvatar = /**
     * Initialize the avatar component and its fallback system
     * @private
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
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.sortAvatarSources = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.sources.sort((/**
         * @param {?} source1
         * @param {?} source2
         * @return {?}
         */
        function (source1, source2) {
            return _this.avatarService.copmareSources(source1.sourceType, source2.sourceType);
        }));
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildTextAvatar = /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        this.avatarText = avatarSource.getAvatar(this.initialsSize);
        this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.buildImageAvatar = /**
     * @private
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
     * @private
     * @param {?} avatarValue
     * @return {?}
     */
    AvatarComponent.prototype.getInitialsStyle = /**
     *
     * returns initials style
     *
     * memberOf AvatarComponent
     * @private
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
     * @private
     * @return {?}
     */
    AvatarComponent.prototype.getImageStyle = /**
     *
     * returns image style
     *
     * memberOf AvatarComponent
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__assign({ maxWidth: '100%', borderRadius: this.round ? '50%' : this.cornerRadius + 'px', border: this.borderColor ? '1px solid ' + this.borderColor : '', width: this.size, height: this.size }, this.style);
    };
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     */
    /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @private
     * @param {?} source
     * @return {?}
     */
    AvatarComponent.prototype.fetchAndProcessAsyncAvatar = /**
     * Fetch avatar image asynchronously.
     *
     * param {Source} source represents avatar source
     * memberof AvatarComponent
     * @private
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var _this = this;
        if (!this.avatarService.fetchAvatarHasFailedBefore(source.sourceType)) {
            this.avatarService
                .fetchAvatar(source.getAvatar())
                .pipe(takeWhile((/**
             * @return {?}
             */
            function () { return _this.isAlive; })), map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return source.processResponse(response, _this.size); })))
                .subscribe((/**
             * @param {?} avatarSrc
             * @return {?}
             */
            function (avatarSrc) { return (_this.avatarSrc = avatarSrc); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.avatarService.cacheFailedAvatar(source.sourceType);
            }));
        }
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
     * @private
     * @param {?} sourceType
     * @param {?} sourceValue
     * @return {?}
     */
    AvatarComponent.prototype.addSource = /**
     * Add avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * param sourceValue  source value e.g facebookId value, etc.
     * @private
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
            var index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.sourceType === sourceType; }));
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
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    AvatarComponent.prototype.removeSource = /**
     * Remove avatar source
     *
     * param sourceType avatar source type e.g facebook,twitter, etc.
     * @private
     * @param {?} sourceType
     * @return {?}
     */
    function (sourceType) {
        if (this.isSourceExist(sourceType)) {
            /** @type {?} */
            var index = this.sources.findIndex((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return source.sourceType === sourceType; }));
            this.sources.splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    AvatarComponent.prototype.isSourceExist = /**
     * @private
     * @param {?} avatarSource
     * @return {?}
     */
    function (avatarSource) {
        return this.sources.map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return source.sourceType; })).includes(avatarSource);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFXaEQ7SUF1RkUseUJBQ1MsVUFBc0IsRUFDdEIsYUFBNEIsRUFDM0IsYUFBNEI7UUFGN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZEL0IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUlsQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBSWpCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFFaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUEyQmpCLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsWUFBTyxHQUFHLElBQUksQ0FBQztRQUdmLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsWUFBTyxHQUFhLEtB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Qix1Q0FDNEI7O0lBRTVCLHdDQUNrRTs7SUFFbEUsa0NBQXNCOztJQUN0QixvQ0FBeUI7O0lBQ3pCLHFDQUEwQjs7SUFDMUIsc0NBQTZCOztJQUM3QixvQ0FBMkI7Ozs7O0lBRTNCLHdDQUEwQjs7Ozs7SUFDMUIsa0NBQW9DOztJQUdsQyxxQ0FBNkI7O0lBQzdCLHdDQUFtQzs7Ozs7SUFDbkMsd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xuaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXN5bmMtc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyB0YWtlV2hpbGUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBVbml2ZXJzYWwgYXZhdGFyIGNvbXBvbmVudCB0aGF0XG4gKiBnZW5lcmF0ZXMgYXZhdGFyIGZyb20gZGlmZmVyZW50IHNvdXJjZXNcbiAqXG4gKiBleHBvcnRcbiAqIGNsYXNzIEF2YXRhckNvbXBvbmVudFxuICogaW1wbGVtZW50cyB7T25DaGFuZ2VzfVxuICovXG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LWF2YXRhcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJzUwJSc7XG4gICAgICB9XG4gICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIChjbGljayk9XCJvbkF2YXRhckNsaWNrZWQoKVwiXG4gICAgICBjbGFzcz1cImF2YXRhci1jb250YWluZXJcIlxuICAgICAgW25nU3R5bGVdPVwiaG9zdFN0eWxlXCJcbiAgICA+XG4gICAgICA8aW1nXG4gICAgICAgICpuZ0lmPVwiYXZhdGFyU3JjOyBlbHNlIHRleHRBdmF0YXJcIlxuICAgICAgICBbc3JjXT1cImF2YXRhclNyY1wiXG4gICAgICAgIFt3aWR0aF09XCJzaXplXCJcbiAgICAgICAgW2hlaWdodF09XCJzaXplXCJcbiAgICAgICAgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIlxuICAgICAgICAoZXJyb3IpPVwiZmV0Y2hBdmF0YXJTb3VyY2UoJGV2ZW50KVwiXG4gICAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIlxuICAgICAgLz5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdGV4dEF2YXRhcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImF2YXRhclRleHRcIiBjbGFzcz1cImF2YXRhci1jb250ZW50XCIgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIj5cbiAgICAgICAgICB7eyBhdmF0YXJUZXh0IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByb3VuZCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplID0gNTA7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0ZXh0U2l6ZVJhdGlvID0gMztcbiAgQElucHV0KClcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGZnQ29sb3IgPSAnI0ZGRic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBib3JkZXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29ybmVyUmFkaXVzID0gMDtcbiAgQElucHV0KCdmYWNlYm9va0lkJylcbiAgcHVibGljIGZhY2Vib29rOiBzdHJpbmc7XG4gIEBJbnB1dCgndHdpdHRlcklkJylcbiAgcHVibGljIHR3aXR0ZXI6IHN0cmluZztcbiAgQElucHV0KCdnb29nbGVJZCcpXG4gIHB1YmxpYyBnb29nbGU6IHN0cmluZztcbiAgQElucHV0KCd2a29udGFrdGVJZCcpXG4gIHB1YmxpYyB2a29udGFrdGU6IHN0cmluZztcbiAgQElucHV0KCdza3lwZUlkJylcbiAgcHVibGljIHNreXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ3JhdmF0YXJJZCcpXG4gIHB1YmxpYyBncmF2YXRhcjogc3RyaW5nO1xuICBASW5wdXQoJ2dpdGh1YklkJylcbiAgcHVibGljIGdpdGh1Yjogc3RyaW5nO1xuICBASW5wdXQoJ3NyYycpXG4gIHB1YmxpYyBjdXN0b206IHN0cmluZztcbiAgQElucHV0KCduYW1lJylcbiAgcHVibGljIGluaXRpYWxzOiBzdHJpbmc7XG4gIEBJbnB1dCgndmFsdWUnKVxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCdwbGFjZWhvbGRlcicpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2luaXRpYWxzU2l6ZScpXG4gIHB1YmxpYyBpbml0aWFsc1NpemU6IG51bWJlcjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNsaWNrT25BdmF0YXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGlzQWxpdmUgPSB0cnVlO1xuICBwdWJsaWMgYXZhdGFyU3JjOiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJUZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBob3N0U3R5bGU6IGFueSA9IHt9O1xuXG4gIHByaXZhdGUgY3VycmVudFNvdXJjZSA9IDA7XG4gIHByaXZhdGUgc291cmNlczogU291cmNlW10gPSBBcnJheSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBzb3VyY2VGYWN0b3J5OiBTb3VyY2VGYWN0b3J5LFxuICAgIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG9uQXZhdGFyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrT25BdmF0YXIuZW1pdCh0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlIC0gMV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpbnB1dHMgY2hhbmdlXG4gICAqXG4gICAqIHBhcmFtIHt7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfX0gY2hhbmdlc1xuICAgKlxuICAgKiBtZW1iZXJvZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1NvdXJjZShwcm9wTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVHlwZSA9IEF2YXRhclNvdXJjZVtwcm9wTmFtZS50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgaWYgKGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFkZFNvdXJjZShzb3VyY2VUeXBlLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlU291cmNlKHNvdXJjZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlaW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCB3aGVuIGEgc291cmNlIHByb3BlcnR5IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgLy8gdGhlIGZhbGxiYWNrIHN5c3RlbSBtdXN0IGJlIHJlLWludm9rZWQgd2l0aCB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLmluaXRpYWxpemVBdmF0YXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHthbnl9IGV2ZW50XG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGZldGNoQXZhdGFyU291cmNlKGV2ZW50PzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgYXZhdGFyU291cmNlID0gdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZV07XG4gICAgaWYgKCFhdmF0YXJTb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1RleHRBdmF0YXIoYXZhdGFyU291cmNlLnNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLmJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgICAgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U291cmNlKys7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCBhbmQgaXRzIGZhbGxiYWNrIHN5c3RlbVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQXZhdGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNvdXJjZSA9IDA7XG4gICAgaWYgKHRoaXMuc291cmNlcy5sZW5ndGggPiAwICYmIHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2VdKSB7XG4gICAgICB0aGlzLnNvcnRBdmF0YXJTb3VyY2VzKCk7XG4gICAgICB0aGlzLmZldGNoQXZhdGFyU291cmNlKCk7XG4gICAgICB0aGlzLmhvc3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNvcnRBdmF0YXJTb3VyY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlcy5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PlxuICAgICAgdGhpcy5hdmF0YXJTZXJ2aWNlLmNvcG1hcmVTb3VyY2VzKHNvdXJjZTEuc291cmNlVHlwZSwgc291cmNlMi5zb3VyY2VUeXBlKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyVGV4dCA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIodGhpcy5pbml0aWFsc1NpemUpO1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEluaXRpYWxzU3R5bGUoYXZhdGFyU291cmNlLnNvdXJjZUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEltYWdlU3R5bGUoKTtcbiAgICBpZiAoYXZhdGFyU291cmNlIGluc3RhbmNlb2YgQXN5bmNTb3VyY2UpIHtcbiAgICAgIHRoaXMuZmV0Y2hBbmRQcm9jZXNzQXN5bmNBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKHRoaXMuc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW5pdGlhbHMgc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzU3R5bGUoYXZhdGFyVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzEwMCUnIDogdGhpcy5jb3JuZXJSYWRpdXMgKyAncHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlckNvbG9yID8gJzFweCBzb2xpZCAnICsgdGhpcy5ib3JkZXJDb2xvciA6ICcnLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICBjb2xvcjogdGhpcy5mZ0NvbG9yLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJnQ29sb3JcbiAgICAgICAgPyB0aGlzLmJnQ29sb3JcbiAgICAgICAgOiB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0UmFuZG9tQ29sb3IoYXZhdGFyVmFsdWUpLFxuICAgICAgZm9udDpcbiAgICAgICAgTWF0aC5mbG9vcih0aGlzLnNpemUgLyB0aGlzLnRleHRTaXplUmF0aW8pICtcbiAgICAgICAgJ3B4IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxuICAgICAgbGluZUhlaWdodDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW1hZ2Ugc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlU3R5bGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnNTAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUsXG4gICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgaW1hZ2UgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYXZhdGFyU2VydmljZS5mZXRjaEF2YXRhckhhc0ZhaWxlZEJlZm9yZShzb3VyY2Uuc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuYXZhdGFyU2VydmljZVxuICAgICAgICAuZmV0Y2hBdmF0YXIoc291cmNlLmdldEF2YXRhcigpKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlV2hpbGUoKCkgPT4gdGhpcy5pc0FsaXZlKSxcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gc291cmNlLnByb2Nlc3NSZXNwb25zZShyZXNwb25zZSwgdGhpcy5zaXplKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIGF2YXRhclNyYyA9PiAodGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTcmMpLFxuICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmF2YXRhclNlcnZpY2UuY2FjaGVGYWlsZWRBdmF0YXIoc291cmNlLnNvdXJjZVR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICogcGFyYW0gc291cmNlVmFsdWUgIHNvdXJjZSB2YWx1ZSBlLmcgZmFjZWJvb2tJZCB2YWx1ZSwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICB0aGlzLnNvdXJjZUZhY3RvcnkubmV3SW5zdGFuY2Uoc291cmNlVHlwZSwgc291cmNlVmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlc1tpbmRleF0uc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1NvdXJjZUV4aXN0KGF2YXRhclNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5tYXAoc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlKS5pbmNsdWRlcyhhdmF0YXJTb3VyY2UpO1xuICB9XG59XG4iXX0=