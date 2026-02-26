"use client";
// components/course/AddToCartButton.tsx
// Client component: calls Zustand store, shows in-cart feedback.

import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import type { Course } from "@/data/courses";

interface AddToCartButtonProps {
  course: Course;
  /** When true, immediately navigates to /cart after adding */
  navigateOnAdd?: boolean;
  className?: string;
}

export function AddToCartButton({
  course,
  navigateOnAdd = false,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { items, addItem } = useCartStore();
  const inCart = items.some((i) => i.id === course.id);

  const handleClick = () => {
    if (!inCart) addItem(course);
    if (navigateOnAdd || inCart) router.push("/cart");
  };

  return (
    <Button
      variant="outline"
      className={
        className ??
        "w-full h-11 border-border/50 hover:border-primary/50 hover:bg-primary/10"
      }
      onClick={handleClick}
    >
      {inCart ? (
        <>
          <CheckCircle2 className="h-4 w-4 mr-2 text-[#10b981]" />
          Go to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
