# React Router — সম্পূর্ণ গাইড (A to Z) 

> This article was written using the cloud for personal study.

---

## সূচিপত্র

1. [React Router কী?](#react-router-কী)
2. [কেন React Router দরকার?](#কেন-react-router-দরকার)
3. [MPA vs SPA — পার্থক্য বোঝো](#mpa-vs-spa--পার্থক্য-বোঝো)
4. [React Router ছাড়া ৫টা বড় সমস্যা](#react-router-ছাড়া-৫টা-বড়-সমস্যা)
5. [History API — আসল রহস্য](#history-api--আসল-রহস্য)
6. [Link Click করলে কী হয় — ভেতরের মেকানিজম](#link-click-করলে-কী-হয়--ভেতরের-মেকানিজম)
7. [Version ইতিহাস](#version-ইতিহাস)
8. [v5 vs v6 — পার্থক্য একনজরে](#v5-vs-v6--পার্থক্য-একনজরে)
9. [Install ও Setup](#install-ও-setup)
10. [Router-এর ধরন](#router-এর-ধরন)
11. [Route Pattern — সব ধরন](#route-pattern--সব-ধরন)
12. [Navigation — যাওয়ার সব উপায়](#navigation--যাওয়ার-সব-উপায়)
13. [React Router Hooks — সব একসাথে](#react-router-hooks--সব-একসাথে)
14. [Nested Routes ও Outlet](#nested-routes-ও-outlet)
15. [Protected / Private Route](#protected--private-route)
16. [Loader ও Action (v6.4+)](#loader-ও-action-v64)
17. [Route Matching কীভাবে কাজ করে](#route-matching-কীভাবে-কাজ-করে)
18. [Important Tips ও Common Mistakes](#important-tips-ও-common-mistakes)
19. [কোনটা কখন ব্যবহার করবো — Quick Reference](#কোনটা-কখন-ব্যবহার-করবো--quick-reference)

---

## React Router কী?

React একটা **Single Page Application (SPA)** বানায়। মানে পুরো app একটাই HTML file। কিন্তু user যখন `/home`, `/about`, `/profile` — এভাবে আলাদা URL-এ যেতে চায়, তখন page reload না করে শুধু content বদলাতে হয়।

এই কাজটা করে **React Router** — এটা browser-এর URL দেখে সিদ্ধান্ত নেয় কোন component দেখাবে।

React Router ছাড়া manually করলে এরকম হতো:

```js
// খুব খারাপ approach — এভাবে করো না
const path = window.location.pathname;
if (path === '/home') return <Home />;
if (path === '/about') return <About />;
```

React Router দিয়ে একই কাজ:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

React Router ব্যবহার করলে তিনটা জিনিস নিশ্চিত হয়:

- **URL বদলায়** — Browser address bar update হয়, page reload হয় না
- **Back/Forward কাজ করে** — Browser history ঠিক থাকে
- **Bookmark করা যায়** — প্রতিটা page-এর নিজস্ব URL থাকে

---

## কেন React Router দরকার?

### ওয়েবসাইট কীভাবে কাজ করে — পুরনো পদ্ধতি

আগে যখন কেউ `facebook.com/profile` থেকে `facebook.com/messages`-এ যেত, browser সার্ভারে নতুন request পাঠাত। সার্ভার পুরো নতুন HTML পাঠাত। Page reload হতো। এটাই ছিল **Multi-Page Application (MPA)**।

সমস্যা হলো — প্রতিবার click করলে পুরো page নতুন করে load হয়, সব data আবার fetch হয়, UI flicker করে। ব্যবহারকারী slow experience পায়।

### SPA-তে সমস্যা কোথায় — React Router ছাড়া

React দিয়ে SPA বানালে শুরুতে একটাই HTML file থাকে। JavaScript সব কিছু render করে। কিন্তু এখানে একটা বড় সমস্যা দেখা দেয় — URL বদলানোর কোনো স্বাভাবিক পদ্ধতি নেই।

ধরো তুমি `myapp.com`-এ আছ। `/about`-এ যেতে চাইলে কী হবে? React জানে না এটা কোন component দেখাবে। Browser আবার server-এ যাবে এবং 404 পাবে, কারণ server-এ `/about` বলে কোনো file নেই।

তাই React Router লাগে — এটা browser-এর URL দেখে এবং কোনো server request ছাড়াই সঠিক component দেখায়।

---

## MPA vs SPA — পার্থক্য বোঝো

### Multi-Page Application (MPA)

```
User clicks /about
    ↓
Browser sends request to server
    ↓
Server returns full HTML
    ↓
Page reloads completely
    ↓
User sees new page (with flicker, delay)
```

**সমস্যা:** প্রতি page-এ server trip, slow, UI flicker করে।

### Single-Page Application (SPA) with React Router

```
User clicks /about
    ↓
React Router intercepts the click
    ↓
History API updates URL (no reload)
    ↓
Correct component renders instantly
    ↓
User sees new content (instant, smooth)
```

**সুবিধা:** দ্রুত, smooth, data থাকে, no flicker।

---

## React Router ছাড়া ৫টা বড় সমস্যা

### সমস্যা ১ — URL কাজ করে না

ধরো `facebook.com/messages` bookmark করে রেখেছ। React Router ছাড়া এই link খুললে সরাসরি server-এ request যাবে, server কিছু বুঝবে না, 404 আসবে। React Router থাকলে browser-ই বুঝে নেয় `/messages` মানে `Messages` component দেখাতে হবে।

### সমস্যা ২ — Back/Forward button কাজ করে না

`/home` থেকে `/about`-এ গেলে, Back button চাপলে `/home`-এ ফিরতে পারবে না — কারণ browser history-তে কিছু নেই। React Router browser-এর History API ব্যবহার করে, তাই প্রতিটা navigation history-তে যোগ হয়।

### সমস্যা ৩ — Share করা যায় না

`myapp.com/products/42` — এই URL কাউকে পাঠালে সে সরাসরি সেই product page-এ যেতে পারবে না। React Router ছাড়া URL-এ product ID রাখার কোনো উপায় নেই।

### সমস্যা ৪ — Conditional rendering অগোছালো হয়

```js
// এটা করো না — React Router ছাড়া nightmare
const [page, setPage] = useState('home');

if (page === 'home') return <Home />;
if (page === 'about') return <About />;
if (page === 'products') return <Products />;
// URL বদলায় না, share করা যায় না, back button কাজ করে না
```

### সমস্যা ৫ — Dynamic page সামলানো কঠিন

`/users/42`, `/users/99`, `/users/nahid` — হাজার হাজার user-এর জন্য আলাদা আলাদা `if` লিখবে? React Router `useParams()` দিয়ে এটা এক লাইনে সামলায়।

---

## History API — আসল রহস্য

React Router কাজ করে browser-এর built-in **History API** ব্যবহার করে। এটা HTML5-এ আসা একটা browser feature।

```js
// এটাই React Router ভেতরে ভেতরে করে
window.history.pushState({}, '', '/about');
// URL বদলালো → /about
// কিন্তু page reload হলো না
// React Router এই change detect করে About component দেখায়
```

### History API-র তিনটা main method

```js
// ১. নতুন entry যোগ (Back button কাজ করবে)
window.history.pushState(state, title, '/about');

// ২. Current entry replace (Back button কাজ করবে না)
window.history.replaceState(state, title, '/login');

// ৩. Back/Forward
window.history.back();    // ← back
window.history.forward(); // → forward
window.history.go(-2);    // ২ ধাপ পিছনে
```

### pushState vs replaceState

| পদ্ধতি | কী করে | কখন ব্যবহার |
|--------|--------|------------|
| `pushState` | History stack-এ নতুন entry যোগ করে | সাধারণ navigation |
| `replaceState` | Current entry বদলে ফেলে | Login → Dashboard (back করলে login-এ না যাওয়া) |

React Router-এ:
- `navigate('/about')` → pushState
- `navigate('/dashboard', { replace: true })` → replaceState

---

## Link Click করলে কী হয় — ভেতরের মেকানিজম

### `<Link>` কী render করে?

React Router-এর `<Link to="/about">` browser-এ render হলে সাধারণ HTML `<a href="/about">` হয়ে যায়।

```jsx
// তুমি লিখেছ (JSX)
<Link to="/about">About</Link>

// Browser দেখছে (HTML)
<a href="/about">About</a>
```

পার্থক্য হলো — React Router এই `<a>` tag-এর **default click behavior বন্ধ করে দেয়** এবং নিজে সামলায়।

### Click হলে ধাপে ধাপে কী হয়

```js
// React Router-এর ভেতরে মোটামুটি এরকম হয়
function handleClick(event) {

  // ধাপ ১: Default behavior বন্ধ করো
  event.preventDefault();
  // এটা না করলে browser page reload করত

  // ধাপ ২: History API দিয়ে URL বদলাও
  window.history.pushState({}, '', '/about');
  // URL বদলালো কিন্তু page reload হলো না!

  // ধাপ ৩: React Router-কে জানাও
  router.navigate('/about');
  // এটা সঠিক component render করবে
}
```

> **Key insight:** `event.preventDefault()` — এই একটা line-ই সব magic-এর মূল। এটা না থাকলে browser নিজেই server-এ request পাঠিয়ে দিত।

### URL পরিবর্তন React Router কীভাবে detect করে?

```js
// React Router দুটো জায়গা থেকে জানে:

// ১. নিজেই navigate করলে — সে জানেই
router.navigate('/about');
// Router নিজে call করেছে, তাই জানে

// ২. Back/Forward button চাপলে — popstate event
window.addEventListener('popstate', (event) => {
  // Browser নিজে এই event fire করে
  const newPath = window.location.pathname;
  router.update(newPath);
  // সঠিক component render হবে
});
```

### পারফরম্যান্স তুলনা

| পদ্ধতি | সময় | কী হয় |
|--------|------|--------|
| সাধারণ `<a href>` | ২০০–৫০০ms+ | Server request → HTML load → JS parse → render |
| React Router `<Link>` | ১–৫ms | URL বদলায় → match → render |

---

## Version ইতিহাস

### v1–v2 (2015–2016) — শুরু
React Router-এর শুরু, basic routing। JSX-based routing শুরু হয়েছিল। `<Route>` component প্রথমবার আসে।

### v3 (2016–2017) — Stable
`<Router>`, `<Route>`, `<Link>`, `<Redirect>` — এই pattern গড়ে ওঠে।

### v4 (2017) — বড় পরিবর্তন
Dynamic routing আসে। Route গুলো component-এর ভেতরে রাখা শুরু হয়। `exact` prop দরকার হতো।

```jsx
// v4/v5 style
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
</Switch>
```

### v5 (2019) — Hooks যোগ হয়
`useHistory`, `useParams`, `useLocation`, `useRouteMatch` আসে। React Hooks-এর সাথে কাজ করা সহজ হয়।

```js
// v5 hooks
const history = useHistory();  // v5 — এখন deprecated
const params = useParams();    // v5 — এখনও চলে
```

### v6 (2021) — বর্তমান standard ✅

সবচেয়ে বড় পরিবর্তন:
- `Switch` → `Routes`
- `useHistory` → `useNavigate`
- `exact` prop বাতিল (সব route default exact)
- `component={Page}` → `element={<Page />}`
- Nested routes সহজ হলো (`Outlet`)
- Relative paths পুরোপুরি support

```jsx
// v6 style — এটাই শেখো
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### v6.4+ (2022) — Data APIs

Remix-এর concept React Router-এ আসে:
- `createBrowserRouter`
- `loader`
- `action`
- `Form`
- `defer`
- `useLoaderData`
- `useActionData`

---

## v5 vs v6 — পার্থক্য একনজরে

| বিষয় | v5 | v6 |
|------|----|----|
| Wrapper | `<Switch>` | `<Routes>` |
| Component prop | `component={Home}` | `element={<Home />}` |
| Exact match | `exact` লাগতো | ডিফল্টেই exact |
| Navigate | `useHistory()` | `useNavigate()` |
| Redirect | `<Redirect to="/">` | `<Navigate to="/">` |
| Nested routes | জটিল ছিল | `Outlet` দিয়ে সহজ |
| Relative paths | সীমিত | পুরোপুরি support |

> **Migration tip:** v5 থেকে v6-এ migrate করলে `Switch → Routes`, `useHistory → useNavigate`, `Redirect → Navigate` — এই তিনটা পরিবর্তন সবার আগে করো।

---

## Install ও Setup

```bash
npm install react-router-dom
```

### Basic Setup

```jsx
// main.jsx বা index.jsx
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

---

## Router-এর ধরন

### 1. BrowserRouter — সবচেয়ে বেশি ব্যবহার

Real URL ব্যবহার করে (`/home`, `/about`)। Production app-এর জন্য। Server-এ সব path-এ HTML serve করতে হয়।

```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
// URL: example.com/about
```

### 2. HashRouter — Static hosting

URL-এ `#` ব্যবহার করে। GitHub Pages বা যেসব server সব path handle করতে পারে না, সেখানে কাজ করে।

```jsx
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
// URL: example.com/#/about
```

### 3. MemoryRouter — Testing

URL browser-এ দেখা যায় না, memory-তে থাকে। Testing এবং React Native-এ ব্যবহার হয়।

```jsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter initialEntries={['/about']}>
  <App />
</MemoryRouter>
```

### 4. createBrowserRouter — v6.4+ নতুন পদ্ধতি (Recommended)

Object দিয়ে route define করো। Loader, action, error boundary সহজে যোগ করা যায়।

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

// main.jsx-এ:
<RouterProvider router={router} />
```

> নতুন project-এ `createBrowserRouter` recommend করা হয়। এটা framework-level features দেয়। তবে `BrowserRouter` বুঝলেই সব বোঝা যাবে।

---

## Route Pattern — সব ধরন

### Basic Route

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### Dynamic Route (URL Parameter)

`:id` মানে যেকোনো value। `/users/42` বা `/users/nahid` — সব match করবে।

```jsx
<Route path="/users/:id" element={<UserProfile />} />
<Route path="/posts/:slug" element={<Post />} />

// Component-এর ভেতরে:
const { id } = useParams();  // id = "42" বা "nahid"
```

### Multiple Dynamic Params

```jsx
<Route path="/users/:userId/posts/:postId" element={<PostDetail />} />

// Component-এ:
const { userId, postId } = useParams();
```

### Wildcard Route (*) — 404 Page

সব unmatched URL ধরার জন্য। সবার শেষে রাখতে হয়।

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />  {/* সবার শেষে */}
</Routes>
```

### Index Route

Parent route-এ গেলে কোন child দেখাবে সেটা নির্ধারণ করে।

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />   {/* /dashboard */}
  <Route path="stats" element={<Stats />} />    {/* /dashboard/stats */}
  <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
</Route>
```

### Redirect (Navigate)

```jsx
import { Navigate } from 'react-router-dom';

// Route-এ redirect:
<Route path="/old-page" element={<Navigate to="/new-page" replace />} />

// Component-এর ভেতর থেকে redirect:
if (!isLoggedIn) return <Navigate to="/login" />;
```

> **v6-এ মনে রাখো:** সব route ডিফল্টে exact। `/about` শুধু `/about`-এ match করবে, `/about/team`-এ না।

---

## Navigation — যাওয়ার সব উপায়

### 1. `<Link>` — HTML `<a>`-এর replacement

Page reload ছাড়া navigate করে। সবচেয়ে বেশি ব্যবহৃত।

```jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
<Link to="/users/42">User Profile</Link>

// State পাঠানো:
<Link to="/checkout" state={{ from: 'cart' }}>Checkout</Link>
```

### 2. `<NavLink>` — Active link styling-এর জন্য

Current page-এর link automatically `active` class পায়। Navbar বানাতে perfect।

```jsx
import { NavLink } from 'react-router-dom';

// সহজ পদ্ধতি (active class automatically আসে):
<NavLink to="/home">Home</NavLink>

// Custom styling:
<NavLink
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? 'orange' : 'gray'
  })}
>
  About
</NavLink>

// className দিয়েও হয়:
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active-link' : ''}
>About</NavLink>
```

### 3. `useNavigate()` — Code থেকে navigate

Button click, form submit, বা যেকোনো event-এর পরে navigate করতে।

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // login logic...
    navigate('/dashboard');                          // forward যাও
    navigate('/dashboard', { replace: true });       // history replace করো
    navigate(-1);                                    // back যাও
    navigate(1);                                     // forward যাও
    navigate('/profile', { state: { name: 'Nahid' } }); // state পাঠাও
  };
}
```

### replace vs push — পার্থক্য

```
push (default):
History: / → /about → /contact
Back button: /about-এ যাবে ✓

replace:
/login replace হয়ে /dashboard
Back button: /login-এ যাবে না ✗ (কারণ entry নেই)
```

### Query String (Search Params)

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');       // /search?q=react
  const page = searchParams.get('page');     // /search?q=react&page=2

  // Update করতে:
  setSearchParams({ q: 'django', page: '1' });
}
```

---

## React Router Hooks — সব একসাথে

### `useParams()`

URL-এর dynamic segment (`:id`, `:slug`) থেকে value নেওয়া।

```jsx
// Route: /users/:id
const { id } = useParams(); // "42"

// Route: /users/:userId/posts/:postId
const { userId, postId } = useParams();
```

### `useNavigate()`

Programmatically navigate করার function দেয়।

```jsx
const navigate = useNavigate();
navigate('/home');
navigate(-1);               // back
navigate('/login', { replace: true });
```

### `useLocation()`

Current URL-এর সব তথ্য দেয়।

```jsx
const location = useLocation();
// URL: /products?category=phone#reviews

location.pathname  // "/products"
location.search    // "?category=phone"
location.hash      // "#reviews"
location.state     // navigate() দিয়ে পাঠানো data
location.key       // unique key প্রতিটা navigation-এর জন্য
```

### `useSearchParams()`

Query string (`?key=value`) read ও update করে। `useState`-এর মতো কাজ করে।

```jsx
const [params, setParams] = useSearchParams();
const q = params.get('q');
setParams({ q: 'new-value' });
```

### `useMatch()`

কোনো path current URL-এ match করছে কিনা check করে।

```jsx
const match = useMatch('/users/:id');
// match হলে: { params: { id: '42' }, pathname: '/users/42', ... }
// না হলে: null
```

### `useOutletContext()`

Parent route থেকে child route-এ data পাঠানো।

```jsx
// Parent layout:
<Outlet context={{ user: currentUser }} />

// Child component:
const { user } = useOutletContext();
```

### `useLoaderData()` — v6.4+

Route loader function থেকে fetch করা data নেওয়া।

```jsx
const data = useLoaderData();
```

### `useActionData()` — v6.4+

Form action থেকে return করা data নেওয়া।

```jsx
const result = useActionData();
```

### `useNavigation()` — v6.4+

Navigation-এর state জানা।

```jsx
const { state } = useNavigation();
// state: 'idle' | 'loading' | 'submitting'
```

### `useRouteError()` — v6.4+

Error boundary-তে error object পাওয়া।

```jsx
const error = useRouteError();
console.log(error.statusText || error.message);
```

---

## Nested Routes ও Outlet

Nested route মানে একটা route-এর ভেতরে আরেকটা route। Dashboard-এ sidebar সবসময় থাকে, কিন্তু main content বদলায় — এটাই nested routing।

### Route Define করা

```jsx
// App.jsx
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />   {/* /dashboard */}
    <Route path="stats" element={<Stats />} />    {/* /dashboard/stats */}
    <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
  </Route>
</Routes>
```

### Outlet — Parent layout-এ child render হওয়ার জায়গা

```jsx
// DashboardLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <nav>  {/* এই sidebar সবসময় থাকবে */}
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/dashboard/stats">Stats</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet />  {/* এখানে child route render হবে */}
      </main>
    </div>
  );
}
```

### Outlet দিয়ে Context পাঠানো

```jsx
// Parent layout:
<Outlet context={{ user: currentUser }} />

// Child component:
const { user } = useOutletContext();
```

> Outlet হলো React Router-এর সবচেয়ে powerful feature। একবার বুঝলে app structure অনেক clean হয়ে যায়।

---

## Protected / Private Route

Login ছাড়া কিছু page-এ যাওয়া যাবে না — এই pattern হলো Protected Route।

### সবচেয়ে সহজ পদ্ধতি

```jsx
// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// App.jsx-এ ব্যবহার:
<Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```

### Login-এর পরে আগের page-এ ফিরে যাওয়া

```jsx
// ProtectedRoute.jsx
import { Navigate, useLocation, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}  // কোথা থেকে redirect হলো
        replace
      />
    );
  }
  return <Outlet />;
}

// Login.jsx-এ:
const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from?.pathname || '/';

const handleLogin = () => {
  // login করো...
  navigate(from, { replace: true });  // আগের page-এ ফিরে যাও
};
```

### Role-based Route

```jsx
function RoleRoute({ allowedRoles, userRole }) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
}

// ব্যবহার:
<Route element={<RoleRoute allowedRoles={['admin']} userRole={user.role} />}>
  <Route path="/admin" element={<AdminPanel />} />
</Route>
```

> এই pattern Django-র `@login_required` decorator-এর মতো। একটা wrapper route, সবার ভেতরে protected routes।

---

## Loader ও Action (v6.4+)

React Router v6.4-এ Remix-এর concept আসে। Route নিজেই data fetch করতে পারে।

### Loader — Route render হওয়ার আগে data load

```jsx
// router.jsx
const router = createBrowserRouter([
  {
    path: "/users/:id",
    element: <UserProfile />,
    async loader({ params }) {
      const res = await fetch(`/api/users/${params.id}`);
      if (!res.ok) throw new Response("Not Found", { status: 404 });
      return res.json();
    },
  }
]);

// UserProfile.jsx
import { useLoaderData } from 'react-router-dom';

function UserProfile() {
  const user = useLoaderData();  // loader-এর return value
  return <div>{user.name}</div>;
}
```

### Action — Form submit handle করা

```jsx
// router.jsx
{
  path: "/create-post",
  element: <CreatePost />,
  async action({ request }) {
    const formData = await request.formData();
    const title = formData.get('title');
    await createPost({ title });
    return redirect('/posts');
  }
}

// CreatePost.jsx — React Router-এর Form ব্যবহার করো
import { Form, useActionData } from 'react-router-dom';

function CreatePost() {
  const actionData = useActionData();  // error বা result
  return (
    <Form method="post">
      <input name="title" />
      <button>Create</button>
    </Form>
  );
}
```

### Error Boundary

```jsx
// router.jsx
{
  path: "/users/:id",
  element: <UserProfile />,
  errorElement: <ErrorPage />,  // loader error হলে এটা দেখাবে
  loader: userLoader,
}

// ErrorPage.jsx
function ErrorPage() {
  const error = useRouteError();
  return <div>Error: {error.statusText || error.message}</div>;
}
```

> Loader/Action pattern ব্যবহার করলে component-এ `useEffect` + `useState` দিয়ে data fetch করতে হয় না। অনেক clean code।

---

## Route Matching কীভাবে কাজ করে

### ধাপে ধাপে

```
URL = "/about" হলে Router করে:
  "/"       match? না (exact)
  "/about"  match? হ্যাঁ! → <About /> render করো
  বাকিগুলো দেখতেও হয় না
```

### URL = "/users/42" হলে

```
"/"           match? না
"/about"      match? না
"/users/:id"  match? হ্যাঁ! (42 → id param)
useParams() → { id: "42" }
```

### Wildcard "*" সবার শেষে কাজ করে

```
URL = "/xyz-random" হলে:
  সব defined route-এ match নেই
  "*" match করে → <NotFound /> দেখায়
```

---

## Important Tips ও Common Mistakes

### ❌ Mistake 1 — BrowserRouter দিয়ে wrap না করা

`useNavigate()`, `useParams()` — সব hook Router-এর বাইরে কাজ করে না।

```jsx
// ভুল:
ReactDOM.render(<App />, root);

// সঠিক:
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
```

### ❌ Mistake 2 — v5 style v6-এ লেখা

```jsx
// ভুল (v5):
<Switch>
  <Route exact path="/" component={Home} />
</Switch>

// সঠিক (v6):
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

### ❌ Mistake 3 — Outlet ভুলে যাওয়া

Nested route define করেছ কিন্তু parent layout-এ `<Outlet />` রাখোনি — child কিছুই দেখাবে না।

```jsx
// ভুল:
function DashboardLayout() {
  return <div><Sidebar /></div>; // Outlet নেই!
}

// সঠিক:
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />  {/* এটা অবশ্যই লাগবে */}
    </div>
  );
}
```

### ❌ Mistake 4 — `<a href>` ব্যবহার করা

React app-এ কখনো সাধারণ `<a>` tag দিয়ে internal link করো না — page reload হবে।

```jsx
// ভুল:
<a href="/about">About</a>

// সঠিক:
<Link to="/about">About</Link>
```

### ✅ Best Practice 1 — Route গুলো আলাদা file-এ রাখো

```jsx
// routes.jsx
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "*", element: <NotFound /> },
]);
```

### ✅ Best Practice 2 — Lazy loading ব্যবহার করো

বড় app-এ initial bundle size কমাতে:

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

<Route
  path="/dashboard"
  element={
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  }
/>
```

### ✅ Best Practice 3 — 404 page সবসময় রাখো

```jsx
<Routes>
  {/* ... */}
  <Route path="*" element={<NotFound />} />  {/* সবার শেষে */}
</Routes>
```

### ✅ Best Practice 4 — Protected Route pattern ব্যবহার করো

```jsx
// একটা wrapper দিয়ে সব protected routes ঢেকে দাও
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
</Route>
```

---

## কোনটা কখন ব্যবহার করবো — Quick Reference

| চাহিদা | ব্যবহার করো |
|--------|------------|
| Simple internal link | `<Link>` |
| Navbar active styling | `<NavLink>` |
| Code থেকে navigate | `useNavigate()` |
| URL param পড়া (`:id`) | `useParams()` |
| Query string (`?key=value`) | `useSearchParams()` |
| Current URL সব তথ্য | `useLocation()` |
| Redirect করা | `<Navigate>` |
| Shared layout (sidebar, navbar) | Nested Route + `<Outlet>` |
| Auth guard / login check | Protected Route wrapper |
| Data fetching (v6.4+) | `loader` + `useLoaderData()` |
| Form handling (v6.4+) | `action` + `useActionData()` |
| Navigation state check | `useNavigation()` |
| Error page | `errorElement` + `useRouteError()` |
| Route match check | `useMatch()` |
| Parent → child data pass | `useOutletContext()` |
| Static hosting (GitHub Pages) | `HashRouter` |
| Testing | `MemoryRouter` |
| Production app | `BrowserRouter` বা `createBrowserRouter` |

---

## সংক্ষিপ্ত সার

React Router না থাকলে তোমার React app একটা single page হয়ে আটকে থাকবে। Real world app বানাতে গেলে URL-based navigation ছাড়া কোনো উপায় নেই।

- **কেন দরকার:** SPA-তে URL বদলানো, back/forward, bookmark, sharing — সব কিছুর জন্য
- **আসল রহস্য:** Browser-এর History API + `event.preventDefault()`
- **v6 ব্যবহার করো:** নতুন project-এ সবসময় v6+
- **Core জিনিস:** `Routes`, `Route`, `Link`, `useNavigate`, `useParams`, `Outlet`
- **Advanced:** Protected Route, Nested Routes, Loader/Action (v6.4+)

React Router সেই কাজটাই করে — browser আর React-এর মাঝখানে দাঁড়িয়ে URL দেখে সঠিক component দেখায়, কোনো server request ছাড়াই।

---

*লেখা: Nahid Hasan Ukil | Based on: React Router v6 Documentation & Chat Discussion*