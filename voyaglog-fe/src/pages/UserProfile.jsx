import { useState, useEffect } from "react";
import voyagStyle from "../style/voyagStyle";
import HandleUsers from "../components/HandleUsers";

const UserProfile = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [blogsError, setBlogsError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user data");
        setUser({
          firstName: data.firstName ?? data.firstname ?? "",
          lastName: data.lastName ?? data.lastname ?? "",
          email: data.email ?? "",
          username: data.username ?? "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className={voyagStyle.pageContainer}>
      <section className={voyagStyle.sectionContainer}>
        <h1 className={voyagStyle.sectionTitle}>User Profile</h1>
      </section>

      <section className={voyagStyle.sectionContainer}>
        <div className="max-w-md p-5">
          <HandleUsers
            token={token}
            user={user}
            setUser={setUser}
            blogs={blogs}
            setBlogs={setBlogs}
            blogsError={blogsError}
            setBlogsError={setBlogsError}
          />
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
