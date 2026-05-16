import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import AddPoem from "./components/AddPoem";
import Poems from "./components/Poems";
import Comments from "./components/Comments";
import Posts from "./components/Posts";
import GetFormInput from "./components/GetFormInput";
import GetInput from "./components/GetInput";
import UseEffectDemo from "./components/UseEffectDemo";
import FetchPoems from "./components/FetchPoems";

interface IPoem {
  id: number;
  poem: string;
  vip: boolean;
}

function App() {
  const [poems, setPoems] = useState<IPoem[]>([
    {
      id: 1,
      poem: "Nunc tempus eros id venenatis sagittis. Nam ac sagittis elit. Aenean ac eleifend metus, eget tincidunt odio.",
      vip: true,
    },
    {
      id: 2,
      poem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit libero sed mi euismod dapibus. Nullam eu molestie libero, eget interdum massa.",
      vip: false,
    },
    {
      id: 3,
      poem: "Suspendisse efficitur tellus id blandit vestibulum. Etiam condimentum dolor velit, in fermentum ligula ultricies et.",
      vip: false,
    },
  ]);

  const addPoem = (poem: { vip: boolean; content: string }) => {
    const id: number = Math.floor(Math.random() * 1000000 + 100);
    const newPoem: IPoem = { id, poem: poem.content, vip: poem.vip };
    setPoems([...poems, newPoem]);
  };
  return (
    <>
      <BrowserRouter>
        <div>
          <h2>Full stack app</h2>
          <Menu />
          <Routes>
            <Route
              path="/addpoem"
              element={
                <>
                  <Poems poems={poems} />
                  <AddPoem onAdd={addPoem} />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/getinput" element={<GetInput />} />
            <Route path="/getforminput" element={<GetFormInput />} />
            <Route path="/use-effect" element={<UseEffectDemo />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
             <Route path="/fetchpoems" element={<FetchPoems />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
