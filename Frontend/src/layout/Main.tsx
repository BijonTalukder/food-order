import NavBar from '../share/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Banner from '../share/Banner/Banner';
import BookCart from '../share/BookCart/BookCart';
import FormTest from '../component/FormTest/Formtest'
import Stores from '../page/Stores/Stores';
import Hero from '../page/Hero/Hero';
const Main = () => {
    return (
        <div>
            <NavBar/>
            <Hero/>
            {/* <Banner/>
            <BookCart/>
            <Outlet/>
            <FormTest/>
            <Stores/> */}
            
        </div>
    );
};

export default Main;