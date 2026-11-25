import { useState } from "react";
import "./AiAssistantPage.css";
import aiBannerImg from "../assets/arrt.jpg";
import chokingGuideImg from "../assets/aryy.jpg";

const AI_BANNER_IMAGE_URL = aiBannerImg;
const CHOKING_GUIDE_IMAGE_URL = chokingGuideImg;
const RECENT_CHATS = [
  {
    id: 1,
    title: "ما هي الإسعافات الأولية...",
    time: "منذ 5 دقائق",
    icon: "➕",
    reply:
      "عند حدوث الاختناق، تأكد من قدرة الشخص على التنفس أو السعال، شجعه على السعال إذا أمكن، أو نفّذ مناورة هيمليك واتصل بالإسعاف فوراً.",
  },
  {
    id: 2,
    title: "أعراض السكتة الدماغية؟",
    time: "منذ ساعة",
    icon: "🧠",
    reply:
      "من أبرز أعراض السكتة الدماغية المفاجئة: تدلي الوجه، ضعف أو خدر في طرف واحد، وصعوبة في الكلام أو الفهم. اطلب الطوارئ فوراً.",
  },
  {
    id: 3,
    title: "كيفية قياس الضغط؟",
    time: "منذ ساعتين",
    icon: "🩺",
    reply:
      "اجلس بهدوء لمدة 5 دقائق، ضع الذراع على مستوى القلب، وثبّت الكفة فوق المرفق دون كلام أثناء القراءة.",
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "user",
    text: "ما هي الإسعافات الأولية عند الاختناق؟",
  },
  {
    id: 2,
    sender: "ai",
    intro: "عند حدوث الاختناق، اتبع هذه الخطوات فورا:",
    steps: [
      "تأكد من أن الشخص قادر على التنفس أو السعال.",
      "إذا كان قادراً على السعال، شجعه على السعال بقوة.",
      "إذا لم يستطع التنفس، قم بمناورة هيمليك (الضغط على البطن من الخلف).",
      "اتصل بسيارة الإسعاف فوراً.",
    ],
    note: "ملاحظة: لا تحاول إخراج جسم عالق بأدوات حادة.",
    details:
      "عند تنفيذ مناورة هيمليك للبالغين، قف خلف الشخص وضع قبضة يدك فوق السرة وأسفل عظمة القص، ثم اضغط للداخل وللأعلى بحركات سريعة ومضبوطة.",
    showDetails: false,
    feedback: null,
  },
];

