-- CreateTable
CREATE TABLE "welcome-message" (
    "id" VARCHAR(20) NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "channel" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "welcome-message_id_key" ON "welcome-message"("id");
