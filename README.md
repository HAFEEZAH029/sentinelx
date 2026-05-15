# SentinelX — Real-Time Cybersecurity Analytics Dashboard

SentinelX is a real-time cybersecurity analytics dashboard built with Vue 3, TypeScript, RxJS, and Apache ECharts. The application simulates a live defensive monitoring environment where incoming threat activity, traffic metrics, and system events are streamed continuously and visualized through interactive charts, metric cards, and a live activity feed.

The dashboard was designed to feel “alive” while remaining performant, resilient, responsive, and accessible.

---

# Tech Stack

* Vue 3
* TypeScript
* RxJS
* Apache ECharts
* Tailwind CSS v4
* Lucide Vue Next
* Vite

---

# Features

## Real-Time Streaming Dashboard

* Live metric cards
* Real-time activity feed
* Streaming chart updates
* Simulated cybersecurity events
* Smooth live updates without page refreshes

## Interactive Controls

Users can:

* Pause and resume the stream
* Filter by severity
* Filter by attack type
* Change time ranges
* Toggle datasets on/off
* Switch chart types
* Toggle chart tooltips

## Charts & Visualization

* Threat Activity Profile
* Network Traffic Volume
* Attack Categories
* Line chart support
* Area chart support
* Bar chart support
* Responsive chart resizing
* Tooltip inspection support

## Resilience & Error Handling

* Loading skeleton state
* Reconnecting overlay state
* Disconnected/offline state
* Malformed payload detection
* Payload rejection handling
* Safe recovery flow

## Theme Support

* Dark mode
* Light mode
* Runtime theme switching

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/HAFEEZAH029/sentinelx.git
```

## 2. Navigate Into the Project

```bash
cd sentinelx
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

## 5. Build for Production

```bash
npm run build
```

---

# Project Architecture

The application follows a modular component-based architecture focused on separation of concerns and scalability.

## High-Level Structure

```txt
src/
 ├── components/
 │    ├── charts/
 │    ├── dashboard/
 │    ├── feedback/
 │    ├── layout/
 │    ├── metrics/
 │    └── ui/
 │
 ├── composables/
 │    ├── useDashboardControls.ts
 │    ├── useDashboardStream.ts
 │    └── useConnectionSimulation.ts
 │
 ├── services/
 │    └── streaming/
 │
 ├── types/
 ├── utils/
 ├── App.vue
 └── main.ts
```

---

# Architecture Explanation

## Component Layer

The UI is split into reusable components:

* `DashboardHeader`
* `MetricsGrid`
* `ActivityFeed`
* `ThreatChart`
* `TrafficChart`
* `AttackCategoriesChart`
* Feedback overlays and banners

This improves maintainability and reduces unnecessary rendering complexity.

---

## Composable Layer

Vue composables were used to isolate application logic from presentation.

### `useDashboardStream`

Responsible for:

* subscribing to RxJS streams
* managing live metrics
* handling activity events
* updating chart points
* validating incoming payloads
* handling malformed data rejection

### `useDashboardControls`

Responsible for:

* dashboard filters
* chart type selection
* dataset toggles
* pause/resume state
* connection state
* theme state

### `useConnectionSimulation`

Responsible for:

* simulated reconnect attempts
* simulated disconnects
* browser online/offline handling
* reconnection recovery flow

---

# State Management Strategy

Instead of introducing a heavy global store, the application uses composable-based shared reactive state.

This approach was chosen because:

* the dashboard has a focused state surface
* composables provide simpler architecture
* Vue reactivity already handles shared state efficiently
* it avoids unnecessary abstraction overhead

Reactive dashboard state is centralized inside:

* `useDashboardControls`
* `useDashboardStream`

Derived UI state is handled using Vue `computed()` properties.

Examples:

* filtered feed items
* visible chart points
* attack category counts
* dataset filtering

This minimizes unnecessary recomputation and keeps updates efficient.

---

# Data Streaming Approach

The application simulates real-time data streaming using RxJS.

## Why RxJS?

RxJS was selected because the task specifically required handling real-time streaming updates efficiently.

RxJS provides:

