import { useState } from "react";
import doctorImg from "../assets/adctor.jpg";
import "./HomePage.css";
import CoursesPage from "./CoursesPage";
import FirstAidPage from "./FirstAidPage";
import AmbulanceRequestPage from "./AmbulanceRequestPage";
import CommunityPage from "./CommunityPage";
import AiAssistantPage from "./AiAssistantPage";
const STATS_DATA = [
  {
    id: "articles",
    title: "مقالات طبية",
    value: "2.5K+",
    icon: "📄",
    colorClass: "stat-green",
  },
  {
    id: "tools",
    title: "الأدوات الذكية",
    value: "12K+",
    icon: "🧠",
    colorClass: "stat-orange",
  },
  {
    id: "topics",
    title: "المواضيع الصحية",
    value: "850+",
    icon: "📖",
    colorClass: "stat-blue",
  },
  {
    id: "members",
    title: "أعضاء المنصة",
    value: "125K+",
    icon: "👥",
    colorClass: "stat-teal",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "الرئيسية", icon: "🏠" },
  { id: "courses", label: "الدورات التعليمية", icon: "🎓" },
  { id: "first-aid-1", label: "الإسعافات الأولية", icon: "🩹" },
  { id: "first-aid-2", label: "طلب سيارت الاسعاف", icon: "🚑" },
  { id: "community", label: "المجتمع", icon: "👥" },
  { id: "ai", label: "الذكاء الاصطناعي", icon: "✨" },
  { id: "files", label: "الملفات الطبية", icon: "📋" },
  { id: "settings", label: "الإعدادات", icon: "⚙️" },
];

const LATEST_ARTICLES = [
  {
    id: 1,
    title: "إسعافات أولية في حالات الطوارئ",
    date: "2025-10-24",
    badge: "🩹",
    themeClass: "article-theme-emergency",
  },
  {
    id: 2,
    title: "نصائح للحفاظ على صحة القلب",
    date: "2025-10-25",
    badge: "❤️",
    themeClass: "article-theme-heart",
  },
  {
    id: 3,
    title: "كيف تحافظ على صحة دماغك؟",
    date: "2025-10-26",
    badge: "🧠",
    themeClass: "article-theme-brain",
  },
];

function HomePage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="home-page" dir="rtl">
      <header className="home-topbar">
        <div className="home-brand">
          <span className="home-brand-icon">✚</span>
          <span className="home-brand-name">
            Med<span className="home-brand-accent">Spark</span>
          </span>
        </div>

        <div className="home-search-box">
          <span className="home-search-icon">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن محتوى..."
            className="home-search-input"
          />
        </div>

        <div className="home-header-actions">
          <button
            type="button"
            className="home-notif-btn"
            aria-label="الإشعارات"
          >
            🔔
            <span className="home-notif-dot" />
          </button>

          <div className="home-user-profile">
            <span className="home-user-name">أحمد محمد ▾</span>
            <div className="home-user-avatar">أ</div>
          </div>
        </div>
      </header>

      <div className="home-body">
        <aside className="home-sidebar">
          <nav className="home-nav-list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`home-nav-btn ${activeTab === item.id ? "is-active" : ""
                  }`}
              >
                <span className="home-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={onLogout}
            className="home-logout-btn"
          >
            <span>↪</span>
            <span>تسجيل الخروج</span>
          </button>
        </aside>

        <main className="home-main">
          {activeTab === "courses" ? (
            <CoursesPage searchQuery={searchQuery} />
          ) : activeTab === "first-aid-1" ? (
            <FirstAidPage onBackHome={() => setActiveTab("home")} />
          ) : activeTab === "first-aid-2" ? (
            <AmbulanceRequestPage onBackHome={() => setActiveTab("home")} />
          ) : activeTab === "community" ? (
            <CommunityPage onBackHome={() => setActiveTab("home")} />
          ) : activeTab === "ai" ? (
            <AiAssistantPage onBackHome={() => setActiveTab("home")} />
          ) : (
            <>

              <section className="home-stats-grid">
                {STATS_DATA.map((stat) => (
                  <div
                    key={stat.id}
                    className={`home-stat-card ${stat.colorClass}`}
                  >
                    <div className="home-stat-icon">{stat.icon}</div>
                    <div className="home-stat-info">
                      <span className="home-stat-title">{stat.title}</span>
                      <strong className="home-stat-value">{stat.value}</strong>
                    </div>
                  </div>
                ))}
              </section>

              <section className="home-hero-banner">
                <div className="home-hero-media">
                  <img
                    src={doctorImg}
                    alt="طبيب يحمل درع الصحة"
                    className="home-hero-img"
                  />
                  <div className="home-hero-img-fade" />
                </div>

                <div className="home-hero-overlay">
                  <div className="home-hero-content">
                    <h1 className="home-hero-title">
                      معاً .. نحو مجتمع صحي أفضل
                    </h1>
                    <p className="home-hero-desc">
                      منصة تجمع الأطباء وطلاب الطب والمتطوعين لنشر الوعي الصحي وتطوير أدوات ذكية
                    </p>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => setActiveTab("courses")}
                        className="home-hero-cta"
                      >
                        <span>ابدأ الآن</span>
                        <span>←</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("first-aid-1")}
                        className="home-hero-cta"
                        style={{ background: "linear-gradient(90deg, #16a34a, #15803d)" }}
                      >
                        <span>الإسعافات الأولية</span>
                        <span>🩹</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="home-articles-section">
                <div className="home-articles-header">
                  <h2 className="home-articles-title">أحدث المقالات</h2>
                  <a
                    href="#all-articles"
                    onClick={(e) => e.preventDefault()}
                    className="home-view-all"
                  >
                    عرض الكل
                  </a>
                </div>

                <div className="home-articles-grid">
                  {LATEST_ARTICLES.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => {
                        if (article.id === 1) setActiveTab("first-aid-1");
                      }}
                      className={`home-article-card ${article.themeClass}`}
                    >
                      <div className="home-article-overlay">
                        <h3 className="home-article-title">{article.title}</h3>
                        <div className="home-article-meta">
                          <span>{article.date}</span>
                          <span>📅</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default HomePage;