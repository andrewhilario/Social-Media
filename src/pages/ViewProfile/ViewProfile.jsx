import React from "react";
import ProfileHeader from "../Profile/components/ProfileHeader";
import ViewProfileHeader from "./components/ViewProfileHeader";
import Layout from "../Layout";

function ViewProfile() {
  return (
    <>
      <Layout paddingY={2}>
        <ViewProfileHeader />
      </Layout>
    </>
  );
}

export default ViewProfile;
