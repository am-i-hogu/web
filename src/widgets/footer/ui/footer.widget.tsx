import type { ComponentType, SVGProps } from "react";
import HouseIcon from "@/assets/icons/house.svg";
import HouseFillIcon from "@/assets/icons/house-fill.svg";
import MagnifyingGlassIcon from "@/assets/icons/magnifying-glass.svg";
import UserIcon from "@/assets/icons/user.svg";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

type FooterTab = "home" | "search" | "mypage";

type FooterTabItem = {
  key: FooterTab;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const footerTabs: FooterTabItem[] = [
  { key: "home", label: "홈", icon: HouseIcon },
  { key: "search", label: "검색", icon: MagnifyingGlassIcon },
  { key: "mypage", label: "내 정보", icon: UserIcon },
];

export type FooterWidgetProps = {
  activeTab?: FooterTab;
};

function getFooterTabButtonToneClass(isActive: boolean) {
  return isActive
    ? "bg-primary-default text-text-01 hover:bg-primary-default hover:text-text-01"
    : "bg-transparent text-primary-light hover:bg-primary-light/20 hover:text-primary-default";
}

function getFooterTabIconProps(key: FooterTab, isActive: boolean) {
  return {
    ...(key === "search" || (key === "home" && !isActive) ? { strokeWidth: 25 } : {}),
    ...(key === "search" ? { fill: isActive ? "currentColor" : "none" } : {}),
  };
}

type FooterTabButtonProps = {
  tabKey: FooterTab;
  label: string;
  isActive: boolean;
  Icon: (typeof footerTabs)[number]["icon"];
};

function FooterTabButton(props: FooterTabButtonProps) {
  const { tabKey, label, isActive, Icon } = props;
  const ResolvedIcon = tabKey === "home" && isActive ? HouseFillIcon : Icon;

  return (
    <Button
      type="button"
      variant="primary"
      size="iconSm"
      className={cn(
        "flex h-auto w-[68px] flex-col items-center justify-center gap-1 px-3 py-3 [--button-radius:16px]",
        getFooterTabButtonToneClass(isActive),
      )}
    >
      <ResolvedIcon aria-hidden className="size-5 text-current" {...getFooterTabIconProps(tabKey, isActive)} />
      <span className={cn("text-caption-m text-current", tabKey === "mypage" && "whitespace-nowrap")}>{label}</span>
    </Button>
  );
}

export function FooterWidget({ activeTab = "home" }: FooterWidgetProps) {
  return (
    <footer className="rounded-t-[24px] bg-bg-01 px-10 py-3">
      <ul className="flex items-center justify-between">
        {footerTabs.map(({ key, label, icon: Icon }) => {
          const isActive = key === activeTab;

          return (
            <li key={key}>
              <FooterTabButton tabKey={key} label={label} isActive={isActive} Icon={Icon} />
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
