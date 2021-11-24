import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericFilters() {
  const { filters, setFilters, setDataFilter, data } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueNumeric, setValueNumeric] = useState();
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  function handleChange({ target }) {
    const { value } = target;
    if (target.id === 'column-filter') setColumn(value);
    if (target.id === 'comparison-filter') setComparison(value);
    if (target.id === 'value-filter') setValueNumeric(value);
  }

  function removeColumnFilter() {
    if (filters.filterByNumericValues !== undefined
      && filters.filterByNumericValues.length !== 0) {
      const index = filters.filterByNumericValues.length - 1;
      const newColumnOptions = columnOptions.filter((col) => (
        filters.filterByNumericValues[index].column !== col
      ));
      setColumnOptions(newColumnOptions);
    }
  }

  function handleClick() {
    if (filters.filterByNumericValues !== undefined) {
      const newNumericFilters = [...filters.filterByNumericValues,
        { column, comparison, value: valueNumeric }];
      setFilters({ ...filters, filterByNumericValues: newNumericFilters });
    } else {
      setFilters({ ...filters,
        filterByNumericValues: [{ column, comparison, value: valueNumeric }] });
    }
  }

  function removeFilter({ target }) {
    const filterOld = filters.filterByNumericValues;
    filterOld.splice(Number(target.id), 1);
    setFilters({ ...filters,
      filterByNumericValues: filterOld });
    setDataFilter(data);
  }

  function renderFilters() {
    return (
      <div>
        {filters.filterByNumericValues.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button type="button" id={ index } onClick={ removeFilter }>x</button>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    removeColumnFilter();
  }, [filters]);

  return (
    <div>
      <select
        data-testid="column-filter"
        id="column-filter"
        onClick={ handleChange }
        onChange={ handleChange }
      >
        {columnOptions.map((columnOption, index) => (
          <option key={ index } value={ columnOption }>
            { columnOption }
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison-filter"
        onClick={ handleChange }
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
      {filters.filterByNumericValues !== undefined ? renderFilters() : null}
    </div>
  );
}

export default NumericFilters;
