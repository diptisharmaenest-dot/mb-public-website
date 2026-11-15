import Header from './Header'
import Footer from './Footer'
import SiteChrome from './SiteChrome'

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SiteChrome header={<Header />} footer={<Footer />}>
      {children}
    </SiteChrome>
  )
}

export default MainLayout
