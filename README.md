# J Designs & Fashion Institute — React site

React + Vite + Tailwind CSS version of the J Designs single-page website.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for deployment

```bash
npm run build      # outputs static files to dist/
npm run preview    # serve dist/ locally to check it
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).
Asset paths are relative, so the site also works from a sub-folder.

## Where things live

```
src/
  data/content.js        all text, phone numbers and links (edit copy here)
  index.css              Tailwind theme (colours, font, breakpoints) + the few custom styles
  hooks/                 useInView, useCountUp, useMediaQuery, useActiveSection
  components/
    layout/              Header, Footer, SideActions, Logo
    sections/            Hero, Notice, QuickBar, Audience, Stats, About, Courses,
                         Approach, MissionVision, Founder, Contact, EnquiryForm
    ui/                  Button, Card, Reveal, SectionTitle
    icons/               SVG icons and illustrations
```

## Adding photos later

Card image areas use `CardMedia` (`src/components/ui/Card.jsx`). Put an image in `public/images/`
and render `<img src="images/your-photo.jpg" alt="..." className="size-full object-cover" />`
inside the relevant `CardMedia` in place of the icon.
