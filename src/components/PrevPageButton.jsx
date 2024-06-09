const PrevPageButton = ({ prevPageClickHandler }) => {
  return (
    <a
      href="#top"
      onClick={prevPageClickHandler}
      className="rounded-lg border-none bg-green-700 text-white hover:bg-green-900 px-4 py-3 text-lg font-semibold mx-3"
    >
      {"<"} Prev
    </a>
  );
};

export default PrevPageButton;
