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
     * @param {?} source
     * @return {?}
     */
    AvatarComponent.prototype.fetchAndProcessAsyncAvatar = /**
     * Fetch avatar image asynchronously.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFXaEQ7SUF1RkUseUJBQ1MsVUFBc0IsRUFDdEIsYUFBNEIsRUFDM0IsYUFBNEI7UUFGN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXZEL0IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUViLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUlsQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBSWpCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFFaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUEyQmpCLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsWUFBTyxHQUFHLElBQUksQ0FBQztRQUdmLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsWUFBTyxHQUFhLEtB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QyxxQ0FBNkI7O0lBQzdCLHdDQUFtQzs7SUFDbkMsd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gJy4vc291cmNlcy9zb3VyY2UnO1xuaW1wb3J0IHsgQXN5bmNTb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMvYXN5bmMtc291cmNlJztcbmltcG9ydCB7IFNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL3NvdXJjZXMvc291cmNlLmZhY3RvcnknO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4vYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL2F2YXRhci1zb3VyY2UuZW51bSc7XG5pbXBvcnQgeyB0YWtlV2hpbGUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBVbml2ZXJzYWwgYXZhdGFyIGNvbXBvbmVudCB0aGF0XG4gKiBnZW5lcmF0ZXMgYXZhdGFyIGZyb20gZGlmZmVyZW50IHNvdXJjZXNcbiAqXG4gKiBleHBvcnRcbiAqIGNsYXNzIEF2YXRhckNvbXBvbmVudFxuICogaW1wbGVtZW50cyB7T25DaGFuZ2VzfVxuICovXG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LWF2YXRhcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJzUwJSc7XG4gICAgICB9XG4gICAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIChjbGljayk9XCJvbkF2YXRhckNsaWNrZWQoKVwiXG4gICAgICBjbGFzcz1cImF2YXRhci1jb250YWluZXJcIlxuICAgICAgW25nU3R5bGVdPVwiaG9zdFN0eWxlXCJcbiAgICA+XG4gICAgICA8aW1nXG4gICAgICAgICpuZ0lmPVwiYXZhdGFyU3JjOyBlbHNlIHRleHRBdmF0YXJcIlxuICAgICAgICBbc3JjXT1cImF2YXRhclNyY1wiXG4gICAgICAgIFt3aWR0aF09XCJzaXplXCJcbiAgICAgICAgW2hlaWdodF09XCJzaXplXCJcbiAgICAgICAgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIlxuICAgICAgICAoZXJyb3IpPVwiZmV0Y2hBdmF0YXJTb3VyY2UoJGV2ZW50KVwiXG4gICAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIlxuICAgICAgLz5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdGV4dEF2YXRhcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImF2YXRhclRleHRcIiBjbGFzcz1cImF2YXRhci1jb250ZW50XCIgW25nU3R5bGVdPVwiYXZhdGFyU3R5bGVcIj5cbiAgICAgICAgICB7eyBhdmF0YXJUZXh0IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByb3VuZCA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaXplID0gNTA7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0ZXh0U2l6ZVJhdGlvID0gMztcbiAgQElucHV0KClcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGZnQ29sb3IgPSAnI0ZGRic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBib3JkZXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgc3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29ybmVyUmFkaXVzID0gMDtcbiAgQElucHV0KCdmYWNlYm9va0lkJylcbiAgcHVibGljIGZhY2Vib29rOiBzdHJpbmc7XG4gIEBJbnB1dCgndHdpdHRlcklkJylcbiAgcHVibGljIHR3aXR0ZXI6IHN0cmluZztcbiAgQElucHV0KCdnb29nbGVJZCcpXG4gIHB1YmxpYyBnb29nbGU6IHN0cmluZztcbiAgQElucHV0KCd2a29udGFrdGVJZCcpXG4gIHB1YmxpYyB2a29udGFrdGU6IHN0cmluZztcbiAgQElucHV0KCdza3lwZUlkJylcbiAgcHVibGljIHNreXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgnZ3JhdmF0YXJJZCcpXG4gIHB1YmxpYyBncmF2YXRhcjogc3RyaW5nO1xuICBASW5wdXQoJ2dpdGh1YklkJylcbiAgcHVibGljIGdpdGh1Yjogc3RyaW5nO1xuICBASW5wdXQoJ3NyYycpXG4gIHB1YmxpYyBjdXN0b206IHN0cmluZztcbiAgQElucHV0KCduYW1lJylcbiAgcHVibGljIGluaXRpYWxzOiBzdHJpbmc7XG4gIEBJbnB1dCgndmFsdWUnKVxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCdwbGFjZWhvbGRlcicpXG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoJ2luaXRpYWxzU2l6ZScpXG4gIHB1YmxpYyBpbml0aWFsc1NpemU6IG51bWJlcjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNsaWNrT25BdmF0YXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGlzQWxpdmUgPSB0cnVlO1xuICBwdWJsaWMgYXZhdGFyU3JjOiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJUZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBob3N0U3R5bGU6IGFueSA9IHt9O1xuXG4gIHByaXZhdGUgY3VycmVudFNvdXJjZSA9IDA7XG4gIHByaXZhdGUgc291cmNlczogU291cmNlW10gPSBBcnJheSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBzb3VyY2VGYWN0b3J5OiBTb3VyY2VGYWN0b3J5LFxuICAgIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG9uQXZhdGFyQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrT25BdmF0YXIuZW1pdCh0aGlzLnNvdXJjZXNbdGhpcy5jdXJyZW50U291cmNlIC0gMV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpbnB1dHMgY2hhbmdlXG4gICAqXG4gICAqIHBhcmFtIHt7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfX0gY2hhbmdlc1xuICAgKlxuICAgKiBtZW1iZXJvZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1NvdXJjZShwcm9wTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVHlwZSA9IEF2YXRhclNvdXJjZVtwcm9wTmFtZS50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgaWYgKGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbcHJvcE5hbWVdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFkZFNvdXJjZShzb3VyY2VUeXBlLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlU291cmNlKHNvdXJjZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlaW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCB3aGVuIGEgc291cmNlIHByb3BlcnR5IHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgLy8gdGhlIGZhbGxiYWNrIHN5c3RlbSBtdXN0IGJlIHJlLWludm9rZWQgd2l0aCB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLmluaXRpYWxpemVBdmF0YXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHthbnl9IGV2ZW50XG4gICAqXG4gICAqIG1lbWJlck9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGZldGNoQXZhdGFyU291cmNlKGV2ZW50PzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgYXZhdGFyU291cmNlID0gdGhpcy5zb3VyY2VzW3RoaXMuY3VycmVudFNvdXJjZV07XG4gICAgaWYgKCFhdmF0YXJTb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXZhdGFyU2VydmljZS5pc1RleHRBdmF0YXIoYXZhdGFyU291cmNlLnNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLmJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2UpO1xuICAgICAgLy8gVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcbiAgICAgIHRoaXMuYXZhdGFyU3JjID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkSW1hZ2VBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U291cmNlKys7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYXZhdGFyIGNvbXBvbmVudCBhbmQgaXRzIGZhbGxiYWNrIHN5c3RlbVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQXZhdGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNvdXJjZSA9IDA7XG4gICAgaWYgKHRoaXMuc291cmNlcy5sZW5ndGggPiAwICYmIHRoaXMuc291cmNlc1t0aGlzLmN1cnJlbnRTb3VyY2VdKSB7XG4gICAgICB0aGlzLnNvcnRBdmF0YXJTb3VyY2VzKCk7XG4gICAgICB0aGlzLmZldGNoQXZhdGFyU291cmNlKCk7XG4gICAgICB0aGlzLmhvc3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuc2l6ZSArICdweCcsXG4gICAgICAgIGhlaWdodDogdGhpcy5zaXplICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNvcnRBdmF0YXJTb3VyY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlcy5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PlxuICAgICAgdGhpcy5hdmF0YXJTZXJ2aWNlLmNvcG1hcmVTb3VyY2VzKHNvdXJjZTEuc291cmNlVHlwZSwgc291cmNlMi5zb3VyY2VUeXBlKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGV4dEF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyVGV4dCA9IGF2YXRhclNvdXJjZS5nZXRBdmF0YXIodGhpcy5pbml0aWFsc1NpemUpO1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEluaXRpYWxzU3R5bGUoYXZhdGFyU291cmNlLnNvdXJjZUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRJbWFnZUF2YXRhcihhdmF0YXJTb3VyY2U6IFNvdXJjZSk6IHZvaWQge1xuICAgIHRoaXMuYXZhdGFyU3R5bGUgPSB0aGlzLmdldEltYWdlU3R5bGUoKTtcbiAgICBpZiAoYXZhdGFyU291cmNlIGluc3RhbmNlb2YgQXN5bmNTb3VyY2UpIHtcbiAgICAgIHRoaXMuZmV0Y2hBbmRQcm9jZXNzQXN5bmNBdmF0YXIoYXZhdGFyU291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTb3VyY2UuZ2V0QXZhdGFyKHRoaXMuc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIHJldHVybnMgaW5pdGlhbHMgc3R5bGVcbiAgICpcbiAgICogbWVtYmVyT2YgQXZhdGFyQ29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxzU3R5bGUoYXZhdGFyVmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBib3JkZXJSYWRpdXM6IHRoaXMucm91bmQgPyAnMTAwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgIGNvbG9yOiB0aGlzLmZnQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmdDb2xvclxuICAgICAgICA/IHRoaXMuYmdDb2xvclxuICAgICAgICA6IHRoaXMuYXZhdGFyU2VydmljZS5nZXRSYW5kb21Db2xvcihhdmF0YXJWYWx1ZSksXG4gICAgICBmb250OlxuICAgICAgICBNYXRoLmZsb29yKHRoaXMuc2l6ZSAvIHRoaXMudGV4dFNpemVSYXRpbykgK1xuICAgICAgICAncHggSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXG4gICAgICBsaW5lSGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgLi4udGhpcy5zdHlsZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogcmV0dXJucyBpbWFnZSBzdHlsZVxuICAgKlxuICAgKiBtZW1iZXJPZiBBdmF0YXJDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW1hZ2VTdHlsZSgpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnJvdW5kID8gJzUwJScgOiB0aGlzLmNvcm5lclJhZGl1cyArICdweCcsXG4gICAgICBib3JkZXI6IHRoaXMuYm9yZGVyQ29sb3IgPyAnMXB4IHNvbGlkICcgKyB0aGlzLmJvcmRlckNvbG9yIDogJycsXG4gICAgICB3aWR0aDogdGhpcy5zaXplLFxuICAgICAgaGVpZ2h0OiB0aGlzLnNpemUsXG4gICAgICAuLi50aGlzLnN0eWxlXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRmV0Y2ggYXZhdGFyIGltYWdlIGFzeW5jaHJvbm91c2x5LlxuICAgKlxuICAgKiBwYXJhbSB7U291cmNlfSBzb3VyY2UgcmVwcmVzZW50cyBhdmF0YXIgc291cmNlXG4gICAqIG1lbWJlcm9mIEF2YXRhckNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaEFuZFByb2Nlc3NBc3luY0F2YXRhcihzb3VyY2U6IEFzeW5jU291cmNlKTogdm9pZCB7XG4gICAgdGhpcy5hdmF0YXJTZXJ2aWNlXG4gICAgICAuZmV0Y2hBdmF0YXIoc291cmNlLmdldEF2YXRhcigpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VXaGlsZSgoKSA9PiB0aGlzLmlzQWxpdmUpLFxuICAgICAgICBtYXAocmVzcG9uc2UgPT4gc291cmNlLnByb2Nlc3NSZXNwb25zZShyZXNwb25zZSwgdGhpcy5zaXplKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIGF2YXRhclNyYyA9PiAodGhpcy5hdmF0YXJTcmMgPSBhdmF0YXJTcmMpLFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgbmd4LWF2YXRhcjogZXJyb3Igd2hpbGUgZmV0Y2hpbmcgJHtzb3VyY2Uuc291cmNlVHlwZX0gYXZhdGFyIGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqIHBhcmFtIHNvdXJjZVZhbHVlICBzb3VyY2UgdmFsdWUgZS5nIGZhY2Vib29rSWQgdmFsdWUsIGV0Yy5cbiAgICovXG4gIHByaXZhdGUgYWRkU291cmNlKHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSwgc291cmNlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1NvdXJjZUV4aXN0KHNvdXJjZVR5cGUpKSB7XG4gICAgICB0aGlzLnNvdXJjZXMucHVzaChcbiAgICAgICAgdGhpcy5zb3VyY2VGYWN0b3J5Lm5ld0luc3RhbmNlKHNvdXJjZVR5cGUsIHNvdXJjZVZhbHVlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNvdXJjZXMuZmluZEluZGV4KFxuICAgICAgICBzb3VyY2UgPT4gc291cmNlLnNvdXJjZVR5cGUgPT09IHNvdXJjZVR5cGVcbiAgICAgICk7XG4gICAgICB0aGlzLnNvdXJjZXNbaW5kZXhdLnNvdXJjZUlkID0gc291cmNlVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhdmF0YXIgc291cmNlXG4gICAqXG4gICAqIHBhcmFtIHNvdXJjZVR5cGUgYXZhdGFyIHNvdXJjZSB0eXBlIGUuZyBmYWNlYm9vayx0d2l0dGVyLCBldGMuXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVNvdXJjZShzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1NvdXJjZUV4aXN0KHNvdXJjZVR5cGUpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoXG4gICAgICAgIHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSA9PT0gc291cmNlVHlwZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc291cmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNTb3VyY2VFeGlzdChhdmF0YXJTb3VyY2U6IEF2YXRhclNvdXJjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXMubWFwKHNvdXJjZSA9PiBzb3VyY2Uuc291cmNlVHlwZSkuaW5jbHVkZXMoYXZhdGFyU291cmNlKTtcbiAgfVxufVxuIl19