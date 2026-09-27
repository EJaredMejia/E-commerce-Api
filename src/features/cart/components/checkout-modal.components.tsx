import { usePurchaseCartMutation } from "@/features/cart/hooks/cart.hooks";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@root/components/ui/dialog";
import { Button } from "@root/components/ui/button";
import { Input } from "@root/components/ui/input";

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
    zipCode: "",
    city: "",
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

  // Handle dialog open state changing
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeCheckoutModal();
    }
  };

  return (
    <Dialog open={isCheckoutModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Send to:</DialogTitle>
          <DialogDescription>
            Please enter your shipping information to complete the purchase.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 py-2"
          onSubmit={handleSubmit(purchaseCart)}
        >
          <div className="space-y-2">
            <label htmlFor="street" className="text-sm font-medium">Street</label>
            <Input
              required
              id="street"
              {...register("street")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="zipCode" className="text-sm font-medium">Zip Code</label>
            <Input
              required
              type="number"
              id="zipCode"
              {...register("zipCode")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">City</label>
            <Input
              required
              type="text"
              id="city"
              {...register("city")}
            />
          </div>
          <Button type="submit" className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
            Purchase products
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
