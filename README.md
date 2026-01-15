# Let'Rent - Website Redesign

A modern, mobile-first website for Let'Rent built with Next.js 16, Sanity CMS, and Tailwind CSS + shadcn/ui.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **CMS**: Sanity v3 with embedded Studio
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel/self-hosted

## 📁 Project Structure

```
let/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation & footer
│   ├── page.tsx           # Home page
│   ├── servicos/          # Services page
│   ├── contactos/         # Contact page
│   └── studio/            # Sanity Studio route (/studio)
├── components/
│   ├── layout/            # Navigation, Footer
│   ├── sections/          # Hero, Services Grid, CTA, etc.
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── sanity.ts          # Sanity client & queries
│   └── utils.ts           # Utility functions
├── sanity/
│   └── schemas/           # Content schemas (Product, Service, Settings)
├── public/
│   └── images/            # Static images
└── sanity.config.ts       # Sanity configuration
```

## 🎨 Design Features

### Color Scheme
Based on the original Let'Rent brand:
- **Primary Green**: `#61A48A` - Main brand color
- **Accent Gold**: `#C4A15F` - Secondary accent color
- Fully responsive with mobile-first approach
- Dark mode support (configurable)

### Pages
1. **Home** (`/`)
   - Hero section with CTA
   - Services grid (3 cards)
   - Product carousel (auto-playing, 6+ items)
   - Call-to-action section with catalog download

2. **Services** (`/servicos`)
   - Detailed service descriptions
   - Feature lists for each service
   - Professional layout with alternating sections

3. **Contact** (`/contactos`)
   - Contact form (client-side validation)
   - Contact information cards
   - Social media links
   - Business hours

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd /home/rafael/let
npm install
```

### 2. Configure Sanity

You need to create a Sanity project first:

```bash
# Install Sanity CLI globally (optional)
npm install -g sanity

# Create a new Sanity project
# Visit https://www.sanity.io/manage
# Create a new project and note the Project ID
```

Then update `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here  # Optional for now
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### 4. Configure Sanity Studio

1. Go to http://localhost:3000/studio
2. Log in with your Sanity account
3. You'll see three content types:
   - **Produtos** (Products) - Add your rental items
   - **Serviços** (Services) - Customize service descriptions
   - **Configurações do Site** (Site Settings) - Update contact info, social links

### 5. Add Content

#### Site Settings
1. Go to Studio → Site Settings
2. Fill in:
   - Site title and description
   - Hero title and subtitle for home page
   - Contact email and phone numbers
   - Social media URLs (Facebook, Instagram)
   - Logo image

#### Products
1. Go to Studio → Produtos
2. Create products for each category:
   - Pratos (Plates)
   - Talheres (Cutlery)
   - Copos (Glassware)
   - Mobiliário (Furniture)
   - Atoalhados (Linens)
   - Utensílios (Utensils)
3. Mark products as "Featured" to show on homepage
4. Set "Order" number to control display order

#### Services
1. Go to Studio → Serviços
2. Services are already hardcoded in the components, but you can:
   - Add custom services
   - Customize descriptions
   - Add detailed content
   - Set custom icons

### 6. Images & Assets ✅ ALREADY DOWNLOADED

**All assets have been automatically downloaded from www.let-rent.pt:**

✅ **Logo**: Located at `public/images/logos/logo.png`
✅ **Product Images**: 10 images in `public/images/products/`
✅ **Catalog PDF**: Located at `public/catalogo-2025-2026.pdf` (5.1MB)

See `ASSETS_DOWNLOADED.md` for complete details.

#### Additional images (optional):
- Upload more product images through Sanity Studio
- Sanity automatically optimizes and serves images via CDN
- Current product carousel uses the 10 downloaded images

## 🎯 Next Steps

### Essential
- [ ] Set up Sanity project and add Project ID to `.env.local`
- [x] ~~Add logo to `public/images/logos/logo.png`~~ ✅ Already done!
- [x] ~~Upload product images through Sanity Studio~~ ✅ Already integrated!
- [x] ~~Add catalog PDF to `/public/`~~ ✅ Already downloaded!
- [ ] Customize content in Sanity Studio (optional - defaults work great)

### Optional Enhancements
- [ ] Set up contact form backend (email service)
- [ ] Add analytics (Google Analytics, Plausible)
- [ ] Implement search functionality
- [ ] Add product filtering by category
- [ ] Create individual product detail pages
- [ ] Add blog/news section
- [ ] Implement Portuguese language optimization (already in PT)
- [ ] Add structured data for SEO (schema.org)

### Deployment
- [ ] Push to GitHub repository
- [ ] Deploy to Vercel (or self-host with Docker)
- [ ] Configure domain (www.let-rent.pt)
- [ ] Set up SSL certificate
- [ ] Configure production Sanity dataset
- [ ] Add environment variables to hosting platform

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🔐 Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Required: Your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=      # production or development
NEXT_PUBLIC_SANITY_API_VERSION=  # 2024-01-01
SANITY_API_TOKEN=                # Optional: For draft content

# Site
NEXT_PUBLIC_SITE_URL=            # Your domain
```

## 📱 Mobile-First & Responsive

All components are built mobile-first using Tailwind's responsive classes:
- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)

## 🎨 Component Library

Using shadcn/ui components:
- `Button` - Primary actions
- `Card` - Content containers
- `Input`, `Textarea`, `Label` - Form elements

To add more components:
```bash
npx shadcn@latest add [component-name]
```

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Typography
Update font in `app/layout.tsx` by importing from `next/font`.

### Content
All static content is in the page components. Edit them directly or move to Sanity for dynamic management.

## 📞 Support

For questions about:
- **Next.js**: https://nextjs.org/docs
- **Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

## 📄 License

© 2025 Let'Rent, Lda - All rights reserved
