import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  green:      "#6DB02B",
  greenDark:  "#538A1F",
  greenLight: "#EBF5E0",
  greenMid:   "#C2E29A",
  orange:     "#E8380D",
  orangeLight:"#FDECEA",
  sidebar:    "#1A1F14",
  sidebarHov: "#252C1C",
  sidebarAct: "#2D3A1E",
  bg:         "#F4F6F3",
  card:       "#FFFFFF",
  border:     "#E3E8DC",
  text:       "#1C2117",
  textMid:    "#4A5540",
  textLight:  "#8A9585",
  yellow:     "#F59E0B",
  yellowLight:"#FEF3C7",
  blue:       "#2563EB",
  blueLight:  "#EFF6FF",
  red:        "#DC2626",
  redLight:   "#FEF2F2",
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const cfg = {
    active:      { bg: T.greenLight,   color: T.greenDark,  label: "Hoạt động" },
    inactive:    { bg: T.redLight,     color: T.red,        label: "Bị khóa" },
    processing:  { bg: T.yellowLight,  color: "#92400E",    label: "Đang xử lý" },
    error:       { bg: T.redLight,     color: T.red,        label: "Lỗi" },
    admin:       { bg: "#F0EDFF",      color: "#5B21B6",    label: "Admin" },
    sales:       { bg: T.blueLight,    color: T.blue,       label: "Sales" },
    trainer:     { bg: T.greenLight,   color: T.greenDark,  label: "Trainer" },
    cs:          { bg: "#FFF7ED",      color: "#9A3412",    label: "CS" },
    highest:     { bg: T.redLight,     color: T.red,        label: "HIGHEST" },
  };
  const c = cfg[status] || cfg.active;
  return (
    <span style={{
      background: c.bg, color: c.color,
      fontSize: 11, fontWeight: 700, padding: "2px 8px",
      borderRadius: 4, letterSpacing: "0.04em", textTransform: "uppercase",
      display: "inline-block", whiteSpace: "nowrap"
    }}>{c.label}</span>
  );
};

const Avatar = ({ name, size = 32, bg = T.green }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: bg, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.38, fontWeight: 700, flexShrink: 0
  }}>
    {name?.charAt(0)?.toUpperCase()}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: T.card, border: `1px solid ${T.border}`,
    borderRadius: 10, ...style
  }}>
    {children}
  </div>
);

const Btn = ({ children, variant = "primary", size = "md", onClick, style = {}, disabled }) => {
  const base = {
    border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600, borderRadius: 7, display: "inline-flex",
    alignItems: "center", gap: 6, transition: "opacity .15s",
    opacity: disabled ? 0.5 : 1,
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "5px 12px" : "8px 16px",
  };
  const variants = {
    primary:   { background: T.green,  color: "#fff" },
    danger:    { background: T.orange, color: "#fff" },
    secondary: { background: T.bg,     color: T.text, border: `1px solid ${T.border}` },
    ghost:     { background: "transparent", color: T.textMid },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = ({ placeholder, value, onChange, icon, style = {} }) => (
  <div style={{ position: "relative", ...style }}>
    {icon && <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: T.textLight }}>{icon}</span>}
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%", border: `1px solid ${T.border}`, borderRadius: 7,
        padding: icon ? "8px 12px 8px 32px" : "8px 12px",
        fontSize: 13, color: T.text, background: T.card,
        outline: "none", boxSizing: "border-box",
      }}
    />
  </div>
);

const StatCard = ({ label, value, color = T.text, sub }) => (
  <Card style={{ padding: "18px 22px", flex: 1 }}>
    <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
    <div style={{ fontSize: 12, color: T.textLight, marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>{sub}</div>}
  </Card>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const MENU = [
  { group: "VẬN HÀNH", items: [
    { id: "dashboard",       icon: "▦",  label: "Tổng quan" },
    { id: "conversations",   icon: "💬", label: "Hội thoại" },
    { id: "quotes",          icon: "📋", label: "Báo giá" },
    { id: "products_view",   icon: "📦", label: "Sản phẩm (ERP)" },
  ]},
  { group: "KNOWLEDGE BASE", items: [
    { id: "kb_upload",       icon: "📁", label: "KB Tài liệu" },
    { id: "kb_tags",         icon: "🏷️", label: "Danh mục & Tag" },
    { id: "ncc_review",      icon: "🔍", label: "Duyệt tài liệu NCC", badge: true },
    { id: "supplier_portal", icon: "🏭", label: "NCC Upload Portal" },
  ]},
  { group: "QUẢN LÝ", items: [
    { id: "users",           icon: "👤", label: "Người dùng" },
    { id: "channel_config",  icon: "📡", label: "Kênh (Widget & Zalo)" },
  ]},
  { group: "HỆ THỐNG", items: [
    { id: "prompt_config",   icon: "🤖", label: "Prompt & AI Monitor" },
    { id: "routing_rules",   icon: "⚙️", label: "Routing Rules" },
    { id: "audit_log",       icon: "📜", label: "Audit Log & PII" },
  ]},
];

const Sidebar = ({ active, setActive }) => (
  <div style={{
    width: 220, background: T.sidebar, color: "#fff",
    display: "flex", flexDirection: "column",
    height: "100vh", position: "sticky", top: 0, flexShrink: 0,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  }}>
    {/* Logo */}
    <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid rgba(255,255,255,.08)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: T.green, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16
        }}>🏗️</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.03em", color: "#fff" }}>REMAK ADMIN</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 1 }}>Sale Support Chatbot</div>
        </div>
      </div>
      <div style={{
        marginTop: 12, background: "rgba(109,176,43,.18)",
        borderRadius: 6, padding: "6px 10px",
        display: "flex", alignItems: "center", gap: 6
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.green }} />
        <span style={{ fontSize: 10, color: T.greenMid, fontWeight: 600 }}>Hệ thống hoạt động tốt</span>
      </div>
    </div>

    {/* Nav */}
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
      {MENU.map(g => (
        <div key={g.group} style={{ marginBottom: 4 }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.28)",
            padding: "10px 18px 4px", letterSpacing: "0.1em"
          }}>{g.group}</div>
          {g.items.map(item => {
            const isAct = active === item.id;
            return (
              <div key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 18px", cursor: "pointer",
                  background: isAct ? T.sidebarAct : "transparent",
                  borderLeft: isAct ? `3px solid ${T.green}` : "3px solid transparent",
                  color: isAct ? "#fff" : "rgba(255,255,255,.55)",
                  fontSize: 13, fontWeight: isAct ? 600 : 400,
                  transition: "all .15s",
                }}
              >
                <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
                {item.label}
                {isAct && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: T.green }} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>

    {/* Footer */}
    <div style={{ borderTop: `1px solid rgba(255,255,255,.08)`, padding: "12px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar name="A" size={28} bg={T.green} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Truong Nguyen</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", truncate: true }}>Super Admin</div>
        </div>
      </div>
      <div style={{
        marginTop: 10, fontSize: 12, color: T.orange,
        cursor: "pointer", display: "flex", alignItems: "center", gap: 6
      }}>
        <span>↪</span> Đăng xuất
      </div>
    </div>
  </div>
);

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const TopBar = ({ title, breadcrumb }) => (
  <div style={{
    height: 56, background: T.card, borderBottom: `1px solid ${T.border}`,
    display: "flex", alignItems: "center", padding: "0 28px",
    gap: 16, position: "sticky", top: 0, zIndex: 100,
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{title}</div>
      {breadcrumb && <div style={{ fontSize: 11, color: T.textLight }}>{breadcrumb}</div>}
    </div>
    <div style={{
      position: "relative",
      display: "flex", alignItems: "center", gap: 6,
      background: T.bg, borderRadius: 8, padding: "6px 12px",
      border: `1px solid ${T.border}`, minWidth: 240,
    }}>
      <span style={{ fontSize: 12, color: T.textLight }}>🔍</span>
      <input placeholder="Tìm kiếm người dùng, sản phẩm, tài liệu..." style={{
        border: "none", background: "transparent", fontSize: 12,
        color: T.text, outline: "none", width: "100%"
      }} />
    </div>
    <Btn variant="primary" size="sm">+ Làm mới</Btn>
    <div style={{ position: "relative", cursor: "pointer" }}>
      <span style={{ fontSize: 18 }}>🔔</span>
      <div style={{
        position: "absolute", top: -3, right: -3,
        width: 14, height: 14, background: T.orange,
        borderRadius: "50%", fontSize: 8, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
      }}>3</div>
    </div>
    <Avatar name="A" bg={T.green} />
  </div>
);

// ─── PAGE: LOGIN  (US-S0-001 v3) ────────────────────────────────────────────
// DEMO_ACCOUNTS preserved for demo purposes — DO NOT REMOVE
const DEMO_ACCOUNTS = [
  {
    role:"admin",   label:"Admin",   name:"Truong Nguyen",    email:"admin@remak.vn",
    password:"Admin@2026",  icon:"🛡️", color:"#5B21B6", bg:"#F0EDFF", border:"#C4B5FD",
    desc:"Toàn quyền hệ thống", redirect:"/dashboard",
  },
  {
    role:"sales",   label:"Sales",   name:"Nguyen Trường",    email:"sales@remak.vn",
    password:"Sales@2026",  icon:"💼", color:"#2563EB", bg:"#EFF6FF", border:"#BFDBFE",
    desc:"Hội thoại · Báo giá", redirect:"/conversations",
  },
  {
    role:"trainer", label:"Trainer", name:"Lê Minh Trainer",  email:"trainer@remak.vn",
    password:"Trainer@2026",icon:"📚", color:"#538A1F", bg:"#EBF5E0", border:"#C2E29A",
    desc:"KB Manager · Cấu hình AI", redirect:"/kb",
  },
  {
    role:"cs",      label:"CS",      name:"Phạm CS Agent",    email:"cs@remak.vn",
    password:"CS@2026",     icon:"🎧", color:"#9A3412", bg:"#FFF7ED", border:"#FED7AA",
    desc:"Handoff Queue · CS", redirect:"/cs-queue",
  },
  {
    role:"ncc",     label:"NCC",     name:"Công ty Phú Thịnh",email:"ncc@remak.vn",
    password:"NCC@2026",    icon:"🏭", color:"#0E7490", bg:"#ECFEFF", border:"#A5F3FC",
    desc:"Supplier Portal", redirect:"/supplier/documents",
  },
];

// PasswordStrength helper
const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const has8 = password.length >= 8;
  const hasAlpha = /[a-zA-Z]/.test(password);
  const hasNum   = /[0-9]/.test(password);
  const score    = [has8, hasAlpha, hasNum].filter(Boolean).length;
  const levels   = ["Yếu","Trung bình","Mạnh"];
  const colors   = [T.red, T.yellow, T.green];
  return (
    <div style={{ marginTop:4, display:"flex", alignItems:"center", gap:6 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i<=score ? colors[score-1] : T.border }} />
      ))}
      <span style={{ fontSize:10, color: colors[score-1], fontWeight:700, minWidth:60 }}>{levels[score-1]}</span>
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [screen, setScreen]   = useState("login"); // login | forgot | reset
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState("");
  const [locked, setLocked]   = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts]   = useState(0);
  const [activeDemo, setActiveDemo] = useState(null);
  const [logging, setLogging] = useState(false);
  // Forgot password screen
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent]   = useState(false);
  // Reset password screen
  const [newPass, setNewPass]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMatch, setPassMatch]   = useState(null);

  // Countdown timer
  React.useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c-1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);
  React.useEffect(() => {
    if (countdown === 0 && locked) { setLocked(false); setAttempts(0); setError(""); }
  }, [countdown, locked]);

  const handleLogin = () => {
    if (locked || logging) return;
    if (!email || !pass) { setError("Vui lòng nhập email và mật khẩu."); return; }
    const match = DEMO_ACCOUNTS.find(a => a.email === email && a.password === pass);
    if (match) {
      setLogging(true);
      setTimeout(() => onLogin(match), 700);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLocked(true); setCountdown(15*60);
        setError("");
      } else {
        setError("Email hoặc mật khẩu không đúng.");
        setActiveDemo(null);
      }
      setLogging(false);
    }
  };

  const fillDemo = (acc) => {
    setActiveDemo(acc.role); setEmail(acc.email); setPass(acc.password); setError("");
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !locked) handleLogin(); };

  // ── FORGOT PASSWORD SCREEN ──────────────────────────────────────────────
  if (screen === "forgot") return (
    <div style={{ minHeight:"100vh", background:T.sidebar, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      <div style={{ position:"relative", width:"100%", maxWidth:400, padding:24 }}>
        <Card style={{ padding:32 }}>
          <button onClick={()=>setScreen("login")} style={{ border:"none",background:"transparent",cursor:"pointer",fontSize:12,color:T.blue,marginBottom:16,padding:0,display:"flex",alignItems:"center",gap:4 }}>← Quay lại đăng nhập</button>
          <div style={{ fontWeight:800, fontSize:20, color:T.text, marginBottom:4 }}>Quên mật khẩu?</div>
          <div style={{ fontSize:12, color:T.textLight, marginBottom:20 }}>Nhập email để nhận link đặt lại mật khẩu.</div>
          {!forgotSent ? (
            <>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:5 }}>Email</label>
                <Input placeholder="ten@congty.vn" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} icon="✉" />
              </div>
              <Btn variant="primary" style={{ width:"100%", justifyContent:"center" }} onClick={()=>setForgotSent(true)}>Gửi link đặt lại mật khẩu</Btn>
            </>
          ) : (
            <div style={{ background:T.greenLight, border:`1px solid ${T.greenMid}`, borderRadius:8, padding:14, fontSize:13, color:T.greenDark }}>
              ✅ Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu trong vài phút.
            </div>
          )}
          <div style={{ marginTop:16, fontSize:11, color:T.textLight, textAlign:"center" }}>Remak Sale Support v1.0 · © 2026</div>
        </Card>
      </div>
    </div>
  );

  // ── RESET PASSWORD SCREEN ────────────────────────────────────────────────
  if (screen === "reset") return (
    <div style={{ minHeight:"100vh", background:T.sidebar, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      <div style={{ position:"relative", width:"100%", maxWidth:400, padding:24 }}>
        <Card style={{ padding:32 }}>
          <div style={{ fontWeight:800, fontSize:20, color:T.text, marginBottom:4 }}>Đặt lại mật khẩu</div>
          <div style={{ fontSize:12, color:T.textLight, marginBottom:20 }}>Nhập mật khẩu mới cho tài khoản của bạn.</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:5 }}>Mật khẩu mới</label>
              <Input placeholder="Tối thiểu 8 ký tự, có chữ + số" value={newPass} onChange={e=>setNewPass(e.target.value)} icon="🔒" />
              <PasswordStrength password={newPass} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:5 }}>Xác nhận mật khẩu</label>
              <Input placeholder="Nhập lại mật khẩu mới" value={confirmPass}
                onChange={e=>{ setConfirmPass(e.target.value); setPassMatch(e.target.value===newPass); }} icon="🔒" />
              {passMatch === false && <div style={{ fontSize:11,color:T.red,marginTop:3 }}>⚠ Mật khẩu không khớp</div>}
              {passMatch === true  && <div style={{ fontSize:11,color:T.green,marginTop:3 }}>✅ Mật khẩu khớp</div>}
            </div>
            <Btn variant="primary" style={{ width:"100%",justifyContent:"center" }} disabled={!passMatch || newPass.length < 8} onClick={()=>setScreen("login")}>
              Đặt lại mật khẩu
            </Btn>
          </div>
          <div style={{ marginTop:16, fontSize:11, color:T.textLight, textAlign:"center" }}>Remak Sale Support v1.0 · © 2026</div>
        </Card>
      </div>
    </div>
  );

  // ── MAIN LOGIN SCREEN ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:T.sidebar, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      {/* BG pattern */}
      <div style={{ position:"fixed",inset:0,opacity:.04,backgroundImage:`repeating-linear-gradient(45deg,${T.green} 0,${T.green} 1px,transparent 0,transparent 50%)`,backgroundSize:"24px 24px" }} />

      <div style={{ position:"relative", width:"100%", maxWidth:420, padding:24 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:12,background:"rgba(109,176,43,.12)",border:"1px solid rgba(109,176,43,.25)",borderRadius:14,padding:"12px 20px" }}>
            <div style={{ width:40,height:40,borderRadius:10,background:T.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>🏗️</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"0.03em" }}>REMAK</div>
              <div style={{ fontSize:11,color:T.greenMid }}>Hệ thống hỗ trợ bán hàng thông minh</div>
            </div>
          </div>
        </div>

        <Card style={{ padding:28 }}>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:20,fontWeight:800,color:T.text }}>Đăng nhập</div>
            <div style={{ fontSize:12,color:T.textLight,marginTop:3 }}>Nhập thông tin tài khoản của bạn</div>
          </div>

          {/* Rate-limit banner */}
          {locked && (
            <div style={{ background:T.yellowLight,border:"1px solid #FDE68A",borderRadius:7,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#92400E" }}>
              ⏳ Quá nhiều lần thử. Vui lòng thử lại sau{" "}
              <b>{Math.floor(countdown/60)}:{String(countdown%60).padStart(2,"0")}</b>.
            </div>
          )}

          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Email</label>
              <Input placeholder="ten@congty.vn" value={email}
                onChange={e=>{ setEmail(e.target.value); setError(""); setActiveDemo(null); }}
                onKeyDown={handleKeyDown} icon="✉" />
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Mật khẩu</label>
              <div style={{ position:"relative" }}>
                <Input placeholder="••••••••" value={pass}
                  onChange={e=>{ setPass(e.target.value); setError(""); setActiveDemo(null); }}
                  onKeyDown={handleKeyDown}
                  icon="🔒"
                  style={{ paddingRight:36 }}
                />
                <span onClick={()=>setShowPass(s=>!s)} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",cursor:"pointer",fontSize:14,color:T.textLight,userSelect:"none" }}>
                  {showPass?"🙈":"👁"}
                </span>
              </div>
            </div>

            {error && (
              <div style={{ background:T.redLight,color:T.red,fontSize:12,padding:"8px 12px",borderRadius:6,border:"1px solid #FECACA" }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={locked||logging}
              style={{ width:"100%",border:"none",cursor:locked||logging?"not-allowed":"pointer",background:locked||logging?T.greenDark:T.green,color:"#fff",fontWeight:700,borderRadius:7,padding:"11px 16px",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:4,transition:"background .2s" }}
            >
              {logging ? <><span style={{ width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }} />Đang xác thực...</> : "🔑 Đăng nhập"}
            </button>
          </div>

          <div style={{ textAlign:"center",marginTop:14 }}>
            <span onClick={()=>setScreen("forgot")} style={{ fontSize:12,color:T.blue,cursor:"pointer",textDecoration:"underline" }}>Quên mật khẩu?</span>
          </div>

          <div style={{ marginTop:18,borderTop:`1px solid ${T.border}`,paddingTop:14,fontSize:11,color:T.textLight,textAlign:"center" }}>
            JWT Auth · RS256 · Bảo mật bởi HashiCorp Vault
          </div>
        </Card>

        {/* Demo accounts */}
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
            <div style={{ flex:1,height:1,background:"rgba(255,255,255,.12)" }} />
            <span style={{ fontSize:10,color:"rgba(255,255,255,.35)",letterSpacing:"0.08em",fontWeight:600,whiteSpace:"nowrap" }}>TÀI KHOẢN DEMO — NHẤP ĐỂ ĐĂNG NHẬP NHANH</span>
            <div style={{ flex:1,height:1,background:"rgba(255,255,255,.12)" }} />
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7 }}>
            {DEMO_ACCOUNTS.map(acc => {
              const isActive = activeDemo===acc.role;
              return (
                <div key={acc.role} onClick={()=>fillDemo(acc)} style={{
                  cursor:"pointer",
                  background: isActive?acc.bg:"rgba(255,255,255,.06)",
                  border:`1.5px solid ${isActive?acc.border:"rgba(255,255,255,.12)"}`,
                  borderRadius:10, padding:"10px 12px", transition:"all .18s",
                  transform: isActive?"scale(1.02)":"scale(1)",
                  boxShadow: isActive?`0 0 0 3px ${acc.color}30`:"none",
                }}>
                  <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:4 }}>
                    <span style={{ fontSize:16 }}>{acc.icon}</span>
                    <span style={{ fontSize:11,fontWeight:800,color:isActive?acc.color:"rgba(255,255,255,.75)",letterSpacing:"0.05em" }}>{acc.label}</span>
                    {isActive && <span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,background:acc.color,color:"#fff",padding:"1px 6px",borderRadius:4 }}>✓</span>}
                  </div>
                  <div style={{ fontSize:9,color:isActive?acc.color:"rgba(255,255,255,.4)",fontFamily:"monospace",marginBottom:1 }}>{acc.email}</div>
                  <div style={{ fontSize:9,color:isActive?acc.color+"aa":"rgba(255,255,255,.28)",fontFamily:"monospace",marginBottom:4 }}>{acc.password}</div>
                  <div style={{ fontSize:9,color:isActive?acc.color:"rgba(255,255,255,.3)" }}>{acc.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign:"center",marginTop:14,fontSize:11,color:"rgba(255,255,255,.25)" }}>Remak Sale Support v1.0 · © 2026</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
};


// ─── PAGE: DASHBOARD ─────────────────────────────────────────────────────────
const Dashboard = () => (
  <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
    <div style={{ display: "flex", gap: 14 }}>
      <StatCard label="Tổng người dùng"    value="7"  color={T.green}  sub="↑ 2 tuần này" />
      <StatCard label="Hội thoại hôm nay"  value="24" color={T.blue}   sub="12 đang active" />
      <StatCard label="Tài liệu KB"         value="18" color={T.text}   sub="3 đang xử lý" />
      <StatCard label="Sản phẩm (ERP)"      value="142"color={T.orange} sub="SKU hoạt động" />
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      <Card style={{ flex: 2, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>Sprint 0 — Foundation Progress</div>
        {[
          { label: "US-S0-001  Login & Auth v3",           pct: 100 },
          { label: "US-S0-002  User Management v3",        pct: 100 },
          { label: "US-S0-003  RBAC Engine v5",            pct: 100 },
          { label: "US-S0-004  KB Upload v2",              pct: 100 },
          { label: "US-S0-005  Tag/Category v2",           pct: 100 },
          { label: "US-S0-007  NCC Review Gate",           pct: 100 },
          { label: "US-S0-008  Product Page ERP Sync",     pct: 100 },
          { label: "US-S0-009  NCC Supplier Portal",       pct: 100 },
          { label: "US-S0-006  Product Import (DEPRECATED)", pct: 0, deprecated: true },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: item.deprecated ? T.textLight : T.textMid, textDecoration: item.deprecated ? "line-through" : "none" }}>{item.label}</span>
              <span style={{ fontWeight: 700, color: item.deprecated ? T.textLight : item.pct === 100 ? T.green : T.textMid }}>
                {item.deprecated ? "DEPRECATED" : `${item.pct}%`}
              </span>
            </div>
            {!item.deprecated && (
              <div style={{ height: 6, background: T.bg, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${item.pct}%`, height: "100%", background: item.pct === 100 ? T.green : T.yellow, borderRadius: 3 }} />
              </div>
            )}
          </div>
        ))}
      </Card>

      <Card style={{ flex: 1, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>Hoạt động gần đây</div>
        {[
          { icon: "👤", msg: "Admin tạo user trainer@remak.vn",     time: "5 phút trước" },
          { icon: "📁", msg: "Upload Catalogue Stonewool.pdf",       time: "12 phút trước" },
          { icon: "🔍", msg: "Trainer duyệt tài liệu NCC",           time: "1 giờ trước" },
          { icon: "📦", msg: "ERP sync: 142 sản phẩm cập nhật",      time: "2 giờ trước" },
          { icon: "🔑", msg: "sales1@remak.vn đăng nhập",            time: "3 giờ trước" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
            <span style={{ fontSize: 16 }}>{a.icon}</span>
            <div>
              <div style={{ fontSize: 12, color: T.text }}>{a.msg}</div>
              <div style={{ fontSize: 10, color: T.textLight }}>{a.time}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

// ─── PAGE: USER MANAGEMENT  (US-S0-002 v3 + RBAC Engine US-S0-003 v5) ───────
// ──────────────────────────────────────────────────────────────────────────────

// Role meta stays the same (used by many components)
const ROLE_META = {
  admin:   { color:"#5B21B6", bg:"#F0EDFF", border:"#C4B5FD", icon:"🛡️", label:"Admin",   desc:"Toàn quyền hệ thống" },
  sales:   { color:"#2563EB", bg:"#EFF6FF", border:"#BFDBFE", icon:"💼", label:"Sales",   desc:"Hội thoại · Báo giá" },
  trainer: { color:"#538A1F", bg:"#EBF5E0", border:"#C2E29A", icon:"📚", label:"Trainer", desc:"KB Manager · Cấu hình AI" },
  cs:      { color:"#9A3412", bg:"#FFF7ED", border:"#FED7AA", icon:"🎧", label:"CS",      desc:"Handoff Queue · CS" },
  ncc:     { color:"#0E7490", bg:"#ECFEFF", border:"#A5F3FC", icon:"🏭", label:"NCC",     desc:"Supplier Portal" },
};

// Role Profiles (US-S0-002 v3)
const ROLE_PROFILES_INIT = [
  { id:"sales_std",    name:"Sales Standard",          roles:["sales"],          phase:1, isActive:true,  users:12, desc:"Nhân viên kinh doanh — hội thoại + báo giá" },
  { id:"trainer_std",  name:"Trainer Standard",         roles:["trainer"],        phase:1, isActive:true,  users:4,  desc:"Quản lý tri thức KB và chất lượng AI" },
  { id:"cs_std",       name:"CS Standard",              roles:["cs"],             phase:1, isActive:true,  users:3,  desc:"Xử lý handoff queue và hỗ trợ khách" },
  { id:"ncc_std",      name:"NCC Standard",             roles:["ncc"],            phase:1, isActive:true,  users:8,  desc:"Nhà cung cấp — upload tài liệu, quản lý đơn" },
  { id:"admin_std",    name:"Admin",                    roles:["admin"],          phase:1, isActive:true,  users:2,  desc:"Quản trị hệ thống toàn diện" },
  { id:"ops_std",      name:"Operations Standard",      roles:["operations"],     phase:2, isActive:false, users:0,  desc:"Xử lý toàn bộ pipeline giao hàng" },
  { id:"fin_std",      name:"Finance Standard",         roles:["finance"],        phase:2, isActive:false, users:0,  desc:"Quản lý công nợ, hóa đơn VAT, đối chiếu" },
  { id:"pm_std",       name:"Product Manager Standard", roles:["prod_manager"],   phase:2, isActive:false, users:0,  desc:"Cấu trúc danh mục, pricing rule" },
  { id:"mkt_std",      name:"Marketing Standard",       roles:["marketing"],      phase:2, isActive:false, users:0,  desc:"Nội dung SEO, banner, landing page" },
  { id:"dir_std",      name:"Director Standard",        roles:["director"],       phase:2, isActive:false, users:0,  desc:"Dashboard tổng hợp — tuyệt đối read-only" },
];

const PERM_MATRIX = [
  // ─ Hệ thống & Quản lý Users ─────────────────────────────────────────────
  { module:"Sys",   fn:"User",                      ref:"FN1.2",        note:"CRUD tài khoản, gán Role Profile",                 admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Sys",   fn:"Role",                      ref:"FN1.2",        note:"Xem danh sách roles. Chỉ Admin tạo/sửa",           admin:"●●●●●●", sales:"●○○○○○", trainer:"●○○○○○", cs:"●○○○○○", ncc:"——————", phase:"P1" },
  { module:"Sys",   fn:"Role Profile",              ref:"FN1.2",        note:"Gán Role Profile cho User. Chỉ Admin",             admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Sys",   fn:"User Permission",           ref:"FN1.2",        note:"Row-level filter. Chỉ Admin quản lý",              admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Sys",   fn:"Profile cá nhân",           ref:"FN1.3",        note:"Sửa thông tin bản thân",                           admin:"●●●●●●", sales:"◑◑○○○○", trainer:"◑◑○○○○", cs:"◑◑○○○○", ncc:"◑◑○○○○", phase:"P1" },
  // ─ Dashboard & Báo cáo ──────────────────────────────────────────────────
  { module:"Dash",  fn:"Dashboard tổng quan",       ref:"FN1.3",        note:"KPI cards theo role. Sales thấy của mình",         admin:"●●●●●●", sales:"◑○○○○○", trainer:"●○○○○○", cs:"——————", ncc:"◑○○○○○", phase:"P1" },
  { module:"Dash",  fn:"Báo cáo AI Quality",        ref:"FN1.3",        note:"Chất lượng agent, confidence scores",              admin:"●●●●●●", sales:"——————", trainer:"●○○○○○", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Dash",  fn:"Báo cáo Doanh số",          ref:"FN1.3",        note:"Revenue report. Sales thấy của mình",              admin:"●●●●●●", sales:"◑○○○○○", trainer:"——————", cs:"——————", ncc:"◑○○○○○", phase:"P1" },
  { module:"Dash",  fn:"Báo cáo Công nợ",           ref:"Finance",      note:"A/R aging, credit limit tracking",                 admin:"●○○○○○", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P2", p2role:"Finance" },
  { module:"Dash",  fn:"Executive Dashboard",       ref:"Dir",          note:"Tổng hợp cấp lãnh đạo. Tuyệt đối read-only",      admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P2", p2role:"Director" },
  // ─ Knowledge Base ────────────────────────────────────────────────────────
  { module:"KB",    fn:"KB Document (Admin/Trainer)",ref:"FN2.1.1",     note:"Upload trực tiếp. Không qua approval",             admin:"●●●●●●", sales:"——————", trainer:"●●●●●●", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"KB",    fn:"KB Document (NCC Upload)",  ref:"FN2.1.1-NCC",  note:"Upload qua Supplier Portal. Pending review",       admin:"●●●●●●", sales:"——————", trainer:"●●●○○○", cs:"——————", ncc:"◑◑◑○○○", phase:"P1" },
  { module:"KB",    fn:"Document Review",           ref:"FN2.1.1-REV",  note:"Trainer approve/reject tài liệu NCC",              admin:"●●●●●●", sales:"——————", trainer:"●●●●●●", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"KB",    fn:"Tag & Category",            ref:"FN2.1.2",      note:"Từ điển tag/category. CRUD + inline assign",       admin:"●●●●●●", sales:"——————", trainer:"●●●●●●", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"KB",    fn:"ETL Pipeline Status",       ref:"FN2.1.3",      note:"Xem trạng thái job xử lý tài liệu",               admin:"●●●●●●", sales:"——————", trainer:"●○○○○○", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"KB",    fn:"Prompt Store",              ref:"FN2.1.4",      note:"Quản lý hệ thống prompt, version, playground",    admin:"●●●●●●", sales:"——————", trainer:"●●●●●●", cs:"——————", ncc:"——————", phase:"P1" },
  // ─ Sản phẩm ─────────────────────────────────────────────────────────────
  { module:"Prod",  fn:"Product (read-only page)",  ref:"FN2.3.1",      note:"Đọc từ ERP Gold. Không ai được sửa trực tiếp",    admin:"●○○○○○", sales:"●○○○○○", trainer:"●○○○○○", cs:"●○○○○○", ncc:"●○○○○○", phase:"P1" },
  { module:"Prod",  fn:"NCC Product (Own)",         ref:"FN9.1",        note:"NCC CRUD sản phẩm của mình. Pending review",       admin:"●●●●●●", sales:"——————", trainer:"●●○○○○", cs:"——————", ncc:"◑◑◑○○○", phase:"P1" },
  { module:"Prod",  fn:"Supplier Score",            ref:"FN2.3.1",      note:"NCC reliability score (ERP). Read-only",           admin:"●○○○○○", sales:"●○○○○○", trainer:"●○○○○○", cs:"——————", ncc:"◑○○○○○", phase:"P1" },
  // ─ Hội thoại ─────────────────────────────────────────────────────────────
  { module:"Chat",  fn:"Conversation (Public)",     ref:"FN4.1",        note:"Khách mới chưa gán. Sale thấy để claim",           admin:"●●●●●●", sales:"●○○○○○", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Chat",  fn:"Conversation (Claim)",      ref:"FN4.2",        note:"First-claim atomic. Sale claim về mình",           admin:"●●●●●●", sales:"●●○○●○", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Chat",  fn:"Conversation (Assigned)",   ref:"FN4.1",        note:"Hội thoại đã gán cho mình",                        admin:"●●●●●●", sales:"◑◑○○○○", trainer:"●○○○○○", cs:"●○○○○○", ncc:"——————", phase:"P1" },
  { module:"Chat",  fn:"CS Queue",                  ref:"FN3.3.2",      note:"Hàng chờ handoff. CS xử lý và resolve",           admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"●●●●●●", ncc:"——————", phase:"P1" },
  { module:"Chat",  fn:"Protected Conversation",    ref:"FN4.P",        note:"Khách cũ / VIP. Chỉ Sale owner thấy",             admin:"●●●●●●", sales:"◑◑○○○○", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  // ─ Báo giá ───────────────────────────────────────────────────────────────
  { module:"Quote", fn:"Draft Quote",               ref:"FN5.1.1",      note:"AI tạo tự động từ hội thoại",                      admin:"●●●●●●", sales:"◑◑◑○○○", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Quote", fn:"Quote Approval",            ref:"FN5.2.1",      note:"Submit → Approved. Workflow 2 level",              admin:"●●●●●●", sales:"◑○○○◑○", trainer:"——————", cs:"◑○○○○○", ncc:"——————", phase:"P1" },
  { module:"Quote", fn:"Quote (CS View)",           ref:"FN5.1",        note:"CS xem báo giá khi xử lý ticket",                 admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"◑○○○○○", ncc:"——————", phase:"P1" },
  // ─ Đơn hàng ──────────────────────────────────────────────────────────────
  { module:"Order", fn:"Order (Sale View)",         ref:"FN10",         note:"Sale xem đơn liên quan đến báo giá của mình",     admin:"●●●●●●", sales:"◑○○○○○", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Order", fn:"Order (NCC View)",          ref:"FN10.2",       note:"NCC xem/confirm/reject đơn của mình",              admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"●●○●●○", ncc:"◑◑◑○○○", phase:"P1" },
  // ─ AI & Config ───────────────────────────────────────────────────────────
  { module:"AI",    fn:"Routing Rules",             ref:"FN6.1",        note:"Round-robin, timeout threshold config",            admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"AI",    fn:"AI Guardrails",             ref:"FN1.4",        note:"Safety rules, blocked topics, confidence",        admin:"●●●●●●", sales:"——————", trainer:"●●●●●●", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"AI",    fn:"Agent Monitor",             ref:"AI Monitor",   note:"Latency, token usage, error rate",                admin:"●●●●●●", sales:"——————", trainer:"●○○○○○", cs:"——————", ncc:"——————", phase:"P1" },
  // ─ Bảo mật ───────────────────────────────────────────────────────────────
  { module:"Sec",   fn:"Audit Log",                 ref:"FN8.1",        note:"Log toàn bộ action quan trọng. Chỉ đọc",          admin:"●○○○○○", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
  { module:"Sec",   fn:"PII Masking Config",        ref:"FN8.2",        note:"Cấu hình ẩn thông tin cá nhân",                   admin:"●●●●●●", sales:"——————", trainer:"——————", cs:"——————", ncc:"——————", phase:"P1" },
];

// PermBadge — shared component
const PermBadge = ({ level }) => {
  const cfg = { "Full":{ bg:"#DCFCE7",color:"#166534",border:"#86EFAC" }, "Own":{ bg:"#EFF6FF",color:"#1D4ED8",border:"#93C5FD" }, "Read":{ bg:"#FEF9C3",color:"#854D0E",border:"#FDE047" }, "—":{ bg:"#F4F6F3",color:"#8A9585",border:"#E3E8DC" } };
  const s = cfg[level]||cfg["—"];
  return <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:44,padding:"3px 8px",borderRadius:5,fontSize:11,fontWeight:700,background:s.bg,color:s.color,border:`1px solid ${s.border}` }}>{level}</span>;
};

// RoleCheckboxes — shared component
const RoleCheckboxes = ({ selected, onChange }) => (
  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
    {Object.entries(ROLE_META).map(([role,meta]) => {
      const checked = selected.includes(role);
      return (
        <label key={role} style={{ display:"flex",alignItems:"center",gap:6,cursor:"pointer",padding:"6px 12px",borderRadius:7,background:checked?meta.bg:T.bg,border:`1.5px solid ${checked?meta.border:T.border}`,transition:"all .15s" }}>
          <input type="checkbox" checked={checked} onChange={()=>onChange(checked?selected.filter(r=>r!==role):[...selected,role])} style={{ accentColor:meta.color,width:13,height:13 }} />
          <span style={{ fontSize:13 }}>{meta.icon}</span>
          <span style={{ fontSize:12,fontWeight:700,color:checked?meta.color:T.textMid }}>{meta.label}</span>
        </label>
      );
    })}
  </div>
);

// ─── Effective Permissions grid (reused in side panel + my-permissions) ──────
const EffectivePermGrid = ({ roles }) => {
  if (!roles || roles.length === 0) return <div style={{ fontSize:12,color:T.textLight }}>Chưa có role nào</div>;
  const roleSet = new Set(roles);
  // If admin, just show full
  if (roleSet.has("admin")) return (
    <div style={{ background:T.greenLight,borderRadius:7,padding:"10px 14px",fontSize:12,color:T.greenDark,fontWeight:600 }}>
      🛡️ Admin — Toàn quyền tất cả DocType (superset)
    </div>
  );
  const parsePerms = (str) => (str||"——————").split("");
  const roles5 = ["admin","sales","trainer","cs","ncc"];
  const userRoles5 = roles5.filter(r => roleSet.has(r));
  // Filter matrix rows relevant to user's roles
  const relevantRows = PERM_MATRIX.filter(row =>
    row.phase === "P1" && userRoles5.some(r => {
      const chars = parsePerms(row[r]);
      return chars.some(c => c === "●" || c === "◑");
    })
  );
  if (relevantRows.length === 0) return <div style={{ fontSize:12,color:T.textLight }}>Không có quyền đặc biệt nào.</div>;
  const grouped = relevantRows.reduce((acc,row) => { if(!acc[row.module])acc[row.module]=[]; acc[row.module].push(row); return acc; },{});
  const cellColor = (ch) => ({ "●":"#166534","◑":"#1D4ED8","○":"#9CA3AF","—":"#D1D5DB" }[ch]||"#D1D5DB");
  const cellBg    = (ch) => ({ "●":"#DCFCE7","◑":"#DBEAFE","○":"#F9FAFB","—":"#F9FAFB" }[ch]||"#F9FAFB");
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
      {Object.entries(grouped).map(([mod,rows]) => (
        <div key={mod}>
          <div style={{ fontSize:10,fontWeight:800,color:T.textLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4 }}>{mod}</div>
          {rows.map(row => (
            <div key={row.fn} style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderRadius:6,background:T.bg,marginBottom:3,fontSize:11 }}>
              <span style={{ flex:1,color:T.text,fontWeight:500 }}>{row.fn}</span>
              {userRoles5.map(r => {
                const chars = parsePerms(row[r]);
                const active = chars[0]==="●"||chars[0]==="◑";
                if (!active) return null;
                return (
                  <span key={r} title={`Từ role: ${r}`} style={{ fontSize:9,background:cellBg(chars[0]),color:cellColor(chars[0]),padding:"1px 6px",borderRadius:4,fontWeight:700,border:`1px solid ${cellColor(chars[0])}40` }}>
                    {chars[0]==="●"?"Full":chars[0]==="◑"?"Own":""} ({ROLE_META[r]?.label})
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─── USERS DATA ───────────────────────────────────────────────────────────────
const USERS_INIT = [
  { id:1, name:"Truong Nguyen",    email:"admin@remak.vn",    roles:["admin"],           profile:"admin_std",   status:"active",   dept:"IT",         lastLogin:"2 giờ trước",   phone:"0901234567", note:"Super Admin" },
  { id:2, name:"Nguyen Trường",    email:"nctruong@remak.vn", roles:["sales"],           profile:"sales_std",   status:"active",   dept:"Sales",      lastLogin:"1 ngày trước",  phone:"0912345678", note:"" },
  { id:3, name:"Lê Minh Trainer",  email:"trainer@remak.vn",  roles:["trainer"],         profile:"trainer_std", status:"active",   dept:"Knowledge",  lastLogin:"3 giờ trước",   phone:"0923456789", note:"" },
  { id:4, name:"Phạm CS Agent",    email:"cs@remak.vn",       roles:["cs"],              profile:"cs_std",      status:"active",   dept:"Customer",   lastLogin:"30 phút trước", phone:"0934567890", note:"" },
  { id:5, name:"Lê Văn Multi",     email:"multi@remak.vn",    roles:["sales","trainer"], profile:"custom",      status:"active",   dept:"Sales",      lastLogin:"2 ngày trước",  phone:"0945678901", note:"Dual role" },
  { id:6, name:"Test User",        email:"test@remak.vn",     roles:["sales"],           profile:"sales_std",   status:"inactive", dept:"",           lastLogin:"Chưa đăng nhập",phone:"",           note:"" },
  { id:7, name:"NCC Phú Thịnh",    email:"ncc@remak.vn",      roles:["ncc"],             profile:"ncc_std",     status:"active",   dept:"NCC",        lastLogin:"1 tuần trước",  phone:"0956789012", note:"" },
];

const UserManagement = () => {
  // ── Sub-screen routing ── ALL HOOKS MUST COME BEFORE ANY CONDITIONAL RETURN ──
  const [subScreen, setSubScreen] = useState(null);
  // subScreen: null | {type:"editUserRoles",user} | {type:"editRolePerms",roleId} | {type:"createRole"}

  // ── 4 MAIN TABS ─────────────────────────────────────────────────────────
  const [mainTab, setMainTab] = useState("users"); // users | role_profiles | permissions | my_perms

  // ── USER LIST state ──────────────────────────────────────────────────────
  const [users, setUsers]               = useState(USERS_INIT);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive
  const [filterProfile, setFilterProfile] = useState("all");
  const [sortField, setSortField]       = useState("name");
  const [sortDir, setSortDir]           = useState("asc");
  const [showModal, setShowModal]       = useState(false);
  const [editUser, setEditUser]         = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [detailUser, setDetailUser]     = useState(null); // side panel
  const [toast, setToast]               = useState(null);
  const [newUser, setNewUser]           = useState({ name:"",email:"",phone:"",roles:["sales"],profile:"sales_std",dept:"",status:"active",note:"" });
  const [createdPassword, setCreatedPassword] = useState(null);
  const [copyEmailDone, setCopyEmailDone]     = useState(null);

  // ── ROLE PROFILE state ───────────────────────────────────────────────────
  const [profiles, setProfiles]         = useState(ROLE_PROFILES_INIT);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile]   = useState(null);
  const [activateConfirm, setActivateConfirm]   = useState(null);
  const [profileImpactUsers, setProfileImpactUsers] = useState([]);

  // ── PERMISSIONS state ────────────────────────────────────────────────────
  const [matrixModule, setMatrixModule] = useState("all");
  const [matrixHighlight, setMatrixHighlight] = useState(null);
  const [diffOnly, setDiffOnly]         = useState(false);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ── USER LIST logic ──────────────────────────────────────────────────────
  const toggleSort = (f) => { if(sortField===f) setSortDir(d=>d==="asc"?"desc":"asc"); else{setSortField(f);setSortDir("asc");} };
  const SortTh = ({field,label,w}) => (
    <th onClick={()=>toggleSort(field)} style={{ padding:"10px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.06em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap",width:w,userSelect:"none",background:sortField===field?"#EEF4E8":"transparent" }}>
      {label} {sortField===field?(sortDir==="asc"?"↑":"↓"):<span style={{color:T.border}}>↕</span>}
    </th>
  );

  const processedUsers = users
    .filter(u => {
      const q = search.toLowerCase();
      const matchQ  = u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q);
      const matchSt = filterStatus==="all"||u.status===filterStatus;
      const matchPr = filterProfile==="all"||u.profile===filterProfile;
      return matchQ && matchSt && matchPr;
    })
    .sort((a,b) => {
      let va = a[sortField], vb = b[sortField];
      if(sortField==="roles"){va=a.roles.join(",");vb=b.roles.join(",");}
      if(va<vb) return sortDir==="asc"?-1:1;
      if(va>vb) return sortDir==="asc"?1:-1;
      return 0;
    });

  const createUser = () => {
    if (!newUser.name || !newUser.email) return;
    // Resolve final roles: from profile definition or from custom checkboxes
    const prof = profiles.find(p=>p.id===newUser.profile);
    const finalRoles = newUser.profile !== "custom" && prof
      ? prof.roles
      : newUser.roles;
    if (finalRoles.length === 0) return;
    const pw = "Tmp" + Math.random().toString(36).slice(-6).toUpperCase() + "!1";
    setUsers([...users, { ...newUser, roles: finalRoles, id:Date.now(), lastLogin:"Chưa đăng nhập" }]);
    setCreatedPassword(pw);
    setShowModal(false);
  };

  const saveEditUser = () => {
    setUsers(users.map(u => u.id===editUser.id ? editUser : u));
    setEditUser(null);
    showToast(`Đã lưu ${editUser.name}`);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id===id ? {...u, status:u.status==="active"?"inactive":"active"} : u));
    showToast("Đã cập nhật trạng thái tài khoản", "info");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u=>u.id!==id));
    setDeleteConfirm(null);
    if(detailUser?.id===id) setDetailUser(null);
    showToast("Đã xóa tài khoản (soft-delete)", "info");
  };

  const profileName = (pid) => profiles.find(p=>p.id===pid)?.name || "Custom";
  const profileColor = (pid) => {
    const cfg = { sales_std:"#6DB02B",trainer_std:"#7C3AED",cs_std:"#2563EB",ncc_std:"#0E7490",admin_std:"#5B21B6" };
    return cfg[pid]||T.textMid;
  };

  // ── ROLE PROFILES logic ──────────────────────────────────────────────────
  const activateProfile = (profile) => {
    setProfiles(profiles.map(p=>p.id===profile.id ? {...p,isActive:true} : p));
    setActivateConfirm(null);
    showToast(`Profile "${profile.name}" đã kích hoạt — sẵn sàng gán cho users`, "success");
  };

  // ── TAB BUTTON helper ────────────────────────────────────────────────────
  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setMainTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:mainTab===id?700:500,fontSize:13,padding:"10px 16px",borderBottom:mainTab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",background:"transparent",color:mainTab===id?T.green:T.textMid,transition:"all .15s",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap" }}>
      {icon} {label}
    </button>
  );

  // ── Permission Matrix rendering ──────────────────────────────────────────
  const parsePerms = (str) => (str||"——————").split("");
  const roles5     = ["admin","sales","trainer","cs","ncc"];
  const allMods    = ["all",...new Set(PERM_MATRIX.map(r=>r.module))];
  const matrixRows = (matrixModule==="all"?PERM_MATRIX:PERM_MATRIX.filter(r=>r.module===matrixModule))
    .filter(row => !diffOnly || roles5.some(r=>{ const c=parsePerms(row[r]); return c.some(ch=>ch==="●"||ch==="◑"); }));
  const matrixGrouped = matrixRows.reduce((acc,row)=>{ if(!acc[row.module])acc[row.module]=[]; acc[row.module].push(row); return acc; },{});
  const cellColor = (ch) => ({"●":"#4ADE80","◑":"#60A5FA","○":"rgba(255,255,255,.15)","—":"rgba(255,255,255,.06)"}[ch]||"rgba(255,255,255,.1)");
  const MOD_NAMES = {Sys:"Hệ thống",Dash:"Dashboard",KB:"Knowledge Base",Prod:"Sản phẩm",Chat:"Hội thoại",Quote:"Báo giá",Order:"Đơn hàng",AI:"AI & Config",Sec:"Bảo mật"};
  const MOD_COLORS= {Sys:"#7C3AED",Dash:"#2563EB",KB:"#6DB02B",Prod:"#D97706",Chat:"#0891B2",Quote:"#059669",Order:"#EA580C",AI:"#8B5CF6",Sec:"#374151"};

  // ── RENDER ───────────────────────────────────────────────────────────────
  // Sub-screen routing — placed here AFTER all hooks to respect Rules of Hooks
  if (subScreen?.type === "editUserRoles")
    return <EditUserRoles user={subScreen.user} profiles={ROLE_PROFILES_INIT} onBack={()=>setSubScreen(null)} />;
  if (subScreen?.type === "editRolePerms")
    return <EditRolePermissions roleId={subScreen.roleId} onBack={()=>setSubScreen(null)} />;
  if (subScreen?.type === "createRole")
    return <CreateCustomRole onBack={()=>setSubScreen(null)} onCreated={(id)=>setSubScreen({type:"editRolePerms",roleId:id})} profiles={ROLE_PROFILES_INIT} />;

  return (
    <div style={{ padding:28,display:"flex",flexDirection:"column",gap:20,position:"relative",fontFamily:"'Inter','Segoe UI',sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:toast.type==="error"?T.orange:T.blue,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)",maxWidth:380,display:"flex",alignItems:"center",gap:8 }}>
          {toast.type==="success"?"✅":toast.type==="error"?"❌":"ℹ️"} {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display:"flex",gap:14 }}>
        <StatCard label="Tổng người dùng"  value={users.length}                                     color={T.text} />
        <StatCard label="Đang hoạt động"    value={users.filter(u=>u.status==="active").length}      color={T.green} />
        <StatCard label="Multi-role"         value={users.filter(u=>u.roles.length>1).length}         color="#5B21B6" sub="≥2 roles" />
        <StatCard label="Bị khóa"            value={users.filter(u=>u.status==="inactive").length}    color={T.orange} />
      </div>

      <Card>
        {/* Main Tabs — US-S0-002 v3 has 4 screens */}
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 20px",gap:2,overflowX:"auto" }}>
          <TabBtn id="users"         icon="👤" label="Danh sách người dùng" />
          <TabBtn id="role_profiles" icon="🏷️" label="Role Profiles" />
          <TabBtn id="permissions"   icon="🔐" label="Permission Matrix" />
          <TabBtn id="my_perms"      icon="👁" label="Quyền của tôi" />
        </div>

        {/* ══════════════ TAB 1: USER LIST ══════════════ */}
        {mainTab === "users" && (
          <>
            <div style={{ padding:"14px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center" }}>
              <Input placeholder="Tìm theo tên, email..." value={search} onChange={e=>setSearch(e.target.value)} icon="🔍" style={{ width:240 }} />
              {/* Status segmented */}
              <div style={{ display:"flex",border:`1px solid ${T.border}`,borderRadius:7,overflow:"hidden" }}>
                {[["all","Tất cả"],["active","Active"],["inactive","Inactive"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setFilterStatus(k)} style={{ border:"none",cursor:"pointer",padding:"7px 14px",fontSize:12,fontWeight:filterStatus===k?700:400,background:filterStatus===k?T.green:T.card,color:filterStatus===k?"#fff":T.textMid,transition:"all .15s" }}>{l}</button>
                ))}
              </div>
              {/* Role Profile filter */}
              <select value={filterProfile} onChange={e=>setFilterProfile(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,background:T.card }}>
                <option value="all">Role Profile: Tất cả</option>
                {profiles.filter(p=>p.isActive&&p.phase===1).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                <option value="custom">Custom</option>
              </select>
              <div style={{ marginLeft:"auto" }}>
                <Btn variant="primary" onClick={()=>{ setShowModal(true); setNewUser({ name:"",email:"",phone:"",roles:["sales"],profile:"sales_std",dept:"",status:"active",note:"" }); }}>+ Thêm người dùng</Btn>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",minWidth:820 }}>
                <thead>
                  <tr style={{ background:T.bg }}>
                    <SortTh field="name"      label="Người dùng"         w="22%" />
                    <SortTh field="email"     label="Email"               w="18%" />
                    <SortTh field="profile"   label="Role Profile"        w="14%" />
                    <th style={{ padding:"10px 16px",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.06em",textTransform:"uppercase",width:"12%" }}>Roles</th>
                    <SortTh field="status"    label="Trạng thái"          w="10%" />
                    <SortTh field="lastLogin" label="Đăng nhập lần cuối"  w="14%" />
                    <th style={{ padding:"10px 16px",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.06em",textTransform:"uppercase",width:"10%" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {processedUsers.map((u,i) => (
                    <tr key={u.id} style={{ borderTop:`1px solid ${T.border}`,background:i%2===0?T.card:"rgba(244,246,243,.4)",cursor:"pointer" }}
                      onClick={()=>setDetailUser(u)}>
                      <td style={{ padding:"11px 16px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                          <Avatar name={u.name} size={30} bg={ROLE_META[u.roles[0]]?.color||T.green} />
                          <div>
                            <div style={{ fontSize:13,fontWeight:600,color:T.text }}>{u.name}</div>
                            {u.dept && <div style={{ fontSize:10,color:T.textLight }}>{u.dept}</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <span style={{ fontSize:12,color:T.textMid,cursor:"copy" }} onClick={e=>{e.stopPropagation();navigator.clipboard?.writeText(u.email);setCopyEmailDone(u.id);setTimeout(()=>setCopyEmailDone(null),1500);}}>
                          {copyEmailDone===u.id ? "✅ Copied" : u.email}
                        </span>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <span style={{ fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:5,background:profileColor(u.profile)+"18",color:profileColor(u.profile),border:`1px solid ${profileColor(u.profile)}40` }}>
                          {profileName(u.profile)}
                        </span>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <div style={{ display:"flex",gap:3,flexWrap:"wrap" }}>
                          {u.roles.slice(0,2).map(r=>{
                            const m=ROLE_META[r];
                            return m?(
                              <span key={r} style={{ fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:m.bg,color:m.color,border:`1px solid ${m.border}` }}>{m.icon} {m.label}</span>
                            ):null;
                          })}
                          {u.roles.length>2 && <span style={{ fontSize:9,color:T.textLight }}>+{u.roles.length-2}</span>}
                          {u.roles.length>1 && <span style={{ fontSize:8,fontWeight:700,background:"#F0EDFF",color:"#5B21B6",padding:"1px 5px",borderRadius:3 }}>UNION</span>}
                        </div>
                      </td>
                      <td style={{ padding:"11px 16px" }}><Badge status={u.status} /></td>
                      <td style={{ padding:"11px 16px",fontSize:11,color:T.textMid }}>{u.lastLogin}</td>
                      <td style={{ padding:"11px 16px" }} onClick={e=>e.stopPropagation()}>
                        <div style={{ display:"flex",gap:4 }}>
                          <Btn variant="secondary" size="sm" onClick={()=>setEditUser({...u})} title="Sửa">✏️</Btn>
                          <Btn variant="secondary" size="sm" onClick={()=>toggleStatus(u.id)} title={u.status==="active"?"Khóa":"Mở khóa"}>{u.status==="active"?"🔒":"✅"}</Btn>
                          <Btn variant="ghost"     size="sm" title="Force logout">↩</Btn>
                          <Btn variant="secondary" size="sm" onClick={e=>{e.stopPropagation();setSubScreen({type:"editUserRoles",user:u});}} title="Chỉnh sửa Roles" style={{ fontSize:11 }}>🔑</Btn>
                          <Btn variant="danger"    size="sm" onClick={()=>setDeleteConfirm(u)} title="Xóa">🗑️</Btn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"10px 20px",fontSize:11,color:T.textLight,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span>Hiển thị <b>{processedUsers.length}</b>/{users.length} người dùng</span>
              <div style={{ display:"flex",gap:4 }}>{[1,2,3].map(p=><Btn key={p} variant={p===1?"primary":"secondary"} size="sm">{p}</Btn>)}</div>
            </div>
          </>
        )}

        {/* ══════════════ TAB 2: ROLE PROFILES ══════════════ */}
        {mainTab === "role_profiles" && (
          <div style={{ padding:22 }}>
            {/* Callout */}
            <div style={{ background:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:8,padding:"10px 16px",marginBottom:18,fontSize:12,color:"#9A3412",display:"flex",gap:10 }}>
              <span style={{ fontSize:18 }}>⚠️</span>
              <div><b>Thay đổi Role Profile ảnh hưởng ngay đến tất cả users đang dùng profile đó.</b> Redis cache sẽ bị invalidate. Kiểm tra số users bị ảnh hưởng trước khi lưu.</div>
            </div>

            {/* Phase 1 profiles */}
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
              <div style={{ fontSize:13,fontWeight:700,color:T.text }}>Phase 1 — Active Profiles</div>
              <Btn variant="primary" onClick={()=>setSubScreen({type:"createRole"})}>+ Tạo Custom Role mới</Btn>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12,marginBottom:22 }}>
              {profiles.filter(p=>p.phase===1&&p.isActive).map(p=>(
                <div key={p.id} style={{ border:`1.5px solid ${profileColor(p.id)}30`,borderRadius:10,background:profileColor(p.id)+"08",padding:16 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                    <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{p.name}</div>
                    <span style={{ fontSize:9,fontWeight:700,background:profileColor(p.id)+"20",color:profileColor(p.id),padding:"2px 7px",borderRadius:4,marginLeft:"auto" }}>P1 ACTIVE</span>
                  </div>
                  <div style={{ fontSize:11,color:T.textMid,marginBottom:8 }}>{p.desc}</div>
                  <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:10 }}>
                    {p.roles.map(r=>{const m=ROLE_META[r];return m?<span key={r} style={{ fontSize:10,fontWeight:700,background:m.bg,color:m.color,padding:"2px 8px",borderRadius:4 }}>{m.icon} {m.label}</span>:null;})}
                  </div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <span style={{ fontSize:11,color:T.textLight }}>👥 {users.filter(u=>u.profile===p.id).length} users</span>
                    <div style={{ display:"flex",gap:5 }}>
                      <Btn variant="secondary" size="sm" onClick={()=>setEditProfile({...p})}>✏️ Sửa profile</Btn>
                      <Btn variant="secondary" size="sm" onClick={()=>setSubScreen({type:"editRolePerms",roleId:p.roles[0]||"sales"})} style={{ fontSize:11 }}>🔐 Phân quyền</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Phase 2 reserved */}
            <div style={{ fontSize:13,fontWeight:700,color:T.textMid,marginBottom:10 }}>Phase 2+ — Sẵn sàng kích hoạt khi có nhu cầu</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {profiles.filter(p=>p.phase===2&&!p.isActive).map(p=>(
                <div key={p.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:8,background:T.bg,border:`1px solid ${T.border}`,opacity:0.75 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13,fontWeight:600,color:T.textMid }}>{p.name}</div>
                    <div style={{ fontSize:11,color:T.textLight }}>{p.desc}</div>
                  </div>
                  <span style={{ fontSize:10,fontWeight:700,background:T.yellowLight,color:"#92400E",padding:"2px 8px",borderRadius:4 }}>P2 RESERVED</span>
                  <Btn variant="secondary" size="sm" style={{ borderColor:"#F59E0B",color:"#D97706" }}
                    onClick={()=>setActivateConfirm(p)}>
                    ⚡ Kích hoạt
                  </Btn>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ TAB 3: PERMISSION MATRIX ══════════════ */}
        {mainTab === "permissions" && (
          <div style={{ padding:0 }}>
            {/* Toolbar */}
            <div style={{ padding:"12px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
              <span style={{ fontSize:12,fontWeight:600,color:T.textMid }}>Module:</span>
              <select value={matrixModule} onChange={e=>setMatrixModule(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"6px 10px",fontSize:12,color:T.text,background:T.card }}>
                {allMods.map(m=><option key={m} value={m}>{m==="all"?"Tất cả modules":m}</option>)}
              </select>
              <span style={{ fontSize:12,fontWeight:600,color:T.textMid }}>Highlight:</span>
              <div style={{ display:"flex",gap:4 }}>
                <Btn variant={matrixHighlight===null?"primary":"secondary"} size="sm" onClick={()=>setMatrixHighlight(null)}>Tất cả</Btn>
                {roles5.map(r=><Btn key={r} variant={matrixHighlight===r?"primary":"secondary"} size="sm" onClick={()=>setMatrixHighlight(matrixHighlight===r?null:r)}>{ROLE_META[r]?.icon} {ROLE_META[r]?.label}</Btn>)}
              </div>
              <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:T.textMid,marginLeft:"auto",cursor:"pointer" }}>
                <input type="checkbox" checked={diffOnly} onChange={e=>setDiffOnly(e.target.checked)} style={{ accentColor:T.green }} />
                Chỉ hiện rows có quyền
              </label>
              <span style={{ fontSize:11,color:T.textLight }}>{matrixRows.length}/{PERM_MATRIX.length} rows</span>
            </div>

            {/* Legend */}
            <div style={{ padding:"8px 20px",background:T.bg,borderBottom:`1px solid ${T.border}`,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center" }}>
              <span style={{ fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.06em" }}>LEGEND R/W/C/D/S/A:</span>
              {[["●","All","#4ADE80"],["◑","Own","#60A5FA"],["○","No flag","rgba(0,0,0,.2)"],["—","No access","rgba(0,0,0,.15)"]].map(([s,d,c])=>(
                <div key={s} style={{ display:"flex",alignItems:"center",gap:5,fontSize:11 }}>
                  <span style={{ fontSize:14,color:c,fontWeight:800 }}>{s}</span>
                  <span style={{ color:T.textLight }}>{d}</span>
                </div>
              ))}
              <div style={{ marginLeft:"auto",fontSize:10,color:T.textLight }}>P1=Phase 1 active · P2=Phase 2 reserved</div>
            </div>

            {/* Matrix table */}
            <div style={{ overflowX:"auto",maxHeight:520,overflowY:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",minWidth:980 }}>
                <thead style={{ position:"sticky",top:0,zIndex:10 }}>
                  <tr style={{ background:T.sidebar }}>
                    <th style={{ padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",minWidth:200 }}>DocType / Chức năng</th>
                    <th style={{ padding:"10px 6px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.4)",textAlign:"center",minWidth:58 }}>FN Ref</th>
                    {roles5.map(r=>(
                      <th key={r} colSpan={6} style={{ padding:"8px 4px",fontSize:11,fontWeight:700,textAlign:"center",minWidth:120,color:matrixHighlight===r?ROLE_META[r].color:"rgba(255,255,255,.6)",background:matrixHighlight===r?ROLE_META[r].bg+"22":"transparent",borderLeft:"1px solid rgba(255,255,255,.08)" }}>
                        {ROLE_META[r].icon} {ROLE_META[r].label}
                      </th>
                    ))}
                    <th style={{ padding:"8px 4px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.35)",textAlign:"center",minWidth:44 }}>Phase</th>
                  </tr>
                  <tr style={{ background:"#0D1620" }}>
                    <th colSpan={2} />
                    {roles5.map(r=>["R","W","C","D","S","A"].map(p=>(
                      <th key={r+p} style={{ padding:"4px 2px",textAlign:"center",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.3)",borderLeft:p==="R"?"1px solid rgba(255,255,255,.06)":"none" }}>{p}</th>
                    )))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(matrixGrouped).map(([mod,rows]) => [
                    <tr key={"mod-"+mod}>
                      <td colSpan={2+5*6+1} style={{ padding:"5px 14px",fontSize:9,fontWeight:800,color:MOD_COLORS[mod]||"#fff",background:"#111C2D",letterSpacing:"0.1em",textTransform:"uppercase",borderTop:"2px solid #1E2D45" }}>
                        {mod} — {MOD_NAMES[mod]||""}
                      </td>
                    </tr>,
                    ...rows.map((row,ri) => (
                      <tr key={row.fn} style={{ borderTop:"1px solid #1A2740",background:ri%2===0?"#0F1A2B":"#101E30" }}>
                        <td style={{ padding:"7px 14px" }}>
                          <div style={{ fontSize:11,fontWeight:600,color:"#CBD5E0" }}>{row.fn}</div>
                          {row.note && <div style={{ fontSize:9,color:"rgba(255,255,255,.28)",marginTop:1 }}>{row.note}</div>}
                        </td>
                        <td style={{ padding:"6px 4px",textAlign:"center" }}>
                          <span style={{ fontSize:9,fontFamily:"monospace",color:"rgba(255,255,255,.3)",background:"rgba(255,255,255,.05)",padding:"1px 5px",borderRadius:3 }}>{row.ref}</span>
                        </td>
                        {roles5.map(role=>parsePerms(row[role]).slice(0,6).map((ch,pi)=>(
                          <td key={role+pi} style={{ padding:"5px 2px",textAlign:"center",background:matrixHighlight===role?ROLE_META[role].bg+"22":"transparent",borderLeft:pi===0?"1px solid rgba(255,255,255,.05)":"none" }}>
                            <span style={{ fontSize:13,color:cellColor(ch),fontWeight:ch==="●"||ch==="◑"?800:400,lineHeight:1 }}>{ch}</span>
                          </td>
                        )))}
                        <td style={{ padding:"5px 4px",textAlign:"center" }}>
                          <span style={{ fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:3,background:row.phase==="P1"?"rgba(109,176,43,.2)":"rgba(90,90,90,.2)",color:row.phase==="P1"?"#6DB02B":row.p2role?"#F59E0B":"#6B7280" }}>
                            {row.phase==="P1"?"P1":row.p2role||"P2"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════ TAB 4: MY PERMISSIONS (US-S0-003 v5 — Screen 3) ══════════════ */}
        {mainTab === "my_perms" && (
          <div style={{ padding:22 }}>
            <div style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:"12px 16px",marginBottom:18,display:"flex",gap:12,alignItems:"flex-start" }}>
              <span style={{ fontSize:24 }}>👁</span>
              <div>
                <div style={{ fontWeight:700,fontSize:14,color:T.blue,marginBottom:3 }}>Quyền của tôi — Admin</div>
                <div style={{ fontSize:12,color:"#1D4ED8",marginBottom:8 }}>Đăng nhập với: admin@remak.vn · Role Profile: Admin · Roles: [admin]</div>
                <div style={{ display:"flex",gap:5 }}>
                  <span style={{ fontSize:10,fontWeight:700,background:"#F0EDFF",color:"#5B21B6",padding:"2px 9px",borderRadius:4 }}>🛡️ Admin</span>
                  <span style={{ fontSize:10,color:T.green,fontWeight:700,background:T.greenLight,padding:"2px 9px",borderRadius:4 }}>Superset — Full toàn bộ</span>
                </div>
              </div>
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
              <div>
                <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:12 }}>Quyền hiệu lực (Effective Permissions)</div>
                <EffectivePermGrid roles={["admin"]} />
              </div>
              <div>
                <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:12 }}>Lịch sử thay đổi quyền</div>
                {[
                  ["2 giờ trước",  "Đăng nhập thành công từ 192.168.1.10"],
                  ["1 ngày trước", "Admin cập nhật profile: Admin Standard"],
                  ["3 ngày trước", "Tạo báo giá Q-2026-042"],
                  ["1 tuần trước", "Thêm role trainer (đã bỏ)"],
                  ["2 tuần trước", "Tài khoản được tạo bởi DevOps"],
                ].map(([t,a],i)=>(
                  <div key={i} style={{ display:"flex",gap:10,padding:"8px 0",borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
                    <div style={{ width:3,background:T.green,borderRadius:2,flexShrink:0 }} />
                    <div>
                      <div style={{ fontSize:12,color:T.text }}>{a}</div>
                      <div style={{ fontSize:10,color:T.textLight }}>{t}</div>
                    </div>
                  </div>
                ))}
                {/* 403 page preview */}
                <div style={{ marginTop:18,padding:16,background:T.redLight,border:"1px solid #FECACA",borderRadius:8 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:T.red,marginBottom:4 }}>Preview trang 403</div>
                  <div style={{ fontSize:11,color:T.red }}>Khi user không có quyền truy cập một URL, hệ thống hiển thị trang 403 với nút "Về trang chính" và "Xem quyền của tôi".</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* ── CREATE MODAL ─────────────────────────────────────────────────────── */}
      {showModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:540,padding:28,maxHeight:"90vh",overflowY:"auto" }}>
            <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:18 }}>Thêm người dùng mới</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Họ và tên *</label>
                <Input placeholder="Nguyễn Văn A" value={newUser.name} onChange={e=>setNewUser({...newUser,name:e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Email *</label>
                <Input placeholder="user@remak.vn" value={newUser.email} onChange={e=>setNewUser({...newUser,email:e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Số điện thoại</label>
                <Input placeholder="0901234567" value={newUser.phone} onChange={e=>setNewUser({...newUser,phone:e.target.value})} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:6 }}>Role Profile * <span style={{ fontSize:10,color:T.textLight,fontWeight:400 }}>(quan trọng nhất)</span></label>
                <select value={newUser.profile} onChange={e=>{
                    const pid=e.target.value;
                    const prof=profiles.find(p=>p.id===pid);
                    setNewUser({...newUser, profile:pid, roles: pid==="custom" ? (newUser.roles.length?newUser.roles:["sales"]) : (prof?.roles||["sales"]) });
                  }} style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,color:T.text,background:T.card }}>
                  <option value="">— Chọn Role Profile —</option>
                  {profiles.filter(p=>p.isActive&&p.phase===1).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                  <option value="custom">Custom (tùy chỉnh roles)</option>
                </select>
                {/* Profile preview */}
                {newUser.profile && newUser.profile !== "custom" && (
                  <div style={{ marginTop:8,padding:"8px 12px",background:T.bg,borderRadius:6,fontSize:11,color:T.textMid }}>
                    <b>{profileName(newUser.profile)}</b>: {profiles.find(p=>p.id===newUser.profile)?.desc}
                  </div>
                )}
              </div>
              {/* Custom roles */}
              {newUser.profile === "custom" && (
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:8 }}>Roles tùy chỉnh</label>
                  <RoleCheckboxes selected={newUser.roles} onChange={roles=>setNewUser({...newUser,roles})} />
                  {newUser.roles.length===0 && <div style={{ fontSize:11,color:T.red,marginTop:4 }}>⚠ Chọn ít nhất 1 role</div>}
                  {newUser.roles.length>1 && (
                    <div style={{ marginTop:8,padding:"7px 10px",background:"#F0EDFF",borderRadius:6,fontSize:11,color:"#5B21B6",fontWeight:600 }}>
                      ⚡ Union: user nhận quyền cao nhất từ tất cả {newUser.roles.length} roles
                    </div>
                  )}
                </div>
              )}
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Bộ phận</label>
                <Input placeholder="Sales, IT, Knowledge..." value={newUser.dept} onChange={e=>setNewUser({...newUser,dept:e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Trạng thái</label>
                <div style={{ display:"flex",gap:10,marginTop:4 }}>
                  {[["active","Active"],["inactive","Inactive"]].map(([v,l])=>(
                    <label key={v} style={{ display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:12 }}>
                      <input type="radio" checked={newUser.status===v} onChange={()=>setNewUser({...newUser,status:v})} style={{ accentColor:T.green }} />{l}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Ghi chú Admin (internal)</label>
                <textarea value={newUser.note} onChange={e=>setNewUser({...newUser,note:e.target.value})} placeholder="Ghi chú nội bộ, không hiện cho user..." rows={2}
                  style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,resize:"vertical",outline:"none",boxSizing:"border-box" }} />
              </div>
            </div>
            <div style={{ display:"flex",gap:10,marginTop:20,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setShowModal(false)}>Hủy</Btn>
              <Btn variant="primary" onClick={createUser} disabled={!newUser.name||!newUser.email||(newUser.profile==="custom"&&newUser.roles.length===0)}>Tạo tài khoản</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── PASSWORD DISPLAY (after create) ──────────────────────────────────── */}
      {createdPassword && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:400,padding:26 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:8 }}>✅ Tạo tài khoản thành công</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:14 }}>Password tạm thời cho user. Hãy copy và gửi cho họ — user cần đổi mật khẩu lần đăng nhập đầu tiên.</div>
            <div style={{ background:T.bg,border:`1px solid ${T.border}`,borderRadius:7,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
              <code style={{ flex:1,fontSize:16,fontWeight:800,color:T.text,letterSpacing:"0.1em" }}>{createdPassword}</code>
              <Btn variant="secondary" size="sm" onClick={()=>{ navigator.clipboard?.writeText(createdPassword); showToast("Đã copy password"); }}>📋 Copy</Btn>
            </div>
            <Btn variant="primary" style={{ width:"100%",justifyContent:"center" }} onClick={()=>{ setCreatedPassword(null); showToast("Đã tạo người dùng mới"); }}>Đóng</Btn>
          </Card>
        </div>
      )}

      {/* ── EDIT MODAL ─────────────────────────────────────────────────────────── */}
      {editUser && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:500,padding:28,maxHeight:"90vh",overflowY:"auto" }}>
            <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:4 }}>Chỉnh sửa người dùng</div>
            <div style={{ fontSize:12,color:T.textLight,marginBottom:18 }}>{editUser.email}</div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Họ và tên</label>
                <Input value={editUser.name} onChange={e=>setEditUser({...editUser,name:e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:6 }}>Role Profile</label>
                <select value={editUser.profile||"custom"} onChange={e=>{
                    const pid=e.target.value;
                    const prof=profiles.find(p=>p.id===pid);
                    setEditUser({...editUser, profile:pid, roles: pid==="custom" ? editUser.roles : (prof?.roles||editUser.roles) });
                  }}
                  style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,color:T.text,background:T.card }}>
                  {profiles.filter(p=>p.isActive&&p.phase===1).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                  <option value="custom">Custom</option>
                </select>
                {/* Show current roles from profile when non-custom */}
                {editUser.profile && editUser.profile !== "custom" && (
                  <div style={{ marginTop:8,padding:"8px 12px",background:T.bg,borderRadius:6,fontSize:11,color:T.textMid,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center" }}>
                    <span style={{ fontWeight:600 }}>Roles từ profile:</span>
                    {(profiles.find(p=>p.id===editUser.profile)?.roles||[]).map(r=>{
                      const m=ROLE_META[r];
                      return m?<span key={r} style={{ fontSize:10,fontWeight:700,background:m.bg,color:m.color,padding:"2px 8px",borderRadius:4 }}>{m.icon} {m.label}</span>:null;
                    })}
                    <Btn variant="secondary" size="sm" style={{ marginLeft:"auto" }}
                      onClick={()=>setSubScreen({type:"editUserRoles",user:editUser})}>
                      🔑 Chỉnh sửa roles
                    </Btn>
                  </div>
                )}
              </div>
              {editUser.profile === "custom" && (
                <div>
                  <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:8 }}>Roles <span style={{ fontSize:10,color:T.textLight }}>(Union Permission)</span></label>
                  <RoleCheckboxes selected={editUser.roles} onChange={roles=>setEditUser({...editUser,roles})} />
                  {editUser.roles.length>1 && (
                    <div style={{ marginTop:8,fontSize:11,background:"#F0EDFF",color:"#5B21B6",padding:"6px 10px",borderRadius:6 }}>
                      ⚡ Multi-role: Session bị invalidate sau khi lưu. User cần đăng nhập lại.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ display:"flex",gap:10,marginTop:20,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setEditUser(null)}>Hủy</Btn>
              <Btn variant="primary" onClick={saveEditUser}>Lưu thay đổi</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── DELETE CONFIRM ─────────────────────────────────────────────────────── */}
      {deleteConfirm && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000 }}>
          <Card style={{ width:420,padding:28 }}>
            <div style={{ display:"flex",gap:14,alignItems:"flex-start",marginBottom:20 }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:T.redLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>🗑️</div>
              <div>
                <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:4 }}>Xóa người dùng?</div>
                <div style={{ fontSize:13,color:T.textMid }}><b>{deleteConfirm.name}</b> ({deleteConfirm.email})</div>
              </div>
            </div>
            <div style={{ background:T.redLight,border:"1px solid #FECACA",borderRadius:8,padding:"10px 14px",marginBottom:20,fontSize:12,color:T.red,lineHeight:1.6 }}>
              ⚠️ Soft-delete: tài khoản bị ẩn nhưng dữ liệu lịch sử vẫn giữ lại.<br/>
              • Session bị revoke ngay lập tức<br/>
              • Hard-delete chỉ bởi DevOps
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setDeleteConfirm(null)}>Hủy bỏ</Btn>
              <Btn variant="danger" onClick={()=>deleteUser(deleteConfirm.id)}>🗑️ Xác nhận xóa</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── ACTIVATE PROFILE CONFIRM ──────────────────────────────────────────── */}
      {activateConfirm && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:440,padding:26 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:8 }}>⚡ Kích hoạt Phase 2 Profile</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:16 }}>
              Bạn đang kích hoạt <b>"{activateConfirm.name}"</b>.<br/>
              Profile này sẽ xuất hiện trong dropdown User Management và có thể gán cho users ngay lập tức. Không cần deploy code.
            </div>
            <div style={{ background:T.yellowLight,border:"1px solid #FDE68A",borderRadius:7,padding:"10px 13px",marginBottom:16,fontSize:11,color:"#92400E" }}>
              <b>Lưu ý:</b> {activateConfirm.desc}.<br/>
              Đảm bảo đã có training cho bộ phận này trước khi gán users.
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setActivateConfirm(null)}>Hủy</Btn>
              <Btn variant="primary" style={{ background:"#D97706" }} onClick={()=>activateProfile(activateConfirm)}>⚡ Kích hoạt</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── EDIT PROFILE MODAL ───────────────────────────────────────────────── */}
      {editProfile && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:540,padding:28,maxHeight:"90vh",overflowY:"auto" }}>
            {/* Header */}
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
              <div style={{ fontWeight:800,fontSize:16,color:T.text }}>✏️ Chỉnh sửa Role Profile</div>
              <span style={{ marginLeft:"auto",fontSize:10,fontWeight:700,background:profileColor(editProfile.id)+"20",color:profileColor(editProfile.id),padding:"2px 9px",borderRadius:5 }}>P1 ACTIVE</span>
            </div>
            <div style={{ fontSize:12,color:T.textLight,marginBottom:20 }}>
              Thay đổi sẽ áp dụng ngay cho <b>{users.filter(u=>u.profile===editProfile.id).length} users</b> đang dùng profile này. Redis cache sẽ bị invalidate.
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Tên profile *</label>
                <Input value={editProfile.name} onChange={e=>setEditProfile({...editProfile,name:e.target.value})} placeholder="VD: Sales Standard" />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Mô tả</label>
                <textarea
                  value={editProfile.desc}
                  onChange={e=>setEditProfile({...editProfile,desc:e.target.value})}
                  placeholder="Giải thích profile dành cho bộ phận nào..."
                  rows={2}
                  style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,color:T.text,resize:"vertical",outline:"none",boxSizing:"border-box" }}
                />
              </div>

              {/* Roles */}
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:8 }}>
                  Roles trong profile <span style={{ fontSize:10,fontWeight:400,color:T.textLight }}>(Union Permission — quyền cao nhất từ tất cả roles thắng)</span>
                </label>
                <RoleCheckboxes selected={editProfile.roles} onChange={roles=>setEditProfile({...editProfile,roles})} />
                {editProfile.roles.length === 0 && (
                  <div style={{ fontSize:11,color:T.red,marginTop:4 }}>⚠ Chọn ít nhất 1 role</div>
                )}
              </div>

              {/* Effective permissions preview */}
              {editProfile.roles.length > 0 && (
                <div style={{ background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:14 }}>
                  <div style={{ fontSize:11,fontWeight:700,color:T.textMid,marginBottom:10,display:"flex",alignItems:"center",gap:6 }}>
                    👁 Preview Effective Permissions sau union
                    {editProfile.roles.length > 1 && (
                      <span style={{ fontSize:10,background:"#F0EDFF",color:"#5B21B6",padding:"1px 7px",borderRadius:4,fontWeight:700 }}>
                        ⚡ UNION ({editProfile.roles.length} roles)
                      </span>
                    )}
                  </div>
                  <EffectivePermGrid roles={editProfile.roles} />
                </div>
              )}

              {/* Impact warning */}
              {users.filter(u=>u.profile===editProfile.id).length > 0 && (
                <div style={{ background:T.yellowLight,border:"1px solid #FDE68A",borderRadius:7,padding:"10px 14px",fontSize:11,color:"#92400E",display:"flex",gap:8,alignItems:"flex-start" }}>
                  <span style={{ fontSize:16,flexShrink:0 }}>⚠️</span>
                  <div>
                    <b>Cảnh báo:</b> {users.filter(u=>u.profile===editProfile.id).length} users đang dùng profile này.
                    Sau khi lưu, Redis cache của họ sẽ bị invalidate ngay lập tức —
                    permissions mới có hiệu lực ở API call tiếp theo (không cần re-login).
                  </div>
                </div>
              )}
            </div>

            <div style={{ display:"flex",gap:10,marginTop:22,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setEditProfile(null)}>Hủy</Btn>
              <Btn
                variant="primary"
                disabled={!editProfile.name.trim() || editProfile.roles.length === 0}
                onClick={()=>{
                  setProfiles(profiles.map(p=>p.id===editProfile.id
                    ? { ...p, name:editProfile.name.trim(), desc:editProfile.desc, roles:editProfile.roles }
                    : p
                  ));
                  // Also update profile name in users list
                  setEditProfile(null);
                  showToast(`Đã cập nhật profile "${editProfile.name.trim()}" — ${users.filter(u=>u.profile===editProfile.id).length} users bị ảnh hưởng`);
                }}
              >
                💾 Lưu thay đổi
              </Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── USER DETAIL SIDE PANEL ────────────────────────────────────────────── */}
      {detailUser && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"flex-end",zIndex:999 }} onClick={()=>setDetailUser(null)}>
          <div style={{ width:460,height:"100vh",background:T.card,boxShadow:"-4px 0 24px rgba(0,0,0,.15)",display:"flex",flexDirection:"column",overflowY:"auto" }}
            onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{ padding:"20px 22px",borderBottom:`1px solid ${T.border}` }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <Avatar name={detailUser.name} size={56} bg={ROLE_META[detailUser.roles[0]]?.color||T.green} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800,fontSize:16,color:T.text }}>{detailUser.name}</div>
                  <div style={{ fontSize:12,color:T.textLight }}>{detailUser.email}</div>
                  <div style={{ display:"flex",gap:5,marginTop:5,flexWrap:"wrap" }}>
                    <span style={{ fontSize:11,fontWeight:700,background:profileColor(detailUser.profile)+"18",color:profileColor(detailUser.profile),padding:"2px 9px",borderRadius:4 }}>{profileName(detailUser.profile)}</span>
                    <Badge status={detailUser.status} />
                  </div>
                </div>
                <Btn variant="ghost" size="sm" onClick={()=>setDetailUser(null)}>✕</Btn>
              </div>
              <div style={{ display:"flex",gap:7 }}>
                <Btn variant="secondary" size="sm" onClick={()=>{ setEditUser({...detailUser}); setDetailUser(null); }}>✏️ Chỉnh sửa</Btn>
                <Btn variant="secondary" size="sm" onClick={()=>toggleStatus(detailUser.id)}>
                  {detailUser.status==="active"?"🔒 Khóa":"✅ Mở khóa"}
                </Btn>
                <Btn variant="ghost" size="sm">↩ Force logout</Btn>
              </div>
            </div>

            <div style={{ flex:1,padding:22,display:"flex",flexDirection:"column",gap:20 }}>
              {/* Roles */}
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  Roles đang active
                  <Btn variant="secondary" size="sm" onClick={()=>{ setDetailUser(null); setSubScreen({type:"editUserRoles",user:detailUser}); }}>🔑 Chỉnh sửa roles</Btn>
                </div>
                <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                  {detailUser.roles.map(r=>{const m=ROLE_META[r];return m?(
                    <span key={r} style={{ fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:6,background:m.bg,color:m.color,border:`1.5px solid ${m.border}`,display:"flex",alignItems:"center",gap:5 }}>{m.icon} {m.label}</span>
                  ):null;})}
                </div>
              </div>

              {/* Effective permissions */}
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:8 }}>Quyền hiệu lực (Effective Permissions)</div>
                <EffectivePermGrid roles={detailUser.roles} />
              </div>

              {/* Sessions */}
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:8 }}>Sessions đang mở</div>
                {[
                  { device:"Chrome · macOS", ip:"192.168.1.10", since:"2 giờ trước" },
                  { device:"Mobile Safari · iOS", ip:"192.168.1.22", since:"1 ngày trước" },
                ].map((s,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:6,background:T.bg,marginBottom:5,border:`1px solid ${T.border}` }}>
                    <div style={{ flex:1,fontSize:11,color:T.text }}>{s.device}<div style={{ fontSize:10,color:T.textLight }}>{s.ip} · {s.since}</div></div>
                    <Btn variant="danger" size="sm">Kết thúc</Btn>
                  </div>
                ))}
                <Btn variant="secondary" size="sm" style={{ marginTop:4 }}>Kết thúc tất cả sessions</Btn>
              </div>

              {/* Activity */}
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:8 }}>Lịch sử hoạt động</div>
                {["Đăng nhập · 2 giờ trước","Tạo báo giá Q-2026-042 · 1 ngày trước","Nhận hội thoại #301 · 2 ngày trước"].map((a,i)=>(
                  <div key={i} style={{ fontSize:11,color:T.textMid,padding:"5px 0",borderBottom:i<2?`1px solid ${T.border}`:"none",display:"flex",gap:6 }}>
                    <span style={{ color:T.green }}>●</span>{a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ─── PAGE: EDIT USER ROLES  (US-S0-002 v3.1 Addendum) ──────────────────────
// Screen 5: /admin/users/{id}/roles — 2-panel layout

const EditUserRoles = ({ user, onBack, profiles = ROLE_PROFILES_INIT }) => {
  // user = the user being edited; onBack = callback to return to User Management
  const displayUser = user || {
    id:2, name:"Nguyen Trường", email:"nctruong@remak.vn",
    roles:["sales"], profile:"sales_std", status:"active",
  };

  // Canonical roles that came from the profile (locked — can't remove individually)
  const prof = profiles.find(p => p.id === displayUser.profile);
  const profileRoles = prof?.roles || []; // roles locked from profile definition

  // State
  const [currentRoles, setCurrentRoles] = useState([...displayUser.roles]);
  const [staged, setStaged]             = useState([]); // [{op:"+"/"-", role}]
  const [autocompleteQ, setAutocompleteQ] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [historyOpen, setHistoryOpen]   = useState(false);
  const [saving, setSaving]             = useState(false);
  const [toast, setToast]               = useState(null);
  const [unsavedPrompt, setUnsavedPrompt] = useState(false);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const isOnline = true; // mock: user was active < 5 min ago

  // Available roles to add (active, not already assigned)
  const ALL_ACTIVE_ROLES = Object.keys(ROLE_META).filter(r => !currentRoles.includes(r) && !staged.find(s=>s.op==="+"&&s.role===r));

  const filteredRoles = ALL_ACTIVE_ROLES.filter(r =>
    ROLE_META[r]?.label.toLowerCase().includes(autocompleteQ.toLowerCase())
  );

  // Add role to staging
  const stageAdd = (role) => {
    if (currentRoles.includes(role)) return;
    setStaged(prev => {
      const already = prev.find(s=>s.role===role);
      if (already) return prev;
      return [...prev.filter(s=>!(s.op==="-"&&s.role===role)), {op:"+",role}];
    });
    setAutocompleteQ(""); setAutocompleteOpen(false);
  };

  // Remove role from staging (only custom roles)
  const stageRemove = (role) => {
    if (profileRoles.includes(role)) return; // locked
    setStaged(prev => {
      const alreadyAdd = prev.find(s=>s.op==="+"&&s.role===role);
      if (alreadyAdd) return prev.filter(s=>!(s.op==="+"&&s.role===role));
      return [...prev.filter(s=>!(s.op==="-"&&s.role===role)), {op:"-",role}];
    });
  };

  // Final roles after applying staged
  const proposedRoles = [
    ...currentRoles.filter(r => !staged.find(s=>s.op==="-"&&s.role===r)),
    ...staged.filter(s=>s.op==="+").map(s=>s.role),
  ];

  // Impact preview: mock permission diffs
  const getImpactPreview = () => {
    const added   = staged.filter(s=>s.op==="+");
    const removed = staged.filter(s=>s.op==="-");
    const conflicts = [];
    const addedPerms  = added.flatMap(s  => ({
      trainer: ["KB Document: Read, Write, Create","Prompt Store: Read, Write"],
      cs:      ["CS Queue: Read, Write, Create","Conversation: Read"],
      admin:   ["User: Full","All DocTypes: Full"],
      ncc:     ["NCC Product: Read, Write","Order (NCC): Read, Write"],
    }[s.role]||[]));
    const removedPerms = removed.flatMap(s => ({
      trainer: ["KB Document: Read, Write, Create","Prompt Store: Read, Write"],
      cs:      ["CS Queue: Read, Write, Create"],
      admin:   ["User: Full"],
      ncc:     ["NCC Product: Read, Write"],
    }[s.role]||[]));
    // Conflict: adding admin while having sales (Own-only overridden to Full)
    if (added.find(s=>s.role==="admin") && currentRoles.includes("sales")) {
      conflicts.push("Role mới sẽ cấp Full access cho Quote, ghi đè Own-only hiện tại.");
    }
    return { addedPerms, removedPerms, conflicts };
  };

  const impact = getImpactPreview();
  const hasChanges = staged.length > 0;

  // Save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("Đã cập nhật roles. Redis invalidated.");
      setCurrentRoles(proposedRoles);
      setStaged([]);
    }, 900);
  };

  // All visible role pills (current + staged adds)
  const visibleRoles = [
    ...currentRoles,
    ...staged.filter(s=>s.op==="+").map(s=>s.role),
  ];

  const auditHistory = [
    { action:"Thêm", role:"trainer", by:"admin@remak.vn", at:"3 ngày trước" },
    { action:"Xóa",  role:"cs",      by:"admin@remak.vn", at:"1 tuần trước" },
    { action:"Thêm", role:"sales",   by:"admin@remak.vn", at:"2 tuần trước" },
    { action:"Thêm", role:"ncc",     by:"admin@remak.vn", at:"3 tuần trước" },
    { action:"Xóa",  role:"admin",   by:"admin@remak.vn", at:"1 tháng trước" },
  ];

  return (
    <div style={{ padding:28,display:"flex",flexDirection:"column",gap:0,position:"relative",fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>{toast.msg}</div>}

      {/* Breadcrumb */}
      <div style={{ fontSize:11,color:T.textLight,marginBottom:14,display:"flex",alignItems:"center",gap:6 }}>
        <span style={{ cursor:"pointer",color:T.blue }} onClick={onBack}>Quản lý Người dùng</span>
        <span>›</span><span style={{ cursor:"pointer",color:T.blue }}>{displayUser.name}</span>
        <span>›</span><span style={{ color:T.textMid,fontWeight:600 }}>Chỉnh sửa Roles</span>
      </div>

      {/* User info bar */}
      <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",gap:12 }}>
        <Avatar name={displayUser.name} size={36} bg={ROLE_META[displayUser.roles[0]]?.color||T.green} />
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{displayUser.name}</div>
          <div style={{ fontSize:11,color:T.textLight }}>{displayUser.email}</div>
        </div>
        <span style={{ fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:5,background:"#F0EDFF",color:"#5B21B6" }}>
          {profiles.find(p=>p?.id===displayUser.profile)?.name || "Custom"}
        </span>
        <Btn variant="secondary" size="sm">👁 Xem quyền hiện tại</Btn>
        <Btn variant="secondary" size="sm" onClick={onBack}>← Quay lại</Btn>
      </div>

      {/* Online banner */}
      {isOnline && (
        <div style={{ background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:7,padding:"8px 14px",marginBottom:14,fontSize:12,color:"#92400E",display:"flex",gap:8,alignItems:"center" }}>
          <span>🟢</span>
          <span><b>User này đang online.</b> Thay đổi áp dụng ngay lập tức sau API call tiếp theo của họ.</span>
        </div>
      )}

      {/* 2-panel layout */}
      <div style={{ display:"flex",gap:18,alignItems:"flex-start" }}>

        {/* ─── LEFT PANEL (60%) ─────────────────────────────────────────── */}
        <div style={{ flex:6,display:"flex",flexDirection:"column",gap:14 }}>

          {/* Current role pills */}
          <Card style={{ padding:18 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:12 }}>Roles đang active</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:14 }}>
              {visibleRoles.map(role => {
                const m = ROLE_META[role];
                if (!m) return null;
                const isFromProfile = profileRoles.includes(role);
                const isStageAdd    = staged.find(s=>s.op==="+"&&s.role===role);
                const isStageRemove = staged.find(s=>s.op==="-"&&s.role===role);
                if (isStageRemove) return null; // hidden if staged for removal
                return (
                  <div key={role} style={{
                    display:"flex",alignItems:"center",gap:6,
                    padding:"6px 12px",borderRadius:20,
                    background: isStageAdd ? "#DCFCE7" : m.bg,
                    border:`1.5px solid ${isStageAdd?"#86EFAC":m.border}`,
                    transition:"all .15s",
                  }}>
                    <span style={{ fontSize:14 }}>{m.icon}</span>
                    <span style={{ fontSize:12,fontWeight:700,color:isStageAdd?T.greenDark:m.color }}>{m.label}</span>
                    {isStageAdd && <span style={{ fontSize:9,background:T.green,color:"#fff",padding:"1px 5px",borderRadius:3,fontWeight:700 }}>MỚI</span>}
                    {isFromProfile
                      ? <span title="Từ Role Profile — không thể xóa đơn lẻ" style={{ fontSize:11,color:T.textLight,cursor:"help" }}>🔒</span>
                      : <span onClick={()=>stageRemove(role)} style={{ fontSize:12,cursor:"pointer",color:T.textLight,fontWeight:700,marginLeft:2 }} title="Gỡ role này">✕</span>
                    }
                  </div>
                );
              })}
              {visibleRoles.filter(r=>!staged.find(s=>s.op==="-"&&s.role===r)).length===0 && (
                <span style={{ fontSize:12,color:T.textLight,fontStyle:"italic" }}>Chưa có role nào</span>
              )}
            </div>

            {/* Role Profile info */}
            <div style={{ background:T.bg,border:`1px solid ${T.border}`,borderRadius:7,padding:"10px 14px",marginBottom:12,fontSize:12 }}>
              <span style={{ color:T.textMid }}>Đang dùng: </span>
              <b style={{ color:T.text }}>{profiles?.find?.(p=>p?.id===displayUser.profile)?.name||"Sales Standard"}</b>
              <span style={{ color:T.textLight }}> (gồm: {profileRoles.map(r=>ROLE_META[r]?.label||r).join(", ")})</span>
              <Btn variant="ghost" size="sm" style={{ marginLeft:8,fontSize:11 }}>Đổi Profile →</Btn>
            </div>

            {/* Autocomplete add role */}
            <div style={{ position:"relative" }}>
              <div style={{ fontSize:12,fontWeight:600,color:T.textMid,marginBottom:6 }}>Thêm Custom Role</div>
              <Input
                placeholder="Gõ để tìm role... (VD: cs, trainer)"
                value={autocompleteQ}
                onChange={e=>{ setAutocompleteQ(e.target.value); setAutocompleteOpen(true); }}
                onFocus={()=>setAutocompleteOpen(true)}
                icon="🔍"
              />
              {autocompleteOpen && (
                <div style={{ position:"absolute",top:"100%",left:0,right:0,zIndex:200,marginTop:3,background:T.card,border:`1px solid ${T.border}`,borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,.12)",overflow:"hidden" }}>
                  {filteredRoles.length === 0 ? (
                    <div style={{ padding:"10px 14px",fontSize:12,color:T.textLight,fontStyle:"italic" }}>
                      {autocompleteQ ? `Không tìm thấy role active nào cho "${autocompleteQ}"` : "Tất cả roles đã được gán"}
                    </div>
                  ) : filteredRoles.map(role => {
                    const m = ROLE_META[role];
                    return (
                      <div key={role} onMouseDown={e=>{e.preventDefault();stageAdd(role);}} style={{ padding:"9px 14px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"background .1s" }}
                        onMouseEnter={e=>e.currentTarget.style.background=T.bg}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <span style={{ fontSize:16 }}>{m?.icon}</span>
                        <div>
                          <div style={{ fontWeight:600,color:T.text }}>{m?.label}</div>
                          <div style={{ fontSize:10,color:T.textLight }}>{m?.desc}</div>
                        </div>
                        <span style={{ marginLeft:"auto",fontSize:10,color:T.green,fontWeight:700 }}>+ Thêm</span>
                      </div>
                    );
                  })}
                  <div style={{ padding:"6px 14px",borderTop:`1px solid ${T.border}`,fontSize:10,color:T.textLight }}>
                    Chỉ hiện roles is_active=TRUE. Phase 2 roles cần kích hoạt trước.
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Staging area */}
          <Card style={{ padding:18 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:10 }}>
              Staging Area
              {staged.length > 0 && <span style={{ marginLeft:8,fontSize:11,fontWeight:400,color:T.textLight }}>{staged.length} thay đổi</span>}
            </div>
            {staged.length === 0 ? (
              <div style={{ fontSize:12,color:T.textLight,fontStyle:"italic",padding:"8px 0" }}>Chưa có thay đổi nào.</div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {staged.map((s,i) => {
                  const m = ROLE_META[s.role];
                  return (
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:7,background:s.op==="+"?"#F0FDF4":"#FEF2F2",border:`1px solid ${s.op==="+"?"#86EFAC":"#FECACA"}` }}>
                      <span style={{ fontSize:13,fontWeight:800,color:s.op==="+"?T.green:T.red }}>{s.op==="+"?"[+]":"[−]"}</span>
                      <span style={{ fontSize:14 }}>{m?.icon}</span>
                      <span style={{ flex:1,fontSize:12,fontWeight:600,color:s.op==="+"?T.greenDark:T.red }}>
                        {m?.label} — {s.op==="+"?"sẽ được thêm":"sẽ bị xóa"}
                      </span>
                      <span onClick={()=>setStaged(staged.filter((_,j)=>j!==i))} style={{ fontSize:11,cursor:"pointer",color:T.textLight }}>✕ Hoàn tác</span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Audit trail */}
          <Card style={{ padding:18 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom: historyOpen?12:0 }}>
              <div style={{ fontWeight:700,fontSize:13,color:T.text }}>Lịch sử thay đổi role</div>
              <Btn variant="ghost" size="sm" onClick={()=>setHistoryOpen(o=>!o)}>{historyOpen?"▲ Thu gọn":"▼ Xem lịch sử"}</Btn>
            </div>
            {historyOpen && (
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {auditHistory.map((h,i) => (
                  <div key={i} style={{ display:"flex",gap:10,alignItems:"center",fontSize:11,padding:"6px 0",borderBottom:i<auditHistory.length-1?`1px solid ${T.border}`:"none" }}>
                    <span style={{ color:h.action==="Thêm"?T.green:T.red,fontWeight:700,minWidth:28 }}>{h.action==="Thêm"?"[+]":"[−]"}</span>
                    <span style={{ fontWeight:600,color:T.text }}>{ROLE_META[h.role]?.icon} {ROLE_META[h.role]?.label||h.role}</span>
                    <span style={{ color:T.textLight }}>bởi {h.by}</span>
                    <span style={{ marginLeft:"auto",color:T.textLight }}>{h.at}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* ─── RIGHT PANEL (40%) ────────────────────────────────────────── */}
        <div style={{ flex:4,position:"sticky",top:20 }}>
          <Card style={{ padding:18 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:12 }}>
              Tác động nếu lưu
              {hasChanges && <span style={{ marginLeft:6,fontSize:10,color:T.textLight }}>(real-time preview)</span>}
            </div>

            {!hasChanges ? (
              <div style={{ fontSize:12,color:T.textLight,fontStyle:"italic",padding:"12px 0",textAlign:"center" }}>
                <div style={{ fontSize:24,marginBottom:6 }}>✅</div>
                Chưa có thay đổi nào.
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {/* Added permissions */}
                {impact.addedPerms.length > 0 && (
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:T.green,marginBottom:6,display:"flex",alignItems:"center",gap:5 }}>
                      <span style={{ width:14,height:14,background:T.green,color:"#fff",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900 }}>+</span>
                      Quyền được thêm
                    </div>
                    {impact.addedPerms.map((p,i)=>(
                      <div key={i} style={{ fontSize:11,color:T.greenDark,padding:"3px 8px",background:"#F0FDF4",borderRadius:5,marginBottom:3,display:"flex",alignItems:"center",gap:6 }}>
                        <span style={{ color:T.green,fontSize:11 }}>▸</span> {p}
                      </div>
                    ))}
                  </div>
                )}

                {/* Removed permissions */}
                {impact.removedPerms.length > 0 && (
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:T.red,marginBottom:6,display:"flex",alignItems:"center",gap:5 }}>
                      <span style={{ width:14,height:14,background:T.red,color:"#fff",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900 }}>−</span>
                      Quyền bị mất
                    </div>
                    {impact.removedPerms.map((p,i)=>(
                      <div key={i} style={{ fontSize:11,color:T.red,padding:"3px 8px",background:"#FEF2F2",borderRadius:5,marginBottom:3,display:"flex",alignItems:"center",gap:6 }}>
                        <span style={{ color:T.red,fontSize:11 }}>▸</span> {p}
                      </div>
                    ))}
                  </div>
                )}

                {/* Unchanged */}
                <div style={{ fontSize:11,color:T.textLight }}>
                  ✓ Các quyền khác giữ nguyên
                </div>

                {/* Conflicts */}
                {impact.conflicts.map((c,i)=>(
                  <div key={i} style={{ padding:"10px 12px",background:T.yellowLight,border:"1px solid #FDE68A",borderRadius:7,fontSize:11,color:"#92400E",display:"flex",gap:8 }}>
                    <span style={{ flexShrink:0 }}>⚠️</span> <b>Xung đột:</b> {c}
                  </div>
                ))}

                {/* Proposed roles summary */}
                <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:10 }}>
                  <div style={{ fontSize:11,fontWeight:700,color:T.textMid,marginBottom:6 }}>Roles sau khi lưu:</div>
                  <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                    {proposedRoles.map(r=>{const m=ROLE_META[r];return m?<span key={r} style={{ fontSize:10,fontWeight:700,background:m.bg,color:m.color,padding:"2px 8px",borderRadius:4 }}>{m.icon} {m.label}</span>:null;})}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ─── STICKY FOOTER ─────────────────────────────────────────────── */}
      {hasChanges && (
        <div style={{ position:"sticky",bottom:0,left:0,right:0,background:T.card,borderTop:`2px solid ${T.green}`,padding:"12px 28px",display:"flex",alignItems:"center",gap:12,marginTop:14,marginLeft:-28,marginRight:-28,zIndex:50 }}>
          <span style={{ fontSize:12,color:T.textMid,fontWeight:600 }}>
            <span style={{ color:T.orange,fontWeight:800 }}>{staged.length}</span> thay đổi chưa lưu
          </span>
          <div style={{ marginLeft:"auto",display:"flex",gap:10 }}>
            <Btn variant="secondary" onClick={()=>setStaged([])}>↺ Hủy thay đổi</Btn>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ border:"none",borderRadius:7,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:saving?"not-allowed":"pointer",background:saving?T.greenDark:T.green,color:"#fff",display:"flex",alignItems:"center",gap:8 }}
            >
              {saving?<><span style={{ width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }} />Đang lưu...</>:"💾 Lưu thay đổi"}
            </button>
          </div>
        </div>
      )}

      {unsavedPrompt && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:380,padding:24 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:8 }}>Bạn có thay đổi chưa lưu</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:16 }}>Thoát sẽ mất {staged.length} thay đổi chưa lưu. Tiếp tục?</div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setUnsavedPrompt(false)}>Ở lại</Btn>
              <Btn variant="danger" onClick={onBack}>Thoát không lưu</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};


// ─── PAGE: EDIT ROLE PERMISSIONS  (US-S0-003 v5.1 — Screen 5) ───────────────
// /admin/roles/{id}/permissions — Toggle grid R/W/C/D/S/A per DocType

const ROLE_PERM_DOCTYPES = [
  { module:"Sys",   doctype:"User",                level:"all",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"Sys",   doctype:"Role",                level:"all",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"Sys",   doctype:"Profile cá nhân",     level:"own",  R:1,W:1,C:0,D:0,S:0,A:0 },
  { module:"Dash",  doctype:"Dashboard tổng quan", level:"all",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"Dash",  doctype:"Báo cáo Doanh số",    level:"own",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"KB",    doctype:"KB Document",         level:"none", R:0,W:0,C:0,D:0,S:0,A:0 },
  { module:"KB",    doctype:"Tag & Category",      level:"none", R:0,W:0,C:0,D:0,S:0,A:0 },
  { module:"Prod",  doctype:"Product (read-only)", level:"all",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"Chat",  doctype:"Conversation Public", level:"all",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"Chat",  doctype:"Conversation Assigned",level:"own", R:1,W:1,C:0,D:0,S:0,A:0 },
  { module:"Chat",  doctype:"Conversation Tag",    level:"all",  R:1,W:1,C:1,D:0,S:0,A:0 },
  { module:"Quote", doctype:"Draft Quote",         level:"own",  R:1,W:1,C:1,D:0,S:0,A:0 },
  { module:"Quote", doctype:"Quote Approval",      level:"own",  R:1,W:0,C:0,D:0,S:1,A:0 },
  { module:"Order", doctype:"Order (Sale View)",   level:"own",  R:1,W:0,C:0,D:0,S:0,A:0 },
  { module:"AI",    doctype:"Routing Rules",        level:"none", R:0,W:0,C:0,D:0,S:0,A:0 },
  { module:"Sec",   doctype:"Audit Log",            level:"none", R:0,W:0,C:0,D:0,S:0,A:0 },
];
const PERM_CODES = ["R","W","C","D","S","A"];
const LEVEL_OPTS = [
  { value:"none", label:"No access", color:T.textLight, bg:T.bg },
  { value:"own",  label:"Own only",  color:"#1D4ED8",  bg:"#EFF6FF" },
  { value:"all",  label:"All records",color:"#166534", bg:"#DCFCE7" },
];
const MOD_COLORS_EDIT = { Sys:"#7C3AED",Dash:"#2563EB",KB:"#6DB02B",Prod:"#D97706",Chat:"#0891B2",Quote:"#059669",Order:"#EA580C",AI:"#8B5CF6",Sec:"#374151" };
const MOD_NAMES_EDIT  = { Sys:"Hệ thống",Dash:"Dashboard",KB:"Knowledge Base",Prod:"Sản phẩm",Chat:"Hội thoại",Quote:"Báo giá",Order:"Đơn hàng",AI:"AI & Config",Sec:"Bảo mật" };

// Seed rows for a given roleId from PERM_MATRIX data
const seedRowsForRole = (roleId) => {
  // Map PERM_MATRIX "●◑○—" string into R/W/C/D/S/A booleans per doctype
  const pmMap = {};
  PERM_MATRIX.forEach(pm => {
    const key = pm.fn;
    const str = pm[roleId] || "——————";
    const chars = str.split("");
    // Interpret: ● = has permission, ◑ = own-only, ○/— = none
    // Map to level + individual bits based on common patterns
    const hasAny = chars[0]==="●" || chars[0]==="◑";
    const level = !hasAny ? "none" : chars[0]==="◑" ? "own" : "all";
    pmMap[key] = {
      level,
      R: chars[0]==="●"||chars[0]==="◑" ? 1 : 0,
      W: chars[1]==="●"||chars[1]==="◑" ? 1 : 0,
      C: chars[2]==="●"||chars[2]==="◑" ? 1 : 0,
      D: chars[3]==="●"||chars[3]==="◑" ? 1 : 0,
      S: chars[4]==="●"||chars[4]==="◑" ? 1 : 0,
      A: chars[5]==="●"||chars[5]==="◑" ? 1 : 0,
    };
  });
  // Apply to ROLE_PERM_DOCTYPES
  return ROLE_PERM_DOCTYPES.map(r => {
    const override = pmMap[r.doctype];
    if (override) return {...r, ...override};
    // Try partial match by doctype keywords
    const matchKey = Object.keys(pmMap).find(k => r.doctype.includes(k.split(" ")[0]));
    if (matchKey) return {...r, ...pmMap[matchKey]};
    return roleId === "admin"
      ? {...r, level:"all", R:1, W:1, C:1, D:1, S:1, A:1}
      : {...r, level:"none", R:0, W:0, C:0, D:0, S:0, A:0};
  });
};

const EditRolePermissions = ({ roleId = "sales", onBack }) => {
  const roleMeta = ROLE_META[roleId] || ROLE_META.sales;
  const initRows = seedRowsForRole(roleId);
  const [rows, setRows]           = useState(initRows);
  const [originalRows]            = useState(initRows);
  const [expandedModules, setExpandedModules] = useState(["Chat","Quote"]);
  const [diff, setDiff]           = useState([]);
  const [saving, setSaving]       = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [confirmMsg, setConfirmMsg]   = useState(null);
  const [toast, setToast]         = useState(null);
  const [noteEdit, setNoteEdit]   = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const changesCount = diff.length;
  const allModules   = [...new Set(rows.map(r=>r.module))];

  const toggleModule = (mod) => setExpandedModules(prev=>prev.includes(mod)?prev.filter(m=>m!==mod):[...prev,mod]);

  // Update a row's level
  const setLevel = (doctype, level) => {
    setRows(prev => prev.map(r => {
      if (r.doctype !== doctype) return r;
      if (level === "none") return {...r,level:"none",R:0,W:0,C:0,D:0,S:0,A:0};
      return {...r,level};
    }));
    recordDiff(doctype,"level",rows.find(r=>r.doctype===doctype)?.level,level);
  };

  // Toggle a perm checkbox with dependency enforcement
  const togglePerm = (doctype, perm, currentVal) => {
    setRows(prev => prev.map(r => {
      if (r.doctype !== doctype) return r;
      let newR = {...r};
      const newVal = currentVal ? 0 : 1;

      if (perm === "R" && !newVal) {
        // Uncheck R → must uncheck all others
        setConfirmMsg({
          msg:`Tắt Read sẽ đồng thời tắt: Write, Create, Delete, Submit, Amend của "${doctype}". Tiếp tục?`,
          onConfirm:()=>{
            setRows(p=>p.map(x=>x.doctype===doctype?{...x,R:0,W:0,C:0,D:0,S:0,A:0}:x));
            ["W","C","D","S","A"].forEach(c=>recordDiff(doctype,c,1,0));
            recordDiff(doctype,"R",1,0);
            setConfirmMsg(null);
          }
        });
        return r; // don't change yet — wait for confirm
      }
      if ((perm==="W"||perm==="C"||perm==="D"||perm==="S"||perm==="A") && newVal && !r.R) {
        // Need R first
        newR.R = 1;
        recordDiff(doctype,"R",0,1);
        showToast(`Read được bật tự động vì bạn grant ${perm}`);
      }
      if (perm==="S" && newVal && !r.W) { newR.W=1; recordDiff(doctype,"W",0,1); }
      if (perm==="A" && newVal && !r.S) { newR.S=1; newR.W=1; recordDiff(doctype,"S",0,1); }

      newR[perm] = newVal;
      recordDiff(doctype, perm, currentVal, newVal);
      return newR;
    }));
  };

  const recordDiff = (doctype,code,oldV,newV) => {
    if (oldV === newV) return;
    setDiff(prev=>{
      const filtered = prev.filter(d=>!(d.doctype===doctype&&d.code===code));
      return [...filtered,{doctype,code,oldV,newV}];
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(()=>{
      setSaving(false);
      showToast(`Đã cập nhật quyền ${roleMeta.label}. Redis invalidated.`);
      setDiff([]);
    },900);
  };

  const historyEntries = [
    { who:"admin@remak.vn", what:"Quote/Submit: OFF→ON",        at:"2 giờ trước" },
    { who:"admin@remak.vn", what:"KB Document: No access→Own",  at:"1 ngày trước" },
    { who:"admin@remak.vn", what:"Conversation/Write: ON→OFF",  at:"3 ngày trước" },
    { who:"admin@remak.vn", what:"User/Read: ON→OFF",           at:"1 tuần trước" },
    { who:"admin@remak.vn", what:"Dashboard/Read: OFF→ON",      at:"2 tuần trước" },
  ];

  const affectedUsers = 12; // mock

  return (
    <div style={{ padding:28,position:"relative",fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>{toast.msg}</div>}

      {/* Breadcrumb */}
      <div style={{ fontSize:11,color:T.textLight,marginBottom:14,display:"flex",alignItems:"center",gap:6 }}>
        <span style={{ cursor:"pointer",color:T.blue }} onClick={onBack}>Quản lý Người dùng</span>
        <span>›</span><span style={{ cursor:"pointer",color:T.blue }}>Permission Matrix</span>
        <span>›</span><span style={{ color:T.textMid,fontWeight:600 }}>Chỉnh sửa quyền: {roleMeta.label}</span>
      </div>

      {/* Role header */}
      <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 20px",marginBottom:18,display:"flex",alignItems:"center",gap:14 }}>
        <span style={{ fontSize:28 }}>{roleMeta.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:3 }}>
            <div style={{ fontWeight:800,fontSize:20,color:T.text }}>{roleMeta.label}</div>
            <span style={{ fontSize:10,fontWeight:700,background:T.greenLight,color:T.greenDark,padding:"2px 8px",borderRadius:5 }}>P1 ACTIVE</span>
          </div>
          <div style={{ fontSize:11,color:T.textLight }}>{roleMeta.desc}</div>
        </div>
        <div style={{ display:"flex",gap:14,fontSize:12,color:T.textMid }}>
          <div style={{ textAlign:"center" }}><div style={{ fontWeight:700,fontSize:16,color:T.text }}>{affectedUsers}</div><div>users</div></div>
          <div style={{ textAlign:"center" }}><div style={{ fontWeight:700,fontSize:16,color:T.text }}>{rows.filter(r=>r.level!=="none").length}</div><div>DocTypes</div></div>
          <div style={{ textAlign:"center" }}><div style={{ fontWeight:700,fontSize:16,color:T.text }}>{rows.reduce((s,r)=>s+r.R+r.W+r.C+r.D+r.S+r.A,0)}</div><div>permissions</div></div>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <Btn variant="secondary" size="sm" onClick={()=>setHistoryOpen(true)}>📜 Lịch sử</Btn>
          <Btn variant="secondary" size="sm" onClick={()=>setPreviewModal(true)}>👁 Xem đầy đủ</Btn>
          <Btn variant="secondary" size="sm" onClick={onBack}>← Quay lại</Btn>
        </div>
      </div>

      {/* Main: accordion + side panel */}
      <div style={{ display:"flex",gap:18,alignItems:"flex-start" }}>

        {/* Permission toggle table */}
        <div style={{ flex:1 }}>
          {allModules.map(mod => {
            const modRows = rows.filter(r=>r.module===mod);
            const isExp   = expandedModules.includes(mod);
            return (
              <div key={mod} style={{ marginBottom:10,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden" }}>
                {/* Accordion header */}
                <div onClick={()=>toggleModule(mod)} style={{ padding:"11px 16px",background:MOD_COLORS_EDIT[mod]+"12",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:isExp?`1px solid ${T.border}`:"none" }}>
                  <span style={{ fontSize:14,color:MOD_COLORS_EDIT[mod],fontWeight:800 }}>{isExp?"▼":"▶"}</span>
                  <span style={{ fontWeight:700,fontSize:13,color:T.text }}>{MOD_NAMES_EDIT[mod]||mod}</span>
                  <span style={{ fontSize:11,color:T.textLight }}>({modRows.length} DocTypes · {modRows.filter(r=>r.level!=="none").length} granted)</span>
                  <div style={{ marginLeft:"auto",display:"flex",gap:6 }}>
                    <Btn variant="ghost" size="sm" onClick={e=>{e.stopPropagation();}} style={{ fontSize:10 }}>Grant Read all</Btn>
                    <Btn variant="ghost" size="sm" onClick={e=>{e.stopPropagation();}} style={{ fontSize:10,color:T.red }}>Revoke all</Btn>
                  </div>
                </div>

                {isExp && (
                  <div>
                    {/* Column headers */}
                    <div style={{ display:"grid",gridTemplateColumns:"200px 130px 1fr",background:T.bg,padding:"6px 16px",fontSize:9,fontWeight:700,color:T.textLight,letterSpacing:"0.07em",textTransform:"uppercase",borderBottom:`1px solid ${T.border}` }}>
                      <div>DocType</div>
                      <div>Level</div>
                      <div style={{ display:"flex",gap:0 }}>
                        {PERM_CODES.map(c=><div key={c} style={{ width:32,textAlign:"center" }}>{c}</div>)}
                      </div>
                    </div>

                    {modRows.map((row,ri) => {
                      const active = row.level !== "none";
                      return (
                        <div key={row.doctype} style={{ display:"grid",gridTemplateColumns:"200px 130px 1fr",padding:"9px 16px",borderBottom:ri<modRows.length-1?`1px solid ${T.border}`:"none",background:ri%2===0?T.card:"rgba(244,246,243,.4)",alignItems:"center" }}>
                          {/* DocType name */}
                          <div style={{ fontSize:12,fontWeight:600,color:active?T.text:T.textLight }}>{row.doctype}</div>

                          {/* Level 3-way toggle */}
                          <div style={{ display:"flex",border:`1px solid ${T.border}`,borderRadius:6,overflow:"hidden",width:"fit-content" }}>
                            {LEVEL_OPTS.map(opt=>(
                              <button key={opt.value} onClick={()=>setLevel(row.doctype,opt.value)}
                                style={{ border:"none",cursor:"pointer",padding:"4px 8px",fontSize:9,fontWeight:700,background:row.level===opt.value?opt.color:"transparent",color:row.level===opt.value?"#fff":T.textLight,transition:"all .12s",whiteSpace:"nowrap" }}>
                                {opt.label}
                              </button>
                            ))}
                          </div>

                          {/* R/W/C/D/S/A checkboxes */}
                          <div style={{ display:"flex",gap:0 }}>
                            {PERM_CODES.map(code=>{
                              const val   = row[code];
                              const disabled = !active || (code==="W"&&!row.R)||(code==="C"&&!row.R)||(code==="D"&&!row.R)||(code==="S"&&!row.W)||(code==="A"&&!row.S);
                              return (
                                <div key={code} style={{ width:32,display:"flex",alignItems:"center",justifyContent:"center" }}>
                                  <div onClick={()=>!disabled&&togglePerm(row.doctype,code,val)} style={{
                                    width:18,height:18,borderRadius:4,cursor:disabled?"not-allowed":"pointer",
                                    border:`1.5px solid ${val?"#4ADE80":disabled?"#E5E7EB":T.border}`,
                                    background: val?"#4ADE80":disabled?"#F9FAFB":"#fff",
                                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all .12s",
                                  }}>
                                    {val===1 && <span style={{ fontSize:10,color:"#fff",fontWeight:900 }}>✓</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live diff side panel */}
        <div style={{ width:280,flexShrink:0,position:"sticky",top:20 }}>
          <Card style={{ padding:16 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:10 }}>Live Diff</div>

            {diff.length === 0 ? (
              <div style={{ fontSize:11,color:T.textLight,fontStyle:"italic",textAlign:"center",padding:"12px 0" }}>Chưa có thay đổi.</div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:5,maxHeight:320,overflowY:"auto" }}>
                {diff.map((d,i)=>(
                  <div key={i} style={{ fontSize:10,padding:"5px 8px",borderRadius:5,background:d.newV>d.oldV?"#F0FDF4":"#FEF2F2",border:`1px solid ${d.newV>d.oldV?"#86EFAC":"#FECACA"}`,color:d.newV>d.oldV?T.greenDark:T.red }}>
                    <span style={{ fontWeight:700 }}>{d.newV>d.oldV?"[+]":"[−]"}</span> {d.doctype} / {d.code}: {d.oldV?"ON":"OFF"} → {d.newV?"ON":"OFF"}
                  </div>
                ))}
              </div>
            )}

            {changesCount > 0 && (
              <div style={{ marginTop:10,padding:"8px 10px",background:T.bg,borderRadius:6,fontSize:11,color:T.textMid,borderTop:`1px solid ${T.border}` }}>
                Thay đổi ảnh hưởng <b style={{ color:T.orange }}>{affectedUsers} users</b> đang có role này.
              </div>
            )}

            {changesCount > 0 && (
              <Btn variant="secondary" size="sm" style={{ width:"100%",justifyContent:"center",marginTop:8 }} onClick={()=>setPreviewModal(true)}>
                👁 Xem quyền hoàn chỉnh
              </Btn>
            )}
          </Card>
        </div>
      </div>

      {/* Sticky action bar */}
      {changesCount > 0 && (
        <div style={{ position:"sticky",bottom:0,left:0,right:0,background:T.card,borderTop:`2px solid ${T.green}`,padding:"12px 28px",display:"flex",alignItems:"center",gap:12,marginLeft:-28,marginRight:-28,zIndex:50,marginTop:18 }}>
          <span style={{ fontSize:12,color:T.textMid,fontWeight:600 }}>
            <span style={{ color:T.orange,fontWeight:800 }}>{changesCount}</span> thay đổi chưa lưu
          </span>
          <div style={{ marginLeft:"auto",display:"flex",gap:10 }}>
            <Btn variant="secondary" onClick={()=>{setDiff([]);setRows(originalRows.map(r=>({...r})));}}>↺ Hủy tất cả</Btn>
            <button onClick={handleSave} disabled={saving} style={{ border:"none",borderRadius:7,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:saving?"not-allowed":"pointer",background:saving?T.greenDark:T.green,color:"#fff",display:"flex",alignItems:"center",gap:8 }}>
              {saving?<><span style={{ width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }} />Đang lưu...</>:`💾 Lưu ${changesCount} thay đổi`}
            </button>
          </div>
        </div>
      )}

      {/* Confirm dialog */}
      {confirmMsg && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:400,padding:24 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:10 }}>⚠️ Xác nhận thay đổi</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:18 }}>{confirmMsg.msg}</div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setConfirmMsg(null)}>Hủy</Btn>
              <Btn variant="danger" onClick={confirmMsg.onConfirm}>Xác nhận</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* History drawer */}
      {historyOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"flex-end",zIndex:999 }} onClick={()=>setHistoryOpen(false)}>
          <div style={{ width:400,height:"100vh",background:T.card,padding:24,overflowY:"auto",boxShadow:"-4px 0 20px rgba(0,0,0,.15)" }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              📜 Lịch sử thay đổi quyền <Btn variant="ghost" size="sm" onClick={()=>setHistoryOpen(false)}>✕</Btn>
            </div>
            {historyEntries.map((h,i)=>(
              <div key={i} style={{ padding:"10px 0",borderBottom:i<historyEntries.length-1?`1px solid ${T.border}`:"none" }}>
                <div style={{ fontSize:12,fontWeight:600,color:T.text }}>{h.what}</div>
                <div style={{ fontSize:10,color:T.textLight,marginTop:2 }}>{h.who} · {h.at}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:560,maxHeight:"80vh",overflowY:"auto",padding:24 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              👁 Quyền hoàn chỉnh sau khi áp dụng <Btn variant="ghost" size="sm" onClick={()=>setPreviewModal(false)}>✕</Btn>
            </div>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:11 }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["DocType","Level","R","W","C","D","S","A"].map(h=>(
                    <th key={h} style={{ padding:"6px 8px",textAlign:"left",fontWeight:700,color:T.textLight,letterSpacing:"0.05em",textTransform:"uppercase",fontSize:9 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={r.doctype} style={{ borderTop:`1px solid ${T.border}`,background:r.level==="none"?"rgba(0,0,0,.02)":i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"6px 8px",fontWeight:600,color:r.level==="none"?T.textLight:T.text }}>{r.doctype}</td>
                    <td style={{ padding:"6px 8px" }}>
                      <span style={{ fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:r.level==="none"?T.bg:r.level==="own"?"#DBEAFE":"#DCFCE7",color:r.level==="none"?T.textLight:r.level==="own"?"#1D4ED8":"#166534" }}>
                        {r.level==="none"?"No access":r.level==="own"?"Own":"All"}
                      </span>
                    </td>
                    {PERM_CODES.map(c=>(
                      <td key={c} style={{ padding:"6px 8px",textAlign:"center",fontSize:13,color:r[c]?"#4ADE80":"#E5E7EB",fontWeight:800 }}>
                        {r[c]?"●":"○"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};


// ─── PAGE: CREATE CUSTOM ROLE  (US-S0-003 v5.1 — Screen 6) ──────────────────
// /admin/roles/new — 3-step wizard

const EXISTING_ROLE_IDS = ["admin","sales","trainer","cs","ncc","operations","finance","prod_manager","marketing","director"];
const PRESET_COLORS = ["#5B21B6","#2563EB","#538A1F","#9A3412","#0E7490","#D97706","#059669","#EA580C","#8B5CF6","#EC4899","#374151","#1F2937"];

const CreateCustomRole = ({ onBack, onCreated, profiles = ROLE_PROFILES_INIT }) => {
  const [step, setStep]           = useState(1);
  const [roleId, setRoleId]       = useState("");
  const [roleIdError, setRoleIdError] = useState("");
  const [roleIdOk, setRoleIdOk]   = useState(false);
  const [roleName, setRoleName]   = useState("");
  const [roleDesc, setRoleDesc]   = useState("");
  const [rolePhase, setRolePhase] = useState("P1");
  const [roleColor, setRoleColor] = useState(PRESET_COLORS[0]);
  const [bootstrapFrom, setBootstrapFrom] = useState("");
  const [permRows, setPermRows]   = useState(ROLE_PERM_DOCTYPES.map(r=>({...r,level:"none",R:0,W:0,C:0,D:0,S:0,A:0})));
  const [saving, setSaving]       = useState(false);
  const [created, setCreated]     = useState(null);
  const [zeroPermWarning, setZeroPermWarning] = useState(false);
  const [toast, setToast]         = useState(null);

  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // Role ID: auto-generate + validate
  const handleNameChange = (val) => {
    setRoleName(val);
    const gen = val.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
    setRoleId(gen);
    validateId(gen);
  };

  const validateId = (id) => {
    if (!id) { setRoleIdError(""); setRoleIdOk(false); return; }
    if (EXISTING_ROLE_IDS.includes(id)) {
      setRoleIdError(`"${id}" đã tồn tại. Thử: ${id}_2`);
      setRoleIdOk(false);
    } else if (!/^[a-z][a-z0-9_]*$/.test(id)) {
      setRoleIdError("Chỉ chứa chữ thường, số, dấu gạch dưới. Bắt đầu bằng chữ.");
      setRoleIdOk(false);
    } else {
      setRoleIdError(""); setRoleIdOk(true);
    }
  };

  const step1Valid = roleId && roleIdOk && roleName.trim() && roleDesc.trim().length >= 20;

  // Bootstrap perms from existing role
  const applyBootstrap = (fromRole) => {
    setBootstrapFrom(fromRole);
    if (!fromRole) { setPermRows(ROLE_PERM_DOCTYPES.map(r=>({...r,level:"none",R:0,W:0,C:0,D:0,S:0,A:0}))); return; }
    const seed = ROLE_PERM_DOCTYPES.map(r => {
      // copy a subset based on role
      if (fromRole==="cs" && ["Chat","Quote"].includes(r.module)) return {...r,level:"own",R:1,W:1};
      if (fromRole==="sales" && ["Chat","Quote","Order","Dash"].includes(r.module)) return {...r,level:"own",R:1};
      return {...r,level:"none",R:0,W:0,C:0,D:0,S:0,A:0};
    });
    setPermRows(seed);
    showToast(`Đã copy permissions từ ${ROLE_META[fromRole]?.label||fromRole}`);
  };

  const applyPreset = (preset) => {
    if (preset==="read_all")   setPermRows(permRows.map(r=>({...r,level:"all",R:1,W:0,C:0,D:0,S:0,A:0})));
    if (preset==="rw_all")     setPermRows(permRows.map(r=>({...r,level:"all",R:1,W:1,C:1,D:0,S:0,A:0})));
    if (preset==="clear")      setPermRows(permRows.map(r=>({...r,level:"none",R:0,W:0,C:0,D:0,S:0,A:0})));
    showToast(`Áp dụng preset "${preset}"`);
  };

  const togglePermRow = (doctype, code, val) => {
    setPermRows(prev => prev.map(r => {
      if (r.doctype !== doctype) return r;
      let n = {...r};
      if (code==="level") return {...n,level:val,...(val==="none"?{R:0,W:0,C:0,D:0,S:0,A:0}:{})};
      if (!n.R && code!=="R") { n.R=1; }
      n[code] = val?0:1;
      return n;
    }));
  };

  const grantedCount = permRows.filter(r=>r.level!=="none").length;
  const totalPerms   = permRows.reduce((s,r)=>s+r.R+r.W+r.C+r.D+r.S+r.A,0);

  const handleCreate = () => {
    if (totalPerms === 0) { setZeroPermWarning(true); return; }
    doCreate();
  };

  const doCreate = () => {
    setSaving(true);
    setZeroPermWarning(false);
    setTimeout(()=>{
      setSaving(false);
      setCreated({ id:roleId, name:roleName, phase:rolePhase, color:roleColor });
      showToast(`Đã tạo role "${roleName}"!`);
    },800);
  };

  // ── Post-create suggestions ───────────────────────────────────────────────
  if (created) return (
    <div style={{ padding:28,maxWidth:560,margin:"0 auto",textAlign:"center" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:T.green,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}
      <div style={{ fontSize:40,marginBottom:12 }}>🎉</div>
      <div style={{ fontWeight:800,fontSize:20,color:T.text,marginBottom:6 }}>Role "{created.name}" đã được tạo!</div>
      <div style={{ fontSize:12,color:T.textLight,marginBottom:24 }}>
        Role ID: <code style={{ background:T.bg,padding:"1px 6px",borderRadius:3 }}>{created.id}</code> · Phase: {created.phase}
      </div>
      <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
        <Btn variant="primary" onClick={()=>onCreated&&onCreated(created.id)}>⚙️ Chỉnh sửa quyền</Btn>
        <Btn variant="secondary" onClick={onBack}>👥 Thêm vào Role Profile</Btn>
        <Btn variant="secondary" onClick={onBack}>← Về danh sách</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ padding:28,fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:T.green,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}

      {/* Breadcrumb */}
      <div style={{ fontSize:11,color:T.textLight,marginBottom:14,display:"flex",alignItems:"center",gap:6 }}>
        <span style={{ cursor:"pointer",color:T.blue }} onClick={onBack}>Quản lý Người dùng</span>
        <span>›</span><span style={{ color:T.textMid,fontWeight:600 }}>Tạo Custom Role mới</span>
      </div>

      {/* Stepper */}
      <div style={{ display:"flex",alignItems:"center",marginBottom:24 }}>
        {[{n:1,l:"Thông tin cơ bản"},{n:2,l:"Khởi tạo quyền"},{n:3,l:"Xác nhận & Tạo"}].map((s,i)=>{
          const done=step>s.n; const cur=step===s.n;
          return (
            <div key={s.n} style={{ display:"flex",alignItems:"center",flex:1 }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:1 }}>
                <div style={{ width:30,height:30,borderRadius:"50%",background:done?T.green:cur?T.green:T.border,color:done||cur?"#fff":T.textLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,cursor:done?"pointer":"default" }} onClick={()=>done&&setStep(s.n)}>
                  {done?"✓":s.n}
                </div>
                <span style={{ fontSize:10,color:cur?T.green:done?T.greenDark:T.textLight,fontWeight:cur?700:400,textAlign:"center" }}>{s.l}</span>
              </div>
              {i<2&&<div style={{ height:2,flex:1,background:done?T.green:T.border,marginBottom:18,marginTop:-8 }} />}
            </div>
          );
        })}
      </div>

      <Card style={{ padding:24 }}>
        {/* ── STEP 1 ─────────────────────────────────────────────────────── */}
        {step===1 && (
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:4 }}>Bước 1 — Thông tin cơ bản</div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Tên hiển thị <span style={{ color:T.red }}>*</span></label>
                <Input placeholder='VD: "Quality Assurance"' value={roleName} onChange={e=>handleNameChange(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>
                  Role ID (slug) <span style={{ color:T.red }}>*</span>
                  <span style={{ fontWeight:400,color:T.textLight,marginLeft:4 }}>— tự động tạo, immutable</span>
                </label>
                <div style={{ position:"relative" }}>
                  <Input
                    value={roleId}
                    onChange={e=>{ setRoleId(e.target.value); validateId(e.target.value); }}
                    placeholder="quality_assurance"
                    style={{ border:`1px solid ${roleIdOk?T.green:roleIdError?T.red:T.border}` }}
                  />
                  {roleIdOk && <span style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:T.green,fontSize:14 }}>✓</span>}
                </div>
                {roleIdError && <div style={{ fontSize:11,color:T.red,marginTop:3 }}>⚠ {roleIdError}</div>}
              </div>

              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>
                  Mô tả <span style={{ color:T.red }}>*</span>
                  <span style={{ fontWeight:400,color:T.textLight,marginLeft:4 }}>— tối thiểu 20 ký tự</span>
                </label>
                <textarea value={roleDesc} onChange={e=>setRoleDesc(e.target.value)}
                  placeholder="Giải thích role dành cho bộ phận nào, trách nhiệm gì, khác gì so với roles hiện có..."
                  rows={3} style={{ width:"100%",border:`1px solid ${roleDesc.length>=20?T.green:T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,color:T.text,resize:"vertical",outline:"none",boxSizing:"border-box" }} />
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:roleDesc.length>=20?T.green:T.textLight,marginTop:2 }}>
                  <span>{roleDesc.length>=20?"✅ Đủ mô tả":"Cần tối thiểu 20 ký tự"}</span>
                  <span>{roleDesc.length} ký tự</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:8 }}>Phase</label>
                {[["P1","P1 — Hoạt động ngay (is_active=TRUE)"],["P2","P2 — Lưu trữ, kích hoạt sau (is_active=FALSE)"]].map(([v,l])=>(
                  <label key={v} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer",fontSize:12 }}>
                    <input type="radio" checked={rolePhase===v} onChange={()=>setRolePhase(v)} style={{ accentColor:T.green }} />
                    <span style={{ fontWeight:rolePhase===v?700:400,color:T.text }}>{l}</span>
                  </label>
                ))}
              </div>

              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:8 }}>Màu badge</label>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {PRESET_COLORS.map(c=>(
                    <div key={c} onClick={()=>setRoleColor(c)} style={{ width:24,height:24,borderRadius:"50%",background:c,cursor:"pointer",border:`2px solid ${roleColor===c?"#fff":"transparent"}`,boxShadow:roleColor===c?`0 0 0 2px ${c}`:""}} />
                  ))}
                </div>
                <div style={{ marginTop:8,display:"flex",alignItems:"center",gap:8 }}>
                  <span style={{ fontSize:11,fontWeight:700,background:roleColor+"20",color:roleColor,padding:"3px 12px",borderRadius:5,border:`1px solid ${roleColor}40` }}>
                    {roleName||"Tên role"} Preview
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display:"flex",gap:10,justifyContent:"flex-end",paddingTop:8,borderTop:`1px solid ${T.border}` }}>
              <Btn variant="secondary" onClick={onBack}>Hủy</Btn>
              <Btn variant="primary" disabled={!step1Valid} onClick={()=>setStep(2)}>Tiếp theo →</Btn>
            </div>
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────────── */}
        {step===2 && (
          <div>
            <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:14 }}>Bước 2 — Khởi tạo quyền cho role</div>

            <div style={{ display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center" }}>
              <select value={bootstrapFrom} onChange={e=>applyBootstrap(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,background:T.card }}>
                <option value="">Bắt đầu từ trống (0 quyền)</option>
                {Object.keys(ROLE_META).map(r=><option key={r} value={r}>Copy từ: {ROLE_META[r].label}</option>)}
              </select>
              <div style={{ display:"flex",gap:6 }}>
                {[["read_all","📖 Read-only tất cả"],["rw_all","✏️ Read+Write tất cả"],["clear","🗑 Xóa tất cả"]].map(([p,l])=>(
                  <Btn key={p} variant="secondary" size="sm" onClick={()=>applyPreset(p)}>{l}</Btn>
                ))}
              </div>
              <span style={{ marginLeft:"auto",fontSize:11,color:T.textLight }}>{grantedCount} DocTypes · {totalPerms} perms</span>
            </div>

            {/* Compact permission grid */}
            <div style={{ border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden",maxHeight:380,overflowY:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse" }}>
                <thead style={{ position:"sticky",top:0,zIndex:5 }}>
                  <tr style={{ background:T.sidebar }}>
                    <th style={{ padding:"8px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",minWidth:160 }}>DocType</th>
                    <th style={{ padding:"8px 8px",fontSize:10,fontWeight:700,color:"rgba(255,255,255,.4)",minWidth:100,textAlign:"center" }}>Level</th>
                    {PERM_CODES.map(c=><th key={c} style={{ padding:"8px 4px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.35)",textAlign:"center",width:30 }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {permRows.map((row,i)=>{
                    const active=row.level!=="none";
                    return (
                      <tr key={row.doctype} style={{ borderTop:`1px solid ${T.border}`,background:i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                        <td style={{ padding:"6px 14px",fontSize:11,fontWeight:active?600:400,color:active?T.text:T.textLight }}>{row.doctype}</td>
                        <td style={{ padding:"6px 8px",textAlign:"center" }}>
                          <select value={row.level} onChange={e=>togglePermRow(row.doctype,"level",e.target.value)}
                            style={{ border:`1px solid ${T.border}`,borderRadius:5,padding:"2px 6px",fontSize:10,background:T.card,color:T.text }}>
                            <option value="none">No access</option>
                            <option value="own">Own only</option>
                            <option value="all">All records</option>
                          </select>
                        </td>
                        {PERM_CODES.map(c=>{
                          const v=row[c];
                          const dis=!active||(c==="W"&&!row.R)||(c==="C"&&!row.R)||(c==="D"&&!row.R)||(c==="S"&&!row.W)||(c==="A"&&!row.S);
                          return (
                            <td key={c} style={{ padding:"6px 4px",textAlign:"center" }}>
                              <div onClick={()=>!dis&&togglePermRow(row.doctype,c,v)} style={{ width:16,height:16,borderRadius:3,cursor:dis?"not-allowed":"pointer",border:`1.5px solid ${v?"#4ADE80":dis?"#E5E7EB":T.border}`,background:v?"#4ADE80":dis?"#F9FAFB":"#fff",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto" }}>
                                {v===1&&<span style={{ fontSize:9,color:"#fff",fontWeight:900 }}>✓</span>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display:"flex",gap:10,justifyContent:"space-between",paddingTop:14,borderTop:`1px solid ${T.border}`,marginTop:14 }}>
              <Btn variant="secondary" onClick={()=>setStep(1)}>← Bước 1</Btn>
              <Btn variant="primary" onClick={()=>setStep(3)}>Xem tổng kết →</Btn>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────────── */}
        {step===3 && (
          <div>
            <div style={{ fontWeight:800,fontSize:16,color:T.text,marginBottom:18 }}>Bước 3 — Xác nhận & Tạo</div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
              {[
                ["Role ID",     <code style={{ background:T.bg,padding:"1px 7px",borderRadius:3,fontSize:12 }}>{roleId}</code>],
                ["Tên hiển thị",<span style={{ fontWeight:700 }}>{roleName}</span>],
                ["Phase",       <span style={{ fontSize:11,fontWeight:700,background:rolePhase==="P1"?T.greenLight:T.yellowLight,color:rolePhase==="P1"?T.greenDark:"#92400E",padding:"2px 9px",borderRadius:5 }}>{rolePhase}</span>],
                ["Badge preview",<span style={{ fontSize:11,fontWeight:700,background:roleColor+"20",color:roleColor,padding:"3px 12px",borderRadius:5,border:`1px solid ${roleColor}40` }}>{roleName}</span>],
                ["DocTypes granted",<span style={{ fontWeight:700,color:T.text }}>{grantedCount} / {permRows.length}</span>],
                ["Tổng permissions",<span style={{ fontWeight:700,color:totalPerms>0?T.green:T.red }}>{totalPerms}</span>],
              ].map(([l,v])=>(
                <div key={l} style={{ background:T.bg,borderRadius:7,padding:"10px 14px" }}>
                  <div style={{ fontSize:10,color:T.textLight,marginBottom:3 }}>{l}</div>
                  <div>{v}</div>
                </div>
              ))}
              <div style={{ gridColumn:"1/-1",background:T.bg,borderRadius:7,padding:"10px 14px" }}>
                <div style={{ fontSize:10,color:T.textLight,marginBottom:3 }}>Mô tả</div>
                <div style={{ fontSize:12,color:T.textMid }}>{roleDesc}</div>
              </div>
            </div>

            <div style={{ display:"flex",gap:10,justifyContent:"space-between",paddingTop:14,borderTop:`1px solid ${T.border}` }}>
              <Btn variant="secondary" onClick={()=>setStep(2)}>← Bước 2</Btn>
              <button onClick={handleCreate} disabled={saving} style={{ border:"none",borderRadius:7,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:saving?"not-allowed":"pointer",background:saving?T.greenDark:T.green,color:"#fff",display:"flex",alignItems:"center",gap:8 }}>
                {saving?<><span style={{ width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }} />Đang tạo...</>:"🚀 Tạo Role"}
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Zero perm confirm */}
      {zeroPermWarning && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:420,padding:24 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:10 }}>⚠️ Role chưa có quyền nào</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:16 }}>
              Role này chưa được gán bất kỳ quyền nào. Users được gán sẽ không thấy màn hình nào. Tiếp tục?
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setZeroPermWarning(false)}>← Quay lại thêm quyền</Btn>
              <Btn variant="danger" onClick={doCreate}>Tạo dù chưa có quyền</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};


// ─── PAGE: KB UPLOAD ──────────────────────────────────────────────────────────
// US-S0-004 v2: Upload + Inline Category/Tag Assignment on document row

const FILE_TYPES = ["PDF","DOCX","XLSX","URL"];
const ALL_CATS_INIT = [
  { id:1, name:"Cách âm tiêu âm",  color:"#2563EB" },
  { id:2, name:"Cách nhiệt bảo ôn", color:"#6DB02B" },
  { id:3, name:"Chống cháy",        color:"#E8380D" },
  { id:4, name:"Bảo ôn lạnh",       color:"#0891B2" },
];
const ALL_TAGS_INIT = ["NRC Rating","STC","R-value","Fire Rating","Stonewool","AirReflex","Datasheet","Technical Spec"];
const KB_DOCS_INIT = [
  { id:1, name:"Catalogue_Stonewool_2024.pdf",  type:"PDF",  status:"active",     chunks:248, size:"12.4 MB", date:"08/06/2026", catIds:[1,2], tags:["Stonewool","NRC Rating"] },
  { id:2, name:"Datasheet_AirReflex.pdf",        type:"PDF",  status:"active",     chunks:86,  size:"3.2 MB",  date:"07/06/2026", catIds:[2],   tags:["AirReflex","R-value"] },
  { id:3, name:"Fire_Rating_Standards.docx",     type:"DOCX", status:"processing", chunks:0,   size:"2.1 MB",  date:"08/06/2026", catIds:[3],   tags:["Fire Rating"], etlPct:45 },
  { id:4, name:"Product_Spec_Table.xlsx",        type:"XLSX", status:"active",     chunks:124, size:"1.8 MB",  date:"06/06/2026", catIds:[1,2,3,4], tags:["Technical Spec","STC"] },
  { id:5, name:"https://tieuam.com/stonewool",   type:"URL",  status:"error",      chunks:0,   size:"—",       date:"05/06/2026", catIds:[],    tags:[], errMsg:"Timeout: không crawl được nội dung" },
  { id:6, name:"NRC_Technical_Guide.pdf",        type:"PDF",  status:"processing", chunks:0,   size:"5.7 MB",  date:"08/06/2026", catIds:[1],   tags:["NRC Rating"], etlPct:12 },
];
const FAKE_FILES = [
  { name:"Acoustic_Panel_Spec.pdf",   type:"PDF",  size:"4.2 MB" },
  { name:"Thermal_Insulation_v2.pdf", type:"PDF",  size:"8.1 MB" },
  { name:"Fire_Board_Datasheet.docx", type:"DOCX", size:"1.6 MB" },
  { name:"Product_Pricing_Q2.xlsx",   type:"XLSX", size:"2.3 MB" },
];

// ── Inline Category Dropdown (auto-save, multi-select) ──────────────────────
const InlineCatDropdown = ({ docId, catIds, allCats, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = { current: null };

  return (
    <div style={{ position:"relative" }} ref={r => { ref.current = r; }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display:"flex", flexWrap:"wrap", gap:3, alignItems:"center",
          minWidth:120, padding:"4px 7px", borderRadius:6, cursor:"pointer",
          border:`1px solid ${open ? T.green : T.border}`,
          background: open ? T.greenLight : T.card,
          transition:"all .15s",
        }}
      >
        {catIds.length === 0
          ? <span style={{ fontSize:11, color:T.textLight, fontStyle:"italic" }}>+ Gán danh mục</span>
          : catIds.map(cid => {
              const c = allCats.find(x => x.id === cid);
              return c ? (
                <span key={cid} style={{
                  fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:3,
                  background: c.color+"1A", color: c.color, border:`1px solid ${c.color}40`,
                }}>
                  {c.name.length > 12 ? c.name.slice(0,12)+"…" : c.name}
                </span>
              ) : null;
            })
        }
        <span style={{ marginLeft:"auto", fontSize:9, color:T.textLight }}>▾</span>
      </div>
      {open && (
        <div style={{
          position:"absolute", top:"100%", left:0, zIndex:200, marginTop:3,
          background:T.card, border:`1px solid ${T.border}`, borderRadius:8,
          boxShadow:"0 4px 16px rgba(0,0,0,.12)", minWidth:200, padding:6,
        }}>
          <div style={{ fontSize:10, color:T.textLight, padding:"4px 8px 6px", fontWeight:700, letterSpacing:"0.06em" }}>
            CHỌN DANH MỤC (nhiều)
          </div>
          {allCats.map(cat => {
            const selected = catIds.includes(cat.id);
            return (
              <div key={cat.id}
                onClick={e => { e.stopPropagation(); onChange(selected ? catIds.filter(id=>id!==cat.id) : [...catIds, cat.id]); }}
                style={{
                  display:"flex", alignItems:"center", gap:8, padding:"7px 10px",
                  borderRadius:6, cursor:"pointer",
                  background: selected ? cat.color+"1A" : "transparent",
                  transition:"background .12s",
                }}
              >
                <div style={{
                  width:14, height:14, borderRadius:3, flexShrink:0,
                  background: selected ? cat.color : "transparent",
                  border:`1.5px solid ${selected ? cat.color : T.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  {selected && <span style={{ fontSize:9, color:"#fff", fontWeight:900 }}>✓</span>}
                </div>
                <span style={{ fontSize:12, fontWeight: selected?700:400, color: selected?cat.color:T.text }}>{cat.name}</span>
              </div>
            );
          })}
          <div style={{ borderTop:`1px solid ${T.border}`, marginTop:4, paddingTop:4 }}>
            <div
              onClick={e => { e.stopPropagation(); setOpen(false); }}
              style={{ fontSize:11, color:T.green, fontWeight:600, padding:"5px 10px", cursor:"pointer", textAlign:"center" }}
            >
              ✅ Lưu tự động — Đóng
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Inline Tag Input (chip, creatable, autocomplete) ─────────────────────────
const InlineTagInput = ({ docId, tags, tagPool, onChange, onCreateTag }) => {
  const [inputVal, setInputVal]   = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const suggestions = tagPool.filter(t =>
    t.toLowerCase().includes(inputVal.toLowerCase()) &&
    !tags.includes(t) && inputVal.length > 0
  );

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (!tagPool.includes(trimmed)) onCreateTag(trimmed);
    onChange([...tags, trimmed]);
    setInputVal("");
  };

  const removeTag = (tag) => onChange(tags.filter(t => t !== tag));

  return (
    <div style={{
      display:"flex", flexWrap:"wrap", gap:4, alignItems:"center",
      padding:"4px 7px", borderRadius:6,
      border:`1px solid ${inputFocus ? T.green : T.border}`,
      background: T.card, cursor:"text", minWidth:160, position:"relative",
      transition:"border .15s",
    }}
      onClick={() => document.getElementById(`tag-input-${docId}`)?.focus()}
    >
      {tags.map(tag => (
        <span key={tag} style={{
          fontSize:10, fontWeight:600, background:T.greenLight, color:T.greenDark,
          border:`1px solid ${T.greenMid}`, padding:"2px 6px", borderRadius:10,
          display:"inline-flex", alignItems:"center", gap:3,
        }}>
          🏷 {tag}
          <span
            onClick={e => { e.stopPropagation(); removeTag(tag); }}
            style={{ cursor:"pointer", opacity:0.6, fontSize:9, fontWeight:900 }}
          >✕</span>
        </span>
      ))}
      <input
        id={`tag-input-${docId}`}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setTimeout(() => setInputFocus(false), 180)}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
            e.preventDefault(); addTag(inputVal);
          }
          if (e.key === "Backspace" && !inputVal && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        }}
        placeholder={tags.length === 0 ? "+ Gõ tag, Enter để thêm" : ""}
        style={{
          border:"none", outline:"none", fontSize:11, color:T.text,
          background:"transparent", minWidth:80, width: inputVal ? inputVal.length*7+30 : 80,
        }}
      />
      {/* Autocomplete dropdown */}
      {inputFocus && (suggestions.length > 0 || inputVal.length > 0) && (
        <div style={{
          position:"absolute", top:"100%", left:0, zIndex:200, marginTop:3,
          background:T.card, border:`1px solid ${T.border}`, borderRadius:7,
          boxShadow:"0 4px 14px rgba(0,0,0,.1)", minWidth:180, overflow:"hidden",
        }}>
          {suggestions.map(s => (
            <div key={s} onMouseDown={e => { e.preventDefault(); addTag(s); }}
              style={{ padding:"7px 12px", fontSize:12, cursor:"pointer", color:T.text,
                display:"flex", alignItems:"center", gap:6 }}
            >
              🏷 {s}
            </div>
          ))}
          {inputVal.trim() && !tagPool.includes(inputVal.trim()) && (
            <div onMouseDown={e => { e.preventDefault(); addTag(inputVal.trim()); }}
              style={{ padding:"7px 12px", fontSize:12, cursor:"pointer",
                background:T.greenLight, color:T.greenDark, fontWeight:600,
                borderTop: suggestions.length>0 ? `1px solid ${T.border}` : "none",
                display:"flex", alignItems:"center", gap:6,
              }}
            >
              ✨ Tạo tag mới: <b>"{inputVal.trim()}"</b>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main KBUpload component ──────────────────────────────────────────────────
const KBUpload = () => {
  const [docs, setDocs]           = useState(KB_DOCS_INIT);
  const [allCats]                 = useState(ALL_CATS_INIT);
  const [tagPool, setTagPool]     = useState(ALL_TAGS_INIT);
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");
  const [dragOver, setDragOver]   = useState(false);
  const [urlInput, setUrlInput]   = useState("");
  const [urlError, setUrlError]   = useState("");
  const [uploading, setUploading] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast]         = useState(null);
  const [retrying, setRetrying]   = useState(null);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Simulate upload → processing (with ETL progress) → active
  const simulateUpload = (file) => {
    const uid = Date.now() + Math.random();
    setUploading(prev => [...prev, { id:uid, name:file.name, type:file.type, pct:0 }]);
    let pct = 0;
    const uploadIv = setInterval(() => {
      pct += Math.floor(Math.random() * 18) + 8;
      if (pct >= 100) {
        clearInterval(uploadIv);
        setUploading(prev => prev.filter(u => u.id !== uid));
        const newDoc = {
          id: Date.now(), name: file.name, type: file.type,
          status:"processing", chunks:0, size: file.size || "—",
          date: new Date().toLocaleDateString("vi-VN"),
          catIds:[], tags:[], etlPct:0,
        };
        setDocs(prev => [newDoc, ...prev]);
        showToast(`📤 "${file.name}" đã upload — ETL đang xử lý...`, "info");
        // ETL simulation
        let etl = 0;
        const etlIv = setInterval(() => {
          etl += Math.floor(Math.random() * 12) + 5;
          if (etl >= 100) {
            clearInterval(etlIv);
            const chunkCount = Math.floor(Math.random() * 180) + 40;
            setDocs(prev => prev.map(d =>
              d.name === file.name && d.status === "processing"
                ? { ...d, status:"active", chunks:chunkCount, etlPct:100 }
                : d
            ));
            showToast(`✅ "${file.name}" Active — ${chunkCount} chunks`, "success");
          } else {
            setDocs(prev => prev.map(d =>
              d.name === file.name && d.status === "processing"
                ? { ...d, etlPct: etl }
                : d
            ));
          }
        }, 420);
      } else {
        setUploading(prev => prev.map(u => u.id === uid ? { ...u, pct } : u));
      }
    }, 180);
  };

  const handleAddUrl = () => {
    if (!urlInput.startsWith("https://")) { setUrlError("URL phải bắt đầu bằng https://"); return; }
    setUrlError("");
    const newDoc = {
      id: Date.now(), name: urlInput, type:"URL",
      status:"processing", chunks:0, size:"—",
      date: new Date().toLocaleDateString("vi-VN"),
      catIds:[], tags:[], etlPct:0,
    };
    setDocs(prev => [newDoc, ...prev]);
    setUrlInput("");
    showToast("🔗 Đang crawl URL...", "info");
    let etl = 0;
    const iv = setInterval(() => {
      etl += Math.floor(Math.random() * 15) + 6;
      if (etl >= 100) {
        clearInterval(iv);
        const ok = Math.random() > 0.25;
        setDocs(prev => prev.map(d => d.name === newDoc.name
          ? ok
            ? { ...d, status:"active", chunks: Math.floor(Math.random()*80)+20, etlPct:100 }
            : { ...d, status:"error", errMsg:"Timeout: không crawl được nội dung" }
          : d
        ));
        showToast(ok ? "✅ Crawl thành công" : "❌ Crawl thất bại", ok?"success":"error");
      } else {
        setDocs(prev => prev.map(d => d.name === newDoc.name ? { ...d, etlPct: etl } : d));
      }
    }, 380);
  };

  const handleRetry = (doc) => {
    setRetrying(doc.id);
    setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, status:"processing", etlPct:0, errMsg:undefined } : d));
    let etl = 0;
    const iv = setInterval(() => {
      etl += Math.floor(Math.random() * 14) + 8;
      if (etl >= 100) {
        clearInterval(iv); setRetrying(null);
        setDocs(prev => prev.map(d => d.id === doc.id
          ? { ...d, status:"active", chunks: Math.floor(Math.random()*60)+20, etlPct:100 }
          : d
        ));
        showToast("✅ Xử lý lại thành công", "success");
      } else {
        setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, etlPct: etl } : d));
      }
    }, 340);
  };

  // Inline auto-save handlers
  const updateDocCats = (docId, catIds) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, catIds } : d));
    showToast("💾 Danh mục đã lưu tự động", "success");
  };

  const updateDocTags = (docId, tags) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, tags } : d));
    showToast("💾 Tag đã lưu tự động", "success");
  };

  const createTag = (tagName) => {
    if (!tagPool.includes(tagName)) {
      setTagPool(prev => [...prev, tagName]);
      showToast(`✨ Tag mới "${tagName}" đã tạo vào tag pool`, "info");
    }
  };

  const confirmDelete = () => {
    setDocs(docs.filter(d => d.id !== deleteConfirm.id));
    showToast(`🗑️ Đã xóa "${deleteConfirm.name}" và ${deleteConfirm.chunks||0} chunks`, "info");
    setDeleteConfirm(null);
  };

  const filtered = docs.filter(d => {
    const matchFilter = filter === "all" || d.status === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const typeIcon = t => ({ PDF:"📄", DOCX:"📝", XLSX:"📊", URL:"🔗" }[t] || "📄");

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20, position:"relative" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", top:20, right:24, zIndex:2000,
          background: toast.type==="success"?T.green : toast.type==="error"?T.orange : T.blue,
          color:"#fff", padding:"10px 18px", borderRadius:8, fontSize:13, fontWeight:600,
          boxShadow:"0 4px 16px rgba(0,0,0,.2)", maxWidth:360,
          display:"flex", alignItems:"center", gap:8,
        }}>
          {toast.type==="success"?"✅":toast.type==="error"?"❌":"ℹ️"} {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display:"flex", gap:14 }}>
        <StatCard label="Tổng tài liệu" value={docs.length} color={T.text} />
        <StatCard label="Active" value={docs.filter(d=>d.status==="active").length} color={T.green} />
        <StatCard label="Đang xử lý" value={docs.filter(d=>d.status==="processing").length+uploading.length} color={T.yellow}
          sub={uploading.length>0 ? `${uploading.length} đang upload`:undefined} />
        <StatCard label="Lỗi" value={docs.filter(d=>d.status==="error").length} color={T.orange} />
      </div>

      {/* Info callout */}
      <div style={{
        background:"#EFF6FF", border:`1px solid #BFDBFE`, borderRadius:8,
        padding:"10px 16px", display:"flex", gap:10, alignItems:"flex-start", fontSize:12,
      }}>
        <span style={{ fontSize:18 }}>💡</span>
        <div style={{ color:"#1D4ED8" }}>
          <b>Gán danh mục & tag ngay trên dòng tài liệu</b> sau khi upload — không cần điều hướng sang trang khác.
          Click vào cột <b>Danh mục</b> để chọn category, click cột <b>Tags</b> để gõ và tạo tag mới.
          Tất cả thay đổi được <b>lưu tự động</b>.
        </div>
      </div>

      <div style={{ display:"flex", gap:20 }}>

        {/* Upload panel */}
        <div style={{ width:290, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
          <Card style={{ padding:0, overflow:"hidden" }}>
            <div style={{ padding:"13px 16px", borderBottom:`1px solid ${T.border}`, fontWeight:700, fontSize:13, color:T.text }}>
              📤 Tải lên tài liệu
            </div>
            <div style={{ padding:16 }}>
              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => {
                  e.preventDefault(); setDragOver(false);
                  Array.from(e.dataTransfer.files).slice(0,3).forEach(f =>
                    simulateUpload({ name:f.name, type:f.name.split(".").pop().toUpperCase(), size:(f.size/1048576).toFixed(1)+" MB" })
                  );
                }}
                style={{
                  border:`2px dashed ${dragOver?T.green:T.border}`,
                  background: dragOver?T.greenLight:T.bg,
                  borderRadius:10, padding:"20px 14px", textAlign:"center", transition:"all .2s",
                }}
              >
                <div style={{ fontSize:26, marginBottom:5 }}>📂</div>
                <div style={{ fontSize:12, fontWeight:600, color:T.text, marginBottom:3 }}>Kéo thả file vào đây</div>
                <div style={{ fontSize:10, color:T.textLight, marginBottom:11 }}>PDF, DOCX, XLSX · Tối đa 50MB</div>
                <div style={{ display:"flex", gap:4, justifyContent:"center", flexWrap:"wrap" }}>
                  {FAKE_FILES.map(f => (
                    <button key={f.name} onClick={() => simulateUpload(f)} style={{
                      border:`1px solid ${T.border}`, borderRadius:5, background:T.card,
                      padding:"3px 9px", fontSize:10, cursor:"pointer", color:T.textMid,
                      display:"flex", alignItems:"center", gap:3,
                    }}>
                      {typeIcon(f.type)} {f.name.length>16 ? f.name.slice(0,16)+"…":f.name}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize:9, color:T.textLight, marginTop:6 }}>↑ Click file mẫu để demo</div>
              </div>

              {/* Upload queue */}
              {uploading.length > 0 && (
                <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:5 }}>
                  {uploading.map(u => (
                    <div key={u.id} style={{ background:T.bg, borderRadius:6, padding:"7px 10px", border:`1px solid ${T.border}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                        <span style={{ color:T.text, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:160 }}>{u.name}</span>
                        <span style={{ color:T.green, fontWeight:700 }}>{u.pct}%</span>
                      </div>
                      <div style={{ height:4, background:T.border, borderRadius:2 }}>
                        <div style={{ width:`${u.pct}%`, height:"100%", background:T.green, borderRadius:2, transition:"width .15s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* URL input */}
              <div style={{ marginTop:13, borderTop:`1px solid ${T.border}`, paddingTop:13 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textMid, marginBottom:6 }}>Hoặc thêm URL:</div>
                <Input placeholder="https://tieuam.com/..." value={urlInput}
                  onChange={e => { setUrlInput(e.target.value); setUrlError(""); }} icon="🔗" />
                {urlError && <div style={{ fontSize:11, color:T.red, marginTop:3 }}>⚠ {urlError}</div>}
                <Btn variant="primary" size="sm"
                  style={{ marginTop:7, width:"100%", justifyContent:"center" }}
                  onClick={handleAddUrl}
                >+ Thêm URL</Btn>
              </div>

              {/* Tag pool summary */}
              <div style={{ marginTop:13, borderTop:`1px solid ${T.border}`, paddingTop:13 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:6, letterSpacing:"0.06em" }}>TAG POOL ({tagPool.length} tags)</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {tagPool.slice(0,10).map(t => (
                    <span key={t} style={{ fontSize:9, background:T.greenLight, color:T.greenDark, padding:"2px 6px", borderRadius:8, border:`1px solid ${T.greenMid}` }}>
                      {t}
                    </span>
                  ))}
                  {tagPool.length > 10 && <span style={{ fontSize:9, color:T.textLight }}>+{tagPool.length-10}</span>}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Document list with INLINE category + tag */}
        <Card style={{ flex:1, overflow:"hidden" }}>
          {/* Toolbar */}
          <div style={{ padding:"11px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ flex:1, fontWeight:700, fontSize:13, color:T.text }}>Tài liệu KB</div>
            <Input placeholder="Tìm tài liệu..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width:170 }} />
            <div style={{ display:"flex", gap:3 }}>
              {[["all","Tất cả"],["active","Active"],["processing","Xử lý"],["error","Lỗi"]].map(([k,l]) => (
                <Btn key={k} variant={filter===k?"primary":"secondary"} size="sm" onClick={() => setFilter(k)}>{l}</Btn>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"minmax(160px,2fr) 54px minmax(160px,1.8fr) minmax(180px,2fr) 100px 60px 44px 44px",
            background:T.bg, padding:"8px 14px",
            borderBottom:`1px solid ${T.border}`,
          }}>
            {["Tên tài liệu","Loại","Danh mục ▾","Tags (Enter để thêm)","Trạng thái","Chunks","Ngày",""].map(h => (
              <div key={h} style={{ fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          <div style={{ overflowY:"auto", maxHeight:520 }}>
            {filtered.length === 0 && (
              <div style={{ padding:32, textAlign:"center", color:T.textLight, fontSize:13 }}>Không có tài liệu nào</div>
            )}
            {filtered.map((doc, i) => (
              <div key={doc.id} style={{
                display:"grid",
                gridTemplateColumns:"minmax(160px,2fr) 54px minmax(160px,1.8fr) minmax(180px,2fr) 100px 60px 44px 44px",
                padding:"10px 14px", borderBottom:`1px solid ${T.border}`,
                background: i%2===0 ? T.card : "rgba(244,246,243,.45)",
                alignItems:"start", gap:0,
              }}>

                {/* Name */}
                <div style={{ paddingRight:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:16, flexShrink:0 }}>{typeIcon(doc.type)}</span>
                    <div>
                      <div style={{
                        fontSize:12, fontWeight:600, color:T.text,
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:140,
                      }} title={doc.name}>
                        {doc.name.length>22 ? doc.name.slice(0,22)+"…" : doc.name}
                      </div>
                      <div style={{ fontSize:10, color:T.textLight }}>{doc.size} · {doc.date}</div>
                      {doc.errMsg && <div style={{ fontSize:9, color:T.red, marginTop:1 }}>⚠ {doc.errMsg}</div>}
                    </div>
                  </div>
                </div>

                {/* Type badge */}
                <div style={{ paddingTop:2 }}>
                  <span style={{ fontSize:10, fontWeight:700, background:T.blueLight, color:T.blue, padding:"2px 6px", borderRadius:4 }}>{doc.type}</span>
                </div>

                {/* Inline Category Dropdown */}
                <div style={{ paddingRight:8, paddingTop:1 }}>
                  <InlineCatDropdown
                    docId={doc.id}
                    catIds={doc.catIds}
                    allCats={allCats}
                    onChange={catIds => updateDocCats(doc.id, catIds)}
                  />
                </div>

                {/* Inline Tag Input */}
                <div style={{ paddingRight:8, paddingTop:1 }}>
                  <InlineTagInput
                    docId={doc.id}
                    tags={doc.tags}
                    tagPool={tagPool}
                    onChange={tags => updateDocTags(doc.id, tags)}
                    onCreateTag={createTag}
                  />
                </div>

                {/* Status + ETL progress */}
                <div style={{ paddingTop:2 }}>
                  <Badge status={doc.status} />
                  {doc.status === "processing" && (
                    <div style={{ marginTop:4 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:T.textLight, marginBottom:1 }}>
                        <span>ETL</span><span>{doc.etlPct||0}%</span>
                      </div>
                      <div style={{ width:80, height:3, background:T.border, borderRadius:2 }}>
                        <div style={{ width:`${doc.etlPct||0}%`, height:"100%", background:T.yellow, borderRadius:2, transition:"width .35s" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Chunks */}
                <div style={{ paddingTop:4, fontSize:12, fontWeight:doc.chunks>0?700:400, color:doc.chunks>0?T.green:T.textLight }}>
                  {doc.chunks||"—"}
                </div>

                {/* Retry / empty */}
                <div style={{ paddingTop:2 }}>
                  {doc.status==="error" && (
                    <Btn variant="secondary" size="sm" onClick={() => handleRetry(doc)} disabled={retrying===doc.id} title="Xử lý lại">🔄</Btn>
                  )}
                </div>

                {/* Delete */}
                <div style={{ paddingTop:2 }}>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteConfirm(doc)} title="Xóa tài liệu">🗑️</Btn>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding:"8px 16px", fontSize:11, color:T.textLight }}>
            Hiển thị {filtered.length}/{docs.length} tài liệu
          </div>
        </Card>
      </div>

      {/* Delete Confirm Dialog — AC-12 */}
      {deleteConfirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <Card style={{ width:420, padding:26 }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:T.redLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🗑️</div>
              <div>
                <div style={{ fontWeight:800, fontSize:15, color:T.text, marginBottom:4 }}>Xóa tài liệu?</div>
                <div style={{ fontSize:12, color:T.textMid }}>"{deleteConfirm.name}"</div>
              </div>
            </div>
            <div style={{ background:T.redLight, border:`1px solid #FECACA`, borderRadius:7, padding:"10px 13px", marginBottom:16, fontSize:12, color:T.red }}>
              ⚠️ Xóa tài liệu này sẽ đồng thời xóa <b>{deleteConfirm.chunks||0} chunks</b> trong pgvector.
              Hành động này <b>không thể hoàn tác</b>. Bạn có chắc?
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={() => setDeleteConfirm(null)}>Hủy</Btn>
              <Btn variant="danger" onClick={confirmDelete}>Xác nhận xóa</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── PAGE: KB TAGS ─────────────────────────────────────────────────────────────
// US-S0-005 v2: Taxonomy Management ONLY (CRUD pool) — not tag assignment
// Tag assignment moved to KB Upload inline (US-S0-004 v2)

const CAT_COLOR_PALETTE = ["#2563EB","#6DB02B","#E8380D","#0891B2","#7C3AED","#D97706","#059669","#DC2626"];

const CATS_POOL_INIT = [
  { id:1, name:"Cách âm tiêu âm",  slug:"cach-am-tieu-am",  color:"#2563EB", desc:"Vật liệu tiêu âm, hấp âm, chống ồn",  docCount:3, isDefault:true  },
  { id:2, name:"Cách nhiệt bảo ôn", slug:"cach-nhiet-bao-on", color:"#6DB02B", desc:"Vật liệu cách nhiệt, R-value cao",       docCount:4, isDefault:true  },
  { id:3, name:"Chống cháy",        slug:"chong-chay",        color:"#E8380D", desc:"Fire rating, ASTM E84, cấp B1/B2",      docCount:2, isDefault:true  },
  { id:4, name:"Bảo ôn lạnh",       slug:"bao-on-lanh",       color:"#0891B2", desc:"Cách nhiệt lạnh, kho lạnh, đường ống",  docCount:1, isDefault:true  },
];
const TAGS_POOL_INIT = [
  { id:1, name:"NRC Rating",    docCount:5 }, { id:2, name:"STC",          docCount:3 },
  { id:3, name:"R-value",       docCount:4 }, { id:4, name:"Fire Rating",  docCount:6 },
  { id:5, name:"Stonewool",     docCount:8 }, { id:6, name:"AirReflex",    docCount:3 },
  { id:7, name:"Datasheet",     docCount:9 }, { id:8, name:"Technical Spec", docCount:5 },
];
// Mock documents for impact warning
const MOCK_DOCS = [
  { id:1, name:"Catalogue_Stonewool_2024.pdf", status:"active",  chunks:248, date:"08/06/2026" },
  { id:2, name:"Datasheet_AirReflex.pdf",       status:"active",  chunks:86,  date:"07/06/2026" },
  { id:3, name:"Fire_Rating_Standards.docx",    status:"processing", chunks:0, date:"08/06/2026" },
  { id:4, name:"Product_Spec_Table.xlsx",        status:"active",  chunks:124, date:"06/06/2026" },
  { id:5, name:"NRC_Technical_Guide.pdf",        status:"active",  chunks:72,  date:"05/06/2026" },
  { id:6, name:"Acoustic_Panel_v2.pdf",          status:"active",  chunks:54,  date:"04/06/2026" },
  { id:7, name:"Thermal_Spec_Sheet.pdf",         status:"active",  chunks:96,  date:"03/06/2026" },
  { id:8, name:"Fire_Board_Datasheet.docx",      status:"active",  chunks:43,  date:"02/06/2026" },
  { id:9, name:"Stonewool_Install_Guide.pdf",    status:"active",  chunks:138, date:"01/06/2026" },
  { id:10,name:"Cold_Storage_Manual.pdf",        status:"active",  chunks:62,  date:"31/05/2026" },
  { id:11,name:"Bảng_giá_Q2.xlsx",              status:"active",  chunks:29,  date:"30/05/2026" },
  { id:12,name:"Certificate_FireRating_B1.pdf",  status:"active",  chunks:18,  date:"29/05/2026" },
];

// ── Impact Warning Dialog ────────────────────────────────────────────────────
const ImpactWarningDialog = ({ item, itemType, affectedDocs, allCats, onConfirm, onCancel }) => {
  const [checked, setChecked]           = useState(false);
  const [migrateTarget, setMigrateTarget] = useState("");
  const [showAll, setShowAll]           = useState(false);
  const hasImpact = affectedDocs.length > 0;
  const displayDocs = showAll ? affectedDocs : affectedDocs.slice(0, 10);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
      <div style={{
        width:520, maxHeight:"88vh", overflowY:"auto",
        background:T.card, borderRadius:12,
        boxShadow:"0 8px 32px rgba(0,0,0,.2)",
      }}>
        {/* Header */}
        <div style={{
          padding:"18px 22px 14px", borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:12,
        }}>
          <div style={{
            width:42, height:42, borderRadius:"50%", background:T.orangeLight,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0,
          }}>⚠️</div>
          <div>
            <div style={{ fontWeight:800, fontSize:15, color:T.text }}>
              Cảnh báo – Xóa {itemType === "cat" ? "danh mục" : "tag"} "{item.name}"
            </div>
            <div style={{ fontSize:11, color:T.textLight, marginTop:2 }}>
              Hành động này <b>không thể hoàn tác</b>
            </div>
          </div>
        </div>

        <div style={{ padding:"16px 22px", display:"flex", flexDirection:"column", gap:14 }}>

          {/* Impact summary badge */}
          <div style={{
            padding:"12px 16px", borderRadius:8,
            background: hasImpact ? T.redLight : T.greenLight,
            border:`1px solid ${hasImpact ? "#FECACA" : T.greenMid}`,
            display:"flex", alignItems:"center", gap:10,
          }}>
            <span style={{ fontSize:22 }}>{hasImpact ? "🔴" : "🟢"}</span>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color: hasImpact ? T.red : T.greenDark }}>
                {hasImpact ? `${affectedDocs.length} tài liệu sẽ bị mất ${itemType==="cat"?"danh mục":"tag"} này`
                           : "Không có tài liệu nào bị ảnh hưởng"}
              </div>
              {hasImpact && (
                <div style={{ fontSize:11, color:T.red, marginTop:2 }}>
                  Các tài liệu sẽ không có {itemType==="cat"?"danh mục":"tag"} — RAG Retrieval sẽ không filter đúng domain.
                </div>
              )}
            </div>
          </div>

          {/* Affected docs table */}
          {hasImpact && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:8, letterSpacing:"0.05em", textTransform:"uppercase" }}>
                Tài liệu bị ảnh hưởng:
              </div>
              <div style={{
                border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden",
              }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:T.bg }}>
                      {["Tên tài liệu","Trạng thái","Chunks","Ngày upload"].map(h => (
                        <th key={h} style={{ padding:"7px 12px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayDocs.map((doc, i) => (
                      <tr key={doc.id} style={{ borderTop:`1px solid ${T.border}`, background: i%2===0 ? T.card:"rgba(244,246,243,.4)" }}>
                        <td style={{ padding:"7px 12px", fontSize:12, color:T.text }}>
                          {doc.name.length>28 ? doc.name.slice(0,28)+"…":doc.name}
                        </td>
                        <td style={{ padding:"7px 12px" }}><Badge status={doc.status} /></td>
                        <td style={{ padding:"7px 12px", fontSize:11, fontWeight:700, color:T.green }}>{doc.chunks}</td>
                        <td style={{ padding:"7px 12px", fontSize:11, color:T.textLight }}>{doc.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {affectedDocs.length > 10 && !showAll && (
                  <div style={{ padding:"8px 12px", background:T.bg, borderTop:`1px solid ${T.border}`, fontSize:11, color:T.textMid, display:"flex", justifyContent:"space-between" }}>
                    <span>... và {affectedDocs.length-10} tài liệu khác</span>
                    <span style={{ color:T.blue, cursor:"pointer", fontWeight:600 }} onClick={() => setShowAll(true)}>Xem tất cả</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Migrate option — only for categories */}
          {hasImpact && itemType === "cat" && (
            <div style={{ background:"#FFF7ED", border:`1px solid #FED7AA`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#9A3412", marginBottom:8 }}>
                💡 Gợi ý: Gán danh mục thay thế trước khi xóa
              </div>
              <div style={{ fontSize:11, color:"#92400E", marginBottom:10 }}>
                Chọn danh mục thay thế để tự động migrate tất cả {affectedDocs.length} tài liệu sang danh mục mới trước khi xóa.
              </div>
              <select value={migrateTarget} onChange={e => setMigrateTarget(e.target.value)}
                style={{ width:"100%", border:`1px solid #FED7AA`, borderRadius:6, padding:"7px 10px", fontSize:12, background:"#fff" }}
              >
                <option value="">— Không migrate, để trống danh mục —</option>
                {allCats.filter(c => c.id !== item.id).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {migrateTarget && (
                <div style={{ fontSize:11, color:T.green, marginTop:6, fontWeight:600 }}>
                  ✅ Sẽ migrate {affectedDocs.length} tài liệu → "{allCats.find(c=>c.id==migrateTarget)?.name}"
                </div>
              )}
            </div>
          )}

          {/* Mandatory checkbox — AC-06, AC-07 */}
          <label style={{
            display:"flex", gap:10, alignItems:"flex-start", cursor:"pointer",
            padding:"10px 14px", borderRadius:8,
            background: checked ? T.greenLight : T.bg,
            border:`1.5px solid ${checked ? T.green : T.border}`,
            transition:"all .15s",
          }}>
            <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
              style={{ accentColor:T.green, width:15, height:15, marginTop:1, flexShrink:0 }} />
            <span style={{ fontSize:12, color: checked ? T.greenDark : T.textMid, fontWeight: checked?600:400 }}>
              Tôi đã đọc cảnh báo và hiểu rằng hành động xóa <b>không thể hoàn tác</b>
              {hasImpact && ` và ${affectedDocs.length} tài liệu sẽ bị mất ${itemType==="cat"?"danh mục":"tag"} này`}.
            </span>
          </label>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:4 }}>
            <Btn variant="secondary" onClick={onCancel} style={{ minWidth:80 }}>Hủy bỏ</Btn>
            <button
              disabled={!checked}
              onClick={() => onConfirm(migrateTarget || null)}
              style={{
                border:"none", borderRadius:7, padding:"9px 18px",
                fontSize:13, fontWeight:700, cursor: checked ? "pointer" : "not-allowed",
                background: checked ? T.orange : "#E5E7EB",
                color: checked ? "#fff" : "#9CA3AF",
                transition:"all .15s", display:"flex", alignItems:"center", gap:6,
                minWidth:140,
              }}
            >
              🗑️ {migrateTarget ? "Migrate & Xóa" : `Xóa ${itemType==="cat"?"danh mục":"tag"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main KBTags component ────────────────────────────────────────────────────
const KBTags = () => {
  const [activeTab, setActiveTab] = useState("categories"); // "categories" | "tags"
  const [cats, setCats]           = useState(CATS_POOL_INIT);
  const [tags, setTags]           = useState(TAGS_POOL_INIT);
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);
  // Category form
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [catNameError, setCatNameError] = useState("");
  const [editCat, setEditCat]     = useState(null);
  // Tag form
  const [newTagName, setNewTagName] = useState("");
  const [tagNameError, setTagNameError] = useState("");
  const [editTag, setEditTag]     = useState(null);
  // Impact warning
  const [deleteTarget, setDeleteTarget] = useState(null); // { item, itemType, affectedDocs }

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ── Categories ──
  const filteredCats = cats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const addCat = () => {
    if (!newCatName.trim()) return;
    if (cats.some(c => c.name.toLowerCase() === newCatName.trim().toLowerCase())) {
      setCatNameError(`Danh mục "${newCatName.trim()}" đã tồn tại`); return;
    }
    const colorIdx = cats.length % CAT_COLOR_PALETTE.length;
    setCats([...cats, {
      id: Date.now(), name: newCatName.trim(), slug: newCatName.trim().toLowerCase().replace(/ /g,"-"),
      color: CAT_COLOR_PALETTE[colorIdx], desc: newCatDesc.trim(), docCount:0, isDefault:false,
    }]);
    setNewCatName(""); setNewCatDesc(""); setShowAddCat(false); setCatNameError("");
    showToast(`Đã tạo danh mục "${newCatName.trim()}"`);
  };

  const saveEditCat = () => {
    if (cats.some(c => c.id !== editCat.id && c.name.toLowerCase() === editCat.name.toLowerCase())) {
      showToast("Tên danh mục đã tồn tại", "error"); return;
    }
    setCats(cats.map(c => c.id === editCat.id ? { ...c, name: editCat.name, desc: editCat.desc } : c));
    setEditCat(null);
    showToast("Đã cập nhật danh mục — tất cả tài liệu đang dùng sẽ hiển thị tên mới");
  };

  const initDeleteCat = (cat) => {
    // Get affected docs (mock: use docCount)
    const n = cat.docCount;
    const affected = MOCK_DOCS.slice(0, n);
    setDeleteTarget({ item: cat, itemType: "cat", affectedDocs: affected });
  };

  const confirmDeleteCat = (migrateTargetId) => {
    const cat = deleteTarget.item;
    const affected = deleteTarget.affectedDocs;
    if (migrateTargetId) {
      setCats(cats.map(c =>
        c.id == migrateTargetId ? { ...c, docCount: c.docCount + affected.length } : c
      ));
      showToast(`✅ Migrate ${affected.length} tài liệu & xóa danh mục "${cat.name}" thành công`, "success");
    } else {
      showToast(`🗑️ Đã xóa danh mục "${cat.name}" — ${affected.length} tài liệu mất phân loại`, "info");
    }
    setCats(cats.filter(c => c.id !== cat.id));
    setDeleteTarget(null);
  };

  // ── Tags ──
  const filteredTags = tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const addTag = () => {
    if (!newTagName.trim()) return;
    if (tags.some(t => t.name.toLowerCase() === newTagName.trim().toLowerCase())) {
      setTagNameError(`Tag "${newTagName.trim()}" đã tồn tại`); return;
    }
    setTags([...tags, { id: Date.now(), name: newTagName.trim(), docCount:0 }]);
    setNewTagName(""); setTagNameError("");
    showToast(`Đã tạo tag "${newTagName.trim()}"`);
  };

  const saveEditTag = () => {
    if (tags.some(t => t.id !== editTag.id && t.name.toLowerCase() === editTag.name.toLowerCase())) {
      showToast("Tên tag đã tồn tại", "error"); return;
    }
    setTags(tags.map(t => t.id === editTag.id ? { ...t, name: editTag.name } : t));
    setEditTag(null);
    showToast(`Đã rename tag — tất cả chip tag trên document row sẽ cập nhật`);
  };

  const initDeleteTag = (tag) => {
    const affected = MOCK_DOCS.slice(0, tag.docCount);
    setDeleteTarget({ item: tag, itemType: "tag", affectedDocs: affected });
  };

  const confirmDeleteTag = () => {
    const tag = deleteTarget.item;
    setTags(tags.filter(t => t.id !== tag.id));
    showToast(`🗑️ Đã xóa tag "${tag.name}" khỏi ${tag.docCount} tài liệu`, "info");
    setDeleteTarget(null);
  };

  const TabBtn = ({ id, label, icon, count }) => (
    <button onClick={() => { setActiveTab(id); setSearch(""); }} style={{
      border:"none", cursor:"pointer", fontWeight: activeTab===id?700:500, fontSize:13,
      padding:"10px 18px", borderBottom: activeTab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",
      background:"transparent", color: activeTab===id?T.green:T.textMid,
      transition:"all .15s", display:"flex", alignItems:"center", gap:7,
    }}>
      {icon} {label}
      <span style={{ fontSize:10, fontWeight:700, background: activeTab===id?T.greenLight:T.bg, color: activeTab===id?T.green:T.textLight, padding:"1px 7px", borderRadius:10 }}>{count}</span>
    </button>
  );

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:18, position:"relative" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", top:20, right:24, zIndex:2000,
          background: toast.type==="success"?T.green:toast.type==="error"?T.orange:T.blue,
          color:"#fff", padding:"10px 18px", borderRadius:8, fontSize:13, fontWeight:600,
          boxShadow:"0 4px 16px rgba(0,0,0,.2)", maxWidth:400,
        }}>{toast.type==="success"?"✅":toast.type==="error"?"❌":"ℹ️"} {toast.msg}</div>
      )}

      {/* Info callout */}
      <div style={{ background:"#F0EDFF", border:"1px solid #C4B5FD", borderRadius:8, padding:"10px 16px", display:"flex", gap:10, alignItems:"flex-start", fontSize:12 }}>
        <span style={{ fontSize:18 }}>📋</span>
        <div style={{ color:"#5B21B6" }}>
          <b>Trang này quản lý Taxonomy Pool</b> — tạo, sửa, xóa danh mục và tag toàn cục.
          Để <b>gán</b> danh mục/tag cho tài liệu cụ thể, hãy sử dụng <b>KB Tài liệu</b> (inline trên document row).
        </div>
      </div>

      <Card>
        {/* Tabs */}
        <div style={{ borderBottom:`1px solid ${T.border}`, display:"flex", padding:"0 20px", gap:2 }}>
          <TabBtn id="categories" icon="📂" label="Danh mục" count={cats.length} />
          <TabBtn id="tags" icon="🏷️" label="Tags" count={tags.length} />
        </div>

        {/* ═══ CATEGORIES TAB ═══ */}
        {activeTab === "categories" && (
          <div style={{ padding:22 }}>
            {/* Toolbar */}
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:18 }}>
              <Input placeholder="Tìm danh mục..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width:260 }} />
              <div style={{ marginLeft:"auto" }}>
                <Btn variant="primary" onClick={() => { setShowAddCat(true); setCatNameError(""); }}>+ Thêm danh mục</Btn>
              </div>
            </div>

            {/* Add form */}
            {showAddCat && (
              <div style={{ background:"#F0FDF4", border:`1px solid ${T.greenMid}`, borderRadius:10, padding:16, marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:13, color:T.greenDark, marginBottom:12 }}>✨ Thêm danh mục mới</div>
                <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                  <div style={{ flex:1 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:T.textMid, display:"block", marginBottom:4 }}>Tên danh mục *</label>
                    <Input placeholder="VD: Cách âm tiêu âm" value={newCatName}
                      onChange={e => { setNewCatName(e.target.value); setCatNameError(""); }} />
                    {catNameError && <div style={{ fontSize:11, color:T.red, marginTop:3 }}>⚠ {catNameError}</div>}
                  </div>
                  <div style={{ flex:1.5 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:T.textMid, display:"block", marginBottom:4 }}>Mô tả (tùy chọn)</label>
                    <Input placeholder="Mô tả ngắn về danh mục..." value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} />
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
                  <Btn variant="secondary" size="sm" onClick={() => { setShowAddCat(false); setNewCatName(""); setNewCatDesc(""); setCatNameError(""); }}>Hủy</Btn>
                  <Btn variant="primary" size="sm" onClick={addCat}>Tạo danh mục</Btn>
                </div>
              </div>
            )}

            {/* Category cards grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:12 }}>
              {filteredCats.map(cat => (
                <div key={cat.id} style={{
                  border:`1.5px solid ${cat.color}30`, borderRadius:10,
                  background: cat.color+"08", padding:16, position:"relative",
                }}>
                  {cat.isDefault && (
                    <span style={{
                      position:"absolute", top:10, right:10, fontSize:9, fontWeight:700,
                      background: cat.color+"20", color:cat.color, padding:"2px 7px", borderRadius:4, letterSpacing:"0.05em"
                    }}>DEFAULT</span>
                  )}

                  {editCat?.id === cat.id ? (
                    // Edit mode
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      <input autoFocus value={editCat.name}
                        onChange={e => setEditCat({...editCat, name:e.target.value})}
                        style={{ border:`1.5px solid ${cat.color}`, borderRadius:6, padding:"6px 10px", fontSize:13, fontWeight:700, outline:"none" }} />
                      <input value={editCat.desc}
                        onChange={e => setEditCat({...editCat, desc:e.target.value})}
                        placeholder="Mô tả..."
                        style={{ border:`1px solid ${T.border}`, borderRadius:6, padding:"6px 10px", fontSize:11, outline:"none" }} />
                      <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
                        <Btn variant="secondary" size="sm" onClick={() => setEditCat(null)}>Hủy</Btn>
                        <Btn variant="primary" size="sm" onClick={saveEditCat}>Lưu</Btn>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <div style={{ width:11, height:11, borderRadius:"50%", background:cat.color, flexShrink:0 }} />
                        <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{cat.name}</div>
                      </div>
                      <div style={{ fontSize:11, color:T.textMid, marginBottom:10, minHeight:16 }}>{cat.desc}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{
                          fontSize:11, fontWeight:700, background:cat.color+"20", color:cat.color,
                          padding:"3px 10px", borderRadius:12,
                        }}>
                          📄 {cat.docCount} tài liệu
                        </span>
                        <div style={{ marginLeft:"auto", display:"flex", gap:5 }}>
                          <Btn variant="secondary" size="sm" onClick={() => setEditCat({...cat})}>✏️ Sửa</Btn>
                          <Btn variant="danger" size="sm" onClick={() => initDeleteCat(cat)}>🗑️</Btn>
                        </div>
                      </div>
                      <div style={{ marginTop:8, fontSize:10, color:T.textLight, fontFamily:"monospace" }}>slug: {cat.slug}</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {filteredCats.length === 0 && (
              <div style={{ padding:30, textAlign:"center", color:T.textLight, fontSize:13 }}>Không tìm thấy danh mục nào</div>
            )}
          </div>
        )}

        {/* ═══ TAGS TAB ═══ */}
        {activeTab === "tags" && (
          <div style={{ padding:22 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:18 }}>
              <Input placeholder="Tìm tag..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width:240 }} />
              <div style={{ flex:1, display:"flex", gap:8, alignItems:"center" }}>
                <Input placeholder="Tên tag mới..." value={newTagName}
                  onChange={e => { setNewTagName(e.target.value); setTagNameError(""); }}
                  style={{ width:200 }} />
                <Btn variant="primary" onClick={addTag}>+ Thêm tag</Btn>
                {tagNameError && <span style={{ fontSize:11, color:T.red }}>⚠ {tagNameError}</span>}
              </div>
            </div>

            {/* Tag table */}
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Tag","Số tài liệu","Thao tác"].map(h => (
                    <th key={h} style={{ padding:"9px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.06em", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTags.map((tag, i) => (
                  <tr key={tag.id} style={{ borderTop:`1px solid ${T.border}`, background: i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"11px 16px" }}>
                      {editTag?.id === tag.id ? (
                        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                          <input autoFocus value={editTag.name}
                            onChange={e => setEditTag({...editTag, name:e.target.value})}
                            onKeyDown={e => { if(e.key==="Enter") saveEditTag(); if(e.key==="Escape") setEditTag(null); }}
                            style={{ border:`1.5px solid ${T.green}`, borderRadius:6, padding:"5px 10px", fontSize:12, outline:"none", width:160 }} />
                          <Btn variant="primary" size="sm" onClick={saveEditTag}>✅</Btn>
                          <Btn variant="secondary" size="sm" onClick={() => setEditTag(null)}>✕</Btn>
                        </div>
                      ) : (
                        <span style={{
                          fontSize:12, fontWeight:600, background:T.greenLight, color:T.greenDark,
                          border:`1px solid ${T.greenMid}`, padding:"4px 11px", borderRadius:12,
                          display:"inline-flex", alignItems:"center", gap:5,
                        }}>
                          🏷 {tag.name}
                        </span>
                      )}
                    </td>
                    <td style={{ padding:"11px 16px" }}>
                      <span style={{ fontSize:11, fontWeight:700, color: tag.docCount>0?T.green:T.textLight }}>
                        📄 {tag.docCount} tài liệu
                      </span>
                    </td>
                    <td style={{ padding:"11px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <Btn variant="secondary" size="sm" onClick={() => setEditTag({...tag})}>✏️ Rename</Btn>
                        <Btn variant="danger" size="sm" onClick={() => initDeleteTag(tag)}>🗑️</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTags.length === 0 && (
              <div style={{ padding:30, textAlign:"center", color:T.textLight, fontSize:13 }}>Không tìm thấy tag nào</div>
            )}
          </div>
        )}
      </Card>

      {/* Impact Warning Dialog */}
      {deleteTarget && (
        <ImpactWarningDialog
          item={deleteTarget.item}
          itemType={deleteTarget.itemType}
          affectedDocs={deleteTarget.affectedDocs}
          allCats={cats}
          onConfirm={deleteTarget.itemType === "cat" ? confirmDeleteCat : confirmDeleteTag}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

// ─── PAGE: NCC REVIEW (US-S0-007) ───────────────────────────────────────────
// NCC Upload → Trainer Approval Gate

const NCC_QUEUE_INIT = [
  {
    id:1, name:"Stonewool_75mm_Brochure.pdf", type:"PDF",
    ncc:"Công ty VLXD Phú Thịnh", nccReliability: 4.2,
    product:"Bông đá Stonewool 75mm", sku:"RMK-SW-75",
    size:"6.8 MB", uploadedAt:"08/06/2026 09:15",
    status:"pending_review", hasConflict:true,
    conflictWith:"TechBuild Corp (Active)",
    preview:"Tài liệu kỹ thuật mô tả chi tiết về bông đá khoáng Stonewool 75mm với NRC=0.80, STC=32, lambda=0.034 W/mK. Sản phẩm đạt chứng chỉ ISO 9001:2015 và Fire Rating Class A1. Thích hợp cho cách nhiệt mái, tường và sàn công nghiệp. Hướng dẫn thi công đầy đủ với hình ảnh minh họa bước từng bước..."
  },
  {
    id:2, name:"AirReflex_Datasheet_v3.pdf", type:"PDF",
    ncc:"Minh Đức Insulation JSC", nccReliability: 3.8,
    product:"Túi khí AirReflex 25mm", sku:"RMK-AR-25",
    size:"3.1 MB", uploadedAt:"08/06/2026 08:42",
    status:"pending_review", hasConflict:false,
    preview:"Datasheet kỹ thuật AirReflex 25mm: vật liệu cách nhiệt dạng bong bóng khí đôi với lớp phản chiếu nhôm. R-value=1.5 m²K/W, phạm vi nhiệt độ -40°C đến +80°C. Đặc biệt phù hợp cho mái tôn, container lạnh và kho lạnh. Nhẹ, dễ thi công, chống ẩm tốt..."
  },
  {
    id:3, name:"FireBoard_B1_Certificate.docx", type:"DOCX",
    ncc:"Remak Fire Safety Ltd", nccReliability: 4.9,
    product:"Tấm chống cháy cấp B1", sku:"RMK-FP-B1",
    size:"1.4 MB", uploadedAt:"07/06/2026 16:30",
    status:"pending_review", hasConflict:false,
    preview:"Chứng chỉ phòng cháy chữa cháy tấm chống cháy cấp B1. Đã được kiểm định bởi Bộ Công An Việt Nam. STC=42dB, Fire Rating=60 phút, đạt tiêu chuẩn TCVN 9311:2012. Tài liệu bao gồm: số chứng chỉ, phạm vi áp dụng, thông số kỹ thuật được kiểm định và hướng dẫn lắp đặt..."
  },
];
const QUARANTINE_INIT = [
  { id:10, name:"Competitor_Stonewool.pdf", ncc:"An Khang Ltd", product:"Bông đá 50mm", rejectedAt:"06/06/2026", reason:"Thông số NRC không khớp với kết quả kiểm định thực tế. Tài liệu chứa thông tin quảng cáo thiếu cơ sở kỹ thuật." },
];

const ReliabilityStars = ({ score }) => {
  const full = Math.floor(score);
  const half = score - full >= 0.5;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize:13, color: i<=full ? "#F59E0B" : (i===full+1&&half) ? "#F59E0B" : "#D1D5DB" }}>
          {i<=full ? "★" : (i===full+1&&half) ? "⯨" : "☆"}
        </span>
      ))}
      <span style={{ fontSize:11, fontWeight:700, color:T.textMid, marginLeft:2 }}>{score.toFixed(1)}</span>
    </div>
  );
};

const NCCReview = () => {
  const [tab, setTab]             = useState("queue"); // queue | quarantine
  const [queue, setQueue]         = useState(NCC_QUEUE_INIT);
  const [quarantine, setQuarantine] = useState(QUARANTINE_INIT);
  const [selected, setSelected]   = useState(null); // doc being previewed
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast]         = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const handleApprove = (doc) => {
    setProcessingId(doc.id);
    setTimeout(() => {
      setQueue(prev => prev.filter(d => d.id !== doc.id));
      setProcessingId(null);
      if (selected?.id === doc.id) setSelected(null);
      showToast(`✅ Đã duyệt "${doc.name}" — ETL đang xử lý...`, "success");
    }, 900);
  };

  const handleRejectOpen = (doc) => { setRejectModal(doc); setRejectReason(""); };

  const confirmReject = () => {
    if (rejectReason.trim().length < 20) return;
    setQueue(prev => prev.filter(d => d.id !== rejectModal.id));
    setQuarantine(prev => [{
      id: Date.now(), name: rejectModal.name, ncc: rejectModal.ncc,
      product: rejectModal.product, rejectedAt: new Date().toLocaleDateString("vi-VN"),
      reason: rejectReason.trim(),
    }, ...prev]);
    if (selected?.id === rejectModal.id) setSelected(null);
    showToast(`🚫 Đã từ chối "${rejectModal.name}" — NCC nhận thông báo`, "info");
    setRejectModal(null);
    setRejectReason("");
  };

  const TabBtn = ({ id, label, icon, count }) => (
    <button onClick={() => setTab(id)} style={{
      border:"none", cursor:"pointer", fontWeight: tab===id?700:500, fontSize:13,
      padding:"10px 18px", borderBottom: tab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",
      background:"transparent", color: tab===id?T.green:T.textMid,
      transition:"all .15s", display:"flex", alignItems:"center", gap:7,
    }}>
      {icon} {label}
      {count > 0 && (
        <span style={{ fontSize:10, fontWeight:800, background: id==="queue"?T.orange:T.bg, color: id==="queue"?"#fff":T.textLight, padding:"1px 7px", borderRadius:10 }}>{count}</span>
      )}
    </button>
  );

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:18, position:"relative" }}>

      {toast && (
        <div style={{ position:"fixed", top:20, right:24, zIndex:2000, background: toast.type==="success"?T.green:toast.type==="error"?T.orange:T.blue, color:"#fff", padding:"10px 18px", borderRadius:8, fontSize:13, fontWeight:600, boxShadow:"0 4px 16px rgba(0,0,0,.2)", maxWidth:380 }}>
          {toast.type==="success"?"✅":toast.type==="error"?"❌":"ℹ️"} {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display:"flex", gap:14 }}>
        <StatCard label="Chờ duyệt" value={queue.length} color={T.orange} sub="Tài liệu NCC pending" />
        <StatCard label="Xung đột" value={queue.filter(d=>d.hasConflict).length} color={T.red} sub="Cùng sản phẩm có active doc" />
        <StatCard label="Quarantine" value={quarantine.length} color={T.textMid} sub="Bị từ chối" />
        <StatCard label="Active (NCC)" value={3} color={T.green} sub="Đã approved & ETL done" />
      </div>

      {/* Info callout */}
      <div style={{ background:"#FFF7ED", border:`1px solid #FED7AA`, borderRadius:8, padding:"10px 16px", display:"flex", gap:10, fontSize:12, alignItems:"flex-start" }}>
        <span style={{ fontSize:18 }}>🔍</span>
        <div style={{ color:"#9A3412" }}>
          <b>Trainer là Quality Gate duy nhất</b> — Tài liệu NCC phải qua review trước khi vào KB.
          ETL Pipeline chỉ trigger khi status = <b>Approved</b>. Tài liệu bị từ chối được lưu vào Quarantine để audit trail.
        </div>
      </div>

      <Card>
        <div style={{ borderBottom:`1px solid ${T.border}`, display:"flex", padding:"0 20px" }}>
          <TabBtn id="queue"      icon="📥" label="Tài liệu chờ duyệt" count={queue.length} />
          <TabBtn id="quarantine" icon="🚫" label="Quarantine"          count={quarantine.length} />
        </div>

        {/* ══ REVIEW QUEUE TAB ══ */}
        {tab === "queue" && (
          <div style={{ display:"flex", minHeight:480 }}>

            {/* Queue list */}
            <div style={{ width: selected ? 340 : "100%", borderRight: selected ? `1px solid ${T.border}` : "none", overflowY:"auto", transition:"width .2s" }}>
              {queue.length === 0 && (
                <div style={{ padding:48, textAlign:"center", color:T.textLight }}>
                  <div style={{ fontSize:36, marginBottom:12 }}>✅</div>
                  <div style={{ fontSize:14, fontWeight:600, color:T.greenDark }}>Queue trống — tất cả đã được duyệt!</div>
                </div>
              )}
              {queue.map((doc, i) => {
                const isSel = selected?.id === doc.id;
                const isProcessing = processingId === doc.id;
                return (
                  <div key={doc.id}
                    onClick={() => setSelected(isSel ? null : doc)}
                    style={{
                      padding:"14px 18px", cursor:"pointer",
                      borderBottom:`1px solid ${T.border}`,
                      background: isSel ? T.greenLight : i%2===0 ? T.card : "rgba(244,246,243,.4)",
                      borderLeft: isSel ? `3px solid ${T.green}` : "3px solid transparent",
                      opacity: isProcessing ? 0.5 : 1,
                      transition:"all .15s",
                    }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <span style={{ fontSize:22, flexShrink:0 }}>{doc.type==="PDF"?"📄":"📝"}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc.name}</div>
                        <div style={{ fontSize:11, color:T.textMid, marginTop:2 }}>
                          🏭 {doc.ncc}
                        </div>
                        <div style={{ fontSize:11, color:T.textLight, marginTop:1 }}>
                          📦 {doc.product} · {doc.size} · {doc.uploadedAt}
                        </div>
                        <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                          {doc.hasConflict && (
                            <span style={{ fontSize:10, fontWeight:700, background:T.redLight, color:T.red, border:`1px solid #FECACA`, padding:"2px 8px", borderRadius:4 }}>
                              ⚠ Xung đột: {doc.conflictWith}
                            </span>
                          )}
                          <span style={{ fontSize:10, background:T.yellowLight, color:"#92400E", border:`1px solid #FDE68A`, padding:"2px 8px", borderRadius:4, fontWeight:700 }}>
                            ⏳ Chờ duyệt
                          </span>
                        </div>
                      </div>
                    </div>
                    {isProcessing && (
                      <div style={{ marginTop:8, height:3, background:T.border, borderRadius:2, overflow:"hidden" }}>
                        <div style={{ width:"100%", height:"100%", background:T.green, animation:"progress-bar 0.9s linear" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Preview panel */}
            {selected && (
              <div style={{ flex:1, display:"flex", flexDirection:"column", overflowY:"auto" }}>
                {/* Preview header */}
                <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:T.text }}>{selected.name}</div>
                    <div style={{ fontSize:11, color:T.textLight }}>Preview tài liệu</div>
                  </div>
                  <Btn variant="ghost" size="sm" onClick={() => setSelected(null)}>✕</Btn>
                </div>

                {/* Metadata sidebar */}
                <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`, background:T.bg }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:4, letterSpacing:"0.06em" }}>NHÀ CUNG CẤP</div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{selected.ncc}</div>
                      <ReliabilityStars score={selected.nccReliability} />
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:4, letterSpacing:"0.06em" }}>SẢN PHẨM LIÊN QUAN</div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{selected.product}</div>
                      <div style={{ fontSize:10, fontFamily:"monospace", color:T.blue, background:T.blueLight, padding:"1px 6px", borderRadius:3, display:"inline-block", marginTop:2 }}>{selected.sku}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:4, letterSpacing:"0.06em" }}>LOẠI & KÍCH THƯỚC</div>
                      <div style={{ fontSize:12, color:T.text }}>{selected.type} · {selected.size}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:4, letterSpacing:"0.06em" }}>NGÀY UPLOAD</div>
                      <div style={{ fontSize:12, color:T.text }}>{selected.uploadedAt}</div>
                    </div>
                  </div>
                  {selected.hasConflict && (
                    <div style={{ marginTop:10, padding:"8px 12px", background:T.redLight, borderRadius:7, border:`1px solid #FECACA`, fontSize:11, color:T.red, fontWeight:600 }}>
                      ⚠️ Xung đột: Sản phẩm <b>{selected.product}</b> đã có tài liệu active từ <b>{selected.conflictWith}</b>.
                      Cần review kỹ trước khi approve.
                    </div>
                  )}
                </div>

                {/* Document preview content */}
                <div style={{ flex:1, padding:20 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textLight, letterSpacing:"0.06em", marginBottom:10 }}>NỘI DUNG TÀI LIỆU (EXTRACT)</div>
                  <div style={{
                    background:T.bg, border:`1px solid ${T.border}`, borderRadius:8,
                    padding:16, fontSize:12, color:T.textMid, lineHeight:1.7,
                    minHeight:160,
                  }}>
                    {selected.preview}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ padding:"14px 20px", borderTop:`1px solid ${T.border}`, display:"flex", gap:10, background:T.card }}>
                  <Btn variant="danger" style={{ flex:1, justifyContent:"center" }} onClick={() => handleRejectOpen(selected)}>
                    🚫 Từ chối
                  </Btn>
                  <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} onClick={() => handleApprove(selected)} disabled={processingId === selected.id}>
                    {processingId === selected.id ? "⏳ Đang xử lý..." : "✅ Duyệt & ETL"}
                  </Btn>
                </div>
              </div>
            )}

            {/* Empty state when nothing selected */}
            {!selected && queue.length > 0 && (
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", color:T.textLight, fontSize:13 }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>👆</div>
                  Chọn một tài liệu để xem preview
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ QUARANTINE TAB ══ */}
        {tab === "quarantine" && (
          <div style={{ padding:20 }}>
            {quarantine.length === 0 && (
              <div style={{ padding:32, textAlign:"center", color:T.textLight, fontSize:13 }}>Chưa có tài liệu nào trong quarantine</div>
            )}
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Tài liệu","NCC","Sản phẩm","Ngày từ chối","Lý do"].map(h => (
                    <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.06em", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quarantine.map((q, i) => (
                  <tr key={q.id} style={{ borderTop:`1px solid ${T.border}`, background: i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{q.name}</div>
                      <span style={{ fontSize:9, background:T.redLight, color:T.red, padding:"1px 6px", borderRadius:3, fontWeight:700 }}>QUARANTINE</span>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:T.textMid }}>{q.ncc}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:T.textMid }}>{q.product}</td>
                    <td style={{ padding:"10px 14px", fontSize:11, color:T.textLight }}>{q.rejectedAt}</td>
                    <td style={{ padding:"10px 14px", fontSize:11, color:T.textMid, maxWidth:220 }}>{q.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Reject Modal */}
      {rejectModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <Card style={{ width:460, padding:26 }}>
            <div style={{ fontWeight:800, fontSize:15, color:T.text, marginBottom:4 }}>🚫 Từ chối tài liệu</div>
            <div style={{ fontSize:12, color:T.textLight, marginBottom:16 }}>{rejectModal.name} · {rejectModal.ncc}</div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:6 }}>
                Lý do từ chối * <span style={{ fontWeight:400, color:T.textLight }}>(tối thiểu 20 ký tự — NCC sẽ nhận được thông báo này)</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="VD: Thông số NRC không khớp với kết quả kiểm định thực tế. Tài liệu thiếu chứng chỉ kỹ thuật cần thiết..."
                rows={4}
                style={{
                  width:"100%", border:`1px solid ${rejectReason.length>=20?T.green:T.border}`,
                  borderRadius:7, padding:"9px 12px", fontSize:12, color:T.text,
                  resize:"vertical", outline:"none", boxSizing:"border-box",
                  transition:"border .15s",
                }}
              />
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                <span style={{ fontSize:10, color: rejectReason.length>=20?T.green:T.red }}>
                  {rejectReason.length>=20 ? "✅ Đủ độ dài" : `⚠ Cần thêm ${20-rejectReason.length} ký tự`}
                </span>
                <span style={{ fontSize:10, color:T.textLight }}>{rejectReason.length} ký tự</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={() => setRejectModal(null)}>Hủy</Btn>
              <button
                disabled={rejectReason.trim().length < 20}
                onClick={confirmReject}
                style={{
                  border:"none", borderRadius:7, padding:"8px 18px",
                  fontSize:13, fontWeight:700, cursor: rejectReason.trim().length>=20?"pointer":"not-allowed",
                  background: rejectReason.trim().length>=20?T.orange:"#E5E7EB",
                  color: rejectReason.trim().length>=20?"#fff":"#9CA3AF",
                  transition:"all .15s",
                }}
              >🚫 Xác nhận từ chối</button>
            </div>
          </Card>
        </div>
      )}

      <style>{`@keyframes progress-bar { from{width:0} to{width:100%} }`}</style>
    </div>
  );
};

// ─── PAGE: PRODUCT PAGE (US-S0-008) ─────────────────────────────────────────
// ERP Gold Pipeline Read-Only — replaces US-S0-006 (DEPRECATED)

const PRODUCTS_ERP = [
  {
    id:1, sku:"RMK-SW-50", name:"Bông đá Stonewool 50mm", cat:"Cách nhiệt bảo ôn",
    brand:"Remak® Stonewool",
    specs:{ nrc:"0.70", stc:"28", lambda:"0.034 W/mK", rValue:"1.47 m²K/W", fireRating:"Class A1", thickness:"50mm", origin:"Việt Nam" },
    suppliers:[
      { id:1, name:"Công ty VLXD Phú Thịnh",   score:92, stars:4.6, costPrice:28000, salePrice:45000, leadDays:3,  certified:true,  inStock:true  },
      { id:2, name:"Minh Đức Insulation JSC",   score:74, stars:3.7, costPrice:25000, salePrice:45000, leadDays:5,  certified:false, inStock:true  },
      { id:3, name:"TechBuild Corp",             score:61, stars:3.1, costPrice:24000, salePrice:45000, leadDays:7,  certified:false, inStock:false },
    ],
    stock:[
      { branch:"Kho HCM – Quận 9",        qty:1250, minQty:200, status:"in_stock"   },
      { branch:"Kho Hà Nội – Gia Lâm",    qty:380,  minQty:200, status:"in_stock"   },
      { branch:"Kho Đà Nẵng",             qty:85,   minQty:200, status:"low_stock"  },
    ],
  },
  {
    id:2, sku:"RMK-AR-20", name:"Túi khí AirReflex 20mm", cat:"Cách nhiệt bảo ôn",
    brand:"Remak® AirReflex",
    specs:{ nrc:"—", stc:"—", lambda:"0.028 W/mK", rValue:"0.71 m²K/W", fireRating:"Class B2", thickness:"20mm", origin:"Việt Nam" },
    suppliers:[
      { id:4, name:"Remak Fire Safety Ltd",     score:97, stars:4.9, costPrice:16000, salePrice:28000, leadDays:1,  certified:true,  inStock:true  },
    ],
    stock:[
      { branch:"Kho HCM – Quận 9",        qty:3200, minQty:500, status:"in_stock"   },
      { branch:"Kho Hà Nội – Gia Lâm",    qty:0,    minQty:500, status:"out_of_stock" },
    ],
  },
  {
    id:3, sku:"RMK-MT-30", name:"Mút trứng tiêu âm 30mm", cat:"Cách âm tiêu âm",
    brand:"Remak® Acoustic",
    specs:{ nrc:"0.85", stc:"—", lambda:"—", rValue:"—", fireRating:"Class B1", thickness:"30mm", origin:"Việt Nam" },
    suppliers:[
      { id:2, name:"Minh Đức Insulation JSC",   score:74, stars:3.7, costPrice:32000, salePrice:52000, leadDays:4,  certified:false, inStock:true  },
      { id:5, name:"Acoustic Pro Việt Nam",      score:85, stars:4.3, costPrice:35000, salePrice:52000, leadDays:2,  certified:true,  inStock:true  },
    ],
    stock:[
      { branch:"Kho HCM – Quận 9",        qty:640, minQty:100, status:"in_stock"   },
      { branch:"Kho Hà Nội – Gia Lâm",    qty:0,   minQty:100, status:"out_of_stock" },
    ],
  },
  {
    id:4, sku:"RMK-FP-B1", name:"Tấm chống cháy cấp B1", cat:"Chống cháy",
    brand:"Remak® FireShield",
    specs:{ nrc:"—", stc:"42", lambda:"—", rValue:"—", fireRating:"60 phút / Class B1", thickness:"12mm", origin:"Nhật Bản" },
    suppliers:[
      { id:4, name:"Remak Fire Safety Ltd",     score:97, stars:4.9, costPrice:75000, salePrice:120000, leadDays:2, certified:true,  inStock:true  },
    ],
    stock:[
      { branch:"Kho HCM – Quận 9",        qty:420, minQty:100, status:"in_stock"   },
      { branch:"Kho Hà Nội – Gia Lâm",    qty:180, minQty:100, status:"in_stock"   },
    ],
  },
  {
    id:5, sku:"RMK-GL-100", name:"Bông thủy tinh 100mm", cat:"Bảo ôn lạnh",
    brand:"Remak® GlassWool",
    specs:{ nrc:"0.65", stc:"—", lambda:"0.039 W/mK", rValue:"2.56 m²K/W", fireRating:"Class A2", thickness:"100mm", origin:"Việt Nam" },
    suppliers:[
      { id:2, name:"Minh Đức Insulation JSC",   score:74, stars:3.7, costPrice:22000, salePrice:38000, leadDays:6, certified:false, inStock:false },
      { id:1, name:"Công ty VLXD Phú Thịnh",   score:92, stars:4.6, costPrice:24000, salePrice:38000, leadDays:4, certified:true,  inStock:true  },
    ],
    stock:[
      { branch:"Kho HCM – Quận 9",        qty:0,   minQty:200, status:"out_of_stock" },
      { branch:"Kho Hà Nội – Gia Lâm",    qty:510, minQty:200, status:"in_stock"     },
    ],
  },
];

const StockBadge = ({ status }) => {
  const cfg = {
    in_stock:    { bg:T.greenLight, color:T.greenDark, label:"Còn hàng" },
    low_stock:   { bg:T.yellowLight, color:"#854D0E",  label:"Sắp hết" },
    out_of_stock:{ bg:T.redLight,  color:T.red,        label:"Hết hàng" },
  };
  const c = cfg[status] || cfg.in_stock;
  return <span style={{ fontSize:10, fontWeight:700, background:c.bg, color:c.color, padding:"2px 8px", borderRadius:4 }}>{c.label}</span>;
};

const NCCScoreBadge = ({ score, recommended }) => {
  const color = score>=90?"#166534": score>=75?"#1D4ED8": score>=60?"#92400E":"#991B1B";
  const bg    = score>=90?"#DCFCE7": score>=75?"#DBEAFE": score>=60?"#FEF3C7":"#FEE2E2";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      <span style={{ fontSize:12, fontWeight:800, background:bg, color, padding:"2px 9px", borderRadius:5 }}>{score}</span>
      {recommended && <span style={{ fontSize:9, fontWeight:800, background:T.green, color:"#fff", padding:"2px 7px", borderRadius:4 }}>★ KHUYẾN NGHỊ</span>}
    </div>
  );
};

const ProductPage = () => {
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState("all");
  const [filterNcc, setFilterNcc]     = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailTab, setDetailTab]     = useState("specs"); // specs | suppliers | stock

  const syncTime = "08/06/2026 00:12";
  const allNccs  = [...new Map(PRODUCTS_ERP.flatMap(p=>p.suppliers).map(s=>[s.id,s])).values()];
  const cats     = ["all",...new Set(PRODUCTS_ERP.map(p=>p.cat))];

  const filtered = PRODUCTS_ERP.filter(p => {
    const q = search.toLowerCase();
    const matchQ   = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchCat = filterCat==="all" || p.cat===filterCat;
    const matchNcc = filterNcc==="all" || p.suppliers.some(s=>s.id==filterNcc);
    return matchQ && matchCat && matchNcc;
  });

  const topSupplier = (p) => [...p.suppliers].sort((a,b)=>b.score-a.score)[0];
  const totalStock  = (p) => p.stock.reduce((s,b)=>s+b.qty,0);

  const DetailTabBtn = ({ id, label }) => (
    <button onClick={()=>setDetailTab(id)} style={{
      border:"none", cursor:"pointer", fontWeight: detailTab===id?700:500, fontSize:12,
      padding:"8px 14px", borderBottom: detailTab===id?`2px solid ${T.green}`:"2px solid transparent",
      background:"transparent", color: detailTab===id?T.green:T.textMid, transition:"all .12s",
    }}>{label}</button>
  );

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:18 }}>

      {/* Sync status banner */}
      <div style={{ background:T.greenLight, border:`1px solid ${T.greenMid}`, borderRadius:8, padding:"9px 16px", display:"flex", alignItems:"center", gap:10, fontSize:12 }}>
        <span style={{ fontSize:16 }}>🔄</span>
        <div style={{ flex:1, color:T.greenDark }}>
          <b>Đồng bộ ERP Gold Pipeline</b> — Dữ liệu từ <code style={{ background:T.greenLight, padding:"0 4px", borderRadius:3, fontSize:11 }}>remak_gold</code>.
          Cập nhật lần cuối: <b>{syncTime}</b> · Chạy tự động 0:00 hàng ngày
        </div>
        <span style={{ fontSize:10, fontWeight:700, background:T.greenDark, color:"#fff", padding:"3px 9px", borderRadius:5 }}>READ-ONLY</span>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:14 }}>
        <StatCard label="Tổng sản phẩm" value={PRODUCTS_ERP.length} color={T.text} sub="Từ ERP dim_product" />
        <StatCard label="Đang còn hàng" value={PRODUCTS_ERP.filter(p=>p.stock.some(s=>s.status==="in_stock")).length} color={T.green} />
        <StatCard label="Nhà cung cấp" value={allNccs.length} color={T.blue} sub="Từ dim_supplier" />
        <StatCard label="Sắp hết / Hết" value={PRODUCTS_ERP.filter(p=>p.stock.every(s=>s.status!=="in_stock")).length} color={T.orange} />
      </div>

      <div style={{ display:"flex", gap:20 }}>

        {/* Product list */}
        <Card style={{ flex:1, overflow:"hidden" }}>
          {/* Filters */}
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            <Input placeholder="Tìm SKU, tên sản phẩm..." value={search} onChange={e=>setSearch(e.target.value)} icon="🔍" style={{ width:220 }} />
            <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{ border:`1px solid ${T.border}`, borderRadius:7, padding:"7px 10px", fontSize:12, color:T.text, background:T.card }}>
              {cats.map(c => <option key={c} value={c}>{c==="all"?"Tất cả danh mục":c}</option>)}
            </select>
            <select value={filterNcc} onChange={e=>setFilterNcc(e.target.value)} style={{ border:`1px solid ${T.border}`, borderRadius:7, padding:"7px 10px", fontSize:12, color:T.text, background:T.card }}>
              <option value="all">Tất cả NCC</option>
              {allNccs.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
            </select>
            <span style={{ fontSize:11, color:T.textLight, marginLeft:"auto" }}>{filtered.length}/{PRODUCTS_ERP.length} sản phẩm</span>
          </div>

          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:T.bg }}>
                {["SKU","Tên sản phẩm","Danh mục","NCC chính (Reliability)","Giá sale","Tồn kho tổng",""].map(h=>(
                  <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const top = topSupplier(p);
                const totQty = totalStock(p);
                const isSel = selectedProduct?.id === p.id;
                return (
                  <tr key={p.id} onClick={() => { setSelectedProduct(isSel?null:p); setDetailTab("specs"); }}
                    style={{ borderTop:`1px solid ${T.border}`, background: isSel?T.greenLight : i%2===0?T.card:"rgba(244,246,243,.4)", cursor:"pointer", transition:"background .12s" }}>
                    <td style={{ padding:"10px 14px" }}>
                      <span style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color:T.blue, background:T.blueLight, padding:"2px 7px", borderRadius:4 }}>{p.sku}</span>
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{p.name}</div>
                      <div style={{ fontSize:10, color:T.textLight }}>{p.brand}</div>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:11, color:T.textMid }}>{p.cat}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:11, fontWeight:600, color:T.text }}>{top.name.length>20?top.name.slice(0,20)+"…":top.name}</div>
                      <NCCScoreBadge score={top.score} />
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:13, fontWeight:800, color:T.text }}>
                      {top.salePrice.toLocaleString()} <span style={{ fontSize:10, fontWeight:400, color:T.textLight }}>VND/m²</span>
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:12, fontWeight:700, color: totQty>0?T.text:T.red }}>{totQty.toLocaleString()} m²</div>
                      {p.stock.map(s => s.status!=="in_stock" && <StockBadge key={s.branch} status={s.status} />).filter(Boolean).slice(0,1)}
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      <Btn variant={isSel?"primary":"secondary"} size="sm">{isSel?"✕":"→"}</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        {/* Detail panel */}
        {selectedProduct && (
          <div style={{ width:380, flexShrink:0 }}>
            <Card style={{ overflow:"hidden" }}>
              {/* Product header */}
              <div style={{ padding:"16px 18px", borderBottom:`1px solid ${T.border}`, background: T.sidebar, color:"#fff" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:800 }}>{selectedProduct.name}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.5)", marginTop:2 }}>{selectedProduct.brand}</div>
                    <span style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color:T.greenMid, background:"rgba(109,176,43,.15)", padding:"2px 7px", borderRadius:4, display:"inline-block", marginTop:5 }}>{selectedProduct.sku}</span>
                  </div>
                  <Btn variant="ghost" size="sm" style={{ color:"rgba(255,255,255,.5)" }} onClick={()=>setSelectedProduct(null)}>✕</Btn>
                </div>
                <div style={{ marginTop:10, padding:"6px 10px", background:"rgba(232,56,13,.15)", border:"1px solid rgba(232,56,13,.3)", borderRadius:5, fontSize:10, color:"#FCA5A5", fontWeight:600 }}>
                  🔒 Read-only · Nguồn: ERP remak_db → Gold Pipeline
                </div>
              </div>

              {/* Sub tabs */}
              <div style={{ borderBottom:`1px solid ${T.border}`, display:"flex", padding:"0 12px", background:T.bg }}>
                <DetailTabBtn id="specs"     label="⚙ Thông số" />
                <DetailTabBtn id="suppliers" label="🏭 NCC & Giá" />
                <DetailTabBtn id="stock"     label="📦 Tồn kho" />
              </div>

              {/* Tab: Specs */}
              {detailTab === "specs" && (
                <div style={{ padding:16 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[
                      ["NRC",         selectedProduct.specs.nrc,        "Hệ số hấp thụ âm (0–1)"],
                      ["STC",         selectedProduct.specs.stc,        "Chỉ số cách âm (dB)"],
                      ["Lambda λ",    selectedProduct.specs.lambda,     "Hệ số dẫn nhiệt"],
                      ["R-value",     selectedProduct.specs.rValue,     "Trở nhiệt"],
                      ["Fire Rating", selectedProduct.specs.fireRating, "Chứng chỉ chống cháy"],
                      ["Độ dày",      selectedProduct.specs.thickness,  "Thickness"],
                      ["Xuất xứ",     selectedProduct.specs.origin,     "Origin"],
                    ].map(([label, val, tip]) => (
                      <div key={label} style={{ background:T.bg, borderRadius:7, padding:"10px 12px", border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:10, fontWeight:700, color:T.textLight, marginBottom:3 }}>{label}</div>
                        <div style={{ fontSize:14, fontWeight:800, color: val==="—"?T.textLight:T.text }}>{val}</div>
                        <div style={{ fontSize:9, color:T.textLight, marginTop:1 }}>{tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Suppliers */}
              {detailTab === "suppliers" && (
                <div style={{ padding:16, display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ fontSize:11, color:T.textLight, marginBottom:2 }}>
                    Pricing Agent sẽ chọn NCC có <b>Reliability Score cao nhất</b> khi tạo báo giá.
                  </div>
                  {[...selectedProduct.suppliers].sort((a,b)=>b.score-a.score).map((sup, idx) => (
                    <div key={sup.id} style={{
                      border:`1.5px solid ${idx===0?T.green:T.border}`, borderRadius:9, padding:14,
                      background: idx===0?T.greenLight:T.card,
                    }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{sup.name}</div>
                          <div style={{ fontSize:10, color:T.textLight, marginTop:1 }}>
                            {sup.certified && <span style={{ color:T.green, fontWeight:700 }}>✅ Certified · </span>}
                            Giao {sup.leadDays} ngày · {sup.inStock ? <span style={{ color:T.green }}>Còn hàng</span> : <span style={{ color:T.red }}>Hết hàng</span>}
                          </div>
                        </div>
                        <NCCScoreBadge score={sup.score} recommended={idx===0} />
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                        {[
                          ["Giá vốn", sup.costPrice.toLocaleString()+" ₫", T.textMid],
                          ["Giá sale", sup.salePrice.toLocaleString()+" ₫", T.text],
                          ["Margin", Math.round((sup.salePrice-sup.costPrice)/sup.salePrice*100)+"%", T.green],
                        ].map(([l,v,c]) => (
                          <div key={l} style={{ textAlign:"center" }}>
                            <div style={{ fontSize:10, color:T.textLight }}>{l}</div>
                            <div style={{ fontSize:13, fontWeight:800, color:c }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Stock */}
              {detailTab === "stock" && (
                <div style={{ padding:16 }}>
                  <div style={{ fontSize:10, color:T.textLight, marginBottom:12 }}>
                    🕐 Cập nhật: {syncTime} · Nguồn: mart_inventory_status
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {selectedProduct.stock.map(s => (
                      <div key={s.branch} style={{
                        padding:"12px 14px", borderRadius:8, border:`1px solid ${T.border}`,
                        background: s.status==="out_of_stock"?T.redLight:s.status==="low_stock"?T.yellowLight:T.bg,
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                      }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{s.branch}</div>
                          <div style={{ fontSize:10, color:T.textLight }}>Min: {s.minQty.toLocaleString()} m²</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:16, fontWeight:800, color: s.qty===0?T.red:T.text }}>{s.qty.toLocaleString()}</div>
                          <div style={{ fontSize:10, color:T.textLight }}>m²</div>
                          <StockBadge status={s.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:12, padding:"8px 12px", background:"#EFF6FF", borderRadius:6, fontSize:11, color:T.blue }}>
                    💡 Tồn kho real-time (ERP webhook): Phase 2 roadmap
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PAGE: NCC SUPPLIER PORTAL (US-S0-009) ──────────────────────────────────
// NCC Upload Documents — Supplier Portal UI

const NCC_DOC_TYPES = ["Brochure","Datasheet kỹ thuật","Chứng chỉ / Certificate","Báo giá NCC","Khác"];
const NCC_PRODUCTS = [
  { id:1, name:"Bông đá Stonewool 50mm",    sku:"RMK-SW-50" },
  { id:2, name:"Bông đá Stonewool 75mm",    sku:"RMK-SW-75" },
  { id:3, name:"Túi khí AirReflex 20mm",    sku:"RMK-AR-20" },
  { id:4, name:"Túi khí AirReflex 25mm",    sku:"RMK-AR-25" },
  { id:5, name:"Mút trứng tiêu âm 30mm",    sku:"RMK-MT-30" },
  { id:6, name:"Tấm chống cháy cấp B1",     sku:"RMK-FP-B1" },
];
const NCC_DOCS_INITIAL = [
  { id:1, name:"Stonewool_Brochure_v3.pdf",  type:"Brochure",           products:[{id:1},{id:2}], lang:"vi", version:"v3.0", size:"6.8 MB", uploadedAt:"06/06/2026", status:"active",       rejectReason:null },
  { id:2, name:"AirReflex_Datasheet_2024.pdf",type:"Datasheet kỹ thuật",products:[{id:3},{id:4}], lang:"vi", version:"2024-Q2",size:"3.1 MB",uploadedAt:"05/06/2026",status:"pending_review",rejectReason:null },
  { id:3, name:"FireBoard_Certificate_B1.docx",type:"Chứng chỉ / Certificate",products:[{id:6}],  lang:"vi", version:"Rev1", size:"1.4 MB", uploadedAt:"04/06/2026", status:"rejected",     rejectReason:"Thông số STC trong chứng chỉ không khớp với catalogue. Vui lòng cung cấp báo cáo kiểm định cập nhật nhất từ cơ quan có thẩm quyền." },
  { id:4, name:"Stonewool_TechSpec_EN.pdf",   type:"Datasheet kỹ thuật",products:[{id:1}],         lang:"en", version:"v2.1", size:"4.2 MB", uploadedAt:"03/06/2026", status:"processing",   rejectReason:null },
];

const STATUS_CFG = {
  uploading:      { label:"Đang tải lên",  color:"#60A5FA", bg:"#EFF6FF",  icon:"↑" },
  pending_review: { label:"Chờ duyệt",     color:"#D97706", bg:"#FEF3C7",  icon:"⏳" },
  under_review:   { label:"Đang được xem", color:"#7C3AED", bg:"#F0EDFF",  icon:"👁" },
  approved:       { label:"Đã duyệt",      color:"#059669", bg:"#D1FAE5",  icon:"✔" },
  processing:     { label:"Đang xử lý",    color:"#2563EB", bg:"#EFF6FF",  icon:"⚙" },
  active:         { label:"Hoạt động",     color:"#16A34A", bg:"#DCFCE7",  icon:"●" },
  rejected:       { label:"Bị từ chối",    color:"#DC2626", bg:"#FEE2E2",  icon:"✕" },
};
const DOC_TYPE_COLOR = {
  "Brochure":"#2563EB", "Datasheet kỹ thuật":"#7C3AED",
  "Chứng chỉ / Certificate":"#D97706", "Báo giá NCC":"#059669", "Khác":"#6B7280",
};

const SupplierPortal = () => {
  const [screen, setScreen]         = useState("list"); // list | upload
  const [docs, setDocs]             = useState(NCC_DOCS_INITIAL);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField]   = useState("uploadedAt");
  const [sortDir, setSortDir]       = useState("desc");
  const [searchQ, setSearchQ]       = useState("");
  const [rejectionPanel, setRejectionPanel] = useState(null);
  const [cancelConfirm, setCancelConfirm]   = useState(null);
  const [notifBanner, setNotifBanner]       = useState({ type:"success", msg:"1 tài liệu vừa được duyệt và đưa vào hệ thống AI." });
  const [toast, setToast]           = useState(null);
  // Upload form state
  const [uploadDragOver, setUploadDragOver] = useState(false);
  const [uploadFiles, setUploadFiles]   = useState([]);
  const [uploadDocType, setUploadDocType]   = useState("");
  const [uploadProducts, setUploadProducts] = useState([]);
  const [uploadLang, setUploadLang]     = useState("vi");
  const [uploadVersion, setUploadVersion]   = useState("");
  const [uploadNote, setUploadNote]     = useState("");
  const [uploadUrl, setUploadUrl]       = useState("");
  const [uploading, setUploading]       = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadError, setUploadError]   = useState({});
  const [resubmitRef, setResubmitRef]   = useState(null);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const formValid = (uploadFiles.length > 0 || uploadUrl.trim().length > 0)
    && uploadDocType !== "" && uploadProducts.length > 0;

  // Stats
  const stats = {
    total:   docs.length,
    pending: docs.filter(d=>d.status==="pending_review"||d.status==="under_review").length,
    active:  docs.filter(d=>d.status==="active").length,
    rejected:docs.filter(d=>d.status==="rejected").length,
  };

  // File validation
  const validateFile = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const allowed = ["pdf","docx","xlsx"];
    if (!allowed.includes(ext)) return `Định dạng .${ext} không được hỗ trợ. Vui lòng dùng: PDF, DOCX, XLSX.`;
    if (file.size > 50 * 1024 * 1024) return "Tệp vượt quá giới hạn 50MB. Vui lòng chia nhỏ tài liệu.";
    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault(); setUploadDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (uploadFiles.length + files.length > 5) {
      setUploadError(prev => ({...prev, _files:"Tối đa 5 tệp mỗi lần upload."}));
      return;
    }
    const errs = {};
    const valid = files.filter(f => { const err = validateFile(f); if(err) errs[f.name]=err; return !err; });
    setUploadError(prev => ({...prev, ...errs, _files:undefined}));
    setUploadFiles(prev => [...prev, ...valid].slice(0,5));
  };

  const handleFakeFile = (name, size) => {
    const fakeFile = { name, size: size*1024*1024, fakeSize: size+"MB", isFake:true };
    setUploadFiles(prev => [...prev.filter(f=>f.name!==name), fakeFile]);
    setUploadError(prev => { const n={...prev}; delete n[name]; return n; });
  };

  const startUpload = () => {
    if (!formValid) return;
    setUploading(true);
    const allFiles = uploadFiles.length > 0 ? uploadFiles : [{ name: uploadUrl, isFake:true, fakeSize:"URL" }];
    const progs = {};
    allFiles.forEach(f => progs[f.name] = 0);
    setUploadProgress(progs);
    let done = 0;
    allFiles.forEach(f => {
      let pct = 0;
      const iv = setInterval(() => {
        pct += Math.floor(Math.random()*18)+8;
        if (pct >= 100) {
          pct = 100; clearInterval(iv); done++;
          setUploadProgress(prev => ({...prev, [f.name]:100}));
          if (done === allFiles.length) {
            setTimeout(() => {
              const newDocs = allFiles.map((af,i) => ({
                id: Date.now()+i, name: af.name, type: uploadDocType,
                products: uploadProducts.map(pid => NCC_PRODUCTS.find(p=>p.id==pid)),
                lang: uploadLang, version: uploadVersion,
                size: af.fakeSize || ((af.size/1048576).toFixed(1)+" MB"),
                uploadedAt: new Date().toLocaleDateString("vi-VN"),
                status:"pending_review", rejectReason:null,
              }));
              setDocs(prev => [...newDocs, ...prev]);
              setUploading(false);
              setUploadFiles([]); setUploadDocType(""); setUploadProducts([]);
              setUploadVersion(""); setUploadNote(""); setUploadUrl(""); setUploadProgress({});
              setScreen("list");
              showToast("Upload thành công! Đang chờ Trainer duyệt.", "success");
            }, 400);
          }
        } else {
          setUploadProgress(prev => ({...prev, [f.name]:pct}));
        }
      }, 200);
    });
  };

  const handleCancelDoc = (doc) => {
    setDocs(docs.filter(d=>d.id!==doc.id));
    showToast(`Đã hủy tài liệu "${doc.name}"`, "info");
    setCancelConfirm(null);
  };

  const openResubmit = (doc) => {
    setResubmitRef(doc);
    setUploadDocType(doc.type);
    setUploadProducts(doc.products.map(p=>p.id));
    setUploadNote(`Phiên bản sửa theo phản hồi ngày ${doc.uploadedAt}`);
    setScreen("upload");
  };

  const toggleSort = (field) => {
    if (sortField===field) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const filteredDocs = docs
    .filter(d => {
      const matchSt = filterStatus==="all" || d.status===filterStatus;
      const matchQ  = d.name.toLowerCase().includes(searchQ.toLowerCase());
      return matchSt && matchQ;
    })
    .sort((a,b) => {
      if (a[sortField] < b[sortField]) return sortDir==="asc"?-1:1;
      if (a[sortField] > b[sortField]) return sortDir==="asc"?1:-1;
      return 0;
    });

  const SortTh = ({ field, label, w="auto" }) => (
    <th onClick={()=>toggleSort(field)} style={{ padding:"9px 12px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", width:w, userSelect:"none", background: sortField===field?"#EEF4E8":"transparent" }}>
      {label} {sortField===field ? (sortDir==="asc"?"↑":"↓") : <span style={{color:T.border}}>↕</span>}
    </th>
  );

  // ─── UPLOAD SCREEN ──────────────────────────────────────────────────────
  if (screen === "upload") return (
    <div style={{ padding:28, maxWidth:740, margin:"0 auto" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>{toast.msg}</div>}

      {/* Breadcrumb */}
      <div style={{ fontSize:11, color:T.textLight, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ cursor:"pointer", color:T.blue }} onClick={()=>setScreen("list")}>Tài liệu sản phẩm</span>
        <span>›</span>
        <span>{resubmitRef ? "Upload phiên bản mới" : "Upload tài liệu mới"}</span>
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"16px 22px", borderBottom:`1px solid ${T.border}`, background:T.bg, display:"flex", alignItems:"center", gap:12 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:16, color:T.text }}>{resubmitRef ? "📤 Upload phiên bản sửa" : "📤 Upload tài liệu mới"}</div>
            {resubmitRef && <div style={{ fontSize:11, color:T.orange, marginTop:2 }}>⚠ Đang upload lại: "{resubmitRef.name}"</div>}
          </div>
          <Btn variant="secondary" size="sm" style={{ marginLeft:"auto" }} onClick={()=>{setScreen("list");setResubmitRef(null);}}>Hủy</Btn>
        </div>

        <div style={{ padding:22, display:"flex", flexDirection:"column", gap:18 }}>
          {/* Drop Zone */}
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:T.textMid, marginBottom:8 }}>Chọn tệp <span style={{ color:T.red }}>*</span></div>
            <div
              onDragOver={e=>{e.preventDefault();setUploadDragOver(true);}}
              onDragLeave={()=>setUploadDragOver(false)}
              onDrop={handleDrop}
              style={{
                border:`2px dashed ${uploadDragOver?T.green:T.border}`,
                background: uploadDragOver?T.greenLight:T.bg,
                borderRadius:10, padding:"24px 20px", textAlign:"center", transition:"all .2s",
              }}
            >
              <div style={{ fontSize:28, marginBottom:6 }}>📂</div>
              <div style={{ fontSize:13, fontWeight:600, color:T.text, marginBottom:3 }}>Kéo thả file vào đây hoặc chọn file</div>
              <div style={{ fontSize:10, color:T.textLight, marginBottom:12 }}>PDF, DOCX, XLSX · Tối đa 50MB/file · Tối đa 5 file</div>
              {/* Demo files */}
              <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap" }}>
                {[["Stonewool_Brochure_v4.pdf",8],["AirReflex_Datasheet_v3.pdf",4],["Certificate_FireRating.docx",2]].map(([name,size])=>(
                  <button key={name} onClick={()=>handleFakeFile(name,size)} style={{ border:`1px solid ${T.border}`,borderRadius:5,background:T.card,padding:"4px 10px",fontSize:10,cursor:"pointer",color:T.textMid }}>
                    📄 {name.length>20?name.slice(0,20)+"…":name}
                  </button>
                ))}
              </div>
              <div style={{ fontSize:9, color:T.textLight, marginTop:6 }}>↑ Click file mẫu để demo</div>
            </div>

            {/* File queue */}
            {uploadFiles.length > 0 && (
              <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>
                {uploadFiles.map(f => (
                  <div key={f.name} style={{ display:"flex", alignItems:"center", gap:10, background:T.bg, borderRadius:7, padding:"8px 12px", border:`1px solid ${T.border}` }}>
                    <span style={{ fontSize:16 }}>📄</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div>
                      <div style={{ fontSize:10, color:T.textLight }}>{f.isFake ? f.fakeSize : (f.size/1048576).toFixed(1)+" MB"}</div>
                      {uploading && uploadProgress[f.name] !== undefined && (
                        <div style={{ marginTop:3 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:T.textLight }}>
                            <span>Đang tải lên...</span><span>{uploadProgress[f.name]}%</span>
                          </div>
                          <div style={{ height:3, background:T.border, borderRadius:2, marginTop:2 }}>
                            <div style={{ width:`${uploadProgress[f.name]}%`, height:"100%", background:T.green, borderRadius:2, transition:"width .15s" }} />
                          </div>
                        </div>
                      )}
                    </div>
                    {!uploading && <button onClick={()=>setUploadFiles(prev=>prev.filter(x=>x.name!==f.name))} style={{ border:"none",background:"transparent",cursor:"pointer",color:T.textLight,fontSize:14 }}>✕</button>}
                  </div>
                ))}
              </div>
            )}
            {Object.entries(uploadError).map(([k,v])=>v&&<div key={k} style={{ fontSize:11,color:T.red,marginTop:4 }}>⚠ {v}</div>)}
          </div>

          {/* URL input */}
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:T.textMid, marginBottom:6 }}>Hoặc nhập URL tài liệu online</div>
            <Input placeholder="https://..." value={uploadUrl} onChange={e=>setUploadUrl(e.target.value)} icon="🔗" />
            {uploadUrl && !uploadUrl.startsWith("https://") && <div style={{ fontSize:11,color:T.red,marginTop:3 }}>⚠ URL phải bắt đầu bằng https://</div>}
          </div>

          {/* Metadata form */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T.textMid, display:"block", marginBottom:6 }}>Loại tài liệu <span style={{ color:T.red }}>*</span></label>
              <select value={uploadDocType} onChange={e=>setUploadDocType(e.target.value)} style={{ width:"100%", border:`1px solid ${uploadDocType?"#6DB02B":T.border}`, borderRadius:7, padding:"8px 10px", fontSize:12, color:T.text, background:T.card }}>
                <option value="">— Chọn loại tài liệu —</option>
                {NCC_DOC_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T.textMid, display:"block", marginBottom:6 }}>Ngôn ngữ tài liệu <span style={{ color:T.red }}>*</span></label>
              <div style={{ display:"flex", gap:12, marginTop:4 }}>
                {[["vi","🇻🇳 Tiếng Việt"],["en","🇬🇧 English"],["other","Khác"]].map(([val,lbl])=>(
                  <label key={val} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer", fontSize:12, color:T.text }}>
                    <input type="radio" checked={uploadLang===val} onChange={()=>setUploadLang(val)} style={{ accentColor:T.green }} /> {lbl}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ gridColumn:"1 / -1" }}>
              <label style={{ fontSize:12, fontWeight:700, color:T.textMid, display:"block", marginBottom:6 }}>Sản phẩm liên quan <span style={{ color:T.red }}>*</span></label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {NCC_PRODUCTS.map(p=>{
                  const sel = uploadProducts.includes(p.id);
                  return (
                    <label key={p.id} style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 11px",borderRadius:6,cursor:"pointer",background:sel?T.greenLight:T.bg,border:`1.5px solid ${sel?T.green:T.border}`,fontSize:11,fontWeight:sel?700:400,color:sel?T.greenDark:T.textMid,transition:"all .12s" }}>
                      <input type="checkbox" checked={sel} onChange={()=>setUploadProducts(prev=>sel?prev.filter(x=>x!==p.id):[...prev,p.id])} style={{ accentColor:T.green,width:12,height:12 }} />
                      {p.name} <span style={{ fontFamily:"monospace",fontSize:9,color:T.textLight }}>({p.sku})</span>
                    </label>
                  );
                })}
              </div>
              {uploadProducts.length===0 && <div style={{ fontSize:10,color:T.red,marginTop:4 }}>Vui lòng chọn ít nhất một sản phẩm</div>}
            </div>

            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T.textMid, display:"block", marginBottom:6 }}>Phiên bản tài liệu</label>
              <Input placeholder='VD: "Rev 3.2", "2024-Q2"' value={uploadVersion} onChange={e=>setUploadVersion(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T.textMid, display:"block", marginBottom:6 }}>Ghi chú cho Trainer</label>
              <textarea value={uploadNote} onChange={e=>setUploadNote(e.target.value)} placeholder="Nội dung mới, thay đổi so với version trước, điểm cần lưu ý..." rows={2}
                style={{ width:"100%", border:`1px solid ${T.border}`, borderRadius:7, padding:"7px 10px", fontSize:12, color:T.text, resize:"vertical", outline:"none", boxSizing:"border-box" }} />
              <div style={{ fontSize:10, color:T.textLight, textAlign:"right" }}>{uploadNote.length}/500</div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display:"flex", gap:12, justifyContent:"flex-end", paddingTop:8, borderTop:`1px solid ${T.border}` }}>
            <Btn variant="secondary" onClick={()=>{setScreen("list");setResubmitRef(null);}}>Hủy</Btn>
            <button
              disabled={!formValid || uploading}
              onClick={startUpload}
              title={!formValid ? "Vui lòng điền đầy đủ Loại tài liệu và Sản phẩm liên quan" : "Sẵn sàng gửi"}
              style={{
                border:"none", borderRadius:7, padding:"10px 22px", fontSize:13, fontWeight:700,
                cursor: formValid&&!uploading ? "pointer" : "not-allowed",
                background: formValid&&!uploading ? T.orange : "#E5E7EB",
                color: formValid&&!uploading ? "#fff" : "#9CA3AF",
                transition:"all .15s", display:"flex", alignItems:"center", gap:8,
              }}
            >
              {uploading ? "⏳ Đang gửi..." : "📤 Gửi lên Remak"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  // ─── LIST SCREEN ────────────────────────────────────────────────────────
  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:18, position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:toast.type==="error"?T.orange:T.blue,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)",maxWidth:360 }}>{toast.type==="success"?"✅":toast.type==="error"?"❌":"ℹ️"} {toast.msg}</div>}

      {/* Notification banner */}
      {notifBanner && (
        <div style={{
          background: notifBanner.type==="success"?T.greenLight:T.redLight,
          border:`1px solid ${notifBanner.type==="success"?T.greenMid:"#FECACA"}`,
          borderRadius:8, padding:"10px 16px",
          display:"flex", alignItems:"center", gap:10,
          color: notifBanner.type==="success"?T.greenDark:T.red, fontSize:13, fontWeight:600,
        }}>
          {notifBanner.type==="success"?"✅":"❌"} {notifBanner.msg}
          <button onClick={()=>setNotifBanner(null)} style={{ marginLeft:"auto", border:"none", background:"transparent", cursor:"pointer", fontSize:16, color:"inherit", opacity:0.6 }}>✕</button>
        </div>
      )}

      {/* KPI stats + Upload button */}
      <div style={{ display:"flex", gap:14, alignItems:"stretch" }}>
        {[
          ["Tổng tài liệu", stats.total, T.text, "all"],
          ["Chờ duyệt",     stats.pending, "#D97706", "pending_review"],
          ["Hoạt động",     stats.active, T.green, "active"],
          ["Bị từ chối",   stats.rejected, T.red, "rejected"],
        ].map(([label,val,color,status]) => (
          <div key={label} onClick={()=>setFilterStatus(filterStatus===status?"all":status)} style={{
            flex:1, background:T.card, border:`1px solid ${filterStatus===status?color:T.border}`,
            borderRadius:10, padding:"14px 18px", cursor:"pointer", transition:"all .15s",
            background: filterStatus===status ? color+"15" : T.card,
          }}>
            <div style={{ fontSize:26, fontWeight:800, color }}>{val}</div>
            <div style={{ fontSize:11, color:T.textLight, marginTop:2 }}>{label}</div>
          </div>
        ))}
        <Btn variant="danger" style={{ flexShrink:0, padding:"0 22px", alignSelf:"stretch", justifyContent:"center", fontSize:13, background:T.orange }}
          onClick={()=>{setResubmitRef(null);setScreen("upload");}}>
          + Upload tài liệu mới
        </Btn>
      </div>

      {/* Filter bar */}
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <Input placeholder="Tìm tài liệu..." value={searchQ} onChange={e=>setSearchQ(e.target.value)} icon="🔍" style={{ width:240 }} />
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,color:T.text,background:T.card }}>
          <option value="all">Tất cả trạng thái</option>
          {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
        </select>
        <span style={{ fontSize:11, color:T.textLight, marginLeft:"auto" }}>Hiển thị {filteredDocs.length}/{docs.length} tài liệu</span>
      </div>

      {/* Document table */}
      <Card style={{ overflow:"hidden" }}>
        {filteredDocs.length === 0 ? (
          <div style={{ padding:"48px 20px", textAlign:"center", color:T.textLight }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
            <div style={{ fontSize:14, fontWeight:700, color:T.textMid, marginBottom:6 }}>Bạn chưa upload tài liệu nào.</div>
            <div style={{ fontSize:12, color:T.textLight, marginBottom:16 }}>Upload ngay để AI Remak có thể tư vấn sản phẩm của bạn.</div>
            <Btn variant="primary" onClick={()=>setScreen("upload")}>Upload tài liệu đầu tiên</Btn>
          </div>
        ) : (
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:T.bg }}>
                <SortTh field="name"       label="Tên tệp"       w="22%" />
                <SortTh field="type"       label="Loại tài liệu" w="14%" />
                <th style={{ padding:"9px 12px", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em", textTransform:"uppercase", width:"16%" }}>Sản phẩm</th>
                <SortTh field="uploadedAt" label="Ngày upload"   w="10%" />
                <th style={{ padding:"9px 12px", fontSize:10, fontWeight:700, color:T.textLight, width:"7%" }}>Kích thước</th>
                <SortTh field="status"     label="Trạng thái"    w="12%" />
                <th style={{ padding:"9px 12px", fontSize:10, fontWeight:700, color:T.textLight, width:"11%" }}>Lý do từ chối</th>
                <th style={{ padding:"9px 12px", fontSize:10, fontWeight:700, color:T.textLight, width:"8%" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, i) => {
                const st = STATUS_CFG[doc.status] || STATUS_CFG.pending_review;
                const dtColor = DOC_TYPE_COLOR[doc.type] || "#6B7280";
                return (
                  <tr key={doc.id} style={{ borderTop:`1px solid ${T.border}`, background:i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"11px 12px" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text, display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{doc.name.endsWith(".pdf")?"📄":doc.name.endsWith(".docx")?"📝":"📊"}</span>
                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={doc.name}>
                          {doc.name.length>22 ? doc.name.slice(0,22)+"…" : doc.name}
                        </span>
                      </div>
                      {doc.version && <div style={{ fontSize:9, color:T.textLight, marginTop:2, paddingLeft:22 }}>v{doc.version}</div>}
                    </td>
                    <td style={{ padding:"11px 12px" }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4, background:dtColor+"18", color:dtColor, border:`1px solid ${dtColor}30` }}>{doc.type}</span>
                    </td>
                    <td style={{ padding:"11px 12px" }}>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
                        {doc.products?.slice(0,2).map(p=>(
                          <span key={p?.id} style={{ fontSize:9, background:T.blueLight, color:T.blue, padding:"1px 6px", borderRadius:3, fontWeight:700 }}>{p?.sku||"?"}</span>
                        ))}
                        {doc.products?.length > 2 && <span style={{ fontSize:9, color:T.textLight }}>+{doc.products.length-2}</span>}
                      </div>
                    </td>
                    <td style={{ padding:"11px 12px", fontSize:11, color:T.textMid }}>{doc.uploadedAt}</td>
                    <td style={{ padding:"11px 12px", fontSize:11, color:T.textLight }}>{doc.size}</td>
                    <td style={{ padding:"11px 12px" }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:5, background:st.bg, color:st.color, display:"inline-flex", alignItems:"center", gap:4 }}>
                        <span>{st.icon}</span> {st.label}
                      </span>
                      {doc.status==="processing" && (
                        <div style={{ marginTop:4, width:80, height:3, background:T.border, borderRadius:2 }}>
                          <div style={{ width:"65%", height:"100%", background:T.blue, borderRadius:2 }} />
                        </div>
                      )}
                    </td>
                    <td style={{ padding:"11px 12px" }}>
                      {doc.rejectReason ? (
                        <span
                          onClick={()=>setRejectionPanel(doc)}
                          style={{ fontSize:11, color:T.red, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}
                          title={doc.rejectReason}
                        >
                          <span style={{ width:16,height:16,background:T.orange,color:"#fff",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,flexShrink:0 }}>!</span>
                          Xem lý do
                        </span>
                      ) : <span style={{ color:T.textLight, fontSize:11 }}>—</span>}
                    </td>
                    <td style={{ padding:"11px 12px" }}>
                      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                        {doc.status==="pending_review" && (
                          <Btn variant="secondary" size="sm" onClick={()=>setCancelConfirm(doc)}>Hủy</Btn>
                        )}
                        {doc.status==="rejected" && (
                          <>
                            <Btn variant="primary" size="sm" style={{ background:T.orange }} onClick={()=>openResubmit(doc)}>↩ Upload lại</Btn>
                            <Btn variant="danger" size="sm" onClick={()=>setDocs(docs.filter(d=>d.id!==doc.id))}>Xóa</Btn>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Rejection Panel */}
      {rejectionPanel && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"flex-end",zIndex:999 }}>
          <div style={{ width:420,height:"100vh",background:T.card,boxShadow:"-4px 0 24px rgba(0,0,0,.2)",display:"flex",flexDirection:"column" }}>
            <div style={{ padding:"18px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800,fontSize:15,color:T.text }}>Lý do từ chối</div>
                <div style={{ fontSize:11,color:T.textLight,marginTop:2 }}>{rejectionPanel.name}</div>
              </div>
              <Btn variant="ghost" size="sm" onClick={()=>setRejectionPanel(null)}>✕</Btn>
            </div>
            <div style={{ flex:1,padding:22,overflowY:"auto" }}>
              <div style={{ background:T.redLight,border:`1px solid #FECACA`,borderRadius:8,padding:14,marginBottom:16 }}>
                <div style={{ fontSize:12,fontWeight:700,color:T.red,marginBottom:8 }}>⚠️ Tài liệu bị từ chối — Phản hồi từ Trainer:</div>
                <div style={{ fontSize:13,color:T.textMid,lineHeight:1.7 }}>{rejectionPanel.rejectReason}</div>
              </div>
              <div style={{ fontSize:11,color:T.textLight,marginBottom:16 }}>Ngày từ chối: {rejectionPanel.uploadedAt}</div>
              <Btn variant="primary" style={{ width:"100%",justifyContent:"center",background:T.orange }} onClick={()=>{openResubmit(rejectionPanel);setRejectionPanel(null);}}>
                📤 Upload phiên bản mới
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Cancel confirm */}
      {cancelConfirm && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:400,padding:24 }}>
            <div style={{ fontWeight:800,fontSize:15,color:T.text,marginBottom:8 }}>Hủy tài liệu?</div>
            <div style={{ fontSize:13,color:T.textMid,marginBottom:16 }}>Tài liệu <b>"{cancelConfirm.name}"</b> sẽ bị xóa và không gửi đến Trainer.</div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={()=>setCancelConfirm(null)}>Giữ lại</Btn>
              <Btn variant="danger" onClick={()=>handleCancelDoc(cancelConfirm)}>Hủy tài liệu</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};


// ════════════════════════════════════════════════════════════════════════════
// E4 – CONVERSATIONS (Hội thoại & Case Management) — FN4.1 / F4.2 / F4.3 / F4.4
// ════════════════════════════════════════════════════════════════════════════
const CONV_DATA = [
  { id:"C001", channel:"web",  visitor:"Nguyễn Văn A",       preview:"Hỏi về cách âm phòng thu, cần báo giá 80m²",          intent:"Tư vấn kỹ thuật", status:"assigned",   agent:"sales@remak.vn", tags:["lead-hot","cần-báo-giá"],          createdAt:"08/06 09:12", updatedAt:"08/06 09:45", messages:12, confidence:0.92, escalated:false, label:"good" },
  { id:"C002", channel:"zalo", visitor:"Trần Thị B (Zalo)",  preview:"Muốn so sánh bông đá Stonewool và AirReflex",          intent:"So sánh sản phẩm",status:"handoff",    agent:"cs@remak.vn",    tags:["lead-warm"],                        createdAt:"08/06 08:30", updatedAt:"08/06 09:40", messages:8,  confidence:0.54, escalated:true,  label:"needs_improvement" },
  { id:"C003", channel:"web",  visitor:"Lê Minh C",           preview:"Hỏi tiêu chuẩn chống cháy cấp B1 cho nhà xưởng",     intent:"Thông số kỹ thuật",status:"ai_only",   agent:"AI",             tags:[],                                    createdAt:"08/06 10:01", updatedAt:"08/06 10:22", messages:5,  confidence:0.88, escalated:false, label:null },
  { id:"C004", channel:"zalo", visitor:"Công ty XD Phú An",  preview:"Cần 2000m² bông khoáng cho dự án nhà máy ở Bình Dương",intent:"Đặt hàng lớn",    status:"assigned",   agent:"nctruong@remak.vn",tags:["lead-hot","enterprise","cần-báo-giá"], createdAt:"07/06 14:20", updatedAt:"08/06 08:15", messages:23, confidence:0.79, escalated:false, label:"good" },
  { id:"C005", channel:"web",  visitor:"Phạm D",              preview:"Sản phẩm này có sẵn hàng không?",                     intent:"Kiểm tra tồn kho", status:"resolved",   agent:"AI",             tags:["lead-cold"],                        createdAt:"07/06 11:00", updatedAt:"07/06 11:05", messages:3,  confidence:0.95, escalated:false, label:"good" },
  { id:"C006", channel:"web",  visitor:"Hoàng E",             preview:"Cách tính R-value cho mái tôn 300m²",                 intent:"Tính toán kỹ thuật",status:"ai_only",   agent:"AI",             tags:[],                                    createdAt:"08/06 10:45", updatedAt:"08/06 11:00", messages:7,  confidence:0.85, escalated:false, label:null },
];

const CONV_MSGS = [
  { id:1, role:"user",   content:"Chào Remak, tôi cần tư vấn cách âm cho phòng thu âm diện tích 80m², trần cao 3.5m. Ngân sách khoảng 150 triệu.", time:"09:12" },
  { id:2, role:"ai",     content:"Chào anh/chị! Với phòng thu âm 80m² và trần 3.5m, Remak đề xuất giải pháp kết hợp:\n\n**Tường (60m²):** Mút trứng tiêu âm 50mm (NRC=0.85) + Bông đá Stonewool 50mm phía sau\n**Trần (80m²):** Panel cách âm Acoustic 30mm\n**Sàn:** Thảm tiêu âm 10mm\n\nNRC tổng thể đạt 0.80–0.88, phù hợp tiêu chuẩn phòng thu.", time:"09:13", citations:["Catalogue Stonewool 2024 – trang 12","Mút trứng tiêu âm spec sheet"] },
  { id:3, role:"user",   content:"Chi phí ước tính bao nhiêu?", time:"09:15" },
  { id:4, role:"ai",     content:"Ước tính sơ bộ:\n- Mút trứng 50mm: 60m² × 52.000đ = **3.12M**\n- Stonewool 50mm: 60m² × 45.000đ = **2.7M**\n- Acoustic panel: 80m² × 68.000đ = **5.44M**\n- Thảm tiêu âm: 80m² × 25.000đ = **2M**\n\n**Tổng ước tính: ~13.26M** (chưa bao gồm thi công)\n\nKhuyến nghị tạo báo giá chi tiết để có giá chính xác.", time:"09:16", citations:["Product_Spec_Table.xlsx – Sheet Pricing"] },
  { id:5, role:"user",   content:"Được, cho tôi báo giá chính thức.", time:"09:30" },
  { id:6, role:"ai",     content:"Tôi đã tạo draft báo giá #Q-2026-042 cho anh/chị. Nhân viên Sales sẽ liên hệ để xác nhận chi tiết và điều chỉnh theo yêu cầu cụ thể.", time:"09:30", isHandoff:true },
];

const ConversationsPage = () => {
  const [selectedConv, setSelectedConv] = useState(CONV_DATA[0]);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterChannel, setFilterChannel] = useState("all");
  const [replyText, setReplyText]       = useState("");
  const [showTagModal, setShowTagModal] = useState(false);
  const [labelModal, setLabelModal]     = useState(null);
  const [activeTab, setActiveTab]       = useState("chat"); // chat | labeling | rag_review
  const [toast, setToast]               = useState(null);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),2500); };

  const STATUS_CFG = {
    ai_only:  { label:"AI đang xử lý", color:"#2563EB", bg:"#EFF6FF", icon:"🤖" },
    assigned: { label:"Đã gán Sales",  color:"#6DB02B", bg:"#EBF5E0", icon:"👤" },
    handoff:  { label:"Chờ CS",        color:"#D97706", bg:"#FEF3C7", icon:"⏳" },
    resolved: { label:"Đã xử lý",     color:"#6B7280", bg:"#F4F6F3", icon:"✅" },
  };

  const CHANNEL_ICON = { web:"🌐", zalo:"💙" };
  const LABEL_OPTS   = [
    { value:"good",             label:"✅ Tốt",                  color:"#166534", bg:"#DCFCE7" },
    { value:"needs_improvement",label:"⚠️ Cần cải thiện",         color:"#92400E", bg:"#FEF3C7" },
    { value:"bad",              label:"❌ Sai hoàn toàn",         color:"#991B1B", bg:"#FEE2E2" },
  ];

  const TAGS_POOL = ["lead-hot","lead-warm","lead-cold","cần-báo-giá","enterprise","follow-up","VIP","đã-mua","tư-vấn-lại"];

  const filtered = CONV_DATA.filter(c => {
    const q = search.toLowerCase();
    const mQ  = c.visitor.toLowerCase().includes(q)||c.preview.toLowerCase().includes(q);
    const mSt = filterStatus==="all" || c.status===filterStatus;
    const mCh = filterChannel==="all" || c.channel===filterChannel;
    return mQ && mSt && mCh;
  });

  const conv = selectedConv;
  const stCfg = STATUS_CFG[conv?.status]||STATUS_CFG.ai_only;

  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setActiveTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:activeTab===id?700:500,fontSize:12,padding:"8px 12px",borderBottom:activeTab===id?`2px solid ${T.green}`:"2px solid transparent",background:"transparent",color:activeTab===id?T.green:T.textMid }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ display:"flex",height:"calc(100vh - 56px)",overflow:"hidden",fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>{toast.msg}</div>}

      {/* ── LEFT: Conversation list ─────────────────────────────────────── */}
      <div style={{ width:320,flexShrink:0,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",background:T.card }}>
        {/* Filters */}
        <div style={{ padding:"12px 14px",borderBottom:`1px solid ${T.border}` }}>
          <Input placeholder="Tìm hội thoại..." value={search} onChange={e=>setSearch(e.target.value)} icon="🔍" />
          <div style={{ display:"flex",gap:6,marginTop:8 }}>
            {[["all","Tất cả"],["ai_only","AI"],["assigned","Sales"],["handoff","CS"],["resolved","Xong"]].map(([k,l])=>(
              <button key={k} onClick={()=>setFilterStatus(k)} style={{ flex:1,border:"none",cursor:"pointer",padding:"4px 6px",fontSize:10,fontWeight:filterStatus===k?700:400,background:filterStatus===k?T.green:T.bg,color:filterStatus===k?"#fff":T.textMid,borderRadius:5 }}>{l}</button>
            ))}
          </div>
          <div style={{ display:"flex",gap:6,marginTop:6 }}>
            {[["all","Tất cả"],["web","Web"],["zalo","Zalo"]].map(([k,l])=>(
              <button key={k} onClick={()=>setFilterChannel(k)} style={{ border:`1px solid ${filterChannel===k?T.blue:T.border}`,cursor:"pointer",padding:"3px 10px",fontSize:10,fontWeight:filterChannel===k?700:400,background:filterChannel===k?T.blueLight:T.card,color:filterChannel===k?T.blue:T.textMid,borderRadius:10 }}>{l}</button>
            ))}
            <span style={{ marginLeft:"auto",fontSize:10,color:T.textLight,alignSelf:"center" }}>{filtered.length} cuộc</span>
          </div>
        </div>
        {/* List */}
        <div style={{ flex:1,overflowY:"auto" }}>
          {filtered.map(c => {
            const st = STATUS_CFG[c.status]||STATUS_CFG.ai_only;
            const isSel = selectedConv?.id===c.id;
            return (
              <div key={c.id} onClick={()=>setSelectedConv(c)} style={{ padding:"12px 14px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isSel?T.greenLight:"transparent",borderLeft:isSel?`3px solid ${T.green}`:"3px solid transparent",transition:"all .12s" }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                  <span style={{ fontSize:14 }}>{CHANNEL_ICON[c.channel]}</span>
                  <span style={{ fontSize:12,fontWeight:700,color:T.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{c.visitor}</span>
                  <span style={{ fontSize:9,background:st.bg,color:st.color,padding:"1px 6px",borderRadius:8,fontWeight:700,flexShrink:0 }}>{st.icon}</span>
                </div>
                <div style={{ fontSize:11,color:T.textMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:4 }}>{c.preview}</div>
                <div style={{ display:"flex",gap:4,alignItems:"center" }}>
                  {c.tags.slice(0,2).map(t=><span key={t} style={{ fontSize:8,background:T.bg,border:`1px solid ${T.border}`,padding:"1px 5px",borderRadius:6,color:T.textMid }}>{t}</span>)}
                  {c.escalated && <span style={{ fontSize:8,background:T.redLight,color:T.red,padding:"1px 5px",borderRadius:6,fontWeight:700 }}>escalated</span>}
                  <span style={{ marginLeft:"auto",fontSize:9,color:T.textLight }}>{c.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CENTER: Chat thread ──────────────────────────────────────────── */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
        {/* Conv header */}
        {conv && (
          <div style={{ padding:"10px 18px",borderBottom:`1px solid ${T.border}`,background:T.card,display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <span style={{ fontSize:16 }}>{CHANNEL_ICON[conv.channel]}</span>
                <span style={{ fontWeight:700,fontSize:14,color:T.text }}>{conv.visitor}</span>
                <span style={{ fontSize:10,background:stCfg.bg,color:stCfg.color,padding:"2px 8px",borderRadius:6,fontWeight:700 }}>{stCfg.icon} {stCfg.label}</span>
                <span style={{ fontSize:10,background:T.bg,color:T.textMid,padding:"2px 8px",borderRadius:6 }}>#{conv.id}</span>
                {conv.confidence && <span style={{ fontSize:10,color:conv.confidence>0.7?T.green:"#D97706",fontWeight:700 }}>AI {Math.round(conv.confidence*100)}%</span>}
              </div>
              <div style={{ fontSize:10,color:T.textLight,marginTop:2 }}>{conv.intent} · {conv.messages} tin nhắn · {conv.updatedAt}</div>
            </div>
            <div style={{ display:"flex",gap:6 }}>
              <Btn variant="secondary" size="sm" onClick={()=>setShowTagModal(true)}>🏷 Tag</Btn>
              <Btn variant="secondary" size="sm" onClick={()=>setLabelModal(conv)}>⭐ Label</Btn>
              <Btn variant="primary" size="sm">📋 Tạo báo giá</Btn>
              {conv.status!=="resolved" && <Btn variant="danger" size="sm" style={{ background:"#6B7280" }}>✅ Resolve</Btn>}
            </div>
          </div>
        )}

        {/* Sub-tabs */}
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 16px",background:T.card }}>
          <TabBtn id="chat"       label="Hội thoại" icon="💬" />
          <TabBtn id="labeling"   label="Labeling & Feedback" icon="⭐" />
          <TabBtn id="rag_review" label="RAG Relevance" icon="🔍" />
        </div>

        {/* Chat messages */}
        {activeTab==="chat" && (
          <div style={{ flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14,background:"#F8FAF6" }}>
            {CONV_MSGS.map(msg => (
              <div key={msg.id} style={{ display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start",gap:4 }}>
                {msg.isHandoff && (
                  <div style={{ alignSelf:"center",background:T.yellowLight,border:"1px solid #FDE68A",borderRadius:8,padding:"6px 14px",fontSize:11,color:"#92400E",margin:"4px 0" }}>
                    ↩ Handoff to Sales — Draft Quote #Q-2026-042 created
                  </div>
                )}
                <div style={{
                  maxWidth:"72%",padding:"10px 14px",borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                  background:msg.role==="user"?"#DCF8C6":T.card,
                  border:msg.role==="ai"?`1px solid ${T.border}`:"none",
                  boxShadow:"0 1px 3px rgba(0,0,0,.08)",
                }}>
                  {msg.role==="ai" && <div style={{ fontSize:10,fontWeight:700,color:T.green,marginBottom:4 }}>🤖 AI Remak</div>}
                  <div style={{ fontSize:13,color:T.text,lineHeight:1.6,whiteSpace:"pre-line" }}>{msg.content}</div>
                  {msg.citations && (
                    <div style={{ marginTop:8,paddingTop:8,borderTop:`1px solid ${T.border}` }}>
                      <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:4 }}>📚 Nguồn tham khảo:</div>
                      {msg.citations.map(c=>(
                        <div key={c} style={{ fontSize:10,color:T.blue,display:"flex",alignItems:"center",gap:4,marginBottom:2 }}>
                          <span>📄</span>{c}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize:9,color:T.textLight,marginTop:4,textAlign:"right" }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Labeling tab */}
        {activeTab==="labeling" && (
          <div style={{ flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ background:T.blueLight,border:`1px solid #BFDBFE`,borderRadius:8,padding:12,fontSize:12,color:T.blue }}>
              💡 Labeling giúp cải thiện AI. Gắn nhãn các câu trả lời không tốt để Trainer review và tạo golden dataset.
            </div>
            {CONV_MSGS.filter(m=>m.role==="ai").map(msg=>(
              <Card key={msg.id} style={{ padding:14 }}>
                <div style={{ fontSize:12,color:T.textMid,marginBottom:8,lineHeight:1.6 }}>{msg.content.slice(0,120)}...</div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {LABEL_OPTS.map(l=>(
                    <button key={l.value} style={{ border:`1.5px solid ${l.color}40`,cursor:"pointer",padding:"4px 12px",borderRadius:6,fontSize:11,fontWeight:600,background:l.bg,color:l.color,transition:"all .12s" }}>
                      {l.label}
                    </button>
                  ))}
                  <input placeholder="Ghi chú lý do (tùy chọn)..." style={{ flex:1,border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",fontSize:11,minWidth:200 }} />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* RAG Review tab */}
        {activeTab==="rag_review" && (
          <div style={{ flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:12 }}>
            <div style={{ fontSize:13,fontWeight:700,color:T.text,marginBottom:2 }}>RAG Relevance Review — {conv?.id}</div>
            <div style={{ fontSize:11,color:T.textLight,marginBottom:8 }}>Đánh dấu chunks nào relevant/không để cải thiện retrieval.</div>
            {[
              { chunk:"Catalogue_Stonewool_2024.pdf – trang 12", content:"Mút trứng tiêu âm Remak® NRC=0.85, độ dày 50mm, phù hợp phòng thu, home cinema...", score:0.94, marked:true },
              { chunk:"Datasheet_AirReflex.pdf – trang 3", content:"AirReflex 20mm chuyên cách nhiệt mái tôn, R-value=0.71 m²K/W, không phù hợp tiêu âm...", score:0.61, marked:false },
              { chunk:"Product_Spec_Table.xlsx – Sheet Pricing", content:"Bảng giá Q2-2026: Mút trứng 50mm: 52,000 VND/m², Stonewool 50mm: 45,000 VND/m²...", score:0.88, marked:true },
            ].map((chunk,i)=>(
              <div key={i} style={{ padding:12,borderRadius:8,border:`1px solid ${chunk.marked?T.greenMid:T.border}`,background:chunk.marked?T.greenLight:T.card }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
                  <span style={{ fontSize:11,fontWeight:700,color:T.blue }}>📄 {chunk.chunk}</span>
                  <span style={{ fontSize:11,fontWeight:800,color:chunk.score>0.8?T.green:"#D97706",marginLeft:"auto" }}>Score: {chunk.score}</span>
                </div>
                <div style={{ fontSize:11,color:T.textMid,lineHeight:1.5,marginBottom:8 }}>{chunk.content}</div>
                <div style={{ display:"flex",gap:6 }}>
                  <Btn variant={chunk.marked?"primary":"secondary"} size="sm">✅ Relevant</Btn>
                  <Btn variant={!chunk.marked?"danger":"secondary"} size="sm">❌ Irrelevant</Btn>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reply bar */}
        {conv && conv.status!=="resolved" && activeTab==="chat" && (
          <div style={{ padding:"12px 18px",borderTop:`1px solid ${T.border}`,background:T.card,display:"flex",gap:10,alignItems:"flex-end" }}>
            <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Gõ phản hồi (Sales override AI)... hoặc để AI tiếp tục" rows={2}
              style={{ flex:1,border:`1px solid ${T.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,resize:"none",outline:"none" }} />
            <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
              <Btn variant="primary" size="sm" disabled={!replyText} onClick={()=>{ showToast("Đã gửi phản hồi"); setReplyText(""); }}>Gửi ↑</Btn>
              <Btn variant="secondary" size="sm">AI tiếp</Btn>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Context panel ─────────────────────────────────────────── */}
      {conv && (
        <div style={{ width:280,flexShrink:0,borderLeft:`1px solid ${T.border}`,overflowY:"auto",background:T.card }}>
          <div style={{ padding:"12px 16px",borderBottom:`1px solid ${T.border}`,fontWeight:700,fontSize:13,color:T.text }}>Thông tin hội thoại</div>
          <div style={{ padding:16,display:"flex",flexDirection:"column",gap:14 }}>
            {/* Tags */}
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:6,letterSpacing:"0.06em" }}>TAGS</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                {conv.tags.map(t=><span key={t} style={{ fontSize:10,background:T.greenLight,color:T.greenDark,padding:"2px 8px",borderRadius:10,border:`1px solid ${T.greenMid}` }}>{t}</span>)}
                <span onClick={()=>setShowTagModal(true)} style={{ fontSize:10,background:T.bg,color:T.textMid,padding:"2px 8px",borderRadius:10,border:`1px dashed ${T.border}`,cursor:"pointer" }}>+ Thêm</span>
              </div>
            </div>
            {/* Label */}
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:6,letterSpacing:"0.06em" }}>LABEL CHẤT LƯỢNG</div>
              {conv.label
                ? <span style={{ fontSize:11,fontWeight:700,background:LABEL_OPTS.find(l=>l.value===conv.label)?.bg,color:LABEL_OPTS.find(l=>l.value===conv.label)?.color,padding:"3px 10px",borderRadius:5 }}>
                    {LABEL_OPTS.find(l=>l.value===conv.label)?.label}
                  </span>
                : <span style={{ fontSize:11,color:T.textLight,fontStyle:"italic" }}>Chưa gắn nhãn</span>
              }
            </div>
            {/* AI stats */}
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:6,letterSpacing:"0.06em" }}>AI METRICS</div>
              {[["Confidence",`${Math.round(conv.confidence*100)}%`],["Intent",conv.intent],["Messages",conv.messages],["Channel",conv.channel.toUpperCase()]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:11,padding:"4px 0",borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:T.textLight }}>{k}</span>
                  <span style={{ color:T.text,fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            {/* Escalation */}
            {conv.escalated && (
              <div style={{ background:T.redLight,border:"1px solid #FECACA",borderRadius:7,padding:10,fontSize:11,color:T.red }}>
                ⚠️ Hội thoại này đã được escalate. CS đang xử lý.
              </div>
            )}
            {/* Quick actions */}
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:6,letterSpacing:"0.06em" }}>HÀNH ĐỘNG NHANH</div>
              <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
                <Btn variant="secondary" size="sm" style={{ justifyContent:"center" }}>📋 Tạo Draft Quote</Btn>
                <Btn variant="secondary" size="sm" style={{ justifyContent:"center" }}>📧 Gửi email tóm tắt</Btn>
                <Btn variant="secondary" size="sm" style={{ justifyContent:"center" }}>🔗 Xem lịch sử KH</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Modal */}
      {showTagModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:380,padding:22 }}>
            <div style={{ fontWeight:700,fontSize:14,color:T.text,marginBottom:12 }}>🏷 Gán tag cho hội thoại</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:14 }}>
              {TAGS_POOL.map(t=>(
                <span key={t} onClick={()=>showToast(`Tag "${t}" đã gán`)} style={{ fontSize:11,cursor:"pointer",background:conv.tags.includes(t)?T.greenLight:T.bg,color:conv.tags.includes(t)?T.greenDark:T.textMid,border:`1px solid ${conv.tags.includes(t)?T.green:T.border}`,padding:"4px 10px",borderRadius:10,fontWeight:conv.tags.includes(t)?700:400 }}>
                  {conv.tags.includes(t)?"✓ ":""}{t}
                </span>
              ))}
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <Input placeholder="Tag mới..." style={{ flex:1 }} />
              <Btn variant="secondary" size="sm" onClick={()=>setShowTagModal(false)}>Xong</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// E5 – QUOTES (Báo giá tự động) — FN5.1 / F5.2
// ════════════════════════════════════════════════════════════════════════════
const QUOTES_DATA = [
  { id:"Q-2026-042", conv:"C001", customer:"Nguyễn Văn A",      status:"draft",    salesOwner:"nctruong@remak.vn", total:13260000, vat:1326000, items:[{sku:"RMK-MT-30",name:"Mút trứng tiêu âm 50mm",qty:60,unit:"m²",price:52000,disc:0},{sku:"RMK-SW-50",name:"Bông đá Stonewool 50mm",qty:60,unit:"m²",price:45000,disc:5},{sku:"RMK-AC-25",name:"Acoustic Panel 30mm",qty:80,unit:"m²",price:68000,disc:0}], createdAt:"08/06/2026 09:30", updatedAt:"08/06 09:45", aiExtracted:true, notes:"Phòng thu âm 80m²" },
  { id:"Q-2026-041", conv:"C004", customer:"Công ty XD Phú An", status:"assigned", salesOwner:"nctruong@remak.vn", total:98000000, vat:9800000, items:[{sku:"RMK-SW-50",name:"Bông đá Stonewool 50mm",qty:2000,unit:"m²",price:45000,disc:8}], createdAt:"07/06/2026 14:30", updatedAt:"08/06 08:15", aiExtracted:true, notes:"Nhà máy Bình Dương 2000m²" },
  { id:"Q-2026-040", conv:"C003", customer:"Lê Minh C",          status:"draft",    salesOwner:null,               total:7200000, vat:720000, items:[{sku:"RMK-FP-B1",name:"Tấm chống cháy B1",qty:60,unit:"m²",price:120000,disc:0}], createdAt:"07/06/2026 10:00", updatedAt:"07/06 10:20", aiExtracted:true, notes:"Nhà xưởng cấp B1" },
];

const QuotesPage = () => {
  const [quotes, setQuotes]           = useState(QUOTES_DATA);
  const [selectedQuote, setSelectedQuote] = useState(QUOTES_DATA[0]);
  const [editItems, setEditItems]     = useState(null);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast]             = useState(null);
  const [assignModal, setAssignModal] = useState(null);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),2500); };

  const Q_STATUS = {
    draft:    { label:"Draft",       color:"#D97706", bg:"#FEF3C7", icon:"📝" },
    assigned: { label:"Đã gán",      color:"#2563EB", bg:"#EFF6FF", icon:"👤" },
    approved: { label:"Đã duyệt",    color:"#166534", bg:"#DCFCE7", icon:"✅" },
    rejected: { label:"Từ chối",     color:"#991B1B", bg:"#FEE2E2", icon:"❌" },
  };

  const fmt = (n) => n?.toLocaleString("vi-VN");
  const filtered = quotes.filter(q=>{
    const mQ  = q.customer.toLowerCase().includes(search.toLowerCase())||q.id.includes(search);
    const mSt = filterStatus==="all"||q.status===filterStatus;
    return mQ && mSt;
  });
  const q = selectedQuote;
  const items = editItems || q?.items;

  const updateItem = (idx,field,val) => {
    const next = [...items];
    next[idx] = {...next[idx],[field]:field==="qty"||field==="price"||field==="disc"?Number(val):val};
    setEditItems(next);
  };
  const lineTotal = (item) => Math.round(item.qty*item.price*(1-item.disc/100));
  const subTotal  = items?.reduce((s,i)=>s+lineTotal(i),0)||0;
  const vatAmt    = Math.round(subTotal*0.1);

  return (
    <div style={{ display:"flex",height:"calc(100vh - 56px)",overflow:"hidden",fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}

      {/* Quote list */}
      <div style={{ width:300,flexShrink:0,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",background:T.card }}>
        <div style={{ padding:"12px 14px",borderBottom:`1px solid ${T.border}` }}>
          <Input placeholder="Tìm báo giá..." value={search} onChange={e=>setSearch(e.target.value)} icon="🔍" />
          <div style={{ display:"flex",gap:4,marginTop:8 }}>
            {[["all","Tất cả"],["draft","Draft"],["assigned","Đã gán"],["approved","Duyệt"]].map(([k,l])=>(
              <button key={k} onClick={()=>setFilterStatus(k)} style={{ flex:1,border:"none",cursor:"pointer",padding:"4px 4px",fontSize:9,fontWeight:filterStatus===k?700:400,background:filterStatus===k?T.green:T.bg,color:filterStatus===k?"#fff":T.textMid,borderRadius:4 }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ flex:1,overflowY:"auto" }}>
          {filtered.map(q=>{
            const st = Q_STATUS[q.status]||Q_STATUS.draft;
            const isSel = selectedQuote?.id===q.id;
            return (
              <div key={q.id} onClick={()=>{setSelectedQuote(q);setEditItems(null);}} style={{ padding:"12px 14px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isSel?T.greenLight:"transparent",borderLeft:isSel?`3px solid ${T.green}`:"3px solid transparent" }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3 }}>
                  <span style={{ fontSize:11,fontFamily:"monospace",fontWeight:700,color:T.blue }}>{q.id}</span>
                  <span style={{ fontSize:9,background:st.bg,color:st.color,padding:"1px 6px",borderRadius:8,fontWeight:700,marginLeft:"auto" }}>{st.icon} {st.label}</span>
                </div>
                <div style={{ fontSize:12,fontWeight:600,color:T.text,marginBottom:2 }}>{q.customer}</div>
                <div style={{ fontSize:11,color:T.green,fontWeight:700 }}>{fmt(q.total)} đ</div>
                {q.aiExtracted && <span style={{ fontSize:8,background:"#F0EDFF",color:"#5B21B6",padding:"1px 6px",borderRadius:4,marginTop:3,display:"inline-block" }}>🤖 AI extracted</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote detail */}
      {q && (
        <div style={{ flex:1,overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:18 }}>
          {/* Header */}
          <div style={{ display:"flex",alignItems:"flex-start",gap:16 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                <div style={{ fontWeight:800,fontSize:20,color:T.text }}>{q.id}</div>
                <span style={{ fontSize:11,background:Q_STATUS[q.status]?.bg,color:Q_STATUS[q.status]?.color,padding:"3px 10px",borderRadius:6,fontWeight:700 }}>{Q_STATUS[q.status]?.icon} {Q_STATUS[q.status]?.label}</span>
                {q.aiExtracted && <span style={{ fontSize:10,background:"#F0EDFF",color:"#5B21B6",padding:"2px 8px",borderRadius:5,fontWeight:700 }}>🤖 AI Auto-extracted</span>}
              </div>
              <div style={{ fontSize:12,color:T.textLight }}>{q.customer} · {q.notes} · Tạo: {q.createdAt}</div>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              {q.status==="draft" && !editItems && <Btn variant="primary" onClick={()=>setEditItems([...q.items])}>✏️ Chỉnh sửa</Btn>}
              {editItems && <>
                <Btn variant="secondary" onClick={()=>setEditItems(null)}>Hủy</Btn>
                <Btn variant="primary" onClick={()=>{ setQuotes(quotes.map(x=>x.id===q.id?{...x,items:editItems,total:subTotal,updatedAt:"Vừa xong"}:x)); setSelectedQuote({...q,items:editItems,total:subTotal}); setEditItems(null); showToast("Đã lưu báo giá"); }}>💾 Lưu</Btn>
              </>}
              {q.status==="draft" && !editItems && <Btn variant="secondary" onClick={()=>setAssignModal(q)}>👤 Gán Sales</Btn>}
              {q.status==="draft" && !editItems && <Btn variant="secondary">📄 Xuất PDF</Btn>}
            </div>
          </div>

          {/* Line items table */}
          <Card style={{ overflow:"hidden" }}>
            <div style={{ padding:"12px 18px",borderBottom:`1px solid ${T.border}`,fontWeight:700,fontSize:13,color:T.text,display:"flex",gap:10 }}>
              Sản phẩm & Dịch vụ
              {editItems && <Btn variant="secondary" size="sm" onClick={()=>setEditItems([...editItems,{sku:"",name:"",qty:1,unit:"m²",price:0,disc:0}])}>+ Thêm dòng</Btn>}
            </div>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["SKU","Tên sản phẩm","SL","ĐVT","Đơn giá","CK%","Thành tiền",""].map(h=>(
                    <th key={h} style={{ padding:"9px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item,i)=>(
                  <tr key={i} style={{ borderTop:`1px solid ${T.border}` }}>
                    <td style={{ padding:"10px 14px" }}><span style={{ fontSize:10,fontFamily:"monospace",background:T.blueLight,color:T.blue,padding:"2px 6px",borderRadius:4 }}>{item.sku}</span></td>
                    <td style={{ padding:"10px 14px" }}>
                      {editItems
                        ? <input value={item.name} onChange={e=>updateItem(i,"name",e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:5,padding:"4px 8px",fontSize:12,width:"100%" }} />
                        : <span style={{ fontSize:12,fontWeight:600,color:T.text }}>{item.name}</span>
                      }
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      {editItems
                        ? <input type="number" value={item.qty} onChange={e=>updateItem(i,"qty",e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:5,padding:"4px 6px",fontSize:12,width:64,textAlign:"center" }} />
                        : <span style={{ fontSize:12,fontWeight:700,color:T.text }}>{item.qty}</span>
                      }
                    </td>
                    <td style={{ padding:"10px 14px",fontSize:12,color:T.textMid }}>{item.unit}</td>
                    <td style={{ padding:"10px 14px" }}>
                      {editItems
                        ? <input type="number" value={item.price} onChange={e=>updateItem(i,"price",e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:5,padding:"4px 6px",fontSize:12,width:90,textAlign:"right" }} />
                        : <span style={{ fontSize:12,color:T.text }}>{fmt(item.price)}</span>
                      }
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      {editItems
                        ? <input type="number" value={item.disc} onChange={e=>updateItem(i,"disc",e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:5,padding:"4px 6px",fontSize:12,width:50,textAlign:"center" }} />
                        : <span style={{ fontSize:12,color:item.disc>0?T.orange:T.textMid }}>{item.disc}%</span>
                      }
                    </td>
                    <td style={{ padding:"10px 14px",fontSize:13,fontWeight:700,color:T.green }}>{fmt(lineTotal(item))} đ</td>
                    <td style={{ padding:"10px 14px" }}>
                      {editItems && <Btn variant="danger" size="sm" onClick={()=>setEditItems(editItems.filter((_,j)=>j!==i))}>🗑</Btn>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Totals */}
            <div style={{ padding:"12px 18px",borderTop:`1px solid ${T.border}`,background:T.bg }}>
              <div style={{ display:"flex",justifyContent:"flex-end" }}>
                <div style={{ minWidth:260 }}>
                  {[["Tạm tính",fmt(subTotal)+" đ"],["VAT 10%",fmt(vatAmt)+" đ"]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:12,padding:"4px 0",borderBottom:`1px solid ${T.border}` }}>
                      <span style={{ color:T.textMid }}>{k}</span><span style={{ color:T.text,fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:800,padding:"8px 0",color:T.green }}>
                    <span>TỔNG CỘNG</span><span>{fmt(subTotal+vatAmt)} đ</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* State machine */}
          <Card style={{ padding:18 }}>
            <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:12 }}>Trạng thái & Lịch sử</div>
            <div style={{ display:"flex",alignItems:"center",gap:0,marginBottom:14 }}>
              {[["📝","Draft"],["👤","Assigned"],["✅","Approved"]].map(([ic,lb],i)=>{
                const active = ["draft","assigned","approved"].indexOf(q.status)>=i;
                return (
                  <div key={lb} style={{ display:"flex",alignItems:"center" }}>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                      <div style={{ width:32,height:32,borderRadius:"50%",background:active?T.green:T.border,color:active?"#fff":"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>{ic}</div>
                      <span style={{ fontSize:10,color:active?T.green:T.textLight,fontWeight:active?700:400 }}>{lb}</span>
                    </div>
                    {i<2 && <div style={{ width:60,height:2,background:active?T.green:T.border,marginBottom:14 }} />}
                  </div>
                );
              })}
            </div>
            {[
              { action:"AI tự động tạo draft", by:"AI System", at:q.createdAt },
              { action:`Gán cho ${q.salesOwner||"Chưa gán"}`, by:"Admin", at:q.updatedAt },
            ].map((h,i)=>(
              <div key={i} style={{ display:"flex",gap:10,padding:"6px 0",borderBottom:`1px solid ${T.border}`,fontSize:11 }}>
                <div style={{ width:3,background:T.green,borderRadius:2,flexShrink:0 }} />
                <div>
                  <span style={{ color:T.text,fontWeight:600 }}>{h.action}</span>
                  <span style={{ color:T.textLight }}> · {h.by} · {h.at}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Assign modal */}
      {assignModal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999 }}>
          <Card style={{ width:380,padding:24 }}>
            <div style={{ fontWeight:700,fontSize:15,color:T.text,marginBottom:14 }}>👤 Gán báo giá cho Sales</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["nctruong@remak.vn","sales2@remak.vn","sales3@remak.vn"].map(s=>(
                <div key={s} onClick={()=>{ setQuotes(quotes.map(q=>q.id===assignModal.id?{...q,salesOwner:s,status:"assigned"}:q)); setSelectedQuote({...assignModal,salesOwner:s,status:"assigned"}); setAssignModal(null); showToast(`Đã gán cho ${s}`); }}
                  style={{ padding:"10px 14px",borderRadius:7,border:`1px solid ${T.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:T.bg }}>
                  <Avatar name={s} size={28} bg={T.blue} />
                  <span style={{ fontSize:12,fontWeight:600,color:T.text }}>{s}</span>
                  <Btn variant="primary" size="sm" style={{ marginLeft:"auto" }}>Gán</Btn>
                </div>
              ))}
            </div>
            <Btn variant="secondary" size="sm" style={{ marginTop:12,width:"100%",justifyContent:"center" }} onClick={()=>setAssignModal(null)}>Hủy</Btn>
          </Card>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// E1/E2 – PROMPT CONFIG & AI MONITOR — FN1.4 / F2.3 / Agent Monitor
// ════════════════════════════════════════════════════════════════════════════
const PromptConfigPage = () => {
  const [tab, setTab]                 = useState("prompts"); // prompts | guardrails | playground | monitor
  const [activePrompt, setActivePrompt] = useState(null);
  const [playInput, setPlayInput]     = useState("");
  const [playOutput, setPlayOutput]   = useState(null);
  const [playing, setPlaying]         = useState(false);
  const [toast, setToast]             = useState(null);
  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),2500); };

  const PROMPTS = [
    { id:"P001", name:"System Prompt v3.2", agent:"Supervisor Agent", version:"3.2", status:"active",  updatedAt:"07/06/2026", tokens:412 },
    { id:"P002", name:"Technical Agent Prompt", agent:"Technical Agent",  version:"2.1", status:"active",  updatedAt:"05/06/2026", tokens:280 },
    { id:"P003", name:"Pricing Agent Prompt",   agent:"Pricing Agent",    version:"1.8", status:"active",  updatedAt:"03/06/2026", tokens:195 },
    { id:"P004", name:"Fallback Policy v1.0",   agent:"All Agents",       version:"1.0", status:"draft",   updatedAt:"08/06/2026", tokens:89 },
    { id:"P005", name:"Clarify Questions Set",  agent:"Supervisor Agent", version:"2.0", status:"active",  updatedAt:"01/06/2026", tokens:340 },
  ];
  const FEW_SHOTS = [
    { id:1, input:"Tấm cách âm nào phù hợp cho nhà máy chế biến thực phẩm?", output:"Với nhà máy chế biến thực phẩm, Remak khuyến nghị Bông đá Stonewool cấp A1 (không bắt lửa) kết hợp tấm chống cháy B1...", quality:"good" },
    { id:2, input:"So sánh NRC 0.85 và 0.65", output:"NRC (Noise Reduction Coefficient) 0.85 hấp thụ 85% âm thanh, còn 0.65 hấp thụ 65%. Sự chênh lệch 20% này rất đáng kể trong phòng thu...", quality:"good" },
  ];
  const AGENTS = [
    { name:"Supervisor Agent", status:"healthy", latency:320,  calls:1247, errors:3,  tokens:28400 },
    { name:"Technical Agent",  status:"healthy", latency:580,  calls:892,  errors:1,  tokens:42100 },
    { name:"Pricing Agent",    status:"warning", latency:1240, calls:234,  errors:12, tokens:9800  },
    { name:"Order Agent",      status:"healthy", latency:410,  calls:89,   errors:0,  tokens:6200  },
    { name:"Chat Agent",       status:"healthy", latency:210,  calls:2341, errors:5,  tokens:15600 },
  ];

  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:tab===id?700:500,fontSize:13,padding:"10px 16px",borderBottom:tab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",background:"transparent",color:tab===id?T.green:T.textMid,display:"flex",alignItems:"center",gap:6 }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ padding:28,fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}

      <Card>
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 20px",gap:2,overflowX:"auto" }}>
          <TabBtn id="prompts"    icon="📝" label="Prompt Store" />
          <TabBtn id="fewshot"   icon="📚" label="Few-shot Library" />
          <TabBtn id="guardrails" icon="🛡️" label="Guardrails" />
          <TabBtn id="playground" icon="🧪" label="Playground" />
          <TabBtn id="monitor"    icon="📊" label="Agent Monitor" />
        </div>

        {/* Prompt Store */}
        {tab==="prompts" && (
          <div style={{ display:"flex",minHeight:480 }}>
            <div style={{ width:260,borderRight:`1px solid ${T.border}`,overflowY:"auto" }}>
              <div style={{ padding:12,borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:12,fontWeight:700,color:T.text }}>Prompts ({PROMPTS.length})</span>
                <Btn variant="primary" size="sm">+ Mới</Btn>
              </div>
              {PROMPTS.map(p=>(
                <div key={p.id} onClick={()=>setActivePrompt(p)} style={{ padding:"11px 14px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:activePrompt?.id===p.id?T.greenLight:"transparent",borderLeft:activePrompt?.id===p.id?`3px solid ${T.green}`:"3px solid transparent" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3 }}>
                    <span style={{ fontSize:12,fontWeight:600,color:T.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.name}</span>
                    <span style={{ fontSize:9,background:p.status==="active"?T.greenLight:T.yellowLight,color:p.status==="active"?T.greenDark:"#92400E",padding:"1px 6px",borderRadius:4,fontWeight:700 }}>{p.status==="active"?"LIVE":"DRAFT"}</span>
                  </div>
                  <div style={{ fontSize:10,color:T.textLight }}>{p.agent} · v{p.version} · {p.tokens} tokens</div>
                </div>
              ))}
            </div>
            <div style={{ flex:1,padding:22 }}>
              {activePrompt ? (
                <>
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
                    <div>
                      <div style={{ fontWeight:800,fontSize:16,color:T.text }}>{activePrompt.name}</div>
                      <div style={{ fontSize:11,color:T.textLight }}>Agent: {activePrompt.agent} · Version {activePrompt.version} · {activePrompt.updatedAt}</div>
                    </div>
                    <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
                      <Btn variant="secondary" size="sm">📜 Lịch sử</Btn>
                      <Btn variant="secondary" size="sm">↩ Rollback</Btn>
                      <Btn variant="primary" size="sm">💾 Lưu v{parseFloat(activePrompt.version)+0.1}</Btn>
                    </div>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14 }}>
                    <div>
                      <div style={{ fontSize:11,fontWeight:700,color:T.textMid,marginBottom:6 }}>Phiên bản hiện tại (v{activePrompt.version})</div>
                      <textarea defaultValue={`Bạn là trợ lý AI bán hàng của Remak Việt Nam, chuyên về vật liệu cách âm, cách nhiệt và chống cháy.\n\nNguyên tắc:\n1. Chỉ tư vấn dựa trên catalogue Remak được cung cấp\n2. Luôn trích dẫn nguồn thông tin\n3. Khi không chắc → handoff cho Sales\n4. Không tự bịa thông số kỹ thuật\n5. Giữ giọng điệu chuyên nghiệp, thân thiện`} rows={12}
                        style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"10px 12px",fontSize:12,fontFamily:"monospace",resize:"vertical",outline:"none",boxSizing:"border-box" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:11,fontWeight:700,color:T.textMid,marginBottom:6 }}>Version diff (v{parseFloat(activePrompt.version)-0.1} → v{activePrompt.version})</div>
                      <div style={{ background:"#1a1a2e",borderRadius:7,padding:14,height:230,overflowY:"auto",fontFamily:"monospace",fontSize:11 }}>
                        {[
                          { type:"same",  text:"Bạn là trợ lý AI bán hàng của Remak..." },
                          { type:"del",   text:"- Không tư vấn ngoài giờ hành chính" },
                          { type:"add",   text:"+ Hỗ trợ 24/7 qua Web Widget và Zalo" },
                          { type:"same",  text:"Luôn trích dẫn nguồn thông tin..." },
                          { type:"add",   text:"+ Khi giá > 50tr → thông báo lên Sales Manager" },
                        ].map((l,i)=>(
                          <div key={i} style={{ color:l.type==="add"?"#4ADE80":l.type==="del"?"#F87171":"#94A3B8",marginBottom:2 }}>{l.text}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ padding:40,textAlign:"center",color:T.textLight }}>
                  <div style={{ fontSize:32,marginBottom:8 }}>📝</div>
                  <div style={{ fontSize:13 }}>Chọn một prompt để chỉnh sửa</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Few-shot Library */}
        {tab==="fewshot" && (
          <div style={{ padding:22,display:"flex",flexDirection:"column",gap:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div style={{ fontSize:13,color:T.textMid }}>Few-shot examples inject vào prompt để hướng dẫn AI. <b>{FEW_SHOTS.length}</b> examples đang active.</div>
              <Btn variant="primary" size="sm">+ Thêm example</Btn>
            </div>
            {FEW_SHOTS.map(f=>(
              <Card key={f.id} style={{ padding:16 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:4,letterSpacing:"0.06em" }}>USER INPUT</div>
                    <div style={{ background:"#DCF8C6",borderRadius:8,padding:10,fontSize:12,color:T.text }}>{f.input}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:4,letterSpacing:"0.06em" }}>AI OUTPUT (EXPECTED)</div>
                    <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:10,fontSize:12,color:T.text }}>{f.output}</div>
                  </div>
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <span style={{ fontSize:10,background:T.greenLight,color:T.greenDark,padding:"2px 8px",borderRadius:4,fontWeight:700 }}>✅ Good example</span>
                  <div style={{ marginLeft:"auto",display:"flex",gap:5 }}>
                    <Btn variant="secondary" size="sm">✏️ Sửa</Btn>
                    <Btn variant="danger" size="sm">🗑️</Btn>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Guardrails */}
        {tab==="guardrails" && (
          <div style={{ padding:22,display:"flex",flexDirection:"column",gap:16 }}>
            {[
              { title:"Confidence Threshold", desc:"AI handoff khi confidence thấp hơn ngưỡng", value:"0.70", type:"slider", min:0, max:1 },
              { title:"Max tokens per response", desc:"Giới hạn độ dài câu trả lời", value:"800", type:"number" },
              { title:"Blocked topics", desc:"Từ chối trả lời các chủ đề này", value:"chính trị, tôn giáo, cạnh tranh đối thủ", type:"text" },
              { title:"Fallback message", desc:"Tin nhắn khi AI không trả lời được", value:"Xin lỗi, tôi cần chuyển câu hỏi này cho nhân viên tư vấn. Vui lòng chờ trong giây lát!", type:"textarea" },
              { title:"PII Auto-masking", desc:"Tự động che SĐT, email trong log", value:true, type:"toggle" },
              { title:"Rate limit (msg/min/user)", desc:"Giới hạn tin nhắn mỗi phút", value:"20", type:"number" },
            ].map(r=>(
              <div key={r.title} style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:16,padding:"14px 0",borderBottom:`1px solid ${T.border}`,alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13,fontWeight:600,color:T.text }}>{r.title}</div>
                  <div style={{ fontSize:11,color:T.textLight,marginTop:2 }}>{r.desc}</div>
                </div>
                <div>
                  {r.type==="toggle"
                    ? <div onClick={()=>{}} style={{ width:44,height:24,borderRadius:12,background:r.value?T.green:T.border,cursor:"pointer",position:"relative" }}>
                        <div style={{ width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:r.value?22:2,transition:"left .2s" }} />
                      </div>
                    : r.type==="textarea"
                    ? <textarea defaultValue={r.value} rows={2} style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:6,padding:"6px 10px",fontSize:12,resize:"none",outline:"none",boxSizing:"border-box" }} />
                    : <input defaultValue={r.value} type={r.type==="number"?"number":"text"}
                        style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:6,padding:"7px 10px",fontSize:12,outline:"none",boxSizing:"border-box" }} />
                  }
                </div>
              </div>
            ))}
            <Btn variant="primary" style={{ alignSelf:"flex-start" }} onClick={()=>showToast("Guardrails đã lưu và áp dụng")}>💾 Lưu cấu hình</Btn>
          </div>
        )}

        {/* Playground */}
        {tab==="playground" && (
          <div style={{ padding:22,display:"flex",flexDirection:"column",gap:16 }}>
            <div style={{ background:T.blueLight,border:`1px solid #BFDBFE`,borderRadius:8,padding:12,fontSize:12,color:T.blue }}>
              🧪 Test prompt với dữ liệu thực. Kết quả không lưu vào KB hay hội thoại thật.
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:6 }}>Agent</label>
                <select style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12 }}>
                  {AGENTS.map(a=><option key={a.name}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:6 }}>Prompt version</label>
                <select style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12 }}>
                  <option>v3.2 (active)</option><option>v3.1</option><option>v3.0</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:6 }}>Test input</label>
              <textarea value={playInput} onChange={e=>setPlayInput(e.target.value)} placeholder="Nhập câu hỏi test..." rows={3}
                style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 12px",fontSize:13,resize:"none",outline:"none",boxSizing:"border-box" }} />
            </div>
            <Btn variant="primary" disabled={!playInput||playing} style={{ alignSelf:"flex-start" }}
              onClick={()=>{ setPlaying(true); setTimeout(()=>{ setPlayInput(playInput); setPlayOutput({ text:"Với yêu cầu của bạn, Remak khuyến nghị giải pháp **Bông đá Stonewool 50mm** (NRC=0.70, STC=28). Đây là vật liệu cách âm cao cấp phù hợp cho nhà xưởng công nghiệp với tiêu chuẩn chống cháy Class A1.\n\nGiá tham khảo: 45,000 VND/m² (chưa VAT)", confidence:0.91, agent:"Technical Agent", tokens:287, latency:420 }); setPlaying(false); },1200); }}>
              {playing?"⏳ Đang xử lý...":"▶ Chạy test"}
            </Btn>
            {playOutput && (
              <Card style={{ padding:18 }}>
                <div style={{ display:"flex",gap:12,marginBottom:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10,fontWeight:700,color:T.textLight,marginBottom:4,letterSpacing:"0.06em" }}>AI RESPONSE</div>
                    <div style={{ fontSize:13,color:T.text,lineHeight:1.7,whiteSpace:"pre-line" }}>{playOutput.text}</div>
                  </div>
                </div>
                <div style={{ display:"flex",gap:16,paddingTop:12,borderTop:`1px solid ${T.border}` }}>
                  {[["Confidence",`${Math.round(playOutput.confidence*100)}%`],["Agent",playOutput.agent],["Tokens",playOutput.tokens],["Latency",`${playOutput.latency}ms`]].map(([k,v])=>(
                    <div key={k} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:10,color:T.textLight }}>{k}</div>
                      <div style={{ fontSize:13,fontWeight:700,color:T.green }}>{v}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Agent Monitor */}
        {tab==="monitor" && (
          <div style={{ padding:22,display:"flex",flexDirection:"column",gap:16 }}>
            <div style={{ display:"flex",gap:14 }}>
              {[["Tổng calls/giờ","4803","↑12%",T.green],["Avg latency","452ms","↑8%",T.yellow],["Error rate","0.43%","↓2%",T.green],["Token usage","102K","↑5%",T.blue]].map(([l,v,d,c])=>(
                <StatCard key={l} label={l} value={v} color={c} sub={d} />
              ))}
            </div>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Agent","Status","Avg Latency","Calls (24h)","Errors","Tokens (24h)","Hành động"].map(h=>(
                    <th key={h} style={{ padding:"9px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a,i)=>(
                  <tr key={a.name} style={{ borderTop:`1px solid ${T.border}`,background:i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"11px 14px",fontWeight:600,fontSize:13,color:T.text }}>{a.name}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <span style={{ fontSize:10,fontWeight:700,background:a.status==="healthy"?T.greenLight:T.yellowLight,color:a.status==="healthy"?T.greenDark:"#92400E",padding:"2px 8px",borderRadius:5 }}>
                        {a.status==="healthy"?"● Healthy":"⚠ Warning"}
                      </span>
                    </td>
                    <td style={{ padding:"11px 14px",fontSize:12,color:a.latency>1000?T.orange:T.textMid,fontWeight:a.latency>1000?700:400 }}>{a.latency}ms</td>
                    <td style={{ padding:"11px 14px",fontSize:12,color:T.text,fontWeight:700 }}>{a.calls.toLocaleString()}</td>
                    <td style={{ padding:"11px 14px",fontSize:12,color:a.errors>5?T.red:T.textMid,fontWeight:a.errors>5?700:400 }}>{a.errors}</td>
                    <td style={{ padding:"11px 14px",fontSize:12,color:T.textMid }}>{a.tokens.toLocaleString()}</td>
                    <td style={{ padding:"11px 14px" }}><Btn variant="secondary" size="sm">📊 Detail</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// E6 – ROUTING RULES BUILDER — FN6.1 / FN6.2
// ════════════════════════════════════════════════════════════════════════════
const RoutingRulesPage = () => {
  const [rules, setRules] = useState([
    { id:1, name:"Enterprise ≥ 50 triệu", condition:"total >= 50000000", action:"assign_group:sales_senior", priority:1, active:true,  hits:42 },
    { id:2, name:"Medium 10–50 triệu",    condition:"total >= 10000000 AND total < 50000000", action:"assign_group:sales_standard", priority:2, active:true,  hits:187 },
    { id:3, name:"Retail < 10 triệu",     condition:"total < 10000000", action:"assign_group:sales_junior", priority:3, active:true,  hits:521 },
    { id:4, name:"Fallback mặc định",     condition:"*", action:"assign_user:nctruong@remak.vn", priority:99, active:true,  hits:8 },
  ]);
  const [notifyTemplates, setNotifyTemplates] = useState([
    { id:1, event:"quote_assigned",   channel:"zalo_oa", template:"📋 Báo giá {quote_id} vừa được gán cho bạn. Khách: {customer}. Giá trị: {total}đ", active:true },
    { id:2, event:"handoff_cs",       channel:"in_app",  template:"🔔 Hội thoại {conv_id} cần CS xử lý. Khách {visitor} chờ phản hồi.", active:true },
    { id:3, event:"quote_unassigned", channel:"email",   template:"⚠️ Báo giá {quote_id} chưa được xử lý sau 2 giờ.", active:false },
  ]);
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({ name:"",condition:"",action:"assign_group:sales_standard",priority:10 });
  const [tab, setTab] = useState("rules"); // rules | notify
  const [toast, setToast] = useState(null);
  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),2500); };

  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:tab===id?700:500,fontSize:13,padding:"10px 16px",borderBottom:tab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",background:"transparent",color:tab===id?T.green:T.textMid,display:"flex",alignItems:"center",gap:6 }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ padding:28,fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}

      <div style={{ display:"flex",gap:14,marginBottom:22 }}>
        <StatCard label="Rules active"     value={rules.filter(r=>r.active).length} color={T.green} />
        <StatCard label="Tổng hits (24h)"  value={rules.reduce((s,r)=>s+r.hits,0)} color={T.blue} />
        <StatCard label="Fallback hits"    value={rules.find(r=>r.priority===99)?.hits||0} color={T.orange} sub="Cần thêm rule?" />
        <StatCard label="Notify templates" value={notifyTemplates.filter(n=>n.active).length} color={T.text} />
      </div>

      <Card>
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 20px" }}>
          <TabBtn id="rules"  icon="⚙️" label="Routing Rules" />
          <TabBtn id="notify" icon="🔔" label="Notification Templates" />
        </div>

        {/* Rules tab */}
        {tab==="rules" && (
          <div style={{ padding:22 }}>
            <div style={{ background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:12,fontSize:12,color:T.blue,marginBottom:16 }}>
              ⚡ Rules được đánh giá theo thứ tự Priority. Rule đầu tiên match sẽ được áp dụng. Fallback (Priority 99) luôn ở cuối cùng.
            </div>

            <div style={{ display:"flex",justifyContent:"flex-end",marginBottom:14 }}>
              <Btn variant="primary" onClick={()=>setShowAddRule(true)}>+ Thêm rule</Btn>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {rules.sort((a,b)=>a.priority-b.priority).map(rule=>(
                <div key={rule.id} style={{ padding:16,borderRadius:8,border:`1px solid ${rule.active?T.green:T.border}`,background:rule.active?"#F0FDF4":T.bg,display:"flex",alignItems:"center",gap:16 }}>
                  <div style={{ width:32,height:32,borderRadius:6,background:rule.active?T.green:T.border,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0 }}>
                    {rule.priority===99?"★":rule.priority}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                      <span style={{ fontSize:13,fontWeight:700,color:T.text }}>{rule.name}</span>
                      {rule.priority===99 && <span style={{ fontSize:9,background:T.yellowLight,color:"#92400E",padding:"1px 6px",borderRadius:4,fontWeight:700 }}>FALLBACK</span>}
                    </div>
                    <div style={{ display:"flex",gap:10,fontSize:11,flexWrap:"wrap" }}>
                      <div style={{ background:"#F8F0FF",border:"1px solid #E9D5FF",borderRadius:5,padding:"3px 10px",color:"#6D28D9",fontFamily:"monospace" }}>
                        IF: {rule.condition}
                      </div>
                      <div style={{ background:T.greenLight,border:`1px solid ${T.greenMid}`,borderRadius:5,padding:"3px 10px",color:T.greenDark,fontFamily:"monospace" }}>
                        → {rule.action}
                      </div>
                      <div style={{ background:T.blueLight,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 10px",color:T.blue }}>
                        {rule.hits} hits hôm nay
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                    <div onClick={()=>{ setRules(rules.map(r=>r.id===rule.id?{...r,active:!r.active}:r)); showToast(`Rule "${rule.name}" ${rule.active?"tắt":"bật"}`); }}
                      style={{ width:40,height:22,borderRadius:11,background:rule.active?T.green:T.border,cursor:"pointer",position:"relative",transition:"background .2s" }}>
                      <div style={{ width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:rule.active?20:2,transition:"left .2s" }} />
                    </div>
                    <Btn variant="secondary" size="sm">✏️</Btn>
                    <Btn variant="danger" size="sm" onClick={()=>{ setRules(rules.filter(r=>r.id!==rule.id)); showToast("Đã xóa rule","info"); }}>🗑️</Btn>
                  </div>
                </div>
              ))}
            </div>

            {showAddRule && (
              <Card style={{ marginTop:16,padding:18,border:`1px solid ${T.green}` }}>
                <div style={{ fontWeight:700,fontSize:13,color:T.text,marginBottom:14 }}>+ Thêm routing rule mới</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }}>
                  <div>
                    <label style={{ fontSize:11,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Tên rule *</label>
                    <Input value={newRule.name} onChange={e=>setNewRule({...newRule,name:e.target.value})} placeholder="VD: Đơn hàng lớn ≥ 100 triệu" />
                  </div>
                  <div>
                    <label style={{ fontSize:11,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Priority (thấp hơn = ưu tiên cao hơn)</label>
                    <input type="number" value={newRule.priority} onChange={e=>setNewRule({...newRule,priority:Number(e.target.value)})}
                      style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,boxSizing:"border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize:11,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Điều kiện (IF)</label>
                    <Input value={newRule.condition} onChange={e=>setNewRule({...newRule,condition:e.target.value})} placeholder="total >= 100000000" />
                  </div>
                  <div>
                    <label style={{ fontSize:11,fontWeight:600,color:T.textMid,display:"block",marginBottom:4 }}>Hành động (THEN)</label>
                    <select value={newRule.action} onChange={e=>setNewRule({...newRule,action:e.target.value})} style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12 }}>
                      <option value="assign_group:sales_senior">Gán nhóm: Sales Senior</option>
                      <option value="assign_group:sales_standard">Gán nhóm: Sales Standard</option>
                      <option value="assign_group:sales_junior">Gán nhóm: Sales Junior</option>
                      <option value="assign_user:nctruong@remak.vn">Gán user: nctruong@remak.vn</option>
                      <option value="notify_manager">Thông báo Manager</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:"flex",gap:8,justifyContent:"flex-end" }}>
                  <Btn variant="secondary" onClick={()=>setShowAddRule(false)}>Hủy</Btn>
                  <Btn variant="primary" disabled={!newRule.name||!newRule.condition} onClick={()=>{ setRules([...rules,{...newRule,id:Date.now(),active:true,hits:0}]); setShowAddRule(false); setNewRule({name:"",condition:"",action:"assign_group:sales_standard",priority:10}); showToast("Đã thêm rule mới"); }}>Lưu rule</Btn>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Notify templates */}
        {tab==="notify" && (
          <div style={{ padding:22,display:"flex",flexDirection:"column",gap:12 }}>
            {notifyTemplates.map(n=>(
              <Card key={n.id} style={{ padding:16 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                  <span style={{ fontSize:11,fontWeight:700,background:T.blueLight,color:T.blue,padding:"2px 8px",borderRadius:5 }}>{n.event}</span>
                  <span style={{ fontSize:10,background:n.channel==="zalo_oa"?"#ECFEFF":n.channel==="email"?T.blueLight:T.greenLight,color:n.channel==="zalo_oa"?"#0E7490":n.channel==="email"?T.blue:T.greenDark,padding:"2px 8px",borderRadius:5 }}>
                    {n.channel==="zalo_oa"?"💙 Zalo OA":n.channel==="email"?"📧 Email":"🔔 In-App"}
                  </span>
                  <div onClick={()=>setNotifyTemplates(notifyTemplates.map(x=>x.id===n.id?{...x,active:!x.active}:x))}
                    style={{ marginLeft:"auto",width:40,height:22,borderRadius:11,background:n.active?T.green:T.border,cursor:"pointer",position:"relative" }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:n.active?20:2,transition:"left .2s" }} />
                  </div>
                </div>
                <textarea defaultValue={n.template} rows={2} style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:6,padding:"6px 10px",fontSize:12,fontFamily:"monospace",resize:"none",outline:"none",boxSizing:"border-box" }} />
                <div style={{ fontSize:10,color:T.textLight,marginTop:4 }}>Variables: {"{quote_id} {customer} {total} {conv_id} {visitor} {agent}"}</div>
              </Card>
            ))}
            <Btn variant="primary" style={{ alignSelf:"flex-start" }} onClick={()=>showToast("Templates đã lưu")}>💾 Lưu templates</Btn>
          </div>
        )}
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// E8 – AUDIT LOG — FN8.1 / FN8.2
// ════════════════════════════════════════════════════════════════════════════
const AuditLogPage = () => {
  const [tab, setTab]             = useState("audit");
  const [search, setSearch]       = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [filterUser, setFilterUser]     = useState("all");
  const [dateFrom, setDateFrom]   = useState("");

  const AUDIT_LOGS = [
    { id:1, ts:"08/06/2026 10:45:23", user:"admin@remak.vn",    module:"KB",    action:"DELETE",  target:"Fire_Rating_Standards.docx", ip:"192.168.1.10", result:"success" },
    { id:2, ts:"08/06/2026 09:30:11", user:"trainer@remak.vn",  module:"KB",    action:"APPROVE", target:"Stonewool_Brochure_v3.pdf (NCC)",ip:"192.168.1.22", result:"success" },
    { id:3, ts:"08/06/2026 09:12:05", user:"AI System",          module:"Quote", action:"CREATE",  target:"Q-2026-042 (AI auto)",        ip:"internal",    result:"success" },
    { id:4, ts:"08/06/2026 08:55:00", user:"nctruong@remak.vn",  module:"Quote", action:"ASSIGN",  target:"Q-2026-041 → nctruong",       ip:"192.168.1.31", result:"success" },
    { id:5, ts:"08/06/2026 08:30:17", user:"sales2@remak.vn",    module:"RBAC",  action:"ACCESS_DENIED","target":"/admin/users",              ip:"192.168.1.45", result:"blocked" },
    { id:6, ts:"07/06/2026 17:20:44", user:"admin@remak.vn",     module:"User",  action:"CREATE",  target:"ncc@remak.vn (role: NCC)",    ip:"192.168.1.10", result:"success" },
    { id:7, ts:"07/06/2026 16:11:09", user:"trainer@remak.vn",   module:"Prompt","action":"UPDATE",  target:"System Prompt v3.2",          ip:"192.168.1.22", result:"success" },
    { id:8, ts:"07/06/2026 14:05:33", user:"admin@remak.vn",     module:"RBAC",  action:"ROLE_CHANGE","target":"multi@remak.vn: [sales] → [sales,trainer]", ip:"192.168.1.10", result:"success" },
  ];

  const PII_LOGS = [
    { ts:"08/06/2026 10:45", source:"Chat C002", detected:"SĐT: 0912***678, Email: t***@gmail.com", masked:true },
    { ts:"08/06/2026 09:12", source:"Chat C001", detected:"SĐT: 0901***567",                        masked:true },
    { ts:"07/06/2026 14:20", source:"Chat C004", detected:"CMND: 079***1234, SĐT: 0956***012",     masked:true },
  ];

  const modules = ["all","KB","Quote","User","RBAC","Prompt","AI"];
  const users   = ["all","admin@remak.vn","trainer@remak.vn","nctruong@remak.vn","AI System"];

  const filtered = AUDIT_LOGS.filter(l => {
    const mM = filterModule==="all"||l.module===filterModule;
    const mU = filterUser==="all"||l.user===filterUser;
    const mQ = l.target.toLowerCase().includes(search.toLowerCase())||l.action.toLowerCase().includes(search.toLowerCase());
    return mM && mU && mQ;
  });

  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:tab===id?700:500,fontSize:13,padding:"10px 16px",borderBottom:tab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",background:"transparent",color:tab===id?T.green:T.textMid,display:"flex",alignItems:"center",gap:6 }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ padding:28,fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      <div style={{ display:"flex",gap:14,marginBottom:22 }}>
        <StatCard label="Tổng log (90 ngày)" value="12,847" color={T.text} />
        <StatCard label="Access denied"       value="23"     color={T.orange} sub="Hôm nay" />
        <StatCard label="PII masked"          value="142"    color={T.blue} sub="7 ngày qua" />
        <StatCard label="KB changes"          value="38"     color={T.green} sub="Tháng này" />
      </div>

      <Card>
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 20px" }}>
          <TabBtn id="audit" icon="📜" label="Audit Log" />
          <TabBtn id="pii"   icon="🔒" label="PII Masking Log" />
        </div>

        {tab==="audit" && (
          <>
            <div style={{ padding:"12px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center" }}>
              <Input placeholder="Tìm action, target..." value={search} onChange={e=>setSearch(e.target.value)} icon="🔍" style={{ width:220 }} />
              <select value={filterModule} onChange={e=>setFilterModule(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,background:T.card }}>
                {modules.map(m=><option key={m} value={m}>{m==="all"?"Tất cả module":m}</option>)}
              </select>
              <select value={filterUser} onChange={e=>setFilterUser(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,background:T.card }}>
                {users.map(u=><option key={u} value={u}>{u==="all"?"Tất cả users":u}</option>)}
              </select>
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{ border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,color:T.text,background:T.card }} />
              <span style={{ fontSize:11,color:T.textLight,marginLeft:"auto" }}>{filtered.length} records · Retention: 90 ngày</span>
              <Btn variant="secondary" size="sm">📥 Export CSV</Btn>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",minWidth:820 }}>
                <thead>
                  <tr style={{ background:T.bg }}>
                    {["Thời gian","Người dùng","Module","Action","Đối tượng","IP","Kết quả"].map(h=>(
                      <th key={h} style={{ padding:"9px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.05em",textTransform:"uppercase",whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l,i)=>(
                    <tr key={l.id} style={{ borderTop:`1px solid ${T.border}`,background:l.result==="blocked"?T.redLight:i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                      <td style={{ padding:"9px 14px",fontSize:11,fontFamily:"monospace",color:T.textMid,whiteSpace:"nowrap" }}>{l.ts}</td>
                      <td style={{ padding:"9px 14px",fontSize:11,color:T.text,fontWeight:l.user==="AI System"?700:400 }}>{l.user}</td>
                      <td style={{ padding:"9px 14px" }}><span style={{ fontSize:10,fontWeight:700,background:T.blueLight,color:T.blue,padding:"2px 7px",borderRadius:4 }}>{l.module}</span></td>
                      <td style={{ padding:"9px 14px" }}>
                        <span style={{ fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,
                          background:l.action==="DELETE"||l.action==="ACCESS_DENIED"?T.redLight:l.action==="CREATE"||l.action==="APPROVE"?T.greenLight:T.yellowLight,
                          color:l.action==="DELETE"||l.action==="ACCESS_DENIED"?T.red:l.action==="CREATE"||l.action==="APPROVE"?T.greenDark:"#92400E"
                        }}>{l.action}</span>
                      </td>
                      <td style={{ padding:"9px 14px",fontSize:11,color:T.textMid,maxWidth:240,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={l.target}>{l.target}</td>
                      <td style={{ padding:"9px 14px",fontSize:10,fontFamily:"monospace",color:T.textLight }}>{l.ip}</td>
                      <td style={{ padding:"9px 14px" }}>
                        <span style={{ fontSize:10,fontWeight:700,background:l.result==="success"?T.greenLight:T.redLight,color:l.result==="success"?T.greenDark:T.red,padding:"2px 7px",borderRadius:4 }}>
                          {l.result==="success"?"✅ OK":"🚫 Blocked"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"10px 20px",fontSize:11,color:T.textLight }}>Hiển thị {filtered.length}/{AUDIT_LOGS.length} records</div>
          </>
        )}

        {tab==="pii" && (
          <div style={{ padding:22 }}>
            <div style={{ background:T.greenLight,border:`1px solid ${T.greenMid}`,borderRadius:8,padding:12,fontSize:12,color:T.greenDark,marginBottom:16 }}>
              ✅ PII auto-masking đang hoạt động. Tất cả SĐT/email/CMND trong log và API response được che tự động theo regex pattern.
            </div>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Thời gian","Nguồn","PII phát hiện (đã mask)","Kết quả"].map(h=>(
                    <th key={h} style={{ padding:"9px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textLight,letterSpacing:"0.05em",textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PII_LOGS.map((l,i)=>(
                  <tr key={i} style={{ borderTop:`1px solid ${T.border}`,background:i%2===0?T.card:"rgba(244,246,243,.4)" }}>
                    <td style={{ padding:"9px 14px",fontSize:11,color:T.textMid }}>{l.ts}</td>
                    <td style={{ padding:"9px 14px",fontSize:11,color:T.blue }}>{l.source}</td>
                    <td style={{ padding:"9px 14px",fontSize:11,fontFamily:"monospace",color:T.text }}>{l.detected}</td>
                    <td style={{ padding:"9px 14px" }}>
                      <span style={{ fontSize:10,fontWeight:700,background:T.greenLight,color:T.greenDark,padding:"2px 8px",borderRadius:4 }}>🔒 Masked</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// E7 – CHANNEL INTEGRATION — FN7.1 (Widget) + FN7.2 (Zalo OA)
// ════════════════════════════════════════════════════════════════════════════
const ChannelConfigPage = () => {
  const [tab, setTab]         = useState("widget");
  const [toast, setToast]     = useState(null);
  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),2500); };
  // Widget config state
  const [widgetCfg, setWidgetCfg] = useState({
    primaryColor: "#6DB02B", position:"bottom-right",
    greeting:"Xin chào! Tôi là trợ lý AI của Remak. Bạn cần tư vấn gì?",
    placeholder:"Nhập câu hỏi của bạn...",
    showBranding:true, collectName:true, collectPhone:false,
    autoOpen:false, openDelay:3,
  });
  // Zalo config
  const [zaloCfg, setZaloCfg] = useState({
    oaId:"", appId:"", appSecret:"", webhookSecret:"",
    webhookUrl:"https://api.remak-chat.vn/webhook/zalo",
    connected:true, lastSync:"08/06/2026 09:00",
  });

  const widgetCode = `<script>
  window.RemakChatConfig = {
    apiKey: "rck_prod_xxxxxxxxxx",
    primaryColor: "${widgetCfg.primaryColor}",
    position: "${widgetCfg.position}",
    greeting: "${widgetCfg.greeting}",
  };
</script>
<script async src="https://cdn.remak-chat.vn/widget.js"></script>`;

  const TabBtn = ({id,label,icon}) => (
    <button onClick={()=>setTab(id)} style={{ border:"none",cursor:"pointer",fontWeight:tab===id?700:500,fontSize:13,padding:"10px 16px",borderBottom:tab===id?`2.5px solid ${T.green}`:"2.5px solid transparent",background:"transparent",color:tab===id?T.green:T.textMid,display:"flex",alignItems:"center",gap:6 }}>
      {icon} {label}
    </button>
  );

  return (
    <div style={{ padding:28,fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative" }}>
      {toast && <div style={{ position:"fixed",top:20,right:24,zIndex:2000,background:toast.type==="success"?T.green:T.orange,color:"#fff",padding:"10px 18px",borderRadius:8,fontSize:13,fontWeight:600 }}>{toast.msg}</div>}

      <Card>
        <div style={{ borderBottom:`1px solid ${T.border}`,display:"flex",padding:"0 20px" }}>
          <TabBtn id="widget" icon="🌐" label="Web Widget" />
          <TabBtn id="zalo"   icon="💙" label="Zalo OA" />
        </div>

        {/* Web Widget */}
        {tab==="widget" && (
          <div style={{ padding:24,display:"flex",gap:24 }}>
            {/* Config form */}
            <div style={{ flex:1,display:"flex",flexDirection:"column",gap:16 }}>
              <div style={{ fontWeight:700,fontSize:14,color:T.text }}>Cấu hình Web Widget</div>

              {[
                { label:"Màu chủ đạo (Primary Color)", key:"primaryColor", type:"color" },
                { label:"Vị trí widget", key:"position", type:"select", opts:["bottom-right","bottom-left","top-right","top-left"] },
              ].map(f=>(
                <div key={f.key}>
                  <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>{f.label}</label>
                  {f.type==="color"
                    ? <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                        <input type="color" value={widgetCfg[f.key]} onChange={e=>setWidgetCfg({...widgetCfg,[f.key]:e.target.value})} style={{ width:48,height:36,borderRadius:6,border:`1px solid ${T.border}`,cursor:"pointer" }} />
                        <span style={{ fontSize:13,fontFamily:"monospace",color:T.text }}>{widgetCfg[f.key]}</span>
                      </div>
                    : <select value={widgetCfg[f.key]} onChange={e=>setWidgetCfg({...widgetCfg,[f.key]:e.target.value})} style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 10px",fontSize:12 }}>
                        {f.opts.map(o=><option key={o}>{o}</option>)}
                      </select>
                  }
                </div>
              ))}

              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Lời chào mở đầu</label>
                <textarea value={widgetCfg.greeting} onChange={e=>setWidgetCfg({...widgetCfg,greeting:e.target.value})} rows={2}
                  style={{ width:"100%",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 12px",fontSize:12,resize:"none",outline:"none",boxSizing:"border-box" }} />
              </div>

              <div>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Placeholder input</label>
                <Input value={widgetCfg.placeholder} onChange={e=>setWidgetCfg({...widgetCfg,placeholder:e.target.value})} />
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {[
                  ["showBranding","Hiển thị logo Remak trong widget"],
                  ["collectName","Thu thập tên khách"],
                  ["collectPhone","Thu thập SĐT khách"],
                  ["autoOpen","Tự động mở widget sau khi load"],
                ].map(([key,label])=>(
                  <label key={key} style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:12,color:T.text }}>
                    <div onClick={()=>setWidgetCfg({...widgetCfg,[key]:!widgetCfg[key]})}
                      style={{ width:40,height:22,borderRadius:11,background:widgetCfg[key]?T.green:T.border,cursor:"pointer",position:"relative",flexShrink:0 }}>
                      <div style={{ width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:widgetCfg[key]?20:2,transition:"left .2s" }} />
                    </div>
                    {label}
                  </label>
                ))}
              </div>

              <Btn variant="primary" style={{ alignSelf:"flex-start" }} onClick={()=>showToast("Cấu hình widget đã lưu & deploy")}>💾 Lưu & Deploy</Btn>

              {/* Embed code */}
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:6 }}>Embed Code — Copy vào &lt;head&gt; website</div>
                <div style={{ position:"relative" }}>
                  <pre style={{ background:"#1a1a2e",color:"#7EE8A2",padding:14,borderRadius:8,fontSize:11,fontFamily:"monospace",overflowX:"auto",margin:0 }}>{widgetCode}</pre>
                  <Btn variant="secondary" size="sm" style={{ position:"absolute",top:8,right:8 }} onClick={()=>showToast("Đã copy embed code")}>📋 Copy</Btn>
                </div>
              </div>
            </div>

            {/* Widget preview */}
            <div style={{ width:280,flexShrink:0 }}>
              <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:10 }}>Preview Widget</div>
              <div style={{ background:"#F0F4F8",borderRadius:12,padding:16,minHeight:480,position:"relative",border:`1px solid ${T.border}` }}>
                {/* Mock website bg */}
                <div style={{ background:"#fff",borderRadius:6,padding:12,marginBottom:8,fontSize:11,color:T.textLight }}>
                  tieuam.com — Trang chủ<br/><br/>
                  <div style={{ height:40,background:T.bg,borderRadius:4,marginBottom:4 }} />
                  <div style={{ height:24,background:T.bg,borderRadius:4,marginBottom:4,width:"70%" }} />
                  <div style={{ height:24,background:T.bg,borderRadius:4,width:"50%" }} />
                </div>
                {/* Chat widget preview */}
                <div style={{ position:"absolute",[widgetCfg.position.includes("bottom")?"bottom":"top"]:16,[widgetCfg.position.includes("right")?"right":"left"]:16,width:240 }}>
                  <div style={{ background:"#fff",border:`1px solid ${T.border}`,borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.15)",overflow:"hidden" }}>
                    <div style={{ background:widgetCfg.primaryColor,padding:"10px 14px",color:"#fff" }}>
                      <div style={{ fontSize:12,fontWeight:700 }}>Remak AI Assistant</div>
                      <div style={{ fontSize:9,opacity:0.8 }}>Trợ lý tư vấn thông minh</div>
                    </div>
                    <div style={{ padding:10,background:"#F8FAF6",minHeight:100 }}>
                      <div style={{ background:"#fff",border:`1px solid ${T.border}`,borderRadius:"10px 10px 10px 2px",padding:"8px 10px",fontSize:10,color:T.text,maxWidth:"80%",marginBottom:6 }}>
                        {widgetCfg.greeting.slice(0,60)}...
                      </div>
                    </div>
                    <div style={{ padding:"8px 10px",borderTop:`1px solid ${T.border}`,display:"flex",gap:6 }}>
                      <input placeholder={widgetCfg.placeholder} style={{ flex:1,border:`1px solid ${T.border}`,borderRadius:16,padding:"4px 10px",fontSize:10,outline:"none" }} />
                      <div style={{ width:26,height:26,borderRadius:"50%",background:widgetCfg.primaryColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0 }}>↑</div>
                    </div>
                    {widgetCfg.showBranding && <div style={{ textAlign:"center",padding:"4px 0",fontSize:8,color:T.textLight }}>Powered by Remak AI</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zalo OA */}
        {tab==="zalo" && (
          <div style={{ padding:24,display:"flex",flexDirection:"column",gap:16,maxWidth:640 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,padding:14,borderRadius:8,background:zaloCfg.connected?T.greenLight:T.redLight,border:`1px solid ${zaloCfg.connected?T.greenMid:"#FECACA"}` }}>
              <span style={{ fontSize:24 }}>💙</span>
              <div>
                <div style={{ fontWeight:700,fontSize:13,color:zaloCfg.connected?T.greenDark:T.red }}>{zaloCfg.connected?"✅ Đã kết nối Zalo OA":"❌ Chưa kết nối"}</div>
                {zaloCfg.connected && <div style={{ fontSize:11,color:T.textMid }}>Last sync: {zaloCfg.lastSync} · Webhook: Active</div>}
              </div>
              {zaloCfg.connected && <Btn variant="secondary" size="sm" style={{ marginLeft:"auto" }} onClick={()=>showToast("Đã ngắt kết nối Zalo OA","info")}>Ngắt kết nối</Btn>}
            </div>

            {[
              { label:"OA ID", key:"oaId", placeholder:"123456789" },
              { label:"App ID", key:"appId", placeholder:"oa_app_xxx" },
              { label:"App Secret", key:"appSecret", placeholder:"••••••••••••", type:"password" },
              { label:"Webhook Secret", key:"webhookSecret", placeholder:"••••••••••••", type:"password" },
            ].map(f=>(
              <div key={f.key}>
                <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>{f.label}</label>
                <Input placeholder={f.placeholder} value={zaloCfg[f.key]} onChange={e=>setZaloCfg({...zaloCfg,[f.key]:e.target.value})} icon={f.type==="password"?"🔒":undefined} />
              </div>
            ))}

            <div>
              <label style={{ fontSize:12,fontWeight:600,color:T.textMid,display:"block",marginBottom:5 }}>Webhook URL (copy vào Zalo Developer Console)</label>
              <div style={{ display:"flex",gap:8 }}>
                <Input value={zaloCfg.webhookUrl} style={{ flex:1 }} />
                <Btn variant="secondary" size="sm" onClick={()=>showToast("Đã copy webhook URL")}>📋</Btn>
              </div>
            </div>

            <div style={{ background:T.bg,borderRadius:8,padding:14 }}>
              <div style={{ fontSize:12,fontWeight:700,color:T.textMid,marginBottom:8 }}>Sự kiện Zalo Webhook</div>
              {[["user_send_text","Người dùng gửi tin nhắn văn bản","✅"],["user_send_image","Người dùng gửi ảnh","✅"],["user_follow_oa","Người dùng follow OA","✅"],["user_unfollow_oa","Người dùng unfollow OA","⚠️"]].map(([ev,desc,st])=>(
                <div key={ev} style={{ display:"flex",gap:10,padding:"5px 0",borderBottom:`1px solid ${T.border}`,fontSize:11 }}>
                  <span style={{ fontSize:12 }}>{st}</span>
                  <span style={{ fontFamily:"monospace",color:T.blue,minWidth:150 }}>{ev}</span>
                  <span style={{ color:T.textMid }}>{desc}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex",gap:10 }}>
              <Btn variant="secondary" onClick={()=>showToast("Đang test webhook...")}>🧪 Test Webhook</Btn>
              <Btn variant="primary" onClick={()=>showToast("Cấu hình Zalo OA đã lưu")}>💾 Lưu cấu hình</Btn>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const PAGE_META = {
  dashboard:        { title: "Tổng quan",                              bread: "Admin" },
  conversations:    { title: "Hội thoại",                              bread: "Admin › Hội thoại" },
  quotes:           { title: "Báo giá tự động",                        bread: "Admin › Báo giá" },
  products_view:    { title: "Sản phẩm — ERP Gold Sync",               bread: "Admin › Sản phẩm" },
  users:            { title: "Quản lý Người dùng & Role Profile",      bread: "Admin › Người dùng" },
  kb_upload:        { title: "KB – Tải lên tài liệu",                  bread: "Admin › Knowledge Base › Tài liệu" },
  kb_tags:          { title: "KB – Danh mục & Tag",                     bread: "Admin › Knowledge Base › Phân loại" },
  ncc_review:       { title: "Duyệt tài liệu NCC",                     bread: "Admin › Knowledge Base › NCC Review" },
  supplier_portal:  { title: "NCC Supplier Portal — Upload tài liệu",  bread: "NCC › Tài liệu sản phẩm" },
  prompt_config:    { title: "Prompt Store & AI Monitor",               bread: "Admin › Hệ thống › AI Config" },
  routing_rules:    { title: "Routing Rules & Notification",            bread: "Admin › Hệ thống › Routing" },
  audit_log:        { title: "Audit Log & PII Masking",                 bread: "Admin › Hệ thống › Bảo mật" },
  channel_config:   { title: "Channel Integration — Widget & Zalo OA", bread: "Admin › Kênh" },
  login:            { title: "Đăng nhập", bread: "" },
};

const ROLE_COLORS = {
  admin: "#5B21B6", sales: "#2563EB", trainer: "#538A1F", cs: "#9A3412",
};

export default function RemakAdminPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState("dashboard");

  if (!currentUser) return <LoginPage onLogin={(user) => setCurrentUser(user)} />;

  const meta = PAGE_META[active] || PAGE_META.dashboard;

  const renderPage = () => {
    switch (active) {
      case "dashboard":      return <Dashboard />;
      case "users":          return <UserManagement />;
      case "conversations":   return <ConversationsPage />;
      case "quotes":          return <QuotesPage />;
      case "kb_upload":       return <KBUpload />;
      case "kb_tags":         return <KBTags />;
      case "ncc_review":      return <NCCReview />;
      case "products_view":   return <ProductPage />;
      case "supplier_portal": return <SupplierPortal />;
      case "prompt_config":   return <PromptConfigPage />;
      case "routing_rules":   return <RoutingRulesPage />;
      case "audit_log":       return <AuditLogPage />;
      case "channel_config":  return <ChannelConfigPage />;
      default:
        return (
          <div style={{ padding: 28 }}>
            <Card style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 6 }}>Module đang phát triển</div>
              <div style={{ fontSize: 13, color: T.textLight }}>Tính năng này sẽ được hoàn thành trong Sprint tiếp theo</div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: T.bg }}>
      {/* Sidebar with dynamic user info */}
      <div style={{ width: 220, background: T.sidebar, color: "#fff", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}>
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏗️</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.03em", color: "#fff" }}>REMAK ADMIN</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 1 }}>Sale Support Chatbot</div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "rgba(109,176,43,.18)", borderRadius: 6, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.green }} />
            <span style={{ fontSize: 10, color: T.greenMid, fontWeight: 600 }}>Hệ thống hoạt động tốt</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {MENU.map(g => (
            <div key={g.group} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.28)", padding: "10px 18px 4px", letterSpacing: "0.1em" }}>{g.group}</div>
              {g.items.map(item => {
                const isAct = active === item.id;
                return (
                  <div key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", cursor: "pointer", background: isAct ? T.sidebarAct : "transparent", borderLeft: isAct ? "3px solid " + T.green : "3px solid transparent", color: isAct ? "#fff" : "rgba(255,255,255,.55)", fontSize: 13, fontWeight: isAct ? 600 : 400, transition: "all .15s" }}>
                    <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
                    {item.label}
                    {item.badge && <span style={{ marginLeft: 4, background: T.orange, color: "#fff", fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 8 }}>3</span>}
                    {isAct && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: T.green }} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Dynamic user footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: ROLE_COLORS[currentUser.role] || T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{currentUser.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</div>
              <div style={{ fontSize: 10, color: currentUser.color, fontWeight: 600 }}>{currentUser.label}</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 10, paddingLeft: 2 }}>{currentUser.desc}</div>
          <div onClick={() => setCurrentUser(null)} style={{ fontSize: 12, color: T.orange, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
            <span>↪</span> Đăng xuất
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar title={meta.title} breadcrumb={meta.bread} />
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
