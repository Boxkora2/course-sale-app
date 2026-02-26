"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items: cartItems, discount, couponCode, removeItem, applyCoupon } = useCartStore();
  const [coupon, setCoupon] = useState(couponCode);
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const subtotal = cartItems.reduce((sum, c) => sum + c.price, 0);
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    applyCoupon(coupon);
    const applied = useCartStore.getState().couponCode;
    const codeUpper = coupon.trim().toUpperCase();
    if (applied === codeUpper) {
      setCouponMsg({ text: "Coupon applied! 🎉", ok: true });
    } else {
      setCouponMsg({ text: "Invalid coupon code", ok: false });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 container mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-8 flex items-center gap-3"
      >
        <ShoppingCart className="h-7 w-7 text-primary" />
        Shopping Cart{" "}
        <span className="text-lg text-muted-foreground font-normal">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </motion.h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-xl font-bold">Your cart is empty</p>
          <p className="text-muted-foreground mt-2">Discover our top courses and start learning.</p>
          <Button className="mt-6 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course list */}
          <div className="flex-1 space-y-4">
            {cartItems.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card p-4 flex gap-4 items-start"
              >
                <div className="relative h-20 w-28 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="font-semibold hover:text-primary transition-colors line-clamp-2 text-sm"
                  >
                    {course.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    By {course.instructorName}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="font-bold">{formatPrice(course.price)}</span>
                  <button
                    onClick={() => removeItem(course.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 h-fit w-full lg:w-80 space-y-4"
          >
            <h2 className="font-bold text-lg">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cartItems.length} courses)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#10b981]">
                  <span>Coupon discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <Separator className="bg-border/30" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="gradient-text">{formatPrice(total)}</span>
            </div>

            {/* Coupon */}
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponMsg(null); }}
                className="h-9 text-sm bg-secondary/50 border-border/50"
              />
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 border-primary/50 text-primary hover:bg-primary/10"
                onClick={handleApplyCoupon}
              >
                <Tag className="h-3.5 w-3.5 mr-1" /> Apply
              </Button>
            </div>
            {couponMsg ? (
              <p className={`text-[11px] ${couponMsg.ok ? "text-[#10b981]" : "text-destructive"}`}>
                {couponMsg.text}
              </p>
            ) : (
              <p className="text-[10px] text-muted-foreground">Try: NEXLEARN20 for 20% off</p>
            )}

            <Button
              className="w-full h-11 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 font-semibold shadow-[0_0_20px_var(--glow-primary)]"
              asChild
            >
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
