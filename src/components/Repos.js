import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

//Repos Charts
const Repos = () => {
  //Destructure repos from GithubContext.
  const { repos } = React.useContext(GithubContext);
  //Most used languages and most stars repo.
  const languages = repos.reduce((total, item) => {
    //Destructure language and stars from single repo.
    const { language, stargazers_count } = item;
    //If there is no language return total object.
    if (!language) return total;
    //If language property is not created in the object, create a propertie and assign it an object with label, value and stars properties. If the language is already created into the object increment language in one and stars from stars item count. Return total object.
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };
    }
    return total;
  }, {});
  //5 most used languages by the user sort it by value.
  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 5);

  //5 most popular languages used by the user sort it by stars quantity. Set value with stars in every item.
  const mostStars = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return { ...item, value: item.stars }
  }).slice(0, 5);

  //Destructure Stars and forks from total object after reduce.
  let { stars, forks } = repos.reduce((total, item) => {
    //Destructure stars, name and forks from repo item.
    const { stargazers_count, name, forks } = item;
    //Set an object with repo name and stars quantity into stars quantity key in stars object.
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    //Set an object with repo name and forks quantity into forks quantity key in forks object.
    total.forks[forks] = { label: name, value: forks };
    return total;
  }, { stars: {}, forks: {} });

  //Stars and forks objects turn into arrays. Take last 5 and reverse array elements position to sort it.
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  //Dumy data.
  const chartData = [
    {
      label: "Javascript",
      value: "200"
    },
    {
      label: "HTML",
      value: "100"
    },
    {
      label: "CSS",
      value: "50"
    }
  ];

  //JSX Charts Return 
  return <section className='section'>
    <Wrapper className='section-center'>
      {/* mostUsed data to render it as a Pie3D chart */}
      <Pie3D data={mostUsed} />
      {/* stars data to render it as a Column3D chart */}
      <Column3D data={stars} />
      {/* <ExampleChart data={chartData} /> */}
      {/* mostStars data to render it as a Doughnut2D chart */}
      <Doughnut2D data={mostStars} />
      {/* mostStars data to render it as a Doughnut2D chart */}
      <Bar3D data={forks} />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
