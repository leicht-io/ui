export interface Photo {
  id: number;
  title: string;
  description: string;
  fullSizePath: string;
  smallThumbPath: string;
  mediumThumbPath: string;
  largeThumbPath: string;
  galleryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGallery {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
}

export interface IProps {
  baseUrl: string;
  gallery: IGallery;

  skeletons?: number;
}

