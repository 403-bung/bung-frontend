import React, { useState } from "react";

interface TimePickerProps {
  onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const [time, setTime] = useState<string | undefined>(undefined);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTime(value);
    onTimeChange(value);
  };

  return <input type="time" value={time} onChange={handleTimeChange} />;
};

export default TimePicker;
