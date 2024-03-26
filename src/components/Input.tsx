export default function Input({ innerText }: { innerText: string }) {
  return (
    <input
      type="string"
      className="w-[343px] h-[53px] rounded-[10px] border-[0.5px] placeholder:text-[#1f1f1f] placeholder:font-medium border-[#1f1f1f] px-4"
      placeholder={innerText}
    />
  );
}
