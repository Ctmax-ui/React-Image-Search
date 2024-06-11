import { Link, Routes, Route } from "react-router-dom";
import SingleImg from "./components/SingleImg";
import SearchImg from "./components/SearchImg";




function App() {

  return (
    <>
      <Routes>
        <Route path="/" />
        <Route index element={<SearchImg />} />
        <Route path=":imageId" element={<SingleImg />} />
      </Routes>
    </>
  );
}

export default App;
