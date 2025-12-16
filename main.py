import socket

import customtkinter as ctk
import os
import sys
import shutil
import time
import threading
import winreg
import ctypes
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import pystray
from PIL import Image, ImageDraw

# --- File Type Definitions ---
EXTENSIONS = {
    "Gorseller": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".raw", ".heic"],
    "Videolar": [".mp4", ".mov", ".avi", ".mkv", ".flv", ".wmv", ".m4v", ".webm"],
    "Belgeler": [".pdf", ".docx", ".doc", ".txt", ".xlsx", ".pptx", ".csv", ".rtf", ".odt"],
    "Muzik": [".mp3", ".wav", ".aac", ".flac", ".ogg", ".wma", ".m4a"],
    "Arsivler": [".zip", ".rar", ".7z", ".tar", ".gz", ".iso"],
    "Programlar": [".exe", ".msi", ".bat", ".sh", ".apk"],
    "Kodlama": [".py", ".js", ".html", ".css", ".cpp", ".json", ".xml", ".sql"]
}

# Global Port for Single Instance IPC
PORT = 54321

class OrganizerHandler(FileSystemEventHandler):
    """Watches for new file creation events"""
    def __init__(self, callback):
        self.callback = callback

    def on_created(self, event):
        if not event.is_directory:
            self.callback(event.src_path)

    def on_moved(self, event):
        if not event.is_directory:
            self.callback(event.dest_path)

