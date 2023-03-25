import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

export const storageSharedKeyCredential = new StorageSharedKeyCredential(
  process.env.STORAGE_ACCOUNT_NAME,
  process.env.STORAGE_ACCESS_KEY,
);

export const storageClient = new BlobServiceClient(
  `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  storageSharedKeyCredential,
);
