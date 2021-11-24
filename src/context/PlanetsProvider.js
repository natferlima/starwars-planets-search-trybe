import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

// REFERENCIAS PARA USO DO SORT
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [dataFilter, setDataFilter] = useState([]);
  const [aux, setAux] = useState(false);
  const MENOS_UM = -1;

  async function getPlanetsAPI() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const planets = await response.json();
    const planetsSort = planets.results.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return MENOS_UM;
      }
      return 0;
    });
    setData(planetsSort);
  }

  function filterByName() {
    if (filters.filtersByName !== undefined) {
      const newData = data.filter((planet) => (
        planet.name.includes(filters.filtersByName.name)));
      setDataFilter(newData);
    }
  }

  function filterNumeric(index) {
    let dataFilterNumeric = [];
    if (index === 0) {
      dataFilterNumeric = data;
    } else {
      dataFilterNumeric = dataFilter;
    }
    return dataFilterNumeric;
  }

  function filterByNumericValues() {
    let newData = [];
    let dataFilterNumeric = [];
    if (filters.filterByNumericValues !== undefined
      && filters.filterByNumericValues.length !== 0) {
      const index = filters.filterByNumericValues.length - 1;
      dataFilterNumeric = filterNumeric(index);
      if (filters.filterByNumericValues[index].comparison === 'menor que') {
        newData = dataFilterNumeric.filter((planet) => (
          Number(planet[filters.filterByNumericValues[index].column])
          < Number(filters.filterByNumericValues[index].value)));
        setAux(true);
        setDataFilter(newData);
      } else if (filters.filterByNumericValues[index].comparison === 'maior que') {
        newData = dataFilterNumeric.filter((planet) => (
          Number(planet[filters.filterByNumericValues[index].column])
          > Number(filters.filterByNumericValues[index].value)));
        setAux(true);
        setDataFilter(newData);
      } else if (filters.filterByNumericValues[index].comparison === 'igual a') {
        newData = dataFilterNumeric.filter((planet) => (
          Number(planet[filters.filterByNumericValues[index].column])
          === Number(filters.filterByNumericValues[index].value)));
        setAux(true);
        setDataFilter(newData);
      }
    }
  }

  function sortColumnsFilter() {
    if (filters.order !== undefined) {
      if (filters.order.sort === 'ASC') {
        data.sort((a, b) => (
          Number(a[filters.order.column]) - Number(b[filters.order.column])));
      } else {
        data.sort((a, b) => (
          Number(b[filters.order.column]) - Number(a[filters.order.column])));
      }
      setDataFilter(data);
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

  useEffect(() => {
    sortColumnsFilter();
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
