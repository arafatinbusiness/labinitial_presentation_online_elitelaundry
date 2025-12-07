
export enum SlideType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface Slide {
  id: string;
  name: string;
  src: string;
  type: SlideType;
  placeholderSrc?: string;
}