* observable streams
* event-based architecture
* controlled update frequency
* clean subscription management
* scalable real-time data flow

---

## Streaming Flow

```txt
Mock Generators
      ↓
RxJS Streams
      ↓
Composable Subscribers
      ↓
Reactive Vue State
      ↓
Charts / Feed / Metrics
```

---

## Stream Types

### Metrics Stream

Streams:

* active threats
* requests per second
* blocked attacks
* average latency

### Threat Events Stream

Streams:

* attack events
* severity levels
* source systems
* datasets
* statuses

### Chart Points Stream

Streams:

* threat trend data
* traffic volume data
* alert trend data

---

# Rendering Optimization Decisions

Performance optimization was a major focus of the implementation.

## Preventing Unnecessary Re-Renders

The dashboard uses:

* reusable isolated components
* Vue `computed()` memoization
* derived state calculations
* controlled reactive updates

This limits unnecessary UI recomputation.

---

## Optimized Streaming Updates

Streaming updates are intentionally throttled:

```ts
throttleTime(1000)
```

This prevents charts from re-rendering too aggressively while still maintaining a live feel.

---

## Efficient Chart Rendering

Charts use direct Apache ECharts instances instead of repeatedly recreating wrapper components.

Optimizations include:

* `setOption()` updates
* ResizeObserver resizing
* controlled chart lifecycle cleanup
* preserved chart instances
* capped historical datasets

---

## Controlled History Size

To avoid unbounded memory growth:

```ts
MAX_EVENTS = 2000
MAX_CHART_POINTS = 3000
```

This keeps rendering predictable during long-running sessions.

---

## Scroll Handling Instead of Heavy Virtualization

The activity feed uses:

* capped item history
* overflow scrolling
* sticky table headers
* newest-first ordering

This provides controlled DOM rendering without introducing additional virtualization libraries.

---

# Security & Stability Decisions

## Payload Validation

Incoming streamed events are validated before entering application state.

Malformed payloads are:

* rejected safely
* counted
* surfaced to the user through warning banners
* prevented from crashing the UI

---

## Safe Rendering

The dashboard avoids unsafe DOM injection.

* no `v-html`
* no raw HTML injection
* all external data rendered through Vue interpolation

---

## Memory Leak Prevention

The application cleans up:

* RxJS subscriptions
* ResizeObservers
* intervals
* timeouts
* online/offline event listeners
* ECharts instances

on component unmount.

---

# Responsive Design Strategy

The dashboard was built mobile-first and tested across:

* mobile
* tablet
* desktop
* ultra-wide layouts

Responsive behavior includes:

* adaptive chart sizing
* responsive grid layouts
* scrollable activity feeds
* collapsible control interactions
* responsive overlays and banners

---

# Accessibility Considerations

The dashboard includes:

* semantic HTML structure
* accessible button labels
* keyboard-focus visibility
* color contrast support
* responsive text sizing
* ARIA labels for charts and controls

---

# Trade-Offs Made

## Simulated Streaming Instead of Real Backend

The application uses mock RxJS streams instead of a live websocket backend.

Reason:

* faster delivery within task timeline
* allowed focus on frontend architecture
* still demonstrates real-time rendering principles

---

## Lightweight State Management

Composable-based shared reactive state was chosen instead of Pinia.

Reason:

* reduced setup overhead
* simpler architecture for the project scope
* Vue reactivity already handled the requirements effectively

---

## Simplified Malformed Data Recovery

Malformed payloads are rejected while preserving the last valid dashboard state.

A full system reset/recovery flow was intentionally avoided to keep the user experience stable and avoid unnecessary complexity.

---

## Controlled Feature Scope

Additional enterprise-level features such as:

* authentication
* backend persistence
* websocket infrastructure
* full virtualization
* server-side analytics

were intentionally excluded to prioritize:

* performance
* resilience
* interaction quality
* completion within deadline

---

# Final Notes

SentinelX was built with a strong focus on:

* real-time interactivity
* resilient UI architecture
* performance optimization
* responsive design
* maintainable frontend structure
* explainable engineering decisions

The application demonstrates how Vue, RxJS, and ECharts can be combined to build a performant and scalable real-time monitoring experience.
