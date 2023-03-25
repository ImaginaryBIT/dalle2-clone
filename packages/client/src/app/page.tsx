import GalleryImages from './(gallery)/GalleryImages';
import GalleryPrompt from './(gallery)/GalleryPrompt';
import Header from './(header)/Header';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-1 flex-col">
      <Header />
      <main className="sm:m-10 flex-1 flex flex-col">
        <GalleryPrompt />
        <GalleryImages />
      </main>
    </div>
  );
};

export default Home;
