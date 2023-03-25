export interface ImageModel {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

export interface ImagesGenerateRequest {
  prompt: string;
}

export type ImagesGenerateResult = ImageModel;

export interface ImagesListResult {
  images: ImageModel[];
}
