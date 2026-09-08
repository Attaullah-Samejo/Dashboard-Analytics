import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dashboardPeriod, setDashboardPeriod] = useState("Last 30 Days");
const [dashboardPeriodOpen, setDashboardPeriodOpen] = useState(false);
const dashboardData = {
  "Today": {
    revenue: "$1,248.60",
    revenueGrowth: "+4.2%",
    customers: "428",
    customerGrowth: "+2.8%",
    orders: "52",
    orderGrowth: "+3.4%",
    conversion: "5.92%",
    conversionGrowth: "+1.2%",
  },

  "Last 7 Days": {
    revenue: "$6,842.20",
    revenueGrowth: "+8.7%",
    customers: "2,184",
    customerGrowth: "+5.6%",
    orders: "318",
    orderGrowth: "+6.2%",
    conversion: "6.24%",
    conversionGrowth: "+1.8%",
  },

  "Last 30 Days": {
    revenue: "$24,892.40",
    revenueGrowth: "+12.6%",
    customers: "12,482",
    customerGrowth: "+8.4%",
    orders: "1,429",
    orderGrowth: "+5.7%",
    conversion: "6.84%",
    conversionGrowth: "+2.1%",
  },

  "Last 90 Days": {
    revenue: "$72,481.80",
    revenueGrowth: "+18.9%",
    customers: "31,842",
    customerGrowth: "+14.2%",
    orders: "4,286",
    orderGrowth: "+11.8%",
    conversion: "7.42%",
    conversionGrowth: "+3.6%",
  },
};

const currentDashboardData = dashboardData[dashboardPeriod];
  const [globalSearch, setGlobalSearch] = useState("");
  const searchablePages = [
  {
    name: "Dashboard",
    description: "Overview and business performance",
    icon: "▦",
  },
  {
    name: "Analytics",
    description: "Users, traffic and conversion analytics",
    icon: "◈",
  },
  {
    name: "Customers",
    description: "Manage your customers",
    icon: "♙",
  },
  {
    name: "Reports",
    description: "Business reports and exports",
    icon: "▤",
  },
  {
    name: "Settings",
    description: "Account and application settings",
    icon: "⚙",
  },
];

const searchResults = searchablePages.filter((page) =>
  `${page.name} ${page.description}`
    .toLowerCase()
    .includes(globalSearch.toLowerCase())
);

const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: "New Pro subscription",
    message: "Michael Carter purchased the Pro Plan.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Weekly report ready",
    message: "Your weekly analytics report is ready.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "New customer",
    message: "Emma Miller joined your platform.",
    time: "3 hours ago",
    unread: false,
  },
]);
const unreadCount = notifications.filter(
  (notification) => notification.unread
).length;

const markAllNotificationsRead = () => {
  setNotifications((prev) =>
    prev.map((notification) => ({
      ...notification,
      unread: false,
    }))
  );
};

const markNotificationRead = (id) => {
  setNotifications((prev) =>
    prev.map((notification) =>
      notification.id === id
        ? { ...notification, unread: false }
        : notification
    )
  );
};

const updateSetting = (key, value) => {
  setSettings((prev) => ({
    ...prev,
    [key]: value,
  }));

  setSettingsSaved(false);
};

