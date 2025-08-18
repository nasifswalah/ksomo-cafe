import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCartItems = query({
  handler: async (ctx) => {
    const cartItems = await ctx.db.query("cart").order("desc").collect();
    return cartItems;
  },
});

export const addToCart = mutation({
  args: {
    customerId: v.id("users"),
    itemId: v.id("menu"),
    quantity: v.number(),
  },
  handler(ctx, args) {
    const cartItem = ctx.db.insert("cart", {
      customer: args.customerId,
      item: args.itemId,
      quantity: args.quantity,
    });
    return cartItem;
  },
});

export const updateQuantity = mutation({
  args: { itemId: v.id("cart"), quantity: v.number() },
  handler: async (ctx, args) => {
    const cartItem = await ctx.db.get(args.itemId);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }
    await ctx.db.patch(cartItem._id, { quantity: args.quantity });
    return cartItem;
  },
});

export const clearCart = mutation({
  args: {
    customerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all cart items for this customer
    const cartItems = await ctx.db
      .query("cart")
      .filter(q => q.eq(q.field("customer"), args.customerId))
      .collect();

    // Delete each one
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
  },
});

export const removeFromCart = mutation({
  args: { itemId: v.id("cart") },
  handler: async (ctx, args) => {
    const cartItem = await ctx.db.get(args.itemId);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }
    await ctx.db.delete(cartItem._id);
  },
});
