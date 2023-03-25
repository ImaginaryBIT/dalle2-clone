'use client';

import {useImagesListQuery} from '@features/images/images-api';
import {useCallback, useMemo} from 'react';
import GalleryImagesItem from './GalleryImagesItem';
import GalleryLoader from './GalleryLoader';

const GalleryImages = () => {
  const {data, isLoading, isFetching, refetch} = useImagesListQuery();

  const isLoaderVisible: boolean = useMemo(() => {
    return isLoading;
  }, [isLoading, isFetching]);

  const isGalleryVisible: boolean = useMemo(() => {
    return !!data?.images && !isLoading;
  }, [data?.images, isLoading, isFetching]);

  const isRefreshing: boolean = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const onRefreshHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      refetch();
    },
    [refetch],
  );

  return (
    <>
      {isLoaderVisible && <GalleryLoader />}
      {isGalleryVisible && (
        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10 mt-8">
          {data?.images.map((item, index) => (
            <GalleryImagesItem key={item.id} item={item} first={index === 0} />
          ))}
        </div>
      )}
      <button
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20 disabled:cursor-progress disabled:bg-gray-400"
        onClick={onRefreshHandler}
        disabled={isRefreshing}>
        {!isRefreshing ? 'Refresh Images' : 'Refreshing Images'}
      </button>
    </>
  );
};

export default GalleryImages;
