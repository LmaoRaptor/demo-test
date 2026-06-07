// ═══════════════════════════════════════════════════════════════════════
// REMAK Sale Support Chatbot – Complete JSX Demo v2.0
// Brand: #6DB02B (xanh lá) | #E8380D (cam) | #2D5016 (dark green)
// Fonts: Lexend + Be Vietnam Pro + JetBrains Mono
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard, MessageSquare, Package, FileText, BookOpen,
  Settings, Users, Bell, ChevronDown, Bot, X, Send, Paperclip,
  Search, Filter, Globe, ZapIcon, ArrowUp, UserCheck, ThumbsUp,
  ThumbsDown, Tag, CheckCircle, Clock, AlertCircle, Upload,
  File, Trash2, Edit3, Plus, ChevronRight, MoreHorizontal,
  MessageCircle, RefreshCw, Eye, Activity, TrendingUp, Zap,
  LogOut, ChevronLeft, Play, RotateCcw, GitCompare, Layers,
  Hash, BarChart2
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

// ═══════════════════════════════════════════════════════════════════════
// GOOGLE FONTS INJECTION
// ═══════════════════════════════════════════════════════════════════════
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Be Vietnam Pro', system-ui, sans-serif; background: #FAFAFA; color: #1C1C1C; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Lexend', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace !important; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      @keyframes bounce1 { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
      @keyframes bounce2 { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
      @keyframes bounce3 { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
      @keyframes toastSlide { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      .animate-slideIn { animation: slideIn 0.3s ease-out; }
      .animate-scaleIn { animation: scaleIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .animate-pulse-custom { animation: pulse 1.5s ease-in-out infinite; }
      .animate-countUp { animation: countUp 0.6s ease-out; }
      .dot1 { animation: bounce1 1.2s ease-in-out infinite; }
      .dot2 { animation: bounce2 1.2s ease-in-out 0.16s infinite; }
      .dot3 { animation: bounce3 1.2s ease-in-out 0.32s infinite; }
      .sidebar-item { transition: background 0.15s ease, color 0.15s ease; cursor: pointer; }
      .sidebar-item:hover { background: #4A7C1F; }
      .card-hover { transition: transform 0.15s ease, box-shadow 0.15s ease; }
      .card-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
      .progress-animate { animation: progressBar 2s linear forwards; }
      .toast-animate { animation: toastSlide 0.3s ease-out; }
      ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: #C5E09A; border-radius: 2px; }
      .tab-active { border-bottom: 2px solid #6DB02B; color: #4A7C1F; font-weight: 600; }
      .diff-added { background: #E8F5E9; border-left: 3px solid #4CAF50; }
      .diff-removed { background: #FFEBEE; border-left: 3px solid #F44336; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

// ═══════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════
const mockUsers = [
  { id: "u-1", name: "Nguyễn Admin", email: "admin@remak.vn", role: "admin", status: "active" },
  { id: "u-2", name: "Trần Hùng", email: "hung@remak.vn", role: "trainer", status: "active" },
  { id: "u-3", name: "Lê Thị Lan", email: "lan@remak.vn", role: "sales", status: "active" },
  { id: "u-4", name: "Phạm CS Hương", email: "huong@remak.vn", role: "cs", status: "active" },
  { id: "u-5", name: "Võ Minh Quân", email: "quan@remak.vn", role: "sales", status: "inactive" },
];

const mockDashboard = {
  todayConversations: 47, weekConversations: 312,
  handoffRate: 18.5, resolutionByAI: 81.5,
  pendingQuotes: 8, avgResponseTimeSec: 1.2, activeNow: 6,
  trend: [
    { date: "01/06", count: 38 }, { date: "02/06", count: 45 },
    { date: "03/06", count: 41 }, { date: "04/06", count: 52 },
    { date: "05/06", count: 49 }, { date: "06/06", count: 47 },
    { date: "07/06", count: 23 },
  ],
  topProducts: [
    { name: "Stonewool 50mm", count: 89 }, { name: "Stonewool 75mm", count: 67 },
    { name: "Mút trứng 30mm", count: 54 }, { name: "AirReflex", count: 43 },
    { name: "Bông khoáng", count: 38 },
  ],
  topQuestions: [
    { name: "Cách nhiệt mái tôn dày bao nhiêu?", count: 34 },
    { name: "Stonewool vs Bông khoáng khác gì?", count: 28 },
    { name: "Fire rating A1 nghĩa là gì?", count: 24 },
    { name: "NRC 0.9 có tốt không?", count: 19 },
    { name: "Tiêu âm phòng thu cần gì?", count: 17 },
  ],
};

const mockConversations = [
  {
    id: "conv-001", channel: "web_widget", status: "active",
    visitorName: "Nguyễn Văn Minh", visitorPhone: "09***456",
    lastMessage: "Tôi cần báo giá cho 500m² mái nhà xưởng",
    lastMessageAt: "5 phút trước", messageCount: 12,
    tags: ["lead-hot", "interest-stonewool"],
    assignedTo: null, quoteId: "Q-2026-001",
    intentsDetected: ["product_inquiry", "price_check"],
    createdAt: "2026-06-07T08:30:00",
  },
  {
    id: "conv-002", channel: "zalo_oa", status: "handoff",
    visitorName: "Trần Thị Lan", visitorPhone: "09***789",
    lastMessage: "Cho tôi gặp nhân viên tư vấn trực tiếp",
    lastMessageAt: "12 phút trước", messageCount: 8,
    tags: ["follow-up", "price-sensitive"],
    assignedTo: mockUsers[3],
    intentsDetected: ["human_handoff"], createdAt: "2026-06-07T09:15:00",
  },
  {
    id: "conv-003", channel: "web_widget", status: "resolved",
    visitorName: "Công ty XYZ",
    lastMessage: "Cảm ơn, tôi đã hiểu rồi",
    lastMessageAt: "1 giờ trước", messageCount: 6,
    tags: ["lead-warm", "interest-airreflex"],
    assignedTo: null,
    intentsDetected: ["product_inquiry"], createdAt: "2026-06-07T07:00:00",
  },
  {
    id: "conv-004", channel: "zalo_oa", status: "active",
    visitorName: "Kỹ sư Hải", visitorPhone: "09***321",
    lastMessage: "NRC 0.9 có đủ cho phòng thu âm không?",
    lastMessageAt: "2 phút trước", messageCount: 4,
    tags: ["lead-warm", "project-studio"],
    assignedTo: null,
    intentsDetected: ["technical_spec"], createdAt: "2026-06-07T10:05:00",
  },
];

const mockMessages = [
  {
    id: "msg-001", role: "assistant",
    content: "Xin chào! Tôi là trợ lý tư vấn của **Remak**. Tôi có thể giúp bạn tìm giải pháp cách âm, cách nhiệt và chống cháy phù hợp nhất. Bạn đang cần tư vấn về công trình nào?",
    timestamp: "08:30", agentUsed: "chat",
  },
  {
    id: "msg-002", role: "user",
    content: "Bông đá Stonewool dày bao nhiêu mm để cách nhiệt mái tôn nhà xưởng 500m²?",
    timestamp: "08:31",
  },
  {
    id: "msg-003", role: "assistant",
    content: "Để cách nhiệt mái tôn nhà xưởng hiệu quả, bạn nên sử dụng **Remak® Stonewool** với các option sau:\n\n• **50mm** – R-value: 1.25 m²K/W, phù hợp khu vực khí hậu trung bình\n• **75mm** – R-value: 1.87 m²K/W, khuyến nghị cho nhà xưởng có lò hoặc vùng nắng nóng\n\nCả hai đều đạt **Fire Rating A1** theo EN 13501-1 (không cháy).",
    timestamp: "08:31", agentUsed: "technical", confidenceScore: 0.94,
    citations: [{
      documentName: "Catalogue Stonewool 2024", pageRef: "Trang 12",
      excerpt: "Stonewool 50mm: R-value 1.25 m²K/W, Fire Rating A1, NRC 0.75",
      relevanceScore: 0.94,
    }],
    products: [
      {
        sku: "SW-50", name: "Remak® Stonewool 50mm", category: "Cách nhiệt",
        price: 85000, unit: "m²",
        specs: { "R-value": "1.25", "Fire Rating": "A1", NRC: "0.75", thickness: "50mm" },
        isRecommended: false,
      },
      {
        sku: "SW-75", name: "Remak® Stonewool 75mm", category: "Cách nhiệt",
        price: 115000, unit: "m²",
        specs: { "R-value": "1.87", "Fire Rating": "A1", NRC: "0.80", thickness: "75mm" },
        isRecommended: true,
      },
    ],
  },
  {
    id: "msg-004", role: "user",
    content: "OK, tôi cần 500m² Stonewool 75mm và khoảng 200m² mút trứng 30mm. Cho tôi báo giá.",
    timestamp: "08:35",
  },
  {
    id: "msg-005", role: "assistant",
    content: "Tôi đã tổng hợp báo giá sơ bộ cho bạn:\n\n• Stonewool 75mm × 500m²: **57,500,000 VND**\n• Mút trứng 30mm × 200m²: **9,000,000 VND**\n\nTổng cộng (chưa VAT): **66,500,000 VND**\n\nBản báo giá đã được tạo và gửi đến đội Sales để xem xét. Bạn có thể cho tôi biết tên công ty và thông tin liên hệ để hoàn thiện báo giá không?",
    timestamp: "08:36", agentUsed: "order", confidenceScore: 0.91,
  },
];

const mockQuotes = [
  {
    id: "Q-2026-001", conversationId: "conv-001", status: "draft",
    customerInfo: { name: "Công ty TNHH ABC Construction", contact: "Anh Nguyễn Văn Minh", phone: "0909123456", email: "minh@abc.com.vn", project: "Nhà xưởng Bình Dương – 500m²" },
    lineItems: [
      { id: "li-1", sku: "SW-75", productName: "Remak® Stonewool 75mm", quantity: 500, unit: "m²", unitPrice: 115000, subtotal: 57500000, note: "" },
      { id: "li-2", sku: "ME-30", productName: "Mút trứng Remak® 30mm", quantity: 200, unit: "m²", unitPrice: 45000, subtotal: 9000000, note: "" },
    ],
    subtotal: 66500000, discountPercent: 0, discountAmount: 0,
    taxPercent: 10, taxAmount: 6650000, total: 73150000, currency: "VND",
    validityDays: 30, notes: "Báo giá chưa bao gồm chi phí vận chuyển và lắp đặt",
    createdAt: "2026-06-07T09:45:00",
  },
  {
    id: "Q-2026-002", conversationId: "conv-003", status: "assigned",
    customerInfo: { name: "Công ty CP XYZ Studio", contact: "Chị Ngọc Ánh", phone: "0912987654", project: "Phòng thu âm tầng 3 – 80m²" },
    lineItems: [
      { id: "li-1", sku: "ME-30", productName: "Mút trứng Remak® 30mm", quantity: 80, unit: "m²", unitPrice: 45000, subtotal: 3600000, note: "" },
    ],
    subtotal: 3600000, discountPercent: 0, discountAmount: 0,
    taxPercent: 10, taxAmount: 360000, total: 3960000, currency: "VND",
    validityDays: 30, assignedTo: mockUsers[2], createdAt: "2026-06-07T07:30:00",
  },
];

const mockDocuments = [
  { id: "doc-001", fileName: "Catalogue_Stonewool_2024.pdf", fileType: "pdf", fileSize: 5242880, category: "Cách nhiệt", tags: ["Stonewool", "Bông đá", "Catalogue"], status: "active", version: 2, chunkCount: 147, uploadedBy: "Trần Hùng", uploadedAt: "2026-05-15T10:00:00", lastIndexedAt: "2026-05-15T10:12:00" },
  { id: "doc-002", fileName: "Bang_gia_Q2_2026.xlsx", fileType: "excel", fileSize: 524288, category: "Bảng giá", tags: ["Giá cả", "Q2 2026"], status: "active", version: 1, chunkCount: 12, uploadedBy: "Trần Hùng", uploadedAt: "2026-06-01T09:00:00", lastIndexedAt: "2026-06-01T09:03:00" },
  { id: "doc-003", fileName: "FAQ_Ky_Thuat_Cach_Am.pdf", fileType: "pdf", fileSize: 2097152, category: "Cách âm", tags: ["FAQ", "Kỹ thuật", "STC"], status: "processing", version: 1, chunkCount: undefined, uploadedBy: "Trần Hùng", uploadedAt: "2026-06-07T10:30:00" },
  { id: "doc-004", fileName: "Datasheet_AirReflex_v3.pdf", fileType: "pdf", fileSize: 1048576, category: "Cách nhiệt", tags: ["AirReflex", "Datasheet"], status: "error", version: 1, uploadedBy: "Trần Hùng", uploadedAt: "2026-06-06T14:00:00", errorMessage: "File bị mã hóa, không thể parse nội dung" },
];

const mockRoutingRules = [
  { id: "rr-1", name: "Đơn lớn → Senior Sales", conditionType: "total_value", operator: ">=", value: 100000000, assignTo: mockUsers[2], priority: 1, isActive: true },
  { id: "rr-2", name: "Đơn trung → Sales Team", conditionType: "total_value", operator: ">=", value: 10000000, assignTo: mockUsers[2], priority: 2, isActive: true },
  { id: "rr-3", name: "Chống cháy → Specialist", conditionType: "category", operator: "==", value: "Chống cháy", assignTo: mockUsers[2], priority: 3, isActive: true },
];

const mockPrompts = [
  { id: "p-1", name: "System Prompt Chính", type: "system_prompt", version: 3, lastModified: "07/06/2026", content: "Bạn là trợ lý tư vấn chuyên nghiệp của Remak – công ty hàng đầu về vật liệu cách âm, cách nhiệt, tiêu âm và chống cháy tại Việt Nam.\n\nNhiệm vụ:\n- Tư vấn kỹ thuật chính xác dựa trên catalogue sản phẩm\n- Đề xuất giải pháp phù hợp với nhu cầu {{use_case}}\n- Trả lời bằng tiếng Việt, chuyên nghiệp nhưng thân thiện\n- Luôn đính kèm citation khi trích dẫn thông số kỹ thuật\n\nThông tin khách hàng: {{customer_name}}\nSản phẩm quan tâm: {{product_list}}" },
  { id: "p-2", name: "Technical Prompt", type: "technical_prompt", version: 2, lastModified: "05/06/2026", content: "Khi trả lời câu hỏi kỹ thuật:\n1. Trích dẫn thông số từ catalogue chính xác\n2. Ghi rõ nguồn: [Tên tài liệu | Trang X]\n3. So sánh các option nếu có nhiều lựa chọn\n4. Đề xuất option tốt nhất dựa trên {{use_case}}" },
  { id: "p-3", name: "Pricing Prompt", type: "pricing_prompt", version: 1, lastModified: "01/06/2026", content: "Khi tính giá:\n- Lấy giá từ bảng giá hiện tại\n- Áp dụng discount nếu có quy tắc phù hợp\n- Tạo draft quote với đầy đủ line items\n- Ghi rõ: chưa bao gồm VAT và vận chuyển" },
  { id: "p-4", name: "Handoff Prompt", type: "handoff_prompt", version: 2, lastModified: "03/06/2026", content: "Khi chuyển giao cho nhân viên:\n1. Tóm tắt nhu cầu khách hàng\n2. Liệt kê các sản phẩm đã tư vấn\n3. Ghi lý do handoff: {{handoff_reason}}\n4. Thông báo cho khách: 'Tôi sẽ kết nối bạn với chuyên viên ngay bây giờ...'" },
  { id: "p-5", name: "Greeting Prompt", type: "greeting_prompt", version: 1, lastModified: "01/06/2026", content: "Lời chào đầu cuộc trò chuyện:\n'Xin chào {{customer_name}}! Tôi là trợ lý AI của Remak. Tôi có thể giúp bạn tìm giải pháp [tiêu âm/cách nhiệt/chống cháy] phù hợp cho công trình của bạn. Hãy cho tôi biết bạn đang cần gì?'" },
];

const mockChunks = [
  { id: "chunk-001", docName: "Catalogue Stonewool 2024", content: "Remak® Stonewool 50mm: R-value 1.25 m²K/W, Density 60 kg/m³, Fire Rating A1 theo EN 13501-1", score: 0.94, relevant: true },
  { id: "chunk-002", docName: "Catalogue Stonewool 2024", content: "Ứng dụng: Mái tôn nhà xưởng, kho lạnh, tòa nhà văn phòng. Độ dày khuyến nghị: 50-100mm", score: 0.89, relevant: true },
  { id: "chunk-003", docName: "FAQ Kỹ thuật Cách âm", content: "NRC (Noise Reduction Coefficient): Hệ số hấp thụ âm từ 0-1. NRC 0.9 nghĩa là hấp thụ 90% âm thanh", score: 0.85, relevant: null },
  { id: "chunk-004", docName: "Bảng giá Q2 2026", content: "SW-50: 85,000 VND/m², SW-75: 115,000 VND/m², ME-30: 45,000 VND/m²", score: 0.78, relevant: null },
];

const promptVersions = {
  "p-1": [
    { version: 3, date: "07/06/2026", content: "Bạn là trợ lý tư vấn chuyên nghiệp của Remak – công ty hàng đầu về vật liệu cách âm, cách nhiệt, tiêu âm và chống cháy tại Việt Nam.\n\nNhiệm vụ:\n- Tư vấn kỹ thuật chính xác dựa trên catalogue sản phẩm\n- Đề xuất giải pháp phù hợp với nhu cầu {{use_case}}\n- Trả lời bằng tiếng Việt, chuyên nghiệp nhưng thân thiện\n- Luôn đính kèm citation khi trích dẫn thông số kỹ thuật" },
    { version: 2, date: "01/06/2026", content: "Bạn là trợ lý tư vấn của Remak.\nNhiệm vụ: Tư vấn sản phẩm cách âm, cách nhiệt.\nTrả lời bằng tiếng Việt." },
    { version: 1, date: "15/05/2026", content: "You are a sales assistant for Remak building materials." },
  ]
};

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════
const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ");

const formatBytes = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getInitials = (name) => name.split(" ").map(n => n[0]).slice(-2).join("").toUpperCase();

const hashColor = (id) => {
  const colors = ["#4A7C1F", "#E8380D", "#1565C0", "#6A1B9A", "#00695C", "#E65100"];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// ═══════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border border-green-200",
    handoff: "bg-orange-100 text-orange-700 border border-orange-200",
    resolved: "bg-gray-100 text-gray-500 border border-gray-200",
    abandoned: "bg-red-50 text-red-500 border border-red-100",
    draft: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    assigned: "bg-blue-100 text-blue-800 border border-blue-200",
    sent: "bg-green-100 text-green-800 border border-green-200",
    cancelled: "bg-gray-100 text-gray-500 border border-gray-200",
    uploading: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse-custom",
    processing: "bg-yellow-50 text-yellow-700 border border-yellow-200 animate-pulse-custom",
    error: "bg-red-100 text-red-700 border border-red-200",
    archived: "bg-gray-100 text-gray-500 border border-gray-200",
    admin: "bg-purple-100 text-purple-700", trainer: "bg-blue-100 text-blue-700",
    sales: "bg-green-100 text-green-700", cs: "bg-orange-100 text-orange-700",
    inactive: "bg-gray-100 text-gray-500",
  };
  const labels = {
    active: "Active", handoff: "Handoff", resolved: "Resolved", abandoned: "Abandoned",
    draft: "Nháp", assigned: "Đã giao", sent: "Đã gửi", cancelled: "Hủy",
    uploading: "⬆ Đang tải", processing: "⚙ Đang xử lý", error: "❌ Lỗi",
    archived: "Lưu trữ", admin: "Admin", trainer: "Trainer",
    sales: "Sales", cs: "CS", inactive: "Inactive",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {labels[status] || status}
    </span>
  );
};

// Tag Badge
const TagBadge = ({ tag }) => {
  const styles = {
    "lead-hot": "bg-red-100 text-red-700 border border-red-200",
    "lead-warm": "bg-orange-100 text-orange-700 border border-orange-200",
    "lead-cold": "bg-gray-100 text-gray-600 border border-gray-200",
    "follow-up": "bg-purple-100 text-purple-700 border border-purple-200",
    "price-sensitive": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "vip": "bg-amber-100 text-amber-700 border border-amber-200",
    "project-studio": "bg-blue-100 text-blue-700 border border-blue-200",
    "project-factory": "bg-teal-100 text-teal-700 border border-teal-200",
    "interest-stonewool": "bg-green-100 text-green-700 border border-green-200",
    "interest-airreflex": "bg-cyan-100 text-cyan-700 border border-cyan-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${styles[tag] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      {tag}
    </span>
  );
};

// Channel Icon
const ChannelIcon = ({ channel, size = 16 }) => {
  if (channel === "zalo_oa") return (
    <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#0068FF", borderRadius: 4, color: "white", fontSize: 9, fontWeight: 700, minWidth: size }}>ZL</span>
  );
  return <Globe size={size} style={{ color: "#4A7C1F" }} />;
};

// User Avatar
const UserAvatar = ({ user, size = 32 }) => {
  if (!user) return null;
  const bg = hashColor(user.id);
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 600, fontFamily: "Lexend", flexShrink: 0 }}>
      {getInitials(user.name)}
    </div>
  );
};

// KPI Card
const KPICard = ({ title, value, subtext, icon: Icon, colorAccent, trend }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 card-hover animate-countUp">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 12, color: "#7A7A7A", fontWeight: 500, marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "Lexend", color: "#1C1C1C", lineHeight: 1.2 }}>{value}</p>
        {subtext && <p style={{ fontSize: 12, color: "#7A7A7A", marginTop: 4 }}>{subtext}</p>}
        {trend && <p style={{ fontSize: 12, color: "#2E7D32", marginTop: 4, fontWeight: 500 }}>↑ {trend}</p>}
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${colorAccent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={22} style={{ color: colorAccent }} />
      </div>
    </div>
  </div>
);

// Agent Badge
const AgentBadge = ({ agentType }) => {
  const map = {
    technical: { label: "⚡ Technical", bg: "#E8F5E9", color: "#2E7D32" },
    pricing: { label: "💰 Pricing", bg: "#FFF8E1", color: "#F57F17" },
    solution: { label: "🎯 Solution", bg: "#E3F2FD", color: "#1565C0" },
    order: { label: "📋 Order", bg: "#F3E5F5", color: "#6A1B9A" },
    chat: { label: "💬 Chat", bg: "#F5F5F5", color: "#4A4A4A" },
  };
  const a = map[agentType] || map.chat;
  return <span style={{ background: a.bg, color: a.color, fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600 }}>{a.label}</span>;
};

// Tech Spec Badge
const TechSpecBadge = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <span style={{ fontSize: 10, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
    <span className="font-mono" style={{ fontSize: 12, color: "#4A7C1F", fontWeight: 500 }}>{value}</span>
  </div>
);

// Toast
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const colors = { success: "#2E7D32", error: "#C62828", info: "#1565C0" };
  return (
    <div className="toast-animate" style={{
      position: "fixed", top: 20, right: 20, background: "white", border: `1px solid ${colors[type]}20`,
      borderLeft: `4px solid ${colors[type]}`, borderRadius: 8, padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      zIndex: 9999, display: "flex", alignItems: "center", gap: 8, minWidth: 280,
    }}>
      <CheckCircle size={16} style={{ color: colors[type], flexShrink: 0 }} />
      <span style={{ fontSize: 14, color: "#1C1C1C" }}>{message}</span>
      <button onClick={onClose} style={{ marginLeft: "auto", color: "#7A7A7A", background: "none", border: "none", cursor: "pointer" }}>
        <X size={14} />
      </button>
    </div>
  );
};

// Empty State
const EmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center" }}>
    <div style={{ width: 64, height: 64, borderRadius: 16, background: "#F4FAE8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon size={28} style={{ color: "#6DB02B" }} />
    </div>
    <p style={{ fontSize: 16, fontWeight: 600, fontFamily: "Lexend", color: "#1C1C1C", marginBottom: 8 }}>{title}</p>
    <p style={{ fontSize: 14, color: "#7A7A7A", marginBottom: 24 }}>{message}</p>
    {actionLabel && (
      <button onClick={onAction} style={{ background: "#6DB02B", color: "white", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
        {actionLabel}
      </button>
    )}
  </div>
);

// Confirm Dialog
const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="animate-scaleIn" style={{ background: "white", borderRadius: 16, padding: 24, width: 360, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily: "Lexend", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: "#4A4A4A", marginBottom: 24 }}>{message}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E0E0E0", background: "none", cursor: "pointer", fontSize: 14 }}>Hủy</button>
          <button onClick={onConfirm} style={{ padding: "8px 16px", borderRadius: 8, background: "#6DB02B", color: "white", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

// Markdown Renderer (simple)
const MarkdownText = ({ content }) => {
  const lines = content.split("\n");
  return (
    <div style={{ fontSize: 14, lineHeight: 1.6, color: "#1C1C1C" }}>
      {lines.map((line, i) => {
        if (!line) return <br key={i} />;
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        const isBullet = line.startsWith("•") || line.startsWith("-");
        return (
          <p key={i} style={{ marginBottom: 4, paddingLeft: isBullet ? 8 : 0 }}
            dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SIDEBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════
const Sidebar = ({ activeItem, onNavigate, currentUser }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "conversations", label: "Hội thoại", icon: MessageSquare, badge: 3 },
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "quotes", label: "Báo giá", icon: FileText, badge: 8 },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
    { id: "prompts", label: "Prompt Manager", icon: Settings },
    ...(currentUser?.role === "admin" ? [{ id: "users", label: "Người dùng", icon: Users }] : []),
  ];

  return (
    <div style={{ width: 240, background: "#2D5016", height: "100vh", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0 }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontFamily: "Lexend", fontWeight: 700, fontSize: 22, color: "#6DB02B", letterSpacing: "-0.5px" }}>REMAK</div>
        <div style={{ fontSize: 10, color: "#89C441", marginTop: 2, letterSpacing: "0.1em" }}>SALE SUPPORT AI</div>
        <div style={{ width: 32, height: 2, background: "#E8380D", borderRadius: 1, marginTop: 4 }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {navItems.map(item => (
          <button
            key={item.id}
            className="sidebar-item"
            onClick={() => onNavigate(item.id)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: activeItem === item.id ? "#4A7C1F" : "transparent",
              color: activeItem === item.id ? "white" : "#C5E09A",
              borderLeft: activeItem === item.id ? "3px solid #E8380D" : "3px solid transparent",
              marginBottom: 2, textAlign: "left",
              transition: "all 0.15s ease",
            }}>
            <item.icon size={18} />
            <span style={{ fontSize: 14, fontWeight: activeItem === item.id ? 600 : 400, flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{ background: "#E8380D", color: "white", fontSize: 11, fontWeight: 700, padding: "1px 6px", borderRadius: 999, minWidth: 20, textAlign: "center" }}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
        <UserAvatar user={currentUser} size={34} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser?.name}</div>
          <StatusBadge status={currentUser?.role} />
        </div>
        <LogOut size={15} style={{ color: "#89C441", cursor: "pointer" }} />
      </div>
    </div>
  );
};

// Top Bar
const TopBar = ({ pageTitle, currentUser, notificationCount = 0, toasts, removeToast }) => (
  <div style={{ height: 60, background: "white", borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", paddingLeft: 24, paddingRight: 24, gap: 16, flexShrink: 0 }}>
    <h1 style={{ fontFamily: "Lexend", fontSize: 18, fontWeight: 700, color: "#1C1C1C", flex: 1 }}>{pageTitle}</h1>
    <div style={{ position: "relative" }}>
      <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #E0E0E0", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Bell size={18} style={{ color: "#4A4A4A" }} />
      </button>
      {notificationCount > 0 && (
        <span style={{ position: "absolute", top: -4, right: -4, background: "#E8380D", color: "white", fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{notificationCount}</span>
      )}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <UserAvatar user={currentUser} size={32} />
      <span style={{ fontSize: 14, fontWeight: 500 }}>{currentUser?.name}</span>
      <ChevronDown size={14} style={{ color: "#7A7A7A" }} />
    </div>
    {toasts?.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />)}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 1: ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
const AdminDashboard = ({ addToast }) => {
  const [dateRange, setDateRange] = useState("7 ngày");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedConvModal, setSelectedConvModal] = useState(null);

  const donutData = [
    { name: "AI giải quyết", value: 81.5, color: "#6DB02B" },
    { name: "Cần nhân viên", value: 18.5, color: "#E8380D" },
  ];

  const rangeMultipliers = { "Today": 0.3, "7 ngày": 1, "30 ngày": 4.2 };
  const mult = rangeMultipliers[dateRange] || 1;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); addToast("Dữ liệu đã được cập nhật", "success"); }, 1000);
  };

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 13, color: "#7A7A7A" }}>Thứ Bảy, 07/06/2026 · <span style={{ color: "#6DB02B", fontWeight: 600 }}>● {mockDashboard.activeNow} đang online</span></p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Today", "7 ngày", "30 ngày"].map(r => (
            <button key={r} onClick={() => setDateRange(r)} style={{
              padding: "6px 14px", borderRadius: 6, border: `1px solid ${dateRange === r ? "#6DB02B" : "#E0E0E0"}`,
              background: dateRange === r ? "#6DB02B" : "white", color: dateRange === r ? "white" : "#4A4A4A",
              fontSize: 13, cursor: "pointer", fontWeight: dateRange === r ? 600 : 400,
            }}>{r}</button>
          ))}
          <button onClick={handleRefresh} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #E0E0E0", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <RefreshCw size={16} style={{ color: "#4A4A4A", animation: refreshing ? "spin 1s linear infinite" : "none" }} />
          </button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPICard title="Hội thoại hôm nay" value={Math.round(mockDashboard.todayConversations * mult)} icon={MessageSquare} colorAccent="#6DB02B" trend="+12% so với hôm qua" />
        <KPICard title="Tỉ lệ AI giải quyết" value={`${mockDashboard.resolutionByAI}%`} subtext={`${mockDashboard.handoffRate}% cần nhân viên`} icon={Bot || Zap} colorAccent="#1565C0" />
        <KPICard title="Báo giá chờ xử lý" value={mockDashboard.pendingQuotes} subtext="8 chờ assign" icon={FileText} colorAccent="#E8380D" />
        <KPICard title="Phản hồi TB" value={`${mockDashboard.avgResponseTimeSec}s`} subtext="Mục tiêu < 3s ✅" icon={Zap} colorAccent="#2E7D32" />
      </div>

      {/* Row 2: Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Xu hướng hội thoại 7 ngày</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockDashboard.trend.map(d => ({ ...d, count: Math.round(d.count * mult) }))}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6DB02B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6DB02B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#7A7A7A" }} />
              <YAxis tick={{ fontSize: 11, fill: "#7A7A7A" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E0E0E0", fontSize: 13 }} />
              <Area type="monotone" dataKey="count" stroke="#6DB02B" strokeWidth={2.5} fill="url(#greenGrad)" dot={{ fill: "#6DB02B", r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>AI vs Nhân viên</h3>
          <p style={{ fontSize: 12, color: "#7A7A7A", marginBottom: 8 }}>312 hội thoại / 7 ngày</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Tables */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Top sản phẩm được hỏi</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockDashboard.topProducts.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#7A7A7A", width: 16, textAlign: "right" }}>{i + 1}</span>
                <span style={{ fontSize: 13, flex: 1, fontWeight: 500 }}>{p.name}</span>
                <div style={{ flex: 1, background: "#F4FAE8", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#6DB02B", width: `${(p.count / 89) * 100}%`, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, color: "#4A7C1F", fontWeight: 600, width: 28, textAlign: "right" }}>{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Questions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Top câu hỏi phổ biến</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockDashboard.topQuestions.map((q, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 12, color: "white", background: i < 3 ? "#6DB02B" : "#BDBDBD", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ fontSize: 13, flex: 1, color: "#4A4A4A", lineHeight: 1.4 }}>{q.name}</span>
                <span style={{ fontSize: 11, background: "#F4FAE8", color: "#4A7C1F", padding: "2px 8px", borderRadius: 999, fontWeight: 600, flexShrink: 0 }}>{q.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Conversations */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600 }}>Hội thoại gần đây</h3>
          <button style={{ fontSize: 13, color: "#6DB02B", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Xem tất cả →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {mockConversations.map(conv => (
            <div key={conv.id}
              onClick={() => setSelectedConvModal(conv)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, cursor: "pointer", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F4FAE8"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <ChannelIcon channel={conv.channel} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1C" }}>{conv.visitorName}</span>
                  {conv.tags.slice(0, 1).map(t => <TagBadge key={t} tag={t} />)}
                </div>
                <p style={{ fontSize: 12, color: "#7A7A7A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 300 }}>{conv.lastMessage}</p>
              </div>
              <StatusBadge status={conv.status} />
              <span style={{ fontSize: 11, color: "#7A7A7A", flexShrink: 0 }}>{conv.lastMessageAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conv Preview Modal */}
      {selectedConvModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSelectedConvModal(null)}>
          <div className="animate-scaleIn" onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 16, padding: 24, width: 480, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ChannelIcon channel={selectedConvModal.channel} size={20} />
                <h3 style={{ fontFamily: "Lexend", fontSize: 16, fontWeight: 700 }}>{selectedConvModal.visitorName}</h3>
                <StatusBadge status={selectedConvModal.status} />
              </div>
              <button onClick={() => setSelectedConvModal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <p style={{ fontSize: 13, color: "#4A4A4A", marginBottom: 12 }}><strong>Tin nhắn cuối:</strong> {selectedConvModal.lastMessage}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {selectedConvModal.tags.map(t => <TagBadge key={t} tag={t} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 2: CHAT WIDGET (Customer View)
// ═══════════════════════════════════════════════════════════════════════
const ChatWidget = ({ addToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([mockMessages[0]]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [handoffStatus, setHandoffStatus] = useState(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [expandedCitations, setExpandedCitations] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("mái tôn") || lower.includes("stonewool") || lower.includes("cách nhiệt")) {
      return mockMessages[2];
    } else if (lower.includes("phòng thu") || lower.includes("tiêu âm") || lower.includes("nrc")) {
      return {
        id: `msg-${Date.now()}`, role: "assistant",
        content: "Cho phòng thu âm, tôi khuyến nghị **Mút trứng Remak® 30mm**:\n\n• **NRC: 0.85** – Hấp thụ 85% âm thanh phản xạ\n• **STC: 28** – Cách âm tốt giữa các phòng\n• Giá: 45,000 VND/m²\n\nNRC 0.85-0.90 là đủ cho phòng thu âm chuẩn. Nếu cần cách âm cao hơn, có thể kết hợp với tấm thạch cao kép.",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        agentUsed: "technical", confidenceScore: 0.89,
        citations: [{ documentName: "FAQ Kỹ thuật Cách âm", pageRef: "Trang 5", excerpt: "NRC (Noise Reduction Coefficient): Hệ số hấp thụ âm từ 0-1", relevanceScore: 0.87 }],
        products: [{
          sku: "ME-30", name: "Mút trứng Remak® 30mm", category: "Tiêu âm",
          price: 45000, unit: "m²",
          specs: { NRC: "0.85", STC: "28", thickness: "30mm" }, isRecommended: true,
        }],
      };
    } else if (lower.includes("báo giá") || lower.includes("giá")) {
      return {
        id: `msg-${Date.now()}`, role: "assistant",
        content: "Tôi đã tổng hợp báo giá sơ bộ cho bạn:\n\n• Stonewool 75mm × 500m²: **57,500,000 VND**\n• Mút trứng 30mm × 200m²: **9,000,000 VND**\n\nTổng cộng (chưa VAT): **66,500,000 VND**\n\nBản báo giá đã được tạo. Bạn có thể cho tôi biết tên công ty và thông tin liên hệ để hoàn thiện báo giá không?",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        agentUsed: "order", confidenceScore: 0.91,
      };
    } else if (lower.includes("nhân viên") || lower.includes("người thật") || lower.includes("tư vấn trực tiếp")) {
      setTimeout(() => {
        setHandoffStatus("pending");
        setTimeout(() => setHandoffStatus("active"), 2000);
      }, 500);
      return {
        id: `msg-${Date.now()}`, role: "assistant",
        content: "Tôi hiểu bạn muốn nói chuyện trực tiếp với chuyên viên. Đang kết nối bạn với đội Sales ngay bây giờ...",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        agentUsed: "chat", confidenceScore: 1.0,
      };
    }
    return {
      id: `msg-${Date.now()}`, role: "assistant",
      content: "Cảm ơn câu hỏi của bạn! Tôi đang tra cứu thông tin từ catalogue sản phẩm Remak. Bạn có thể cho tôi biết thêm về nhu cầu cụ thể – ví dụ loại công trình (nhà xưởng, phòng thu, văn phòng...) và diện tích cần xử lý không?",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      agentUsed: "chat", confidenceScore: 0.72,
    };
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: `msg-u-${Date.now()}`, role: "user", content: text, timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setShowQuickReplies(false);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResp = getBotResponse(text);
      setMessages(prev => [...prev, botResp]);
    }, 1500);
  };

  const ProductCard = ({ product }) => (
    <div style={{ border: `1px solid ${product.isRecommended ? "#C5E09A" : "#E0E0E0"}`, borderRadius: 10, padding: 12, background: product.isRecommended ? "#FAFFF4" : "white", position: "relative", marginTop: 8 }}>
      {product.isRecommended && (
        <span style={{ position: "absolute", top: -8, right: 10, background: "#E8380D", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>⭐ Khuyến nghị</span>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <span className="font-mono" style={{ fontSize: 10, background: "#F5F5F5", padding: "2px 6px", borderRadius: 4, color: "#7A7A7A" }}>{product.sku}</span>
          <p style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{product.name}</p>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#E8380D" }}>{formatVND(product.price)}/{product.unit}</span>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {Object.entries(product.specs).map(([k, v]) => <TechSpecBadge key={k} label={k} value={v} />)}
      </div>
      <button
        onClick={() => addToast(`Đã thêm ${product.name} vào báo giá`, "success")}
        style={{ width: "100%", background: "#6DB02B", color: "white", border: "none", borderRadius: 6, padding: "6px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
        + Thêm vào báo giá
      </button>
    </div>
  );

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #6DB02B, #4A7C1F)",
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(77,124,31,0.4)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          position: "relative",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(77,124,31,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(77,124,31,0.4)"; }}>
        <MessageCircle size={24} style={{ color: "white" }} />
        {!isOpen && <span style={{ position: "absolute", top: 2, right: 2, width: 12, height: 12, background: "#E8380D", borderRadius: "50%", border: "2px solid white" }} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="animate-scaleIn" style={{
          position: "absolute", bottom: 68, right: 0,
          width: 380, height: 600, background: "white",
          borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: "#2D5016", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#6DB02B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={20} style={{ color: "white" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Lexend", fontWeight: 700, color: "white", fontSize: 14 }}>Trợ lý Remak</p>
              <p style={{ fontSize: 11, color: "#89C441" }}>● Online – Phản hồi trong vài giây</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "white", opacity: 0.7 }}>
              <X size={18} />
            </button>
          </div>

          {/* Handoff Banner */}
          {handoffStatus && (
            <div style={{ background: "#FFF5F0", borderLeft: "3px solid #E8380D", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <UserCheck size={16} style={{ color: "#E8380D", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#B33000" }}>
                {handoffStatus === "pending" ? "Đang kết nối với chuyên viên..." : "Chị Lan đã nhận cuộc trò chuyện ✓"}
              </span>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "#FAFAFA" }}>
            {messages.map(msg => (
              <div key={msg.id} className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
                {msg.agentUsed && msg.role === "assistant" && <AgentBadge agentType={msg.agentUsed} />}
                <div style={{
                  maxWidth: msg.role === "user" ? "75%" : "85%",
                  background: msg.role === "user" ? "#4A7C1F" : "white",
                  color: msg.role === "user" ? "white" : "#1C1C1C",
                  borderRadius: msg.role === "user" ? "16px 16px 0 16px" : "0 16px 16px 16px",
                  padding: "10px 14px",
                  border: msg.role === "assistant" ? "1px solid #E8F4D0" : "none",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  {msg.role === "assistant" ? <MarkdownText content={msg.content} /> : <p style={{ fontSize: 14 }}>{msg.content}</p>}
                </div>

                {/* Product Cards */}
                {msg.products && (
                  <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: 6 }}>
                    {msg.products.map(p => <ProductCard key={p.sku} product={p} />)}
                  </div>
                )}

                {/* Citations */}
                {msg.citations?.map((c, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedCitations(prev => ({ ...prev, [`${msg.id}-${i}`]: !prev[`${msg.id}-${i}`] }))}
                      style={{ background: "#F4FAE8", border: "1px solid #C5E09A", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#4A7C1F", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      📎 {c.documentName} – {c.pageRef}
                      <ChevronDown size={10} style={{ transform: expandedCitations[`${msg.id}-${i}`] ? "rotate(180deg)" : "none" }} />
                    </button>
                    {expandedCitations[`${msg.id}-${i}`] && (
                      <div className="animate-fadeIn" style={{ background: "#F4FAE8", border: "1px solid #C5E09A", borderLeft: "3px solid #6DB02B", borderRadius: 6, padding: "8px 10px", marginTop: 4, maxWidth: "85%" }}>
                        <p className="font-mono" style={{ fontSize: 11, color: "#4A4A4A" }}>{c.excerpt}</p>
                        <p style={{ fontSize: 10, color: "#7A7A7A", marginTop: 4 }}>Độ liên quan: {(c.relevanceScore * 100).toFixed(0)}%</p>
                      </div>
                    )}
                  </div>
                ))}
                <span style={{ fontSize: 10, color: "#BDBDBD" }}>{msg.timestamp}</span>
              </div>
            ))}

            {/* Quick Replies */}
            {showQuickReplies && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Cách nhiệt mái tôn", "Tiêu âm phòng thu", "Báo giá"].map(q => (
                  <button key={q} onClick={() => sendMessage(q)} style={{ background: "white", border: "1px solid #C5E09A", color: "#4A7C1F", padding: "6px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{q}</button>
                ))}
              </div>
            )}

            {/* Typing */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: "white", border: "1px solid #E8F4D0", borderRadius: "0 16px 16px 16px", padding: "10px 14px", display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className={`dot${i + 1}`} style={{ width: 7, height: 7, borderRadius: "50%", background: "#6DB02B" }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", background: "white", borderTop: "1px solid #E0E0E0", display: "flex", gap: 8, alignItems: "flex-end" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7A7A", padding: 4 }}><Paperclip size={18} /></button>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Nhập câu hỏi về vật liệu..."
              rows={1}
              style={{ flex: 1, border: "1px solid #E0E0E0", borderRadius: 10, padding: "8px 12px", fontSize: 13, resize: "none", outline: "none", fontFamily: "Be Vietnam Pro", maxHeight: 80, overflowY: "auto" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              style={{ width: 36, height: 36, borderRadius: "50%", background: input.trim() ? "#6DB02B" : "#E0E0E0", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ArrowUp size={16} style={{ color: "white" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 3: CONVERSATION MANAGER
// ═══════════════════════════════════════════════════════════════════════
const ConversationManager = ({ addToast }) => {
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConv, setSelectedConv] = useState(mockConversations[0]);
  const [conversations, setConversations] = useState(mockConversations);
  const [replyText, setReplyText] = useState("");
  const [confirmResolve, setConfirmResolve] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});
  const [tags, setTags] = useState({ "conv-001": ["lead-hot", "interest-stonewool"], "conv-002": ["follow-up", "price-sensitive"], "conv-003": ["lead-warm", "interest-airreflex"], "conv-004": ["lead-warm", "project-studio"] });
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");

  const filtered = conversations.filter(c => {
    const matchSearch = c.visitorName.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase());
    const matchChannel = channelFilter === "all" || c.channel === channelFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchChannel && matchStatus;
  });

  const handleResolve = () => {
    setConversations(prev => prev.map(c => c.id === selectedConv.id ? { ...c, status: "resolved" } : c));
    setSelectedConv(prev => ({ ...prev, status: "resolved" }));
    addToast("Hội thoại đã được đánh dấu hoàn thành", "success");
    setConfirmResolve(false);
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    addToast("Tin nhắn đã gửi thành công", "success");
    setReplyText("");
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setTags(prev => ({ ...prev, [selectedConv.id]: [...(prev[selectedConv.id] || []), newTag.trim()] }));
    setNewTag(""); setShowTagInput(false);
  };

  const removeTag = (convId, tag) => {
    setTags(prev => ({ ...prev, [convId]: prev[convId].filter(t => t !== tag) }));
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden" }}>
      {/* Left: Conv List */}
      <div style={{ width: 380, borderRight: "1px solid #E0E0E0", display: "flex", flexDirection: "column", background: "white", flexShrink: 0 }}>
        {/* Filters */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F0F0", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", background: "#F5F5F5", borderRadius: 8, padding: "6px 10px" }}>
            <Search size={14} style={{ color: "#7A7A7A" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm..." style={{ border: "none", background: "none", outline: "none", fontSize: 13, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["all", "Tất cả"], ["web_widget", "Web"], ["zalo_oa", "Zalo"]].map(([v, l]) => (
              <button key={v} onClick={() => setChannelFilter(v)} style={{ flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${channelFilter === v ? "#6DB02B" : "#E0E0E0"}`, background: channelFilter === v ? "#6DB02B" : "white", color: channelFilter === v ? "white" : "#4A4A4A", fontSize: 12, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["all", "Tất cả"], ["active", "Active"], ["handoff", "Handoff"], ["resolved", "Resolved"]].map(([v, l]) => (
              <button key={v} onClick={() => setStatusFilter(v)} style={{ flex: 1, padding: "4px 6px", borderRadius: 6, border: `1px solid ${statusFilter === v ? "#6DB02B" : "#E0E0E0"}`, background: statusFilter === v ? "#6DB02B" : "white", color: statusFilter === v ? "white" : "#4A4A4A", fontSize: 11, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#7A7A7A" }}>Hiển thị {filtered.length}/{conversations.length}</p>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.length === 0 ? <EmptyState icon={MessageSquare} title="Không có hội thoại" message="Thử thay đổi bộ lọc" /> :
            filtered.map(conv => (
              <div key={conv.id}
                onClick={() => setSelectedConv(conv)}
                style={{
                  padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #F5F5F5",
                  borderLeft: selectedConv?.id === conv.id ? "3px solid #6DB02B" : "3px solid transparent",
                  background: selectedConv?.id === conv.id ? "#F4FAE8" : "white",
                  transition: "all 0.1s",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ChannelIcon channel={conv.channel} size={14} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{conv.visitorName}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <StatusBadge status={conv.status} />
                    <span style={{ fontSize: 10, color: "#7A7A7A" }}>{conv.lastMessageAt}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#7A7A7A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 6 }}>{conv.lastMessage}</p>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {(tags[conv.id] || []).slice(0, 2).map(t => <TagBadge key={t} tag={t} />)}
                  {conv.assignedTo && <UserAvatar user={conv.assignedTo} size={18} />}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right: Detail */}
      {selectedConv ? (
        <div className="animate-slideIn" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "white" }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <ChannelIcon channel={selectedConv.channel} size={18} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "Lexend", fontSize: 16, fontWeight: 700 }}>{selectedConv.visitorName}</span>
                {selectedConv.visitorPhone && <span style={{ fontSize: 12, color: "#7A7A7A" }}>{selectedConv.visitorPhone}</span>}
                <StatusBadge status={selectedConv.status} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowTagInput(true)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #E0E0E0", background: "none", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <Tag size={12} /> Gắn nhãn
              </button>
              {selectedConv.status !== "resolved" && (
                <button onClick={() => setConfirmResolve(true)} style={{ padding: "6px 12px", borderRadius: 6, background: "#6DB02B", color: "white", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={12} /> Đóng
                </button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Chat history */}
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12, background: "#FAFAFA" }}>
              {mockMessages.map(msg => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {msg.agentUsed && <AgentBadge agentType={msg.agentUsed} />}
                    {msg.confidenceScore && msg.confidenceScore < 0.7 && (
                      <span style={{ fontSize: 10, color: "#F57F17", background: "#FFF8E1", padding: "1px 6px", borderRadius: 999 }}>⚠ Conf: {msg.confidenceScore}</span>
                    )}
                  </div>
                  <div style={{
                    maxWidth: "70%", background: msg.role === "user" ? "#4A7C1F" : "white",
                    color: msg.role === "user" ? "white" : "#1C1C1C",
                    borderRadius: msg.role === "user" ? "16px 16px 0 16px" : "0 16px 16px 16px",
                    padding: "10px 14px", border: msg.role === "assistant" ? "1px solid #E8F4D0" : "none",
                  }}>
                    {msg.role === "assistant" ? <MarkdownText content={msg.content} /> : <p style={{ fontSize: 13 }}>{msg.content}</p>}
                  </div>
                  {msg.citations?.map((c, i) => (
                    <span key={i} style={{ background: "#F4FAE8", border: "1px solid #C5E09A", borderRadius: 999, padding: "2px 8px", fontSize: 10, color: "#4A7C1F" }}>
                      📎 {c.documentName}
                    </span>
                  ))}
                  {msg.role === "assistant" && (
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => setFeedbacks(p => ({ ...p, [msg.id]: "up" }))} style={{ background: feedbacks[msg.id] === "up" ? "#E8F5E9" : "none", border: "none", cursor: "pointer", borderRadius: 4, padding: "2px 6px", color: "#2E7D32" }}>
                        <ThumbsUp size={12} />
                      </button>
                      <button onClick={() => setFeedbacks(p => ({ ...p, [msg.id]: "down" }))} style={{ background: feedbacks[msg.id] === "down" ? "#FFEBEE" : "none", border: "none", cursor: "pointer", borderRadius: 4, padding: "2px 6px", color: "#C62828" }}>
                        <ThumbsDown size={12} />
                      </button>
                    </div>
                  )}
                  <span style={{ fontSize: 10, color: "#BDBDBD" }}>{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Meta Panel */}
            <div style={{ width: 240, borderLeft: "1px solid #E0E0E0", padding: 16, overflowY: "auto", flexShrink: 0, background: "white" }}>
              <div style={{ background: "#F5F5F5", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Visitor Info</p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{selectedConv.visitorName}</p>
                {selectedConv.visitorPhone && <p style={{ fontSize: 12, color: "#7A7A7A" }}>{selectedConv.visitorPhone}</p>}
              </div>

              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tags</p>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {(tags[selectedConv.id] || []).map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <TagBadge tag={t} />
                      <button onClick={() => removeTag(selectedConv.id, t)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7A7A", padding: 0, lineHeight: 1 }}><X size={10} /></button>
                    </div>
                  ))}
                  {showTagInput ? (
                    <input autoFocus value={newTag} onChange={e => setNewTag(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") addTag(); if (e.key === "Escape") setShowTagInput(false); }}
                      placeholder="Tag mới..." style={{ border: "1px solid #6DB02B", borderRadius: 6, padding: "2px 6px", fontSize: 11, outline: "none", width: 80 }} />
                  ) : (
                    <button onClick={() => setShowTagInput(true)} style={{ fontSize: 11, color: "#6DB02B", background: "#F4FAE8", border: "1px dashed #C5E09A", borderRadius: 999, padding: "2px 8px", cursor: "pointer" }}>+ Thêm</button>
                  )}
                </div>
              </div>

              {selectedConv.quoteId && (
                <div style={{ background: "#FFF5F0", borderRadius: 8, padding: 10, marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", marginBottom: 4, textTransform: "uppercase" }}>Báo giá liên kết</p>
                  <span className="font-mono" style={{ fontSize: 13, color: "#E8380D", fontWeight: 600 }}>{selectedConv.quoteId}</span>
                </div>
              )}

              {selectedConv.intentsDetected && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Ý định phát hiện</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {selectedConv.intentsDetected.map(i => (
                      <span key={i} style={{ fontSize: 11, background: "#E3F2FD", color: "#1565C0", padding: "2px 8px", borderRadius: 4 }}>{i}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Timeline</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[["Tạo hội thoại", selectedConv.lastMessageAt], ["AI trả lời", "Tự động"], ...(selectedConv.status === "handoff" ? [["Handoff yêu cầu", "12 phút trước"]] : [])].map(([evt, time], i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6DB02B", marginTop: 5, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 500, color: "#1C1C1C" }}>{evt}</p>
                        <p style={{ fontSize: 10, color: "#7A7A7A" }}>{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Handoff Reply Bar */}
          {selectedConv.status === "handoff" && (
            <div style={{ background: "#FFF5F0", borderTop: "1px solid #FFBC99", padding: "10px 20px" }}>
              <p style={{ fontSize: 11, color: "#B33000", fontWeight: 600, marginBottom: 8 }}>🔴 CS Mode – Đang nhận từ AI</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={replyText} onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleReply(); }}
                  placeholder="Nhập phản hồi cho khách hàng..." style={{ flex: 1, border: "1px solid #FFBC99", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none" }} />
                <button onClick={handleReply} style={{ background: "#E8380D", color: "white", border: "none", borderRadius: 8, padding: "0 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Gửi</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <EmptyState icon={MessageSquare} title="Chọn hội thoại" message="Chọn một hội thoại từ danh sách bên trái" />
        </div>
      )}

      <ConfirmDialog open={confirmResolve} title="Đóng hội thoại?" message="Bạn có chắc muốn đánh dấu hội thoại này là hoàn thành?" onConfirm={handleResolve} onCancel={() => setConfirmResolve(false)} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 4: QUOTE MANAGER
// ═══════════════════════════════════════════════════════════════════════
const QuoteManager = ({ addToast }) => {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editQuote, setEditQuote] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);

  const recalculate = (quote) => {
    const subtotal = quote.lineItems.reduce((s, i) => s + i.subtotal, 0);
    const discountAmount = (subtotal * quote.discountPercent) / 100;
    const taxAmount = ((subtotal - discountAmount) * quote.taxPercent) / 100;
    const total = subtotal - discountAmount + taxAmount;
    return { ...quote, subtotal, discountAmount, taxAmount, total };
  };

  const updateLineItem = (itemId, field, value) => {
    const updated = { ...editQuote, lineItems: editQuote.lineItems.map(li => {
      if (li.id !== itemId) return li;
      const newLi = { ...li, [field]: Number(value) || value };
      if (field === "quantity" || field === "unitPrice") {
        newLi.subtotal = (field === "quantity" ? Number(value) : li.quantity) * (field === "unitPrice" ? Number(value) : li.unitPrice);
      }
      return newLi;
    })};
    setEditQuote(recalculate(updated));
  };

  const handleSave = () => {
    setQuotes(prev => prev.map(q => q.id === editQuote.id ? editQuote : q));
    setSelectedQuote(editQuote);
    setEditMode(false);
    addToast("Báo giá đã được lưu", "success");
  };

  const handleAssign = (user) => {
    const updated = { ...editQuote || selectedQuote, assignedTo: user, status: "assigned" };
    setQuotes(prev => prev.map(q => q.id === updated.id ? updated : q));
    setSelectedQuote(updated);
    if (editQuote) setEditQuote(updated);
    addToast(`Đã giao cho ${user.name}`, "success");
  };

  const addLineItem = () => {
    const newItem = { id: `li-${Date.now()}`, sku: "", productName: "Sản phẩm mới", quantity: 1, unit: "m²", unitPrice: 0, subtotal: 0, note: "" };
    setEditQuote(prev => recalculate({ ...prev, lineItems: [...prev.lineItems, newItem] }));
  };

  const removeLineItem = (id) => {
    setEditQuote(prev => recalculate({ ...prev, lineItems: prev.lineItems.filter(li => li.id !== id) }));
  };

  const openEdit = (quote) => {
    setEditQuote(JSON.parse(JSON.stringify(quote)));
    setEditMode(true);
  };

  const filtered = quotes.filter(q => {
    const ms = statusFilter === "all" || q.status === statusFilter;
    const ms2 = q.customerInfo.name.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase()) || (q.customerInfo.project || "").toLowerCase().includes(search.toLowerCase());
    return ms && ms2;
  });

  const displayQuote = editMode ? editQuote : selectedQuote;

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden", background: "#FAFAFA" }}>
      {/* Table */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", background: "white", borderBottom: "1px solid #E0E0E0", display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", background: "#F5F5F5", borderRadius: 8, padding: "6px 10px", flex: 1, maxWidth: 280 }}>
            <Search size={14} style={{ color: "#7A7A7A" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm báo giá..." style={{ border: "none", background: "none", outline: "none", fontSize: 13, flex: 1 }} />
          </div>
          {[["all", "Tất cả"], ["draft", "Nháp"], ["assigned", "Đã giao"], ["sent", "Đã gửi"]].map(([v, l]) => (
            <button key={v} onClick={() => setStatusFilter(v)} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${statusFilter === v ? "#6DB02B" : "#E0E0E0"}`, background: statusFilter === v ? "#6DB02B" : "white", color: statusFilter === v ? "white" : "#4A4A4A", fontSize: 12, cursor: "pointer" }}>{l}</button>
          ))}
          <button onClick={() => addToast("Tính năng tạo mới sẽ có trong bản production", "info")} style={{ marginLeft: "auto", background: "#6DB02B", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={14} /> Tạo báo giá
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <thead>
              <tr style={{ background: "#F4FAE8", borderBottom: "1px solid #E0E0E0" }}>
                {["Mã BG", "Khách hàng", "Dự án", "Tổng tiền", "Trạng thái", "Giao cho", "Ngày tạo", ""].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#4A7C1F", fontFamily: "Lexend" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, idx) => (
                <tr key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  style={{ borderBottom: "1px solid #F5F5F5", cursor: "pointer", borderLeft: selectedQuote?.id === q.id ? "3px solid #6DB02B" : "3px solid transparent", background: selectedQuote?.id === q.id ? "#FAFFF4" : "white", transition: "all 0.1s" }}
                  onMouseEnter={e => { if (selectedQuote?.id !== q.id) e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={e => { if (selectedQuote?.id !== q.id) e.currentTarget.style.background = "white"; }}>
                  <td style={{ padding: "12px 14px" }}><span className="font-mono" style={{ color: "#4A7C1F", fontWeight: 600, fontSize: 13 }}>{q.id}</span></td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500 }}>{q.customerInfo.name}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "#7A7A7A" }}>{q.customerInfo.project}</td>
                  <td style={{ padding: "12px 14px" }}><span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: "#E8380D" }}>{formatVND(q.total)}</span></td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={q.status} /></td>
                  <td style={{ padding: "12px 14px" }}>
                    {q.assignedTo ? <div style={{ display: "flex", alignItems: "center", gap: 6 }}><UserAvatar user={q.assignedTo} size={24} /><span style={{ fontSize: 12 }}>{q.assignedTo.name}</span></div> : <span style={{ fontSize: 12, color: "#BDBDBD" }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "#7A7A7A" }}>{new Date(q.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <button onClick={e => { e.stopPropagation(); openEdit(q); }} style={{ background: "none", border: "1px solid #E0E0E0", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Edit3 size={11} /> Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={FileText} title="Không có báo giá" message="Chưa có báo giá nào phù hợp bộ lọc" />}
        </div>
      </div>

      {/* Detail Panel */}
      {displayQuote && (
        <div className="animate-slideIn" style={{ width: 560, borderLeft: "1px solid #E0E0E0", background: "white", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Modal Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: "#4A7C1F" }}>{displayQuote.id}</span>
            <StatusBadge status={displayQuote.status} />
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              {!editMode ? (
                <>
                  <button onClick={() => openEdit(displayQuote)} style={{ padding: "6px 12px", border: "1px solid #E0E0E0", borderRadius: 6, background: "none", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Edit3 size={12} /> Chỉnh sửa
                  </button>
                  <button onClick={() => setConfirmCancel(true)} style={{ padding: "6px 12px", border: "1px solid #FFCDD2", borderRadius: 6, background: "none", color: "#C62828", fontSize: 12, cursor: "pointer" }}>Hủy BG</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(false)} style={{ padding: "6px 12px", border: "1px solid #E0E0E0", borderRadius: 6, background: "none", fontSize: 12, cursor: "pointer" }}>Hủy</button>
                  <button onClick={handleSave} style={{ padding: "6px 12px", background: "#6DB02B", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Lưu</button>
                </>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Customer Info */}
            <div style={{ background: "#F5F5F5", borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Thông tin khách hàng</p>
              {editMode ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[["name", "Tên công ty"], ["contact", "Người liên hệ"], ["phone", "SĐT"], ["email", "Email"], ["project", "Dự án"]].map(([k, l]) => (
                    <div key={k} style={{ gridColumn: k === "project" ? "1 / -1" : "auto" }}>
                      <label style={{ fontSize: 10, color: "#7A7A7A", display: "block", marginBottom: 2 }}>{l}</label>
                      <input value={editQuote.customerInfo[k] || ""} onChange={e => setEditQuote(p => ({ ...p, customerInfo: { ...p.customerInfo, [k]: e.target.value } }))}
                        style={{ width: "100%", border: "1px solid #E0E0E0", borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  <div><p style={{ fontSize: 11, color: "#7A7A7A" }}>Công ty</p><p style={{ fontSize: 13, fontWeight: 600 }}>{displayQuote.customerInfo.name}</p></div>
                  <div><p style={{ fontSize: 11, color: "#7A7A7A" }}>Người LH</p><p style={{ fontSize: 13 }}>{displayQuote.customerInfo.contact}</p></div>
                  <div><p style={{ fontSize: 11, color: "#7A7A7A" }}>SĐT</p><p style={{ fontSize: 13 }}>{displayQuote.customerInfo.phone}</p></div>
                  {displayQuote.customerInfo.email && <div><p style={{ fontSize: 11, color: "#7A7A7A" }}>Email</p><p style={{ fontSize: 13 }}>{displayQuote.customerInfo.email}</p></div>}
                  {displayQuote.customerInfo.project && <div style={{ gridColumn: "1 / -1" }}><p style={{ fontSize: 11, color: "#7A7A7A" }}>Dự án</p><p style={{ fontSize: 13, fontWeight: 500 }}>{displayQuote.customerInfo.project}</p></div>}
                </div>
              )}
            </div>

            {/* Line Items */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Danh mục sản phẩm</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#F4FAE8" }}>
                    {["STT", "Sản phẩm", "SKU", "SL", "ĐV", "Đơn giá", "Thành tiền", ...(editMode ? [""] : [])].map(h => (
                      <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4A7C1F" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(editMode ? editQuote : displayQuote).lineItems.map((li, i) => (
                    <tr key={li.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                      <td style={{ padding: "8px" }}>{i + 1}</td>
                      <td style={{ padding: "8px" }}>{editMode ? <input value={li.productName} onChange={e => updateLineItem(li.id, "productName", e.target.value)} style={{ border: "1px solid #E0E0E0", borderRadius: 4, padding: "3px 6px", fontSize: 11, width: 140, outline: "none" }} /> : li.productName}</td>
                      <td style={{ padding: "8px" }}><span className="font-mono" style={{ fontSize: 10, background: "#F5F5F5", padding: "2px 4px", borderRadius: 3 }}>{li.sku}</span></td>
                      <td style={{ padding: "8px" }}>{editMode ? <input type="number" value={li.quantity} onChange={e => updateLineItem(li.id, "quantity", e.target.value)} style={{ border: "1px solid #E0E0E0", borderRadius: 4, padding: "3px 4px", width: 50, fontSize: 11, outline: "none" }} /> : li.quantity}</td>
                      <td style={{ padding: "8px", color: "#7A7A7A" }}>{li.unit}</td>
                      <td style={{ padding: "8px" }}>{editMode ? <input type="number" value={li.unitPrice} onChange={e => updateLineItem(li.id, "unitPrice", e.target.value)} style={{ border: "1px solid #E0E0E0", borderRadius: 4, padding: "3px 4px", width: 70, fontSize: 11, outline: "none" }} /> : <span className="font-mono">{li.unitPrice.toLocaleString("vi-VN")}</span>}</td>
                      <td style={{ padding: "8px" }}><span className="font-mono" style={{ fontWeight: 600, color: "#1C1C1C" }}>{li.subtotal.toLocaleString("vi-VN")}</span></td>
                      {editMode && <td style={{ padding: "8px" }}><button onClick={() => removeLineItem(li.id)} style={{ color: "#C62828", background: "none", border: "none", cursor: "pointer" }}><Trash2 size={12} /></button></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
              {editMode && (
                <button onClick={addLineItem} style={{ width: "100%", marginTop: 8, border: "1px dashed #C5E09A", borderRadius: 6, padding: "6px", fontSize: 12, color: "#6DB02B", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Plus size={12} /> Thêm dòng
                </button>
              )}
            </div>

            {/* Calculation Summary */}
            <div style={{ background: "#F5F5F5", borderRadius: 10, padding: 14 }}>
              {[["Tạm tính", displayQuote.subtotal], ["Chiết khấu", -displayQuote.discountAmount], [`VAT (${displayQuote.taxPercent}%)`, displayQuote.taxAmount]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13, color: "#4A4A4A" }}>
                  <span>{label}</span>
                  <span className="font-mono">{(val < 0 ? "-" : "") + Math.abs(val).toLocaleString("vi-VN")} đ</span>
                </div>
              ))}
              {editMode && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                  <span style={{ fontSize: 13, color: "#4A4A4A" }}>Chiết khấu (%)</span>
                  <input type="number" min="0" max="100" value={editQuote.discountPercent}
                    onChange={e => setEditQuote(p => recalculate({ ...p, discountPercent: Number(e.target.value) }))}
                    style={{ width: 60, border: "1px solid #E0E0E0", borderRadius: 4, padding: "3px 6px", fontSize: 12, outline: "none", marginLeft: "auto" }} />
                  <span style={{ fontSize: 12, color: "#7A7A7A" }}>%</span>
                </div>
              )}
              <div style={{ borderTop: "1px solid #E0E0E0", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Lexend", fontWeight: 700, fontSize: 15 }}>TỔNG CỘNG</span>
                <span className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: "#E8380D" }}>{formatVND(displayQuote.total)}</span>
              </div>
            </div>

            {/* Assign Sales */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Giao cho Sales</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {mockUsers.filter(u => u.role === "sales" && u.status === "active").map(u => (
                  <button key={u.id} onClick={() => handleAssign(u)} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8,
                    border: `1px solid ${displayQuote.assignedTo?.id === u.id ? "#6DB02B" : "#E0E0E0"}`,
                    background: displayQuote.assignedTo?.id === u.id ? "#F4FAE8" : "white",
                    cursor: "pointer", fontSize: 12, fontWeight: displayQuote.assignedTo?.id === u.id ? 600 : 400,
                  }}>
                    <UserAvatar user={u} size={22} />
                    {u.name}
                    {displayQuote.assignedTo?.id === u.id && <CheckCircle size={12} style={{ color: "#6DB02B" }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes & Validity */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: "#7A7A7A", marginBottom: 4 }}>Ghi chú</p>
                {editMode ? (
                  <textarea value={editQuote.notes || ""} onChange={e => setEditQuote(p => ({ ...p, notes: e.target.value }))}
                    rows={2} style={{ width: "100%", border: "1px solid #E0E0E0", borderRadius: 6, padding: "6px 8px", fontSize: 12, outline: "none", resize: "none" }} />
                ) : <p style={{ fontSize: 12, color: "#4A4A4A" }}>{displayQuote.notes || "—"}</p>}
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#7A7A7A", marginBottom: 4 }}>Hiệu lực</p>
                {editMode ? (
                  <input type="number" value={editQuote.validityDays} onChange={e => setEditQuote(p => ({ ...p, validityDays: Number(e.target.value) }))}
                    style={{ width: 60, border: "1px solid #E0E0E0", borderRadius: 6, padding: "6px 8px", fontSize: 12, outline: "none" }} />
                ) : <p style={{ fontSize: 12, fontWeight: 600, color: "#4A7C1F" }}>{displayQuote.validityDays} ngày</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={confirmCancel} title="Hủy báo giá?" message="Hành động này không thể hoàn tác. Báo giá sẽ bị đánh dấu là đã hủy."
        onConfirm={() => { setQuotes(prev => prev.map(q => q.id === selectedQuote.id ? { ...q, status: "cancelled" } : q)); setSelectedQuote(p => ({ ...p, status: "cancelled" })); setConfirmCancel(false); addToast("Đã hủy báo giá", "error"); }}
        onCancel={() => setConfirmCancel(false)} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 5: KB MANAGER
// ═══════════════════════════════════════════════════════════════════════
const KBManager = ({ addToast }) => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [isDragOver, setIsDragOver] = useState(false);
  const [showChunkExplorer, setShowChunkExplorer] = useState(false);
  const [chunkSearch, setChunkSearch] = useState("");
  const [chunks, setChunks] = useState(mockChunks);
  const [pipelineSteps, setPipelineSteps] = useState({});

  const categories = ["Tất cả", "Cách nhiệt", "Tiêu âm", "Cách âm", "Chống cháy", "Bảng giá"];

  const filtered = documents.filter(d => activeCategory === "Tất cả" || d.category === activeCategory);
  const filteredChunks = chunks.filter(c => c.content.toLowerCase().includes(chunkSearch.toLowerCase()) || c.docName.toLowerCase().includes(chunkSearch.toLowerCase()));

  const simulateUpload = () => {
    const newDoc = {
      id: `doc-${Date.now()}`, fileName: `Catalogue_Moi_${Date.now().toString().slice(-4)}.pdf`,
      fileType: "pdf", fileSize: 3145728, category: "Cách nhiệt",
      tags: ["Mới"], status: "uploading", version: 1, uploadedBy: "Trần Hùng", uploadedAt: new Date().toISOString(),
    };
    setDocuments(prev => [newDoc, ...prev]);
    setDocuments(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: "uploading" } : d));

    setTimeout(() => {
      setDocuments(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: "processing" } : d));
      setPipelineSteps(p => ({ ...p, [newDoc.id]: 0 }));

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setPipelineSteps(p => ({ ...p, [newDoc.id]: step }));
        if (step >= 4) {
          clearInterval(interval);
          setDocuments(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: "active", chunkCount: 47 } : d));
          setPipelineSteps(p => { const np = { ...p }; delete np[newDoc.id]; return np; });
          addToast("Tài liệu đã được xử lý thành công (47 chunks)", "success");
        }
      }, 1000);
    }, 2000);

    addToast("Đang tải tài liệu lên...", "info");
  };

  const getFileIcon = (type) => {
    const icons = { pdf: "📄", excel: "📊", docx: "📝", url: "🔗" };
    return icons[type] || "📁";
  };

  const PipelineIndicator = ({ docId }) => {
    const step = pipelineSteps[docId] || 0;
    const steps = ["Parse", "Chunk", "Embed", "Index"];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: i < step ? "#6DB02B" : i === step ? "#F9A825" : "#E0E0E0", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
              {i < step && <span style={{ color: "white", fontSize: 8 }}>✓</span>}
              {i === step && <span style={{ color: "white", fontSize: 7, animation: "pulse 1s infinite" }}>●</span>}
            </div>
            <span style={{ color: i <= step ? "#4A7C1F" : "#BDBDBD", fontWeight: i <= step ? 600 : 400 }}>{s}</span>
            {i < 3 && <span style={{ color: "#BDBDBD" }}>─</span>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={e => { e.preventDefault(); setIsDragOver(false); simulateUpload(); }}
        onClick={simulateUpload}
        style={{
          border: `2px ${isDragOver ? "solid" : "dashed"} ${isDragOver ? "#6DB02B" : "#C5E09A"}`,
          borderRadius: 12, padding: "28px 20px", textAlign: "center",
          background: isDragOver ? "#E8F4D0" : "#F4FAE8",
          cursor: "pointer", transition: "all 0.2s",
        }}>
        <Upload size={32} style={{ color: "#6DB02B", marginBottom: 8 }} />
        <p style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600, color: "#2D5016" }}>Kéo thả file hoặc click để chọn</p>
        <p style={{ fontSize: 12, color: "#7A7A7A", marginTop: 4 }}>PDF, DOCX, Excel, URL – Tối đa 50MB</p>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: "6px 14px", borderRadius: 999, border: `1px solid ${activeCategory === cat ? "#6DB02B" : "#E0E0E0"}`,
            background: activeCategory === cat ? "#6DB02B" : "white", color: activeCategory === cat ? "white" : "#4A4A4A",
            fontSize: 12, cursor: "pointer", fontWeight: activeCategory === cat ? 600 : 400,
          }}>{cat}</button>
        ))}
        <button onClick={() => setShowChunkExplorer(!showChunkExplorer)} style={{
          marginLeft: "auto", padding: "6px 14px", borderRadius: 6, border: `1px solid ${showChunkExplorer ? "#6DB02B" : "#E0E0E0"}`,
          background: showChunkExplorer ? "#F4FAE8" : "white", color: showChunkExplorer ? "#4A7C1F" : "#4A4A4A", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
        }}>
          <Layers size={12} /> Chunk Explorer
        </button>
      </div>

      {/* Document Table */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #E0E0E0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F4FAE8", borderBottom: "1px solid #E0E0E0" }}>
              {["File", "Loại", "Danh mục", "Tags", "Trạng thái", "Chunks", "Upload bởi", "Ngày", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#4A7C1F", fontFamily: "Lexend" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(doc => (
              <tr key={doc.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{getFileIcon(doc.fileType)}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500 }}>{doc.fileName}</p>
                      <p style={{ fontSize: 11, color: "#7A7A7A" }}>{formatBytes(doc.fileSize)}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}><span className="font-mono" style={{ fontSize: 11, background: "#F5F5F5", padding: "2px 6px", borderRadius: 4 }}>{doc.fileType.toUpperCase()}</span></td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{doc.category}</td>
                <td style={{ padding: "12px 14px" }}><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{doc.tags.map(t => <span key={t} style={{ fontSize: 10, background: "#E8F4D0", color: "#4A7C1F", padding: "1px 6px", borderRadius: 999 }}>{t}</span>)}</div></td>
                <td style={{ padding: "12px 14px" }}>
                  {doc.status === "processing" && pipelineSteps[doc.id] !== undefined ? (
                    <PipelineIndicator docId={doc.id} />
                  ) : (
                    <div style={{ position: "relative" }}>
                      <StatusBadge status={doc.status} />
                      {doc.status === "error" && (
                        <div style={{ position: "absolute", left: 0, top: "100%", zIndex: 10, background: "white", border: "1px solid #FFCDD2", borderRadius: 6, padding: "6px 10px", fontSize: 11, color: "#C62828", width: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginTop: 2 }}>
                          {doc.errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                  {doc.status === "uploading" && (
                    <div style={{ width: 80, height: 4, background: "#E0E0E0", borderRadius: 999, marginTop: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "#6DB02B", borderRadius: 999 }} className="progress-animate" />
                    </div>
                  )}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  {doc.chunkCount ? <span className="font-mono" style={{ fontSize: 12, color: "#4A7C1F", fontWeight: 600 }}>{doc.chunkCount}</span> : <span style={{ color: "#BDBDBD", fontSize: 12 }}>—</span>}
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{doc.uploadedBy}</td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#7A7A7A" }}>{new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => addToast("Đã lưu trữ tài liệu", "success")} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #E0E0E0", background: "none", fontSize: 10, cursor: "pointer" }}>Archive</button>
                    <button onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid #FFCDD2", background: "none", color: "#C62828", fontSize: 10, cursor: "pointer" }}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon={BookOpen} title="Chưa có tài liệu" message="Kéo thả file vào vùng upload bên trên" />}
      </div>

      {/* Chunk Explorer */}
      {showChunkExplorer && (
        <div className="animate-fadeIn" style={{ background: "white", borderRadius: 12, border: "1px solid #E0E0E0", padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "Lexend", fontSize: 15, fontWeight: 600 }}>Chunk Explorer</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#F5F5F5", borderRadius: 8, padding: "6px 10px" }}>
              <Search size={14} style={{ color: "#7A7A7A" }} />
              <input value={chunkSearch} onChange={e => setChunkSearch(e.target.value)} placeholder="Tìm trong nội dung chunks..." style={{ border: "none", background: "none", outline: "none", fontSize: 12, width: 220 }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredChunks.map(chunk => (
              <div key={chunk.id} style={{
                padding: "12px 14px", borderRadius: 8,
                borderLeft: `3px solid ${chunk.relevant === true ? "#6DB02B" : chunk.relevant === false ? "#C62828" : "#E0E0E0"}`,
                background: chunk.relevant === true ? "#F4FAE8" : chunk.relevant === false ? "#FFEBEE" : "#F5F5F5",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                    <span className="font-mono" style={{ fontSize: 10, background: "white", border: "1px solid #E0E0E0", padding: "1px 6px", borderRadius: 4 }}>{chunk.id}</span>
                    <span style={{ fontSize: 11, color: "#7A7A7A" }}>{chunk.docName}</span>
                    <span className="font-mono" style={{ fontSize: 10, color: "#4A7C1F", marginLeft: "auto" }}>Score: {chunk.score}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#4A4A4A", lineHeight: 1.5 }}>{chunk.content}</p>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button onClick={() => setChunks(prev => prev.map(c => c.id === chunk.id ? { ...c, relevant: true } : c))} style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: chunk.relevant === true ? "#6DB02B" : "#E0E0E0", color: chunk.relevant === true ? "white" : "#4A4A4A", cursor: "pointer" }}>
                    <ThumbsUp size={12} />
                  </button>
                  <button onClick={() => setChunks(prev => prev.map(c => c.id === chunk.id ? { ...c, relevant: false } : c))} style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: chunk.relevant === false ? "#C62828" : "#E0E0E0", color: chunk.relevant === false ? "white" : "#4A4A4A", cursor: "pointer" }}>
                    <ThumbsDown size={12} />
                  </button>
                </div>
              </div>
            ))}
            {filteredChunks.length === 0 && <p style={{ textAlign: "center", color: "#7A7A7A", fontSize: 13, padding: 20 }}>Không tìm thấy chunk phù hợp</p>}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 6: PROMPT MANAGER
// ═══════════════════════════════════════════════════════════════════════
const PromptManager = ({ addToast }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(mockPrompts[0]);
  const [activeTab, setActiveTab] = useState("editor");
  const [editContent, setEditContent] = useState(mockPrompts[0].content);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [diffVersionA, setDiffVersionA] = useState(2);
  const [diffVersionB, setDiffVersionB] = useState(3);

  const handleSelectPrompt = (p) => {
    setSelectedPrompt(p);
    setEditContent(p.content);
    setTestOutput(null);
    setActiveTab("editor");
  };

  const handleRunTest = () => {
    if (!testInput.trim()) return;
    setIsTesting(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestOutput({
        content: `Dựa trên câu hỏi của bạn về "${testInput}", tôi tra cứu từ Knowledge Base của Remak và tìm thấy thông tin sau:\n\n**Remak® Stonewool 75mm** là giải pháp phù hợp nhất với:\n- R-value: 1.87 m²K/W\n- Fire Rating: A1 (EN 13501-1)\n- Phù hợp cho nhà xưởng, kho hàng có yêu cầu cách nhiệt cao\n\n*Nguồn: Catalogue Stonewool 2024, Trang 12*`,
        latency: "1.24s", tokens: 312, agent: "Technical Agent",
      });
    }, 1500);
  };

  const promptTypeLabels = { system_prompt: "System", technical_prompt: "Technical", pricing_prompt: "Pricing", handoff_prompt: "Handoff", greeting_prompt: "Greeting" };
  const versions = promptVersions[selectedPrompt.id] || [{ version: selectedPrompt.version, date: selectedPrompt.lastModified, content: selectedPrompt.content }];

  const renderDiff = (v1, v2) => {
    const lines1 = v1.content.split("\n");
    const lines2 = v2.content.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    return Array.from({ length: maxLen }, (_, i) => ({
      left: lines1[i] || "", right: lines2[i] || "",
      changed: lines1[i] !== lines2[i],
    }));
  };

  const vA = versions.find(v => v.version === diffVersionA) || versions[0];
  const vB = versions.find(v => v.version === diffVersionB) || versions[versions.length - 1];
  const diffLines = renderDiff(vA, vB);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden", background: "#FAFAFA" }}>
      {/* Left: Prompt List */}
      <div style={{ width: 280, background: "white", borderRight: "1px solid #E0E0E0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F0F0" }}>
          <h3 style={{ fontFamily: "Lexend", fontSize: 14, fontWeight: 700, color: "#2D5016" }}>Prompt Store</h3>
          <p style={{ fontSize: 11, color: "#7A7A7A", marginTop: 2 }}>{mockPrompts.length} prompts</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
          {mockPrompts.map(p => (
            <button key={p.id} onClick={() => handleSelectPrompt(p)} style={{
              width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: selectedPrompt.id === p.id ? "#F4FAE8" : "transparent",
              borderLeft: selectedPrompt.id === p.id ? "3px solid #6DB02B" : "3px solid transparent",
              marginBottom: 2,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: 13, fontWeight: selectedPrompt.id === p.id ? 600 : 400, color: selectedPrompt.id === p.id ? "#2D5016" : "#1C1C1C" }}>{p.name}</p>
                <span style={{ fontSize: 10, background: "#F5F5F5", color: "#7A7A7A", padding: "1px 5px", borderRadius: 4, fontFamily: "JetBrains Mono" }}>v{p.version}</span>
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 10, background: "#E8F4D0", color: "#4A7C1F", padding: "1px 6px", borderRadius: 999 }}>{promptTypeLabels[p.type]}</span>
                <span style={{ fontSize: 10, color: "#BDBDBD" }}>· {p.lastModified}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Editor */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Tabs */}
        <div style={{ background: "white", borderBottom: "1px solid #E0E0E0", padding: "0 20px", display: "flex", gap: 0, flexShrink: 0 }}>
          {[["editor", "Editor"], ["playground", "Playground"], ["history", "Version History"], ["diff", "Diff Viewer"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === id ? 600 : 400,
              color: activeTab === id ? "#4A7C1F" : "#7A7A7A",
              borderBottom: activeTab === id ? "2px solid #6DB02B" : "2px solid transparent",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {/* EDITOR TAB */}
          {activeTab === "editor" && (
            <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Tên Prompt</label>
                  <input defaultValue={selectedPrompt.name} style={{ width: "100%", border: "1px solid #E0E0E0", borderRadius: 8, padding: "8px 12px", fontSize: 14, outline: "none", fontFamily: "Lexend", fontWeight: 500 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Loại</label>
                  <select defaultValue={selectedPrompt.type} style={{ border: "1px solid #E0E0E0", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none", background: "white" }}>
                    {Object.entries(promptTypeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ background: "#F5F5F5", borderRadius: 8, padding: "6px 12px", fontSize: 11, color: "#4A7C1F" }}>
                <strong>Variables:</strong> {"{{"}<span className="font-mono">customer_name</span>{"}}"}, {"{{"}<span className="font-mono">product_list</span>{"}}"}, {"{{"}<span className="font-mono">use_case</span>{"}}"}, {"{{"}<span className="font-mono">handoff_reason</span>{"}}"}
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#7A7A7A", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Nội dung Prompt</label>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={16}
                  className="font-mono"
                  style={{
                    width: "100%", border: "1px solid #E0E0E0", borderRadius: 8, padding: "12px 14px",
                    fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.6,
                    background: "#FAFFFE",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button style={{ padding: "8px 16px", border: "1px solid #E0E0E0", borderRadius: 8, background: "none", fontSize: 13, cursor: "pointer" }}>Lưu nháp</button>
                <button onClick={() => addToast(`Prompt "${selectedPrompt.name}" đã được publish (v${selectedPrompt.version + 1})`, "success")} style={{ padding: "8px 20px", background: "#6DB02B", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  🚀 Publish v{selectedPrompt.version + 1}
                </button>
              </div>
            </div>
          )}

          {/* PLAYGROUND TAB */}
          {activeTab === "playground" && (
            <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#F5F5F5", borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 12, color: "#7A7A7A", marginBottom: 6 }}>Đang test: <strong style={{ color: "#2D5016" }}>{selectedPrompt.name}</strong></p>
                <textarea
                  value={testInput}
                  onChange={e => setTestInput(e.target.value)}
                  placeholder="Nhập câu hỏi test, ví dụ: 'Stonewool 50mm hay 75mm phù hợp hơn cho mái tôn nhà xưởng?'"
                  rows={4}
                  style={{ width: "100%", border: "1px solid #E0E0E0", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button onClick={handleRunTest} disabled={!testInput.trim()} style={{
                    padding: "8px 20px", background: testInput.trim() ? "#6DB02B" : "#E0E0E0", color: "white",
                    border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: testInput.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Play size={14} /> Chạy test
                  </button>
                </div>
              </div>

              {isTesting && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 14 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => <div key={i} className={`dot${i + 1}`} style={{ width: 8, height: 8, borderRadius: "50%", background: "#6DB02B" }} />)}
                  </div>
                  <span style={{ fontSize: 13, color: "#7A7A7A" }}>AI đang xử lý...</span>
                </div>
              )}

              {testOutput && (
                <div className="animate-fadeIn" style={{ background: "white", border: "1px solid #E8F4D0", borderRadius: 12, padding: 16, borderLeft: "3px solid #6DB02B" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 11, background: "#E8F4D0", color: "#4A7C1F", padding: "2px 8px", borderRadius: 999, fontWeight: 600 }}>⚡ {testOutput.agent}</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "#7A7A7A" }}>⏱ {testOutput.latency}</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "#7A7A7A" }}>🔤 {testOutput.tokens} tokens</span>
                  </div>
                  <MarkdownText content={testOutput.content} />
                </div>
              )}
            </div>
          )}

          {/* VERSION HISTORY TAB */}
          {activeTab === "history" && (
            <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "#7A7A7A" }}>Lịch sử phiên bản của <strong>{selectedPrompt.name}</strong></p>
              {versions.map((v, i) => (
                <div key={v.version} style={{
                  background: "white", borderRadius: 10, border: `1px solid ${i === 0 ? "#C5E09A" : "#E0E0E0"}`,
                  padding: 14, display: "flex", gap: 12,
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? "#4A7C1F" : "#7A7A7A" }}>v{v.version}</span>
                    {i === 0 && <span style={{ fontSize: 10, background: "#6DB02B", color: "white", padding: "1px 5px", borderRadius: 999, display: "block", marginTop: 2, textAlign: "center" }}>current</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: "#7A7A7A", marginBottom: 6 }}>{v.date}</p>
                    <p className="font-mono" style={{ fontSize: 11, color: "#4A4A4A", background: "#F5F5F5", padding: "6px 8px", borderRadius: 6, whiteSpace: "pre-wrap", maxHeight: 60, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {v.content.substring(0, 120)}...
                    </p>
                  </div>
                  {i > 0 && (
                    <button onClick={() => { setEditContent(v.content); setActiveTab("editor"); addToast(`Đã rollback về v${v.version}`, "success"); }} style={{ padding: "6px 12px", border: "1px solid #E0E0E0", borderRadius: 6, background: "none", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, height: "fit-content" }}>
                      <RotateCcw size={11} /> Rollback
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* DIFF VIEWER TAB */}
          {activeTab === "diff" && (
            <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div>
                  <label style={{ fontSize: 11, color: "#7A7A7A", display: "block", marginBottom: 4 }}>Version A</label>
                  <select value={diffVersionA} onChange={e => setDiffVersionA(Number(e.target.value))} style={{ border: "1px solid #E0E0E0", borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none" }}>
                    {versions.map(v => <option key={v.version} value={v.version}>v{v.version} – {v.date}</option>)}
                  </select>
                </div>
                <GitCompare size={20} style={{ color: "#7A7A7A", marginTop: 14 }} />
                <div>
                  <label style={{ fontSize: 11, color: "#7A7A7A", display: "block", marginBottom: 4 }}>Version B</label>
                  <select value={diffVersionB} onChange={e => setDiffVersionB(Number(e.target.value))} style={{ border: "1px solid #E0E0E0", borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none" }}>
                    {versions.map(v => <option key={v.version} value={v.version}>v{v.version} – {v.date}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "white", borderRadius: 10, border: "1px solid #E0E0E0", overflow: "hidden" }}>
                <div style={{ borderRight: "1px solid #E0E0E0" }}>
                  <div style={{ padding: "8px 12px", background: "#FFEBEE", fontSize: 12, fontWeight: 600, color: "#C62828" }}>v{diffVersionA} – {vA.date}</div>
                  {diffLines.map((line, i) => (
                    <div key={i} className={line.changed ? "diff-removed" : ""} style={{ display: "flex", gap: 8, padding: "3px 10px" }}>
                      <span className="font-mono" style={{ fontSize: 10, color: "#BDBDBD", width: 20, flexShrink: 0, textAlign: "right" }}>{i + 1}</span>
                      <span className="font-mono" style={{ fontSize: 11, whiteSpace: "pre-wrap", color: "#4A4A4A" }}>{line.left || " "}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ padding: "8px 12px", background: "#E8F5E9", fontSize: 12, fontWeight: 600, color: "#2E7D32" }}>v{diffVersionB} – {vB.date}</div>
                  {diffLines.map((line, i) => (
                    <div key={i} className={line.changed ? "diff-added" : ""} style={{ display: "flex", gap: 8, padding: "3px 10px" }}>
                      <span className="font-mono" style={{ fontSize: 10, color: "#BDBDBD", width: 20, flexShrink: 0, textAlign: "right" }}>{i + 1}</span>
                      <span className="font-mono" style={{ fontSize: 11, whiteSpace: "pre-wrap", color: "#4A4A4A" }}>{line.right || " "}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// PRODUCTS PAGE (basic)
// ═══════════════════════════════════════════════════════════════════════
const ProductsPage = ({ addToast }) => {
  const [search, setSearch] = useState("");
  const products = mockDocuments; // reuse for layout
  const cats = ["Tất cả", "Cách nhiệt", "Tiêu âm", "Cách âm", "Chống cháy"];
  const [cat, setCat] = useState("Tất cả");

  const allProducts = [
    { sku: "SW-50", name: "Remak® Stonewool 50mm", category: "Cách nhiệt", price: 85000, unit: "m²", specs: { "R-value": "1.25", "Fire Rating": "A1", NRC: "0.75", thickness: "50mm", density: "60 kg/m³" }, status: "active", tags: ["mái tôn", "nhà xưởng"] },
    { sku: "SW-75", name: "Remak® Stonewool 75mm", category: "Cách nhiệt", price: 115000, unit: "m²", specs: { "R-value": "1.87", "Fire Rating": "A1", NRC: "0.80", thickness: "75mm", density: "60 kg/m³" }, status: "active", tags: ["mái tôn", "lò nung"] },
    { sku: "ME-30", name: "Mút trứng Remak® 30mm", category: "Tiêu âm", price: 45000, unit: "m²", specs: { NRC: "0.85", thickness: "30mm", STC: "28" }, status: "active", tags: ["phòng thu", "studio"] },
    { sku: "AR-50", name: "Remak® AirReflex 50mm", category: "Cách nhiệt", price: 95000, unit: "m²", specs: { "R-value": "1.45", thickness: "50mm", "U-value": "0.69" }, status: "active", tags: ["mái", "tường"] },
  ];

  const filtered = allProducts.filter(p => (cat === "Tất cả" || p.category === cat) && (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", background: "white", borderRadius: 8, padding: "6px 10px", border: "1px solid #E0E0E0", flex: 1, maxWidth: 280 }}>
          <Search size={14} style={{ color: "#7A7A7A" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm..." style={{ border: "none", background: "none", outline: "none", fontSize: 13, flex: 1 }} />
        </div>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${cat === c ? "#6DB02B" : "#E0E0E0"}`, background: cat === c ? "#6DB02B" : "white", color: cat === c ? "white" : "#4A4A4A", fontSize: 12, cursor: "pointer" }}>{c}</button>
        ))}
        <button onClick={() => addToast("Import CSV sẽ được hỗ trợ trong bản production", "info")} style={{ marginLeft: "auto", background: "#6DB02B", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          + Import CSV
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map(p => (
          <div key={p.sku} className="card-hover" style={{ background: "white", borderRadius: 12, border: "1px solid #E0E0E0", padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span className="font-mono" style={{ fontSize: 11, background: "#F4FAE8", color: "#4A7C1F", padding: "2px 8px", borderRadius: 4 }}>{p.sku}</span>
              <StatusBadge status={p.status} />
            </div>
            <h3 style={{ fontFamily: "Lexend", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.name}</h3>
            <p style={{ fontSize: 11, color: "#7A7A7A", marginBottom: 10 }}>{p.category}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
              {Object.entries(p.specs).slice(0, 4).map(([k, v]) => <TechSpecBadge key={k} label={k} value={v} />)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F0F0F0", paddingTop: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#E8380D" }}>{formatVND(p.price)}/{p.unit}</span>
              <button style={{ background: "#6DB02B", color: "white", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// USER MANAGEMENT PAGE
// ═══════════════════════════════════════════════════════════════════════
const UsersPage = ({ addToast }) => {
  const [users, setUsers] = useState(mockUsers);
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter(u => roleFilter === "all" || u.role === roleFilter);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
        {[["all", "Tất cả"], ["admin", "Admin"], ["trainer", "Trainer"], ["sales", "Sales"], ["cs", "CS"]].map(([v, l]) => (
          <button key={v} onClick={() => setRoleFilter(v)} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${roleFilter === v ? "#6DB02B" : "#E0E0E0"}`, background: roleFilter === v ? "#6DB02B" : "white", color: roleFilter === v ? "white" : "#4A4A4A", fontSize: 12, cursor: "pointer" }}>{l}</button>
        ))}
        <button onClick={() => addToast("Tính năng thêm user sẽ có trong bản production", "info")} style={{ marginLeft: "auto", background: "#6DB02B", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          + Thêm người dùng
        </button>
      </div>
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #E0E0E0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F4FAE8" }}>
              {["Người dùng", "Email", "Vai trò", "Trạng thái", "Quyền truy cập", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#4A7C1F", fontFamily: "Lexend" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => {
              const rbac = {
                admin: ["Dashboard", "KB", "Prompts", "Quotes", "Conversations", "Users", "Config"],
                trainer: ["Dashboard", "KB", "Prompts", "Conversations"],
                sales: ["Dashboard", "Quotes", "Conversations"],
                cs: ["Dashboard", "Conversations"],
              };
              return (
                <tr key={user.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <UserAvatar user={user} size={36} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#7A7A7A" }}>{user.email}</td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={user.role} /></td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={user.status} /></td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {(rbac[user.role] || []).map(m => (
                        <span key={m} style={{ fontSize: 10, background: "#F4FAE8", color: "#4A7C1F", padding: "1px 6px", borderRadius: 4 }}>{m}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => addToast(`Chỉnh sửa user ${user.name}`, "info")} style={{ padding: "4px 10px", border: "1px solid #E0E0E0", borderRadius: 6, background: "none", fontSize: 11, cursor: "pointer" }}>Sửa</button>
                      {user.status === "active" ? (
                        <button onClick={() => { setUsers(p => p.map(u => u.id === user.id ? { ...u, status: "inactive" } : u)); addToast(`Đã vô hiệu hóa ${user.name}`, "success"); }} style={{ padding: "4px 10px", border: "1px solid #FFCDD2", borderRadius: 6, background: "none", color: "#C62828", fontSize: 11, cursor: "pointer" }}>Khóa</button>
                      ) : (
                        <button onClick={() => { setUsers(p => p.map(u => u.id === user.id ? { ...u, status: "active" } : u)); addToast(`Đã mở khóa ${user.name}`, "success"); }} style={{ padding: "4px 10px", border: "1px solid #C5E09A", borderRadius: 6, background: "none", color: "#4A7C1F", fontSize: 11, cursor: "pointer" }}>Mở khóa</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════
export default function RemakChatbotApp() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [toasts, setToasts] = useState([]);
  const currentUser = mockUsers[0]; // Admin

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const pageConfig = {
    dashboard: { title: "Dashboard Tổng quan", component: <AdminDashboard addToast={addToast} /> },
    conversations: { title: "Quản lý Hội thoại", component: <ConversationManager addToast={addToast} /> },
    products: { title: "Danh mục Sản phẩm", component: <ProductsPage addToast={addToast} /> },
    quotes: { title: "Quản lý Báo giá", component: <QuoteManager addToast={addToast} /> },
    knowledge: { title: "Knowledge Base Manager", component: <KBManager addToast={addToast} /> },
    prompts: { title: "Prompt Manager", component: <PromptManager addToast={addToast} /> },
    users: { title: "Quản lý Người dùng", component: <UsersPage addToast={addToast} /> },
  };

  const { title, component } = pageConfig[activeScreen] || pageConfig.dashboard;

  return (
    <>
      <FontInjector />
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FAFAFA" }}>
        <Sidebar activeItem={activeScreen} onNavigate={setActiveScreen} currentUser={currentUser} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <TopBar pageTitle={title} currentUser={currentUser} notificationCount={3} toasts={toasts} removeToast={removeToast} />
          <div style={{ flex: 1, overflowY: activeScreen === "conversations" || activeScreen === "quotes" || activeScreen === "prompts" ? "hidden" : "auto" }}>
            {component}
          </div>
        </div>
      </div>
      {/* Chat Widget always visible */}
      <ChatWidget addToast={addToast} />
    </>
  );
}