const saveSettings = () => {
  localStorage.setItem(
    "dashboard-settings",
    JSON.stringify(settings)
  );

  setSettingsSaved(true);

  setTimeout(() => {
    setSettingsSaved(false);
  }, 2500);
};
  const exportReport = () => {
  const reportData = [
    ["SaaS Analytics Report"],
    [],
    ["Metric", "Value", "Change"],
    ["Total Revenue", "$24,892.40", "+12.6%"],
    ["Total Customers", "12,482", "+8.4%"],
    ["Total Orders", "1,429", "+5.7%"],
    ["Conversion Rate", "6.84%", "+2.1%"],
    [],
    ["Subscription", "Customers", "Revenue"],
    ["Starter", "4,820", "$476,180"],
    ["Pro", "4,892", "$1,219,108"],
    ["Business", "2,770", "$1,872,300"],
  ];

  const csv = reportData
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "saas-analytics-report.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  const [period, setPeriod] = useState("30D");
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30D");
  const [reportPeriod, setReportPeriod] = useState("This Month");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dashboard-theme") === "dark";
  });

  const [customerSearch, setCustomerSearch] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "dashboard-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const chartData = {
    "7D": {
      revenue: "$6,842",
      growth: "+8.2%",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      path: "M0 180 C50 155, 80 170, 120 135 C160 100, 200 145, 240 110 C280 75, 320 100, 360 70 C400 45, 440 70, 480 35 C520 20, 560 40, 600 15",
    },
    "30D": {
      revenue: "$24,892",
      growth: "+12.6%",
      labels: ["1", "5", "10", "15", "20", "25", "30"],
      path: "M0 175 C50 155, 80 165, 120 135 C160 105, 200 140, 240 115 C280 90, 320 105, 360 72 C400 50, 440 68, 480 42 C520 25, 560 45, 600 18",
    },
    "90D": {
      revenue: "$68,420",
      growth: "+18.4%",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      path: "M0 185 C50 170, 85 175, 120 150 C160 120, 200 145, 240 105 C280 80, 320 115, 360 82 C400 55, 440 80, 480 45 C520 28, 560 55, 600 20",
    },
    "1Y": {
      revenue: "$284,920",
      growth: "+26.8%",
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
      path: "M0 190 C50 175, 80 165, 120 150 C160 125, 200 140, 240 110 C280 90, 320 105, 360 75 C400 55, 440 70, 480 45 C520 30, 560 40, 600 15",
    },
  };

  const activities = [
    {
      initials: "MC",
      name: "Michael Carter",
      action: "Purchased Pro Plan",
      time: "2 min ago",
      amount: "+$249",
      type: "purple",
    },
    {
      initials: "SW",
      name: "Sarah Wilson",
      action: "Purchased Starter Plan",
      time: "18 min ago",
      amount: "+$99",
      type: "green",
    },
    {
      initials: "RB",
      name: "Robert Brown",
      action: "Upgraded subscription",
      time: "42 min ago",
      amount: "+$499",
      type: "orange",
    },
    {
      initials: "EM",
      name: "Emma Miller",
      action: "Purchased Pro Plan",
      time: "1 hr ago",
      amount: "+$249",
      type: "blue",
    },
    {
      initials: "DL",
      name: "David Lee",
      action: "Purchased Business Plan",
      time: "2 hrs ago",
      amount: "+$799",
      type: "purple",
    },
    {
      initials: "AW",
      name: "Anna White",
      action: "Started free trial",
      time: "3 hrs ago",
      amount: "+$0",
      type: "green",
    },
  ];

  const customers = [
    {
      initials: "MC",
      name: "Michael Carter",
      email: "michael@example.com",
      plan: "Pro",
      status: "Active",
      spent: "$1,249",
      joined: "Sep 05, 2026",
    },
    {
      initials: "SW",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      plan: "Starter",
      status: "Active",
      spent: "$499",
      joined: "Sep 04, 2026",
    },
    {
      initials: "RB",
      name: "Robert Brown",
      email: "robert@example.com",
      plan: "Business",
      status: "Active",
      spent: "$2,890",
      joined: "Sep 03, 2026",
    },
    {
      initials: "EM",
      name: "Emma Miller",
      email: "emma@example.com",
      plan: "Pro",
      status: "Active",
      spent: "$1,840",
      joined: "Sep 02, 2026",
    },
    {
      initials: "DL",
      name: "David Lee",
      email: "david@example.com",
      plan: "Business",
      status: "Inactive",
      spent: "$3,420",
      joined: "Aug 30, 2026",
    },
    {
      initials: "AW",
      name: "Anna White",
      email: "anna@example.com",
      plan: "Starter",
      status: "Active",
      spent: "$199",
      joined: "Aug 28, 2026",
    },
  ];

  const filteredActivities = activities.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(value) ||
      item.action.toLowerCase().includes(value)
    );
  });

  const visibleActivities = showAll
    ? filteredActivities
    : filteredActivities.slice(0, 4);

  const filteredCustomers = customers.filter((customer) => {
    const value = customerSearch.toLowerCase();

    return (
      customer.name.toLowerCase().includes(value) ||
      customer.email.toLowerCase().includes(value) ||
      customer.plan.toLowerCase().includes(value)
    );
  });

  const currentChart = chartData[period];
  const analyticsData = {
  "7D": {
    users: "8,420",
    growth: "+7.8%",
    sessions: "12,842",
    conversion: "4.8%",
    chart: "M0 165 C45 145, 75 155, 115 130 C155 105, 190 125, 230 95 C270 70, 310 100, 350 75 C390 55, 430 72, 470 48 C510 30, 550 45, 600 20",
  },

  "30D": {
    users: "12,842",
    growth: "+14.6%",
    sessions: "24,892",
    conversion: "6.84%",
    chart: "M0 175 C45 160, 75 165, 115 140 C155 112, 190 135, 230 105 C270 82, 310 108, 350 78 C390 58, 430 75, 470 50 C510 34, 550 50, 600 22",
  },

  "90D": {
    users: "38,420",
    growth: "+21.3%",
    sessions: "82,420",
    conversion: "8.12%",
    chart: "M0 185 C45 170, 75 175, 115 145 C155 120, 190 145, 230 112 C270 88, 310 118, 350 82 C390 60, 430 82, 470 52 C510 35, 550 48, 600 18",
  },

  "1Y": {
    users: "142,820",
    growth: "+32.8%",
    sessions: "482,920",
    conversion: "9.42%",
    chart: "M0 190 C45 178, 75 170, 115 150 C155 125, 190 145, 230 112 C270 90, 310 115, 350 82 C390 60, 430 80, 470 48 C510 32, 550 45, 600 15",
  },
};

