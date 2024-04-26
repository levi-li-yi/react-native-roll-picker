//
//  PickerManager.m
//  Picker
//
//  Created by Liam Andrew on 2/6/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "PickerManager.h"
#import "Picker.h"

#import <React/RCTBridge.h>
#import <React/RCTFont.h>

@implementation PickerManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [Picker new];
}

RCT_EXPORT_VIEW_PROPERTY(data, NSArray)

RCT_EXPORT_VIEW_PROPERTY(columnWidths, NSNumberArray)

RCT_EXPORT_VIEW_PROPERTY(selectedIndexes, NSNumberArray)

RCT_EXPORT_VIEW_PROPERTY(loop, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(color, UIColor)

RCT_EXPORT_VIEW_PROPERTY(textAlign, NSTextAlignment)

RCT_EXPORT_VIEW_PROPERTY(numberOfLines, NSInteger)

RCT_CUSTOM_VIEW_PROPERTY(fontSize, NSNumber, Picker)
{
  view.font = [RCTFont updateFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}

RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, __unused Picker)
{
  view.font = [RCTFont updateFont:view.font withWeight:json]; // defaults to normal
}

RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, __unused Picker)
{
  view.font = [RCTFont updateFont:view.font withStyle:json]; // defaults to normal
}

RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, Picker)
{
  view.font = [RCTFont updateFont:view.font withFamily:json ?: defaultView.font.familyName];
}

RCT_CUSTOM_VIEW_PROPERTY(themeVariant, NSString, Picker)
{
  if (@available(iOS 13.4, *)) {
    if (json) {
      if ([json isEqual:@"dark"])
        view.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
      else if ([json isEqual:@"light"])
        view.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
      else
        view.overrideUserInterfaceStyle = UIUserInterfaceStyleUnspecified;
    }
  }
}

@end
