import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  FormGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Filter = ({
  allroles = [],
  selectedjobs = [],
  setSelectedjobs,
  originalData = [],
  setalldata,
  closeFilter,
}) => {
  const handleApplyFilter = () => {
    const filteredData = originalData.filter((item) =>
      selectedjobs.includes(item.description)
    );
    setalldata(filteredData);
    closeFilter();
  };

  const handleClearFilter = () => {
    setSelectedjobs([]);
    setalldata(originalData);
    closeFilter();
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedjobs((prev) => [...prev, value]);
    } else {
      setSelectedjobs((prev) => prev.filter((job) => job !== value));
    }
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-gray-800">Filter Options</h2>
        <IconButton onClick={closeFilter} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      <FormGroup>
        <h3 className="text-gray-700 mb-2">Roles</h3>
        <div className="grid grid-cols-2 gap-4">
          {allroles.map((role, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedjobs.includes(role)}
                  onChange={handleCheckboxChange}
                  value={role}
                  color="primary"
                />
              }
              label={<span className="break-words text-gray-700 text-xs">{role}</span>} 
              className="flex items-center"
            />
          ))}
        </div>
      </FormGroup>

      <div className="mt-6 flex justify-between">
        <Button
          onClick={handleClearFilter}
          variant="contained"
          color="error"
          size="large"
        >
          Clear
        </Button>
        <Button
          onClick={handleApplyFilter}
          variant="contained"
          color="primary"
          size="large"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Filter;
