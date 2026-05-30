-- CreateTable
CREATE TABLE "daily_checkins" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "check_in_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weekday" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "sub_mood" TEXT NOT NULL,
    "activities" JSONB NOT NULL,
    "journal" TEXT,
    "predicted_mood" TEXT NOT NULL,
    "raw_mood" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "probabilities" JSONB,
    "recommendations" JSONB,
    "insight" JSONB,
    "mood_score" DOUBLE PRECISION NOT NULL,
    "ai_metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_checkins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_checkins_user_id_check_in_date_key" ON "daily_checkins"("user_id", "check_in_date");

-- AddForeignKey
ALTER TABLE "daily_checkins" ADD CONSTRAINT "daily_checkins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
