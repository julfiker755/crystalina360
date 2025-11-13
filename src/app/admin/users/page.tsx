"use client";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import React from "react";

export default function Users() {
  return (
    <div>
      <NavTitle
        title="Manage users"
        subTitle="Manage your system users from this section"
      />
      <SearchBox onChange={(e) => console.log(e)} />
    </div>
  );
}
