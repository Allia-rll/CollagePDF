export interface Img {
  src: string;
  file: File;
  base64?: string;
  dimensions?: {
    width: number;
    height: number;
  };
}
