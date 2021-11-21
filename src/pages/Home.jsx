import React, { useContext } from 'react';
import PlanetTable from '../components/PlanetTable';
import NumericFilters from '../components/NumericFilters';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { filters, setFilters, setAux } = useContext(PlanetsContext);

  function handleChange({ target }) {
    const { value } = target;
    if (filters.filterByNumericValues !== undefined) {
      setFilters({ filtersByName: { name: value }, filterByNumericValues: [...filters.filterByNumericValues] });
    } else {
      setFilters({ filtersByName: { name: value } });
    }
    setAux(true);
  }

  return (
    <div>
      <h1>Star Wars Planets Search</h1>
      <input
        data-testid="name-filter"
        type="text"
        name="search"
        onChange={ handleChange }
      />
      <NumericFilters />
      <PlanetTable />
    </div>
  );
}

export default Home;
