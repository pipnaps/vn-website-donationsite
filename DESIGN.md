# Website Specification: Benedictine Monastery of Thiên Hòa (Fundraiser & Progress)

This document outlines the design, structure, and features of the Đan Viện Biển Đức Thiên Hòa website, built as a static, multi-page site hosted on Firebase Hosting using Bootstrap.

---

## 1. Domain Model

- **Page**: A static HTML file representing a site view.
- **ProgressPhoto**: A JPEG image showing chapel building progress.
- **Donor**: A person or organization that contributed to the fundraiser.
- **Donation**: A single contribution record associated with a Donor.
- **Manifest (`gallery.json`)**: A JSON file mapping ProgressPhoto filepaths to metadata (date, caption).
- **HelperScript**: A Bash automation script in the repository for asset management.
- **ExcelConverter**: A Python utility to map dropped Excel donation lists to canonical CSV.

---

## 2. Directory Structure

```text
/
├── firebase.json               # Firebase Hosting configuration
├── .firebaserc                 # Firebase project target aliases
├── index.html                  # Trang chủ (Appeal Letter & History)
├── tiendo.html                 # Tiến độ (Timeline, Photo Gallery, Schedule Table)
├── donggop.html                # Đóng góp (Vietcombank QR & Donation Table)
├── lienhe.html                 # Liên hệ (Location Map & Monastic Office)
├── scripts/
│   ├── convert-assets.py       # Python script to convert Excel data to CSV/JSON
│   └── update-gallery.sh       # Bash helper script to scan photos and build gallery.json
└── assets/
    ├── css/
    │   └── custom.css          # Overrides and theme variables for Bootstrap
    ├── data/
    │   ├── donations.csv       # Parsed donation data (empty/waiting for Excel upload)
    │   ├── schedule.json       # Parsed construction schedule
    │   └── gallery.json        # Auto-generated image manifest
    ├── docs/                   # PDFs / scans from Monastery
    └── images/
        ├── banking_qr.jpg      # Copied real Vietcombank QR scan
        ├── hero-bg.jpg         # Copied real construction photo
        └── progress/           # Directory to drop progress photos (JPEG)
```

---

## 3. Page Specifications

All pages share a consistent Bootstrap-based navigation header and footer utilizing the natural light theme.

### 3.1. Trang chủ (`index.html`)
- **Hero Section**: Immersive full-screen background using the real construction photo (`assets/images/hero-bg.jpg`), featuring a simple cross, the monastery name, and a quotation: *"Hãy đến xây cất lại bức tường... và chúng ta sẽ không còn phải chịu sỉ nhục nữa." (Nê-hê-mi-a 2,17)*.
- **Thư Ngỏ (Appeal Letter)**: Render the official introduction letter from Bề Trên Đan sĩ Lm. Phanxicô Paola Huỳnh Hoàng Nam, OSB, and the approval of Bishop Gioan Bt. Nguyễn Huy Bắc of Ban Mê Thuột Diocese.
- **Sidebar Links**: Links to view original photo scans of the letters and the detailed budget estimate.

### 3.2. Tiến độ (`tiendo.html`)
- **Kế Hoạch Triển Khai (Schedule Table)**: Renders a Bootstrap table containing the construction stages (Stages 1-8) loaded dynamically from `assets/data/schedule.json`.
- **Nhật Ký Bằng Ảnh (Photo Timeline)**: Chronological timeline of progress photos loaded dynamically from `assets/data/gallery.json`. Includes a Bootstrap Modal-based lightbox viewer for high-resolution photo zooming.

### 3.3. Đóng góp (`donggop.html`)
- **Vietcombank QR Section**: Displays the scanned bank QR code (`assets/images/banking_qr.jpg`) alongside details:
  * Bank: *Vietcombank*
  * Account Holder: *HUYNH HOANG NAM*
  * Account Number: *1908 8028 31*
- **Danh Sách Ân Nhân (Donations Table)**:
  * Reads `assets/data/donations.csv`.
  * If the CSV is empty/not found, displays a notice: *"Danh sách đóng góp đang được cập nhật..."* (List is being updated...).
  * If data exists, displays a paginated, sortable Bootstrap table with a live search filter.

### 3.4. Liên hệ (`lienhe.html`)
- **Monastery Details**: Address at Krông Pắc, Đắk Lắk, phone number, and contact email.
- **Monastic Office Info**: Overview of the Benedictine (OSB) daily life of prayer and work.
- **Embedded Google Map**: Positioned at Tân Tiến, Krông Pắc, Đắk Lắk, Vietnam.

---

## 4. Visual Theme & Aesthetics (Natural Light Theme)

- **Vibe**: Natural, spacious, clean, ephemeral, faithful, and organic.
- **Color Palette**:
  - **Background**: Soft natural sand / warm linen (`#F4F1EA`)
  - **Cards & Elements**: Pure alabaster white (`#FFFFFF`) with thin warm grey borders (`#E0DBD3`)
  - **Primary Accents**: Rich olive/forest green (`#3F5E4D`)
  - **Secondary Accents**: Soft slate / stone grey (`#7E8B83`)
  - **Text**: Dark soil charcoal (`#2B2B2A`)
- **Typography**:
  - System or Google Fonts serif headings (*Lora* or *Playfair Display*) for solemnity
  - Clean sans-serif (*Inter* or *system-ui*) for readability
- **Bootstrap Integration**: Use Bootstrap 5 grid, containers, tables, navbars, modals, and Bootstrap Icons.

---

## 5. Technology & Hosting

- **Frontend Toolkit**: Bootstrap 5 (loaded via CDN) & Bootstrap Icons.
- **Hosting**: Firebase Hosting. Static pages served from `/` (root directory).
- **Automation & Conversion**:
  - `scripts/update-gallery.sh` to update image manifest.
  - `scripts/convert-assets.py` to convert dropped Excel sheets to CSV databases.
