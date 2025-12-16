# 🤖 Smart File Organizer v2.0

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python) 
![CustomTkinter](https://img.shields.io/badge/GUI-CustomTkinter-green?style=for-the-badge) 
![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-0078D6?style=for-the-badge&logo=windows)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[🇹🇷 Türkçe Rehber](#-türkçe-kullanım-rehberi) | [🇺🇸 English Guide](#-english-user-guide)**

---

<div align="center">
  <h3>Dağınık masaüstlerine ve klasörlere son! / Say goodbye to messy desktops!</h3>
  <p>Bilgisayarınızdaki dosya trafiğini yöneten, klasörlerinizi izleyen ve otomatik düzenleyen akıllı asistan.</p>
</div>

---

# 🇹🇷 Türkçe Kullanım Rehberi

## 🌟 Nedir? Ne İşe Yarar?

**Smart File Organizer**, bilgisayarınızda karmaşa yaratan dosyaları (İndirilenler, Masaüstü vb.) tek tıkla veya tamamen otomatik olarak düzenleyen gelişmiş bir araçtır.

*   **Akıllı Ayrıştırma:** Resimleri, videoları, belgeleri ve kurulum dosyalarını tanır; hepsini ayrı klasörlere toplar.
*   **Sessiz Takipçi (Watchdog):** Siz çalışırken arka planda bir klasörü izler. Oraya bir dosya kaydettiğiniz anda onu yakalar ve ait olduğu yere taşır.
*   **İşletim Sistemi Entegrasyonu:** Windows sağ tık menüsüne yerleşerek, programı açmanıza bile gerek kalmadan her yeri düzenlemenizi sağlar.

---

## 🚀 Kurulum ve İlk Ayarlar (Önemli!)

Programın kurulum dosyası (setup) yoktur, **tek bir çalışan dosya (.exe)** halindedir. En iyi deneyim için lütfen şu adımları **sırasıyla** yapın:

### Adım 1: İndirme ve Konumlandırma
1.  **`SmartOrganizer.exe`** dosyasını indirin.
2.  Bu dosyayı bilgisayarınızda silinmeyecek, sabit bir yere taşıyın (Örneğin: `C:\Kullanıcılar\Adınız\Belgelerim` içine veya `D:` sürücüsüne).
    *   *Neden? Çünkü sağ tık menüsü bu dosyayı çalıştıracaktır. Yeri değişirse menü çalışmaz.*

### Adım 2: İlk Çalıştırma (Yönetici İzni)
Windows sağ tık menüsüne yerleşebilmek için programa **sadece bir kerelik** yönetici izni vermeniz gerekir.

1.  `SmartOrganizer.exe` dosyasına **Sağ Tıklayın** ve **"Yönetici olarak çalıştır"** seçeneğine basın.
2.  Program açılınca, sağ üst köşedeki turuncu **"Sisteme Entegre Et (Sağ Tık)"** butonuna tıklayın.
3.  Log ekranında **"✅ BAŞARILI! Sağ tık menüleri eklendi."** yazısını görünce işlem tamamdır.
    *   *Artık programı kapatabilirsiniz. Bir daha yönetici olarak çalıştırmanıza gerek kalmayacak.*

### Adım 3: Masaüstü Kısayolu Oluşturma
Programa kolay erişmek için:
1.  Exe dosyasına tekrar sağ tıklayın.
2.  **Gönder** > **Masaüstü (kısayol oluştur)** seçeneğini seçin.

---

## 📖 Detaylı Kullanım Kılavuzu

Programı iki farklı şekilde kullanabilirsiniz: **Program Arayüzü** ile veya **Sağ Tık Menüleri** ile.

### A) Program Arayüzü Üzerinden Kullanım

1.  **Manuel Temizlik:**
    *   Programı açın. **"Seç"** butonu ile karışık olan klasörü (örneğin "İndirilenler") seçin.
    *   **"Şimdi Temizle"** butonuna basın. Saniyeler içinde tüm dosyalar türlerine göre alt klasörlere ayrılacaktır.

2.  **Canlı Takip Modu (Otomasyon):**
    *   Bir klasör seçin (örneğin "Masaüstü").
    *   Alttaki **"CANLI TAKİP MODU"** anahtarını açın (Yeşil olur).
    *   Programı sağ üstteki **"X"** işaretinden kapatın.
    *   **Sonuç:** Program kapanmaz, saatin yanındaki **Sistem Tepsisine** küçülür. Arka planda o klasörü izlemeye devam eder. Masaüstüne bir dosya attığınız anda otomatik olarak düzenlenir.

---

### B) Sağ Tık Menüleri İle Kullanım (Hızlı Yöntem)

Programı açmanıza bile gerek yok! Windows içinde gezinirken şu özellikleri kullanabilirsiniz:

1.  **📂 "Burayı Akıllı Düzenle"**
    *   Herhangi bir klasöre (örn: usb belleğiniz, indirilenler klasörü) **Sağ Tıklayın**.
    *   Menüden **"Smart Organizer"** > **"Burayı Akıllı Düzenle"** seçeneğine basın.
    *   Program arka planda açılır, o klasörü temizler ve işini bitirince size bildirir.

2.  **✨ "Yeni Akıllı Klasör Oluştur"**
    *   Masaüstünde veya herhangi bir boş alanda **Sağ Tıklayın**.
    *   **"Yeni Akıllı Klasör Oluştur"** seçeneğine basın.
    *   Sizden bir isim isteyecek (örn: "ProjeDosyalari").
    *   Otomatik olarak izlenen özel bir klasör yaratılır. Bu klasörün içine attığınız her şey anında kategorilenir.

---

## 🗂️ Dosyalar Nereye Gidiyor?

Program, çalıştığı klasörün içinde şu alt klasörleri oluşturur ve dosyaları dağıtır:

| Klasör Adı | İçine Gidecek Dosya Türleri |
| :--- | :--- |
| **🖼️ Gorseller** | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.heic`, `.bmp`, `.tiff` |
| **🎬 Videolar** | `.mp4`, `.mov`, `.avi`, `.mkv`, `.flv`, `.wmv`, `.webm`, `.m4v` |
| **🎵 Muzik** | `.mp3`, `.wav`, `.aac`, `.flac`, `.spotify`, `.ogg`, `.wma` |
| **📄 Belgeler** | `.pdf`, `.docx`, `.doc`, `.txt`, `.xlsx`, `.pptx`, `.csv`, `.rtf` |
| **📦 Arsivler** | `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.iso` |
| **💾 Programlar** | `.exe`, `.msi`, `.bat`, `.apk`, `.sh` |
| **💻 Kodlama** | `.py`, `.js`, `.html`, `.css`, `.json`, `.sql`, `.xml`, `.cpp` |

---
---

# 🇺🇸 English User Guide

## 🌟 What is it?

**Smart File Organizer** is an advanced utility that cleans up messy folders on your computer instantly.

*   **Smart Sorting:** Recognizes images, videos, docs, and setups; organizes them into clean subfolders.
*   **Silent Watchdog:** Runs in the background and watches a specific folder. The moment you save or download a file there, it grabs it and puts it in the right place.
*   **OS Integration:** Sits in your Windows Right-Click menu for instant access anywhere.

---

## 🚀 Setup & First Run

This is a **portable** application (single .exe). Please follow these steps for the best experience:

### Step 1: Place the File
Move the downloaded **`SmartOrganizer.exe`** to a safe, permanent location (e.g., inside your `Documents` folder). Do not leave it in a temporary "Downloads" folder because the Right-Click menu relies on this specific path.

### Step 2: One-Time Integration (Admin)
For the Right-Click menu to work, you need to register the app once.

1.  **Right-Click** the `SmartOrganizer.exe` and select **"Run as Administrator"**.
2.  Click the orange **"Sisteme Entegre Et (Integrate)"** button inside the app.
3.  Wait until you see the **"✅ BAŞARILI (SUCCESS)"** message in the logs.
    *   *You can now close the app. You won't need to run as Admin again.*

### Step 3: Create Shortcut
Right-click the exe -> **Send to** -> **Desktop (create shortcut)** for easy access.

---

## 📖 How to Use

### A) Using the App Interface

1.  **Manual Cleanup:** Select a folder using the "Select" button and click **"Clean Now"**.
2.  **Live Monitoring:** Select a folder, toggle **"LIVE MONITORING"** on. You can then minimize the app to the System Tray; it will keep organizing that folder in the background.

### B) Using Right-Click Menus (Pro Mode)

1.  **📂 "Smart Organize Here"**
    *   Right-click on **ANY folder** in Windows.
    *   Select this option to instantly organize that specific folder.

2.  **✨ "Create New Smart Folder"**
    *   Right-click on your **Desktop background**.
    *   Select this option to create a special, automatically monitored folder. Give it a name, and anything you drop inside will be auto-sorted.

---

## 📜 License
MIT License. Copyright © 2025 Murat.
