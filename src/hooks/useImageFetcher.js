import { useState } from 'react';

const useImageFetcher = () => {
  const [imageArr, setImageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const imgFetcher = async (url) => {
    try {
      setIsLoading(true);
      const result = await fetch(url, {
        headers: {
          Authorization: "W6bYqFI1SzJNvBEtXfVsX0lLi64vy0wcFTyd41cXBnd1RflHPiJcSLPk",
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
  };

  return { imageArr, isLoading, imgFetcher , setImageArr};
};

export default useImageFetcher;
