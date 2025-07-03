import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import voyagStyle from '../style/voyagStyle'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    // Replace with your actual backend URL
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/posts/${id}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error}</p>;
  if (!blog) return <p>No post found</p>;


  return (
    <div className={voyagStyle.blogDetailsWrapper}>
      <h1 className={voyagStyle.blogDetailsTitle}>{blog.title}</h1>

      <p className={voyagStyle.blogDetailsMeta}>
        {blog.date} • by {blog.author.firstName} {blog.author.lastName}
      </p>

      {blog.image && (
        <img
          src={`http://localhost:8080/uploads/${blog.image}`}
          alt={blog.title}
          className={voyagStyle.featuredImage}
        />
      )}

      <p className={voyagStyle.blogDetailsContent}>{blog.content}</p>

      <div className="pt-8">
        <Link to="/" className={voyagStyle.blogDetailsBack}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default BlogDetails
