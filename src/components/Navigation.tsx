import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Book, Baby, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm py-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
          Baby Name Bot
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/blogs" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Book className="w-5 h-5" />
                Blogs
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/babies" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Baby className="w-5 h-5" />
                Babies
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <HelpCircle className="w-5 h-5 mr-2" />
                Help
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] p-2">
                  <Link to="/how-to-use" className="block p-2 hover:bg-gray-100 rounded-md transition-colors">
                    How to Use
                  </Link>
                  <Link to="/faq" className="block p-2 hover:bg-gray-100 rounded-md transition-colors">
                    FAQ
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navigation;