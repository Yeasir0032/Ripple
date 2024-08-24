import React from "react";

interface props {
  field: string | React.ReactNode;
  onChange: (e: any) => void;
  value: number;
}
const DataInputSidebar = ({ field, onChange, value }: props) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div>{field}</div>
        <div>
          <input
            type="number"
            value={value}
            className="bg-transparent max-w-20"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DataInputSidebar;
