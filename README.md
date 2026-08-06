# Compass

会津大学の学生を対象とした履修計画支援チャットボットです。

AIとの対話を通じて、履修計画の作成を支援するとともに、シラバスや大学に関する質問へ回答します。

本システムは、RAG（Retrieval-Augmented Generation）の有効性を評価することを目的とした研究の成果物として開発しています。

## 特徴

- AIチャットによる履修相談
- Gemini APIを利用した自然言語応答
- URLを参照したプロンプト拡張（将来的にRAGへ移行予定）

## 使用技術

|分類|技術|
|---|---|
|Frontend|React, Vite, Tailwind CSS|
|Backend|Spring Boot|
|Language|Java 21, TypeScript|
|AI|Gemini API|
|Build Tool|Gradle|
|Version Control|Git, GitHub|

## システム構成

```
Browser
    │
    ▼
React (Vite)
    │ HTTP
    ▼
Spring Boot
    │
    ▼
Gemini API
```

## API一覧

|Method|Endpoint|概要|
|---|---|---|
|POST|`/chat`|AIへ質問を送信|

## デモ

以下のURLから実際にCompassをお試しいただけます。

https://compass-3on5.onrender.com

## セットアップ

### 1. 必要なソフトウェアを確認

本システムを実行するには、以下のソフトウェアが必要です。

| ソフトウェア | 推奨バージョン |
| --- | --- |
| Java | 21以上 |
| Node.js | 20以上 |

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

### 2. リポジトリを取得

```bash
git clone https://github.com/java21bear/compass.git
cd compass
```

## 環境変数

### Backend

`backend/.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
```

[Google AI Studio](https://aistudio.google.com)にて、APIキーを発行し、backend/.env に設定してください。

APIキーの発行方法については、公式ドキュメント（[Gemini API キーを使用する](https://ai.google.dev/gemini-api/docs/api-key?hl=ja)）を参考にしてください。

### Frontend

`frontend/.env.development`

```env
VITE_API_URL=http://localhost:8080
```

バックエンドAPIのURLです。必要であれば適宜変更してください。

## 起動

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

## 停止

```bash
Ctrl + C
```

## 今後の予定

- RAGの実装
- ログイン機能
- 会話履歴保存
