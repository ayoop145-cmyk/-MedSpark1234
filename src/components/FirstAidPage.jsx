import { useState } from "react";
import "./FirstAidPage.css";
import firstAidImg from "../assets/wound-care-items-first-aid-kit-1024x765.jpg";
const FIRST_AID_IMAGE = firstAidImg;
const FIRST_AID_VIDEO_EMBED_URL = "https://www.youtube.com/embed/ye3IJWHaVEo";

const FIRST_AID_STEPS = [
  "التأكد من سلامة المكان",
  "مساعدة المصاب وطمأنته",
  "الاتصال بالإسعاف عند الحاجة",
];

function FirstAidPage({ onBackHome }) {
  const [showVideoBox, setShowVideoBox] = useState(false);

  return (
    <div className="firstaid-page" dir="rtl">
      <div className="firstaid-breadcrumb">
        <button
          type="button"
          onClick={onBackHome}
          className="firstaid-crumb-link"
        >
          الرئيسية
        </button>
        <span className="firstaid-crumb-sep">‹</span>
        <span className="firstaid-crumb-current">الإسعافات الأولية</span>
      </div>

      <section className="firstaid-hero-card">
        <div className="firstaid-info">
          <h1 className="firstaid-title">الإسعافات الأولية</h1>
          <p className="firstaid-subtitle">خطوات بسيطة ... تنقذ حياة</p>

          <ul className="firstaid-checklist">
            {FIRST_AID_STEPS.map((step, index) => (
              <li key={index} className="firstaid-check-item">
                <span className="firstaid-check-icon">✓</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setShowVideoBox((prev) => !prev)}
            className="firstaid-video-btn"
          >
            <span className="firstaid-play-circle">▶</span>
            <span>فيديو تعليمي لي الاسعافات الاولية</span>
          </button>
        </div>
        <div className="firstaid-media">
          {FIRST_AID_IMAGE ? (
            <img
              src={FIRST_AID_IMAGE}
              alt="حقيبة الإسعافات الأولية"
              className="firstaid-img"
            />
          ) : (
            <div className="firstaid-kit-placeholder">
              <div className="firstaid-kit-box">
                <span className="firstaid-kit-cross">+</span>
              </div>
            </div>
          )}
        </div>
      </section>
      {showVideoBox && (
        <section className="firstaid-video-panel">
          <div className="firstaid-video-header">
            <h3>الفيديو طبق الدي في الفيديو   ....</h3>
            <button
              type="button"
              onClick={() => setShowVideoBox(false)}
              className="firstaid-close-video"
            >
              إغلاق ✕
            </button>
          </div>
          <div className="firstaid-video-frame">
            <iframe
              src={FIRST_AID_VIDEO_EMBED_URL}
              title="الفيديو التعليمي للإسعافات الأولية"
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: "10px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default FirstAidPage;