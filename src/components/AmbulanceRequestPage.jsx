import { useState } from "react";
import "./AmbulanceRequestPage.css";
import ambulanceBgImg from "../assets/Futuristic Ambulance Outside Hospital.png";

const AMBULANCE_BG_IMAGE = ambulanceBgImg;
const BEFORE_AMBULANCE_YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/hwwviJX1zXk";;

const WHAT_TO_DO_STEPS = [
  "حافظ على هدوئك وتأكد من أمان المكان لك وللمصاب قبل الاقتراب.",
  "ابقِ الهاتف متاحاً وقريباً منك للرد على فريق الطوارئ وتوجيههم للموقع بدقة.",
  "أفسح الطريق لسيارة الإسعاف ووجّه شخصاً لاستقبال المسعفين عند المدخل.",
  "لا تحرّك المصاب فجأة إذا كان هناك اشتباه في إصابة بالرقبة أو العمود الفقري، وراقب التنفس والوعي.",
  "جهّز بطاقة الهوية أو أي أدوية وتقارير طبية مهمة لتسليمها للطاقم الطبي عند الوصول.",
];

function AmbulanceRequestPage({ onBackHome }) {
  const [locationLabel, setLocationLabel] = useState("موقعي الحالي");
  const [statusMessage, setStatusMessage] = useState("");

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setLocationLabel(`موقعي الحالي (${lat}, ${lng})`);
        },
        () => {
          setLocationLabel("موقعي الحالي (تم التحديد)");
        }
      );
    } else {
      setLocationLabel("موقعي الحالي (تم التحديد)");
    }
  };

  const handleSendRequest = () => {
    setStatusMessage(
      "تم إرسال طلب سيارة الإسعاف — سيتم التواصل معك في أقرب وقت."
    );
  };

  return (
    <div className="ambulance-page" dir="rtl">
      <div className="ambulance-breadcrumb">
        <button
          type="button"
          onClick={onBackHome}
          className="ambulance-crumb-link"
        >
          الرئيسية
        </button>
        <span className="ambulance-crumb-sep">‹</span>
        <span className="ambulance-crumb-current">طلب سيارة الإسعاف</span>
      </div>

      <section className="ambulance-card">
        {AMBULANCE_BG_IMAGE && (
          <img
            src={AMBULANCE_BG_IMAGE}
            alt="سيارة إسعاف للطوارئ"
            className="ambulance-bg-img"
          />
        )}

        <div className="ambulance-bg-overlay" />
        <div className="ambulance-content">
          <div className="ambulance-header-banner">
            <div className="ambulance-header-right">
              <span className="ambulance-header-icon" aria-hidden="true">
                🚑
              </span>
              <div className="ambulance-header-texts">
                <h1 className="ambulance-title">طلب سيارة إسعاف</h1>
                <p className="ambulance-subtitle">للحالات الطارئة فقط</p>
              </div>
            </div>

            <span className="ambulance-ecg-line" aria-hidden="true">
              〰️❤️〰️
            </span>
          </div>

          <div className="ambulance-body-row">
            <div className="ambulance-controls">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="ambulance-location-pill"
              >
                <span className="ambulance-loc-icon" aria-hidden="true">
                  🎯
                </span>
                <span>{locationLabel}</span>
              </button>

              <div className="ambulance-case-box">
                <div className="ambulance-case-top">
                  <span className="ambulance-case-label">نوع الحالة</span>
                  <span className="ambulance-heart-icon" aria-hidden="true">
                    ❤️
                  </span>
                </div>
                <strong className="ambulance-case-value">حالة طارئة</strong>
              </div>

              <button
                type="button"
                onClick={handleSendRequest}
                className="ambulance-submit-btn"
              >
                <span className="ambulance-phone-icon" aria-hidden="true">
                  📞
                </span>
                <span>إرسال الطلب الآن</span>
              </button>

              <p className="ambulance-footer-note">
                <span aria-hidden="true">🔄</span>
                <span>سيتم التواصل معك في أقرب وقت</span>
              </p>

              {statusMessage && (
                <p className="ambulance-sent-alert">{statusMessage}</p>
              )}
            </div>
          </div>

          <div className="ambulance-inside-guide">
            <h2 className="ambulance-inside-guide-title">
              ماذا تفعل ريثما تصل سيارة الإسعاف؟
            </h2>
            <ul className="ambulance-steps-list">
              {WHAT_TO_DO_STEPS.map((step, index) => (
                <li key={index} className="ambulance-step-item">
                  <span className="ambulance-step-num">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="ambulance-video-card">
        <h2 className="ambulance-section-title">
          فيديو شرح: ماذا تفعل قبل وصول الإسعاف؟
        </h2>

        {BEFORE_AMBULANCE_YOUTUBE_EMBED_URL ? (
          <div className="ambulance-video-frame-wrap">
            <iframe
              src={BEFORE_AMBULANCE_YOUTUBE_EMBED_URL}
              title="ماذا تفعل قبل وصول سيارة الإسعاف"
              className="ambulance-video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="ambulance-video-placeholder">
            <span className="ambulance-video-badge">▶ YouTube</span>
            <p className="ambulance-video-placeholder-text">{" "}
              <code>BEFORE_AMBULANCE_YOUTUBE_EMBED_URL</code> داخل ملف{" "}
              <code>AmbulanceRequestPage.jsx</code> (بصيغة{" "}
              <code></code>).
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AmbulanceRequestPage;