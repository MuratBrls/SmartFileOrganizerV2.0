# 🤖 Smart File Organizer v2.0

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python) 
![CustomTkinter](https://img.shields.io/badge/GUI-CustomTkinter-green?style=for-the-badge) 
![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-0078D6?style=for-the-badge&logo=windows)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[🇹🇷 Türkçe](#-türkçe-kullanım-rehberi) | [🇺🇸 English](#-english-user-guide)**

---

<div align="center">
  <h3>Dağınık masaüstlerine ve klasörlere son! / Say goodbye to messy desktops!</h3>
  <p>Yapay zeka mantığıyla çalışan, arka planda sessizce klasörlerinizi düzenleyen ve izleyen akıllı asistan.</p>
</div>

---

# 🇹🇷 Türkçe Kullanım Rehberi

**Smart File Organizer**, bilgisayarınızdaki dosya kaosunu yönetmek için geliştirilmiş, **v2.0** sürümüyle tamamen yenilenmiş bir araçtır. Artık sadece düzenlemekle kalmaz, klasörlerinizi **canlı olarak izler**.

## ✨ Temel Özellikler

1.  **📂 Akıllı Dosya Ayrıştırma:** Dosyaları uzantılarına göre (Resim, Video, Belge, Ses...) algılar ve ilgili klasörlere taşır.
2.  **👁️ Canlı Takip Modu (Watchdog):** Bir klasörü "Canlı Takip" moduna aldığınızda, oraya düşen her dosya anında yakalanır ve yerleştirilir. Sürükle-bırak veya indirme yapmanız fark etmez.
3.  **🖱️ Sağ Tık Entegrasyonu (Context Menu):**
    *   **"Burayı Akıllı Düzenle":** Herhangi bir klasöre sağ tıklayıp anında düzenleyebilirsiniz.
    *   **"Yeni Akıllı Klasör Oluştur":** Masaüstüne veya herhangi bir yere sağ tıklayıp, izlenen özel bir klasör yaratabilirsiniz.
4.  **👻 Sistem Tepsisi (System Tray):** Programı kapatsanız bile (X), saatin yanındaki tepsiye küçülür ve arka planda çalışmaya devam eder.
5.  **⚡ Tek Dosya (Portable):** Kurulum gerektirmez. Tek bir `.exe` dosyasıdır.

## 🚀 İndirme ve Kurulum (Adım Adım)

Programın kurulumu yoktur, ancak rahat kullanım için aşağıdaki adımları takip etmeniz önerilir:

1.  **İndirme:** Bu sayfadaki **Releases** bölümünden (veya proje içindeki `Release` klasöründen) **`SmartOrganizer.exe`** dosyasını bilgisayarınıza indirin.
2.  **Konumlandırma:** İndirdiğiniz dosyayı güvenli bir klasöre (Örn: `Belgelerim` içine) taşıyın.
3.  **Kısayol Oluşturma:**
    *   `SmartOrganizer.exe` dosyasına sağ tıklayın.
    *   **"Gönder"** -> **"Masaüstü (kısayol oluştur)"** seçeneğini seçin.
    *   Böylece masaüstünüzden programa kolayca erişebilirsiniz.

## 📖 Nasıl Kullanılır?

### ⚠️ İlk Çalıştırma ve Yönetici İzni
Program sistemin sağ tık menüsüne yerleşmek için **Yönetici Yetkisine** ihtiyaç duyar.

1.  Masaüstündeki kısayola (veya exe dosyasına) **Sağ Tıklayın** ve **"Yönetici olarak çalıştır"** deyin.
    *   *(Normal açarsanız da entegrasyon butonuna bastığınızda otomatik olarak yönetici izni isteyecektir, "Evet" diyerek onaylayın.)*
2.  Açılan pencerede sağ üstteki turuncu **"Sisteme Entegre Et (Sağ Tık)"** butonuna basın.
3.  Log ekranında *"✅ BAŞARILI! Sağ tık menüleri eklendi."* yazısını gördüğünüzde işlem tamamdır.

### 1. Manuel Düzenleme
*   Programı açın.
*   **"Seç"** butonuyla dağınık bir klasörü seçin.
*   **"Şimdi Temizle"** butonuna basın. Dosyalar anında kategorilere ayrılacaktır.

### 2. Canlı Takip (Otomasyon)
*   Hedef klasörü seçin.
*   Alttaki **"CANLI TAKİP MODU"** anahtarını açın (Yeşil olur).
*   Programı **"X"** ile kapatsanız bile saatin yanındaki sistem tepsisine küçülecek ve arka planda çalışmaya devam edecektir.

---

## 🗂️ Dosya Kategorileri

Program dosyaları şu klasörlere ayırır:

| Ana Klasör | İçerdiği Uzantılar |
| :--- | :--- |
| **🖼️ Gorseller** | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.heic`... |
| **🎬 Videolar** | `.mp4`, `.mov`, `.avi`, `.mkv`, `.flv`, `.webm`... |
| **🎵 Muzik** | `.mp3`, `.wav`, `.aac`, `.flac`, `.spotify`... |
| **📄 Belgeler** | `.pdf`, `.docx`, `.doc`, `.txt`, `.xlsx`, `.pptx`, `.csv`... |
| **📦 Arsivler** | `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.iso`... |
| **💾 Programlar** | `.exe`, `.msi`, `.bat`, `.apk`... |
| **💻 Kodlama** | `.py`, `.js`, `.html`, `.css`, `.json`, `.sql`... |

---

# 🇺🇸 English User Guide

**Smart File Organizer** is a modern, AI-logic powered desktop tool designed to organize your chaotic folders in seconds. With version **2.0**, it acts as a background agent enabling **Real-time Monitoring**.

## ✨ Key Features

1.  **📂 Smart Sorting:** Automatically detects file types (Images, Videos, Docs...) and moves them to appropriate folders.
2.  **👁️ Live Monitoring (Watchdog):** Watches a specific folder for changes. Any file downloaded, pasted, or moved there is instantly organized.
3.  **🖱️ Context Menu Integration:**
    *   **"Smart Organize Here":** Right-click any folder to clean it up instantly.
    *   **"Create New Smart Folder":** Right-click on background to create a strictly monitored folder.
4.  **👻 System Tray:** Minimized to the system tray (near clock) instead of closing, keeping your folders watched silently.
5.  **⚡ Portable:** Single `.exe` file. No installation required.

## 🚀 Download & Install

1.  Download **`SmartOrganizer.exe`** from the **Releases** section (or the `Release` folder in this repo).
2.  Place it anywhere (e.g., Desktop).
3.  Double-click to run.

## 📖 How to Use

### 1. Manual Cleanup
*   Open the app.
*   Select a target folder using **"Seç"** (Select).
*   Click **"Şimdi Temizle"** (Clean Now).

### 2. Live Monitoring
*   Select a folder.
*   Toggle the **"CANLI TAKİP MODU"** switch to ON.
*   You can now close the window; it will sit in the system tray and organize incoming files automatically.

### 3. Enabling Right-Click Menu
*   Click the orange **"Sisteme Entegre Et"** (Integrate to System) button.
*   The app might restart itself to ask for **Admin Privileges**. Click Yes.
*   Once done, you can right-click any folder to use the features.

---

## 🧑‍💻 For Developers (Building from Source)

If you want to modify the code or build the EXE yourself:

### Requirements
*   Python 3.10+
*   `pip install -r requirements.txt`

### Build Command (PyInstaller)
To create the single-file executable:
```powershell
pyinstaller --noconsole --onefile --collect-all customtkinter --collect-all watchdog --collect-all pystray --name "SmartOrganizer" main.py
```

---

## 📜 License
MIT License. Copyright © 2025 Murat.
