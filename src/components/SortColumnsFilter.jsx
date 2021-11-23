import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SortColumnsFilter() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [column, setColumn] = useState();
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);

  function handleChange({ target }) {
    const { value } = target;
    if (target.id === 'column-sort') setColumn(value);
    if (target.id === 'asc') setAsc(value);
    if (target.id === 'desc') setDesc(value);
  }

  function handleClick() {
    let sort = '';
    if (asc === 'ASC') sort = asc;
    if (desc === 'DESC') sort = desc;
    if (filters.filterByNumericValues !== undefined
      && filters.filtersByName !== undefined) {
      setFilters({ filterByName: { ...filters.filtersByName },
        filterByNumericValues: [...filters.filterByNumericValues],
        order: {
          column,
          sort,
        } });
    } else {
      setFilters({ order: { column, sort } });
    }
  }

  return (
    <div>
      <select data-testid="column-sort" id="column-sort" onChange={ handleChange }>
        <option value="population" selected>population</option>
        <option value="orbital_period" selected>orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="asc">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort-column-filter"
          id="asc"
          value="ASC"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="desc">
        Descendente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort-column-filter"
          id="desc"
          value="DESC"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortColumnsFilter;
