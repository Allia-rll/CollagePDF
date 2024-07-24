import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ModeField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="mode"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Modo de la imagen</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 sm:flex sm:flex-row space-y-1"
            >
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem className="mt-1" value="fit" />
                </FormControl>
                <div>
                  <FormLabel className="font-normal">Fit</FormLabel>
                  <div className="ml-auto flex border-2 border-gray-300 shadow-sm rounded-lg w-28 aspect-square">
                    <img
                      src="/icons/photo-sample.png"
                      className="my-auto w-full"
                      alt="photo icon"
                    />
                  </div>
                </div>
              </FormItem>
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem className="mt-1" value="fill" />
                </FormControl>
                <div>
                  <FormLabel className="font-normal">Fill</FormLabel>
                  <div className="ml-auto flex border-2 border-gray-300 shadow-sm rounded-lg w-28 aspect-square">
                    <img
                      src="/icons/photo-sample.png"
                      className="h-full object-cover"
                      alt="photo icon"
                    />
                  </div>
                </div>
              </FormItem>
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem className="mt-1" value="stretch" />
                </FormControl>
                <div>
                  <FormLabel className="font-normal">Stretch</FormLabel>
                  <div className="ml-auto flex border-2 border-gray-300 shadow-sm rounded-lg w-28 aspect-square">
                    <img
                      src="/icons/photo-sample.png"
                      className="h-full w-full"
                      alt="photo icon"
                    />
                  </div>
                </div>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
