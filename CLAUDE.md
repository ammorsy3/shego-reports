# Ads Manager Reporting — Project Brief

## What This Is
A React reporting dashboard for SEET Marketing Solutions. Each client has their own password-protected route with a branded weekly performance report.

## Running the Project
```bash
npm start   # dev server at http://localhost:3000
npm run build  # production build
```

## Project Structure
```
src/
  App.js                    # Router + auth logic + CustomCursor + logout/home buttons
  App.css                   # Shared styles (SheGo purple theme + global cursor + logout/home buttons)
  index.css                 # Global body styles, fonts (Inter), scrollbar
  auth/
    auth.js                 # Passwords, roles, localStorage helpers
    PasswordGate.js         # Login screen component
    PasswordGate.css        # Login screen styles
  clients/
    SheGoReport.js          # SheGo full report component
    OmBdrReport.js          # OmBdr full report component
    OmBdr.css               # OmBdr red brand styles
```

## Auth System
Two access levels stored in `localStorage` key `seet_auth_role`:

| Password | Role | Access |
|---|---|---|
| `Sara&acc@seet-marketing` | `admin` | Home page + all clients + ← Home button |
| `shego123&sara@seet` | `shego` | Locked to `/shego` only |
| `ombadr&sara@seet` | `ombdr` | Locked to `/ombdr` only |

- Passwords live in `src/auth/auth.js`
- Login persists forever via localStorage (until user clicks "Log out")
- Logout button: fixed bottom-right on all pages
- ← Home button: fixed bottom-right (left of logout), admin only, hidden on `/`

## Routing
- `/` — Home page (admin only; clients get redirected to their path)
- `/shego` — SheGo report
- `/ombdr` — OmBdr report

## Clients

### SheGo (`/shego`)
- **Brand**: Purple (`#a855f7`, `#8b37f1`), women-only ride-hailing service (Saudi Arabia)
- **Metrics**: App installs (iOS/Android), Leads, CPI, CPL
- **Audiences**: Captains (drivers) + Users (passengers)
- **Platforms**: Meta, Snapchat, TikTok
- **Currency**: SAR (Snapchat data converted from USD × 3.75)
- **Data location**: Hardcoded in `SheGoReport.js` → `campaignData` object

### OmBdr (`/ombdr`)
- **Brand**: Red (`#f02a36`, `#c8141e`), premium Saudi spice brand (أم بدر)
- **Tagline**: "ما نبيع بهارات، نبيع الطعم الخامس" (We don't sell spices, we sell the fifth taste)
- **Product**: Artisanal spice blends, signature product "Srar" (chili blend from Hail)
- **Metrics**: Ad Spend, Revenue, ROAS, Orders, Cost per Order (e-commerce focused)
- **Platforms**: Meta, Snapchat, TikTok
- **Currency**: SAR
- **Data location**: Hardcoded in `OmBdrReport.js` → `campaignData` object
- **Status**: Template ready, all values currently 0 — needs real campaign data

## Adding a New Client
1. Create `src/clients/NewClientReport.js` (copy OmBdr or SheGo as template)
2. Create `src/clients/NewClient.css` with brand colors
3. Add password + role to `src/auth/auth.js`
4. Add route in `src/App.js` → `AppRoutes` and `clients` array (for home page card)

## Updating Weekly Data
Edit the `campaignData` object at the top of the relevant report file:
- `SheGoReport.js` for SheGo
- `OmBdrReport.js` for OmBdr
Update `reportPeriod` string and all campaign spend/result numbers.

## Playwright MCP — Data Extraction Workflow

### One-time Comet setup
Playwright connects to the user's existing Comet (by Perplexity) browser via CDP on port 9222.
Comet must be launched with remote debugging enabled. Run this once (quit Comet first):

```bash
/Applications/Comet.app/Contents/MacOS/Comet --remote-debugging-port=9222
```

After that, log into Snapchat Ads, Meta Ads Manager, and TikTok Ads Manager normally.
Claude will connect to those existing tabs — no need to re-login.

### How to trigger a report update
Tell Claude: "update the [client] report" and it will:
1. Connect to the existing Chrome session via CDP
2. Find and switch to each platform tab (Snapchat, Meta, TikTok)
3. Check the date range — confirm or adjust it to the correct week
4. Scan the visible columns on each platform's campaign table
5. If a required column is missing (e.g. Impressions, ROAS, Orders), add it using the platform's column customizer before extracting
6. Extract all campaign-level data
7. Update `campaignData` in the relevant report file and set `reportPeriod`

### Required columns per platform

**Snapchat Ads Manager**
- Campaign Name, Spend, Impressions, Clicks, CPM, CPC
- SheGo: Installs, CPI, Leads, CPL
- OmBdr: Purchases, Revenue, ROAS

**Meta Ads Manager**
- Campaign Name, Spend, Impressions, Reach, CPM, Clicks, CPC, CTR
- SheGo: App Installs (iOS + Android), CPI, Leads, CPL
- OmBdr: Purchases, Purchase Value, ROAS, Cost per Purchase

**TikTok Ads Manager**
- Campaign Name, Spend, Impressions, Clicks, CPM, CPC, CTR
- SheGo: App Installs, CPI, Leads, CPL
- OmBdr: Orders, Revenue, ROAS, Cost per Order

### Currency rules
- Meta (Saudi account): values already in SAR — use as-is
- Snapchat: values in USD — multiply by 3.75 to convert to SAR
- TikTok (Saudi account): values already in SAR — use as-is
