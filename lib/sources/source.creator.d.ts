import { Source } from './source';
/**
 * A creator interface used to instantiate source implementation
 */
export declare type SourceCreator = new (sourceValue: string) => Source;
