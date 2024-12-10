import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function FormFieldComp({ form, fieldName, type, required }) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="capitalize">
          <FormLabel>
            {fieldName} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder={fieldName} type={`${type || +""}`} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormFieldComp;
