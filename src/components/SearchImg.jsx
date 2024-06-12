import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import useImageFetcher from "../hooks/useImageFetcher";
import ImageWithLoading from "./ImageWithLoading";
import PrevPageButton from "./PrevPageButton";
import NextPageButton from "./NextPageButton";
import SearchForm from "./SearchForm";
import SingleImg from "./SingleImg";



const SearchImg = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { imageArr, isLoading, imgFetcher, setImageArr, currentUrl, setCurrentUrl } = useImageFetcher();

  useEffect(() => {
    const savedUrl = sessionStorage.getItem('sessionImagePage');
    if (savedUrl) {
      imgFetcher(JSON.parse(savedUrl));
      // console.log(savedUrl);
    }
  }, []);

  useEffect(() => {
    if (currentUrl) {
      sessionStorage.setItem('sessionImagePage', JSON.stringify(currentUrl));
    }
  }, [currentUrl]);

  const searchFormSubmit = (e) => {
    e.preventDefault();
    setImageArr([]);
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}`;
    imgFetcher(url);
    setSearchQuery("");
  };

  const nextPageClickHandler = () => {
    setImageArr([]);
    imgFetcher(imageArr.next_page);
  };

  const prevPageClickHandler = () => {
    setImageArr([]);
    imgFetcher(imageArr.prev_page);
  };
  return (
    <>
      <div className=" absolute top-0" id="top"></div>
      <SearchForm
        searchFormSubmit={searchFormSubmit}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

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
                  <Link to={`/${image.id}`}
                  >
                    <ImageWithLoading src={image.src.large} />
                  </Link>
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
  )
}

export default SearchImg