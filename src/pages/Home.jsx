import React, { useContext, useEffect } from 'react';
import PlanetTable from '../components/PlanetTable';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { getPlanetsAPI } = useContext(PlanetsContext);
  useEffect(() => {
    getPlanetsAPI();
  }, []);

  return (
    <div>
      <h1>Star Wars Planets Search</h1>
      <PlanetTable />
    </div>
  );
}

export default Home;
