import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import PostDetail from './components/posts';
import Footer from './components/footer';
import Header from './components/header';
import BugReportingForm from './components/form';

function App() {
  return (
    <BrowserRouter>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/newbug" element={<BugReportingForm />} />
      </Routes>
      <Footer />
    </></BrowserRouter>
  );
}

export default App;