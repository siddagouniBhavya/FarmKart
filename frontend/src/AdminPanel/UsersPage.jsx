import {
  Search,
  Menu,
  X,
  Ban,
  Unlock,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import {
  getAllUsers,
  blockUser,
  unBlock,
} from "../api/admin";

import AdminSidebar from "./AdminSidebar";

import { logOut } from "../api/auth";

import Swal from "sweetalert2";

const UsersPage = () => {

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [openMenu, setOpenMenu] =
    useState(false);

  const navigate = useNavigate();

  // fetch users
  const fetchUsers = async () => {

    try {

      const res =
        await getAllUsers();

      setUsers(
        Array.isArray(res.users)
          ? res.users
          : []
      );

    } catch (err) {

      console.log(err.message);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // filter users
  const filteredUsers =
    users.filter((user) =>
      user.username
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // logout
  const handleLogout = async () => {

    try {

      await logOut();

      Swal.fire({
        title: "Logged Out!",
        text:
          "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor:
          "#16a34a",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");

    } catch (err) {

      Swal.fire({
        title: "Logout Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor:
          "#dc2626",
      });

      console.log(err.message);
    }
  };

  // block user
  const handleBlockUser =
    async (id) => {

      const result =
        await Swal.fire({

          title: "Block User?",

          text:
            "User will lose access to the platform",

          icon: "warning",

          input: "text",

          inputLabel:
            "Reason for blocking",

          inputPlaceholder:
            "Enter blocking reason...",

          showCancelButton: true,

          confirmButtonText:
            "Block User",

          confirmButtonColor:
            "#dc2626",

          cancelButtonColor:
            "#6b7280",

          inputValidator:
            (value) => {

              if (!value) {
                return "Reason is required";
              }

            },
        });

      if (result.isConfirmed) {

        try {

          await blockUser(
            id,
            result.value
          );

          // instant UI update
          setUsers((prev) =>
            prev.map((user) =>
              user._id === id
                ? {
                    ...user,
                    status:
                      "blocked",
                  }
                : user
            )
          );

          Swal.fire({
            title: "Blocked!",
            text:
              "User blocked successfully",
            icon: "success",
            confirmButtonColor:
              "#16a34a",
          });

        } catch (err) {

          Swal.fire({
            title: "Error!",
            text:
              err?.response?.data
                ?.message ||
              "Something went wrong",
            icon: "error",
            confirmButtonColor:
              "#dc2626",
          });

        }
      }
    };

  // unblock user
  const handleUnblockUser =
    async (id) => {

      try {

        await unBlock(id);

        // instant UI update
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id
              ? {
                  ...user,
                  status:
                    "active",
                }
              : user
          )
        );

        Swal.fire({
          title: "Unblocked!",
          text:
            "User unblocked successfully",
          icon: "success",
          confirmButtonColor:
            "#16a34a",
        });

      } catch (err) {

        Swal.fire({
          title: "Error!",
          text:
            err?.response?.data
              ?.message ||
            "Something went wrong",
          icon: "error",
          confirmButtonColor:
            "#dc2626",
        });

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 md:flex flex-col overflow-x-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar active="users" />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-hidden">

        {/* Topbar */}
        <div className="bg-white px-4 md:px-6 py-4 shadow-sm flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="md:hidden bg-green-100 p-2 rounded-lg"
            >
              {openMenu ? (
                <X
                  className="text-green-700"
                  size={22}
                />
              ) : (
                <Menu
                  className="text-green-700"
                  size={22}
                />
              )}
            </button>

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Users
              </h2>

              <p className="text-gray-500 text-sm md:text-base">
                Manage platform users
              </p>

            </div>
          </div>

          {/* Right */}
          <div className="hidden sm:block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            FarmKart Admin
          </div>
        </div>

        {/* Mobile Menu */}
        {openMenu && (

          <div className="md:hidden bg-white shadow-md mx-4 mt-4 rounded-2xl p-4 space-y-3">

            <button
              onClick={() => {
                navigate(
                  "/Adashboard"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate(
                  "/admin/users"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Users
            </button>

            <button
              onClick={() => {
                navigate(
                  "/admin/equipments"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Equipments
            </button>

            <button
              onClick={() => {
                navigate(
                  "/admin/orders"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Orders
            </button>

            <button
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* Page Content */}
        <div className="p-4 md:p-6">

          {/* Search */}
          <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm w-full md:w-80 mb-6">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="outline-none w-full bg-transparent"
            />

          </div>

          {/* Users List */}
          <div className="space-y-4 pb-10">

            {filteredUsers.length >
            0 ? (

              filteredUsers.map(
                (user) => (

                  <div
                    key={user._id}
                    className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                  >

                    {/* Left */}
                    <div>

                      <h2 className="text-lg font-semibold text-gray-800">
                        {user.username}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {user.role}
                      </p>

                      <p className="text-sm text-gray-500 mt-3 break-all">
                        Email :
                        {" "}
                        {user.email}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Contact :
                        {" "}
                        {user.contact}
                      </p>

                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 flex-wrap">

                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          user.status ===
                          "blocked"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.status}
                      </span>

                      {/* Buttons */}
                      {user.status ===
                      "blocked" ? (

                        <button
                          onClick={() =>
                            handleUnblockUser(
                              user._id
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
                        >

                          <Unlock
                            size={18}
                          />

                          Unblock

                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            handleBlockUser(
                              user._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
                        >

                          <Ban
                            size={18}
                          />

                          Block User

                        </button>

                      )}

                    </div>
                  </div>
                )
              )

            ) : (

              <div className="bg-white rounded-3xl p-6 text-center text-gray-500 shadow-sm">
                No users found
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;