const currentAnalytics = analyticsData[analyticsPeriod];

  const navigation = [
    {
      name: "Dashboard",
      icon: "▦",
    },
    {
      name: "Analytics",
      icon: "◈",
    },
    {
      name: "Customers",
      icon: "♙",
    },
    {
      name: "Reports",
      icon: "▤",
    },
    {
      name: "Settings",
      icon: "⚙",
    },
  ];

  return (
    <div className="app">
      {/* SIDEBAR */}
     <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="logo">
          <div className="logo-mark">A</div>
          <span>Analytics</span>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
            onClick={() => {
  setActivePage(item.name);
  setSidebarOpen(false);
}}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>

          <h3>Upgrade to Pro</h3>

          <p>
            Unlock advanced analytics and powerful features.
          </p>

          <button>Upgrade Now</button>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">JD</div>

          <div>
            <strong>John Doe</strong>
            <span>Admin</span>
          </div>
        </div>
      </aside>
      {sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setSidebarOpen(false)}
  />
)}

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="mobile-logo">
            <div className="logo-mark">A</div>
            <span>Analytics</span>
          </div>
<button
  className="mobile-menu-button"
  onClick={() => setSidebarOpen(!sidebarOpen)}
  aria-label="Toggle navigation"
>
  ☰
</button>
          <div className="search-box">
            <span>⌕</span>
            {globalSearch.trim() && (
  <div className="global-search-results">
    {searchResults.length > 0 ? (
      <>
        <div className="search-results-heading">
          Pages
        </div>

        {searchResults.map((page) => (
          <button
            key={page.name}
            className="global-search-item"
            onClick={() => {
              setActivePage(page.name);
              setGlobalSearch("");
            }}
          >
            <div className="search-result-icon">
              {page.icon}
            </div>

            <div>
              <strong>{page.name}</strong>
              <span>{page.description}</span>
            </div>
          </button>
        ))}
      </>
    ) : (
      <div className="search-no-results">
        <strong>No results found</strong>
        <span>
          Try Dashboard, Analytics, Customers, Reports or Settings.
        </span>
      </div>
    )}
  </div>
)}
<input
  type="text"
  placeholder="Search dashboard..."
  value={globalSearch}
  onChange={(e) => setGlobalSearch(e.target.value)}
/>
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button theme-button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

           <div className="notification-wrapper">
  <button
    className="icon-button notification-button"
    onClick={() =>
      setNotificationsOpen(!notificationsOpen)
    }
    aria-label="Notifications"
  >
    🔔

    {unreadCount > 0 && (
      <span className="notification-badge">
        {unreadCount}
      </span>
    )}
  </button>

  {notificationsOpen && (
    <div className="notification-dropdown">
      <div className="notification-header">
        <div>
          <strong>Notifications</strong>
          <span>
            {unreadCount} unread
          </span>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            <div>✓</div>
            <strong>You're all caught up</strong>
            <span>No new notifications.</span>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              className={`notification-item ${
                notification.unread ? "unread" : ""
              }`}
              onClick={() =>
                markNotificationRead(notification.id)
              }
            >
              <div className="notification-dot">
                {notification.unread ? "●" : "✓"}
              </div>

              <div className="notification-content">
                <strong>{notification.title}</strong>

                <span>{notification.message}</span>

                <small>{notification.time}</small>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )}
