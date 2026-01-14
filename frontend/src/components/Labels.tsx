type LabelTypes = {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  labelText: string;
};

export const Label = ({
  id,
  type,
  name,
  placeholder,
  labelText,
}: LabelTypes) => {
  return (
    <div>
      <label htmlFor={id} className="font-bold text-[20px]">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        className="p-2 w-[100%] rounded-md border-2 border-gray-400"
      />
    </div>
  );
};
