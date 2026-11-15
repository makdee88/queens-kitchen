# Queen's Kitchen — Stockholm 🍛

Welcome to the official website repository for **Queen's Kitchen**, bringing authentic West Bengal & Kolkata home-style catering and pop-up feasts to Stockholm.

- **Live Website:** [https://queenskitchen.pages.dev](https://queenskitchen.pages.dev)
- **Content Editor (CMS):** [https://app.pagescms.org](https://app.pagescms.org)
- **Official Facebook Page:** [facebook.com/queenskitchenstockholm](https://www.facebook.com/queenskitchenstockholm)

> **Kitchen Standard:** 100% Beef-Free & Pork-Free. All dishes are freshly prepared in small batches using authentic West Bengal spices and recipes.

---

## How the Website Works (In Simple Terms)

Instead of using a heavy, slow website builder that needs constant security updates, this website works like a **digital recipe book**:

1. **The Storage Cabinet (GitHub):** All of the website's text, menu prices, event announcements, and photos are safely stored here in GitHub.
2. **The Easy Editor (Pages CMS):** You never have to look at code to update the website. You log into **Pages CMS** with a simple form-based screen—just like filling out a document—to add dishes, change prices, post upcoming events, or upload food photos.
3. **The Live Website (Cloudflare Pages):** Cloudflare takes your saved text and photos, automatically optimizes the images so the site loads super fast on mobile phones, and publishes the finished pages worldwide for free.

---

## How to Update & Publish Content (Step-by-Step)

To save energy and avoid rebuilding the entire website every time you fix a small typo, updates work in **two steps**: **Save your edits**, then **Publish**.

### Step 1: Make Your Changes in Pages CMS
1. Open [app.pagescms.org](https://app.pagescms.org) on your phone, tablet, or computer and sign in with GitHub.
2. Select the **`queens-kitchen`** repository.
3. Use the left-hand menu to edit any section:
   - **Upcoming Events:** Add new pop-ups, dates, locations, posters, or toggle old events off (`Show on Website`).
   - **Menu & Combo Builder:** Update base package prices (e.g., *Kolkata Bhoj*, *Royal Feast*), add/remove dishes, adjust extra per-person prices, or mark items as available/unavailable.
   - **Food & Event Gallery:** Upload new photos and add captions. *(Photos are automatically compressed to fast-loading WebP format when published—no manual resizing needed!)*
   - **About Us Page:** Edit the kitchen story and kitchen standards.
   - **Kitchen Contact & Hours:** Update the phone/WhatsApp number, notification email, Facebook link, or the announcement banner at the top of the home page.
4. Click **Save** after each change. *(Your changes are now safely saved, though not yet visible on the public site.)*

### Step 2: Publish Your Updates Live
Once you have finished all your edits (whether 1 change or 15 changes):
1. In the Pages CMS left-hand menu, click **Publish Website Updates** (`trigger-build.json`).
2. Update the **Last Published Date & Time** to the current time (and optionally write a short note like *"Added weekend biryani menu"*).
3. Click **Save**.

**What happens next?** Updating that single publish file signals Cloudflare to build and publish all of your queued changes at once. Wait about **60–90 seconds**, then refresh [queenskitchen.pages.dev](https://queenskitchen.pages.dev) to see your updates live!

---

## How Hosting & Builds Work

- **Where is it hosted?** The website is hosted on **Cloudflare Pages**, which serves the site from data centers close to visitors in Stockholm and around the world with free SSL security (`https://`) and zero monthly hosting fees.
- **How are builds triggered?** Cloudflare watches one specific file in this repository: `trigger-build.json`. Whenever you save **Publish Website Updates** in Pages CMS, Cloudflare automatically:
  1. Downloads the latest text and photos from GitHub.
  2. Compresses any newly uploaded gallery images for fast mobile loading.
  3. Rebuilds all website pages (`Home`, `About Us`, `Events`, `Gallery`, and `Build Your Menu`).
  4. Pushes the updated site live with zero downtime.

---

## Where Customer Menu Requests Go

When a visitor uses the **Build Your Menu Combo** calculator on the website and submits their contact details:
1. Their name, email, phone/WhatsApp number, event date, guest count, chosen dishes, and estimated price are immediately saved in our private **Cloudflare D1 database** (`queens-kitchen-leads`).
2. *(Optional)* When connected via the `SHEETS_WEBHOOK_URL` setting in Cloudflare, a copy of every inquiry is also automatically added as a new row in **Google Sheets** for easy tracking.

---

## Project Folder Map (For Reference)

```text
queens-kitchen/
├── .pages.yml                  # Controls the visual forms inside Pages CMS
├── trigger-build.json          # "Publish switch" that tells Cloudflare when to rebuild
├── public/
│   └── images/uploads/         # Photos