"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CreditCard, Lock, Shield, Tag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/data/courses";
import { formatPrice } from "@/lib/utils";

const cartItems = [courses[0], courses[1]];

export default function CheckoutPage() {
  const [coupon, setCoupon]     = useState("");
  const [discount, setDiscount] = useState(0);
  const [success, setSuccess]   = useState(false);

  const subtotal = cartItems.reduce((s, c) => s + c.price, 0);
  const total    = Math.max(0, subtotal - discount);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "NEXLEARN20") {
      setDiscount(subtotal * 0.2);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-3xl text-center max-w-md mx-4"
        >
          <CheckCircle2 className="h-16 w-16 mx-auto text-[#10b981] mb-4 animate-float" />
          <h1 className="text-2xl font-black gradient-text">Order Confirmed!</h1>
          <p className="mt-3 text-muted-foreground">
            Welcome to your new courses. Start learning now.
          </p>
          <Button
            className="mt-8 w-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0"
            onClick={() => window.location.href = "/dashboard"}
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 container mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-8 flex items-center gap-3"
      >
        <Lock className="h-6 w-6 text-primary" />
        Secure Checkout
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <div className="glass-card p-6 space-y-5">
            <h2 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Information
            </h2>
            {/* TODO: Replace with Stripe Elements or real payment form */}
            <div>
              <Label className="text-sm">Card Number</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Expiry Date</Label>
                <Input
                  placeholder="MM / YY"
                  className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60"
                  maxLength={7}
                />
              </div>
              <div>
                <Label className="text-sm">CVC</Label>
                <Input
                  placeholder="123"
                  className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm">Cardholder Name</Label>
              <Input
                placeholder="Your Name"
                className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60"
              />
            </div>
          </div>

          <div className="glass-card p-6 space-y-3">
            <h2 className="font-semibold">Billing Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">First Name</Label>
                <Input className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60" />
              </div>
              <div>
                <Label className="text-sm">Last Name</Label>
                <Input className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60" />
              </div>
            </div>
            <div>
              <Label className="text-sm">Email</Label>
              <Input
                type="email"
                className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60"
              />
            </div>
            <div>
              <Label className="text-sm">Country</Label>
              <Input className="mt-1.5 h-11 bg-secondary/50 border-border/50 focus:border-primary/60" />
            </div>
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 h-fit w-full lg:w-88 space-y-4"
        >
          <h2 className="font-bold text-lg">Order Summary</h2>

          {cartItems.map((course) => (
            <div key={course.id} className="flex gap-3">
              <div className="relative h-14 w-20 rounded overflow-hidden shrink-0">
                <Image src={course.thumbnail} alt={course.title} fill sizes="80px" className="object-cover" priority />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{course.title}</p>
                <p className="text-sm font-bold text-primary mt-1">{formatPrice(course.price)}</p>
              </div>
            </div>
          ))}

          <Separator className="bg-border/30" />

          {/* Coupon */}
          <div className="flex gap-2">
            <Input
              placeholder="Promo code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="h-9 text-sm bg-secondary/50 border-border/50"
            />
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-primary/50 text-primary hover:bg-primary/10"
              onClick={applyCoupon}
            >
              <Tag className="h-3.5 w-3.5 mr-1" /> Apply
            </Button>
          </div>

          <Separator className="bg-border/30" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#10b981]">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
          </div>

          <Separator className="bg-border/30" />

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span className="gradient-text">{formatPrice(total)}</span>
          </div>

          <Button
            className="w-full h-12 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-0 font-semibold shadow-[0_0_20px_var(--glow-primary)] text-base"
            onClick={() => setSuccess(true)}
          >
            <Lock className="h-4 w-4 mr-2" />
            Place Order
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-[#10b981]" />
            30-day money-back guarantee
          </div>
        </motion.div>
      </div>
    </div>
  );
}
