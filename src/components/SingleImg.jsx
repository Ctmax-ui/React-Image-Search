import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import useImageFetcher from "../hooks/useImageFetcher";
import ImageWithLoading from "./ImageWithLoading";

const SingleImg = () => {
  const { imageId } = useParams();
  const { isLoading, imgFetcher, imageArr, err } = useImageFetcher();

  useEffect(() => {
    imgFetcher(`https://api.pexels.com/v1/photos/${imageId}`)
    // console.log(imageArr);
  }, [imageId, imageArr.length <= 0]);

  if (isLoading) {
    return <div className="w-1/5 text-center m-auto mt-28 text-2xl">Loading...</div>;
  }

  return (
    <>

    <div className=" container m-auto pt-3 px-20 font-bold text-lg">
    <Link to="/" className="hover:underline hover:text-blue-800 text-xl">
              Go Back
            </Link> / {imageId}
    </div>

    <div className="container mx-auto h-[90vh] mt-3 flex justify-evenly items-center border rounded-lg border-slate-600">
        <div className=" h-[90%] py-3 w-1/3">
        <ImageWithLoading className={"rounded-lg  border-slate-600 h-[100%] object-contain m-auto"} src={imageArr.src && imageArr.src.original} />
        </div>
        <div className=" w-2/4 h-1/3">
            <p className="font-semibold text-2xl">Name : <span className="font-bold">{imageArr && imageArr.alt}.</span></p>
            <p className="font-semibold text-lg">Photographer Name : {imageArr && imageArr.photographer}.</p>
            <p className="font-semibold text-lg">Photographer Id : {imageArr && imageArr.photographer_id}</p>
        </div>
    </div>

    </>
  );
};

export default SingleImg;
