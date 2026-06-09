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
    { id: "dashboard", icon: "▦", label: "Tổng quan" },
    { id: "conversations", icon: "💬", label: "Hội thoại" },
    { id: "quotes", icon: "📋", label: "Báo giá" },
    { id: "products_view", icon: "📦", label: "Sản phẩm" },
  ]},
  { group: "QUẢN LÝ", items: [
    { id: "users", icon: "👤", label: "Người dùng" },
    { id: "kb_upload", icon: "📁", label: "KB Tài liệu" },
    { id: "kb_tags", icon: "🏷️", label: "Danh mục & Tag" },
    { id: "product_import", icon: "📊", label: "Nhập sản phẩm" },
  ]},
  { group: "HỆ THỐNG", items: [
    { id: "prompt_config", icon: "🤖", label: "Cấu hình AI" },
    { id: "routing_rules", icon: "⚙️", label: "Routing Rules" },
    { id: "audit_log", icon: "📜", label: "Audit Log" },
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

// ─── PAGE: LOGIN ──────────────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    role: "admin",
    label: "Admin",
    name: "Truong Nguyen",
    email: "admin@remak.vn",
    password: "Admin@2026",
    icon: "🛡️",
    color: "#5B21B6",
    bg: "#F0EDFF",
    border: "#C4B5FD",
    desc: "Toàn quyền hệ thống",
  },
  {
    role: "sales",
    label: "Sales",
    name: "Nguyen Trường",
    email: "sales@remak.vn",
    password: "Sales@2026",
    icon: "💼",
    color: T.blue,
    bg: T.blueLight,
    border: "#BFDBFE",
    desc: "Hội thoại · Báo giá",
  },
  {
    role: "trainer",
    label: "Trainer",
    name: "Lê Minh Trainer",
    email: "trainer@remak.vn",
    password: "Trainer@2026",
    icon: "📚",
    color: T.greenDark,
    bg: T.greenLight,
    border: T.greenMid,
    desc: "KB Manager · Cấu hình AI",
  },
  {
    role: "cs",
    label: "CS",
    name: "Phạm CS Agent",
    email: "cs@remak.vn",
    password: "CS@2026",
    icon: "🎧",
    color: "#9A3412",
    bg: "#FFF7ED",
    border: "#FED7AA",
    desc: "Handoff Queue · CS",
  },
];

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [activeDemo, setActiveDemo] = useState(null);
  const [logging, setLogging] = useState(false);

  const handleLogin = () => {
    if (!email || !pass) { setError("Vui lòng nhập email và mật khẩu."); return; }
    const match = DEMO_ACCOUNTS.find(a => a.email === email && a.password === pass);
    if (match) {
      setLogging(true);
      setTimeout(() => onLogin(match), 700);
    } else {
      setError("Email hoặc mật khẩu không đúng.");
      setActiveDemo(null);
    }
  };

  const fillDemo = (acc) => {
    setActiveDemo(acc.role);
    setEmail(acc.email);
    setPass(acc.password);
    setError("");
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.sidebar,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      {/* BG pattern */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.04,
        backgroundImage: `repeating-linear-gradient(45deg, ${T.green} 0, ${T.green} 1px, transparent 0, transparent 50%)`,
        backgroundSize: "24px 24px",
      }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420, padding: 24 }}>
        {/* Logo block */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "rgba(109,176,43,.12)", border: `1px solid rgba(109,176,43,.25)`,
            borderRadius: 14, padding: "12px 20px",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: T.green, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20
            }}>🏗️</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "0.03em" }}>REMAK</div>
              <div style={{ fontSize: 10, color: T.greenMid }}>Sale Support Admin Portal</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,.45)" }}>
            www.tieuam.com
          </div>
        </div>

        <Card style={{ padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>Đăng nhập</div>
            <div style={{ fontSize: 12, color: T.textLight, marginTop: 4 }}>Nhập thông tin tài khoản của bạn</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 5 }}>
                Email
              </label>
              <Input
                placeholder="your@remak.vn"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); setActiveDemo(null); }}
                icon="✉"
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 5 }}>
                Mật khẩu
              </label>
              <Input
                placeholder="••••••••"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(""); setActiveDemo(null); }}
                icon="🔒"
              />
            </div>

            {error && (
              <div style={{
                background: T.redLight, color: T.red,
                fontSize: 12, padding: "8px 12px", borderRadius: 6,
                border: `1px solid #FECACA`
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={logging}
              style={{
                width: "100%", border: "none", cursor: logging ? "not-allowed" : "pointer",
                background: logging ? T.greenDark : T.green, color: "#fff",
                fontWeight: 700, borderRadius: 7, padding: "11px 16px",
                fontSize: 14, display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, marginTop: 4,
                transition: "background .2s",
              }}
            >
              {logging ? (
                <>
                  <span style={{
                    width: 14, height: 14, border: "2px solid rgba(255,255,255,.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Đang xác thực...
                </>
              ) : "🔑 Đăng nhập"}
            </button>
          </div>

          <div style={{ marginTop: 18, borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
            <div style={{ fontSize: 11, color: T.textLight, textAlign: "center" }}>
              JWT Auth · RS256 · Bảo mật bởi HashiCorp Vault
            </div>
          </div>
        </Card>

        {/* ── Demo accounts ── */}
        <div style={{ marginTop: 16 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.12)" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: "0.08em", fontWeight: 600, whiteSpace: "nowrap" }}>
              TÀI KHOẢN DEMO — NHẤP ĐỂ ĐĂNG NHẬP NHANH
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.12)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {DEMO_ACCOUNTS.map(acc => {
              const isActive = activeDemo === acc.role;
              return (
                <div
                  key={acc.role}
                  onClick={() => fillDemo(acc)}
                  style={{
                    cursor: "pointer",
                    background: isActive ? acc.bg : "rgba(255,255,255,.06)",
                    border: `1.5px solid ${isActive ? acc.border : "rgba(255,255,255,.12)"}`,
                    borderRadius: 10, padding: "11px 13px",
                    transition: "all .18s",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    boxShadow: isActive ? `0 0 0 3px ${acc.color}30` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 18 }}>{acc.icon}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 800,
                      color: isActive ? acc.color : "rgba(255,255,255,.75)",
                      letterSpacing: "0.05em",
                    }}>{acc.label}</span>
                    {isActive && (
                      <span style={{
                        marginLeft: "auto", fontSize: 9, fontWeight: 700,
                        background: acc.color, color: "#fff",
                        padding: "2px 6px", borderRadius: 4,
                      }}>✓ Đã chọn</span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: isActive ? acc.color : "rgba(255,255,255,.4)", fontFamily: "monospace", marginBottom: 2 }}>
                    {acc.email}
                  </div>
                  <div style={{ fontSize: 10, color: isActive ? acc.color + "aa" : "rgba(255,255,255,.28)", fontFamily: "monospace", marginBottom: 5 }}>
                    {acc.password}
                  </div>
                  <div style={{ fontSize: 10, color: isActive ? acc.color : "rgba(255,255,255,.3)" }}>
                    {acc.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

// ─── PAGE: DASHBOARD ──────────────────────────────────────────────────────────
const Dashboard = () => (
  <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
    <div style={{ display: "flex", gap: 14 }}>
      <StatCard label="Tổng người dùng" value="7" color={T.green} sub="↑ 2 tuần này" />
      <StatCard label="Hội thoại hôm nay" value="24" color={T.blue} sub="12 đang active" />
      <StatCard label="Tài liệu KB" value="18" color={T.text} sub="3 đang xử lý" />
      <StatCard label="Sản phẩm nhập" value="142" color={T.orange} sub="SKU hoạt động" />
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      <Card style={{ flex: 2, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>Sprint 0 – Foundation Progress</div>
        {[
          { label: "US-S0-001  Login & Auth", pct: 100, status: "done" },
          { label: "US-S0-002  User CRUD", pct: 100, status: "done" },
          { label: "US-S0-003  RBAC", pct: 80, status: "inprogress" },
          { label: "US-S0-004  KB Upload", pct: 60, status: "inprogress" },
          { label: "US-S0-005  Tag/Category", pct: 40, status: "inprogress" },
          { label: "US-S0-006  Product Import", pct: 20, status: "todo" },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: T.textMid }}>{item.label}</span>
              <span style={{ fontWeight: 700, color: item.pct === 100 ? T.green : T.textMid }}>{item.pct}%</span>
            </div>
            <div style={{ height: 6, background: T.bg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                width: `${item.pct}%`, height: "100%",
                background: item.pct === 100 ? T.green : item.pct > 50 ? T.yellow : T.border,
                borderRadius: 3, transition: "width .5s"
              }} />
            </div>
          </div>
        ))}
      </Card>

      <Card style={{ flex: 1, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>Hoạt động gần đây</div>
        {[
          { icon: "👤", msg: "Admin tạo user trainer@remak.vn", time: "5 phút trước" },
          { icon: "📁", msg: "Upload Catalogue Stonewool.pdf", time: "12 phút trước" },
          { icon: "🏷️", msg: "Thêm category 'Cách nhiệt bảo ôn'", time: "1 giờ trước" },
          { icon: "📊", msg: "Import 50 SKU từ products.xlsx", time: "2 giờ trước" },
          { icon: "🔑", msg: "sales1@remak.vn đăng nhập", time: "3 giờ trước" },
        ].map((a, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none"
          }}>
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

// ─── PAGE: USER MANAGEMENT ────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: "Truong Nguyen", email: "admin@remak.vn",    role: "admin",   status: "active",   joined: "05/05/2026" },
  { id: 2, name: "Nguyen Trường", email: "nctruong@remak.vn", role: "sales",   status: "active",   joined: "05/05/2026" },
  { id: 3, name: "Lê Minh Trainer", email: "trainer@remak.vn", role: "trainer", status: "active",  joined: "06/05/2026" },
  { id: 4, name: "Phạm CS Agent", email: "cs@remak.vn",       role: "cs",      status: "active",   joined: "07/05/2026" },
  { id: 5, name: "Test User",    email: "test@remak.vn",      role: "sales",   status: "inactive", joined: "08/05/2026" },
  { id: 6, name: "Trường Nguyên", email: "truong2@remak.vn",  role: "sales",   status: "active",   joined: "08/05/2026" },
];

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "sales" });
  const [users, setUsers] = useState(USERS);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const createUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now(), status: "active", joined: new Date().toLocaleDateString("vi-VN") }]);
      setShowModal(false);
      setNewUser({ name: "", email: "", role: "sales" });
    }
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  return (
    <div style={{ padding: 28 }}>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        <StatCard label="Tổng người dùng" value={users.length} color={T.text} />
        <StatCard label="Đang hoạt động" value={users.filter(u => u.status === "active").length} color={T.green} />
        <StatCard label="Bị khóa" value={users.filter(u => u.status === "inactive").length} color={T.orange} />
        <StatCard label="Admin" value={users.filter(u => u.role === "admin").length} color="#5B21B6" />
      </div>

      <Card>
        {/* Toolbar */}
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", gap: 12
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text, flex: 1 }}>Danh sách người dùng</div>
          <Input
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon="🔍"
            style={{ width: 280 }}
          />
          <select style={{
            border: `1px solid ${T.border}`, borderRadius: 7,
            padding: "8px 12px", fontSize: 12, color: T.text, background: T.card
          }}>
            <option>Tất cả vai trò</option>
            <option>Admin</option><option>Sales</option>
            <option>Trainer</option><option>CS</option>
          </select>
          <Btn variant="primary" onClick={() => setShowModal(true)}>+ Thêm người dùng</Btn>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {["Người dùng", "Vai trò", "Trạng thái", "Ngày tham gia", "Thao tác"].map(h => (
                <th key={h} style={{
                  padding: "10px 20px", textAlign: "left",
                  fontSize: 11, fontWeight: 700, color: T.textLight,
                  letterSpacing: "0.06em", textTransform: "uppercase"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.card : "rgba(244,246,243,.4)" }}>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={u.name} size={32} bg={u.role === "admin" ? "#5B21B6" : u.role === "trainer" ? T.green : u.role === "cs" ? "#9A3412" : T.blue} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: T.textLight }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 20px" }}><Badge status={u.role} /></td>
                <td style={{ padding: "12px 20px" }}><Badge status={u.status} /></td>
                <td style={{ padding: "12px 20px", fontSize: 12, color: T.textMid }}>{u.joined}</td>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn variant="secondary" size="sm">✏️</Btn>
                    <Btn variant="secondary" size="sm" onClick={() => toggleStatus(u.id)}>
                      {u.status === "active" ? "🔒" : "✅"}
                    </Btn>
                    <Btn variant="ghost" size="sm">↩</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 20px", fontSize: 12, color: T.textLight, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Hiển thị {filtered.length}/{users.length} người dùng</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map(p => <Btn key={p} variant={p === 1 ? "primary" : "secondary"} size="sm">{p}</Btn>)}
          </div>
        </div>
      </Card>

      {/* Create Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
        }}>
          <Card style={{ width: 420, padding: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 20 }}>Thêm người dùng mới</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>Họ và tên *</label>
                <Input placeholder="Nguyễn Văn A" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>Email *</label>
                <Input placeholder="user@remak.vn" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>Vai trò</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                  style={{ width: "100%", border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 12px", fontSize: 13, color: T.text }}
                >
                  <option value="admin">Admin</option>
                  <option value="sales">Sales</option>
                  <option value="trainer">Trainer</option>
                  <option value="cs">CS</option>
                </select>
              </div>

              {/* RBAC Preview */}
              <div style={{ background: T.bg, borderRadius: 7, padding: 12, fontSize: 11, color: T.textMid }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Quyền truy cập theo vai trò {newUser.role}:</div>
                {newUser.role === "admin" && <span>Dashboard · User Mgmt · KB Manager · Cấu hình AI · Audit Log · Routing Rules</span>}
                {newUser.role === "sales" && <span>Dashboard · Hội thoại · Báo giá</span>}
                {newUser.role === "trainer" && <span>Dashboard · KB Manager · Cấu hình AI · Hội thoại (xem)</span>}
                {newUser.role === "cs" && <span>Dashboard · Hội thoại (handoff queue)</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setShowModal(false)}>Hủy</Btn>
              <Btn variant="primary" onClick={createUser}>Tạo tài khoản</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── PAGE: KB UPLOAD ──────────────────────────────────────────────────────────
const KB_DOCS = [
  { id: 1, name: "Catalogue_Stonewool_2024.pdf",  type: "PDF",  status: "active",     chunks: 248, size: "12.4 MB", date: "08/06/2026" },
  { id: 2, name: "Datasheet_AirReflex.pdf",        type: "PDF",  status: "active",     chunks: 86,  size: "3.2 MB",  date: "07/06/2026" },
  { id: 3, name: "Fire_Rating_Standards.docx",     type: "DOCX", status: "processing", chunks: 0,   size: "2.1 MB",  date: "08/06/2026" },
  { id: 4, name: "Product_Spec_Table.xlsx",        type: "XLSX", status: "active",     chunks: 124, size: "1.8 MB",  date: "06/06/2026" },
  { id: 5, name: "https://tieuam.com/stonewool",   type: "URL",  status: "error",      chunks: 0,   size: "—",       date: "05/06/2026" },
  { id: 6, name: "NRC_Technical_Guide.pdf",        type: "PDF",  status: "processing", chunks: 0,   size: "5.7 MB",  date: "08/06/2026" },
];

const KBUpload = () => {
  const [docs, setDocs] = useState(KB_DOCS);
  const [filter, setFilter] = useState("all");
  const [urlInput, setUrlInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [search, setSearch] = useState("");

  const deleteDoc = (id) => setDocs(docs.filter(d => d.id !== id));

  const filtered = docs.filter(d => {
    const matchFilter = filter === "all" || d.status === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Stats */}
      <div style={{ display: "flex", gap: 14 }}>
        <StatCard label="Tổng tài liệu" value={docs.length} color={T.text} />
        <StatCard label="Đang active" value={docs.filter(d => d.status === "active").length} color={T.green} />
        <StatCard label="Đang xử lý" value={docs.filter(d => d.status === "processing").length} color={T.yellow} />
        <StatCard label="Lỗi" value={docs.filter(d => d.status === "error").length} color={T.orange} />
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Upload zone */}
        <div style={{ width: 340, flexShrink: 0 }}>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, fontWeight: 700, fontSize: 14, color: T.text }}>
              📤 Tải lên tài liệu
            </div>
            <div style={{ padding: 20 }}>
              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); }}
                style={{
                  border: `2px dashed ${dragOver ? T.green : T.border}`,
                  background: dragOver ? T.greenLight : T.bg,
                  borderRadius: 10, padding: "30px 20px",
                  textAlign: "center", transition: "all .2s", cursor: "pointer"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>
                  Kéo thả file vào đây
                </div>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 14 }}>
                  Hỗ trợ: PDF, DOCX, XLSX · Tối đa 50MB
                </div>
                <Btn variant="secondary" size="sm">📁 Chọn file từ máy</Btn>
              </div>

              {/* Format badges */}
              <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "center" }}>
                {["PDF", "DOCX", "XLSX"].map(f => (
                  <span key={f} style={{ fontSize: 10, fontWeight: 700, background: T.greenLight, color: T.greenDark, padding: "3px 8px", borderRadius: 4 }}>{f}</span>
                ))}
              </div>

              {/* URL input */}
              <div style={{ marginTop: 18, borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.textMid, marginBottom: 8 }}>Hoặc thêm URL:</div>
                <Input
                  placeholder="https://tieuam.com/catalogue..."
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  icon="🔗"
                />
                <Btn variant="primary" size="sm" style={{ marginTop: 8, width: "100%", justifyContent: "center" }}>
                  + Thêm URL
                </Btn>
              </div>
            </div>
          </Card>
        </div>

        {/* Document list */}
        <Card style={{ flex: 1, overflow: "hidden" }}>
          {/* Toolbar */}
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: T.text }}>Tài liệu đã tải lên</div>
            <Input placeholder="Tìm tài liệu..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width: 200 }} />
            <div style={{ display: "flex", gap: 4 }}>
              {["all", "active", "processing", "error"].map(f => (
                <Btn key={f} variant={filter === f ? "primary" : "secondary"} size="sm" onClick={() => setFilter(f)}>
                  {f === "all" ? "Tất cả" : f === "active" ? "Active" : f === "processing" ? "Xử lý" : "Lỗi"}
                </Btn>
              ))}
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["Tên tài liệu", "Loại", "Trạng thái", "Chunks", "Kích thước", "Ngày", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: T.textLight, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => (
                <tr key={doc.id} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.card : "rgba(244,246,243,.4)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.text, maxWidth: 220 }}>
                      {doc.name.length > 30 ? doc.name.substring(0, 30) + "..." : doc.name}
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, background: T.blueLight, color: T.blue, padding: "2px 7px", borderRadius: 4 }}>{doc.type}</span>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <Badge status={doc.status} />
                    {doc.status === "processing" && (
                      <div style={{ marginTop: 4, width: 80, height: 4, background: T.border, borderRadius: 2 }}>
                        <div style={{ width: "45%", height: "100%", background: T.yellow, borderRadius: 2 }} />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: T.textMid, fontWeight: doc.chunks > 0 ? 700 : 400 }}>{doc.chunks || "—"}</td>
                  <td style={{ padding: "10px 16px", fontSize: 11, color: T.textLight }}>{doc.size}</td>
                  <td style={{ padding: "10px 16px", fontSize: 11, color: T.textLight }}>{doc.date}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <Btn variant="danger" size="sm" onClick={() => deleteDoc(doc.id)}>🗑️</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "10px 16px", fontSize: 11, color: T.textLight }}>
            Hiển thị {filtered.length}/{docs.length} tài liệu
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── PAGE: KB TAGS ─────────────────────────────────────────────────────────────
const CATS = [
  { id: 1, name: "Cách âm tiêu âm", slug: "cach-am-tieu-am", count: 8, color: T.blue },
  { id: 2, name: "Cách nhiệt bảo ôn", slug: "cach-nhiet-bao-on", count: 6, color: T.green },
  { id: 3, name: "Chống cháy", slug: "chong-chay", count: 4, color: T.orange },
  { id: 4, name: "Bảo ôn lạnh", slug: "bao-on-lanh", count: 3, color: "#0891B2" },
];
const TAGS = [
  { name: "NRC Rating", count: 12 }, { name: "STC", count: 8 },
  { name: "R-value", count: 6 }, { name: "Fire Rating", count: 9 },
  { name: "Stonewool", count: 15 }, { name: "AirReflex", count: 7 },
  { name: "Datasheet", count: 18 }, { name: "Technical Spec", count: 11 },
];

