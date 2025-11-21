# 🎧 Podcast App – React + Vite

A fully-featured podcast streaming application built as the final portfolio project for DJS. The app provides searchable and browsable shows, detailed show pages with seasons and episodes, a global audio player, favorites system, theme switching, and smooth navigation.

---

## 🌸 Features

### 🔊 **Global Audio Player**

* Persistent audio player fixed to the bottom of the app
* Playback continues during navigation
* Play, pause, seek, and progress tracking
* Displays current episode info (title, artwork, duration)
* Guard against accidental tab close during playback

### ❤️ **Favorites System**

* Favorite/unfavorite any podcast episode
* Uses `localStorage` for permanent persistence
* Favorites page showing:

  * grouped episodes by show
  * time and date added
  * sorting options
* Visual heart icon indicating favorited status

### 🎠 **Recommended Shows Carousel**

* Responsive carousel using `react-slick`
* Swipe/drag support
* Shows 1–5 items depending on screen size
* Clicking a card opens the show detail page

### 🌗 **Theme Toggle (Light/Dark Mode)**

* Theme stored in `localStorage`
* Applied before page render to avoid flicker
* Full Tailwind dark mode support
* Icon switcher in the app header

### 📚 **Show Detail Page**

* Fetches full show metadata + seasons + episodes
* Expand/collapse season accordion
* Episode cards with:

  * play button
  * favorite button
  * timestamps

### 🏠 **Home Page**

* Fetches all show previews from the API root
* Search, browse, and recommendation carousel
* Responsive grid layout

### ➕ **SPA Enhancements**

* Scroll-to-top on route change
* Smooth routing via React Router
* Error + loading states for all API calls
* Local caching to reduce API calls

---

## 🛠️ Technologies Used: 

| **React** (with Hooks + Context API)  for UI Framework    
| **Vite**                                    
| **Tailwind CSS v4 (class-based dark mode)** 
| **Tailwind utility classes **                 
| **React Router v6**                         
| **react-slick**  for the Carousel                        
| **date-fns** for Dates                              
| **Vercel** for Deployment                                

### **API**

The app consumes the public Podcast API:
🔗 **[https://podcast-api.netlify.app](https://podcast-api.netlify.app)**

Endpoints used:

* `/` list of show previews
* `/id/:id` full show details (with seasons & episodes embedded)
* `/genre/:id` fetch shows of a single genre

---

## 📦 Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Run the development server**

```bash
npm run dev
```

Your app is now available at:
**[http://localhost:5173/](http://localhost:5173/)** (or whichever port Vite chooses)

## 🌐 Deployment (Vercel)

The project is configured for zero-config Vercel deployment.

### **Deploy steps:**

1. Push the project to GitHub
2. Visit [https://vercel.com](https://vercel.com)
3. Click **Add New → Project**
4. Import your GitHub repo
5. Vercel auto-detects Vite and sets:

   * Build command → `npm run build`
   * Output directory → `dist`
6. Click **Deploy**

## 🧡 Usage Examples

### Play an Episode

1. Navigate to any show
2. Open a season
3. Click **▶ Play** on an episode
4. The global audio player begins playing at the bottom

### Favorite an Episode

1. Click the ♥ icon
2. Visit `/favorites` to view saved episodes
3. Your favorites persist even after page reload

### Toggle Theme

Click the 🌙 / ☀️ button in the header
Your choice is saved across sessions

Podcast data provided by:
🔗 [https://podcast-api.netlify.app](https://podcast-api.netlify.app)

