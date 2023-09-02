import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function FormFieldComp({ form, fieldName, type }) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="capitalize">
          <FormLabel>{fieldName}</FormLabel>
          <FormControl>
            <Input placeholder={fieldName} type={`${type || +""}`} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormFieldComp;
