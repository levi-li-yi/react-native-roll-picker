"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Picker = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _NativePicker = require("./NativePicker");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-nocheck

const Picker = ({
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

  // console.log('data, columnWidths, selectedIndexes, windowWidth', data, columnWidths, selectedIndexes, windowWidth)

  const handleOnChange = (0, _react.useCallback)(({
    nativeEvent
  }) => {
    if (onChange) {
      onChange(nativeEvent);
    }
    _react.Children.forEach(children, (columnChild, index) => {
      if (index === nativeEvent.column && columnChild.props.onChange) {
        columnChild.props.onChange(nativeEvent);
      }
    });
  }, [onChange, children]);
  const handleOnLayout = (0, _react.useCallback)(({
    nativeEvent: {
      layout: {
        width
      }
    }
  }) => setViewWidth(width), []);
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
const useNativePickerColumns = ({
  viewWidth,
  children,
  textColor
}) => (0, _react.useMemo)(() => {
  let columnWidths = [];
  const selectedIndexes = [];
  const data = [];
  let availableSpace = viewWidth;
  _react.Children.forEach(children, (columnChild, columnChildIndex) => {
    const columnItems = [];
    _react.Children.forEach(columnChild.props.children, (itemChild, itemChildIndex) => {
      if (columnChild.props.selectedValue && itemChild.props.value === columnChild.props.selectedValue && selectedIndexes.length <= columnChildIndex) {
        selectedIndexes.push(itemChildIndex);
      }
      columnItems.push({
        label: itemChild.props.label,
        value: itemChild.props.value,
        textColor: (0, _reactNative.processColor)(itemChild.props.color ?? textColor),
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
const styles = _reactNative.StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  picker: {
    height: 316
  }
});
//# sourceMappingURL=Picker.js.map