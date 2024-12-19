import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import type { FormType } from "@/components/CollageForm";
interface PerpagFormProps {
  form: UseFormReturn<FormType>;
}

export function PerpagForm({ form }: PerpagFormProps) {
  return (
    <FormField
      control={form.control}
      name="mode_data.value"
      render={({ field }) => (
        <FormItem className="py-2">
          <FormLabel>Imagenes por pagina</FormLabel>
          {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la cantidad" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {imagesPerPage.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <Input
            onChange={field.onChange}
            type="number"
            placeholder="Numero de imagenes"
            min={1}
            max={100}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
