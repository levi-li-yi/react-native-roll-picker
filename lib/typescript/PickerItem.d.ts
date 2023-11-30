/// <reference types="react" />
import { ColorValue } from 'react-native';
export interface PickerItemProps {
    color?: ColorValue;
    label: string;
    value: string | number;
    testID?: string;
}
export declare const PickerItem: ({ color, label, ...props }: PickerItemProps) => JSX.Element;
