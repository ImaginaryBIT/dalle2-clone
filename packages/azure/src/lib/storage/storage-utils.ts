import {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';
import {storageClient, storageSharedKeyCredential} from '.';
import storageConfig from './storage-config';

export const storageGenerateSASToken = async () => {
  const containerClient = storageClient.getContainerClient(
    storageConfig.STORAGE_CONTAINER_NAME,
  );

  const permissions = new BlobSASPermissions();

  permissions.write = true;
  permissions.create = true;
  permissions.read = true;

  const expiryDate = new Date();

  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions,
      expiresOn: expiryDate,
    },
    storageSharedKeyCredential,
  ).toString();

  return sasToken;
};
