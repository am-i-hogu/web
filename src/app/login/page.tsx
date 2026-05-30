import GoogleLogoIcon from "@/assets/icons/google-logo.svg";
import KakaoLogoIcon from "@/assets/icons/kakao-logo.svg";
import ScalesIcon from "@/assets/icons/scales.svg";
import { Button } from "@/shared/ui";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-bg-01 px-4">
      <section className="flex flex-1 flex-col items-center justify-center pb-23 pt-10 text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-primary-default text-secondary-default">
          <ScalesIcon aria-hidden={true} className="size-7.5" strokeWidth={18} />
        </div>

        <h1 className="mt-6 text-[2.25rem] font-bold leading-normal tracking-[-0.0025em] text-primary-strong">
          Am I Hogu?
        </h1>

        <p className="mt-2 text-title2-m text-[#454652]">
          현명한 소비와 선택의 기준,
          <br />
          <span className="text-secondary-strong">나는 호구인가요?</span>
        </p>
      </section>

      <section className="pb-11.5" aria-label="소셜 로그인">
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="kakao"
            fullWidth={true}
            leftIcon={<KakaoLogoIcon aria-hidden={true} className="size-4" />}
            className="text-body-m"
          >
            카카오로 계속하기
          </Button>
          <Button
            type="button"
            variant="google"
            fullWidth={true}
            leftIcon={<GoogleLogoIcon aria-hidden={true} className="size-4" />}
            className="text-body-m text-text-03"
          >
            구글로 계속하기
          </Button>
        </div>
      </section>
    </main>
  );
}
