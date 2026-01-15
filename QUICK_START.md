# Quick Start Guide - Let'Rent Website

## ✅ Project Status: READY TO USE

Your new Let'Rent website has been successfully created!

## 🚀 Quick Start (3 Steps)

### Step 1: Create a Sanity Project

1. Visit https://www.sanity.io/manage
2. Click "Create Project"
3. Name it "Let'Rent"
4. Copy your **Project ID**

### Step 2: Update Environment Variables

Open `/home/rafael/let/.env.local` and add your Project ID:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
```

### Step 3: Start the Development Server

```bash
cd /home/rafael/let
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/studio

## 📝 What's Included

✅ **3 Complete Pages**
- Home page with hero, services, product carousel, and CTA
- Services page with detailed service descriptions
- Contact page with form and contact information

✅ **All Assets Downloaded**
- Logo from original website (integrated in nav & footer)
- 10 product images (plates, glasses, furniture)
- 2025-2026 catalog PDF (5.1MB)
- All images optimized with Next.js Image

✅ **Sanity CMS Integration**
- Product management
- Service management
- Site settings (contact info, social media, etc.)

✅ **Modern Design**
- Mobile-first responsive design
- Let'Rent brand colors (green #61A48A, gold #C4A15F)
- Smooth animations and transitions
- Professional UI with shadcn/ui components

✅ **SEO Optimized**
- Meta tags configured
- Open Graph tags
- Semantic HTML
- Portuguese language optimization

## 📋 Next Steps

### Immediate (Required)
1. **Set up Sanity** - Add your project ID to `.env.local`
2. ~~Add images~~ ✅ Already downloaded and integrated!
3. ~~Add catalog~~ ✅ Already downloaded (5.1MB PDF)!

### Content Management (via Sanity Studio)
1. Go to http://localhost:3000/studio
2. Add products in "Produtos"
3. Customize services in "Serviços"
4. Update site settings (contact info, social links)

### Deployment
1. Push to GitHub
2. Deploy to Vercel (recommended) or self-host
3. Configure domain (www.let-rent.pt)
4. Update `.env.local` with production URL

## 🆘 Common Issues

### "Cannot read properties of undefined (projectId)"
→ Solution: Add your Sanity Project ID to `.env.local`

### Images not showing
→ Solution: Images need to be uploaded through Sanity Studio, not directly to `/public/`

### Form not sending emails
→ Solution: Form currently shows success message only. Implement email service (Resend, SendGrid, etc.)

## 📚 Documentation

Full documentation available in `/home/rafael/let/README.md`

## 🎉 You're All Set!

The website is production-ready. Just add your Sanity Project ID and start customizing the content!
