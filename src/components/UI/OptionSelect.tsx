interface OptionSelectProps {
  onChange: (selectedOption: string) => void;
}

const OptionSelect: React.FC<OptionSelectProps> = ({ onChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onChange(selectedOption);
  };

  return (
    <select
      className="text-[#BABABA] text-[14px] font-normal"
      onChange={handleOptionChange}
    >
      <option>더보기</option>
      <option>수정하기</option>
      <option>삭제하기</option>
      <option>닫기</option>
    </select>
  );
};

export default OptionSelect;