</div>

            <div className="profile">
              <div className="avatar">JD</div>

              <div className="profile-info">
                <strong>John Doe</strong>
                <span>Administrator</span>
              </div>

              <span className="profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD PAGE */}
        {activePage === "Dashboard" && (
          <section className="dashboard">
            <div className="welcome">
              <div>
                <p className="eyebrow">OVERVIEW</p>

                <h1>
                  Good morning, John <span>👋</span>
                </h1>

                <p className="welcome-text">
                  Here's what's happening with your business today.
                </p>
              </div>

             <div className="dashboard-period-wrapper">
  <button
    className="date-button"
    onClick={() =>
      setDashboardPeriodOpen(!dashboardPeriodOpen)
    }
  >
    <span>◷</span>
    {dashboardPeriod}
    <span className="date-arrow">
      {dashboardPeriodOpen ? "⌃" : "⌄"}
    </span>
  </button>

  {dashboardPeriodOpen && (
    <div className="dashboard-period-dropdown">
      {Object.keys(dashboardData).map((period) => (
        <button
          key={period}
          className={`dashboard-period-option ${
            dashboardPeriod === period ? "selected" : ""
          }`}
          onClick={() => {
            setDashboardPeriod(period);
            setDashboardPeriodOpen(false);
          }}
        >
          <span>{period}</span>

          {dashboardPeriod === period && (
            <span>✓</span>
          )}
        </button>
      ))}
    </div>
  )}
</div>
            </div>

       {/* STAT CARDS */}
<div className="stats-grid">
  <div
    className="stat-card stat-card-clickable"
    onClick={() => setActivePage("Reports")}
    role="button"
    tabIndex="0"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        setActivePage("Reports");
      }
    }}
  >
    <div className="stat-top">
      <div className="stat-icon purple">↗</div>

      <span className="stat-growth positive">
        +12.6%
      </span>
    </div>

    <p>Total Revenue</p>

    <h2>$24,892.40</h2>

    <span className="stat-period">
      Compared to last month
    </span>
  </div>


  <div
    className="stat-card stat-card-clickable"
    onClick={() => setActivePage("Customers")}
    role="button"
    tabIndex="0"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        setActivePage("Customers");
      }
    }}
  >
    <div className="stat-top">
      <div className="stat-icon blue">♙</div>

      <span className="stat-growth positive">
        +8.4%
      </span>
    </div>

    <p>Total Customers</p>

    <h2>12,482</h2>

    <span className="stat-period">
      Compared to last month
    </span>
  </div>


  <div
    className="stat-card stat-card-clickable"
    onClick={() => setActivePage("Analytics")}
    role="button"
    tabIndex="0"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        setActivePage("Analytics");
      }
    }}
  >
    <div className="stat-top">
      <div className="stat-icon orange">▣</div>

      <span className="stat-growth positive">
        +5.7%
      </span>
    </div>

    <p>Total Orders</p>

    <h2>1,429</h2>

    <span className="stat-period">
      Compared to last month
    </span>
  </div>


  <div
    className="stat-card stat-card-clickable"
    onClick={() => setActivePage("Analytics")}
    role="button"
    tabIndex="0"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        setActivePage("Analytics");
      }
    }}
  >
    <div className="stat-top">
      <div className="stat-icon green">◉</div>

      <span className="stat-growth positive">
        +2.1%
      </span>
    </div>

    <p>Conversion Rate</p>

    <h2>6.84%</h2>

    <span className="stat-period">
      Compared to last month
    </span>
  </div>
