"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import {
  deletecustomeraddress,
  fetchCustomerAddress,
  fetchAccountAddress,
  updatecustomer,
  updateCustomerAddress,
} from "@/redux/slices/myaccountSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "world-countries";
import { Country, State } from "country-state-city";
import { useMemo } from "react";
import { toast } from "react-toastify";

const MyAddress = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({
  firstName: "",
  lastName: "",
  addressLine1: "",
  city: "",
  state: "",
  zip: "",
  country: "",
});

  const { address, loading, error, customerAddresses } = useAppSelector(
    (state: RootState) => state.myaccount,
  );

  const auth = useAppSelector((state: RootState) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));
  const stateList = useMemo(() => {
    if (!editData?.country) return [];

    return State?.getStatesOfCountry(editData?.country).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [editData?.country]);
  const handleDelete = async (id: number | string) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete address with ID: ${id}?`,
    );
    if (confirmDelete) {
      try {
        await dispatch(deletecustomeraddress({ id })).unwrap();
        dispatch(fetchCustomerAddress());
      } catch (err) {}
    }
  };

  const openEditModal = (item: any) => {
    setEditData({
      addressId: item.id,
      addressLine1: item.address_line_1,
      addressLine2: item.address_line_2,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
      firstName: item.first_name,
      lastName: item.last_name,
      companyName: item.company_name,
      phone: item.phone_number,
    });

    setShowModal(true);
  };

 const handleUpdate = async () => {
  const newErrors = {
    firstName: editData.firstName ? "" : "First Name is required",
    lastName: editData.lastName ? "" : "Last Name is required",
    addressLine1: editData.addressLine1
      ? ""
      : "Address Line 1 is required",
    city: editData.city ? "" : "City is required",
    state: editData.state ? "" : "State is required",
    zip: editData.zip ? "" : "Zip is required",
    country: editData.country ? "" : "Country is required",
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((err) => err !== "")) {
    return;
  }

  const payload = {
    address_line_1: editData.addressLine1,
    address_line_2: editData.addressLine2,
    city: editData.city,
    state: editData.state,
    zip: editData.zip,
    country: editData.country,
    first_name: editData.firstName,
    last_name: editData.lastName,
    company_name: editData.companyName,
    phone_number: editData.phone,
  };

  try {
    await dispatch(
      updateCustomerAddress({
        id: editData.addressId,
        data: payload,
      })
    ).unwrap();

    setShowModal(false);
    dispatch(fetchCustomerAddress());
  } catch (err) {}
};

  useEffect(() => {
    dispatch(fetchCustomerAddress());
  }, [dispatch]);

  return (
    <div className="max-w-full">
      {/* -------------------- EDIT MODAL -------------------- */}
      {showModal ? (
        <div className="rounded-lg w-full max-w-full p-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="firstName"
              >
                First Name <span className="text-[11px]">*</span>
              </Label>
              <Input
                value={editData.firstName}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
              {errors.firstName && (
  <p className="text-red-500 text-[12px]  mt-1 ml-2">{errors.firstName}</p>
)}
            </div>

            {/* Last Name */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="lastName"
              >
                Last Name <span className="text-[11px]">*</span>
              </Label>
              <Input
                value={editData.lastName}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
                  {errors.lastName && (
  <p className="text-red-500 text-[12px] mt-1 ml-2">{errors.lastName}</p>
)}
            </div>

            {/* Company */}
            <div>
              <Label className="text-[14px]">Company</Label>
              <Input
                value={editData.companyName}
                onChange={(e) =>
                  setEditData({ ...editData, companyName: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-[14px]">Phone</Label>
              <Input
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="address1"
              >
                Address Line 1 <span className="text-[11px]">*</span>
              </Label>
              <Input
                value={editData.addressLine1}
                onChange={(e) =>
                  setEditData({ ...editData, addressLine1: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
                  {errors.addressLine1 && (
  <p className="text-red-500 text-[12px]  mt-1 ml-2">{errors.addressLine1}</p>
)}
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
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="suburb"
              >
                Suburb / City <span className="text-[11px]">*</span>
              </Label>
              <Input
                value={editData.city}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
              {errors.city && (
  <p className="text-red-500 text-[12px]  mt-1">{errors.city}</p>
)}
            </div>

            {/* State */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="state"
              >
                State <span className="text-[11px]">*</span>
              </Label>
              {/* <Input
                value={editData.state}
                onChange={(e) =>
                  setEditData({ ...editData, state: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              /> */}
              {stateList.length > 0 ? (
                 <>
                <Select
                  value={editData.state}
                  onValueChange={(value) =>
                    setEditData({
                      ...editData,
                      state: value,
                    })
                  }
                >
                  <SelectTrigger className="!w-full !max-w-full !h-[42px]">
                    <SelectValue placeholder="Choose a State" />
                  </SelectTrigger>

                  <SelectContent>
                    {stateList.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  {errors.state && (
        <p className="text-red-500 text-[12px]  mt-1">
          {errors.state}
        </p>
      )}
    </>
              ) : (
                <>
                <Input
                  value={editData.state}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      state: e.target.value,
                    })
                  }
                  className="!w-full !max-w-full !h-[42px]"
                />
                    {errors.state && (
        <p className="text-red-500 text-[12px] mt-1">
          {errors.state}
        </p>
      )}
    </>
              )}
            </div>

            {/* Zip */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal  flex md:justify-between"
                htmlFor="postcode"
              >
                Zip / Postcode <span className="text-[11px]">*</span>
              </Label>
              <Input
                value={editData.zip}
                onChange={(e) =>
                  setEditData({ ...editData, zip: e.target.value })
                }
                className="!w-full !max-w-full !h-[42px]"
              />
              {errors.zip && (
  <p className="text-red-500 text-[12px] mt-1">{errors.zip}</p>
)}
            </div>

            {/* Country */}
            <div>
              <Label
                className="text-[14px] text-[#545454] !font-normal flex md:justify-between"
                htmlFor="country"
              >
                Country <span className="text-[11px]">*</span>
              </Label>
              <Select
                value={editData.country}
                onValueChange={(value) =>
                  setEditData({ ...editData, country: value, state: "" })
                }
              >
                <SelectTrigger className="!w-full !max-w-full !h-[42px]">
                  <SelectValue placeholder="Choose a Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
  <p className="text-red-500 text-[12px] mt-1">{errors.country}</p>
)}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full md:w-[16%] !p-7 text-2xl border-b-2 rounded-none border-black bg-[#D42020] text-white font-bold"
            >
              {loading ? "UPDATING..." : "UPDATING ADDRESS"}
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              className="w-full md:w-36 !p-7 text-2xl border-b-2 rounded-none border-black bg-[#D42020] font-bold text-white transition"
            >
              CANCEL
            </Button>
          </div>
        </div>
      ) : (
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
            <p className="text-red-500">Failed to fetch address. {error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 m-2 md:grid-cols-2 gap-6 roboto-font">
              {/* Address List */}
              {customerAddresses?.map((item: any) => (
                <div
                  key={item.addressId}
                  className="bg-[#CAC9C9] rounded-none p-6 flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col gap-1 mb-4">
                    <p className="text-[15px] mb-6 text-[#545454]">
                      {item.first_name || "N/A"} {item.last_name}
                    </p>
                    <p className="text-[15px] text-[#545454]">
                      {item.address_line_1}
                    </p>
                    {item.address_line_2 && (
                      <p className="text-[15px] text-[#545454]">
                        {item.address_line_2}
                      </p>
                    )}
                    <p className="text-[15px] text-[#545454]">
                      {item.city} {item.zip}
                    </p>
                    <p className="text-[15px] text-[#545454]">{item.country}</p>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    {/* Edit Button */}
                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="w-50 px-4 py-3 rounded-none text-2xl font-bold bg-[#D42020] text-white border-b-2 border-black transition"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-50 px-4 py-3 rounded-none text-2xl font-bold bg-[#D42020] text-white border-b-2 border-black transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* New Address Button */}
              <div className="border border-gray-400 rounded-none p-6 flex flex-col items-center justify-center h-[235px] hover:bg-gray-50 cursor-pointer">
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
      )}
    </div>
  );
};

export default MyAddress;
