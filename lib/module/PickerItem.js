function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text } from 'react-native';
export const PickerItem = ({
  color,
  label,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Text, _extends({
    style: {
      color
    }
  }, props), label);
};
//# sourceMappingURL=PickerItem.js.map