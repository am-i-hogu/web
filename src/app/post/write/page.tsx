import { AuthGuard } from "@/features/auth/ui";
import PostWritePageClient from "./_components/post-write-page.client";

export default function PostWritePage() {
  return (
    <AuthGuard>
      <PostWritePageClient />
    </AuthGuard>
  );
}
