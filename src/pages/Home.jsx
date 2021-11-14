import React, { useContext, useEffect } from 'react';
import PlanetTable from '../components/PlanetTable';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { getPlanetsAPI, setFilters } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanetsAPI();
  }, []);

  function handleChange({ target }) {
    const { value } = target;
    setFilters({ filtersByName: { name: value } });
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
      <PlanetTable />
    </div>
  );
}

export default Home;
