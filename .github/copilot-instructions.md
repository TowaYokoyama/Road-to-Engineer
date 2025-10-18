このリポジトリは、Next.js + TypeORM を使用したアプリケーションで、面接の質問・回答・技術ノートなどのデータを PostgreSQL（主に Supabase 経由） に保存します。

🔑 AI がこのコードベースを編集する際の重要ポイント

プロジェクト構成：
サーバー側コードは src/app/api/** 以下（Next.js App Router）にあります。
UI ページは src/app/**、再利用可能なコンポーネントは src/components に配置されています。

エンティティ（Entity）：
すべての TypeORM エンティティは src/entities/*.ts にあります。
循環インポートを避けるため、src/lib/db.ts ではクラスを直接 import せず、ファイルパスパターンでエンティティを登録します。
DB 初期化コードを変更する際は、この方法（パス指定）を使用してください。

データベース初期化：
src/lib/db.ts は getDataSource() と AppDataSource（シングルトン）をエクスポートします。
API ルートでは、リポジトリを使用する前に必ず await getDataSource() を呼び出します。
※ エンティティファイル内で AppDataSource を import しないでください。循環依存が発生します。

🧩 Supabase / DATABASE_URL の仕様

アプリは process.env.DATABASE_URL に設定された Postgres 接続文字列（Supabase 互換）を使用します。
package.json に pg を保持しておいてください。

SSL 設定：
NODE_ENV === 'production' のとき、rejectUnauthorized: false で SSL を有効化しています。
これは Supabase の証明書対応のためです。
本番環境でテストせずに削除しないでください。

DB を使うユーティリティを追加する場合：
リクエストハンドラや関数内で const ds = await getDataSource() を呼び出し、
モジュールのトップレベルで呼び出さないようにしてください。

🔄 循環インポート問題とその回避法

問題点：
src/lib/db.ts 内で src/entities/* のエンティティクラスを import したり、
逆にエンティティ側で db.ts を import すると循環が発生します。

解決策（このリポジトリで採用）：
エンティティをパス文字列で登録します。
例：entities: [path.join(__dirname, "../entities/*.{ts,js}")]
これにより TypeORM が遅延的に解決します。

新しいエンティティを追加する場合：
src/entities に配置し、エンティティから src/lib/db.ts を import しないでください。
API ルート内で getDataSource() を呼び出してリポジトリにアクセスします。

🧱 共通のコードパターン

リポジトリの使い方：
API ルート関数内で

const repo = ds.getRepository(EntityClass);


のように使います（await getDataSource() の後）。
例：src/app/api/tech-stack/route.ts

DTO（データ転送オブジェクト）：
API は生の JSON を受け取り、
repo.create(body) → repo.save(entity) の形で処理します。
既存のエンティティのフィールド構造に合わせてください。

日付カラム：
CreateDateColumn / UpdateDateColumn を使用しています。
意図的でない限り手動で上書きしないでください。

⚙️ コマンド / 開発ワークフロー

DB を使う機能を有効にして開発サーバーを起動するには：

$env:DATABASE_URL = "postgres://..."; npm run dev


型チェック：npm run type-check

ビルド：npm run build

🧩 DB 挙動を変更するときに確認すべきファイル

src/lib/db.ts — DataSource のシングルトンおよび HMR 対応ロジック

src/entities/*.ts — エンティティ定義およびリレーション

src/app/api/**/route.ts — getDataSource() を呼び出すルート群（リポジトリAPI変更時に要更新）

🧪 安全に変更をテストする方法

synchronize やエンティティスキーマを変更する場合は、
マイグレーションを実行する か、テスト用 Supabase DB を使うのが望ましいです。
このリポジトリでは開発効率のため現在 synchronize: true を使用しています。

🧰 DB ヘルパーを追加・変更する場合の注意

DB に触れる関数は遅延的に初期化してください。
関数内部で getDataSource() を呼び出し、
モジュール読み込み時に DB 接続を確立しないようにします。

新しい環境変数を導入する場合は、README.md に必ず記載してください。

💡 良い例・悪い例

✅ 良い例：
src/app/api/questions/route.ts のハンドラで

const ds = await getDataSource();
const repo = ds.getRepository(Question);


をリクエストハンドラ内で呼び出している。

❌ 悪い例：
src/entities/Question.ts の中で getDataSource() を import したり、
エンティティ定義の import 時に DataSource を生成すること。
→ 循環インポートや HMR（ホットリロード）問題の原因になります。