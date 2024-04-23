import Header from "../components/Header"
import Hero from "../components/Hero"


const Layout = () => {
  return (
    //Aligns elements in a columns, min-h makes sure header is at top and footer and bottom
    <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
    </div> 
  )
}

export default Layout