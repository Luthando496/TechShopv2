import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'notyf/notyf.min.css';


function App() {
  return (
    <>
    <ToastContainer position='top center' />
      <Header />
      <main className="py-3">
      <Container>
        <Outlet />
      </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
