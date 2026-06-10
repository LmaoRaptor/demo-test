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

// Role meta: mỗi role có màu, icon, desc, modules
const ROLE_META = {
  admin:   { color: "#5B21B6", bg: "#F0EDFF", border: "#C4B5FD", icon: "🛡️", label: "Admin",   desc: "Toàn quyền hệ thống" },
  sales:   { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", icon: "💼", label: "Sales",   desc: "Hội thoại · Báo giá" },
  trainer: { color: "#538A1F", bg: "#EBF5E0", border: "#C2E29A", icon: "📚", label: "Trainer", desc: "KB Manager · Cấu hình AI" },
  cs:      { color: "#9A3412", bg: "#FFF7ED", border: "#FED7AA", icon: "🎧", label: "CS",      desc: "Handoff Queue · CS" },
  ncc:     { color: "#0E7490", bg: "#ECFEFF", border: "#A5F3FC", icon: "🏭", label: "NCC",     desc: "Supplier Portal" },
};

const ROLE_DESCRIPTIONS = [
  {
    role: "admin", icon: "🛡️", label: "Admin", color: "#5B21B6", bg: "#F0EDFF",
    summary: "Quản trị hệ thống toàn diện — cấu hình, audit, routing, user management.",
    scope: "Full toàn bộ 47 chức năng",
    limits: ["Không tự khóa tài khoản của chính mình", "Luôn phải có ít nhất 1 Admin active trong hệ thống"],
    modules: ["Quản lý Users & RBAC", "Dashboard KPI toàn bộ", "KB Manager (Full CRUD)", "Prompt & AI Config", "Routing Rules", "Audit Log & PII Masking", "Báo giá & Quote assign", "Cấu hình Zalo/Widget"],
  },
  {
    role: "sales", icon: "💼", label: "Sales", color: "#2563EB", bg: "#EFF6FF",
    summary: "Xử lý hội thoại khách hàng, claim lead, tạo và quản lý báo giá cá nhân.",
    scope: "Full/Own ~16 chức năng",
    limits: ["Không thấy hội thoại/báo giá của Sale khác", "Không chỉnh KB hoặc cấu hình AI", "Không truy cập User Management"],
    modules: ["Dashboard (KPI cá nhân)", "Hội thoại Public (claim)", "Hội thoại đã gán (Own)", "Báo giá (Own + Edit)", "Nhận thông báo claim/assigned", "Gán nhãn hội thoại"],
  },
  {
    role: "trainer", icon: "📚", label: "Trainer", color: "#538A1F", bg: "#EBF5E0",
    summary: "Quản lý tri thức AI — upload tài liệu, cấu hình prompt, kiểm soát chất lượng KB.",
    scope: "Full ~11 + Read ~5 chức năng",
    limits: ["Không thấy báo giá khách hàng", "Không claim/xử lý hội thoại", "Không truy cập User Management"],
    modules: ["KB Manager (Full CRUD)", "Prompt Store & Playground", "Chunk Explorer & Quality", "ETL Pipeline (Read)", "Hội thoại (Read — quality review)", "AI Monitor (Read)", "Dashboard AI metrics"],
  },
  {
    role: "cs", icon: "🎧", label: "CS", color: "#9A3412", bg: "#FFF7ED",
    summary: "Xử lý handoff queue, hỗ trợ khách cũ timeout, escalate VIP.",
    scope: "Full ~5 + Own ~3 chức năng",
    limits: ["Không cấu hình hệ thống hoặc AI", "Không tạo/sửa báo giá", "Không truy cập KB Manager"],
    modules: ["CS Queue (nhận & trả lời)", "Hội thoại (Assigned + CS Queue)", "Xem báo giá (Own — để tư vấn)", "Escalate VIP → Manager", "Resolve/đóng ticket"],
  },
  {
    role: "ncc", icon: "🏭", label: "NCC (Nhà cung cấp)", color: "#0E7490", bg: "#ECFEFF",
    summary: "Nhà cung cấp quản lý sản phẩm của mình, upload datasheet, xử lý đơn hàng. Truy cập qua Supplier Portal riêng.",
    scope: "Own ~10 chức năng",
    limits: ["KHÔNG đăng nhập hệ thống nội bộ Admin Portal", "Truy cập qua Supplier Portal riêng biệt", "Trainer phải review & approve trước khi vào KB"],
    modules: ["Quản lý SP riêng (Own)", "Upload datasheet kỹ thuật", "Xem trạng thái duyệt SP", "Cập nhật giá & tồn kho", "Xử lý đơn hàng của mình", "Import sản phẩm (Own)"],
  },
];

// Permission matrix data — 47 functions × 5 roles
const PERM_MATRIX = [
  { module: "1. Hệ thống & Users", fn: "Đăng nhập / Đăng xuất", ref: "FN1.1", admin: "Full", sales: "Full", trainer: "Full", cs: "Full", ncc: "Full" },
  { module: "1. Hệ thống & Users", fn: "Quản lý người dùng (CRUD)", ref: "FN1.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "1. Hệ thống & Users", fn: "Gán / thay đổi roles (multi-role)", ref: "FN1.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "1. Hệ thống & Users", fn: "Phân quyền RBAC seed", ref: "FN1.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "1. Hệ thống & Users", fn: "Xem & sửa hồ sơ cá nhân", ref: "FN1.3", admin: "Full", sales: "Own", trainer: "Own", cs: "Own", ncc: "Own" },
  { module: "2. Dashboard & Báo cáo", fn: "Dashboard tổng quan (KPI cards)", ref: "FN1.3", admin: "Full", sales: "Read", trainer: "Read", cs: "—", ncc: "Own", note: "Sales thấy KPI cá nhân" },
  { module: "2. Dashboard & Báo cáo", fn: "Thống kê AI / chất lượng", ref: "FN1.3", admin: "Full", sales: "—", trainer: "Read", cs: "—", ncc: "—" },
  { module: "2. Dashboard & Báo cáo", fn: "Báo cáo doanh số / báo giá", ref: "FN1.3", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "Own" },
  { module: "3. Knowledge Base", fn: "Tải lên tài liệu KB", ref: "FN2.1.1", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "Own", note: "NCC upload → Trainer review & approve" },
  { module: "3. Knowledge Base", fn: "Quản lý Tag & Danh mục", ref: "FN2.1.2", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "—" },
  { module: "3. Knowledge Base", fn: "Xem trạng thái ETL pipeline", ref: "FN2.1.3", admin: "Full", sales: "—", trainer: "Read", cs: "—", ncc: "—" },
  { module: "3. Knowledge Base", fn: "Prompt Store & Playground", ref: "FN2.1.4", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "—" },
  { module: "3. Knowledge Base", fn: "Chunk Explorer & KB Quality", ref: "FN2.1.5", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "—" },
  { module: "3. Knowledge Base", fn: "Nhập sản phẩm (Product Import)", ref: "FN2.2", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "Own" },
  { module: "4. Quản lý Sản phẩm (NCC)", fn: "Tạo / sửa / xóa SP của mình", ref: "FN9.1", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "Own" },
  { module: "4. Quản lý Sản phẩm (NCC)", fn: "Upload datasheet kỹ thuật", ref: "FN9.2", admin: "Full", sales: "—", trainer: "Read", cs: "—", ncc: "Own" },
  { module: "4. Quản lý Sản phẩm (NCC)", fn: "Xem trạng thái duyệt SP", ref: "FN9.3", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "Own" },
  { module: "4. Quản lý Sản phẩm (NCC)", fn: "Cập nhật giá & tồn kho", ref: "FN9.4", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "Own", note: "Ghi qua ERPNext" },
  { module: "5. Hội thoại & Routing", fn: "Xem hội thoại PUBLIC (khách mới)", ref: "FN4.1", admin: "Full", sales: "Read", trainer: "—", cs: "—", ncc: "—", note: "Tất cả Sale thấy – first-claim" },
  { module: "5. Hội thoại & Routing", fn: "Claim hội thoại public", ref: "FN4.2", admin: "Full", sales: "Full", trainer: "—", cs: "—", ncc: "—", note: "Atomic – ai claim trước được" },
  { module: "5. Hội thoại & Routing", fn: "Xem hội thoại đã gán cho mình", ref: "FN4.1", admin: "Full", sales: "Own", trainer: "Read", cs: "Read", ncc: "—" },
  { module: "5. Hội thoại & Routing", fn: "Xem TẤT CẢ hội thoại", ref: "FN4.1", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—", note: "Chỉ Admin" },
  { module: "5. Hội thoại & Routing", fn: "Gán nhãn hội thoại (Tagging)", ref: "FN4.3", admin: "Full", sales: "Full", trainer: "—", cs: "Full", ncc: "—" },
  { module: "5. Hội thoại & Routing", fn: "Feedback Loop & Labeling", ref: "FN4.4", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "—" },
  { module: "6. Timeout & Re-routing", fn: "Cấu hình ngưỡng timeout", ref: "FN6.T", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "6. Timeout & Re-routing", fn: "Xem cảnh báo timeout", ref: "FN6.T", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "—" },
  { module: "6. Timeout & Re-routing", fn: "Gỡ gán quá timeout (thủ công)", ref: "FN6.T", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "7. Khách cũ – Protected", fn: "Xem hội thoại khách cũ (của mình)", ref: "FN4.P", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "—" },
  { module: "7. Khách cũ – Protected", fn: "Xem hội thoại khách VIP", ref: "FN4.P", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "—" },
  { module: "7. Khách cũ – Protected", fn: "Escalate VIP → CS + Manager", ref: "FN4.P", admin: "Full", sales: "Own", trainer: "—", cs: "Full", ncc: "—" },
  { module: "8. Handoff & CS Queue", fn: "Xem CS Queue (hàng chờ handoff)", ref: "FN3.3.2", admin: "Full", sales: "—", trainer: "—", cs: "Full", ncc: "—" },
  { module: "8. Handoff & CS Queue", fn: "Nhận & trả lời (CS mode)", ref: "FN3.3.2", admin: "Full", sales: "—", trainer: "—", cs: "Full", ncc: "—" },
  { module: "8. Handoff & CS Queue", fn: "Resolve / đóng ticket", ref: "FN3.3.2", admin: "Full", sales: "—", trainer: "—", cs: "Full", ncc: "—" },
  { module: "8. Handoff & CS Queue", fn: "Xem báo giá khi xử lý ticket", ref: "FN5.1", admin: "Full", sales: "—", trainer: "—", cs: "Own", ncc: "—" },
  { module: "9. Báo giá (Quote)", fn: "Xem danh sách báo giá", ref: "FN5.1.2", admin: "Full", sales: "Own", trainer: "—", cs: "Own", ncc: "Own" },
  { module: "9. Báo giá (Quote)", fn: "Chỉnh sửa báo giá (line items)", ref: "FN5.1.2", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "—" },
  { module: "9. Báo giá (Quote)", fn: "Gán báo giá cho Sales", ref: "FN5.2.1", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "10. Đơn hàng (NCC)", fn: "Xem đơn hàng liên quan", ref: "FN10.2", admin: "Full", sales: "Read", trainer: "—", cs: "—", ncc: "Own" },
  { module: "10. Đơn hàng (NCC)", fn: "Xác nhận / từ chối đơn hàng", ref: "FN10.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "Own" },
  { module: "10. Đơn hàng (NCC)", fn: "Cập nhật trạng thái giao hàng", ref: "FN10.3", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "Own" },
  { module: "10. Đơn hàng (NCC)", fn: "Xem lịch sử giao dịch", ref: "FN10.4", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "Own" },
  { module: "11. Routing & Thông báo", fn: "Cấu hình Routing Rules", ref: "FN6.1", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "11. Routing & Thông báo", fn: "Nhận TB – hội thoại PUBLIC mới", ref: "FN6.2", admin: "Full", sales: "Full", trainer: "—", cs: "—", ncc: "—" },
  { module: "11. Routing & Thông báo", fn: "Nhận TB – hội thoại gán cho mình", ref: "FN6.2", admin: "Full", sales: "Own", trainer: "—", cs: "Full", ncc: "Own" },
  { module: "11. Routing & Thông báo", fn: "Nhận cảnh báo timeout", ref: "FN6.2", admin: "Full", sales: "Own", trainer: "—", cs: "—", ncc: "—" },
  { module: "11. Routing & Thông báo", fn: "Cấu hình template thông báo", ref: "FN6.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "12. Cấu hình AI", fn: "Cấu hình Prompt & Guardrails", ref: "FN1.4", admin: "Full", sales: "—", trainer: "Full", cs: "—", ncc: "—" },
  { module: "12. Cấu hình AI", fn: "Xem Agent Monitor / trạng thái AI", ref: "AI Mtr", admin: "Full", sales: "—", trainer: "Read", cs: "—", ncc: "—" },
  { module: "13. Bảo mật & Audit", fn: "Xem Audit Log", ref: "FN8.1", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "13. Bảo mật & Audit", fn: "Cấu hình PII Masking", ref: "FN8.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
  { module: "14. Web Widget & Zalo", fn: "Cấu hình Embed Code Generator", ref: "Widget", admin: "Full", sales: "—", trainer: "Read", cs: "—", ncc: "—" },
  { module: "14. Web Widget & Zalo", fn: "Cấu hình Zalo OA Webhook", ref: "FN7.2", admin: "Full", sales: "—", trainer: "—", cs: "—", ncc: "—" },
];

// PermLevel badge
const PermBadge = ({ level }) => {
  const cfg = {
    "Full": { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" },
    "Own":  { bg: "#EFF6FF", color: "#1D4ED8", border: "#93C5FD" },
    "Read": { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047" },
    "—":    { bg: "#F4F6F3", color: "#8A9585", border: "#E3E8DC" },
  };
  const s = cfg[level] || cfg["—"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 44, padding: "3px 8px", borderRadius: 5, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{level}</span>
  );
};

// Multi-role checkbox group
const RoleCheckboxes = ({ selected, onChange }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    {Object.entries(ROLE_META).filter(([r]) => r !== "ncc").map(([role, meta]) => {
      const checked = selected.includes(role);
      return (
        <label key={role} style={{
          display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
          padding: "6px 12px", borderRadius: 7,
          background: checked ? meta.bg : T.bg,
          border: `1.5px solid ${checked ? meta.border : T.border}`,
          transition: "all .15s",
        }}>
          <input type="checkbox" checked={checked} onChange={() => {
            onChange(checked ? selected.filter(r => r !== role) : [...selected, role]);
          }} style={{ accentColor: meta.color, width: 13, height: 13 }} />
          <span style={{ fontSize: 13 }}>{meta.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: checked ? meta.color : T.textMid }}>{meta.label}</span>
        </label>
      );
    })}
  </div>
);

const USERS_INIT = [
  { id: 1, name: "Truong Nguyen",   email: "admin@remak.vn",    roles: ["admin"],            status: "active",   joined: "05/05/2026", lastLogin: "08/06/2026" },
  { id: 2, name: "Nguyen Trường",   email: "nctruong@remak.vn", roles: ["sales"],            status: "active",   joined: "05/05/2026", lastLogin: "08/06/2026" },
  { id: 3, name: "Lê Minh Trainer", email: "trainer@remak.vn",  roles: ["trainer"],          status: "active",   joined: "06/05/2026", lastLogin: "07/06/2026" },
  { id: 4, name: "Phạm CS Agent",   email: "cs@remak.vn",       roles: ["cs"],               status: "active",   joined: "07/05/2026", lastLogin: "07/06/2026" },
  { id: 5, name: "Lê Văn Multi",    email: "multi@remak.vn",    roles: ["sales","trainer"],  status: "active",   joined: "01/06/2026", lastLogin: "08/06/2026" },
  { id: 6, name: "Test User",       email: "test@remak.vn",     roles: ["sales"],            status: "inactive", joined: "08/05/2026", lastLogin: "—" },
  { id: 7, name: "Trường Nguyên",   email: "truong2@remak.vn",  roles: ["sales","cs"],       status: "active",   joined: "08/05/2026", lastLogin: "06/06/2026" },
];

const SORT_FIELDS = ["name","email","roles","status","joined","lastLogin"];

const UserManagement = () => {
  const [tab, setTab]           = useState("users"); // "users" | "roles" | "matrix"
  const [search, setSearch]     = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir]   = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [users, setUsers]       = useState(USERS_INIT);
  const [newUser, setNewUser]   = useState({ name: "", email: "", roles: ["sales"] });
  // Matrix filters
  const [matrixModule, setMatrixModule] = useState("all");
  const [matrixHighlight, setMatrixHighlight] = useState(null);

  // ── Sorting
  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span style={{ color: T.border, marginLeft: 3 }}>↕</span>;
    return <span style={{ color: T.green, marginLeft: 3 }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  // ── Filtering + sorting pipeline
  const processed = users
    .filter(u => {
      const q = search.toLowerCase();
      const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole = filterRole === "all" || u.roles.includes(filterRole);
      const matchStatus = filterStatus === "all" || u.status === filterStatus;
      return matchQ && matchRole && matchStatus;
    })
    .sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (sortField === "roles") { va = a.roles.join(","); vb = b.roles.join(","); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const createUser = () => {
    if (newUser.name && newUser.email && newUser.roles.length > 0) {
      setUsers([...users, { ...newUser, id: Date.now(), status: "active", joined: new Date().toLocaleDateString("vi-VN"), lastLogin: "—" }]);
      setShowModal(false);
      setNewUser({ name: "", email: "", roles: ["sales"] });
    }
  };

  const saveEdit = () => {
    setUsers(users.map(u => u.id === editUser.id ? editUser : u));
    setEditUser(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setDeleteConfirm(null);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  // Avatar bg from primary role
  const avatarBg = (roles) => ROLE_META[roles[0]]?.color || T.green;

  // Permission union preview
  const unionDesc = (roles) => {
    if (!roles || roles.length === 0) return "—";
    if (roles.includes("admin")) return "Full toàn bộ hệ thống";
    const labels = roles.map(r => ROLE_META[r]?.label).filter(Boolean);
    return labels.join(" + ") + " (Union permissions)";
  };

  // Matrix: unique modules
  const modules = ["all", ...Array.from(new Set(PERM_MATRIX.map(r => r.module)))];
  const matrixRows = matrixModule === "all" ? PERM_MATRIX : PERM_MATRIX.filter(r => r.module === matrixModule);
  // group by module for display
  const matrixGrouped = matrixRows.reduce((acc, row) => {
    if (!acc[row.module]) acc[row.module] = [];
    acc[row.module].push(row);
    return acc;
  }, {});

  // ── Tab header
  const TabBtn = ({ id, label, icon }) => (
    <button onClick={() => setTab(id)} style={{
      border: "none", cursor: "pointer", fontWeight: tab === id ? 700 : 500,
      fontSize: 13, padding: "10px 18px", borderBottom: tab === id ? `2.5px solid ${T.green}` : "2.5px solid transparent",
      background: "transparent", color: tab === id ? T.green : T.textMid,
      transition: "all .15s", display: "flex", alignItems: "center", gap: 6,
    }}>{icon} {label}</button>
  );

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14 }}>
        <StatCard label="Tổng người dùng" value={users.length} color={T.text} />
        <StatCard label="Đang hoạt động" value={users.filter(u => u.status === "active").length} color={T.green} />
        <StatCard label="Multi-role" value={users.filter(u => u.roles.length > 1).length} color="#5B21B6" sub="Users có ≥2 roles" />
        <StatCard label="Bị khóa" value={users.filter(u => u.status === "inactive").length} color={T.orange} />
      </div>

      <Card>
        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${T.border}`, display: "flex", padding: "0 20px" }}>
          <TabBtn id="users"  icon="👤" label="Danh sách người dùng" />
          <TabBtn id="roles"  icon="🏷️" label="Mô tả Vai trò" />
          <TabBtn id="matrix" icon="🔐" label="Permission Matrix" />
        </div>

        {/* ══ TAB 1: USER LIST ══ */}
        {tab === "users" && (
          <>
            {/* Toolbar */}
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Input placeholder="Tìm theo tên, email..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width: 240 }} />
              <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 10px", fontSize: 12, color: T.text, background: T.card }}>
                <option value="all">Tất cả vai trò</option>
                {Object.entries(ROLE_META).filter(([r]) => r !== "ncc").map(([r, m]) => <option key={r} value={r}>{m.icon} {m.label}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 10px", fontSize: 12, color: T.text, background: T.card }}>
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Bị khóa</option>
              </select>
              <div style={{ marginLeft: "auto" }}>
                <Btn variant="primary" onClick={() => setShowModal(true)}>+ Thêm người dùng</Btn>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 780 }}>
                <thead>
                  <tr style={{ background: T.bg }}>
                    {[
                      { key: "name", label: "Người dùng" },
                      { key: "email", label: "Email" },
                      { key: "roles", label: "Vai trò (Roles)" },
                      { key: "status", label: "Trạng thái" },
                      { key: "joined", label: "Ngày tham gia" },
                      { key: "lastLogin", label: "Đăng nhập gần nhất" },
                    ].map(col => (
                      <th key={col.key} onClick={() => toggleSort(col.key)} style={{
                        padding: "10px 18px", textAlign: "left", cursor: "pointer",
                        fontSize: 10, fontWeight: 700, color: T.textLight,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        userSelect: "none", whiteSpace: "nowrap",
                        background: sortField === col.key ? "#EEF4E8" : "transparent",
                      }}>
                        {col.label}<SortIcon field={col.key} />
                      </th>
                    ))}
                    <th style={{ padding: "10px 18px", fontSize: 10, fontWeight: 700, color: T.textLight, letterSpacing: "0.06em", textTransform: "uppercase" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {processed.map((u, i) => (
                    <tr key={u.id} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.card : "rgba(244,246,243,.4)" }}>
                      <td style={{ padding: "11px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <Avatar name={u.name} size={30} bg={avatarBg(u.roles)} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "11px 18px", fontSize: 12, color: T.textMid }}>{u.email}</td>
                      <td style={{ padding: "11px 18px" }}>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {u.roles.map(r => {
                            const m = ROLE_META[r];
                            return m ? (
                              <span key={r} style={{
                                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                                background: m.bg, color: m.color, border: `1px solid ${m.border}`,
                                display: "flex", alignItems: "center", gap: 3,
                              }}>{m.icon} {m.label}</span>
                            ) : null;
                          })}
                          {u.roles.length > 1 && (
                            <span style={{ fontSize: 9, background: "#F0EDFF", color: "#5B21B6", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>UNION</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "11px 18px" }}><Badge status={u.status} /></td>
                      <td style={{ padding: "11px 18px", fontSize: 11, color: T.textMid }}>{u.joined}</td>
                      <td style={{ padding: "11px 18px", fontSize: 11, color: T.textMid }}>{u.lastLogin}</td>
                      <td style={{ padding: "11px 18px" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          <Btn variant="secondary" size="sm" onClick={() => setEditUser({...u})}>✏️</Btn>
                          <Btn variant="secondary" size="sm" onClick={() => toggleStatus(u.id)} title={u.status === "active" ? "Khóa tài khoản" : "Mở khóa"}>
                            {u.status === "active" ? "🔒" : "✅"}
                          </Btn>
                          <Btn variant="ghost" size="sm" title="Force logout">↩</Btn>
                          <Btn variant="danger" size="sm" onClick={() => setDeleteConfirm(u)} title="Xóa người dùng">🗑️</Btn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "10px 20px", fontSize: 11, color: T.textLight, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Hiển thị <b>{processed.length}</b>/{users.length} người dùng · Sắp xếp theo: <b>{sortField}</b> {sortDir === "asc" ? "↑" : "↓"}</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3].map(p => <Btn key={p} variant={p===1?"primary":"secondary"} size="sm">{p}</Btn>)}
              </div>
            </div>
          </>
        )}

        {/* ══ TAB 2: ROLE DESCRIPTIONS ══ */}
        {tab === "roles" && (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 13, color: T.textMid, marginBottom: 4 }}>
              Từ v3.0, hệ thống hỗ trợ <b>Multi-Role</b> — Admin có thể gán 1 đến N roles cho một user. Quyền được hợp nhất theo nguyên tắc <b>UNION</b> (quyền cao nhất thắng).
            </div>

            {/* Union rules callout */}
            <div style={{ background: "#F0EDFF", border: "1px solid #C4B5FD", borderRadius: 10, padding: 14, display: "flex", gap: 10 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <div style={{ fontWeight: 700, color: "#5B21B6", fontSize: 13, marginBottom: 4 }}>Nguyên tắc Union Permission</div>
                <div style={{ fontSize: 12, color: "#6B21A8", lineHeight: 1.6 }}>
                  Thứ tự ưu tiên: <b>Full &gt; Own &gt; Read &gt; —</b><br/>
                  Admin role là <b>superset</b> — nếu user có Admin, mọi quyền khác đều là Full.<br/>
                  Không có "deny override": không role nào rút quyền đã grant bởi role khác.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {ROLE_DESCRIPTIONS.map(rd => (
                <div key={rd.role} style={{
                  background: rd.bg, border: `1.5px solid`,
                  borderColor: ROLE_META[rd.role]?.border || T.border,
                  borderRadius: 10, padding: 18,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{rd.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: rd.color }}>{rd.label}</div>
                      <div style={{ fontSize: 10, color: rd.color, opacity: 0.8, fontWeight: 600 }}>{rd.scope}</div>
                    </div>
                    {rd.role === "ncc" && (
                      <span style={{ marginLeft: "auto", fontSize: 9, background: "#0E7490", color: "#fff", padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>SUPPLIER PORTAL</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: rd.color, lineHeight: 1.5, marginBottom: 10 }}>{rd.summary}</p>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: rd.color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Modules có quyền truy cập</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {rd.modules.map(m => (
                        <span key={m} style={{ fontSize: 10, background: "rgba(255,255,255,.7)", color: rd.color, border: `1px solid ${rd.color}33`, padding: "2px 7px", borderRadius: 4 }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.red, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>⚠ Giới hạn quan trọng</div>
                    {rd.limits.map((l, i) => (
                      <div key={i} style={{ fontSize: 11, color: T.textMid, display: "flex", gap: 5, marginBottom: 2 }}>
                        <span style={{ color: T.red, fontWeight: 700 }}>✕</span> {l}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TAB 3: PERMISSION MATRIX ══ */}
        {tab === "matrix" && (
          <div style={{ padding: 0 }}>
            {/* Matrix toolbar */}
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.textMid }}>Lọc module:</span>
              <select value={matrixModule} onChange={e => setMatrixModule(e.target.value)} style={{ border: `1px solid ${T.border}`, borderRadius: 7, padding: "6px 10px", fontSize: 12, color: T.text, background: T.card }}>
                {modules.map(m => <option key={m} value={m}>{m === "all" ? "Tất cả modules" : m}</option>)}
              </select>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.textMid, marginLeft: 8 }}>Highlight role:</span>
              <div style={{ display: "flex", gap: 5 }}>
                <Btn variant={matrixHighlight === null ? "primary" : "secondary"} size="sm" onClick={() => setMatrixHighlight(null)}>Tất cả</Btn>
                {Object.entries(ROLE_META).map(([r, m]) => (
                  <Btn key={r} variant={matrixHighlight === r ? "primary" : "secondary"} size="sm" onClick={() => setMatrixHighlight(matrixHighlight === r ? null : r)}>{m.icon} {m.label}</Btn>
                ))}
              </div>
              <span style={{ marginLeft: "auto", fontSize: 11, color: T.textLight }}>{matrixRows.length} / {PERM_MATRIX.length} chức năng</span>
            </div>

            {/* Legend */}
            <div style={{ padding: "8px 20px", background: T.bg, borderBottom: `1px solid ${T.border}`, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.textLight, letterSpacing: "0.06em" }}>CHÚ GIẢI:</span>
              {[["Full","Toàn quyền","#DCFCE7","#166534"],["Own","Bản ghi của mình","#EFF6FF","#1D4ED8"],["Read","Chỉ đọc","#FEF9C3","#854D0E"],["—","Không có quyền","#F4F6F3","#8A9585"]].map(([l,d,bg,c]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                  <span style={{ background: bg, color: c, padding: "1px 7px", borderRadius: 4, fontWeight: 700, fontSize: 10 }}>{l}</span>
                  <span style={{ color: T.textLight }}>{d}</span>
                </div>
              ))}
            </div>

            {/* Matrix table */}
            <div style={{ overflowX: "auto", maxHeight: 520, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <tr style={{ background: T.sidebar }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: "0.07em", minWidth: 260 }}>CHỨC NĂNG</th>
                    <th style={{ padding: "10px 8px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: "0.07em", minWidth: 56 }}>FN REF</th>
                    {Object.entries(ROLE_META).map(([r, m]) => (
                      <th key={r} style={{
                        padding: "10px 12px", fontSize: 11, fontWeight: 700, textAlign: "center", minWidth: 74,
                        color: matrixHighlight === r ? m.color : "rgba(255,255,255,.6)",
                        background: matrixHighlight === r ? m.bg : "transparent",
                      }}>
                        {m.icon}<br/><span style={{ fontSize: 9, letterSpacing: "0.06em" }}>{m.label.toUpperCase()}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(matrixGrouped).map(([mod, rows]) => (
                    <>
                      <tr key={"mod-" + mod} style={{ background: "#F0F4EC" }}>
                        <td colSpan={7} style={{ padding: "6px 16px", fontSize: 10, fontWeight: 800, color: T.greenDark, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                          {mod}
                        </td>
                      </tr>
                      {rows.map((row, i) => (
                        <tr key={row.fn} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.card : "rgba(244,246,243,.35)" }}>
                          <td style={{ padding: "8px 16px" }}>
                            <div style={{ fontSize: 12, color: T.text }}>{row.fn}</div>
                            {row.note && <div style={{ fontSize: 10, color: T.textLight, marginTop: 1 }}>ℹ {row.note}</div>}
                          </td>
                          <td style={{ padding: "8px 8px", fontSize: 10, color: T.textLight, fontFamily: "monospace" }}>{row.ref}</td>
                          {["admin","sales","trainer","cs","ncc"].map(r => (
                            <td key={r} style={{
                              padding: "8px 12px", textAlign: "center",
                              background: matrixHighlight === r ? ROLE_META[r].bg + "66" : "transparent",
                            }}>
                              <PermBadge level={row[r]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      {/* ── CREATE MODAL ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <Card style={{ width: 480, padding: 28, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 18 }}>Thêm người dùng mới</div>
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
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 8 }}>Vai trò * <span style={{ fontSize: 10, color: T.textLight }}>(có thể chọn nhiều)</span></label>
                <RoleCheckboxes selected={newUser.roles} onChange={roles => setNewUser({...newUser, roles})} />
                {newUser.roles.length === 0 && <div style={{ fontSize: 11, color: T.red, marginTop: 4 }}>⚠ Chọn ít nhất 1 vai trò</div>}
              </div>
              {/* Union preview */}
              {newUser.roles.length > 0 && (
                <div style={{ background: newUser.roles.length > 1 ? "#F0EDFF" : T.bg, borderRadius: 8, padding: 12, border: `1px solid ${newUser.roles.length > 1 ? "#C4B5FD" : T.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: newUser.roles.length > 1 ? "#5B21B6" : T.textMid, marginBottom: 6 }}>
                    {newUser.roles.length > 1 ? "⚡ Union Permission Preview" : "Quyền truy cập:"}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMid }}>{unionDesc(newUser.roles)}</div>
                  {newUser.roles.map(r => ROLE_META[r] && (
                    <div key={r} style={{ fontSize: 11, color: ROLE_META[r].color, marginTop: 3 }}>
                      {ROLE_META[r].icon} <b>{ROLE_META[r].label}:</b> {ROLE_META[r].desc}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setShowModal(false)}>Hủy</Btn>
              <Btn variant="primary" onClick={createUser} disabled={!newUser.name || !newUser.email || newUser.roles.length === 0}>Tạo tài khoản</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <Card style={{ width: 420, padding: 28 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.redLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🗑️</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 4 }}>Xóa người dùng?</div>
                <div style={{ fontSize: 13, color: T.textMid }}>Bạn sắp xóa tài khoản <b>{deleteConfirm.name}</b> ({deleteConfirm.email}). Hành động này không thể hoàn tác.</div>
              </div>
            </div>
            <div style={{ background: T.redLight, border: `1px solid #FECACA`, borderRadius: 8, padding: "10px 14px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: T.red, fontWeight: 600, marginBottom: 4 }}>⚠️ Lưu ý trước khi xóa:</div>
              <div style={{ fontSize: 11, color: T.red, lineHeight: 1.6 }}>
                • Tất cả session của user này sẽ bị thu hồi ngay lập tức<br/>
                • Dữ liệu liên quan (hội thoại, báo giá) vẫn được giữ lại<br/>
                • Không thể xóa tài khoản Admin cuối cùng trong hệ thống
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setDeleteConfirm(null)}>Hủy bỏ</Btn>
              <Btn variant="danger" onClick={() => deleteUser(deleteConfirm.id)}>🗑️ Xác nhận xóa</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <Card style={{ width: 480, padding: 28, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 4 }}>Chỉnh sửa người dùng</div>
            <div style={{ fontSize: 12, color: T.textLight, marginBottom: 18 }}>{editUser.email}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>Họ và tên</label>
                <Input value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 8 }}>Vai trò <span style={{ fontSize: 10, color: T.textLight }}>(có thể gán nhiều roles — Union Permission)</span></label>
                <RoleCheckboxes selected={editUser.roles} onChange={roles => setEditUser({...editUser, roles})} />
                {editUser.roles.length > 1 && (
                  <div style={{ marginTop: 8, fontSize: 11, background: "#F0EDFF", color: "#5B21B6", padding: "6px 10px", borderRadius: 6 }}>
                    ⚡ Multi-role: Session sẽ bị invalidate sau khi lưu. User cần đăng nhập lại để nhận permissions mới.
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setEditUser(null)}>Hủy</Btn>
              <Btn variant="primary" onClick={saveEdit}>Lưu thay đổi</Btn>
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

// ─── PAGE: PRODUCT IMPORT ──────────────────────────────────────────────────────
const PRODUCTS_INIT = [
  { id:1, sku:"RMK-SW-50",  name:"Bông đá Stonewool 50mm",      cat:"Cách nhiệt bảo ôn", price:45000, priceDisp:"45,000", unit:"m²", nrc:"0.70", stc:"28", status:"active",   isActive: true  },
  { id:2, sku:"RMK-AR-20",  name:"Túi khí AirReflex 20mm",      cat:"Cách nhiệt bảo ôn", price:28000, priceDisp:"28,000", unit:"m²", nrc:"—",    stc:"—",  status:"active",   isActive: true  },
  { id:3, sku:"RMK-MT-30",  name:"Mút trứng tiêu âm 30mm",      cat:"Cách âm tiêu âm",   price:52000, priceDisp:"52,000", unit:"m²", nrc:"0.85", stc:"—",  status:"active",   isActive: true  },
  { id:4, sku:"RMK-FP-B1",  name:"Tấm chống cháy cấp B1",       cat:"Chống cháy",         price:120000,priceDisp:"120,000",unit:"m²", nrc:"—",    stc:"42", status:"active",   isActive: true  },
  { id:5, sku:"RMK-GL-100", name:"Bông thủy tinh 100mm",        cat:"Bảo ôn lạnh",        price:38000, priceDisp:"38,000", unit:"m²", nrc:"0.65", stc:"—",  status:"inactive", isActive: false },
];

const IMPORT_PREVIEW_ROWS = [
  { row:1,  sku:"RMK-SW-60",  name:"Bông đá Stonewool 60mm",   cat:"Cách nhiệt bảo ôn", price:"55,000", unit:"m²",  nrc:"0.75", stc:"30", err: null },
  { row:2,  sku:"RMK-AF-40",  name:"AirReflex 40mm",            cat:"Cách nhiệt bảo ôn", price:"38,000", unit:"m²",  nrc:"—",    stc:"—",  err: null },
  { row:3,  sku:"RMK-AC-25",  name:"Acoustic Panel 25mm",       cat:"Cách âm tiêu âm",   price:"68,000", unit:"m²",  nrc:"0.90", stc:"35", err: null },
  { row:4,  sku:"RMK-FP-B2",  name:"Tấm chống cháy B2",         cat:"Chống cháy",         price:"95,000", unit:"m²",  nrc:"—",    stc:"38", err: null },
  { row:5,  sku:"RMK-SW-50",  name:"Bông đá Stonewool 50mm",   cat:"Cách nhiệt bảo ôn", price:"45,000", unit:"m²",  nrc:"0.70", stc:"28", err: "SKU đã tồn tại" },
  { row:6,  sku:"RMK-GL-80",  name:"Bông thủy tinh 80mm",      cat:"Bảo ôn lạnh",        price:"32,000", unit:"m²",  nrc:"0.60", stc:"—",  err: null },
  { row:7,  sku:"",           name:"Sản phẩm thiếu SKU",        cat:"",                   price:"-500",   unit:"",    nrc:"",     stc:"",   err: "SKU trống; giá âm" },
  { row:8,  sku:"RMK-MT-40",  name:"Mút trứng 40mm",            cat:"Cách âm tiêu âm",   price:"62,000", unit:"m²",  nrc:"0.88", stc:"—",  err: null },
];
const COL_HEADERS = ["Mã SP","Tên sản phẩm","Danh mục","Đơn giá (VND)","Đơn vị","NRC","STC"];
const FIELD_OPTS  = ["sku","name","category","price","unit","nrc","stc"];
const SAVED_MAPPINGS = ["Remak Standard CSV","Bảng giá 2024 Q2"];

const ProductImport = () => {
  const [step, setStep]           = useState(0);
  const [products, setProducts]   = useState(PRODUCTS_INIT);
  const [search, setSearch]       = useState("");
  const [progress, setProgress]   = useState(0);
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [mapping, setMapping]     = useState({ "Mã SP":"sku","Tên sản phẩm":"name","Đơn giá (VND)":"price","Đơn vị":"unit","Danh mục":"category","NRC":"nrc","STC":"stc" });
  const [mappingName, setMappingName] = useState("");
  const [savedMappings, setSavedMappings] = useState(SAVED_MAPPINGS);
  const [upsertMode, setUpsertMode] = useState("update"); // "update"|"skip"|"cancel"
  const [showUpsertDialog, setShowUpsertDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast]         = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const validRows   = IMPORT_PREVIEW_ROWS.filter(r => !r.err);
  const errorRows   = IMPORT_PREVIEW_ROWS.filter(r => r.err);

  const startImport = () => {
    // Check for duplicates
    const hasDupes = IMPORT_PREVIEW_ROWS.some(r => products.some(p => p.sku === r.sku));
    if (hasDupes && !importDone) { setShowUpsertDialog(true); return; }
    runImport();
  };

  const runImport = () => {
    setShowUpsertDialog(false);
    setImporting(true);
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.floor(Math.random() * 10) + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setProgress(100);
        setImporting(false);
        setImportDone(true);
        setStep(3);
        // Add new rows (non-error, not duplicate or update mode)
        const toAdd = validRows
          .filter(r => r.err === null)
          .filter(r => upsertMode === "skip" ? !products.some(p2 => p2.sku === r.sku) : true)
          .map((r, i) => ({
            id: Date.now() + i, sku: r.sku, name: r.name, cat: r.cat,
            price: parseInt(r.price.replace(/,/g,"")), priceDisp: r.price,
            unit: r.unit, nrc: r.nrc, stc: r.stc, status: "active", isActive: true,
          }));
        if (upsertMode === "update") {
          setProducts(prev => {
            const updated = [...prev];
            toAdd.forEach(newP => {
              const idx = updated.findIndex(u => u.sku === newP.sku);
              if (idx >= 0) updated[idx] = { ...updated[idx], ...newP };
              else updated.push(newP);
            });
            return updated;
          });
        } else {
          setProducts(prev => [...prev, ...toAdd]);
        }
        showToast(`✅ Import thành công ${validRows.length}/${IMPORT_PREVIEW_ROWS.length} sản phẩm · ${errorRows.length} lỗi bỏ qua`);
      } else {
        setProgress(p);
      }
    }, 160);
  };

  const saveMapping = () => {
    if (mappingName && !savedMappings.includes(mappingName)) {
      setSavedMappings([...savedMappings, mappingName]);
      showToast(`Đã lưu mapping "${mappingName}"`);
      setMappingName("");
    }
  };

  const softDeleteProduct = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, isActive: false, status: "inactive" } : p));
    showToast("Sản phẩm đã bị vô hiệu hóa (soft delete)", "info");
    setDeleteConfirm(null);
  };

  const saveEditProduct = () => {
    setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
    showToast("Đã cập nhật sản phẩm");
    setEditProduct(null);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>

      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 24, zIndex: 2000,
          background: toast.type === "success" ? T.green : toast.type === "error" ? T.orange : T.blue,
          color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,.2)", maxWidth: 380,
        }}>{toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : "ℹ️"} {toast.msg}</div>
      )}

      {/* Stepper */}
      <Card style={{ padding: "14px 22px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[{num:1,label:"Tải file lên"},{num:2,label:"Cấu hình Mapping"},{num:3,label:"Preview & Import"},{num:4,label:"Hoàn tất"}].map((s, i) => {
            const done = step > i; const cur = step === i;
            return (
              <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: done ? T.green : cur ? T.green : T.border,
                    color: done||cur ? "#fff" : T.textLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, cursor: done ? "pointer" : "default",
                  }} onClick={() => done && setStep(i)}>{done?"✓":s.num}</div>
                  <span style={{ fontSize: 10, color: cur?T.green:done?T.greenDark:T.textLight, fontWeight: cur?700:400, textAlign:"center" }}>{s.label}</span>
                </div>
                {i<3 && <div style={{ height:2, flex:1, background: done?T.green:T.border, marginBottom:18, marginTop:-8 }} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 18 }}>
        {/* Left panel: changes by step */}
        <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* STEP 0: Upload */}
          {step === 0 && (
            <Card style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 12 }}>📥 Upload file sản phẩm</div>
              <div onClick={() => setStep(1)} style={{
                border: `2px dashed ${T.border}`, background: T.bg, borderRadius: 10,
                padding: "24px 14px", textAlign: "center", cursor: "pointer",
                transition: "all .2s",
              }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>📊</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 4 }}>Kéo thả hoặc nhấn để chọn file</div>
                <div style={{ fontSize: 10, color: T.textLight, marginBottom: 12 }}>CSV, XLSX · UTF-8 · Tối đa 10MB</div>
                <Btn variant="primary" size="sm">📁 Chọn file demo: products_2024.xlsx</Btn>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMid, marginBottom: 6 }}>Mapping đã lưu:</div>
                {savedMappings.map(m => (
                  <div key={m} style={{ padding:"6px 10px", background: T.bg, borderRadius:5, fontSize:11, color:T.textMid, marginBottom:4, display:"flex", justifyContent:"space-between", border:`1px solid ${T.border}` }}>
                    <span>📋 {m}</span>
                    <Btn variant="ghost" size="sm" onClick={() => { setStep(1); showToast(`Đã tải mapping "${m}"`); }}>Dùng</Btn>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* STEP 1: Mapping */}
          {step === 1 && (
            <Card style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 3 }}>⚙️ Cấu hình Mapping cột</div>
              <div style={{ fontSize: 10, color: T.textLight, marginBottom: 12 }}>products_2024.xlsx · {IMPORT_PREVIEW_ROWS.length} dòng phát hiện</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {COL_HEADERS.map(h => (
                  <div key={h} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: T.textMid, minWidth: 110, fontWeight: 600 }}>"{h}"</span>
                    <select value={mapping[h]||""} onChange={e => setMapping({...mapping,[h]:e.target.value})}
                      style={{ flex:1, border:`1px solid ${T.border}`, borderRadius:5, padding:"5px 8px", fontSize:11 }}>
                      <option value="">— Bỏ qua —</option>
                      {FIELD_OPTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    {mapping[h] && <span style={{ color: T.green, fontSize: 14 }}>✓</span>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                <Input placeholder="Lưu mapping này..." value={mappingName} onChange={e => setMappingName(e.target.value)} style={{ flex:1 }} />
                <Btn variant="secondary" size="sm" onClick={saveMapping}>💾</Btn>
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: T.textLight }}>
                {Object.values(mapping).filter(Boolean).length}/{COL_HEADERS.length} cột được ánh xạ
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Btn variant="secondary" size="sm" onClick={() => setStep(0)}>← Quay lại</Btn>
                <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} onClick={() => setStep(2)}>Xem Preview →</Btn>
              </div>
            </Card>
          )}

          {/* STEP 2: Preview + Import */}
          {step === 2 && (
            <Card style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 12 }}>▶ Bắt đầu Import</div>
              <div style={{ background: T.bg, borderRadius: 7, padding: "10px 12px", marginBottom: 12, fontSize: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: T.textMid, marginBottom: 3 }}>
                  <span>Tổng dòng</span><b>{IMPORT_PREVIEW_ROWS.length}</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: T.green, marginBottom: 3 }}>
                  <span>Hợp lệ</span><b>{validRows.length}</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: T.red }}>
                  <span>Lỗi</span><b>{errorRows.length}</b>
                </div>
              </div>
              {importing && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: T.textMid, marginBottom: 4 }}>
                    Đang import {Math.round(progress * validRows.length / 100)}/{validRows.length} sản phẩm...
                  </div>
                  <div style={{ height:6, background: T.border, borderRadius:3 }}>
                    <div style={{ width:`${progress}%`, height:"100%", background: T.green, borderRadius:3, transition:"width .15s" }} />
                  </div>
                </div>
              )}
              {importDone && (
                <div style={{ marginBottom: 12, padding: "8px 10px", background: T.greenLight, borderRadius:6, fontSize:12, color: T.greenDark, fontWeight:600 }}>
                  ✅ Import xong {validRows.length} sản phẩm
                </div>
              )}
              {errorRows.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <Btn variant="secondary" size="sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => setShowErrors(!showErrors)}>
                    ⚠️ {errorRows.length} lỗi — {showErrors ? "Ẩn" : "Xem"}
                  </Btn>
                  {showErrors && errorRows.map(r => (
                    <div key={r.row} style={{ fontSize:10, color: T.red, padding:"3px 6px", marginTop:3, background: T.redLight, borderRadius:4 }}>
                      Dòng {r.row}: {r.err}
                    </div>
                  ))}
                  <Btn variant="secondary" size="sm" style={{ width:"100%", justifyContent:"center", marginTop:6 }}>📥 Tải báo cáo lỗi</Btn>
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="secondary" size="sm" onClick={() => setStep(1)}>← Mapping</Btn>
                <Btn variant="primary" style={{ flex:1, justifyContent:"center" }} onClick={startImport} disabled={importing}>
                  {importing ? "⏳ Đang import..." : importDone ? "🔄 Import lại" : "▶ Import ngay"}
                </Btn>
              </div>
            </Card>
          )}

          {/* STEP 3: Done */}
          {step === 3 && (
            <Card style={{ padding: 18 }}>
              <div style={{ textAlign:"center", padding:"12px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: T.green, marginBottom: 4 }}>Import hoàn tất!</div>
                <div style={{ fontSize: 12, color: T.textMid, marginBottom: 14 }}>
                  <b>{validRows.length}</b> sản phẩm được thêm/cập nhật<br/>
                  <b>{errorRows.length}</b> dòng lỗi bỏ qua
                </div>
                <Btn variant="secondary" size="sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => { setStep(0); setImportDone(false); setProgress(0); setImporting(false); }}>
                  ↩ Import file mới
                </Btn>
              </div>
            </Card>
          )}
        </div>

        {/* Product table */}
        <Card style={{ flex:1, overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ flex:1, fontWeight:700, fontSize:13, color:T.text }}>
              📦 Danh sách sản phẩm <span style={{ fontSize:11, fontWeight:400, color:T.textLight }}>({products.filter(p=>p.isActive).length} active / {products.length} tổng)</span>
            </div>
            <Input placeholder="Tìm SKU, tên sản phẩm..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ width:200 }} />
          </div>

          {/* Preview banner */}
          {step === 2 && (
            <div style={{ padding:"7px 18px", background: T.yellowLight, borderBottom:`1px solid ${T.border}`, fontSize:11, color:"#92400E", display:"flex", gap:10, alignItems:"center" }}>
              <span>👁 Preview: {IMPORT_PREVIEW_ROWS.length} dòng · Mapping: {Object.values(mapping).filter(Boolean).length} cột · <b style={{color:T.red}}>{errorRows.length} lỗi</b></span>
              <Btn variant="secondary" size="sm" onClick={() => setShowErrors(!showErrors)}>Chi tiết lỗi</Btn>
            </div>
          )}

          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:640 }}>
              <thead>
                <tr style={{ background: T.bg }}>
                  {["SKU","Tên sản phẩm","Danh mục","Giá niêm yết","NRC","STC","Trạng thái",""].map(h => (
                    <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:"0.05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Preview rows (step 2) shown at top */}
                {step === 2 && IMPORT_PREVIEW_ROWS.slice(0,5).map((r, i) => (
                  <tr key={"prev-"+i} style={{ borderTop:`1px solid ${T.border}`, background: r.err ? "#FEF2F2" : "#F0FDF4" }}>
                    <td style={{ padding:"8px 14px" }}>
                      <span style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color: r.err?T.red:T.blue, background: r.err?T.redLight:T.blueLight, padding:"2px 6px", borderRadius:3 }}>
                        {r.sku || "(trống)"}
                      </span>
                    </td>
                    <td style={{ padding:"8px 14px", fontSize:12, color: r.err?T.red:T.text }}>{r.name}</td>
                    <td style={{ padding:"8px 14px", fontSize:11, color:T.textMid }}>{r.cat}</td>
                    <td style={{ padding:"8px 14px", fontSize:12, color:T.text }}>{r.price} VND/m²</td>
                    <td style={{ padding:"8px 14px", fontSize:11, color:T.textMid }}>{r.nrc}</td>
                    <td style={{ padding:"8px 14px", fontSize:11, color:T.textMid }}>{r.stc}</td>
                    <td style={{ padding:"8px 14px" }}>
                      {r.err
                        ? <span style={{ fontSize:10, fontWeight:700, background:T.redLight, color:T.red, padding:"2px 7px", borderRadius:4 }}>LỖIII</span>
                        : <span style={{ fontSize:10, fontWeight:700, background:"#F0FDF4", color:T.green, padding:"2px 7px", borderRadius:4 }}>MỚI</span>
                      }
                    </td>
                    <td style={{ padding:"8px 14px" }}>
                      {r.err && <span style={{ fontSize:10, color:T.red }}>⚠ {r.err}</span>}
                    </td>
                  </tr>
                ))}

                {/* Existing products */}
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop:`1px solid ${T.border}`, background: !p.isActive ? "#FEF2F2" : i%2===0 ? T.card : "rgba(244,246,243,.4)", opacity: p.isActive ? 1 : 0.65 }}>
                    <td style={{ padding:"9px 14px" }}>
                      <span style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color:p.isActive?T.blue:T.textLight, background:p.isActive?T.blueLight:T.bg, padding:"2px 6px", borderRadius:3 }}>{p.sku}</span>
                    </td>
                    <td style={{ padding:"9px 14px", fontSize:12, fontWeight:600, color: p.isActive?T.text:T.textLight }}>
                      {p.name}
                      {!p.isActive && <span style={{ marginLeft:6, fontSize:9, color:T.red }}>(vô hiệu)</span>}
                    </td>
                    <td style={{ padding:"9px 14px", fontSize:11, color:T.textMid }}>{p.cat}</td>
                    <td style={{ padding:"9px 14px", fontSize:12, fontWeight:700, color:T.text }}>{p.priceDisp} VND/m²</td>
                    <td style={{ padding:"9px 14px", fontSize:11, color:T.textMid }}>{p.nrc}</td>
                    <td style={{ padding:"9px 14px", fontSize:11, color:T.textMid }}>{p.stc}</td>
                    <td style={{ padding:"9px 14px" }}><Badge status={p.status} /></td>
                    <td style={{ padding:"9px 14px" }}>
                      <div style={{ display:"flex", gap:4 }}>
                        <Btn variant="secondary" size="sm" onClick={() => setEditProduct({...p})}>✏️</Btn>
                        <Btn variant="danger" size="sm" onClick={() => setDeleteConfirm(p)} title="Soft delete">🗑️</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Upsert Dialog */}
      {showUpsertDialog && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <Card style={{ width:420, padding:24 }}>
            <div style={{ fontWeight:800, fontSize:15, color:T.text, marginBottom:8 }}>⚠️ Phát hiện SKU trùng lặp</div>
            <div style={{ fontSize:13, color:T.textMid, marginBottom:16 }}>
              Tìm thấy <b>{IMPORT_PREVIEW_ROWS.filter(r => products.some(p => p.sku === r.sku)).length} SKU đã tồn tại</b>. Bạn muốn:
            </div>
            {[
              ["update","Cập nhật giá & thông tin (overwrite)","Dữ liệu mới sẽ ghi đè dữ liệu cũ"],
              ["skip","Bỏ qua SKU trùng, chỉ thêm mới","Giữ nguyên dữ liệu SKU đã có"],
            ].map(([val, label, sub]) => (
              <label key={val} style={{ display:"flex", gap:10, padding:"10px 12px", borderRadius:7, border:`1.5px solid ${upsertMode===val?T.green:T.border}`, marginBottom:8, cursor:"pointer", background:upsertMode===val?T.greenLight:T.card }}>
                <input type="radio" checked={upsertMode===val} onChange={() => setUpsertMode(val)} style={{ accentColor:T.green, marginTop:2 }} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{label}</div>
                  <div style={{ fontSize:11, color:T.textMid }}>{sub}</div>
                </div>
              </label>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:14, justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={() => setShowUpsertDialog(false)}>Hủy</Btn>
              <Btn variant="primary" onClick={runImport}>Xác nhận import</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirm (soft delete) */}
      {deleteConfirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <Card style={{ width:400, padding:24 }}>
            <div style={{ fontWeight:800, fontSize:15, color:T.text, marginBottom:8 }}>🗑️ Vô hiệu hóa sản phẩm?</div>
            <div style={{ fontSize:13, color:T.textMid, marginBottom:8 }}>
              Sản phẩm <b>"{deleteConfirm.name}"</b> ({deleteConfirm.sku}) sẽ bị vô hiệu hóa (soft delete).
            </div>
            <div style={{ fontSize:12, color:T.textLight, background:T.bg, borderRadius:6, padding:"8px 12px", marginBottom:16 }}>
              ℹ️ Sản phẩm vẫn xuất hiện trong lịch sử báo giá cũ nhưng sẽ không hiển thị trong gợi ý của AI.
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={() => setDeleteConfirm(null)}>Hủy</Btn>
              <Btn variant="danger" onClick={() => softDeleteProduct(deleteConfirm.id)}>Xác nhận vô hiệu hóa</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <Card style={{ width:440, padding:24 }}>
            <div style={{ fontWeight:800, fontSize:15, color:T.text, marginBottom:16 }}>✏️ Chỉnh sửa sản phẩm</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["SKU","sku"],["Tên sản phẩm","name"],["Danh mục","cat"],["NRC","nrc"],["STC","stc"]].map(([label,field]) => (
                <div key={field}>
                  <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:4 }}>{label}</label>
                  <Input value={editProduct[field]} onChange={e => setEditProduct({...editProduct,[field]:e.target.value})} />
                </div>
              ))}
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:T.textMid, display:"block", marginBottom:4 }}>Giá (VND/m²)</label>
                <Input value={editProduct.priceDisp} onChange={e => setEditProduct({...editProduct,priceDisp:e.target.value})} />
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
              <Btn variant="secondary" onClick={() => setEditProduct(null)}>Hủy</Btn>
              <Btn variant="primary" onClick={saveEditProduct}>Lưu thay đổi</Btn>
            </div>
          </Card>
        </div>
      )}
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