function AiAssistantPage({ onBackHome }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [showAllChats, setShowAllChats] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed && !attachedFileName) return;

    const finalQuestion = attachedFileName
      ? `${trimmed || "تحليل مرفق طبي"} [مرفق: ${attachedFileName}]`
      : trimmed;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: finalQuestion,
    };

    const aiMsg = {
      id: Date.now() + 1,
      sender: "ai",
      intro: `بخصوص سؤالك حول "${finalQuestion}"، إليك الإرشادات الأولية:`,
      steps: [
        "قيّم حالة الشخص ووعيه وتنفسه بهدوء وبشكل مباشر.",
        "أبعد أي عوامل مسببة للخطر ووفّر تهوية ومكاناً آمناً.",
        "تابع الأعراض بدقة ودوّن أي تغيّر مفاجئ.",
        "راجع طبيباً مختصاً أو اطلب الإسعاف فوراً في الحالات الحرجة.",
      ],
      note: "ملاحظة: هذه المعلومات إرشادية ولا تغني عن التقييم الطبي المباشر.",
      details:
        "إذا ظهرت علامات إنذار مثل ألم شديد في الصدر، ضيق تنفس حاد، إغماء، أو نزيف مستمر، فالتوجه للطوارئ أولوية قصوى.",
      showDetails: false,
      feedback: null,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText("");
    setAttachedFileName("");
  };

  const handleSelectChat = (chat) => {
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: chat.title,
    };
    const aiMsg = {
      id: Date.now() + 1,
      sender: "ai",
      intro: chat.reply,
      steps: [],
      note: "ملاحظة: راجع الطبيب لتأكيد الحالة والتشخيص المناسب.",
      details:
        "يمكنك طرح أسئلة إضافية حول الأعراض أو الوقاية أو متى يجب مراجعة مركز الطوارئ.",
      showDetails: false,
      feedback: null,
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setAttachedFileName("");
  };

  const handleToggleDetails = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, showDetails: !msg.showDetails } : msg
      )
    );
  };

  const handleFeedback = (id, value) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, feedback: msg.feedback === value ? null : value }
          : msg
      )
    );
  };

  const handleAttachChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
    }
  };

  const scrollToComposer = () => {
    const el = document.getElementById("ai-question-input");
    if (el) el.focus();
  };

  return (
    <div className="ai-page" dir="rtl">
      <div className="ai-breadcrumb">
        <button type="button" onClick={onBackHome} className="ai-crumb-link">
          الرئيسية
        </button>
        <span>‹</span>
        <span className="ai-crumb-current">المساعد الذكي الطبي</span>
      </div>

      <section className="ai-hero-banner">
        {AI_BANNER_IMAGE_URL && (
          <img
            src={AI_BANNER_IMAGE_URL}
            alt="المساعد الذكي الطبي"
            className="ai-hero-bg"
          />
        )}
        <div className="ai-hero-overlay" />

        <div className="ai-hero-content">
          <h1 className="ai-hero-title">المساعد الذكي الطبي</h1>
          <p className="ai-hero-subtitle">
            اسأل ... واحصل على إجابة دقيقة وفورية
          </p>
          <div className="ai-hero-features">
            <span>✓ معلومات طبية موثوقة</span>
            <span>✓ نصائح صحية</span>
            <span>✓ إرشادات إسعافية</span>
          </div>
          <button
            type="button"
            onClick={scrollToComposer}
            className="ai-start-btn"
          >
            <span>💬</span>
            <span>ابدأ المحادثة الآن</span>
            <span>›</span>
          </button>
        </div>
      </section>

      <div className="ai-workspace">
        <div className="ai-chat-panel">
          <div className="ai-messages-area">
            {messages.length === 0 ? (
              <div className="ai-empty-state">
                ابدأ محادثة جديدة بكتابة سؤالك الطبي في الأسفل.
              </div>
            ) : (
              messages.map((msg) =>
                msg.sender === "user" ? (
                  <div key={msg.id} className="ai-user-row">
                    <div className="ai-user-bubble">
                      <span>{msg.text}</span>
                      <span className="ai-user-badge" aria-hidden="true">
                        👤
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="ai-reply-row">
                    <div className="ai-bot-avatar" aria-hidden="true">
                      🤖
                    </div>

                    <div className="ai-reply-card">
                      {msg.intro && (
                        <p className="ai-reply-intro">{msg.intro}</p>
                      )}

                      <div className="ai-reply-main-grid">
                        {CHOKING_GUIDE_IMAGE_URL && (
                          <div className="ai-guide-media">
                            <img
                              src={CHOKING_GUIDE_IMAGE_URL}
                              alt="إرشادات الإسعافات الأولية"
                              className="ai-guide-img"
                            />
                          </div>
                        )}

                        {msg.steps && msg.steps.length > 0 && (
                          <ol className="ai-steps-list">
                            {msg.steps.map((step, index) => (
                              <li key={index} className="ai-step-item">
                                <span className="ai-step-num">{index + 1}</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>

                      {msg.note && <p className="ai-reply-note">⚠️ {msg.note}</p>}

                      {msg.showDetails && msg.details && (
                        <p className="ai-reply-details">{msg.details}</p>
                      )}

                      <div className="ai-feedback-bar">
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "helpful")}
                          className={`ai-feedback-btn ${
                            msg.feedback === "helpful" ? "is-selected" : ""
                          }`}
                        >
                          <span>مفيد</span>
                          <span>👍</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, "not-helpful")}
                          className={`ai-feedback-btn ${
                            msg.feedback === "not-helpful" ? "is-selected" : ""
                          }`}
                        >
                          <span>غير مفيد</span>
                          <span>👎</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleDetails(msg.id)}
                          className="ai-feedback-btn ai-details-btn"
                        >
                          <span>
                            {msg.showDetails
                              ? "إخفاء التفاصيل"
                              : "مزيد من التفاصيل"}
                          </span>
                          <span>⌄</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>

          {attachedFileName && (
            <div className="ai-attached-pill">
              <span>📎 {attachedFileName}</span>
              <button
                type="button"
                onClick={() => setAttachedFileName("")}
                className="ai-remove-attach"
                aria-label="إزالة المرفق"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className="ai-composer-form">
            <label className="ai-icon-action" title="إرفاق ملف أو صورة">
              📎
              <input
                type="file"
                onChange={handleAttachChange}
                className="ai-hidden-file"
              />
            </label>

            <button
              type="button"
              onClick={handleClearChat}
              className="ai-icon-action"
              title="مسح المحادثة"
              aria-label="مسح المحادثة"
            >
              🗑️
            </button>

            <input
              id="ai-question-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب سؤالك هنا ..."
              className="ai-input-field"
            />

            <button
              type="submit"
              className="ai-send-btn"
              aria-label="إرسال السؤال"
            >
              ➤
            </button>
          </form>
        </div>

        <aside className="ai-side-col">
          <div className="ai-recent-card">
            <div className="ai-recent-header">
              <h2 className="ai-recent-title">المحادثات الأخيرة</h2>
              <span>🕒</span>
            </div>

            <div className="ai-recent-list">
              {RECENT_CHATS.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => handleSelectChat(chat)}
                  className="ai-recent-item"
                >
                  <div className="ai-recent-text">
                    <strong className="ai-recent-item-title">
                      {chat.title}
                    </strong>
                    <span className="ai-recent-item-time">{chat.time}</span>
                  </div>
                  <span className="ai-recent-badge" aria-hidden="true">
                    {chat.icon}
                  </span>
                </button>
              ))}
            </div>

            {showAllChats && (
              <p className="ai-recent-extra">
                يتم حفظ المحادثات الطبية الحديثة تلقائياً للوصول السريع.
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowAllChats((prev) => !prev)}
              className="ai-all-chats-btn"
            >
              <span>عرض كل المحادثات</span>
              <span>←</span>
            </button>
          </div>

          <div className="ai-brand-footer-card">
            <div className="ai-brand-footer-top">
              <span>💚</span>
              <span>MedSpark مع ..</span>
            </div>
            <p className="ai-brand-footer-slogan">صحتك أمانة</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AiAssistantPage;