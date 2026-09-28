
import { Sidebar, type SidebarProps } from "./Sidebar";
import { Trigger } from "./components/Trigger/Trigger";
import { Item } from "./components/Item/Item";
import { Footer } from "./components/Footer/Footer";


type SidebarComponent = typeof Sidebar & {
  Trigger: typeof Trigger;
  Item: typeof Item;
  Footer: typeof Footer;
};

const SidebarCompound = Sidebar as SidebarComponent;

SidebarCompound.Trigger = Trigger;
SidebarCompound.Item = Item;
SidebarCompound.Footer = Footer;

export { SidebarCompound as Sidebar };
export type { SidebarProps };

export default SidebarCompound;