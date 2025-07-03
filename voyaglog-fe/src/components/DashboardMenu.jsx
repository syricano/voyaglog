import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";

const DashboardMenu = ({ setIsOpen }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [expanded]);

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center w-full btn btn-ghost rounded-md hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
      >
        <span>Dashboard</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown - absolute so it doesn't affect layout */}
      <div
        ref={contentRef}
        className="absolute left-0 w-48 bg-base-100 z-50 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height, top: '100%' }}
      >
        <div className="py-2">
          <Link
            to="/manage-blogs"
            className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Manage Blogs
          </Link>
          <Link
            to="/user-profile"
            className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            User Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
