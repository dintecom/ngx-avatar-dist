import { AvatarSource } from './avatar-source.enum';
import { Source } from './source';
import * as i0 from "@angular/core";
/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 */
export declare class SourceFactory {
    private sources;
    constructor();
    newInstance(sourceType: AvatarSource, sourceValue: string): Source;
    static ɵfac: i0.ɵɵFactoryDeclaration<SourceFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SourceFactory>;
}
