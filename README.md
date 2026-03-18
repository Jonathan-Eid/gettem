## Gettem

---

The portfolio website source code for [https://joneid.dev](https://joneid.dev)

Includes a full engagement analytics stack built with the [Grafana App SDK](https://github.com/grafana/grafana-app-sdk) — tracking swipe behavior, page views, link clicks, session duration, and visitor fingerprinting across the site, visualized in a custom Grafana plugin.

### Architecture

```
frontend/          React app (card swiping, gallery, resume, github pages)
backend/           Strapi CMS (cards, resume, github config, engagement events)
analytics/         Grafana App SDK plugin + operator
  ├── cmd/plugin/    Plugin backend (Go) — resource routes via app.App interface
  ├── cmd/operator/  Nightly aggregation + pruning via app.MultiRunner
  ├── pkg/app/       app.App implementation, validation, route handlers, bridge
  ├── pkg/store/     Postgres resource.Client + ClientGenerator
  ├── pkg/generated/ Generated Go types from CUE kind definitions
  ├── kinds/         CUE schema definitions (EngagementEvent)
  └── plugin/        Frontend (React) — 5 dashboard pages
```

### Prerequisites

- **Docker & Docker Compose**
- **Node.js** >= 20 (recommend using [nvm](https://github.com/nvm-sh/nvm))
- **Yarn** 1.x (`npm install -g yarn`)
- **Go** >= 1.22 ([install](https://go.dev/doc/install))

> The frontend and Strapi run in Docker, but the analytics plugin must be built locally before mounting into the Grafana container.

### Get Started
> Mostly written by AI, still have to test setup process
1. **Clone and navigate to root dir**

```bash
git clone https://github.com/Jonathan-Eid/gettem.git
cd gettem
```

2. **Set up environment variables**

```bash
cat << 'EOF' >> .env
export ADMIN_JWT_SECRET=YehBmC8QPFQ13SCjGyKd
export API_TOKEN_SALT=pYpQ60YQD3GbQKQdzi5iEd
export APP_KEYS=[bZtVyR443Vo8BhHcKViHgBsVWCcIbYw0FPGYOB]
export STRAPI_URL=http://localhost:1337
export URL=http://localhost:1337
EOF
source .env
```

3. **Start Strapi + Postgres**

```bash
docker compose up -d strapi postgres
```

4. **Create Strapi API Token**

- Go to http://localhost:1337 and create your admin account
- Navigate to **Settings > API Tokens**
- Click **Create new API Token**
- Set Token Type to **Custom**
- Under Permissions, enable:
  - **Card, Github, Resume, Upload**: `find` & `findOne`
  - **Content-type-builder**: `getContentTypes` & `getContentType`
  - **Engagement-event**: `create` (so the frontend can write analytics events)
- Save and copy the token

```bash
echo "export STRAPI_AUTH_TOKEN=<your-token>" >> .env
source .env
```

5. **Start the React frontend**

```bash
docker compose up -d gettem
```

- Frontend at http://localhost:3000

6. **Build the analytics plugin**

```bash
cd analytics
make build/plugin-backend          # builds Go backend binary
cd plugin && yarn install && yarn build && cd ..
cd ..
```

7. **Fix Grafana data directory permissions** (first time only)

```bash
mkdir -p grafana-data
docker run --rm -v $(pwd)/grafana-data:/data alpine chown -R 472:0 /data
```

8. **Start Grafana + Analytics Operator**

```bash
docker compose up -d grafana analytics-operator
```

- Grafana at http://localhost:3001 (default login: admin / admin)

9. **Configure the analytics plugin**

- Go to http://localhost:3001/plugins/gettem-analytics-app
- Click **Enable**
- Go to the **Configuration** tab
- Enter the database connection:
  - Host: `postgres`
  - Port: `5432`
  - Username: `juna`
  - Password: `gettem`
  - Database: `gettem`
  - SSL Mode: `disable`
- Click **Save settings**

10. **View the dashboards**

Navigate to http://localhost:3001/a/gettem-analytics-app to see:

| Page | What it shows |
|---|---|
| **Overview** | Today's stats, most engaged card, recent event feed |
| **Card Performance** | Card leaderboard with swipe right/left ratio bars, engagement scores |
| **Trends** | Sparkline charts for sessions, swipes, page views, link clicks over 30 days |
| **Audience** | Unique visitors (IP fingerprinted), longest sessions, device/timezone/language breakdown |
| **Pages & Links** | Page view counts per page, link click rankings |

### How Analytics Works

The frontend tracks user interactions and sends them to Strapi as `EngagementEvent` records:

- **Swipe page**: card impressions, swipe direction + dwell time, detail open/close with read time + scroll depth, undo
- **Gallery page**: page view + dwell time (card detail tracking via shared SwipeCard component)
- **Resume page**: page view + dwell time
- **Github page**: page view + dwell time, link clicks (profile, repos, gists, followers)

The **analytics operator** runs nightly to aggregate raw events into `daily_engagement_summaries` and prune old events (default 7 day retention).

The **plugin backend** implements the Grafana App SDK's `app.App` interface with a Postgres-backed `resource.Client`, serving data to the frontend dashboard pages via custom resource routes.
