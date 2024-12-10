CREATE TABLE "wallet_currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"wallet_id" integer,
	"currency" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wallet_currencies" ADD CONSTRAINT "wallet_currencies_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;