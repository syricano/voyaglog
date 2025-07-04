import { useState } from "react";
import voyagStyle from "../style/voyagStyle";
import UserBlogs from "../components/UserBlogs";

const ManageBlogs = () => {
  const token = localStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [blogsError, setBlogsError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const onNewBlogAdded = (blog) => {
    setBlogs((prev) => [blog, ...prev]);
  };

return (
  <div className="h-screen flex flex-col md:flex-row gap-6 px-4 py-6">
    {/* Left column: Add Blog (1/3 width on md+, full width on small) */}
    <div className="md:w-1/3 w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
      <div className="flex-grow overflow-auto border rounded-md border-base-300 p-4">
        <UserBlogs
          token={token}
          blogs={blogs}
          setBlogs={setBlogs}
          blogsError={blogsError}
          setBlogsError={setBlogsError}
          editingBlog={editingBlog}
          setEditingBlog={setEditingBlog}
          loading={loading}
          setLoading={setLoading}
          onNewBlogAdded={onNewBlogAdded}
          showForm={true}
          showList={false}
        />
      </div>
    </div>

    {/* Right column: My Blogs (2/3 width on md+, full width on small) */}
    <div className="md:w-2/3 w-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">My Blogs</h2>
      <div className="flex-grow overflow-auto border rounded-md border-base-300 p-4">
        <UserBlogs
          token={token}
          loading={loading}
          setLoading={setLoading}
          editingBlog={editingBlog}
          setEditingBlog={setEditingBlog}
          blogs={blogs}
          setBlogs={setBlogs}
          blogsError={blogsError}
          setBlogsError={setBlogsError}
          onNewBlogAdded={onNewBlogAdded}
          showForm={false}
          showList={true}
        />
      </div>
    </div>
  </div>
);



};

export default ManageBlogs;
