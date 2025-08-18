import { api } from "@/convex/_generated/api";
import { MenuItem } from "@/types/menu";
import { useQuery } from "convex/react";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
}

const MenuContext = createContext<MenuContextType>({
  menu: [],
  loading: false,
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const menuData = useQuery(api.menu.getMenuItems);

  // Convert Convex items to MenuItem[] format
  const menuItems: MenuItem[] = useMemo(() => {
    return (
      menuData?.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      })) || []
    );
  }, [menuData]);

  const loading = menuData === undefined;

  return (
    <MenuContext.Provider value={{ menu: menuItems, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