class App(ctk.CTk):
    def __init__(self, is_primary=True):
        super().__init__()
        
        self.title("Smart File Organizer v2.0")
        self.geometry("750x550")
        self.observer = Observer() # Initialize observer once
        self.observer.start()
        self.is_monitoring = False
        self.watched_folders = [] # Keep track

        self.protocol("WM_DELETE_WINDOW", self.hide_window)

        # ... (Layout remains similar, but ensure we don't re-init observer in toggle) ...
        
        # --- Grid Layout ---
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(1, weight=1)
        
        # --- Header ---
        self.header_frame = ctk.CTkFrame(self, corner_radius=0)
        self.header_frame.grid(row=0, column=0, sticky="ew")
        
        lbl_title = ctk.CTkLabel(self.header_frame, text="🤖 Smart Organizer & Watcher", font=("Segoe UI", 20, "bold"))
        lbl_title.pack(pady=10, padx=20, side="left")

        # Integration Button
        btn_integrate = ctk.CTkButton(self.header_frame, text="Sisteme Entegre Et (Sağ Tık)", 
                                      command=self.add_context_menu, fg_color="#e67e22", hover_color="#d35400")
        btn_integrate.pack(pady=10, padx=20, side="right")

        # --- Main Area ---
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.grid(row=1, column=0, padx=20, pady=20, sticky="nsew")
        self.main_frame.grid_columnconfigure(0, weight=1)

        # Folder Selection
        self.path_entry = ctk.CTkEntry(self.main_frame, placeholder_text="Hedef Klasör...", width=450)
        self.path_entry.grid(row=0, column=0, padx=20, pady=(30, 10))

        btn_select = ctk.CTkButton(self.main_frame, text="📂 Seç", width=50, command=self.select_folder)
        btn_select.grid(row=0, column=1, padx=(0, 20), pady=(30, 10))

        # Log Box
        self.log_box = ctk.CTkTextbox(self.main_frame, height=250)
        self.log_box.grid(row=1, column=0, columnspan=2, padx=20, pady=10, sticky="nsew")

        # Control Panel
        self.control_frame = ctk.CTkFrame(self.main_frame, fg_color="transparent")
        self.control_frame.grid(row=2, column=0, columnspan=2, pady=20)

        # Run Once Button
        self.btn_run_once = ctk.CTkButton(self.control_frame, text="🧹 Şimdi Temizle", 
                                          command=self.run_once, width=150, height=40, font=("Segoe UI", 14, "bold"))
        self.btn_run_once.pack(side="left", padx=10)

        # Live Monitor Switch (Visual only now, monitoring is managed internally)
        self.switch_var = ctk.StringVar(value="off")
        self.switch_monitor = ctk.CTkSwitch(self.control_frame, text="CANLI TAKİP MODU", 
                                            command=self.toggle_monitoring_ui, variable=self.switch_var, onvalue="on", offvalue="off",
                                            font=("Segoe UI", 12, "bold"), button_color="#2ecc71", progress_color="#27ae60")
        self.switch_monitor.pack(side="left", padx=20)

        # Start Tray Icon
        threading.Thread(target=self.setup_tray_icon, daemon=True).start()
        
        # Start IPC Listener
        if is_primary:
            threading.Thread(target=self.start_ipc_server, daemon=True).start()

    def start_ipc_server(self):
        server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        server.bind(('127.0.0.1', PORT))
        self.log(f"System ready.")
        while True:
            data, addr = server.recvfrom(1024)
            message = data.decode('utf-8')
            # Handle incoming commands from context menu usage
            # Expected format: "CMD|ARGS"
            self.after(0, lambda m=message: self.handle_ipc_command(m))

    def handle_ipc_command(self, message):
        parts = message.split('|')
        cmd = parts[0]
        
        if cmd == "OPEN":
            self.show_window()
            
        elif cmd == "CREATE":
            if len(parts) > 1:
                parent_dir = parts[1]
                self.create_smart_folder_flow(parent_dir)
                
        elif cmd == "ORGANIZE":
             if len(parts) > 1:
                target = parts[1]
                self.path_entry.delete(0, "end")
                self.path_entry.insert(0, target)
                self.run_once()
                self.show_window()

    def create_smart_folder_flow(self, parent_dir):
        # --- POPUP: Ask for folder name ---
        dialog = ctk.CTkInputDialog(text="Akıllı Klasör İsmi Giriniz:", title="Yeni Klasör Oluştur")
        dialog.after(100, dialog.focus_force)
        name = dialog.get_input()
        
        if not name: return

        # Suffix enforcement
        folder_suffix = ".smart"
        if not name.endswith(folder_suffix):
            name += folder_suffix
            
        new_folder = os.path.join(parent_dir, name)
        
        if os.path.exists(new_folder):
             counter = 1
             base_name = name
             while os.path.exists(new_folder):
                 new_folder = os.path.join(parent_dir, f"{base_name}_{counter}")
                 counter += 1
        
        try:
            os.makedirs(new_folder)
            self.path_entry.insert(0, new_folder)
            self.log(f"✨ Yeni Akıllı Klasör Oluşturuldu: {new_folder}")
            self.add_watch(new_folder)
        except Exception as e:
            self.log(f"Hata: {e}")

    def add_watch(self, folder):
        if folder not in self.watched_folders:
            event_handler = OrganizerHandler(self.organize_file)
            self.observer.schedule(event_handler, folder, recursive=False)
            self.watched_folders.append(folder)
            self.log(f"👁️ İzleniyor: {folder}")
            self.switch_var.set("on")

    def toggle_monitoring_ui(self):
        # Allow user to manually toggle current folder
        folder = self.path_entry.get()
        if self.switch_var.get() == "on":
             if os.path.exists(folder):
                 self.add_watch(folder)
        else:
             # Removing specific watch is hard with watchdog without storing watch_id
             # For simplicity, we just log it (implementation limitation in this quick update)
             self.log("⚠️ Takibi durdurmak için programı yeniden başlatın.")

    def hide_window(self):
        self.withdraw()
    
    def show_window(self):
        self.deiconify()
        self.lift()
        self.focus_force()

    def quit_app(self, icon, item):
        icon.stop()
        self.quit()
        sys.exit()

    def create_image(self):
        # Generate a simple icon image programmatically
        width = 64
        height = 64
        color1 = "black"
        color2 = "#e67e22" # Orange
        image = Image.new('RGB', (width, height), color1)
        dc = ImageDraw.Draw(image)
        dc.rectangle((width // 4, height // 4, width * 3 // 4, height * 3 // 4), fill=color2)
        return image

    def setup_tray_icon(self):
        menu = (pystray.MenuItem('Göster', lambda icon, item: self.after(0, self.show_window), default=True),
                pystray.MenuItem('Çıkış', self.quit_app))
        icon = pystray.Icon("name", self.create_image(), "Smart Organizer", menu)
        icon.run()

    def log(self, msg):
        try:
            self.log_box.insert("0.0", f"> {msg}\n")
        except:
            pass

    def select_folder(self):
        folder = ctk.filedialog.askdirectory()
        if folder:
            self.path_entry.delete(0, "end")
            self.path_entry.insert(0, folder)
            self.log(f"Hedef: {folder}")

    def organize_file(self, file_path):
        """Moves a single file to its category folder"""
        if not os.path.exists(file_path): return
        
        filename = os.path.basename(file_path)
        # Skip self, hidden files, or temporary downloads
        if filename.startswith("SmartOrganizer") or filename.startswith(".") or ".tmp" in filename or ".crdownload" in filename: 
            return 

        folder_path = os.path.dirname(file_path)
        _, ext = os.path.splitext(filename)
        ext = ext.lower()

        moved = False
        for category, ext_list in EXTENSIONS.items():
            if ext in ext_list:
                target_dir = os.path.join(folder_path, category)
                os.makedirs(target_dir, exist_ok=True)
                
                try:
                    # Wait briefly to ensure file is fully written (prevents errors with large downloads)
                    time.sleep(0.5) 
                    
                    dest = os.path.join(target_dir, filename)
                    # Handle Duplicate Names
                    if os.path.exists(dest):
                        base, extension = os.path.splitext(filename)
                        timestamp = int(time.time())
                        dest = os.path.join(target_dir, f"{base}_{timestamp}{extension}")
                    
                    try:
                        shutil.move(file_path, dest)
                        self.log(f"✅ Taşındı: {filename} -> {category}")
                        moved = True
                    except PermissionError:
                         self.log(f"⚠️ Dosya kullanımda, sonra tekrar denenecek: {filename}")
                         
                except Exception as e:
                    self.log(f"❌ Hata: {e}")
                break
        
        if not moved:
            pass

    def run_once(self):
        folder = self.path_entry.get()
        if not os.path.exists(folder): 
            self.log("⚠️ Geçerli bir klasör seçin.")
            return
        
        self.log("--- Manuel Temizlik Başladı ---")
        files = [os.path.join(folder, f) for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
        for f in files:
            self.organize_file(f)
        self.log("--- Bitti ---")
        
    def add_context_menu(self):
        if not ctypes.windll.shell32.IsUserAnAdmin():
            self.log("⚠️ HATA: Yönetici izni gerekli! Programı 'Yönetici Olarak Çalıştır'.")
            return

        exe_path = sys.executable
        if not exe_path.endswith(".exe"):
            self.log("⚠️ Bilgi: .py üzerinden çalışıyorsunuz. EXE olunca tam yol kaydedilir.")
        
        try:
            # 1. Context Menu for Directories
            key_path = r"Directory\shell\SmartOrganizer"
            with winreg.CreateKey(winreg.HKEY_CLASSES_ROOT, key_path) as key:
                winreg.SetValue(key, "", winreg.REG_SZ, "📂 Burayı Akıllı Düzenle")
                winreg.SetValueEx(key, "Icon", 0, winreg.REG_SZ, exe_path)
                with winreg.CreateKey(key, "command") as cmd_key:
                    winreg.SetValue(cmd_key, "", winreg.REG_SZ, f'"{exe_path}" "%1"')

            # 2. Context Menu for Background (New Smart Folder)
            bg_key_path = r"Directory\Background\shell\SmartOrganizerNew"
            with winreg.CreateKey(winreg.HKEY_CLASSES_ROOT, bg_key_path) as key:
                winreg.SetValue(key, "", winreg.REG_SZ, "✨ Yeni Akıllı Klasör Oluştur")
                winreg.SetValueEx(key, "Icon", 0, winreg.REG_SZ, exe_path)
                with winreg.CreateKey(key, "command") as cmd_key:
                    winreg.SetValue(cmd_key, "", winreg.REG_SZ, f'"{exe_path}" --create "%V"')

            self.log("✅ BAŞARILI! Sağ tık menüleri eklendi.")

        except Exception as e:
            self.log(f"Hata: {e}")

    # --- UPDATED check_startup_args ---
    # This is now only called by the PRIMARY instance at startup
    def check_startup_args(self):
        # Only check local args if we caught them early, checking sys.argv directly
        pass # Moving logic to handle_ipc_command for consistency

# ... Main execution block ...

if __name__ == "__main__":
    # check port
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.bind(('127.0.0.1', PORT))
    except OSError:
        # Port is in use -> Another instance is running!
        # Send our args to it
        client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
        msg = "OPEN"
        if len(sys.argv) > 1:
            if sys.argv[1] == "--create" and len(sys.argv) > 2:
                msg = f"CREATE|{sys.argv[2].strip()}" # strip logic might need quotes handling
            elif sys.argv[1] != "--create":
                msg = f"ORGANIZE|{sys.argv[1]}"
        else:
            msg = "OPEN"
            
        client.sendto(msg.encode('utf-8'), ('127.0.0.1', PORT))
        sys.exit(0)
    
    s.close()
    
    # If we are here, we are the PRIMARY instance
    app = App(is_primary=True)
    
    # Process own args if any (first launch via context menu)
    if len(sys.argv) > 1:
         # Simulate IPC message from self
         msg = "OPEN"
         if sys.argv[1] == "--create" and len(sys.argv) > 2:
             msg = f"CREATE|{sys.argv[2].strip()}"
         elif sys.argv[1] != "--create":
             msg = f"ORGANIZE|{sys.argv[1]}"
         app.handle_ipc_command(msg)

    app.mainloop()
