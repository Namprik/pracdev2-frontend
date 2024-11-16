export default function Button({
  btnType,
  type = "button",
  text,
}: {
  btnType: string;
  type?: string;
  text: string;
}) {
  return (
    <button
      className={`${
        btnType === "submit"
          ? "bg-dp-blue hover:bg-dp-blue-hover text-white font-bold"
          : btnType === "cancel"
          ? "bg-white border border-dp-border hover:border-dp-blue text-dp-blue"
          : "bg-dp-red hover:border-dp-red-hover text-white font-bold"
      } rounded-lg p-2 w-full h-[48px]`}
      type={type === "submit" ? "submit" : "button"}
    >
      {text}
    </button>
  );
}
