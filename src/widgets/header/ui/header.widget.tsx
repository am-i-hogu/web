import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

export type HeaderWidgetProps = {
  title: string;
};

export function HeaderWidget({ title }: HeaderWidgetProps) {
  return (
    <header className="bg-indigo-50 flex h-16 items-center gap-4 px-6">
      <ArrowLeftIcon aria-hidden className="size-5 text-text-03" strokeWidth={25} />
      <h2 className="text-title2-m text-text-04">{title}</h2>
    </header>
  );
}
