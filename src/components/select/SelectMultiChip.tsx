import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(value: any, options: readonly any[], theme: Theme) {
  return {
    fontWeight:
      options.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Option {
  label: string;
  value: string;
}

interface SelectChip {
  label: string;
  options: Option[];
  form: any;
  name: string;
  required?: boolean;
}

export default function SelectMultiChip({
  label,
  options,
  form,
  name,
  required,
}: SelectChip) {
  const { control } = form;
  const theme = useTheme();
  const [data, setData] = React.useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const {
      target: { value },
    } = event;
    setData(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? required : false }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <FormControl sx={{ m: 1, width: "500px" }}>
            <InputLabel id="select">{label}</InputLabel>
            <Select
              labelId="select"
              id="multiple-chip"
              multiple
              fullWidth
              value={data}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e);
                handleChange(e);
              }}
              inputRef={ref}
              input={<OutlinedInput id="multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value.value}
                      label={value.label}
                      color="primary"
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((item: any) => (
                <MenuItem
                  key={item.value}
                  value={item}
                  style={getStyles(item, options, theme)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}
