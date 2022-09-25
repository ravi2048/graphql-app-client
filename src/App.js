import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Project from './Pages/Project';
import Header from './components/Header/Header';

const client = new ApolloClient({
  uri: "https://graphql-project-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/projects/:id' element={<Project/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
