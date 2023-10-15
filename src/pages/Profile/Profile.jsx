import React, { useEffect } from "react";
import Layout from "../Layout";
import ProfileHeader from "./components/ProfileHeader";
import Person1 from "../../assets/images/person-1.jpg";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  return (
    <>
      <Helmet>
        <title>Profile | Paysbook</title>
      </Helmet>
      <Layout paddingY={2}>
        <ProfileHeader
          profileImage={Person1}
          name={"Mary Jane Doe"}
          friends={203}
        />
      </Layout>
    </>
  );
}

export default Profile;
