# Compass

会津大学の学生を対象とした履修計画支援チャットボットです。

AIとの対話を通じて、履修計画の作成を支援するとともに、シラバスや大学に関する質問へ回答します。

本システムは、RAG（Retrieval-Augmented Generation）の有効性を評価することを目的とした研究の成果物として開発しています。

## システムの概要

### できること

- 2026年度PL科目に関する質問
- 履修計画に関する相談
- シラバスの内容に関する質問
- AIとの対話による履修計画の作成支援

### 使用技術

分類 | 技術
---|---
Language | Java, TypeScript
Frontend | React, Vite, Tailwind CSS
Backend | Spring Boot, Spring WebFlux, Spring AI
AI | Gemini API
RAG | Embedding, Vector Store
Database | PostgreSQL, pgvector
Migration | Flyway
Document | PDF
Build Tool | Gradle
Container | Docker
Version Control | Git, GitHub
Deployment | Render

### 構成

```
Browser
│
▼
React (Vite)
│
▼
Spring Boot
│
│
├── Spring AI
│   │
│   ├── Vector Store
│   │   │
│   │   ▼
│   │   PostgreSQL
│   │   │
│   │   pgvector
│   │
│   ├── Embedding
│   │   ▲
│   │   │
│   │   PDF
│   │
│   └── Gemini API
│
└── Flyway
    │
    ▼
    Database Migration
```

### API一覧

Method|Endpoint|概要
---|---|---
POST|`/chat`|AIへ質問を送信

### デモ

以下のブラウザで動作を確認しています。

- Safari
- Safari (モバイル版)
- Chrome

以下のリンクから、実際にアプリをお試しいただけます。

⚠️ Renderの無料プランを利用しているため、起動に時間がかかることがあります。

[Compassを使ってみる](https://compass-3on5.onrender.com)

### 既知の問題

フロントエンドとバックエンド間のセッションCookieが正常に送信されず、チャット履歴がリクエスト間で保持されない場合があります。

現在はセッションを利用して会話履歴を管理していますが、今後はユーザー認証とデータベースを導入し、ユーザー単位で会話履歴を永続化する予定です。

## セットアップ手順

以下の環境で動作を確認しています。

- macOS Sequoia 15.6.1

### 1. 必要なソフトウェアを確認

本システムを実行するには、以下のソフトウェアが必要です。

ソフトウェア | 推奨バージョン
--- | ---
Git | 最新版
Java | 21
Node.js | 24
npm | Node.jsに付属
PostgreSQL | 18

#### Gitの確認

```bash
git --version
```

実行結果

```text
git version 2.51.0
```

`zsh: command not found: git` などと表示される場合は、Node.jsがインストールされていない可能性があります。

#### Javaの確認

```bash
java --version
```

実行結果

```text
java 21.0.2
```

`zsh: command not found: java` などと表示される場合は、Javaがインストールされていない可能性があります。

#### Node.jsの確認

```bash
node -v
```

実行結果

```text
v24.18.0
```

`zsh: command not found: node` などと表示される場合は、Node.jsがインストールされていない可能性があります。

#### npmの確認

```bash
npm -v
```

実行結果

```text
12.0.2
```

`zsh: command not found: npm` などと表示される場合は、Node.jsがインストールされていない可能性があります。

#### PostgreSQLの確認

```bash
psql --version
```

実行結果

```text
psql (PostgreSQL) 18.4
```

`zsh: command not found: psql` などと表示される場合は、PostgreSQLがインストールされていない可能性があります。

### 2. リポジトリを取得

```bash
git clone https://github.com/java21bear/compass.git
cd compass
```

### 3. データベースを作成

本システムでは、PostgreSQLを使用してユーザー情報やRAGで利用するベクトルデータなどを管理しています。

PostgreSQLが起動していることを確認したうえで、以下のコマンドを実行してください。

```bash
createdb compass
```

作成したデータベースに接続できることを確認します。

```bash
psql compass
```

接続後、以下のコマンドでデータベースを確認できます。

```sql
\l
```

compass が表示されていれば、データベースの作成は完了です。

データベース内のテーブルや必要な拡張機能は、アプリケーション起動時にFlywayによって作成・管理されます。

```sql
\q
```

でPostgreSQLを終了できます。

### 4. 環境変数を設定

#### Backend

`backend/.env`

```env
GEMINI_API_KEY=YOUR_API_KEY

DB_HOST=localhost
DB_PORT=5432
DB_NAME=compass
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

[Google AI Studio](https://aistudio.google.com)にて、APIキーを発行し、backend/.env に設定してください。

APIキーの発行方法については、公式ドキュメント（[Gemini API キーを使用する](https://ai.google.dev/gemini-api/docs/api-key?hl=ja)）を参考にしてください。

#### Frontend

`frontend/.env.development`

```env
VITE_API_URL=http://localhost:8080
```

バックエンドAPIのURLです。必要であれば適宜変更してください。

### 5. 起動

プロジェクトルートディレクトリで以下のコマンドを実行してください。

```bash
chmod +x run.sh
./run.sh
```

`run.sh` は以下を自動で実行します。

- フロントエンド依存関係のインストール（初回のみ）
- Spring Bootアプリケーションのビルド（初回のみ）
- Spring Bootの起動
- Reactサーバーの起動（開発モード）
- アプリへの自動アクセス（ブラウザの起動）

再度アプリを開く場合は、ブラウザで以下にアクセスしてください。

```
http://localhost:5173
```

### 6. 停止

```bash
Ctrl + C
```
