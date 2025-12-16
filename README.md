# 🤖 Smart File Organizer v2.0

![Python](https://img.shields.io/badge/Python-3.x-blue.svg) ![CustomTkinter](https://img.shields.io/badge/GUI-CustomTkinter-green.svg) ![Platform](https://img.shields.io/badge/Platform-Windows-blue)

**Smart File Organizer**, bilgisayarınızdaki dağınık klasörleri yapay zeka destekli mantıkla (uzantı bazlı) saniyeler içinde düzenleyen, **Canlı Takip (Monitoring)** özelliğine sahip modern bir masaüstü uygulamasıdır.

---

## ✨ Özellikler (v2.0)

*   **📂 Otomatik Düzenleme:** Dosyaları türlerine göre (Video, Müzik, Resim, Belge vb.) ilgili klasörlere taşır.
*   **👁️ Canlı Takip (Real-time Monitoring):** Seçilen klasörü izler; yeni bir dosya eklendiğinde veya indirildiğinde **anında** yakalar ve düzenler.
*   **🖱️ Sağ Tık Entegrasyonu (Context Menu):**
    *   Herhangi bir klasöre sağ tıklayıp **"Burayı Akıllı Düzenle"** diyebilirsiniz.
    *   Masaüstüne sağ tıklayıp **"Yeni Akıllı Klasör Oluştur"** diyerek izlenen özel bir klasör yaratabilirsiniz.
*   **👻 Sistem Tepsisi (System Tray):** Uygulama arka planda sessizce çalışır. Çarpı (X) ile kapattığınızda saat yanındaki simge durumuna küçülür.
*   **🔒 Tek Kopya (Single Instance):** Arka planda sadece bir uygulama çalışır, kaynak tüketimini minimumda tutar.

---

## 🚀 Kurulum

1.  Projeyi indirin veya klonlayın.
2.  Gerekli kütüphaneleri yükleyin:
    ```bash
    pip install -r requirements.txt
    ```
3.  Uygulamayı başlatın:
    ```bash
    python main.py
    ```
    *Veya hazır `START_V2.bat` dosyasını kullanın.*

---

## 📖 Kullanım

### 1. Manuel Düzenleme
1.  Uygulamayı açın.
2.  **"Seç"** butonu ile düzenlemek istediğiniz klasörü seçin.
3.  **"Şimdi Temizle"** butonuna basın.

### 2. Canlı Takip Modu
1.  Bir klasör seçin.
2.  **"CANLI TAKİP MODU"** anahtarını açın.
3.  Artık o klasöre atılan her dosya otomatik olarak kategorize edilecektir.

### 3. Sağ Tık Entegrasyonu
1.  Uygulama içindeki **"Sisteme Entegre Et (Sağ Tık)"** butonuna **bir kez** tıklayın.
2.  Artık Windows sağ tık menüsünde kısayolları görebilirsiniz.

---

## 🗂️ Desteklenen Dosya Türleri

| Klasör | Uzantılar |
| :--- | :--- |
| **Gorseller** | `jpg`, `png`, `gif`, `webp`, `heic`, `svg`... |
| **Videolar** | `mp4`, `mov`, `avi`, `mkv`, `webm`... |
| **Muzik** | `mp3`, `wav`, `flac`, `spotify`... |
| **Belgeler** | `pdf`, `docx`, `txt`, `xlsx`, `pptx`... |
| **Arsivler** | `zip`, `rar`, `7z`... |
| **Programlar** | `exe`, `msi`, `apk`... |
| **Kodlama** | `py`, `js`, `html`, `css`... |

---

## 🛠️ Geliştirici Notları

Bu proje **Python** kullanılarak geliştirilmiştir.
*   **GUI:** CustomTkinter
*   **İzleme:** Watchdog
*   **Arka Plan:** Pystray
*   **Sistem:** Winreg, Ctypes

---

**Lisans:** MIT License
**Copyright © 2025 Murat**
