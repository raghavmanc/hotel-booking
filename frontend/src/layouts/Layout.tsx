import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"

// describe the props that layout component expects
interface Props{
  children: React.ReactNode;
}


const Layout = ({children}: Props) => {
  return (
    //Aligns elements in a columns, min-h makes sure header is at top and footer and bottom
    <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="container mx-auto py-10 flex-1">
          {children}
        </div>
        <Footer/>
    </div> 
  )
}

export default Layout