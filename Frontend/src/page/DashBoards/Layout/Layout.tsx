import React, { useState } from "react";
import { 
  Home, 
  User, 
  Settings, 
  List, 
  ShoppingBag, 
  ChevronDown, 
  ChevronRight 
} from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { FaFirstOrder } from "react-icons/fa";

// Define types for menu items
interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  icon?: JSX.Element;
  title?: string;
  link?: string;
  subMenu?: SubMenuItem[];
  section?: string;
  items?: MenuItem[];
}

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <User className="w-5 h-5" />,
      title: "Profile",
      link: "/dashboard/profile",
    },
    {
      section: "Catalog",
      items: [
        {
          icon: <ShoppingBag className="w-5 h-5" />,
          title: "Products",
          subMenu: [
            { title: "Create Product", link: "/dashboard/create-food" },
            { title: "Product List", link: "/dashboard/list-category" },
          ],
        },
        {
          icon: <List className="w-5 h-5" />,
          title: "Categories",
          subMenu: [
            { title: "Create Category", link: "/dashboard/category" },
            { title: "Category List", link: "/dashboard/list-food" },
          ],
        },
      ],
    },
    {
      section: "Management",

      items: [
        {
          icon:<FaFirstOrder/>,
          title:"Pending Order",
          link:"/dashboard/order"
        },
        {
          icon: <Settings className="w-5 h-5" />,
          title: "Store Settings",
          link: "/dashboard/store-settings",
        },
      ],
    },
  ];

  const MenuItem: React.FC<{ item: MenuItem; isCollapsed: boolean }> = ({
    item,
    isCollapsed,
  }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    if (item.section) {
      return (
        <div className="mb-4">
          {!isCollapsed && (
            <div className="text-xs text-gray-400 uppercase tracking-wider px-4 mb-2">
              {item.section}
            </div>
          )}
          {item.items?.map((subItem, index) => (
            <MenuItem 
              key={index} 
              item={subItem} 
              isCollapsed={isCollapsed} 
            />
          ))}
        </div>
      );
    }

    return (
      <div className="relative">
        <Link
          to={item.link || "#"}
          className={`
            flex items-center 
            ${isCollapsed ? "justify-center" : "justify-between"}
            px-4 py-2 
            hover:bg-gray-700 
            rounded-lg 
            group 
            transition-colors 
            duration-200
            ${item.subMenu ? "cursor-pointer" : ""}
          `}
          onClick={(e) => {
            if (item.subMenu) {
              e.preventDefault(); // Prevent navigation if subMenu exists
              setIsSubMenuOpen(!isSubMenuOpen);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.title}</span>
            )}
          </div>

          {!isCollapsed && item.subMenu && (
            <div>
              {isSubMenuOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          )}
        </Link>

        {!isCollapsed && item.subMenu && isSubMenuOpen && (
          <div className="pl-8 mt-1 space-y-1">
            {item.subMenu.map((subMenuItem, index) => (
              <Link
                to={subMenuItem.link || "#"}
                key={index}
                className="
                  block 
                  px-4 
                  py-2 
                  text-sm 
                  text-gray-300 
                  hover:bg-gray-700 
                  rounded-lg
                  cursor-pointer
                "
              >
                {subMenuItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "w-20" : "w-64"} overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-600`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          {!isSidebarCollapsed && (
            <h2 className="text-xl font-bold">Dashboard</h2>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <ChevronRight 
              className={`w-6 h-6 transform transition-transform duration-300
                ${isSidebarCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isCollapsed={isSidebarCollapsed} 
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
