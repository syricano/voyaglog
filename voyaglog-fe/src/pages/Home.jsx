import { Link } from 'react-router'
import voyagStyle from '../style/voyagStyle'
import { useEffect, useState } from 'react'
import HeroFlip from '../components/HeroFlip'
import front from '../assets/front.jpg'
import back from '../assets/back.jpg'


const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')

        const data = await response.json()
        setPosts(data || [])
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className={voyagStyle.heroSection}>
        
        <h1 className={voyagStyle.heroTitle}>Explore the World with Voyaglog</h1>
        <p className={voyagStyle.heroSubtitle}>Your personal travel blog and story hub</p>
        <HeroFlip
        frontImage={front}
        backImage={back}
        altFront="Mountain View"
        altBack="Sunset View"

        />

        <Link to="/about" className={voyagStyle.heroButton}>
          Learn More
        </Link>
      </section>

      {/* Latest Blogs */}
      <section className={voyagStyle.sectionContainer}>
        <h2 className={voyagStyle.sectionTitle}>Latest Adventures</h2>

        {loading && <p>Loading posts...</p>}
        {error && (
          <p className="text-red-500">
            Error loading posts. Please check your internet connection or try again later.
          </p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="text-base-content/70">No posts available.</p>
        )}

        <div className={voyagStyle.blogGrid}>
          {posts.map((post) => (
            <div key={post.id} className={voyagStyle.blogCardContainer}>
              <div className={voyagStyle.cardBody}>
                <h3 className={voyagStyle.cardTitle}>{post.title}</h3>
                <p className={voyagStyle.cardContent}>
                  {post.content.length > 100
                    ? post.content.slice(0, 100) + '...'
                    : post.content}
                </p>
                {post.image && (
                  <img
                    src={`http://localhost:8080/uploads/${post.image}`}
                    alt={post.title}
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
      </section>

      {/* CTA Section */}
      <section className={voyagStyle.ctaSection}>
        <h2 className={voyagStyle.ctaTitle}>Want to share your journey?</h2>
        <Link
          to={localStorage.getItem('token') ? '/manage-blogs' : '/login'}
          className={voyagStyle.ctaButton}
        >
          Start Blogging
        </Link>
      </section>
    </div>
  )
}

export default Home
