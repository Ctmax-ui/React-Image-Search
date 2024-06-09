const SearchForm = ({searchFormSubmit, setSearchQuery, searchQuery}) => {
  return (
    <form
        className="fixed top-0 left-1/2 -translate-x-1/2 my-6 flex justify-center"
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
  )
}

export default SearchForm