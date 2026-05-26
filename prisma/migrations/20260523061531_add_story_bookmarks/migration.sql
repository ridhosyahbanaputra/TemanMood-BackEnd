-- CreateTable
CREATE TABLE "story_bookmarks" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "story_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "story_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "story_bookmarks_user_id_story_id_key" ON "story_bookmarks"("user_id", "story_id");

-- AddForeignKey
ALTER TABLE "story_bookmarks" ADD CONSTRAINT "story_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_bookmarks" ADD CONSTRAINT "story_bookmarks_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
