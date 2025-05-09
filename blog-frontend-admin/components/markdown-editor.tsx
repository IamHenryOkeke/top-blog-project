import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useFormContext } from "react-hook-form";

const mdParser = new MarkdownIt();

type MDProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ label, name, value, onChange }: MDProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="text-lg font-medium">{label}</label>
      <MdEditor
        value={value}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => onChange(text)}
      />
      {errors[name] && <p className="text-red-500 text-sm">{(errors[name])?.message as string}</p>}
    </div>
  );
};

