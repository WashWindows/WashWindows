# 練習擦窗戶

## 設計期望
 打造便捷的擦窗戶遊戲體驗，使用者可以輕鬆的註冊和登入帳戶，以及查看積分排行榜。提供直觀簡潔的界面設計，提升使用者遊戲體驗。

## 設計理念
- ### 用戶體驗
    網站設計以為使用者為核心，提供簡單易懂的界面，確保所有使用者能夠輕鬆上手，享受流暢的操作體驗，提升整體樂趣。
    
- ### 視覺效果
    遊戲採用絲滑的特效，為使用者創造舒適的清潔體驗。每次的清潔動作都配有流暢的動畫效果，讓遊戲更加生動有趣。


- ### 網互動性 
    網站通過即時反饋、分數排行榜，增強用戶參與感。提供積分制模式，讓使用者能與朋友或其他使用者競爭高分，激發使用者的成就感和挑戰欲望，提升遊戲吸引力。

## 技術選用

- ### React
    - 可重用性高 : 將遊戲界面拆分成多個獨立組件，如計分板、排行榜等。
    - 狀態管理清晰：遊戲數據的變化更容易追蹤和管理。
    - 開發效率高：團隊成員可並行開發不同組件，加快開發進度。

- ### Vite
    - 快速構建原型：極簡的設計非常適合快速搭建開發環境和進行原型開發。
    - 預構建依賴項：在啟動時會提前打包依賴項，從而加快開發速度。
    - 錯誤提示：提供詳細的錯誤報告和日志信息，便於開發者快速排查問題。
- ### TypeScript
    - 強型別系統：提供靜態類檢查，減少運行時錯誤，提高代碼健壯性和可維性。
    - 更好的開發體驗：擁有強大的編輯器支持，如自動補全和代碼導航，提升開發效率。
    - 兼容性：與現有 JavaScript 代碼完全兼容，方便逐步轉換現有項目，充分利用其優勢。
    
- ### MongoDB
    - 靈活性：能夠存儲和管理非結構化數據，適應各種數據需求。
    - 擴展性：支持水平擴展，能夠輕鬆處理大量數據和高並發需求。
    - 高效查詢：提供豐富的查詢語法和索引功能，快速檢索數據，提升應用性能。

## 架構說明

- ### 架構圖
    ![架構](https://i.imgur.com/DjvZinO.png)
- ### 流程圖
    ![流程](https://i.imgur.com/gFKfWif.png)
## 規劃

- ### 1. 元件結構
    - UI 元件：Button、Form、PageContainer 等基礎元件
    - 遊戲元件：GameArea、RankList、Scoreboard 等功能元件
    - 佈局元件：Header、PageContainer 等結構元件
- ### 2. 狀態管理
    - useAuth Hook 集中管理認證邏輯
    - 將共用邏輯抽離成自定義 Hook
- ### 3. 代碼復用
    - logoutHandler 統一處理登出邏輯
    - Form 元件處理各類表單操作
    - PageContainer 統一頁面布局
- ### 4. 關注點分離
    - 業務邏輯與 UI 展示分離
    - 狀態管理與渲染邏輯分離
    - API 調用集中管理

## 安裝與執行指引
### **1. 下載專案**
克隆專案並切換至專案目錄
```bash
git clone https://github.com/WashWindows/WashWindows.git
cd yourPath/WashWindows
```

### **2. 前端安裝與執行**
進入前端`Frontend`目錄，安裝依賴並執行
```bash
cd Frontend
npm install
```

配置環境變數
將 .env.example 文件修改為您的設定，並重命名為 .env
```env
VITE_API_URL = api_url   #api位置
```

啟動前端開發伺服器
```bash
npm run dev
```

### 3. **後端安裝與執行**
進入後端`Backend`目錄，安裝依賴並執行
```bash
cd Backend
npm install
```

配置環境變數
將 .env.example 文件修改為您的設定，並重命名為 .env

```env
DBUSER=test               # 資料庫使用者
DBPASSWORD=password       # 資料庫密碼
DBHOST=127.0.0.1          # 資料庫連線位置(採用srv)
DBNAME=name               # 資料庫名稱
PORT=2083                 # 後端監聽位置
LogPath=logs              # log生成位置
assetsPath=/assets        # assets生成位置
HomePagePath=/index.html  # 首頁位置
privateKey=key            # 私密金鑰
SECRET_KEY = secret       # 密鑰
```

啟動後端開發伺服器
```bash
npm run dev
```
### 4. **資料庫連線**
系統使用 MongoDB 作為資料庫，請確保安裝並啟動 MongoDB。  

## API規格說明
[API Doc](https://github.com/WashWindows/WashWindows/blob/main/api.md)
