import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import Loader from './components/Loader/Loader';
import { IUserProfile } from './types/users';
function App() {

  const [loader, setLoader] = useState<boolean>(true);

  const [users, setUsers] = useState<IUserProfile[]>([])

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response: Response) => response.json())
        .then((res) => setUsers(res))
        .then(() => setLoader(false))
    }, 500)

  }, [])

  return (
    <div>
      {loader
        ?
        <Loader loader={loader} />
        :
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Users users={users} />}></Route>
              <Route path="/user-profile/:id" element={<UserProfile users={users} />}></Route>
            </Routes>
          </main>
        </>
      }
    </div>
  );
}

export default App;
