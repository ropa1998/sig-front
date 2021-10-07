import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import TextFieldContainer from "../../components/TextFieldContainer";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import { withSnackbar } from "../../components/SnackBarHOC";
import { getLanguages, getProjectById, getTags } from "../../utils/Projects";
const filter = createFilterOptions();

const validationSchema = yup.object().shape({
  title: yup.string().required().nullable().min(5).max(25).label("Title"),
  description: yup
    .string()
    .required()
    .nullable()
    .min(10)
    .max(500)
    .label("Description"),
});

export const ProjectForm = (props) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    links: "",
  });
  let { id } = useParams();

  const { showMessage } = props;

  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then((res) => {
          const value = {};
          Object.keys(res.data).forEach((key) => (value[key] = res.data[key]));
          value.links = value.links.join(",");
          setLanguages(res.data.languages.map((value) => value.name));
          setTags(res.data.tags.map((value) => value.name));
          setInitialValues(value);
        })
        .catch(() => {
          showMessage("error", "There was an error!");
        });
    }
  }, []);

  return (
    <>
      {id ? (
        initialValues.title && (
          <ShowForm
            initialValues={initialValues}
            id={id}
            initalLanguages={languages}
            initialTags={tags}
            {...props}
          />
        )
      ) : (
        <ShowForm initialValues={initialValues} {...props} />
      )}
    </>
  );
};

export const ShowForm = (props) => {
  const {
    title,
    subtitle,
    submit,
    showMessage,
    initialValues,
    id,
    initalLanguages,
    initialTags,
  } = props;
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      if (!Array.isArray(values.links)) {
        const array2 = values.links.split(",");
        values.links = array2;
      }

      values.languages = selectedLanguages;
      values.tags = selectedTags;

      id ? await submit(id, values) : await submit(values);

      showMessage(
        "success",
        `Project was ${id ? "edited" : "created"} successfully`
      );

      setTimeout(() => {
        history.push(`/my-projects`);
      }, 1000);
    } catch (e) {
      showMessage(
        "error",
        typeof e?.response?.data === "string"
          ? e?.response?.data
          : "There was an error!"
      );
    }
  };

  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState(initalLanguages);
  const [selectedTags, setSelectedTags] = useState(initialTags);

  async function fetchTags() {
    try {
      const response = await getLanguages();
      setLanguages(response.data);

      const tags = await getTags();
      setTags(tags.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Container>
      <Box marginTop={6}>
        <Grid container justifyContent="center">
          <Grid container item xs={6} justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">{title}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>{subtitle}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="title"
                          label="Title"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="description"
                          label="Description"
                          formikProps={formikProps}
                          multiline
                          rows={6}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldContainer
                          id="links"
                          label="Links"
                          helperText="Separate values using commas"
                          formikProps={formikProps}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          noOptionsText="Tag must have at least 1 character and at most 24 charaters"
                          defaultValue={selectedTags}
                          multiple
                          size="medium"
                          options={tags}
                          onChange={(_, newValue) => {
                            setSelectedTags(newValue);
                          }}
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const input = params.inputValue;
                            if (
                              input !== "" &&
                              input.length >= 1 &&
                              input.length <= 24
                            ) {
                              filtered.push(input);
                            }

                            return filtered;
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={index}
                                label={option}
                                size="small"
                                color="success"
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Tags"
                              helperText="Choose a maximum of three tags"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          defaultValue={selectedLanguages}
                          multiple
                          size="medium"
                          options={languages}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={index}
                                label={option}
                                size="small"
                                color="primary"
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Languages"
                              helperText="Choose a maximum of three languages"
                            />
                          )}
                          onChange={(_, newValue) => {
                            setSelectedLanguages(newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {id ? "Edit" : "Add"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default withSnackbar(ProjectForm);
