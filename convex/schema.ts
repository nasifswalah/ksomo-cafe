import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
       name: v.string(),
       email: v.string(),
       password: v.string(),
       phone: v.optional(v.string()),
       orderOption: v.optional(v.string()),
       timeSlot: v.optional(v.string()),
    }),
    menu: defineTable({
        name: v.string(),
        price: v.number(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        category: v.string(),
    }),
    cart: defineTable({
        customer: v.id("users"),
        item: v.id("menu"),
        quantity: v.number(),
    }),
    orders: defineTable({
        customer: v.id("users"),
        items: v.array(v.id("cart")),
        total: v.number(),
        orderOption: v.string(),
        timeSlot: v.string(),
        date: v.string(),
        status: v.string(),
        paymentMethod: v.string()
    }),
});