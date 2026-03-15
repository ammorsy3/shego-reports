import React, { useState, useEffect } from 'react';
import './OmBdr.css';
import ombdrLogo from './ombdr-logo.webp';

// ─── Platform Logos ───────────────────────────────────────────────────────────
const MetaLogo = () => (
  <svg viewBox="0 0 36 36" fill="currentColor" width="20" height="20">
    <path d="M18 2.1C9.2 2.1 2.1 9.2 2.1 18c0 7.9 5.8 14.5 13.4 15.7v-11.1h-4v-4.6h4v-3.5c0-4 2.4-6.2 6-6.2 1.7 0 3.5.3 3.5.3v3.9h-2c-2 0-2.6 1.2-2.6 2.5v3h4.4l-.7 4.6h-3.7v11.1c7.6-1.2 13.4-7.8 13.4-15.7.1-8.8-7-15.9-15.8-15.9z"/>
  </svg>
);

const SnapchatLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.228-.719-1.228-1.153 0-.359.255-.704.72-.853.149-.06.314-.09.494-.09.12 0 .284.015.434.09.389.18.748.3 1.048.3.181 0 .314-.045.399-.104-.009-.18-.019-.359-.034-.553l-.004-.06c-.104-1.627-.229-3.654.3-4.848 1.583-3.545 4.94-3.821 5.93-3.821h.424z"/>
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// ─── All Weekly Data ──────────────────────────────────────────────────────────
// Most recent week first. Meta values converted from USD × 3.75 = SAR.
const allWeeksData = [
  {
    reportPeriod: 'Mar 5 – Mar 12, 2026',
    label: 'Week 2',
    meta: {
      campaigns: [
        { name: 'Om Bader Teaser', spend: 3797.14, revenue: 16202.70, roas: 4.27, orders: 166 },
        { name: 'UGC 1',          spend: 1152.26, revenue: 5720.44,  roas: 4.96, orders: 60  },
        { name: 'UGC 2',          spend: 1300.50, revenue: 5318.44,  roas: 4.09, orders: 52  },
        { name: 'UGC 3',          spend: 3098.14, revenue: 12464.85, roas: 4.02, orders: 134 },
      ],
    },
    snapchat: {
      campaigns: [
        { name: 'UGC KFC',              spend: 399.14,   revenue: 710.47,   roas: 1.78, orders: 8   },
        { name: 'OM Bader Teaser',      spend: 10063.02, revenue: 53635.90, roas: 5.33, orders: 540 },
        { name: 'OM Bader Teaser 8:13', spend: 572.06,   revenue: 5171.42,  roas: 9.04, orders: 49  },
        { name: 'UGC',                  spend: 7903.05,  revenue: 44731.26, roas: 5.66, orders: 438 },
      ],
    },
    tiktok: {
      campaigns: [],
    },
    insights: [
      { type: 'success', icon: '✅', title: 'Best Performing Platform', text: 'Snapchat dominated this week — OM Bader Teaser generated 53,636 SAR revenue at 5.33x ROAS with 540 orders on a 10,063 SAR spend.' },
      { type: 'success', icon: '✅', title: 'Top ROAS Campaign',        text: 'OM Bader Teaser 8:13 on Snapchat hit 9.04x ROAS — the highest individual ROAS this week — with 49 orders from only 572 SAR spend.' },
      { type: 'warning', icon: '⚠️', title: 'Needs Attention',          text: 'UGC KFC on Snapchat delivered only 1.78x ROAS, well below the account average. Consider pausing or refreshing this creative.' },
      { type: 'info',    icon: '💡', title: 'Recommendation',           text: 'TikTok data pending for this period. Scale OM Bader Teaser on Snapchat further and test its proven creative angles on Meta and TikTok.' },
    ],
  },
  {
    reportPeriod: 'Feb 26 – Mar 5, 2026',
    label: 'Week 1',
    meta: {
      campaigns: [
        { name: 'Om Bader Teaser', spend: 3599.70, revenue: 18118.19, roas: 5.03, orders: 178 },
        { name: 'UGC 1',          spend: 1266.79, revenue: 4218.30,  roas: 3.33, orders: 43  },
        { name: 'UGC 2',          spend: 1071.11, revenue: 3443.78,  roas: 3.22, orders: 41  },
        { name: 'UGC 3',          spend: 1560.45, revenue: 8190.53,  roas: 5.25, orders: 93  },
      ],
    },
    snapchat: {
      campaigns: [
        { name: 'OM Bader Teaser 2:7',  spend: 346.60,  revenue: 949.00,   roas: 2.74, orders: 11  },
        { name: 'OM Bader Teaser',      spend: 3508.29, revenue: 24840.97, roas: 7.08, orders: 252 },
        { name: 'OM Bader Teaser 8:13', spend: 1103.40, revenue: 5690.00,  roas: 5.16, orders: 58  },
        { name: 'UGC',                  spend: 1914.03, revenue: 14027.03, roas: 7.33, orders: 143 },
      ],
    },
    tiktok: {
      campaigns: [
        { name: 'UGC',                  spend: 237.37, revenue: 1523.00, roas: 6.42, orders: 17 },
        { name: 'Om Bader Teaser 8:13', spend: 366.97, revenue: 1446.00, roas: 3.94, orders: 14 },
        { name: 'Om Bader Teaser 2:7',  spend: 28.44,  revenue: 79.00,   roas: 2.78, orders: 1  },
        { name: 'Om Bader Teaser',      spend: 389.49, revenue: 2435.00, roas: 6.25, orders: 28 },
      ],
    },
    insights: [
      { type: 'success', icon: '✅', title: 'Best Performing Platform', text: 'Meta led the week with strong ROAS across all creatives — Om Bader Teaser hit 5.03x and UGC 3 hit 5.25x on a combined 7,498 SAR spend.' },
      { type: 'success', icon: '✅', title: 'Top Campaign',             text: 'OM Bader Teaser on Snapchat delivered the best individual result: 7.08x ROAS, 252 orders, and 24,841 SAR in revenue from 3,508 SAR spend.' },
      { type: 'warning', icon: '⚠️', title: 'Needs Attention',          text: 'Om Bader Teaser 2:7 on TikTok generated only 1 conversion on 28.44 SAR spend — consider retiring or refreshing this creative.' },
      { type: 'info',    icon: '💡', title: 'Recommendation',           text: 'UGC creatives are performing consistently across all platforms (Meta 3–5x, Snapchat 7.33x, TikTok 6.42x). Increase UGC budget allocation, especially on Snapchat.' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt    = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
const fmtSAR = (n) => `${fmt(n)} SAR`;
const safeDivide = (a, b) => (b > 0 ? a / b : 0);

const sumCampaigns = (campaigns) =>
  campaigns.reduce(
    (acc, c) => ({ spend: acc.spend + c.spend, revenue: acc.revenue + c.revenue, orders: acc.orders + c.orders }),
    { spend: 0, revenue: 0, orders: 0 }
  );

// ─── Week Selector ────────────────────────────────────────────────────────────
const WeekSelector = ({ weeks, selectedIndex, onSelect }) => (
  <div className="ombdr-week-selector">
    {weeks.map((week, i) => (
      <button
        key={i}
        className={`ombdr-week-btn${i === selectedIndex ? ' active' : ''}`}
        onClick={() => onSelect(i)}
      >
        <span className="ombdr-week-label">{week.label}</span>
        <span className="ombdr-week-period">{week.reportPeriod}</span>
      </button>
    ))}
  </div>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ reportPeriod }) => (
  <header className="ombdr-header">
    <div className="ombdr-header-content">
      <div className="ombdr-logo-section">
        <img src={ombdrLogo} alt="أم بدر" className="ombdr-logo-img" />
        <span className="ombdr-tagline">ما نبيع بهارات، نبيع الطعم الخامس</span>
      </div>
      <div className="ombdr-report-info">
        <h1>Weekly Performance Report</h1>
        <p className="ombdr-date-range">{reportPeriod}</p>
      </div>
    </div>
  </header>
);

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ title, value, subtitle, icon, color }) => (
  <div className="ombdr-summary-card ombdr-glass">
    <div className={`ombdr-card-icon ${color}`}>{icon}</div>
    <div className="ombdr-card-content">
      <h3>{title}</h3>
      <p className="ombdr-val">{value}</p>
      {subtitle && <p className="ombdr-sub">{subtitle}</p>}
    </div>
  </div>
);

// ─── Executive Summary ────────────────────────────────────────────────────────
const ExecutiveSummary = ({ overall }) => (
  <section className="ombdr-section">
    <h2 className="ombdr-section-title">Executive Summary</h2>
    <div className="ombdr-summary-grid">
      <SummaryCard
        title="Total Ad Spend"
        value={fmtSAR(overall.spend)}
        icon="💰" color="red"
      />
      <SummaryCard
        title="Total Revenue"
        value={fmtSAR(overall.revenue)}
        subtitle={`ROAS: ${fmt(safeDivide(overall.revenue, overall.spend))}x`}
        icon="📈" color="green"
      />
      <SummaryCard
        title="Total Orders"
        value={fmt(overall.orders)}
        subtitle={`Avg. Order Value: ${fmtSAR(safeDivide(overall.revenue, overall.orders))}`}
        icon="🛒" color="orange"
      />
      <SummaryCard
        title="Cost per Order"
        value={fmtSAR(safeDivide(overall.spend, overall.orders))}
        subtitle="Across all platforms"
        icon="🌶️" color="blue"
      />
    </div>
  </section>
);

// ─── Platform Comparison Bar Chart ────────────────────────────────────────────
const PlatformComparison = ({ meta, snapchat, tiktok }) => {
  const platforms = [
    { name: 'Meta',     data: meta,     color: '#1877f2', logo: <MetaLogo /> },
    { name: 'Snapchat', data: snapchat, color: '#FFFC00', logo: <SnapchatLogo /> },
    { name: 'TikTok',   data: tiktok,   color: '#ff0050', logo: <TikTokLogo /> },
  ];
  const maxSpend = Math.max(...platforms.map(p => p.data.spend), 1);

  return (
    <section className="ombdr-section">
      <h2 className="ombdr-section-title">Spend by Platform</h2>
      <div className="ombdr-chart ombdr-glass">
        {platforms.map((p, i) => (
          <div key={i} className="ombdr-bar-row">
            <div className="ombdr-bar-label">
              <span className={`ombdr-bar-logo ${p.name.toLowerCase()}`}>{p.logo}</span>
              {p.name}
            </div>
            <div className="ombdr-bar-track">
              <div
                className="ombdr-bar-fill"
                style={{ width: `${(p.data.spend / maxSpend) * 100}%`, background: p.color }}
              />
            </div>
            <div className="ombdr-bar-value">
              {p.data.spend > 0 ? fmtSAR(p.data.spend) : '—'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Platform Detail Cards ────────────────────────────────────────────────────
const PlatformCard = ({ platform, data, logo, label }) => {
  const totals = sumCampaigns(data.campaigns);
  const hasData = data.campaigns.length > 0;

  return (
    <div className={`ombdr-platform-card ombdr-glass ${platform}`}>
      <div className="ombdr-platform-header">
        <div className="ombdr-platform-icon">{logo}</div>
        <h3>{label}</h3>
      </div>
      <div className="ombdr-platform-content">
        {!hasData ? (
          <p className="ombdr-no-data">Data not yet available for this period.</p>
        ) : (
          <div className="ombdr-campaign-group">
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Spend</th>
                  <th>Revenue</th>
                  <th>ROAS</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {data.campaigns.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{fmtSAR(c.spend)}</td>
                    <td>{fmtSAR(c.revenue)}</td>
                    <td>{c.roas > 0 ? `${fmt(c.roas)}x` : '—'}</td>
                    <td>{c.orders}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="ombdr-table-total">
                  <td>Total</td>
                  <td>{fmtSAR(totals.spend)}</td>
                  <td>{fmtSAR(totals.revenue)}</td>
                  <td>{fmt(safeDivide(totals.revenue, totals.spend))}x</td>
                  <td>{totals.orders}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const PlatformBreakdown = ({ weekData }) => (
  <section className="ombdr-section">
    <h2 className="ombdr-section-title">Platform Details</h2>
    <div className="ombdr-platforms-grid">
      <PlatformCard platform="meta"     data={weekData.meta}     logo={<MetaLogo />}     label="Meta (Facebook / Instagram)" />
      <PlatformCard platform="snapchat" data={weekData.snapchat} logo={<SnapchatLogo />} label="Snapchat" />
      <PlatformCard platform="tiktok"   data={weekData.tiktok}   logo={<TikTokLogo />}   label="TikTok" />
    </div>
  </section>
);

// ─── Key Insights ─────────────────────────────────────────────────────────────
const KeyInsights = ({ insights }) => (
  <section className="ombdr-section">
    <h2 className="ombdr-section-title">Key Insights</h2>
    <div className="ombdr-insights-grid">
      {insights.map((insight, i) => (
        <div key={i} className={`ombdr-insight-card ombdr-glass ${insight.type}`}>
          <div className="ombdr-insight-icon">{insight.icon}</div>
          <h4>{insight.title}</h4>
          <p>{insight.text}</p>
        </div>
      ))}
    </div>
  </section>
);

// ─── Final Summary Table ──────────────────────────────────────────────────────
const FinalSummary = ({ meta, snapchat, tiktok, overall, reportPeriod }) => {
  const hasTiktok = tiktok.spend > 0;

  return (
    <section className="ombdr-section">
      <h2 className="ombdr-section-title">Week at a Glance</h2>
      <div className="ombdr-final-summary ombdr-glass">
        <div className="ombdr-summary-table">
          <div className="ombdr-table-row header">
            <span>Metric</span><span>Meta</span><span>Snapchat</span><span>TikTok</span>
          </div>
          <div className="ombdr-table-row">
            <span>Ad Spend</span>
            <span>{fmtSAR(meta.spend)}</span>
            <span>{fmtSAR(snapchat.spend)}</span>
            <span className="hl">{hasTiktok ? fmtSAR(tiktok.spend) : '—'}</span>
          </div>
          <div className="ombdr-table-row">
            <span>Revenue</span>
            <span>{fmtSAR(meta.revenue)}</span>
            <span>{fmtSAR(snapchat.revenue)}</span>
            <span className="hl">{hasTiktok ? fmtSAR(tiktok.revenue) : '—'}</span>
          </div>
          <div className="ombdr-table-row">
            <span>ROAS</span>
            <span>{fmt(safeDivide(meta.revenue, meta.spend))}x</span>
            <span>{fmt(safeDivide(snapchat.revenue, snapchat.spend))}x</span>
            <span className="hl">{hasTiktok ? `${fmt(safeDivide(tiktok.revenue, tiktok.spend))}x` : '—'}</span>
          </div>
          <div className="ombdr-table-row">
            <span>Orders</span>
            <span>{meta.orders}</span>
            <span>{snapchat.orders}</span>
            <span className="hl">{hasTiktok ? tiktok.orders : '—'}</span>
          </div>
        </div>
        <div className="ombdr-bottom-line">
          <h3>The Bottom Line</h3>
          <p>
            This week, <strong>{fmtSAR(overall.spend)}</strong> was invested across all platforms,
            generating <strong>{fmtSAR(overall.revenue)}</strong> in revenue
            with <strong>{overall.orders} orders</strong>.
            Overall ROAS: <strong>{fmt(safeDivide(overall.revenue, overall.spend))}x</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ reportPeriod }) => (
  <footer className="ombdr-footer">
    <div style={{ marginBottom: '0.5rem' }}>
      <span className="ombdr-footer-brand">أم بدر · OmBdr</span>
    </div>
    <p>Weekly Report | {reportPeriod}</p>
    <p className="powered">Prepared by SEET Marketing Solutions</p>
  </footer>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
function OmBdrReport() {
  const [weekIndex, setWeekIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add('ombdr-theme');
    return () => document.body.classList.remove('ombdr-theme');
  }, []);

  const weekData = allWeeksData[weekIndex];

  const meta     = sumCampaigns(weekData.meta.campaigns);
  const snapchat = sumCampaigns(weekData.snapchat.campaigns);
  const tiktok   = sumCampaigns(weekData.tiktok.campaigns);
  const overall  = {
    spend:   meta.spend   + snapchat.spend   + tiktok.spend,
    revenue: meta.revenue + snapchat.revenue + tiktok.revenue,
    orders:  meta.orders  + snapchat.orders  + tiktok.orders,
  };

  return (
    <div className="ombdr-app">
      <div className="ombdr-bg-1" />
      <div className="ombdr-bg-2" />
      <Header reportPeriod={weekData.reportPeriod} />
      <WeekSelector weeks={allWeeksData} selectedIndex={weekIndex} onSelect={setWeekIndex} />
      <main className="ombdr-main">
        <ExecutiveSummary overall={overall} />
        <PlatformComparison meta={meta} snapchat={snapchat} tiktok={tiktok} />
        <PlatformBreakdown weekData={weekData} />
        <KeyInsights insights={weekData.insights} />
        <FinalSummary
          meta={meta} snapchat={snapchat} tiktok={tiktok} overall={overall}
          reportPeriod={weekData.reportPeriod}
        />
      </main>
      <Footer reportPeriod={weekData.reportPeriod} />
    </div>
  );
}

export default OmBdrReport;
