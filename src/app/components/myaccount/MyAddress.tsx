"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import {
  deletecustomeraddress,
  fetchAccountAddress,
  updatecustomer,
} from "@/redux/slices/myaccountSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "world-countries";

const MyAddress = () => {
  const dispatch = useAppDispatch();

  const { address, loading, error } = useAppSelector(
    (state: RootState) => state.myaccount
  );

  const auth = useAppSelector((state: RootState) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
    const countryList = countries
    .map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    dispatch(fetchAccountAddress());
  }, [dispatch]);

  const handleDelete = async (id: number | string) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete address with ID: ${id}?`
    );
    if (confirmDelete) {
      try {
        await dispatch(deletecustomeraddress({ id })).unwrap();
        dispatch(fetchAccountAddress());
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const openEditModal = (item: any) => {
    setEditData({
      addressId: item.addressId,
      addressLine1: item.addressLine1,
      addressLine2: item.addressLine2,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
    });

    setShowModal(true);
  };

  const handleUpdate = async () => {
    const payload = {
      addresses: [
        {
          id: editData.addressId,
          addressLine1: editData.addressLine1,
          addressLine2: editData.addressLine2,
          city: editData.city,
          state: editData.state,
          zip: editData.zip,
          country: editData.country,
        },
      ],
    };

    try {
      await dispatch(
        updatecustomer({
          id: auth?.user?.id,
          data: payload,
        })
      ).unwrap();

      setShowModal(false);
      dispatch(fetchAccountAddress());
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="max-w-full">


      {/* -------------------- EDIT MODAL -------------------- */}
      {showModal ? (
      <div className="rounded-lg w-full max-w-full p-6 relative">
  {/* Close Btn */}
  {/* <button
    onClick={() => setShowModal(false)}
    className="absolute right-4 top-4 text-gray-600 hover:text-black"
  >
    <X size={22} />
  </button> */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Address Line 1 */}
    <div>
      <Label className="text-[14px]">Address Line 1</Label>
      <Input
        value={editData.addressLine1}
        onChange={(e) =>
          setEditData({ ...editData, addressLine1: e.target.value })
        }
        className="!w-full !max-w-full !h-[42px]"
      />
    </div>

    {/* Address Line 2 */}
    <div>
      <Label className="text-[14px]">Address Line 2</Label>
      <Input
        value={editData.addressLine2}
        onChange={(e) =>
          setEditData({ ...editData, addressLine2: e.target.value })
        }
        className="!w-full !max-w-full !h-[42px]"
      />
    </div>

    {/* City */}
    <div>
      <Label className="text-[14px]">City</Label>
      <Input
        value={editData.city}
        onChange={(e) =>
          setEditData({ ...editData, city: e.target.value })
        }
        className="!w-full !max-w-full !h-[42px]"
      />
    </div>

    {/* State */}
    <div>
      <Label className="text-[14px]">State</Label>
      <Input
        value={editData.state}
        onChange={(e) =>
          setEditData({ ...editData, state: e.target.value })
        }
        className="!w-full !max-w-full !h-[42px]"
      />
    </div>

    {/* Zip */}
    <div>
      <Label className="text-[14px]">Zip Code</Label>
      <Input
        value={editData.zip}
        onChange={(e) =>
          setEditData({ ...editData, zip: e.target.value })
        }
        className="!w-full !max-w-full !h-[42px]"
      />
    </div>

    {/* Country */}
    <div>
      <Label className="text-[14px]">Country</Label>
      <Select 
        value={editData.country}
        onValueChange={(value) => setEditData({ ...editData, country: value })}
      >
        <SelectTrigger className="!w-full !max-w-full !h-[42px]">
          <SelectValue placeholder="Choose a Country" />
        </SelectTrigger>
        <SelectContent>
          {countryList.map((country) => (
            <SelectItem key={country.code} value={country.name}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-4 mt-10">
    <Button
      onClick={handleUpdate}
      className="w-full md:w-[16%] !p-7 text-2xl border-b-2 border-black bg-[#D42020] text-white font-bold"
    >
      SAVE ADDRESS
    </Button>
    <Button
      onClick={() => setShowModal(false)}
      className="w-full md:w-36 !p-7 text-2xl border-b-2 border-black bg-[#D42020] font-bold text-white transition"
    >
      CANCEL
    </Button>
  </div>
</div>

      ): (
      <>
            {/* Skeleton Loader */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 animate-pulse h-48"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
  <p className="text-red-500">
    Failed to fetch address. {error}
  </p>
)}


      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address List */}
          {address?.addresses?.map((item: any) => (
            <div
              key={item.addressId}
              className="bg-[#CAC9C9] rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-xl mb-6 text-gray-700">
                  {item.customerName || "N/A"}
                </p>
                <p className="text-xl">{item.addressLine1}</p>
                {item.addressLine2 && (
                  <p className="text-xl">{item.addressLine2}</p>
                )}
                <p className="text-xl">
                  {item.city} {item.zip}
                </p>
                <p className="text-xl">{item.country}</p>
              </div>

              <div className="flex gap-2 mt-auto">
                {/* Edit Button */}
{/* Edit Button */}
<button
  onClick={() => openEditModal(item)}
  className="w-50 px-4 py-3 rounded text-2xl font-bold bg-[#D42020] text-white border-b-2 border-black transition"
>
  Edit
</button>

{/* Delete Button */}
<button
  onClick={() => handleDelete(item.addressId)}
  className="w-50 px-4 py-3 rounded text-2xl font-bold bg-[#D42020] text-white border-b-2 border-black transition"
>
  Delete
</button>


              </div>
            </div>
          ))}

          {/* New Address Button */}
          <div className="border border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center h-[206px] hover:bg-gray-50 cursor-pointer">
            <Link
              href="/my-account/addresses/new-address"
              className="flex flex-col items-center justify-center gap-2"
            >
              <Plus size={44} className="text-[#D42020]" />

              <span className="font-medium text-xl">New Address</span>
            </Link>
          </div>
        </div>
      )}
      </>
      ) }
      {/* -------------------- END MODAL -------------------- */}
    </div>
  );
};

export default MyAddress;
