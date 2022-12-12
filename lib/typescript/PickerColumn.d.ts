import { ReactElement } from 'react';
import type { PickerItemProps } from './PickerItem';
import type { PickerColumnChangeItem } from './types';
type PickerColumnChild = ReactElement<PickerItemProps>;
export interface PickerColumnProps {
    width?: number;
    selectedValue?: string | number;
    onChange?: (item: PickerColumnChangeItem) => void;
    children: PickerColumnChild | PickerColumnChild[];
}
export declare const PickerColumn: ({ children }: PickerColumnProps) => JSX.Element;
export {};
