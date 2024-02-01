import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { signOutSuccess } from "../redux/user/user.slice";

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const signOutHandler = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={"/dashboard?tab=profile"}>
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"user"}
                labelColor={"dark"}
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item
              icon={PiSignOutBold}
              className={"cursor-pointer"}
              onClick={signOutHandler}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default DashSideBar;