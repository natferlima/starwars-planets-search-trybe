import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericFilters() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [valueNumeric, setValueNumeric] = useState();
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  function handleChange({ target }) {
    console.log(target.id);
    const { value } = target;
    if (target.id === 'column-filter') setColumn(value);
    if (target.id === 'comparison-filter') setComparison(value);
    if (target.id === 'value-filter') setValueNumeric(value);
  }

  function removeColumnFilter() {
    if (filters.filterByNumericValues !== undefined) {
      const index = filters.filterByNumericValues.length - 1;
      const newColumnOptions = columnOptions.filter((col) => (
        filters.filterByNumericValues[index].column !== col
      ));
      setColumnOptions(newColumnOptions);
    }
  }

  function handleClick() {
    if (filters.filterByNumericValues !== undefined) {
      console.log(filters.filterByNumericValues);
      const newNumericFilters = [...filters.filterByNumericValues,
        { column, comparison, value: valueNumeric }];
      setFilters({ ...filters, filterByNumericValues: newNumericFilters });
    } else {
      setFilters({ ...filters,
        filterByNumericValues: [{ column, comparison, value: valueNumeric }] });
      console.log(filters);
    }
  }

  useEffect(() => {
    removeColumnFilter();
  }, [filters]);

  return (
    <div>
      <select data-testid="column-filter" id="column-filter" onChange={ handleChange }>
        {columnOptions.map((columnOption, index) => (
          <option key={ index } value={ columnOption }>
            { columnOption }
          </option>
        ))}

        {/* <option value="population" selected>population</option
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="Number"
        id="value-filter"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilters;
