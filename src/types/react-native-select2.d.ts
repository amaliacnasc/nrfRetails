declare module 'react-native-select2' {
    import { StyleProp, ViewStyle } from 'react-native';
    import React from 'react';
  
    interface Select2Props {
      data: { id: number | string; name: string }[];
      onSelect: (selectedIds: (number | string)[]) => void;
      onRemoveItem?: (removedIds: (number | string)[]) => void;
      style?: StyleProp<ViewStyle>;
      isSelectSingle?: boolean;
      popupTitle?: string;
      title?: string;
      colorTheme?: string;
      searchPlaceHolderText?: string;
      cancelButtonText?: string;
      selectButtonText?: string;
      selectedValue?: (number | string)[];
    }
  
    export default class Select2 extends React.Component<Select2Props> {}
  }