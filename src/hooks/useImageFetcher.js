import { useState } from 'react';

const useImageFetcher = () => {
  const [imageArr, setImageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err , setErr]= useState(null)
  const [currentUrl, setCurrentUrl]= useState(null)

  const imgFetcher = async (url) => {
    try {
      setIsLoading(true);
      setCurrentUrl(url);
      const result = await fetch(url, {
        headers: {
          Authorization: "W6bYqFI1SzJNvBEtXfVsX0lLi64vy0wcFTyd41cXBnd1RflHPiJcSLPk",
        },
      });
      const data = await result.json();
      setImageArr(data);
      // console.log(data);
    } catch (err) {
      setErr(err)
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { imageArr, isLoading, imgFetcher , setImageArr, err, currentUrl, setCurrentUrl};
};

export default useImageFetcher;
