import React from "react";
import styles from "./ProfileAndFinance.module.css";
import { Profile } from "./Profile";

const ProfileAndFinanceStudent = () => {



  return (
    <React.Fragment>
      
      <div
        style={{
          marginTop: "0px",
          flex: 1,
          height: "max-content",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
          WebkitBackdropFilter: 'blur(5px)', // For Safari support,
          padding: '10px',
          borderRadius: '10px', marginRight: '10px',
          marginBottom: '10px',
          color: '#eee'
        }}
       >
          <div style={{fontSize: '2rem'}}>Profile</div>
        </div>



      <div className={styles.dashboardContainer} >

      <Profile />

        
      </div>

    </React.Fragment>
  );
};

export default ProfileAndFinanceStudent;
