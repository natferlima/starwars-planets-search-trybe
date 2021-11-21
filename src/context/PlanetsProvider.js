import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [dataFilter, setDataFilter] = useState([]);
  const [aux, setAux] = useState(false);

  async function getPlanetsAPI() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const planets = await response.json();
    setData(planets.results);
  }

  function filterByName() {
    if (filters.filtersByName !== undefined) {
      const newData = data.filter((planet) => (
        planet.name.includes(filters.filtersByName.name)));
      setDataFilter(newData);
    }
  }

  function filterByNumericValues() {
    let newData = [];
    if (filters.filterByNumericValues !== undefined) {
      if (filters.filterByNumericValues[0].comparison === 'menor que') {
        newData = data.filter((planet) => (
          Number(planet[filters.filterByNumericValues[0].column])
          < Number(filters.filterByNumericValues[0].value)));
        setAux(true);
        console.log(newData);
        setDataFilter(newData);
      } else if (filters.filterByNumericValues[0].comparison === 'maior que') {
        newData = data.filter((planet) => (
          Number(planet[filters.filterByNumericValues[0].column])
          > Number(filters.filterByNumericValues[0].value)));
        setAux(true);
        console.log(newData);
        setDataFilter(newData);
      } else if (filters.filterByNumericValues[0].comparison === 'igual a') {
        newData = data.filter((planet) => (
          Number(planet[filters.filterByNumericValues[0].column])
          === Number(filters.filterByNumericValues[0].value)));
        setAux(true);
        console.log(newData);
        setDataFilter(newData);
      }
    }
  }

  useEffect(() => {
    getPlanetsAPI();
  }, []);

  useEffect(() => {
    filterByName();
  }, [filters]);

  useEffect(() => {
    filterByNumericValues();
  }, [filters]);

  const value = {
    data,
    getPlanetsAPI,
    filters,
    setFilters,
    dataFilter,
    aux,
    setAux,
    setDataFilter,
  };

  return (
    <PlanetsContext.Provider
      value={ value }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
