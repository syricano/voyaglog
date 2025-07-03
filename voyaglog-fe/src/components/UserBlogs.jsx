import { useState, useEffect } from "react";
import voyagStyle from "../style/voyagStyle";

const UserBlogs = ({
  token,
  blogs,
  setBlogs,
  blogsError,
  setBlogsError,
  editingBlog,
  setEditingBlog,
  loading,
  setLoading,
  onNewBlogAdded,
  showForm = true,
  showList = true,
}) => {
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: null });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) return;
    if (blogs.length > 0) return; // <-- avoid refetch if blogs already loaded

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/posts/my-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data || []);
        setBlogsError("");
      } catch (err) {
        setBlogsError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token, blogs.length, setBlogs, setBlogsError, setLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBlog((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlogsError("");
    setSuccess("");

    if (!newBlog.title || !newBlog.content) {
      setBlogsError("Title and content are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      if (newBlog.image) formData.append("image", newBlog.image);

      const res = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");

      if (onNewBlogAdded) onNewBlogAdded(data);

      setNewBlog({ title: "", content: "", image: null });
      setPreviewUrl(null);
      setSuccess("Blog post created successfully ✅");

      setTimeout(() => setSuccess(""), 8000);
    } catch (err) {
      setBlogsError(err.message);
    }
  };

  const startEditing = (blog) => {
    setEditingBlog({ ...blog, image: null });
    setPreviewUrl(blog.imageUrl || null);
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setPreviewUrl(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingBlog((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("title", editingBlog.title);
    formData.append("content", editingBlog.content);
    if (editingBlog.image) {
      formData.append("image", editingBlog.image);
    }

    try {
      const res = await fetch(`http://localhost:8080/api/posts/${editingBlog.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update blog");

      setBlogs((prev) =>
        prev.map((b) => (b.id === editingBlog.id ? { ...b, ...data } : b))
      );
      setEditingBlog(null);
      setPreviewUrl(null);
      setSuccess("Blog updated ✅");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={voyagStyle.sectionContainer}>
      {showForm && (
        <div>
          <form className={voyagStyle.form} onSubmit={handleSubmit}>
            <h3 className={voyagStyle.sectionTitle}>Create New Blog</h3>

            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                className={voyagStyle.input}
                value={newBlog.title}
                onChange={handleChange}
                placeholder="Enter your blog title"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Content</label>
              <textarea
                name="content"
                className={voyagStyle.textarea}
                rows={6}
                value={newBlog.content}
                onChange={handleChange}
                placeholder="Write your blog content..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-base-content">
                Upload Image (optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs h-9 min-h-8 text-xs"
                />
                {previewUrl && (
                  <div className="border border-neutral/20 dark:border-neutral/40 rounded-md p-0.5">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-20 object-contain rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className={voyagStyle.submitButton}>
              Submit Blog
            </button>
          </form>
        </div>
      )}

      {showList && (
        <div className={voyagStyle.blogGrid}>
          {blogs.map((blog) =>
            editingBlog?.id === blog.id ? (
              <div key={blog.id} className={voyagStyle.blogCardContainer}>
                <div className={voyagStyle.cardBody}>
                  <input
                    className={voyagStyle.input}
                    type="text"
                    name="title"
                    value={editingBlog.title}
                    onChange={handleEditChange}
                  />
                  <textarea
                    className={voyagStyle.textarea}
                    name="content"
                    value={editingBlog.content}
                    onChange={handleEditChange}
                  />
                  <input type="file" onChange={handleEditImageChange} />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className={`${voyagStyle.featuredImage} mt-4`}
                    />
                  )}
                  <div className="flex gap-2 mt-4">
                    <button className="btn btn-success btn-sm" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={blog.id} className={voyagStyle.blogCardContainer}>
                <div className={voyagStyle.cardBody}>
                  <h3 className={voyagStyle.cardTitle}>{blog.title}</h3>
                  <p className={voyagStyle.cardContent}>
                    {blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
                  </p>
                  {blog.image && (
                    <img
                      src={`http://localhost:8080/uploads/${blog.image}`}
                      alt="Blog"
                      className={`${voyagStyle.featuredImage} mt-4`}
                    />
                  )}
                  <div className="card-actions justify-end mt-4">
                    <button
                      className={voyagStyle.readMoreButton}
                      onClick={() => startEditing(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
