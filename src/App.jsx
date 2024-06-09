import { useState } from "react";
import "./App.css";
import ImageWithLoading from "./components/ImageWithLoading"
import PrevPageButton from "./components/PrevPageButton";
import NextPageButton from "./components/NextPageButton";
import SearchForm from "./components/SearchForm";
import useImageFetcher from "./hooks/useImageFetcher"; 

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { imageArr, isLoading, imgFetcher, setImageArr} = useImageFetcher();

  function searchFormSubmit(e) {
    e.preventDefault();
    setImageArr([]);
    imgFetcher(`https://api.pexels.com/v1/search?query=${searchQuery}`);
    setSearchQuery("");
  }

  function nextPageClickHandler() {
    setImageArr([]);
    imgFetcher(imageArr.next_page);
  }
  function prevPageClickHandler() {
    setImageArr([]);
    imgFetcher(imageArr.prev_page);
  }

  return (
    <>
      <div className=" absolute top-0" id="top"></div>

      <SearchForm searchFormSubmit={searchFormSubmit} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

      <h1 className="text-2xl text-black w-100 text-center mt-20">
        {isLoading ? "Loading..." : ""}
      </h1>
      {imageArr.photos && !isLoading && imageArr.photos.length <= 0 ? (
        <h3 className="text-center text-2xl">Image not found.</h3>
      ) : (
        <div className="container sm:mx-auto px-2">

          <div className="flex justify-between sm:px-2">
            <h4 className="text-lg font-semibold">
              {imageArr.total_results &&
                `Image's found : ${imageArr.total_results}`}
            </h4>
            <h4 className="text-lg font-semibold">
              {imageArr.page &&
                `Page : ${imageArr.page}/${Math.ceil(
                  imageArr.total_results / 15
                )}`}
            </h4>
          </div>

          <div className="grid mt-4 gap-2 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 container">
            {imageArr.photos &&
              imageArr.photos.map((image, key) => (
                <div key={key} className="overflow-hidden border rounded-md">
                  <ImageWithLoading src={image.src.large} />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="text-center mt-10 mb-20">
        {imageArr && imageArr.prev_page ? (
          <PrevPageButton prevPageClickHandler={prevPageClickHandler} />
        ) : (
          ""
        )}

        {imageArr && imageArr.next_page ? (
         <NextPageButton nextPageClickHandler={nextPageClickHandler} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
