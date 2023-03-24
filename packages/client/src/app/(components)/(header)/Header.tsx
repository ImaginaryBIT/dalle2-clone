import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md flex-col space-y-2 sm:flex-row">
      <section className="flex space-x-4 items-center">
        <Image
          className="object-contain"
          src="/images/openai.png"
          width={30}
          height={30}
          alt="openai"
        />
        <div>
          <h1 className="font-bold">DALL·E 2 Image Generator</h1>
          <h2 className="text-xs">
            Powered by DALL·E 2, ChatGPT & Microsoft Azure
          </h2>
        </div>
      </section>
      <section className="flex items-center divide-x">
        <h3 className="px-2 font-light text-xs md:text-base text-gray-500">
          This app is build for educational purposes only
        </h3>
      </section>
    </header>
  );
};

export default Header;
