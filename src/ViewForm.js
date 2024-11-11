import React from "react";
import { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  ListItemText,
  FormHelperText,
  FormControl,
  FormGroup,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

const ViewForm = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     formik.setFieldValue(`field_${sectionIndex}_${index}`, file);
  //     const fileURL = URL.createObjectURL(file);
  //     setFilePreview(fileURL); // Set the preview URL
  //   }
  // };
  const validationSchema = Yup.object().shape(
    props.sections.reduce((acc, section, sectionIndex) => {
      section.fields.forEach((field, fieldIndex) => {
        const fieldName = `field_${sectionIndex}_${fieldIndex}`;

        if (field.type === "Number") {
          acc[fieldName] = Yup.number()
            .required(`${field.label} is required`)
            .typeError(`${field.label} must be a number`);
        } else if (
          field.type === "Checkbox" ||
          field.type === "MultipleSelect"
        ) {
          acc[fieldName] = Yup.array()
            .min(1, `${field.label} is required`)
            .required(`${field.label} is required`);
        } else {
          acc[fieldName] = Yup.string().required(`${field.label} is required`);
        }
      });
      return acc;
    }, {})
  );
  console.log(props.sections);
  const formik = useFormik({
    initialValues: props.sections.reduce((acc, section, sectionIndex) => {
      section.fields.forEach((field, fieldIndex) => {
        const fieldName = `field_${sectionIndex}_${fieldIndex}`;
        if (field.type === "Checkbox" || field.type === "MultipleSelect") {
          acc[fieldName] = [];
        } else if (field.type === "Number") {
          acc[fieldName] = 0;
        } else if (field.type === "File") {
          acc[fieldName] = null; // Initialize file field as null
        } else {
          acc[fieldName] = "";
        }
      });
      return acc;
    }, {}),
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setSubmittedData(values);
      setOpenDialog(true);
      resetForm();
    },
  });
  return (
    <Stack
      id="viewform"
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
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <Typography variant="h4"> Fill the following form</Typography>
        {props.sections.length > 0 &&
          props.sections.map((section, sectionIndex) => {
            return (
              <Box key={sectionIndex} sx={{ marginBottom: 3 }}>
                <Typography variant="h5">{section.title}</Typography>
                {section.fields.map((field, index) => {
                  if (field.visible) {
                    if (field.type == "Select") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <Select
                            fullWidth
                            key={index}
                            sx={{ "& .MuiSelect-select": { padding: 1 } }}
                            name={`field_${sectionIndex}_${index}`}
                            value={
                              formik.values[`field_${sectionIndex}_${index}`]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                            helperText={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              formik.errors[`field_${sectionIndex}_${index}`]
                            }
                          >
                            {field.options &&
                              field.options[`${sectionIndex}_${index}`]
                                ?.length > 0 &&
                              field.options[`${sectionIndex}_${index}`].map(
                                (o, index) => <MenuItem value={o}>{o}</MenuItem>
                              )}
                          </Select>
                          {formik.touched[`field_${sectionIndex}_${index}`] &&
                            formik.errors[`field_${sectionIndex}_${index}`] && (
                              <FormHelperText>
                                {
                                  formik.errors[
                                    `field_${sectionIndex}_${index}`
                                  ]
                                }
                              </FormHelperText>
                            )}
                        </>
                      );
                    } else if (field.type == "TextField") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <TextField
                            fullWidth
                            variant="outlined"
                            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
                            name={`field_${sectionIndex}_${index}`}
                            value={
                              formik.values[`field_${sectionIndex}_${index}`]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                            helperText={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              formik.errors[`field_${sectionIndex}_${index}`]
                            }
                          />
                        </>
                      );
                    } else if (field.type == "Date") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <TextField
                            fullWidth
                            key={index}
                            name={`field_${sectionIndex}_${index}`}
                            value={
                              formik.values[`field_${sectionIndex}_${index}`] ||
                              ""
                            }
                            onChange={formik.handleChange}
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                            helperText={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              formik.errors[`field_${sectionIndex}_${index}`]
                            }
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
                          />
                        </>
                      );
                    } else if (field.type == "Radio") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <RadioGroup
                            key={index}
                            name={`field_${sectionIndex}_${index}`}
                            value={
                              formik.values[`field_${sectionIndex}_${index}`]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            {field.options &&
                              field.options[`${sectionIndex}_${index}`]
                                ?.length > 0 &&
                              field.options[`${sectionIndex}_${index}`].map(
                                (o, index) => (
                                  <FormControlLabel
                                    value={o}
                                    control={<Radio />}
                                    label={o}
                                  />
                                )
                              )}
                          </RadioGroup>
                          {formik.touched[`field_${sectionIndex}_${index}`] &&
                            formik.errors[`field_${sectionIndex}_${index}`] && (
                              <FormHelperText>
                                {
                                  formik.errors[
                                    `field_${sectionIndex}_${index}`
                                  ]
                                }
                              </FormHelperText>
                            )}
                        </>
                      );
                    } else if (field.type == "Checkbox") {
                      return (
                        <>
                          <FormControl
                            label={null}
                            component="fieldset"
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                          >
                            <InputLabel shrink={false}>
                              {field.label}
                            </InputLabel>
                            <FormGroup
                              name={`field_${sectionIndex}_${index}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              sx={{ marginTop: "30px" }}
                            >
                              {field.options &&
                                field.options[`${sectionIndex}_${index}`]
                                  ?.length > 0 &&
                                field.options[`${sectionIndex}_${index}`].map(
                                  (o, optionIndex) => (
                                    <FormControlLabel
                                      key={optionIndex}
                                      control={
                                        <Checkbox
                                          checked={formik.values[
                                            `field_${sectionIndex}_${index}`
                                          ]?.includes(o)}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            const value = e.target.value;
                                            formik.setFieldValue(
                                              `field_${sectionIndex}_${index}`,
                                              checked
                                                ? [
                                                    ...formik.values[
                                                      `field_${sectionIndex}_${index}`
                                                    ],
                                                    value,
                                                  ]
                                                : formik.values[
                                                    `field_${sectionIndex}_${index}`
                                                  ].filter((v) => v !== value)
                                            );
                                          }}
                                          value={o}
                                        />
                                      }
                                      label={o}
                                    />
                                  )
                                )}
                            </FormGroup>
                            {formik.touched[`field_${sectionIndex}_${index}`] &&
                              formik.errors[
                                `field_${sectionIndex}_${index}`
                              ] && (
                                <FormHelperText>
                                  {
                                    formik.errors[
                                      `field_${sectionIndex}_${index}`
                                    ]
                                  }
                                </FormHelperText>
                              )}
                          </FormControl>
                        </>
                      );
                    } else if (field.type == "Number") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <TextField
                            key={index}
                            variant="outlined"
                            name={`field_${sectionIndex}_${index}`}
                            value={
                              formik.values[`field_${sectionIndex}_${index}`]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                            helperText={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              formik.errors[`field_${sectionIndex}_${index}`]
                            }
                            type="number"
                            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
                          />
                        </>
                      );
                    } else if (field.type == "MultipleSelect") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <Select
                            fullWidth
                            key={index}
                            name={`field_${sectionIndex}_${index}`}
                            multiple
                            value={
                              formik.values[`field_${sectionIndex}_${index}`] ||
                              []
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              Boolean(
                                formik.errors[`field_${sectionIndex}_${index}`]
                              )
                            }
                            helperText={
                              formik.touched[
                                `field_${sectionIndex}_${index}`
                              ] &&
                              formik.errors[`field_${sectionIndex}_${index}`]
                            }
                          >
                            {field.options &&
                              field.options[`${sectionIndex}_${index}`]
                                ?.length > 0 &&
                              field.options[`${sectionIndex}_${index}`].map(
                                (o, index) => (
                                  <MenuItem key={index} value={o}>
                                    <Checkbox
                                      checked={
                                        Array.isArray(
                                          formik.values[
                                            `field_${sectionIndex}_${index}`
                                          ]
                                        ) &&
                                        formik.values[
                                          `field_${sectionIndex}_${index}`
                                        ].includes(o)
                                      }
                                    />
                                    <ListItemText primary={o} />
                                  </MenuItem>
                                )
                              )}
                          </Select>
                          {formik.touched[field.name] &&
                            formik.errors[field.name] && (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            )}
                        </>
                      );
                    } else if (field.type == "File") {
                      return (
                        <>
                          <InputLabel>{field.label}</InputLabel>
                          <TextField
                            type="file"
                            key={index}
                            variant="outlined"
                            name={`field_${sectionIndex}_${index}`}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                // Set the file correctly in Formik state
                                formik.setFieldValue(
                                  `field_${sectionIndex}_${index}`,
                                  file
                                );
                              }
                            }}
                            onBlur={formik.handleBlur}
                            ref={
                              formik.getFieldProps(
                                `field_${sectionIndex}_${index}`
                              ).ref
                            }
                            accept="image/jpg, image/png, image/jpeg"
                            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
                          />
                        </>
                      );
                    }
                  }
                })}
              </Box>
            );
          })}

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Data submitted successfully!</DialogTitle>
        <DialogContent>
          {submittedData &&
            props.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Typography variant="h6">{section.title}</Typography>
                {section.fields.map((field, fieldIndex) => {
                  const fieldName = `field_${sectionIndex}_${fieldIndex}`;
                  const fieldValue = submittedData[fieldName];

                  return (
                    <div key={fieldIndex}>
                      <Typography>
                        <strong>{field.label}:</strong>{" "}
                        {console.log(fieldValue)}
                        {typeof fieldValue == "string" ? (
                          fieldValue
                        ) : typeof fieldValue == "number" ? (
                          fieldValue
                        ) : Array.isArray(fieldValue) ? (
                          fieldValue.join(",")
                        ) : typeof fieldValue == "object" ? (
                          <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body2">
                              Uploaded File:
                            </Typography>
                            <img
                              src={URL.createObjectURL(fieldValue)} // Create object URL for the file
                              alt="Uploaded File"
                              style={{
                                width: "100%",
                                maxHeight: "200px",
                                objectFit: "contain",
                              }}
                            />
                          </Box>
                        ) : null}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
export default ViewForm;
