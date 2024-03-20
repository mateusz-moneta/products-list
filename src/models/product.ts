import { Color } from './color';

export interface Product {
  color: Color;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}
