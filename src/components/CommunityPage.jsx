import { useState } from "react";
import "./CommunityPage.css";
import communityBannerImg from "../assets/Healthcare Team in a High-Tech Hospital.png";
import docAvatar1 from "../assets/adctor.jpg";
import memberAvatar2 from "../assets/aaqq.jpg";
import memberAvatar3 from "../assets/aaww.jpg";
import postAvatar1 from "../assets/aee.jpg";

const COMMUNITY_BANNER_URL = communityBannerImg;

const FEATURED_MEMBERS = [
  {
    id: 1,
    name: "د. محمد علي",
    role: "طبيب",
    avatarUrl: docAvatar1,
  },
  {
    id: 2,
    name: "أحمد المطري",
    role: "مطور",
    avatarUrl: memberAvatar2,
  },
  {
    id: 3,
    name: "مريم خالد",
    role: "طالبة طب",
    avatarUrl: memberAvatar3,
  },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "د. سارة أحمد",
    time: "منذ ساعة",
    category: "أسئلة طبية",
    avatarUrl: postAvatar1,
    text: "ما هي أفضل طرق الوقاية من الأمراض الموسمية؟",
    comments: 12,
    likes: 24,
    liked: false,
  },
];

const TABS = [
  "كل المنشورات",
  "أسئلة طبية",
  "مشاريع تقنية",
  "مقالات ومناقشات",
];

function CommunityPage({ onBackHome }) {
  const [activeTab, setActiveTab] = useState("كل المنشورات");
  const [selectedCategory, setSelectedCategory] = useState("أسئلة طبية");
  const [postText, setPostText] = useState("");
  const [joined, setJoined] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const handlePublish = (e) => {
    e.preventDefault();
    const trimmed = postText.trim();
    if (!trimmed) return;

    const newPost = {
      id: Date.now(),
      author: "أنت",
      time: "الآن",
      category:
        activeTab === "كل المنشورات" ? selectedCategory : activeTab,
      avatarUrl: "",
      text: trimmed,
      comments: 0,
      likes: 0,
      liked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredPosts =
    activeTab === "كل المنشورات"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="community-page" dir="rtl">
      <div className="community-breadcrumb">
        <button
          type="button"
          onClick={onBackHome}
          className="community-crumb-link"
        >
          الرئيسية
        </button>
        <span>‹</span>
        <span className="community-crumb-current">المجتمع الطبي</span>
      </div>

      <section className="community-hero">
        {COMMUNITY_BANNER_URL && (
          <img
            src={COMMUNITY_BANNER_URL}
            alt="المجتمع الطبي"
            className="community-hero-bg"
          />
        )}
        <div className="community-hero-overlay" />

        <div className="community-hero-content">
          <h1 className="community-hero-title">المجتمع الطبي</h1>
          <p className="community-hero-subtitle">
            شارك . اسأل . وتعلم مع مجتمعنا
          </p>
          <button
            type="button"
            onClick={() => setJoined((prev) => !prev)}
            className="community-join-btn"
          >
            <span>+</span>
            <span>{joined ? "تم الانضمام للمجتمع" : "انضم إلى المجتمع"}</span>
          </button>
        </div>
      </section>

      {/* شبكة المحتوى الرئيسية: أعضاء مميزون + المنشورات */}
      <div className="community-layout">
        <aside className="community-members-card">
          <h2 className="community-card-heading">أعضاء مميزون</h2>

          <ul className="community-members-list">
            {FEATURED_MEMBERS.map((member) => (
              <li key={member.id} className="community-member-row">
                <div className="community-member-info">
                  <strong className="community-member-name">
                    {member.name}
                  </strong>
                  <span className="community-member-role">{member.role}</span>
                </div>

                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="community-avatar-img"
                  />
                ) : (
                  <div className="community-avatar-fallback" aria-hidden="true">
                    {member.name.charAt(0)}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {showAllMembers && (
            <p className="community-all-members-note">
              جميع الأعضاء النشطين في المجتمع الطبي متاحون للتفاعل والنقاش.
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowAllMembers((prev) => !prev)}
            className="community-view-all-btn"
          >
            <span>🕒</span>
            <span>{showAllMembers ? "إخفاء التفاصيل" : "عرض الكل"}</span>
          </button>
        </aside>

        <div className="community-feed-col">
          <div className="community-tabs-bar" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`community-tab-btn ${
                  activeTab === tab ? "is-active" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handlePublish} className="community-composer-card">
            <div className="community-composer-top">
              <span className="community-composer-icon" aria-hidden="true">
                ☁️
              </span>
              <input
                type="text"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="اكتب منشوراً..."
                className="community-composer-input"
              />
              {activeTab === "كل المنشورات" && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="community-category-select"
                  aria-label="تصنيف المنشور"
                >
                  <option value="أسئلة طبية">أسئلة طبية</option>
                  <option value="مشاريع تقنية">مشاريع تقنية</option>
                  <option value="مقالات ومناقشات">مقالات ومناقشات</option>
                </select>
              )}
            </div>

            <div className="community-composer-actions">
              <button type="submit" className="community-publish-btn">
                نشر
              </button>
            </div>
          </form>

          <div className="community-posts-list">
            {filteredPosts.map((post) => (
              <article key={post.id} className="community-post-card">
                <div className="community-post-header">
                  <div className="community-post-meta">
                    <strong className="community-post-author">
                      {post.author}
                    </strong>
                    <span className="community-post-time">{post.time}</span>
                  </div>

                  {post.avatarUrl ? (
                    <img
                      src={post.avatarUrl}
                      alt={post.author}
                      className="community-avatar-img"
                    />
                  ) : (
                    <div className="community-avatar-fallback" aria-hidden="true">
                      {post.author.charAt(0)}
                    </div>
                  )}
                </div>

                <p className="community-post-body">{post.text}</p>

                <div className="community-post-stats">
                  <span className="community-stat-item">
                    💬 {post.comments}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className={`community-like-btn ${
                      post.liked ? "is-liked" : ""
                    }`}
                  >
                    ❤️ {post.likes}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;