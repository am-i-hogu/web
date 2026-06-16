import { HeaderWidget } from "@/widgets/header/ui";
import MypageProfileEditPageClient from "./_components/mypage-profile-edit-page.client";

export default function MypageProfileEditPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-01">
      <HeaderWidget title="프로필 편집" />
      <MypageProfileEditPageClient />
    </div>
  );
}
