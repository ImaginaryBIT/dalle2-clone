import {BlobServiceClient} from '@azure/storage-blob';
import axios from 'axios';
import {openai} from '../../lib/openai';
import storageConfig from '../../lib/storage/storage-config';
import {storageGenerateSASToken} from '../../lib/storage/storage-utils';
import {ImagesGenerateRequest} from './images-generate';

export const imagesGenerateRepostiory = async (
  request: ImagesGenerateRequest,
): Promise<string> => {
  try {
    const response = await openai.createImage({
      prompt: request.prompt,
      n: 1,
      size: '1024x1024',
    });

    const url = response.data.data[0].url;

    if (typeof url !== 'string') {
      throw new Error('OpenAI did not return a valid URL');
    }

    const result = await axios.get(url, {
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
    const fileName = `${request.prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(arrayBuffer);

    return `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${storageConfig.STORAGE_CONTAINER_NAME}/${fileName}?${sasToken}`;
  } catch (error) {
    return JSON.stringify(error);
  }
};
