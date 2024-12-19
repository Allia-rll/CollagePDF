import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";
import type { FormType } from "@/components/CollageForm";

interface TypeFieldProps {
  form: UseFormReturn<FormType>;
}

export function TypeField({ form }: TypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo de collage" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="perPage">Imagenes por Hoja</SelectItem>
              <SelectItem value="rowscol">Filas x Columnas</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
