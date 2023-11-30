// @ts-nocheck
import React, { Children, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Platform, processColor, View, useWindowDimensions } from 'react-native';
import { NativePicker } from './NativePicker';
export const Picker = ({
  curtainColor = 'hsla(0, 0%, 0%, 0.1)',
  hasCurtain = true,
  hasIndicator = true,
  indicatorColor = 'hsla(0, 0%, 0%, 0.1)',
  indicatorSize = 1,
  itemSpace = 12,
  textColor = '#000000',
  textSize = 30,
  loop,
  numberOfLines = 1,
  onChange,
  style,
  children,
  testID
}) => {
  const {
    width: windowWidth
  } = useWindowDimensions();
  const [viewWidth, setViewWidth] = useState(windowWidth);
  const {
    data,
    columnWidths,
    selectedIndexes
  } = useNativePickerColumns({
    children,
    textColor,
    viewWidth
  });

  // console.log('data, columnWidths, selectedIndexes, windowWidth', data, columnWidths, selectedIndexes, windowWidth)

  const handleOnChange = useCallback(({
    nativeEvent
  }) => {
    if (onChange) {
      onChange(nativeEvent);
    }
    Children.forEach(children, (columnChild, index) => {
      if (index === nativeEvent.column && columnChild.props.onChange) {
        columnChild.props.onChange(nativeEvent);
      }
    });
  }, [onChange, children]);
  const handleOnLayout = useCallback(({
    nativeEvent: {
      layout: {
        width
      }
    }
  }) => setViewWidth(width), []);
  if (Platform.OS === 'ios') {
    return /*#__PURE__*/React.createElement(View, {
      onLayout: handleOnLayout
    }, /*#__PURE__*/React.createElement(NativePicker, {
      selectedIndexes: selectedIndexes,
      onChange: handleOnChange,
      numberOfLines: numberOfLines,
      data: data,
      columnWidths: columnWidths,
      loop: loop,
      style: [styles.picker, style],
      testID: testID
    }));
  }
  if (Platform.OS === 'android') {
    return /*#__PURE__*/React.createElement(View, {
      onLayout: handleOnLayout,
      style: styles.androidContainer
    }, data.map((componentData, index) => /*#__PURE__*/React.createElement(View, {
      key: `picky-component-${index}`,
      style: [{
        width: columnWidths[index] + LABEL_INSET_SPACE
      }, style]
    }, /*#__PURE__*/React.createElement(NativePicker, {
      column: index,
      data: componentData,
      loop: loop,
      onChange: handleOnChange,
      curtainColor: processColor(curtainColor),
      hasCurtain: hasCurtain,
      hasIndicator: hasIndicator,
      indicatorColor: processColor(indicatorColor),
      indicatorSize: indicatorSize,
      itemSpace: itemSpace,
      textColor: processColor(textColor),
      textSize: textSize,
      selectedIndex: selectedIndexes[index],
      style: styles.picker,
      testID: testID
    }))));
  }
  return null;
};
const useNativePickerColumns = ({
  viewWidth,
  children,
  textColor
}) => useMemo(() => {
  let columnWidths = [];
  const selectedIndexes = [];
  const data = [];
  let availableSpace = viewWidth;
  Children.forEach(children, (columnChild, columnChildIndex) => {
    const columnItems = [];
    Children.forEach(columnChild.props.children, (itemChild, itemChildIndex) => {
      if (columnChild.props.selectedValue && itemChild.props.value === columnChild.props.selectedValue && selectedIndexes.length <= columnChildIndex) {
        selectedIndexes.push(itemChildIndex);
      }
      columnItems.push({
        label: itemChild.props.label,
        value: itemChild.props.value,
        textColor: processColor(itemChild.props.color ?? textColor),
        testID: itemChild.props.testID
      });
    });
    if (selectedIndexes.length <= columnChildIndex) {
      selectedIndexes.push(0);
    }
    if (typeof columnChild.props.width === 'number') {
      const w = Math.max(columnChild.props.width - LABEL_INSET_SPACE, 0);
      availableSpace -= columnChild.props.width;
      columnWidths.push(w);
    } else {
      columnWidths.push(-1);
    }
    data.push(columnItems);
  });

  // Automatically set width for remaining columns to the available space
  const columnsWithoutWidth = columnWidths.filter(w => w < 0);
  if (columnsWithoutWidth.length) {
    columnWidths = columnWidths.map(w => w < 0 ? Math.max(availableSpace / columnsWithoutWidth.length - LABEL_INSET_SPACE, 0) : w);
  }
  return {
    data,
    columnWidths,
    selectedIndexes
  };
}, [children, textColor, viewWidth]);
const LABEL_INSET_SPACE = 20;
const styles = StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  picker: {
    height: 316
  }
});
//# sourceMappingURL=Picker.js.map