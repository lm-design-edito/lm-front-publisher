export type ImagePreview = {
  name: string | null;
  url: string | null;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type DownloadItem = {
  name: string;
  url: string;
  sourceName: string;
  mimeType: string;
  date: Date;
  quality: number;
  dimensions: ImageDimensions;
};
