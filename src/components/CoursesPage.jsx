import { useState } from "react";
import "./CoursesPage.css";
import bottomBannerImg from "../assets/aaqq.jpg";
const BOTTOM_BANNER_IMAGE = bottomBannerImg;
import heroBannerImg from "../assets/aaww.jpg";
const HERO_BANNER_IMAGE = heroBannerImg;
const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "general", label: "الطب العام" },
  { id: "first-aid", label: "الإسعافات الأولية" },
  { id: "ai", label: "الذكاء الاصطناعي" },
  { id: "public-health", label: "الصحة العامة" },
];

const COURSES_DATA = [
  {
    id: 1,
    title: "الذكاء الاصطناعي في الرعاية الصحية",
    category: "ai",
    rating: "4.9",
    reviews: "(16k)",
    lessons: "(10k)",
    imageUrl: "",
    fallbackClass: "course-bg-ai",
    fallbackEmoji: "🧠",
  },
  {
    id: 2,
    title: "مبادئ الطب الحديث",
    category: "general",
    rating: "4.7",
    reviews: "(8k)",
    lessons: "(6k)",
    imageUrl: "",
    fallbackClass: "course-bg-general",
    fallbackEmoji: "🩺",
  },
  {
    id: 3,
    title: "الإسعافات الأولية في حالات الطوارئ",
    category: "first-aid",
    rating: "4.8",
    reviews: "(18k)",
    lessons: "(12k)",
    imageUrl: "",
    fallbackClass: "course-bg-firstaid",
    fallbackEmoji: "🧰",
  },
];

function CoursesPage({ searchQuery = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExploreClick = () => {
    const gridEl = document.getElementById("courses-grid-section");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="courses-page" dir="rtl">
      <section className="courses-hero">
        {HERO_BANNER_IMAGE && (
          <img
            src={HERO_BANNER_IMAGE}
            alt="الدورات التعليمية"
            className="courses-hero-img"
          />
        )}
        <div className="courses-hero-overlay" />

        <div className="courses-hero-content">
          <h1 className="courses-hero-title">الدورات التعليمية</h1>
          <p className="courses-hero-subtitle">
            تعلم مهارات طبية وتقنية من خبراء متخصصين
          </p>
          <button
            type="button"
            onClick={handleExploreClick}
            className="courses-hero-btn"
          >
            <span>استكشف الدورات</span>
            <span>←</span>
          </button>
        </div>
      </section>

      <section className="courses-filters-bar" aria-label="تصنيفات الدورات">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`courses-filter-btn ${
              selectedCategory === cat.id ? "is-active" : ""
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>
      <section id="courses-grid-section" className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <article
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="course-card"
            >
              <div className={`course-card-media ${course.fallbackClass}`}>
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="course-card-img"
                  />
                ) : (
                  <span className="course-card-placeholder">
                    {course.fallbackEmoji}
                  </span>
                )}
              </div>

              <div className="course-card-body">
                <h3 className="course-card-title">{course.title}</h3>

                <div className="course-card-meta">
                  <div className="course-rating-group">
                    <strong className="course-rating-score">
                      {course.rating}
                    </strong>
                    <span className="course-star">★</span>
                    <span className="course-reviews">{course.reviews}</span>
                  </div>

                  <div className="course-lessons-group">
                    <span>{course.lessons}</span>
                    <span>📅</span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="courses-empty">
            لا توجد دورات مطابقة للبحث أو التصنيف المحدد.
          </div>
        )}
      </section>

      {selectedCourse && (
        <div className="course-selected-banner">
          <span>
            الدورة المحددة: <strong>{selectedCourse.title}</strong> (التقييم:{" "}
            {selectedCourse.rating} ★)
          </span>
          <button
            type="button"
            onClick={() => setSelectedCourse(null)}
            className="course-clear-btn"
          >
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;