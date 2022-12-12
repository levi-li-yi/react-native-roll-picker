"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Picker = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _NativePicker = require("./NativePicker");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Picker = _ref => {
  let {
    curtainColor = 'hsla(0, 0%, 0%, 0.1)',
    hasCurtain = true,
    hasIndicator = true,
    indicatorColor = 'hsla(0, 0%, 0%, 0.1)',
    indicatorSize = 1,
    itemSpace = 12,
    textColor = '#000000',
    textSize = 20,
    loop,
    numberOfLines = 1,
    onChange,
    style,
    children,
    testID
  } = _ref;
  const {
    width: windowWidth
  } = (0, _reactNative.useWindowDimensions)();
  const [viewWidth, setViewWidth] = (0, _react.useState)(windowWidth);
  const {
    data,
    columnWidths,
    selectedIndexes
  } = useNativePickerColumns({
    children,
    textColor,
    viewWidth
  });
  const handleOnChange = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent
    } = _ref2;
    if (onChange) {
      onChange(nativeEvent);
    }
    _react.Children.forEach(children, (columnChild, index) => {
      if (index === nativeEvent.column && columnChild.props.onChange) {
        columnChild.props.onChange(nativeEvent);
      }
    });
  }, [onChange, children]);
  const handleOnLayout = (0, _react.useCallback)(_ref3 => {
    let {
      nativeEvent: {
        layout: {
          width
        }
      }
    } = _ref3;
    return setViewWidth(width);
  }, []);
  if (_reactNative.Platform.OS === 'ios') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      onLayout: handleOnLayout
    }, /*#__PURE__*/_react.default.createElement(_NativePicker.NativePicker, {
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
  if (_reactNative.Platform.OS === 'android') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      onLayout: handleOnLayout,
      style: styles.androidContainer
    }, data.map((componentData, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: `picky-component-${index}`,
      style: [{
        width: columnWidths[index] + LABEL_INSET_SPACE
      }, style]
    }, /*#__PURE__*/_react.default.createElement(_NativePicker.NativePicker, {
      column: index,
      data: componentData,
      loop: loop,
      onChange: handleOnChange,
      curtainColor: (0, _reactNative.processColor)(curtainColor),
      hasCurtain: hasCurtain,
      hasIndicator: hasIndicator,
      indicatorColor: (0, _reactNative.processColor)(indicatorColor),
      indicatorSize: indicatorSize,
      itemSpace: itemSpace,
      textColor: (0, _reactNative.processColor)(textColor),
      textSize: textSize,
      selectedIndex: selectedIndexes[index],
      style: styles.picker,
      testID: testID
    }))));
  }
  return null;
};
exports.Picker = Picker;
const useNativePickerColumns = _ref4 => {
  let {
    viewWidth,
    children,
    textColor
  } = _ref4;
  return (0, _react.useMemo)(() => {
    let columnWidths = [];
    const selectedIndexes = [];
    const data = [];
    let availableSpace = viewWidth;
    _react.Children.forEach(children, (columnChild, columnChildIndex) => {
      const columnItems = [];
      _react.Children.forEach(columnChild.props.children, (itemChild, itemChildIndex) => {
        var _itemChild$props$colo;
        if (columnChild.props.selectedValue && itemChild.props.value === columnChild.props.selectedValue && selectedIndexes.length <= columnChildIndex) {
          selectedIndexes.push(itemChildIndex);
        }
        columnItems.push({
          label: itemChild.props.label,
          value: itemChild.props.value,
          textColor: (0, _reactNative.processColor)((_itemChild$props$colo = itemChild.props.color) !== null && _itemChild$props$colo !== void 0 ? _itemChild$props$colo : textColor),
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
};
const LABEL_INSET_SPACE = 20;
const styles = _reactNative.StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  picker: {
    height: 216
  }
});
//# sourceMappingURL=Picker.js.map