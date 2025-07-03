import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Outlet} from 'react-router'

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <header>
                <Navbar />
            </header>
            <main className='flex-grow container mx-auto px-4 py-6'>
                <Outlet />
            </main>
            <Footer />
        
        </div>
    )
}

export default MainLayout