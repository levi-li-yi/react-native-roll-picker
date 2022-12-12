import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { PickerColumnProps } from './PickerColumn';
import type { PickerColumnChangeItem } from './types';
type PickerChild = ReactElement<PickerColumnProps>;
export interface PickerProps {
    loop?: boolean;
    children: PickerChild | PickerChild[];
    hasCurtain?: boolean;
    curtainColor?: string;
    hasIndicator?: boolean;
    indicatorColor?: string;
    indicatorSize?: number;
    itemSpace?: number;
    textColor?: string;
    textSize?: number;
    numberOfLines?: number;
    style?: StyleProp<ViewStyle>;
    onChange?: (item: PickerColumnChangeItem) => void;
    testID?: string;
}
export declare const Picker: ({ curtainColor, hasCurtain, hasIndicator, indicatorColor, indicatorSize, itemSpace, textColor, textSize, loop, numberOfLines, onChange, style, children, testID, }: PickerProps) => JSX.Element | null;
export {};
