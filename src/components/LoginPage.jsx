import { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onSwitchToRegister, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOpenRegister = () => {
    setIsRegister(true);
    if (typeof onSwitchToRegister === 'function') {
      onSwitchToRegister();
    }
  };

  const handleOpenLogin = () => {
    setIsRegister(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess({ email, rememberMe });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess({ fullName, email: registerEmail });
    }
  };

  return (
    <div className="login-wrapper">
      <div className={`login-card ${isRegister ? 'is-register-layout' : ''}`}>
        <div className="login-left-panel panel-animate">
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="login-brand-badge">✚</div>
            </div>
            <h2 style={{ margin: '6px 0 4px', fontSize: '30px', fontWeight: '800' }}>
              <span className="login-title-ar">مِدسبارك | MedSpark</span>
            </h2>
            <p className="login-tagline">Learn • Share • Heal</p>
          </div>

          <p className="login-subtitle-ar">
            {isRegister
              ? 'ابدأ رحلتك معنا نحو مجتمع صحي أفضل'
              : 'معاً .. لمجتمع صحي أفضل'}
          </p>

          <svg viewBox="0 0 320 55" className="login-heartbeat-svg">
            <path
              d="M5 32 H85 L100 12 L115 46 L130 22 L142 32 H152 C158 20 172 20 176 30 C180 20 194 20 200 32 H212 L224 14 L238 44 L252 24 L264 32 H315"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="login-right-panel panel-animate">
          {!isRegister ? (
            <>
              <h2 className="login-heading">تسجيل الدخول</h2>
              <p className="login-welcome">
                مرحباً بك في <strong>مِدسبارك | MedSpark</strong>
              </p>

              <form onSubmit={handleLoginSubmit}>
                <div className="login-input-group">
                  <input
                    type="email"
                    required
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">✉</span>
                </div>

                <div className="login-input-group">
                  <input
                    type="password"
                    required
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">🔒</span>
                </div>

                <div className="login-options-row">
                  <label className="login-remember-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    تذكرني
                  </label>

                  <a
                    href="#forgot-password"
                    onClick={(e) => e.preventDefault()}
                    className="login-forgot-link"
                  >
                    نسيت كلمة المرور؟
                  </a>
                </div>

                <button type="submit" className="login-submit-btn">
                  دخول
                </button>
              </form>

              <div className="login-divider">
                <span className="login-divider-line" />
                <span>أو</span>
                <span className="login-divider-line" />
              </div>

              <div className="login-social-row">
                <button
                  type="button"
                  onClick={() => onLoginSuccess && onLoginSuccess()}
                  className="login-social-btn"
                >
                  <span className="login-google-icon">G</span>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => onLoginSuccess && onLoginSuccess()}
                  className="login-social-btn"
                >
                  <span>🐙</span>
                  GitHub
                </button>
              </div>

              <p className="login-footer-text">
                ليس لديك حساب؟{' '}
                <button
                  type="button"
                  onClick={handleOpenRegister}
                  className="login-register-btn"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="login-heading">إنشاء حساب جديد</h2>
              <p className="login-welcome">
                انضم إلى <strong>مِدسبارك | MedSpark</strong>
              </p>

              <form onSubmit={handleRegisterSubmit}>
                <div className="login-input-group">
                  <input
                    type="text"
                    required
                    placeholder="الاسم الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">👤</span>
                </div>

                <div className="login-input-group">
                  <input
                    type="email"
                    required
                    placeholder="البريد الإلكتروني"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">✉</span>
                </div>

                <div className="login-input-group">
                  <input
                    type="password"
                    required
                    placeholder="كلمة المرور"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">🔒</span>
                </div>

                <div className="login-input-group">
                  <input
                    type="password"
                    required
                    placeholder="تأكيد كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="login-input"
                  />
                  <span className="login-input-icon">✔</span>
                </div>

                <button type="submit" className="login-submit-btn">
                  إنشاء الحساب
                </button>
              </form>

              <p className="login-footer-text">
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={handleOpenLogin}
                  className="login-register-btn"
                >
                  تسجيل الدخول
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;