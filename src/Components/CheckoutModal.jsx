import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { purchaseCartThunk } from "../store/slices/cart.slice";

const CheckoutModal = ({ isCheckoutModalOpen, closeCheckoutModal }) => {
  const { register, handleSubmit, reset } = useForm();

  const restoreForm = () => {
    reset({
      street: "",
      colony: "",
      zipCode: "",
      city: "",
      references: "",
    });
  };

  const dispatch = useDispatch();

  const purchaseCart = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(purchaseCartThunk(user.token, data));
    closeCheckoutModal();
    restoreForm();
  };
  return (
    <Modal
      isOpen={isCheckoutModalOpen}
      onRequestClose={closeCheckoutModal}
      className="adjust-modal"
    >
      <form
        className="flex flex-col gap-3 p-3 pb-0"
        onSubmit={handleSubmit(purchaseCart)}
      >
         <i onClick={closeCheckoutModal} className="fa-solid fa-x fa-lg absolute right-8 top-8 cursor-pointer text-gray-600"></i>
        <h2 className="font-bold text-gray-800">Send to:</h2>
        <label htmlFor="street">Street</label>
        <input
          required
          className="p-2 border border-gray-300"
          type="text"
          id="street"
          {...register("street")}
        />
        <label htmlFor="colony">Colony</label>
        <input
          required
          className="p-2 border border-gray-300"
          type="text"
          id="colony"
          {...register("colony")}
        />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          required
          className="p-2 border border-gray-300"
          type="number"
          id="zipCode"
          {...register("zipCode")}
        />
        <label htmlFor="city">City</label>
        <input
          required
          className="p-2 border border-gray-300"
          type="text"
          id="city"
          {...register("city")}
        />
        <label htmlFor="references">References</label>
        <input
          required
          className="p-2 border border-gray-300"
          type="text"
          id="references"
          {...register("references")}
        />
        <button className="bg-red-500 text-white p-3">Purchase products</button>
      </form>
    </Modal>
  );
};

export default CheckoutModal;
