import { useState } from "react";
import "./App.css";
import ImageWithLoading from "./components/ImageComponent"

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageArr, setImageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  async function imgFetcher(url) {
    try {
      setIsLoading(true);
      const result = await fetch(url, {
        headers: {
          Authorization:
            "W6bYqFI1SzJNvBEtXfVsX0lLi64vy0wcFTyd41cXBnd1RflHPiJcSLPk",
        },
      });
      const data = await result.json();
      setImageArr(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  

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
      <form
        className="fixed top-0 left-1/2 -translate-x-1/2 my-6"
        onSubmit={searchFormSubmit}
      >
        <input
          type="text"
          className="border text-lg border-black py-2 px-3 outline-none mx-2 rounded-s-lg focus:bg-black focus:text-white"
          placeholder="Search here..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button className="border text-lg border-black py-2 px-3 bg-white hover:bg-black hover:text-white transition-all rounded-e-lg">
          Go
        </button>
      </form>

      <h1 className="text-2xl text-black w-100 text-center mt-20">
        {isLoading ? "Loading..." : ""}
      </h1>
      {imageArr.photos && !isLoading && imageArr.photos.length <= 0 ? (
        <h3 className="text-center text-2xl">Image not found.</h3>
      ) : (
        <div className="container mx-auto ">
          <div className="flex justify-between">
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
          <div className="grid grid-cols-4 mt-4 gap-2">
            {imageArr.photos &&
              imageArr.photos.map((image, key) => (
                <div key={key} className=" overflow-hidden border">
                  <ImageWithLoading src={image.src.original} />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="text-center mt-10 mb-20">
        {imageArr && imageArr.prev_page ? (
          <a
            href="#top"
            onClick={prevPageClickHandler}
            className="rounded-lg border-none bg-green-700 text-white hover:bg-green-900 px-4 py-3 text-lg font-semibold mx-3"
          >
            {"<"} Prev
          </a>
        ) : (
          ""
        )}

        {imageArr && imageArr.next_page ? (
          <a
            href="#top"
            onClick={nextPageClickHandler}
            className="rounded-lg border-none bg-green-700 text-white hover:bg-green-900 px-4 py-3 text-lg font-semibold"
          >
            Next {">"}
          </a>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
