import {BlobServiceClient} from '@azure/storage-blob';
import axios from 'axios';
import {openai} from '../../lib/openai';
import {storageClient} from '../../lib/storage';
import storageConfig from '../../lib/storage/storage-config';
import {storageGenerateSASToken} from '../../lib/storage/storage-utils';
import {ImagesGenerateRequest} from './images-generate';

export const imagesGenerateRepository = async (
  request: ImagesGenerateRequest,
): Promise<ImageModel> => {
  try {
    const response = await openai.createImage({
      prompt: request.prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data.data[0].url;

    if (typeof imageUrl !== 'string') {
      throw new Error('OpenAI did not return a valid URL');
    }

    const result = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    const arrayBuffer = result.data;

    const sasToken = await storageGenerateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${sasToken}`,
    );

    const containerClient = blobServiceClient.getContainerClient(
      storageConfig.STORAGE_CONTAINER_NAME,
    );

    const timestamp = new Date().getTime();
    const fileName = `${request.prompt
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, '_')}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(arrayBuffer, {
      metadata: {
        id: timestamp.toString(),
        name: request.prompt,
      },
    });

    const url = `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${storageConfig.STORAGE_CONTAINER_NAME}/${fileName}?${sasToken}`;

    const image: ImageModel = {
      url,
      id: timestamp.toString(),
      name: request.prompt,
      createdAt: new Date(timestamp).toString(),
    };

    return image;
  } catch (error) {
    return {
      url: '',
      id: '',
      name: '',
      createdAt: new Date().toString(),
    };
  }
};

export const imagesListRepository = async (): Promise<ImageModel[]> => {
  try {
    const containerClient = storageClient.getContainerClient(
      storageConfig.STORAGE_CONTAINER_NAME,
    );

    const sasToken = await storageGenerateSASToken();

    const images: ImageModel[] = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const properties = await blockBlobClient.getProperties();

      images.push({
        url: `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${blob.name}?${sasToken}`,
        id: properties.metadata?.id || blob.name,
        name: properties.metadata?.name || blob.name,
        createdAt: (properties.createdOn || new Date()).toString(),
      });
    }

    return images.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch (_error) {
    return [];
  }
};
