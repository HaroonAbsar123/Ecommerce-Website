import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';
import CustomModal from '../../components/CustomModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileAndFinanceStudent from './profileAndFinance/ProfileAndFinanceStudent';
import AddProducts from './AddProducts';
import AdminProductSection from './AdminProductSection';
import Register from './Register/Register';
import AdminOrderSection from './AdminOrderSection';

function AdminProfile(){
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState("contactInformation");

  // Update currentUrl state based on the URL query parameter when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const storedUrl = urlParams.get('currentUrl');
    if (storedUrl) {
      setCurrentUrl(storedUrl);
    }
  }, [location]);

  // Update URL query parameter when currentUrl state changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('currentUrl', currentUrl);
    const newUrl = `${location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [currentUrl, location]);

    return(
      <div style={{flex: 1, padding: '10px'}}>

        <div style={{
        flex: 1,
        marginTop: "0rem",
        height: "max-content",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        background: "rgba(255,255,255, 0.5)",
        backdropFilter: "blur(4px)", 
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch'
      }}>
        <Sidebar currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} />

        <div style={{flex: 1, background: '#fff', padding: '10px', overflow: 'auto'}}>
            {
              currentUrl === "contactInformation" &&
              <ProfileAndFinanceStudent />
            }
            {
              currentUrl === "addProducts" &&
              <AddProducts />
            }
            {
              currentUrl === "viewInventory" &&
              <AdminProductSection />
            }
            {
              currentUrl === "orders" &&
              <AdminOrderSection />
            }

{
              currentUrl === "addAdmin" &&
              <Register />
            }
        </div>

        </div>

      </div>
    )
};

export default AdminProfile;