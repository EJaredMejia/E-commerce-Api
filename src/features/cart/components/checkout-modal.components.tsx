import { usePurchaseCartMutation } from "@/features/cart/hooks/cart.hooks";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

interface CheckoutModalProps {
  isCheckoutModalOpen: boolean;
  closeCheckoutModal: () => void;
}

export function CheckoutModal({
  isCheckoutModalOpen,
  closeCheckoutModal,
}: CheckoutModalProps) {
  const defaultValues = {
    street: "",
    colony: "",
    zipCode: "",
    city: "",
    references: "",
  };
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });

  const { mutate: purchaseCartMutate } = usePurchaseCartMutation();

  function restoreForm() {
    reset();
  }

  function purchaseCart(data: typeof defaultValues) {
    purchaseCartMutate(data);
    closeCheckoutModal();
    restoreForm();
  }

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
        <X
          onClick={closeCheckoutModal}
          className="absolute top-8 right-8 cursor-pointer text-gray-600"
          size={24}
        />
        <h2 className="font-bold text-gray-800">Send to:</h2>
        <label htmlFor="street">Street</label>
        <input
          required
          className="border border-gray-300 p-2"
          type="text"
          id="street"
          {...register("street")}
        />
        <label htmlFor="colony">Colony</label>
        <input
          required
          className="border border-gray-300 p-2"
          type="text"
          id="colony"
          {...register("colony")}
        />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          required
          className="border border-gray-300 p-2"
          type="number"
          id="zipCode"
          {...register("zipCode")}
        />
        <label htmlFor="city">City</label>
        <input
          required
          className="border border-gray-300 p-2"
          type="text"
          id="city"
          {...register("city")}
        />
        <label htmlFor="references">References</label>
        <input
          required
          className="border border-gray-300 p-2"
          type="text"
          id="references"
          {...register("references")}
        />
        <button className="bg-red-500 p-3 text-white">Purchase products</button>
      </form>
    </Modal>
  );
}
