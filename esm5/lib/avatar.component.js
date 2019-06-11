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
            console.error("ngx-avatar: error while fetching " + source.sourceType + " avatar ");
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFXaEQ7SUF1RkUseUJBQ1MsVUFBc0IsRUFDdEIsYUFBNEIsRUFDM0IsYUFBNEI7UUFGN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZEL0IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUlsQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBSWpCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFFaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUEyQmpCLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsWUFBTyxHQUFHLElBQUksQ0FBQztRQUdmLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsWUFBTyxHQUFhLEtB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QzdCLG9DQUEyQjs7Ozs7SUFFM0Isd0NBQTBCOzs7OztJQUMxQixrQ0FBb0M7O0lBR2xDLHFDQUE2Qjs7SUFDN0Isd0NBQW1DOzs7OztJQUNuQyx3Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XG5pbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vc291cmNlcy9hc3luYy1zb3VyY2UnO1xuaW1wb3J0IHsgU291cmNlRmFjdG9yeSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UuZmFjdG9yeSc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlIH0gZnJvbSAnLi9hdmF0YXIuc2VydmljZSc7XG5pbXBvcnQgeyBBdmF0YXJTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXZhdGFyLXNvdXJjZS5lbnVtJztcbmltcG9ydCB7IHRha2VXaGlsZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFVuaXZlcnNhbCBhdmF0YXIgY29tcG9uZW50IHRoYXRcbiAqIGdlbmVyYXRlcyBhdmF0YXIgZnJvbSBkaWZmZXJlbnQgc291cmNlc1xuICpcbiAqIGV4cG9ydFxuICogY2xhc3MgQXZhdGFyQ29tcG9uZW50XG4gKiBpbXBsZW1lbnRzIHtPbkNoYW5nZXN9XG4gKi9cblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtYXZhdGFyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAnNTAlJztcbiAgICAgIH1cbiAgICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKGNsaWNrKT1cIm9uQXZhdGFyQ2xpY2tlZCgpXCJcbiAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRhaW5lclwiXG4gICAgICBbbmdTdHlsZV09XCJob3N0U3R5bGVcIlxuICAgID5cbiAgICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCJhdmF0YXJTcmM7IGVsc2UgdGV4dEF2YXRhclwiXG4gICAgICAgIFtzcmNdPVwiYXZhdGFyU3JjXCJcbiAgICAgICAgW3dpZHRoXT1cInNpemVcIlxuICAgICAgICBbaGVpZ2h0XT1cInNpemVcIlxuICAgICAgICBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiXG4gICAgICAgIChlcnJvcik9XCJmZXRjaEF2YXRhclNvdXJjZSgkZXZlbnQpXCJcbiAgICAgICAgY2xhc3M9XCJhdmF0YXItY29udGVudFwiXG4gICAgICAvPlxuICAgICAgPG5nLXRlbXBsYXRlICN0ZXh0QXZhdGFyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiYXZhdGFyVGV4dFwiIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJhdmF0YXJTdHlsZVwiPlxuICAgICAgICAgIHt7IGF2YXRhclRleHQgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcHVibGljIHJvdW5kID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgcHVibGljIHNpemUgPSA1MDtcbiAgQElucHV0KClcbiAgcHVibGljIHRleHRTaXplUmF0aW8gPSAzO1xuICBASW5wdXQoKVxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZmdDb2xvciA9ICcjRkZGJztcbiAgQElucHV0KClcbiAgcHVibGljIGJvcmRlckNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb3JuZXJSYWRpdXMgPSAwO1xuICBASW5wdXQoJ2ZhY2Vib29rSWQnKVxuICBwdWJsaWMgZmFjZWJvb2s6IHN0cmluZztcbiAgQElucHV0KCd0d2l0dGVySWQnKVxuICBwdWJsaWMgdHdpdHRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2dvb2dsZUlkJylcbiAgcHVibGljIGdvb2dsZTogc3RyaW5nO1xuICBASW5wdXQoJ3Zrb250YWt0ZUlkJylcbiAgcHVibGljIHZrb250YWt0ZTogc3RyaW5nO1xuICBASW5wdXQoJ3NreXBlSWQnKVxuICBwdWJsaWMgc2t5cGU6IHN0cmluZztcbiAgQElucHV0KCdncmF2YXRhcklkJylcbiAgcHVibGljIGdyYXZhdGFyOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ2l0aHViSWQnKVxuICBwdWJsaWMgZ2l0aHViOiBzdHJpbmc7XG4gIEBJbnB1dCgnc3JjJylcbiAgcHVibGljIGN1c3RvbTogc3RyaW5nO1xuICBASW5wdXQoJ25hbWUnKVxuICBwdWJsaWMgaW5pdGlhbHM6IHN0cmluZztcbiAgQElucHV0KCd2YWx1ZScpXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xuICBASW5wdXQoJ3BsYWNlaG9sZGVyJylcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgnaW5pdGlhbHNTaXplJylcbiAgcHVibGljIGluaXRpYWxzU2l6ZTogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2xpY2tPbkF2YXRhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgaXNBbGl2ZSA9IHRydWU7XG4gIHB1YmxpYyBhdmF0YXJTcmM6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclRleHQ6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclN0eWxlOiBhbnkgPSB7fTtcbiAgcHVibGljIGhvc3RTdHlsZTogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBjdXJyZW50U291cmNlID0gMDtcbiAgcHJpdmF0ZSBzb3VyY2VzOiBTb3VyY2VbXSA9IEFycmF5KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHNvdXJjZUZhY3Rvcnk6IFNvdXJjZUZhY3RvcnksXG4gICAgcHJpdmF0ZSBhdmF0YXJTZXJ2aWNlOiBBdmF0YXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgb25BdmF0YXJDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tPbkF2YXRhci5lbWl0KHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2UgLSAxXSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0IGlucHV0cyBjaGFuZ2VcbiAgICpcbiAgICogcGFyYW0ge3sgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9fSBjaGFuZ2VzXG4gICAqXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzU291cmNlKHByb3BOYW1lKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VUeXBlID0gQXZhdGFyU291cmNlW3Byb3BOYW1lLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICBpZiAoY2hhbmdlc1twcm9wTmFtZV0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1twcm9wTmFtZV0uY3VycmVudFZhbHVlO1xuICAgICAgICAgIHRoaXMuYWRkU291cmNlKHNvdXJjZVR5cGUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTb3VyY2Uoc291cmNlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVpbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IHdoZW4gYSBzb3VyY2UgcHJvcGVydHkgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICAvLyB0aGUgZmFsbGJhY2sgc3lzdGVtIG11c3QgYmUgcmUtaW52b2tlZCB3aXRoIHRoZSBuZXcgdmFsdWVzLlxuICAgIHRoaXMuaW5pdGlhbGl6ZUF2YXRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0ge2FueX0gZXZlbnRcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgZmV0Y2hBdmF0YXJTb3VyY2UoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBhdmF0YXJTb3VyY2UgPSB0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlXTtcbiAgICBpZiAoIWF2YXRhclNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdmF0YXJTZXJ2aWNlLmlzVGV4dEF2YXRhcihhdmF0YXJTb3VyY2Uuc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuYnVpbGRUZXh0QXZhdGFyKGF2YXRhclNvdXJjZSk7XG4gICAgICAvLyBUT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuICAgICAgdGhpcy5hdmF0YXJTcmMgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTb3VyY2UrKztcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhdmF0YXIgY29tcG9uZW50IGFuZCBpdHMgZmFsbGJhY2sgc3lzdGVtXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVBdmF0YXIoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50U291cmNlID0gMDtcbiAgICBpZiAodGhpcy5zb3VyY2VzLmxlbmd0aCA+IDAgJiYgdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZV0pIHtcbiAgICAgIHRoaXMuc29ydEF2YXRhclNvdXJjZXMoKTtcbiAgICAgIHRoaXMuZmV0Y2hBdmF0YXJTb3VyY2UoKTtcbiAgICAgIHRoaXMuaG9zdFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5zaXplICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydEF2YXRhclNvdXJjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2VzLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+XG4gICAgICB0aGlzLmF2YXRhclNlcnZpY2UuY29wbWFyZVNvdXJjZXMoc291cmNlMS5zb3VyY2VUeXBlLCBzb3VyY2UyLnNvdXJjZVR5cGUpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRUZXh0QXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJUZXh0ID0gYXZhdGFyU291cmNlLmdldEF2YXRhcih0aGlzLmluaXRpYWxzU2l6ZSk7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJTb3VyY2Uuc291cmNlSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEltYWdlQXZhdGFyKGF2YXRhclNvdXJjZTogU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTdHlsZSA9IHRoaXMuZ2V0SW1hZ2VTdHlsZSgpO1xuICAgIGlmIChhdmF0YXJTb3VyY2UgaW5zdGFuY2VvZiBBc3luY1NvdXJjZSkge1xuICAgICAgdGhpcy5mZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIodGhpcy5zaXplKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogcmV0dXJucyBpbml0aWFscyBzdHlsZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHNTdHlsZShhdmF0YXJWYWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogdGhpcy5yb3VuZCA/ICcxMDAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgY29sb3I6IHRoaXMuZmdDb2xvcixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iZ0NvbG9yXG4gICAgICAgID8gdGhpcy5iZ0NvbG9yXG4gICAgICAgIDogdGhpcy5hdmF0YXJTZXJ2aWNlLmdldFJhbmRvbUNvbG9yKGF2YXRhclZhbHVlKSxcbiAgICAgIGZvbnQ6XG4gICAgICAgIE1hdGguZmxvb3IodGhpcy5zaXplIC8gdGhpcy50ZXh0U2l6ZVJhdGlvKSArXG4gICAgICAgICdweCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJyxcbiAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiByZXR1cm5zIGltYWdlIHN0eWxlXG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnNTAlJyA6IHRoaXMuY29ybmVyUmFkaXVzICsgJ3B4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJDb2xvciA/ICcxcHggc29saWQgJyArIHRoaXMuYm9yZGVyQ29sb3IgOiAnJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUsXG4gICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSxcbiAgICAgIC4uLnRoaXMuc3R5bGVcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgaW1hZ2UgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIHBhcmFtIHtTb3VyY2V9IHNvdXJjZSByZXByZXNlbnRzIGF2YXRhciBzb3VyY2VcbiAgICogbWVtYmVyb2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGZldGNoQW5kUHJvY2Vzc0FzeW5jQXZhdGFyKHNvdXJjZTogQXN5bmNTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmF2YXRhclNlcnZpY2VcbiAgICAgIC5mZXRjaEF2YXRhcihzb3VyY2UuZ2V0QXZhdGFyKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSksXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiBzb3VyY2UucHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlLCB0aGlzLnNpemUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgYXZhdGFyU3JjID0+ICh0aGlzLmF2YXRhclNyYyA9IGF2YXRhclNyYyksXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBuZ3gtYXZhdGFyOiBlcnJvciB3aGlsZSBmZXRjaGluZyAke3NvdXJjZS5zb3VyY2VUeXBlfSBhdmF0YXIgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICogcGFyYW0gc291cmNlVmFsdWUgIHNvdXJjZSB2YWx1ZSBlLmcgZmFjZWJvb2tJZCB2YWx1ZSwgZXRjLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRTb3VyY2Uoc291cmNlVHlwZTogQXZhdGFyU291cmNlLCBzb3VyY2VWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5wdXNoKFxuICAgICAgICB0aGlzLnNvdXJjZUZhY3RvcnkubmV3SW5zdGFuY2Uoc291cmNlVHlwZSwgc291cmNlVmFsdWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlc1tpbmRleF0uc291cmNlSWQgPSBzb3VyY2VWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGF2YXRhciBzb3VyY2VcbiAgICpcbiAgICogcGFyYW0gc291cmNlVHlwZSBhdmF0YXIgc291cmNlIHR5cGUgZS5nIGZhY2Vib29rLHR3aXR0ZXIsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU291cmNlRXhpc3Qoc291cmNlVHlwZSkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChcbiAgICAgICAgc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlID09PSBzb3VyY2VUeXBlXG4gICAgICApO1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1NvdXJjZUV4aXN0KGF2YXRhclNvdXJjZTogQXZhdGFyU291cmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5tYXAoc291cmNlID0+IHNvdXJjZS5zb3VyY2VUeXBlKS5pbmNsdWRlcyhhdmF0YXJTb3VyY2UpO1xuICB9XG59XG4iXX0=