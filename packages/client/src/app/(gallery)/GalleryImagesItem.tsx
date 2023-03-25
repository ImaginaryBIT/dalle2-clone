import type {ImageModel} from '@features/images/images-types';
import Image from 'next/image';

interface Props {
  item: ImageModel;
  first?: boolean;
}

const GalleryImagesItem = ({item, first = false}: Props) => {
  return (
    <div
      className={`relative cursor-help hover:scale-[103%] transition-transform duration-200 ease-in-out ${
        first && 'md:col-span-2 md:row-span-2'
      }`}>
      <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
        <p className="text-center font-light text-lg p-5">{item.name}</p>
      </div>
      <Image
        className="object-contain w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
        src={item.url}
        alt={item.name}
        width={800}
        height={800}
      />
    </div>
  );
};

export default GalleryImagesItem;
