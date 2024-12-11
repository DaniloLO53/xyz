CREATE TABLE "refreshTokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"sub" text NOT NULL,
	"expiryDate" date NOT NULL
);
