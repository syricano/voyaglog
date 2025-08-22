import { Link } from 'react-router'
import voyagStyle from '../style/voyagStyle'
import { useEffect, useState } from 'react'

const Blogs = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  fetchPosts();
}, []);

  if (loading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (posts.length === 0) {
    return <p>No posts available.</p>
  }

  return (
    <div className={voyagStyle.sectionContainer}>
      <h2 className={voyagStyle.sectionTitle}>All Blogs</h2>
      <div className={voyagStyle.blogGrid}>
        {posts.map(post => (
          <div key={post.id} className={voyagStyle.blogCardContainer}>
            <div className={voyagStyle.cardBody}>
              <h3 className={voyagStyle.cardTitle}>{post.title}</h3>
              <p className={voyagStyle.cardContent}>
                {post.content.length > 150
                  ? post.content.substring(0, 150) + '...'
                  : post.content}
              </p>
              {post.image && (
                <img
                  src={`${API_BASE_URL}/uploads/${post.image}`}
                  alt={post.title || 'Blog Image'}
                  className={voyagStyle.featuredImage} // Add this class or your own styling
                />
              )}
              <div className="card-actions justify-end mt-4">
                <Link to={`/blog/${post.id}`} className={voyagStyle.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
