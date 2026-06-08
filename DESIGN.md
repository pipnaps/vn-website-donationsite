# Website Specification: Vietnamese Catholic Parish Fundraiser

This document outlines the design, structure, and features of the Vietnamese Catholic Parish Fundraiser website, which is built as a static, multi-page site hosted on GitHub Pages.

---

## 1. Domain Model

- **Page**: A static HTML file representing a site view.
- **ProgressPhoto**: A JPEG image showing church building progress.
- **Donor**: A person or organization that contributed to the fundraiser.
- **Donation**: A single contribution record associated with a Donor.
- **Manifest (`gallery.json`)**: A JSON file mapping ProgressPhoto filepaths to metadata (date, caption).
- **HelperScript**: A Bash automation script in the repository for asset management.

---

## 2. Directory Structure

```text
/
├── index.html                  # Trang chủ (Home & Pastoral Letters)
├── tiendo.html                 # Tiến độ (Timeline & Gallery)
├── donggop.html                # Đóng góp (Donations & Banking)
├── lienhe.html                 # Liên hệ (Contact & Parish Info)
├── scripts/
│   └── update-gallery.sh       # Bash helper script to scan photos and build gallery.json
└── assets/
    ├── css/
    │   └── style.css           # Core stylesheet (Design system, utilities, responsive layouts)
    ├── data/
    │   ├── donations.csv       # Source donation data
    │   └── gallery.json        # Auto-generated image manifest
    ├── docs/                   # PDF letters from Parish officials
    └── images/
        ├── logo.png            # Parish/Church logo
        └── progress/           # Directory to drop building progress photos (JPEG)
```

---

## 3. Page Specifications

All pages share a consistent visual frame: a responsive navigation header with the parish logo and a footer containing address, contact info, and copyright in Vietnamese.

### 3.1. Trang chủ (`index.html`)
- **Hero Section**: High-quality render/photo of the church building, a headline welcoming visitors, and a call-to-action button pointing to the Donation page.
- **Pastoral Letters**: Section displaying welcome/appeal letters from Parish officials (e.g., Pastor/Parish Priest) in Vietnamese. Include a link to download the official PDF letters from `assets/docs/`.
- **Highlights**: A summary of the progress and the goals of the fundraising campaign.

### 3.2. Tiến độ (`tiendo.html`)
- **Chronological Timeline**: A visual gallery loaded dynamically from `assets/data/gallery.json`.
- **Photo Cards**: Each photo card displays the image, the date it was taken, and a description.
- **Interactive Lightbox**: Clicking on any photo opens a fullscreen high-resolution lightbox viewer allowing users to zoom and navigate between photos.

### 3.3. Đóng góp (`donggop.html`)
- **Banking Details Section**:
  - Bank Name, Account Number, Account Holder Name, and Branch.
  - An embedded dynamic **VietQR Code** image configured to auto-fill bank and account information for quick mobile scanning.
- **Donations Table**:
  - Live, client-side table rendering donation records from `assets/data/donations.csv`.
  - **Features**: Search input, sorting columns (Date, Name, Amount), and pagination (10/25/50 items per page).
  - Schema for `donations.csv`: `Date,Name,Amount,Note`.

### 3.4. Liên hệ (`lienhe.html`)
- **Parish Details**: Full address, telephone numbers, emails, and active office hours.
- **Map Integration**: Embedded Google Maps location of the parish/church.
- **Contact Form / Details**: Quick contact instructions.

---

## 4. Visual Theme & Aesthetics

- **Vibe**: Traditional, solemn, premium, and welcoming.
- **Color Palette**:
  - **Primary**: Deep Burgundy (`#800020` or HSL equivalent)
  - **Accent**: Warm Gold/Amber (`#D4AF37` or HSL equivalent)
  - **Background**: Soft off-white / Warm Cream (`#FAF9F6`) for premium readability
  - **Text**: Dark charcoal (`#2C2C2C`) for body text
- **Typography**:
  - Headings: Serif font via Google Fonts (e.g., *Playfair Display*)
  - Body: Modern sans-serif (e.g., *Inter* or *Outfit*) for high legibility
- **Layout & Polish**: Fully responsive grids, smooth transition effects, soft card shadows, and glassmorphism headers.

---

## 5. Helper Script & Automation

A Bash script at `scripts/update-gallery.sh` is responsible for updating the image gallery database:
- **Scan Directory**: Scans all `.jpg`/`.jpeg` files in `assets/images/progress/`.
- **Extract Metadata**:
  - Parses dates from filename (e.g., `YYYY-MM-DD_some_description.jpg`).
  - Defaults to file modification time if filename parsing is not available.
- **Generate Manifest**: Writes a clean `assets/data/gallery.json` file in the following format:
  ```json
  [
    {
      "src": "assets/images/progress/2026-06-08_description.jpg",
      "date": "2026-06-08",
      "caption": "Description parsed from filename or manual overrides"
    }
  ]
  ```
