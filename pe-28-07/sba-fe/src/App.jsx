import './App.css'
import { Routes, Route } from 'react-router-dom';
import IngedientList from "./pages/IngedientList.jsx";
import Delete from "./pages/Delete.jsx";
import Create from "./pages/Create.jsx";
import Details from "./pages/Details.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


function App() {

  return (
      <>
          <Header/>
        <Routes>
          <Route path={'/'} element={<IngedientList/>}></Route>
          <Route path={'/details/:id'} element={<Details/>}></Route>
          <Route path={'/delete/:id'} element={<Delete/>}></Route>
          <Route path={'/new'} element={<Create/>}></Route>
        </Routes>
          <Footer/>
      </>
  )
}

export default App
