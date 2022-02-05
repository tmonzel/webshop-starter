import { AbstractDocument } from './document';

export interface Product extends AbstractDocument {
    name: string;
    type: string;
}
