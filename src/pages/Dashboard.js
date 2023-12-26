import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

//Dashboard component.
const Dashboard = () => {
  //Destructure isLoading from githubContext.
  const { isLoading } = React.useContext(GithubContext);

  //If request is pending render navbar, search field and loader gif.
  if (isLoading) {
    return <main>
      <Navbar />
      <Search />
      <img src={loadingImage} alt="Loader" className='loading-img' />
    </main>
  }

  //Return complete Dashboard.
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