const KB_TAG_DOCS = [
  { name: "Catalogue_Stonewool_2024.pdf", cats: [1, 2], tags: ["Stonewool", "NRC Rating"] },
  { name: "Datasheet_AirReflex.pdf", cats: [2], tags: ["AirReflex", "R-value"] },
  { name: "Fire_Rating_Standards.docx", cats: [3], tags: ["Fire Rating"] },
  { name: "Product_Spec_Table.xlsx", cats: [1, 2, 3, 4], tags: ["Technical Spec", "STC"] },
];

const KBTags = () => {
  const [cats, setCats] = useState(CATS);
  const [activeFilter, setActiveFilter] = useState(null);
  const [newCat, setNewCat] = useState("");

  const addCat = () => {
    if (newCat.trim()) {
      setCats([...cats, { id: Date.now(), name: newCat, slug: newCat.toLowerCase().replace(/ /g, "-"), count: 0, color: T.textMid }]);
      setNewCat("");
    }
  };

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 20 }}>
        {/* Categories panel */}
        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>📂 Quản lý Danh mục</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cats.map(cat => (
                <div key={cat.id}
                  onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                    background: activeFilter === cat.id ? cat.color + "18" : T.bg,
                    border: `1px solid ${activeFilter === cat.id ? cat.color : T.border}`,
                    transition: "all .15s"
                  }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.text }}>{cat.name}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: cat.color + "25", color: cat.color,
                    padding: "2px 7px", borderRadius: 10
                  }}>{cat.count}</span>
                  <Btn variant="ghost" size="sm" onClick={e => { e.stopPropagation(); }}>✏️</Btn>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.textMid, marginBottom: 6 }}>Thêm danh mục mới</div>
              <div style={{ display: "flex", gap: 6 }}>
                <Input placeholder="Tên danh mục..." value={newCat} onChange={e => setNewCat(e.target.value)} style={{ flex: 1 }} />
                <Btn variant="primary" size="sm" onClick={addCat}>+</Btn>
              </div>
            </div>
          </Card>

          {/* Tags cloud */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 12 }}>🏷️ Tags kỹ thuật</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TAGS.map(tag => (
                <span key={tag.name} style={{
                  fontSize: 11, fontWeight: 600, cursor: "pointer",
                  background: T.greenLight, color: T.greenDark,
                  border: `1px solid ${T.greenMid}`,
                  padding: "3px 10px", borderRadius: 12,
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  {tag.name} <span style={{ opacity: 0.6 }}>({tag.count})</span>
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <Input placeholder="Thêm tag mới..." icon="🏷" />
            </div>
          </Card>
        </div>

        {/* Documents with tags */}
        <Card style={{ flex: 1 }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: T.text }}>
              Tài liệu & Phân loại
              {activeFilter && (
                <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 400, color: T.textLight }}>
                  — Lọc: {cats.find(c => c.id === activeFilter)?.name}
                </span>
              )}
            </div>
            {activeFilter && <Btn variant="secondary" size="sm" onClick={() => setActiveFilter(null)}>✕ Bỏ lọc</Btn>}
          </div>

          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {KB_TAG_DOCS.filter(d => !activeFilter || d.cats.includes(activeFilter)).map((doc, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 8, border: `1px solid ${T.border}`,
                background: T.bg, display: "flex", alignItems: "flex-start", gap: 12
              }}>
                <div style={{ fontSize: 22 }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>{doc.name}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                    {doc.cats.map(cid => {
                      const cat = cats.find(c => c.id === cid);
                      return cat ? (
                        <span key={cid} style={{
                          fontSize: 10, fontWeight: 700,
                          background: cat.color + "18", color: cat.color,
                          border: `1px solid ${cat.color}40`,
                          padding: "2px 8px", borderRadius: 4
                        }}>{cat.name}</span>
                      ) : null;
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {doc.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, background: T.greenLight, color: T.greenDark, padding: "2px 7px", borderRadius: 10 }}>🏷 {t}</span>
                    ))}
                  </div>
                </div>
                <Btn variant="secondary" size="sm">+ Gán tag</Btn>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── PAGE: PRODUCT IMPORT ──────────────────────────────────────────────────────
const PRODUCTS = [
  { sku: "RMK-SW-50", name: "Bông đá Stonewool 50mm", cat: "Cách nhiệt bảo ôn", price: "45,000 VND/m²", unit: "m²", nrc: "0.70", stc: "28", status: "active" },
  { sku: "RMK-AR-20", name: "Túi khí AirReflex 20mm", cat: "Cách nhiệt bảo ôn", price: "28,000 VND/m²", unit: "m²", nrc: "—", stc: "—", status: "active" },
  { sku: "RMK-MT-30", name: "Mút trứng tiêu âm 30mm", cat: "Cách âm tiêu âm", price: "52,000 VND/m²", unit: "m²", nrc: "0.85", stc: "—", status: "active" },
  { sku: "RMK-FP-B1", name: "Tấm chống cháy cấp B1", cat: "Chống cháy", price: "120,000 VND/m²", unit: "m²", nrc: "—", stc: "42", status: "active" },
  { sku: "RMK-GL-100", name: "Bông thủy tinh 100mm", cat: "Bảo ôn lạnh", price: "38,000 VND/m²", unit: "m²", nrc: "0.65", stc: "—", status: "inactive" },
];

const ProductImport = () => {
  const [step, setStep] = useState(0); // 0=upload, 1=mapping, 2=done
  const [products] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const [importing, setImporting] = useState(false);

  const startImport = () => {
    setImporting(true);
    let p = 0;
    const iv = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) { clearInterval(iv); setStep(2); setImporting(false); }
    }, 200);
  };

  const HEADERS = ["Mã SP", "Tên sản phẩm", "Danh mục", "Đơn giá (VND)", "Đơn vị", "NRC", "STC", "Trạng thái"];
  const FIELDS = ["sku", "name", "category", "price", "unit", "nrc", "stc", "status"];
  const [mapping, setMapping] = useState({ "Mã SP": "sku", "Tên sản phẩm": "name", "Đơn giá (VND)": "price", "Đơn vị": "unit" });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Stepper */}
      <Card style={{ padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {[
            { num: 1, label: "Tải file lên" },
            { num: 2, label: "Cấu hình mapping" },
            { num: 3, label: "Xem trước & Import" },
            { num: 4, label: "Hoàn tất" },
          ].map((s, i) => {
            const done = step > i;
            const active = step === i;
            return (
              <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: done ? T.green : active ? T.green : T.border,
                    color: done || active ? "#fff" : T.textLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700
                  }}>{done ? "✓" : s.num}</div>
                  <span style={{ fontSize: 11, color: active ? T.green : done ? T.greenDark : T.textLight, fontWeight: active ? 700 : 400, textAlign: "center" }}>{s.label}</span>
                </div>
                {i < 3 && <div style={{ height: 2, flex: 1, background: done ? T.green : T.border, marginBottom: 20, marginTop: -10 }} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Upload / Mapping panel */}
        <div style={{ width: 340, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {step === 0 && (
            <Card style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>📥 Upload file sản phẩm</div>
              <div
                onClick={() => setStep(1)}
                style={{
                  border: `2px dashed ${T.border}`, background: T.bg,
                  borderRadius: 10, padding: "30px 20px",
                  textAlign: "center", cursor: "pointer"
                }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>Kéo thả file hoặc nhấn chọn</div>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 14 }}>CSV, XLSX · Tối đa 10MB · UTF-8</div>
                <Btn variant="primary" size="sm">📁 Chọn file</Btn>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: T.textMid }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Cấu hình Mapping đã lưu:</div>
                {["Remak Standard CSV", "Bảng giá 2024"].map(m => (
                  <div key={m} style={{
                    padding: "7px 10px", background: T.bg, borderRadius: 6,
                    fontSize: 11, color: T.textMid, marginBottom: 4,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    border: `1px solid ${T.border}`
                  }}>
                    <span>📋 {m}</span>
                    <Btn variant="ghost" size="sm">Dùng</Btn>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {step >= 1 && step < 2 && (
            <Card style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 4 }}>⚙️ Cấu hình Mapping</div>
              <div style={{ fontSize: 11, color: T.textLight, marginBottom: 14 }}>products_2024.xlsx · 50 dòng</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {HEADERS.slice(0, 5).map(h => (
                  <div key={h}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.textMid, marginBottom: 4 }}>Cột: "{h}"</div>
                    <select
                      value={mapping[h] || ""}
                      onChange={e => setMapping({ ...mapping, [h]: e.target.value })}
                      style={{ width: "100%", border: `1px solid ${T.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12 }}
                    >
                      <option value="">— Bỏ qua —</option>
                      {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <Input placeholder="Lưu config này..." style={{ flex: 1 }} />
                <Btn variant="secondary" size="sm">💾</Btn>
              </div>
              <Btn variant="primary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => { setStep(2); startImport(); }}>
                ▶ Bắt đầu Import
              </Btn>
              {importing && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: T.textMid, marginBottom: 4 }}>Đang import {Math.round(progress / 2)}/50 sản phẩm...</div>
                  <div style={{ height: 6, background: T.border, borderRadius: 3 }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: T.green, borderRadius: 3, transition: "width .2s" }} />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div style={{ marginTop: 12, padding: 10, background: T.greenLight, borderRadius: 6, fontSize: 12, color: T.greenDark, fontWeight: 600 }}>
                  ✅ Import thành công 50/50 sản phẩm
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Products table */}
        <Card style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: T.text }}>📦 Danh sách sản phẩm ({products.length} SKU)</div>
            <Input placeholder="Tìm SKU, tên sản phẩm..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width: 220 }} />
            <Btn variant="primary" size="sm">+ Thêm SKU</Btn>
          </div>

          {/* Preview header (step 1) */}
          {step === 1 && (
            <div style={{ padding: "8px 20px", background: T.yellowLight, borderBottom: `1px solid ${T.border}`, fontSize: 11, color: "#92400E" }}>
              👁 Preview 10 dòng đầu · Mapping: {Object.keys(mapping).filter(k => mapping[k]).length} cột được ánh xạ
            </div>
          )}

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["SKU", "Tên sản phẩm", "Danh mục", "Giá niêm yết", "NRC", "STC", "Trạng thái", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: T.textLight, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.sku} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.card : "rgba(244,246,243,.4)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLight, padding: "2px 7px", borderRadius: 4 }}>{p.sku}</span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: T.text }}>{p.name}</td>
                  <td style={{ padding: "10px 16px", fontSize: 11, color: T.textMid }}>{p.cat}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: T.text }}>{p.price}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: T.textMid }}>{p.nrc}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: T.textMid }}>{p.stc}</td>
                  <td style={{ padding: "10px 16px" }}><Badge status={p.status} /></td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Btn variant="secondary" size="sm">✏️</Btn>
                      <Btn variant="danger" size="sm">🗑️</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Error report section */}
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${T.border}`, background: T.redLight, display: step < 1 ? "none" : "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: T.red, fontWeight: 600 }}>⚠️ 2 lỗi phát hiện: SKU trùng lặp (dòng 12, 31)</span>
            <Btn variant="secondary" size="sm">📥 Tải báo cáo lỗi</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const PAGE_META = {
  dashboard:       { title: "Tổng quan",              bread: "Admin" },
  users:           { title: "Người dùng",              bread: "Admin › Người dùng" },
  kb_upload:       { title: "KB – Tải lên tài liệu",   bread: "Admin › Knowledge Base › Tài liệu" },
  kb_tags:         { title: "KB – Danh mục & Tag",      bread: "Admin › Knowledge Base › Phân loại" },
  product_import:  { title: "Nhập dữ liệu sản phẩm",   bread: "Admin › Sản phẩm › Import" },
  login:           { title: "Đăng nhập", bread: "" },
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
      case "kb_upload":      return <KBUpload />;
      case "kb_tags":        return <KBTags />;
      case "product_import": return <ProductImport />;
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
