import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Data from './components/Data';
import Posts from './components/Posts';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Data />
        <Posts/>
      </QueryClientProvider>
    </>
  )
}

export default App
