import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ });
  const [dataFilter, setDataFilter] = useState([]);

  async function getPlanetsAPI() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const planets = await response.json();
    // console.log(planets.results);
    setData(planets.results);
  }

  function filterByName() {
    if (filters !== {}) {
      const newData = data.filter((planet) => (
        planet.name.includes(filters.filtersByName.name)));
      console.log(newData);
      setDataFilter(newData);
    }
  }

  useEffect(() => {
    filterByName();
  }, [filters]);

  return (
    <PlanetsContext.Provider
      value={ { data, getPlanetsAPI, filters, setFilters, dataFilter } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
