-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "admin-id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_login_key" ON "admins"("login");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_admin-id_fkey" FOREIGN KEY ("admin-id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