</div>

            {/* ANALYTICS */}
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-heading">
                  <div>
                    <p className="card-label">REVENUE</p>
                    <h3>Revenue Overview</h3>
                  </div>

                  <div className="period-buttons">
                    {Object.keys(chartData).map((item) => (
                      <button
                        key={item}
                        className={
                          period === item ? "selected" : ""
                        }
                        onClick={() => setPeriod(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="revenue-summary">
                  <div>
                    <strong>{currentChart.revenue}</strong>

                    <span className="revenue-growth">
                      {currentChart.growth}
                    </span>
                  </div>

                  <span>Revenue generated</span>
                </div>

                <div className="chart">
                  <div className="chart-y-axis">
                    <span>$30k</span>
                    <span>$20k</span>
                    <span>$10k</span>
                    <span>$0</span>
                  </div>

                  <div className="chart-area">
                    <div className="grid-line line-1"></div>
                    <div className="grid-line line-2"></div>
                    <div className="grid-line line-3"></div>
                    <div className="grid-line line-4"></div>

                    <svg
                      viewBox="0 0 600 210"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopOpacity="0.25"
                          />
                          <stop
                            offset="100%"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        className="chart-fill"
                        d={`${currentChart.path} L600 210 L0 210 Z`}
                        fill="url(#chartGradient)"
                      />

                      <path
                        className="chart-stroke"
                        d={currentChart.path}
                        fill="none"
                        strokeWidth="3"
                      />
                    </svg>

                    <div className="chart-labels">
                      {currentChart.labels.map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="activity-card">
                <div className="card-heading">
                  <div>
                    <p className="card-label">LIVE</p>
                    <h3>Recent Activity</h3>
                  </div>

                  <button
                    className="more-button"
                    onClick={() =>
                      alert("Activity options opened")
                    }
                  >
                    •••
                  </button>
                </div>

                <div className="activity-list">
                  {visibleActivities.length > 0 ? (
                    visibleActivities.map((item, index) => (
                      <div
                        className="activity-item"
                        key={index}
                      >
                        <div
                          className={`activity-avatar ${item.type}`}
                        >
                          {item.initials}
                        </div>

                        <div className="activity-info">
                          <strong>{item.name}</strong>
                          <span>{item.action}</span>
                          <small>{item.time}</small>
                        </div>

                        <strong className="activity-amount">
                          {item.amount}
                        </strong>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      No activity found.
                    </div>
                  )}
                </div>

                {filteredActivities.length > 4 && (
                  <button
                    className="view-all"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show less" : "View all activity"}
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CUSTOMERS PAGE */}
        {activePage === "Customers" && (
          <section className="dashboard customers-page">
            <div className="page-header">
              <div>
                <p className="eyebrow">CUSTOMERS</p>

                <h1>Customer Management</h1>

                <p className="welcome-text">
                  Manage your customers and monitor their subscriptions.
                </p>
              </div>

              <button className="primary-button">
                + Add Customer
              </button>
            </div>

            <div className="customer-stats">
              <div className="mini-stat">
                <span>Total Customers</span>
                <strong>12,482</strong>
              </div>

              <div className="mini-stat">
                <span>Active Customers</span>
                <strong>11,204</strong>
              </div>

              <div className="mini-stat">
                <span>Pro Customers</span>
                <strong>4,892</strong>
              </div>

              <div className="mini-stat">
                <span>New This Month</span>
                <strong>842</strong>
              </div>
            </div>

            <div className="customers-card">
              <div className="customers-toolbar">
                <div>
                  <h3>All Customers</h3>
                  <span>
                    {filteredCustomers.length} customers
                  </span>
                </div>

                <div className="customer-search">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={customerSearch}
                    onChange={(e) =>
                      setCustomerSearch(e.target.value)
                    }
                  />

                  {customerSearch && (
                    <button
                      onClick={() => setCustomerSearch("")}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="customer-table-wrapper">
                <table className="customer-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Total Spent</th>
                      <th>Joined</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.email}>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">
                              {customer.initials}
                            </div>

                            <div>
                              <strong>{customer.name}</strong>
                              <span>{customer.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`plan-badge ${customer.plan.toLowerCase()}`}
                          >
                            {customer.plan}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              customer.status === "Active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            <span></span>
                            {customer.status}
                          </span>
                        </td>

                        <td className="spent">
                          {customer.spent}
                        </td>

                        <td className="joined">
                          {customer.joined}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredCustomers.length === 0 && (
                  <div className="customer-empty">
                    No customers found.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* PLACEHOLDER PAGES */}
      {activePage === "Analytics" && (
  <section className="dashboard analytics-page">
    <div className="page-header">
      <div>
        <p className="eyebrow">ANALYTICS</p>

        <h1>Performance Analytics</h1>

        <p className="welcome-text">
          Understand how users interact with your business.
        </p>
      </div>

      <div className="analytics-periods">
        {Object.keys(analyticsData).map((item) => (
          <button
            key={item}
            className={
              analyticsPeriod === item ? "selected" : ""
            }
            onClick={() => setAnalyticsPeriod(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* ANALYTICS STATS */}
    <div className="analytics-stats">
      <div className="analytics-stat-card">
        <div className="analytics-stat-icon purple">
          ♙
        </div>

        <div>
          <span>Total Users</span>

          <strong>{currentAnalytics.users}</strong>

          <small className="positive">
            {currentAnalytics.growth} vs previous period
          </small>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="analytics-stat-icon blue">
          ◉
        </div>

        <div>
          <span>Total Sessions</span>

          <strong>{currentAnalytics.sessions}</strong>

          <small className="positive">
            +11.2% vs previous period
          </small>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="analytics-stat-icon orange">
          ◈
        </div>

        <div>
          <span>Conversion Rate</span>

          <strong>{currentAnalytics.conversion}</strong>

          <small className="positive">
            +2.4% vs previous period
          </small>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="analytics-stat-icon green">
          ↗
        </div>

        <div>
          <span>Avg. Session</span>

          <strong>4m 28s</strong>

          <small className="positive">
            +8.6% vs previous period
          </small>
        </div>
      </div>
    </div>

    {/* USER GROWTH */}
    <div className="analytics-main-grid">
      <div className="analytics-chart-card">
        <div className="card-heading">
          <div>
            <p className="card-label">AUDIENCE</p>

            <h3>User Growth</h3>
          </div>

          <div className="chart-legend">
            <span>
              <i></i>
              Users
            </span>
          </div>
        </div>

        <div className="analytics-chart">
          <div className="analytics-y-axis">
            <span>15k</span>
            <span>10k</span>
            <span>5k</span>
            <span>0</span>
          </div>

          <div className="analytics-chart-area">
            <div className="analytics-grid-line"></div>
            <div className="analytics-grid-line"></div>
            <div className="analytics-grid-line"></div>
            <div className="analytics-grid-line"></div>

            <svg
              viewBox="0 0 600 210"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="analyticsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopOpacity="0.2"
                  />

                  <stop
                    offset="100%"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                className="analytics-chart-fill"
                d={`${currentAnalytics.chart} L600 210 L0 210 Z`}
              />

              <path
                className="analytics-chart-line"
                d={currentAnalytics.chart}
                fill="none"
                strokeWidth="3"
              />
            </svg>

            <div className="analytics-chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* DEVICE BREAKDOWN */}
      <div className="device-card">
        <div className="card-heading">
          <div>
            <p className="card-label">DEVICES</p>

            <h3>Device Breakdown</h3>
          </div>
        </div>

        <div className="device-visual">
          <div className="device-ring">
            <div className="device-ring-inner">
              <strong>12.8k</strong>
              <span>Users</span>
            </div>
          </div>
        </div>

        <div className="device-list">
          <div>
            <span>
              <i className="device-dot purple"></i>
              Desktop
            </span>

            <strong>52%</strong>
          </div>

          <div>
            <span>
              <i className="device-dot blue"></i>
              Mobile
            </span>

            <strong>38%</strong>
          </div>

          <div>
            <span>
              <i className="device-dot orange"></i>
              Tablet
            </span>

            <strong>10%</strong>
          </div>
        </div>
      </div>
    </div>

    {/* LOWER ANALYTICS */}
    <div className="analytics-bottom-grid">
      {/* TRAFFIC SOURCES */}
      <div className="traffic-card">
        <div className="card-heading">
          <div>
            <p className="card-label">ACQUISITION</p>

            <h3>Traffic Sources</h3>
          </div>
        </div>

        <div className="traffic-list">
          <div className="traffic-row">
            <div className="traffic-info">
              <span className="traffic-icon purple">
                G
              </span>

              <div>
                <strong>Google</strong>
                <span>Organic Search</span>
              </div>
            </div>

            <div className="traffic-value">
              <strong>42.8%</strong>

              <div className="traffic-bar">
                <span style={{ width: "86%" }}></span>
              </div>
            </div>
          </div>

          <div className="traffic-row">
            <div className="traffic-info">
              <span className="traffic-icon blue">
                F
              </span>

              <div>
                <strong>Facebook</strong>
                <span>Social Media</span>
              </div>
            </div>

            <div className="traffic-value">
              <strong>24.6%</strong>

              <div className="traffic-bar">
                <span style={{ width: "62%" }}></span>
              </div>
            </div>
          </div>

          <div className="traffic-row">
            <div className="traffic-info">
              <span className="traffic-icon orange">
                I
              </span>

              <div>
                <strong>Instagram</strong>
                <span>Social Media</span>
              </div>
            </div>

            <div className="traffic-value">
              <strong>18.2%</strong>

              <div className="traffic-bar">
                <span style={{ width: "46%" }}></span>
              </div>
            </div>
          </div>

          <div className="traffic-row">
            <div className="traffic-info">
              <span className="traffic-icon green">
                ↗
              </span>

              <div>
                <strong>Direct</strong>
                <span>Direct Traffic</span>
              </div>
            </div>

            <div className="traffic-value">
              <strong>14.4%</strong>

              <div className="traffic-bar">
                <span style={{ width: "36%" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONVERSION FUNNEL */}
      <div className="funnel-card">
        <div className="card-heading">
          <div>
            <p className="card-label">CONVERSION</p>

            <h3>Conversion Funnel</h3>
          </div>
        </div>

        <div className="funnel">
          <div className="funnel-step">
            <div className="funnel-label">
              <span>Visitors</span>
              <strong>24,892</strong>
            </div>

            <div className="funnel-bar first">
              <span></span>
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label">
              <span>Product Views</span>
              <strong>18,420</strong>
            </div>

            <div className="funnel-bar second">
              <span></span>
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label">
              <span>Added to Cart</span>
              <strong>9,842</strong>
            </div>

            <div className="funnel-bar third">
              <span></span>
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-label">
              <span>Purchased</span>
              <strong>6,842</strong>
            </div>

            <div className="funnel-bar fourth">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}

{activePage === "Reports" && (
  <section className="dashboard reports-page">
    <div className="page-header">
      <div>
        <p className="eyebrow">REPORTS</p>

        <h1>Business Reports</h1>

        <p className="welcome-text">
          Track performance and export your business data.
        </p>
      </div>

      <div className="report-actions">
        <select
          value={reportPeriod}
          onChange={(e) => setReportPeriod(e.target.value)}
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>

        <button
          className="primary-button"
          onClick={exportReport}
        >
          ↓ Export CSV
        </button>
      </div>
    </div>

    {/* REPORT SUMMARY */}
    <div className="report-summary-grid">
      <div className="report-summary-card">
        <div className="report-summary-top">
          <span>Revenue</span>
          <div className="report-summary-icon purple">
            $
          </div>
        </div>

        <strong>$24,892.40</strong>

        <div className="report-trend positive">
          ↗ 12.6%
          <span>vs previous period</span>
        </div>
      </div>

      <div className="report-summary-card">
        <div className="report-summary-top">
          <span>Customers</span>
          <div className="report-summary-icon blue">
            ♙
          </div>
        </div>

        <strong>12,482</strong>

        <div className="report-trend positive">
          ↗ 8.4%
          <span>vs previous period</span>
        </div>
      </div>

      <div className="report-summary-card">
        <div className="report-summary-top">
          <span>Orders</span>
          <div className="report-summary-icon orange">
            ▣
          </div>
        </div>

        <strong>1,429</strong>

        <div className="report-trend positive">
          ↗ 5.7%
          <span>vs previous period</span>
        </div>
      </div>

      <div className="report-summary-card">
        <div className="report-summary-top">
          <span>Avg. Order Value</span>
          <div className="report-summary-icon green">
            ◈
          </div>
        </div>

        <strong>$174.20</strong>

        <div className="report-trend positive">
          ↗ 4.2%
          <span>vs previous period</span>
        </div>
      </div>
    </div>

    {/* REPORT CONTENT */}
    <div className="reports-grid">
      {/* REVENUE REPORT */}
      <div className="report-card revenue-report">
        <div className="card-heading">
          <div>
            <p className="card-label">FINANCIAL</p>
            <h3>Revenue Performance</h3>
          </div>

          <span className="report-period">
            {reportPeriod}
          </span>
        </div>

        <div className="report-revenue">
          <div className="report-revenue-total">
            <span>Total Revenue</span>
            <strong>$24,892.40</strong>
          </div>

          <div className="report-bars">
            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "58%" }}></span>
              </div>
              <small>Mon</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "72%" }}></span>
              </div>
              <small>Tue</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "64%" }}></span>
              </div>
              <small>Wed</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "82%" }}></span>
              </div>
              <small>Thu</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "70%" }}></span>
              </div>
              <small>Fri</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "91%" }}></span>
              </div>
              <small>Sat</small>
            </div>

            <div className="report-bar-group">
              <div className="report-bar">
                <span style={{ height: "78%" }}></span>
              </div>
              <small>Sun</small>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSCRIPTIONS */}
      <div className="report-card">
        <div className="card-heading">
          <div>
            <p className="card-label">SUBSCRIPTIONS</p>
            <h3>Plan Distribution</h3>
          </div>
        </div>

        <div className="subscription-report">
          <div className="subscription-row">
            <div>
              <span className="subscription-dot purple"></span>
              <strong>Pro</strong>
            </div>

            <span>39.2%</span>
          </div>

          <div className="subscription-progress">
            <span style={{ width: "78%" }}></span>
          </div>

          <div className="subscription-row">
            <div>
              <span className="subscription-dot blue"></span>
              <strong>Starter</strong>
            </div>

            <span>38.6%</span>
          </div>

          <div className="subscription-progress">
            <span style={{ width: "76%" }}></span>
          </div>

          <div className="subscription-row">
            <div>
              <span className="subscription-dot orange"></span>
              <strong>Business</strong>
            </div>

            <span>22.2%</span>
          </div>

          <div className="subscription-progress">
            <span style={{ width: "44%" }}></span>
          </div>
        </div>
      </div>
    </div>

    {/* DETAILED REPORT TABLE */}
    <div className="report-table-card">
      <div className="report-table-heading">
        <div>
          <p className="card-label">BREAKDOWN</p>
          <h3>Subscription Revenue</h3>
        </div>

        <span>{reportPeriod}</span>
      </div>

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Customers</th>
              <th>Monthly Revenue</th>
              <th>Growth</th>
              <th>Share</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="report-plan">
                  <span className="subscription-dot purple"></span>
                  Pro
                </div>
              </td>

              <td>4,892</td>
              <td>$12,108</td>
              <td>
                <span className="report-growth">+18.4%</span>
              </td>
              <td>48.6%</td>
            </tr>

            <tr>
              <td>
                <div className="report-plan">
                  <span className="subscription-dot blue"></span>
                  Starter
                </div>
              </td>

              <td>4,820</td>
              <td>$6,240</td>
              <td>
                <span className="report-growth">+9.2%</span>
              </td>
              <td>25.1%</td>
            </tr>

            <tr>
              <td>
                <div className="report-plan">
                  <span className="subscription-dot orange"></span>
                  Business
                </div>
              </td>

              <td>2,770</td>
              <td>$6,544</td>
              <td>
                <span className="report-growth">+14.7%</span>
              </td>
              <td>26.3%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}

{activePage === "Settings" && (
  <section className="dashboard settings-page">
    <div className="page-header">
      <div>
        <p className="eyebrow">SETTINGS</p>

        <h1>Account Settings</h1>

        <p className="welcome-text">
          Manage your profile, notifications, and account preferences.
        </p>
      </div>

      <button
        className="primary-button save-settings-button"
        onClick={saveSettings}
      >
        {settingsSaved ? "✓ Saved" : "Save Changes"}
      </button>
    </div>

    <div className="settings-layout">

      {/* Profile Information */}
      <div className="settings-card">
        <div className="settings-card-heading">
          <div className="settings-card-icon">👤</div>

          <div>
            <h2>Profile Information</h2>
            <p>
              Update your personal and company information.
            </p>
          </div>
        </div>

        <div className="profile-preview">
          <div className="large-avatar">JA</div>

          <div>
            <strong>{settings.name}</strong>
            <span>{settings.email}</span>
          </div>

          <button className="secondary-button">
            Change Photo
          </button>
        </div>

        <div className="settings-form-grid">

          <label>
            Full Name

            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                updateSetting("name", e.target.value)
              }
            />
          </label>

          <label>
            Email Address

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                updateSetting("email", e.target.value)
              }
            />
          </label>

          <label>
            Company

            <input
              type="text"
              value={settings.company}
              onChange={(e) =>
                updateSetting("company", e.target.value)
              }
            />
          </label>

          <label>
            Role

            <input
              type="text"
              value="Administrator"
              disabled
            />
          </label>

        </div>
      </div>


      {/* Notifications */}
      <div className="settings-card">

        <div className="settings-card-heading">
          <div className="settings-card-icon">🔔</div>

          <div>
            <h2>Notifications</h2>
            <p>
              Choose which notifications you want to receive.
            </p>
          </div>
        </div>

        <div className="settings-options">

          <div className="setting-option">
            <div>
              <strong>Email Notifications</strong>

              <span>
                Receive important account notifications by email.
              </span>
            </div>

            <button
              className={`toggle ${
                settings.emailNotifications ? "active" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "emailNotifications",
                  !settings.emailNotifications
                )
              }
            >
              <span></span>
            </button>
          </div>


          <div className="setting-option">
            <div>
              <strong>Weekly Reports</strong>

              <span>
                Get a weekly summary of your business performance.
              </span>
            </div>

            <button
              className={`toggle ${
                settings.weeklyReports ? "active" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "weeklyReports",
                  !settings.weeklyReports
                )
              }
            >
              <span></span>
            </button>
          </div>


          <div className="setting-option">
            <div>
              <strong>Product Updates</strong>

              <span>
                Receive news about new features and improvements.
              </span>
            </div>

            <button
              className={`toggle ${
                settings.productUpdates ? "active" : ""
              }`}
              onClick={() =>
                updateSetting(
                  "productUpdates",
                  !settings.productUpdates
                )
              }
            >
              <span></span>
            </button>
          </div>

        </div>
      </div>


      {/* Appearance */}
      <div className="settings-card">

        <div className="settings-card-heading">
          <div className="settings-card-icon">🎨</div>

          <div>
            <h2>Appearance</h2>
            <p>
              Customize how your dashboard looks.
            </p>
          </div>
        </div>

        <div className="appearance-options">

          <button
            className={`appearance-option ${
              !darkMode ? "selected" : ""
            }`}
            onClick={() => setDarkMode(false)}
          >
            <div className="appearance-preview light-preview">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <strong>Light</strong>
            <span>Clean and bright</span>
          </button>


          <button
            className={`appearance-option ${
              darkMode ? "selected" : ""
            }`}
            onClick={() => setDarkMode(true)}
          >
            <div className="appearance-preview dark-preview">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <strong>Dark</strong>
            <span>Easy on the eyes</span>
          </button>

        </div>
      </div>


      {/* Security */}
      <div className="settings-card">

        <div className="settings-card-heading">
          <div className="settings-card-icon">🔐</div>

          <div>
            <h2>Security</h2>
            <p>
              Manage your password and account security.
            </p>
          </div>
        </div>


        <div className="security-row">

          <div>
            <strong>Password</strong>

            <span>
              Last changed 30 days ago
            </span>
          </div>

          <button
            className="secondary-button"
            onClick={() =>
              alert("Password change flow opened")
            }
          >
            Change Password
          </button>

        </div>


        <div className="security-row">

          <div>
            <strong>Two-Factor Authentication</strong>

            <span>
              Add an extra layer of protection to your account.
            </span>
          </div>

          <button
            className="secondary-button"
            onClick={() =>
              alert("Two-factor authentication setup opened")
            }
          >
            Enable
          </button>

        </div>

      </div>

    </div>
  </section>
)}    
      </main>
    </div>
  );
}

export default App;