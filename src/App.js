import "./App.css";
import AppBar from "@mui/material/AppBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Switch,
  Box,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Stack,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  ListItemText,
  OutlinedInput,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import ViewForm from "./ViewForm";
const gradientStyle = {
  background: "linear-gradient(to right, #1976d22b, #61dafb59)",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const types = [
  "TextField",
  "Select",
  "Radio",
  "Checkbox",
  "Date",
  "Number",
  "File",
  "MultipleSelect",
];
const App = () => {
  const [fieldType, setFieldType] = useState();
  const [fieldLabel, setFieldLabel] = useState();
  const [options, setoptions] = useState([]);
  const [radiooptions, setroptions] = useState([]);
  const [checkboxoptions, setcoptions] = useState([]);
  const [multiselectoptions, setmsoptions] = useState([]);
  const [open, setopen] = useState(false);
  const [viewform, setViewForm] = useState(false);
  const [sections, setSections] = useState([]);
  const [fieldLabels, setFieldLabels] = useState({});
  const [fieldTypes, setFieldTypes] = useState({});
  const [optionValue, setoptionvalue] = useState("");
  const [error, showError] = useState("");

  const handleAddSection = () => {
    const newSection = {
      title: `Section ${sections.length + 1}`,
      fields: [],
      subSections: [],
    };
    setSections([...sections, newSection]);
  };

  const removeField = (fieldIndex, sectionIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].fields = updatedSections[
        sectionIndex
      ].fields.filter((_, index) => index !== fieldIndex);
      return updatedSections;
    });

    setFieldLabels((prevLabels) => {
      const updatedLabels = { ...prevLabels };
      delete updatedLabels[`${sectionIndex}_${fieldIndex}`];
      return updatedLabels;
    });

    setFieldTypes((prevTypes) => {
      const updatedTypes = { ...prevTypes };
      delete updatedTypes[`${sectionIndex}_${fieldIndex}`];
      return updatedTypes;
    });
  };
  const handleFieldTypeChange = (e, sectionIndex, fieldIndex) => {
    const updatedTypes = { ...fieldTypes };
    updatedTypes[`${sectionIndex}_${fieldIndex}`] = e.target.value;
    setFieldTypes(updatedTypes);
  };
  const createField = (sectionIndex) => {
    if (
      !fieldTypes[`${sectionIndex}_${sections[sectionIndex].fields.length}`] ||
      !fieldTypes[`${sectionIndex}_${sections[sectionIndex].fields.length}`]
    ) {
      showError("Enter field label and field type");
      return;
    } else {
      const field = {
        type:
          fieldTypes[
            `${sectionIndex}_${sections[sectionIndex].fields.length}`
          ] || fieldTypes[sectionIndex],
        label:
          fieldLabels[
            `${sectionIndex}_${sections[sectionIndex].fields.length}`
          ] || fieldLabels[sectionIndex],
        options:
          fieldTypes[
            `${sectionIndex}_${sections[sectionIndex].fields.length}`
          ] === "Select"
            ? options
            : fieldTypes[
                `${sectionIndex}_${sections[sectionIndex].fields.length}`
              ] === "Radio"
            ? radiooptions
            : fieldTypes[
                `${sectionIndex}_${sections[sectionIndex].fields.length}`
              ] === "Checkbox"
            ? checkboxoptions
            : fieldTypes[
                `${sectionIndex}_${sections[sectionIndex].fields.length}`
              ] === "MultipleSelect"
            ? multiselectoptions
            : undefined,
        visible: true,
      };

      setSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[sectionIndex].fields.push(field);
        return updatedSections;
      });
    }
    setFieldType("");
    setFieldLabel("");
    setoptionvalue("");
    setoptions([]);
    setcoptions([]);
    setroptions([]);
    setmsoptions([]);
  };
  const toggleFieldVisibility = (sectionIndex, fieldIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].fields[fieldIndex].visible =
        !updatedSections[sectionIndex].fields[fieldIndex].visible;
      return updatedSections;
    });
  };
  console.log(fieldLabels);
  const displayFields = (field, key, sectionIndex) => {
    switch (field.type) {
      case "TextField":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              key={key}
              variant="outlined"
              sx={{ "& .MuiInputBase-input": { padding: 1 } }}
              value={fieldLabel}
              onChange={(e) => handleFieldLabelChange(e, sectionIndex, key)}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "Select":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <Select key={key} sx={{ "& .MuiSelect-select": { padding: 1 } }}>
              {field.options &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ] &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].length > 0 &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].map((o, index) => <MenuItem value={index}>{o}</MenuItem>)}
            </Select>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "Date":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              key={key}
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputBase-input": { padding: 1 } }}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "Number":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              key={key}
              variant="outlined"
              type="number"
              sx={{ "& .MuiInputBase-input": { padding: 1 } }}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "File":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              key={key}
              variant="outlined"
              type="file"
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputBase-input": { padding: 1 } }}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "Checkbox":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            {field.options &&
              field.options[
                `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
              ] &&
              field.options[
                `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
              ].length > 0 &&
              field.options[
                `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
              ].map((o, index) => (
                <FormControlLabel
                  key={index}
                  label={o}
                  control={<Checkbox />}
                />
              ))}
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "Radio":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <IconButton
              sx={{ justifyContent: "right" }}
              onClick={() => removeField(key, sectionIndex)}
            >
              <i
                className="fa fa-times"
                style={{ color: "red", fontSize: "12px" }}
              />
            </IconButton>
            <InputLabel>{field.label}</InputLabel>
            <RadioGroup key={key}>
              {field.options &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ] &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].length > 0 &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].map((o, index) => (
                  <FormControlLabel
                    value={index}
                    control={<Radio />}
                    label={o}
                  />
                ))}
            </RadioGroup>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      case "MultipleSelect":
        return (
          <Box key={key} display={"flex"} flexDirection={"column"} gap={1}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={field.selected || []}
              // onChange={(event) => {
              //   const { value } = event.target;
              //   setfields((prevFields) =>
              //     prevFields.map((f, i) =>
              //       i === key
              //         ? {
              //             ...f,
              //             selected:
              //               typeof value === "string"
              //                 ? value.split(",")
              //                 : [...value],
              //           }
              //         : f
              //     )
              //   );
              // }}
              renderValue={(selected) => selected.join(", ")}
              input={<OutlinedInput label="Tag" />}
            >
              {field.options &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ] &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].length > 0 &&
                field.options[
                  `${sectionIndex}_${sections[sectionIndex].fields.length - 1}`
                ].map((o, index) => (
                  <MenuItem key={index} value={o}>
                    <Checkbox />
                    <ListItemText primary={o} />
                  </MenuItem>
                ))}
            </Select>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Hide</Typography>
              <Switch
                defaultChecked
                onChange={() => toggleFieldVisibility(sectionIndex, key)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Show</Typography>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };
  const addOptions = (sectionIndex, fieldIndex) => {
    const fieldKey = `${sectionIndex}_${fieldIndex}`; // Unique identifier for each field
    console.log(fieldKey, "key");
    if (fieldTypes[fieldKey] === "Select") {
      setoptions((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), optionValue],
      }));
    } else if (fieldTypes[fieldKey] === "Checkbox") {
      setcoptions((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), optionValue],
      }));
    } else if (fieldTypes[fieldKey] === "Radio") {
      setroptions((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), optionValue],
      }));
    } else if (fieldTypes[fieldKey] === "MultipleSelect") {
      setmsoptions((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), optionValue],
      }));
    }

    setoptionvalue(""); // Clear the input field after adding
  };

  const handleFieldLabelChange = (e, sectionIndex, fieldIndex) => {
    const updatedLabels = { ...fieldLabels };
    updatedLabels[`${sectionIndex}_${fieldIndex}`] = e.target.value;
    setFieldLabels(updatedLabels);
  };
  return (
    <div className="App" style={gradientStyle}>
      <AppBar style={{ height: "60px", placeContent: "center" }}>
        <Typography variant="h4">Welcome to Dynamic Form Builder</Typography>
      </AppBar>

      {viewform ? (
        <ViewForm sections={sections} />
      ) : (
        <Box
          display="flex"
          flexDirection={"column"}
          gap={2}
          marginTop={14}
          width={450}
          border={1}
          padding={6}
          justifySelf={"center"}
          textAlign={"left"}
        >
          <Typography fontSize={24} alignSelf={"center"}>
            Create your form
          </Typography>

          <Stack p={2} style={{ borderRadius: "6px" }}>
            <Button
              sx={{ backgroundColor: "#1976d296", color: "#000" }}
              onClick={handleAddSection}
            >
              Add Section
            </Button>

            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3>{section.title}</h3>

                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {displayFields(field, fieldIndex, sectionIndex)}
                  </div>
                ))}
                {/* Fields for each section  */}
                <Stack
                  p={2}
                  sx={{ border: 1, borderColor: "#000" }}
                  key={sectionIndex}
                >
                  <Typography fontSize={18} alignSelf={"center"}>
                    Add Field
                  </Typography>
                  <InputLabel>Enter label:</InputLabel>
                  <TextField
                    name={`field_${sectionIndex}_${sections[sectionIndex].fields.length}`}
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: 1,
                      },
                    }}
                    value={
                      fieldLabels[
                        `${sectionIndex}_${sections[sectionIndex].fields.length}`
                      ] || ""
                    }
                    onChange={(e) =>
                      handleFieldLabelChange(
                        e,
                        sectionIndex,
                        sections[sectionIndex].fields.length
                      )
                    }
                  />
                  <Box display="flex" flexDirection={"column"}>
                    <InputLabel>Select Field Type:</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ "& .MuiSelect-select": { padding: 1 } }}
                        value={
                          fieldTypes[
                            `${sectionIndex}_${sections[sectionIndex].fields.length}`
                          ] || ""
                        }
                        onChange={(e) =>
                          handleFieldTypeChange(
                            e,
                            sectionIndex,
                            sections[sectionIndex].fields.length
                          )
                        }
                      >
                        {types.map((t) => (
                          <MenuItem value={t}>{t}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {console.log(radiooptions, "radio")}
                    {["Select", "Radio", "Checkbox", "MultipleSelect"].includes(
                      fieldTypes[
                        `${sectionIndex}_${sections[sectionIndex].fields.length}`
                      ]
                    ) ? (
                      <Stack mt={2}>
                        {options[
                          `${sectionIndex}_${sections[sectionIndex].fields.length}`
                        ] &&
                        options[
                          `${sectionIndex}_${sections[sectionIndex].fields.length}`
                        ].length > 0
                          ? options[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].map((o, index) => (
                              <Typography>
                                {index + 1 + ":" + " " + o}
                              </Typography>
                            ))
                          : checkboxoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ] &&
                            checkboxoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].length > 0
                          ? checkboxoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].map((o, index) => (
                              <Typography>
                                {index + 1 + ":" + " " + o}
                              </Typography>
                            ))
                          : radiooptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ] &&
                            radiooptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].length > 0
                          ? radiooptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].map((o, index) => (
                              <Typography>
                                {index + 1 + ":" + " " + o}
                              </Typography>
                            ))
                          : multiselectoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ] &&
                            multiselectoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].length > 0
                          ? multiselectoptions[
                              `${sectionIndex}_${sections[sectionIndex].fields.length}`
                            ].map((o, index) => (
                              <Typography>
                                {index + 1 + ":" + " " + o}
                              </Typography>
                            ))
                          : ""}
                        <Box display={"flex"} flexDirection={"row"} gap={3}>
                          <TextField
                            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
                            value={optionValue}
                            onChange={(e) => setoptionvalue(e.target.value)}
                          />
                          <IconButton
                            onClick={() =>
                              addOptions(
                                sectionIndex,
                                sections[sectionIndex].fields.length
                              )
                            }
                          >
                            <i
                              className="fa fa-plus"
                              style={{ fontSize: "12px", color: "green" }}
                            />
                          </IconButton>
                        </Box>
                      </Stack>
                    ) : (
                      ""
                    )}
                  </Box>
                  {error && <Typography color="red">{error}</Typography>}
                  <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    gap={3}
                    alignSelf={"center"}
                    mt={2}
                  >
                    <Button
                      variant="contained"
                      onClick={() => createField(sectionIndex)}
                    >
                      Add
                    </Button>
                  </Stack>
                </Stack>
                {/* end */}
              </div>
            ))}
          </Stack>
          {console.log(sections)}
          {sections.length > 0 && (
            <Button onClick={() => setopen(!open)}>Save form</Button>
          )}
        </Box>
      )}

      <Dialog open={open} sx={{ "& .MuiPaper-root": { padding: 4 } }}>
        <Typography>Your form has been created!</Typography>
        <Button
          onClick={() => {
            setViewForm(!viewform);
            setopen(!open);
          }}
        >
          View form
        </Button>
      </Dialog>
    </div>
  );
};

export default App;
