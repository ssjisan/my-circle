import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comments from "./Components/Comments";
import Post from "./Components/Post";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/comment/:id" element={<Comments/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
