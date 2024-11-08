import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
<<<<<<< HEAD
=======
import Data from './components/Data';
import Posts from './components/Posts';
>>>>>>> 4583b18 (commit)

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
=======
        <Data />
        <Posts/>
>>>>>>> 4583b18 (commit)
      </QueryClientProvider>
    </>
  )
}

export default App
