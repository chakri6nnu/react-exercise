export interface ApplicationData {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
}

export interface ApplicationItem {
  id: string;
  name: string;
  spend: number;
}

export interface ApplicationListProps {
  data: ApplicationItem[];
}

export interface RangeSliderProps {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  onChange: (minValue: number, maxValue: number) => void;
}

export interface TreeViewProps {
  data: any;
  onSelect: (apps: any) => void;
}
