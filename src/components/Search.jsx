import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import {
  getAllProject,
  getLanguages,
  getTags,
  searchProjectByQuery,
} from "../utils/Server";
import debounce from "lodash/debounce";
import styled from "styled-components";

const ChipModify = styled(Chip)`
  margin-right: 10px;
`;

const Divider = styled.div`
  height: 100%;
  border-left-color: darkgrey;
  border-left-width: 2px;
  border-left-style: solid;
  width: 3px;
  margin-right: 10px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

function Search(props) {
  const { state, setState, showMessage, filters } = props;
  const [filter, setFilter] = useState();
  const [options, setOptions] = useState();
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState([]);
  const handler = useRef(
    debounce(
      (event, filter, name, tags, language) =>
        search(event, filter, name, tags, language),
      400
    )
  ).current;

  const selectFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const getLanguagesSearch = async () => {
    try {
      const res = await getLanguages();
      return res.data;
    } catch (e) {
      showMessage("error", "Oops... Something went wrong!");
    }
  };

  const getProjectsTags = async () => {
    try {
      const res = await getTags();
      return res.data;
    } catch (e) {
      showMessage("error", "Oops... Something went wrong!");
    }
  };

  const getProjectsName = () => {
    return state.map((item) => item.title);
  };

  const getAllProjects = async () => {
    const response = await getAllProject();
    setState(response.data);
  };

  const deleteChip = async (value, filtername) => {
    let body = {
      title: name,
      tags: tags,
      languages: language,
      page: 0,
      featured: false,
    };
    if (filtername === "name") {
      setName("");
      body = { ...body, title: "" };
    } else if (filtername === "tag") {
      const auxarray = tags;
      const index = auxarray.indexOf(value);
      if (index > -1) {
        auxarray.splice(index, 1);
      }
      setTags(auxarray);
      body = { ...body, tags: auxarray };
    } else {
      const auxarray = language;
      const index = auxarray.indexOf(value);
      if (index > -1) {
        auxarray.splice(index, 1);
      }
      setLanguage(auxarray);
      body = { ...body, languages: auxarray };
    }
    const response = await searchProjectByQuery(body);
    setState(response.data);
  };

  const search = async (e, filter, name, tags, language) => {
    const cleanQuery = e.target.defaultValue.trim();
    console.log(name, tags, language);
    if (filter === "name") {
      await searchByName(cleanQuery, e.key === "Enter", name, tags, language);
    } else if (filter === "tag") {
      await searchByTags(cleanQuery, e.key === "Enter", name, tags, language);
    } else {
      await searchByLanguage(
        cleanQuery,
        e.key === "Enter",
        name,
        tags,
        language
      );
    }
  };

  const searchByName = async (query, save, name, tags, language) => {
    try {
      const body = {
        title: query,
        tags: tags,
        languages: language,
        page: 0,
        featured: false,
      };
      const response = await searchProjectByQuery(body);
      setState(response.data);
      if (save) {
        setName(query);
      }
    } catch (e) {
      showMessage("error", "Opss... Something went wrong!");
    }
  };

  const searchByTags = async (query, save, name, tags, language) => {
    try {
      let array = [...tags, query];
      console.log("Hola carlos");
      const body = {
        title: name,
        tags: array,
        languages: language,
        page: 0,
        featured: false,
      };
      const response = await searchProjectByQuery(body);
      setState(response.data);
      if (save) {
        setTags(array);
      }
    } catch (e) {
      showMessage("error", "Opss... Something went wrong!");
    }
  };

  const searchByLanguage = async (query, save, name, tags, language) => {
    try {
      let array = [...language, query];
      const body = {
        title: name,
        tags: tags,
        languages: array,
        page: 0,
        featured: false,
      };
      const response = await searchProjectByQuery(body);
      setState(response.data);
      if (save) {
        setLanguage(array);
      }
    } catch (e) {
      showMessage("error", "Opss... Something went wrong!");
    }
  };

  const getOptionByFilter = async () => {
    let result;
    switch (filter) {
      case "name":
        return state ? setOptions(getProjectsName()) : [];
      case "language":
        result = await getLanguagesSearch();
        return setOptions(result ? result : []);
      case "tag":
        result = await getProjectsTags();
        return setOptions(result ? result : []);
    }
  };

  useEffect(() => {
    getOptionByFilter();
  }, [filter]);

  useEffect(() => {
    getAllProjects();
    filters && setFilter(filters[0].value);
  }, []);

  return (
    <Box>
      {filter && (
        <>
          <Grid container direction="row" spacing={3} alignItems="center">
            <Grid item xs={10}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={options ? options.map((item) => item) : "No results"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search project"
                    margin="normal"
                    variant="outlined"
                    onKeyUp={(event) =>
                      handler(event, filter, name, tags, language)
                    }
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
            </Grid>
            {filters && (
              <Grid item xs={2}>
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "100%", marginTop: "8px" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={selectFilter}
                    label="Filter"
                  >
                    {filters.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Box>
            {
              <Container>
                {name && name.length > 0 && (
                  <ChipModify
                    color="primary"
                    onDelete={() => deleteChip(name, "name")}
                    label={name}
                  />
                )}
                {tags?.length > 0 && (
                  <ChipContainer>
                    {name !== "" && <Divider />}
                    {tags.map((item, index) => (
                      <ChipModify
                        left
                        color="success"
                        onDelete={() => deleteChip(item, "tag")}
                        key={index}
                        label={item}
                      />
                    ))}
                  </ChipContainer>
                )}

                {language?.length > 0 && (
                  <ChipContainer>
                    {(name !== "" || tags?.length > 0) && <Divider />}
                    {language.map((item, index) => (
                      <ChipModify
                        left
                        color="info"
                        onDelete={() => deleteChip(item, "language")}
                        key={index}
                        label={item}
                      />
                    ))}
                  </ChipContainer>
                )}
              </Container>
            }
          </Box>

          <Box>
            <Typography color="textSecondary">
              {state && state.length === 0
                ? "No results"
                : `${state.length} Results`}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Search;
