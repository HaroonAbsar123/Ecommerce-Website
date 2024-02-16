import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';
import CustomModal from '../../components/CustomModal';
import AddProducts from './AddProducts';
import AdminProductSection from './AdminProductSection';
import ProfileAndFinanceStudent from './profileAndFinance/ProfileAndFinanceStudent';


function AdminPageOne(){
    const navigate=useNavigate()
    const { setIsUserLoggedIn, setUserDetails, setUserType, userDetails } = useContext(ProductContext);

    const [addProductModal, setAddProductModal] = useState(false)


    return(
      <div style={{padding: '1rem', paddingBottom: '2rem'}} >

        <div
        style={{flex: 1, flexDirection: 'row', gap: '10px', display: 'flex'}}
      >
        {/* PROFILE */}
<div
        style={{
          padding: "0.5rem",
          flex: 1,
          marginTop: "0rem",
          height: 'max-content',
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: 'rgba(255,255,255, 0.5)',
          backdropFilter: 'blur(4px)', // Adjust the blur intensity as needed
          WebkitBackdropFilter: 'blur(4px)', // For Safari support,
          padding: '10px',
          borderRadius: '10px'
        }}
      >
      <ProfileAndFinanceStudent />
        </div>

        <div
        style={{flex: 2, flexDirection: 'column', display: 'flex', gap: '10px'}}
      >
        {/* MANAGE ORDERS */}
        <div
        style={{
          padding: "0.5rem",
          flex: 1,
          marginTop: "0rem",
          height: 'max-content',
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: 'rgba(255,255,255, 0.5)',
          backdropFilter: 'blur(4px)', // Adjust the blur intensity as needed
          WebkitBackdropFilter: 'blur(4px)', // For Safari support,
          padding: '10px',
          borderRadius: '10px'
        }}
      >
      {/* <h2>MANAGE ORDERS</h2> */}
      <AdminProductSection setAddProductModal={setAddProductModal} />
        </div>

        {/*  VIEW/DELETE PRODUCTS */}
        <div
        style={{
          flex: 1,
        }}
      >
      <AdminProductSection setAddProductModal={setAddProductModal} />
        </div>

        </div>


        </div>






      {/* Add Product Modal */}
      <CustomModal open={addProductModal} onClose={() => {setAddProductModal(false)}}>
        <AddProducts setAddProductModal={setAddProductModal}/>
      </CustomModal>
      
</div>
    )
};

export default AdminPageOne;