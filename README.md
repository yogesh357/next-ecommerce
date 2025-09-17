# 🛒 E-Commerce Website  

A modern e-commerce web application built with **Next.js**, powered by **Sanity CMS** for content management, and integrated with **Stripe** for secure payment processing.  

---

## 🚀 Features  

- 🖼️ **Headless CMS with Sanity** – Easily manage products, categories, and content.  
- ⚡ **Next.js** – Fast, SEO-friendly, and optimized React framework.  
- 💳 **Stripe Payments** – Secure checkout and payment processing.  
- 🛍️ **Dynamic Cart System** – Add, remove, and update products in the cart.  
- 📱 **Responsive Design** – Fully responsive across devices.  
- 🔍 **Product Search & Filtering** (if added).  

---

## 🛠️ Tech Stack  

- **Frontend:** [Next.js](https://nextjs.org/)  
- **CMS:** [Sanity.io](https://www.sanity.io/)  
- **Payments:** [Stripe](https://stripe.com/)  
- **Styling:** Tailwind CSS / CSS Modules (choose based on your setup)  
- **Deployment:** Vercel / Netlify  

---

## 📂 Project Structure  

```bash
.
├── sanity/         # Sanity CMS schemas & configurations
├── src/            # Next.js app source
│   ├── components/ # Reusable UI components
│   ├── pages/      # Application routes
│   ├── lib/        # Utility functions (Stripe, Sanity client, etc.)
│   └── styles/     # Global & module styles
└── package.json
