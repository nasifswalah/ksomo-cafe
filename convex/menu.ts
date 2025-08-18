import { query } from "./_generated/server";

export const getMenuItems = query({
    handler: async (ctx) => {
        const menuItems = await ctx.db.query("menu").collect();
        console.log(menuItems);
        return menuItems
    }
});