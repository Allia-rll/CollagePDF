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

const imagesPerPage = ["1", "2", "4", "6", "8", "9", "10", "16", "36"];

export function PerpagForm({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="mode_data.value"
      render={({ field }) => (
        <FormItem className="py-2">
          <FormLabel>Imagenes por pagina</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
